// =============================================
// APP LOGIC — Core state, API, utilities
// =============================================
// NOTE: CSRF and API constants are declared inline in planner.php

// currentProject is now defined globally in planner.html

let appData  = { plan:{}, phases:[], expenses:[], workers:[], tasks:[], logs:[], punch_list:[], changes:[] };
let IS_ADMIN = false;

async function api(action, body = {}) {
  console.log(`[API] Calling: ${API} | Action: ${action}`, body);
  try {
    const token = localStorage.getItem('userToken') || '';
    const r = await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': 'Bearer ' + token } : {})
      },
      body: JSON.stringify({ ...body, action })
    });
    if (!r.ok) {
        console.error('HTTP error:', r.status);
        return { ok: false, error: 'HTTP ' + r.status };
    }
    return await r.json();
  } catch (e) {
    console.error(`[API Error] Action ${action}:`, e);
    return { ok: false, error: e.message };
  }
}

async function init() {
  try {
    const json = await api('get_all');
    console.log('API response:', json);
    if (json.ok) {
      appData  = json.data;
      console.log('appData loaded:', appData.phases?.length, 'phases,', appData.tasks?.length, 'tasks');
      IS_ADMIN = json.is_admin === true;
      // show/hide admin template banner
      const banner = document.getElementById('adminTemplateBanner');
      if (banner) banner.style.display = IS_ADMIN ? 'block' : 'none';
      // show/hide template section based on access
      const tplUnlocked = document.getElementById('templateSectionUnlocked');
      const tplLocked   = document.getElementById('templateSectionLocked');
      if (tplUnlocked) tplUnlocked.style.display = IS_ADMIN ? 'flex' : 'none';
      if (tplLocked)   tplLocked.style.display   = IS_ADMIN ? 'none' : 'block';

      // First-time user check: show onboarding if no phases and no tasks exist
      if (!IS_ADMIN && appData.phases.length === 0 && appData.tasks.length === 0 && !localStorage.getItem('planner_onboard_done_' + currentProject)) {
        showOnboarding();
      }

      render();
      console.log('Render complete');
    } else {
      console.error('API returned error:', json);
    }
  } catch(e) {
    console.error('Planner API error:', e);
  }
  applyI18n();
  if (window.lucide) lucide.createIcons();
}

function render() {
  renderOverview();
  renderPhases();
  renderFinances();
  renderWorkers();
  renderTasks();
  renderPunchList();
  renderMaterials();
  renderSettings();
  renderGantt();
  renderCalendar();
  loadProjectList();
  if (window.lucide) lucide.createIcons();
}

async function loadProjectList() {
  const d = await api('get_my_projects');
  if (d && d.projects) {
    const grid = document.getElementById('projectListGrid');
    grid.innerHTML = d.projects.map(p => {
       const isActive = currentProject === p.id;
       return `<div onclick="switchProject('${p.id}')" style="padding:1.25rem; border-radius:var(--radius-md); border:1px solid ${isActive ? 'var(--accent-main)' : 'rgba(255,255,255,0.1)'}; background:${isActive ? 'var(--accent-main)' : 'rgba(255,255,255,0.04)'}; backdrop-filter:blur(8px); cursor:pointer; display:flex; justify-content:space-between; align-items:center; transition:0.2s;" onmouseover="this.style.borderColor='var(--accent-main)'" onmouseout="if(!${isActive}) this.style.borderColor='rgba(255,255,255,0.1)'">
         <div>
           <div style="font-weight:700; font-size:1rem; color:${isActive ? '#0c0d12' : 'var(--text-primary)'};">${esc(p.title)}</div>
           <div style="font-size:0.65rem; color:${isActive ? 'rgba(0,0,0,0.5)' : 'var(--text-secondary)'}; font-family:'JetBrains Mono',monospace; margin-top:0.2rem;">ID: ${p.id.toUpperCase()}</div>
         </div>
         ${isActive ? '<i data-lucide="check-circle" style="width:20px;height:20px;color:#0c0d12;"></i>' : ''}
       </div>`;
    }).join('');
    if (window.lucide) lucide.createIcons();
    
    // Always show 'Change Project' button so they can see the 'Add' option
    document.getElementById('btnSwitchProj').style.display = 'block';
  }
}

function switchProject(pid) {
  const url = new URL(window.location.href);
  if (pid === 'default') url.searchParams.delete('project');
  else url.searchParams.set('project', pid);
  window.location.href = url.toString();
}

async function createProject() {
  const title = document.getElementById('newProjectName').value;
  if (!title) return toast(t('enter_project_name'),'err');
  const pid = title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
  const d = await api('create_project', { project_id: pid, title: title });
  if (d.ok) {
    switchProject(pid);
  } else {
    toast(d.error || t('err_generic'),'err');
  }
}


function fmt(n) {
  const rateToEur = Number(appData.plan.exchange_rate) > 0 ? Number(appData.plan.exchange_rate) : 117.2;
  const num = Number(n || 0);
  // rates[cur] = RSD per 1 unit of currency. EUR: rateToEur RSD/EUR. USD: rateToEur/1.08 RSD/USD. RUB: rateToEur/93.2 RSD/RUB. CNY: rateToEur/7.8 RSD/CNY
  const rates = { rsd: 1, eur: rateToEur, usd: rateToEur / 1.08, rub: rateToEur / 93.2, cny: rateToEur / 7.8 };
  const symbols = { rsd: 'RSD', eur: '€', usd: '$', rub: '₽', cny: '¥' };
  const locales = { rsd: 'sr-RS', eur: 'de-DE', usd: 'en-US', rub: 'ru-RU', cny: 'zh-CN' };
  const decimals = { rsd: 0, eur: 2, usd: 2, rub: 0, cny: 2 };
  const cur = currentCur || 'rsd';
  const converted = num / (rates[cur] || 1);
  const dec = decimals[cur] ?? 0;
  const formatted = converted.toLocaleString(locales[cur] || 'en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  if (cur === 'eur') return '€ ' + formatted;
  if (cur === 'usd') return '$ ' + formatted;
  if (cur === 'rub') return formatted + ' ₽';
  if (cur === 'cny') return '¥ ' + formatted;
  return formatted + ' RSD';
}
function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function taskTitle(tk) {
  if (currentLang === 'sr' && tk.title_sr) return tk.title_sr;
  if (currentLang === 'ru' && tk.title_ru) return tk.title_ru;
  if (currentLang === 'zh' && tk.title_zh) return tk.title_zh;

  const key = tk.title || '';
  // Lookup alias if it exists
  const lookupKey = (typeof TASK_ALIASES !== 'undefined' && TASK_ALIASES[key]) ? TASK_ALIASES[key] : key;
  const detailed = (typeof TASK_DETAILED_DESCRIPTIONS !== 'undefined') ? TASK_DETAILED_DESCRIPTIONS[lookupKey] : null;

  if (detailed) {
    if (currentLang === 'sr' && detailed.title_sr) return detailed.title_sr;
    if (currentLang === 'ru' && detailed.title_ru) return detailed.title_ru;
    if (currentLang === 'zh' && detailed.title_zh) return detailed.title_zh;
    return detailed.title_en || lookupKey;
  }
  return key;
}





function toggleUserMenu(e) {
  if (e) e.stopPropagation();
  const m = document.getElementById('blUserMenu');
  if (!m) return;
  
  // Prevent closing when clicking inside the menu
  if (!m.dataset.stopProp) {
    m.addEventListener('click', (ev) => ev.stopPropagation());
    m.dataset.stopProp = "true";
  }

  // Check theme and set appropriate background
  const body = document.querySelector('.blanner-body');
  const isLight = body.getAttribute('data-theme') === 'light';
  if (isLight) {
    m.style.background = '#ffffff';
    m.style.borderColor = '#e5e5e5';
  } else {
    m.style.background = '#1B1B1E';
    m.style.borderColor = 'var(--glass-border)';
  }
  
  m.style.display = (m.style.display === 'block') ? 'none' : 'block';
  m.style.zIndex = "1000"; // Ensure it's above other elements
}

window.addEventListener('click', () => {
  const m = document.getElementById('blUserMenu');
  if (m) m.style.display = 'none';
});
