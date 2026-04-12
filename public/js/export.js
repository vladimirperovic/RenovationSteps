// =============================================
// PDF EXPORT
// =============================================
function exportPDF() {
  const p = appData.plan || {};
  const phases = appData.phases || [];
  const expenses = appData.expenses || [];
  const workers = appData.workers || [];
  const payments = appData.payments || [];
  const totalExpenses = expenses.reduce((s,e) => s+Number(e.amount||0), 0);
  const paidExpenses  = expenses.filter(e=>e.paid).reduce((s,e) => s+Number(e.amount||0), 0);
  const totalPayments = payments.reduce((s,pm) => s+Number(pm.amount||0), 0);
  const paidPayments  = payments.filter(pm=>pm.paid).reduce((s,pm) => s+Number(pm.amount||0), 0);

  const html = `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:800px;margin:0 auto;color:#1c1c1e;">
      <!-- Header -->
      <div style="border-bottom:3px solid #1c1c1e;padding-bottom:1.5rem;margin-bottom:2rem;">
        <div style="font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;color:#636366;margin-bottom:0.5rem;">AA / STUDIO — Project Report</div>
        <h1 style="font-size:2rem;font-weight:800;margin:0 0 0.25rem;">${esc(p.title||'Project Report')}</h1>
        <div style="color:#636366;font-size:0.875rem;">${esc(p.address||'')} &nbsp;|&nbsp; Generated: ${new Date().toLocaleDateString(currentLang==='sr'?'sr-RS':'en-US')}</div>
      </div>

      <!-- Project Info -->
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.5rem;margin-bottom:2rem;">
        <div style="background:#f5f5f7;border-radius:0.75rem;padding:1rem;">
          <div style="font-size:0.65rem;color:#636366;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.25rem;">Budget</div>
          <div style="font-size:1.1rem;font-weight:700;">${fmt(p.total_budget||0)}</div>
        </div>
        <div style="background:#f5f5f7;border-radius:0.75rem;padding:1rem;">
          <div style="font-size:0.65rem;color:#636366;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.25rem;">Spent</div>
          <div style="font-size:1.1rem;font-weight:700;">${fmt(totalExpenses)}</div>
        </div>
        <div style="background:#f5f5f7;border-radius:0.75rem;padding:1rem;">
          <div style="font-size:0.65rem;color:#636366;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.25rem;">Timeline</div>
          <div style="font-size:0.875rem;font-weight:600;">${p.start_date||'—'} → ${p.end_date||'—'}</div>
        </div>
      </div>

      <!-- Phases -->
      <h2 style="font-size:1rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:1rem;padding-bottom:0.5rem;border-bottom:1px solid #e5e5ea;">Phases (${phases.length})</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:2rem;font-size:0.8rem;">
        <thead><tr style="background:#f5f5f7;">
          <th style="padding:0.5rem;text-align:left;">#</th>
          <th style="padding:0.5rem;text-align:left;">Phase</th>
          <th style="padding:0.5rem;text-align:left;">Status</th>
          <th style="padding:0.5rem;text-align:left;">Dates</th>
          <th style="padding:0.5rem;text-align:right;">Progress</th>
        </tr></thead>
        <tbody>
          ${phases.map((ph,i) => `<tr style="border-bottom:1px solid #e5e5ea;">
            <td style="padding:0.5rem;color:#636366;">${String(i+1).padStart(2,'0')}</td>
            <td style="padding:0.5rem;font-weight:600;">${esc(phaseTitle(ph))}</td>
            <td style="padding:0.5rem;">${ph.status||'—'}</td>
            <td style="padding:0.5rem;color:#636366;">${ph.start||'—'} → ${ph.end||'—'}</td>
            <td style="padding:0.5rem;text-align:right;">${ph.progress||0}%</td>
          </tr>`).join('')}
        </tbody>
      </table>

      <!-- Workers -->
      ${workers.length ? `<h2 style="font-size:1rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:1rem;padding-bottom:0.5rem;border-bottom:1px solid #e5e5ea;">Workers (${workers.length})</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:2rem;font-size:0.8rem;">
        <thead><tr style="background:#f5f5f7;">
          <th style="padding:0.5rem;text-align:left;">Name</th>
          <th style="padding:0.5rem;text-align:left;">Trade</th>
          <th style="padding:0.5rem;text-align:left;">Phone</th>
          <th style="padding:0.5rem;text-align:left;">Rate</th>
        </tr></thead>
        <tbody>${workers.map(w => `<tr style="border-bottom:1px solid #e5e5ea;">
          <td style="padding:0.5rem;font-weight:600;">${esc(w.name)}</td>
          <td style="padding:0.5rem;">${esc(w.trade||'—')}</td>
          <td style="padding:0.5rem;">${esc(w.phone||'—')}</td>
          <td style="padding:0.5rem;">${esc(w.rate||'—')}</td>
        </tr>`).join('')}</tbody>
      </table>` : ''}

      <!-- Payment Schedule -->
      ${payments.length ? `<h2 style="font-size:1rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:1rem;padding-bottom:0.5rem;border-bottom:1px solid #e5e5ea;">Payment Schedule</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:2rem;font-size:0.8rem;">
        <thead><tr style="background:#f5f5f7;">
          <th style="padding:0.5rem;text-align:left;">Description</th>
          <th style="padding:0.5rem;text-align:left;">Due</th>
          <th style="padding:0.5rem;text-align:right;">Amount</th>
          <th style="padding:0.5rem;text-align:left;">Status</th>
        </tr></thead>
        <tbody>${payments.map(pm => `<tr style="border-bottom:1px solid #e5e5ea;">
          <td style="padding:0.5rem;font-weight:600;">${esc(pm.desc)}</td>
          <td style="padding:0.5rem;">${pm.due_date||'—'}</td>
          <td style="padding:0.5rem;text-align:right;font-weight:600;">${fmt(pm.amount)}</td>
          <td style="padding:0.5rem;color:${pm.paid?'#22c55e':'#ef4444'};">${pm.paid?'✓ Paid':'Pending'}</td>
        </tr>`).join('')}
        <tr style="background:#f5f5f7;font-weight:700;">
          <td style="padding:0.5rem;" colspan="2">Total</td>
          <td style="padding:0.5rem;text-align:right;">${fmt(totalPayments)}</td>
          <td style="padding:0.5rem;color:#22c55e;">${fmt(paidPayments)} paid</td>
        </tr></tbody>
      </table>` : ''}

      <!-- Footer -->
      <div style="border-top:1px solid #e5e5ea;padding-top:1rem;margin-top:2rem;font-size:0.7rem;color:#636366;display:flex;justify-content:space-between;">
        <span>AA / Studio Belgrade — aastudiobelgrade.rs</span>
        <span>Generated ${new Date().toLocaleString(currentLang==='sr'?'sr-RS':'en-US')}</span>
      </div>
    </div>`;

  const printWin = window.open('', '_blank', 'width=900,height=700');
  printWin.document.write(`<!DOCTYPE html><html><head><title>${esc(p.title||'Report')}</title>
    <style>@media print{body{margin:0;padding:20px;}}body{font-family:'Helvetica Neue',Arial,sans-serif;padding:40px;}</style>
    </head><body>${html}</body></html>`);
  printWin.document.close();
  printWin.focus();
  setTimeout(() => { printWin.print(); }, 500);
}

// =============================================
// THEME SYSTEM — 4 themes: v2-dark, v2-light, v1-dark, v1-light
// planner.html: only v1-dark / v1-light (no #v2css link in DOM)
// planner2.html: all 4 themes via #v2css stylesheet toggle
// =============================================
const _THEME_META = {
  'v2-dark':  { bg: '#0D1117', bd: '#6366F1', label: 'Indigo' },
  'v2-light': { bg: '#F1F5F9', bd: '#6366F1', label: 'Slate'  },
  'v1-dark':  { bg: '#1c1c1e', bd: '#636366', label: 'Classic' },
  'v1-light': { bg: '#f5f5f5', bd: '#c7c7cc', label: 'Light'  },
};

function setTheme(name) {
  const body  = document.querySelector('.blanner-body');
  const v2css = document.getElementById('v2css');

  const isLight = name === 'v1-light' || name === 'v2-light';
  const isV2    = name === 'v2-dark'  || name === 'v2-light';

  // Apply color mode
  if (isLight) body.setAttribute('data-theme', 'light');
  else         body.removeAttribute('data-theme');

  // Toggle planner2.css (only present on planner2.html)
  if (v2css) v2css.disabled = !isV2;

  // Sync chip: dot color + label
  const meta = _THEME_META[name];
  if (meta) {
    const dot = document.getElementById('themeChipDot');
    const lbl = document.getElementById('themeChipLabel');
    if (dot) { dot.style.background = meta.bg; dot.style.borderColor = meta.bd; }
    if (lbl) lbl.textContent = meta.label;
  }

  // Sync active state on menu items and settings tiles
  document.querySelectorAll('.bl-theme-menu-item, .bl-theme-tile').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.themePick === name);
  });

  // Close dropdown if open
  const menu = document.getElementById('themeMenu');
  if (menu) menu.classList.remove('open');

  // Legacy sun/moon icon button (planner.html)
  const legacyBtn = document.getElementById('themeToggle');
  if (legacyBtn && !legacyBtn.querySelector('svg')) {
    legacyBtn.textContent = isLight ? '🌙' : '☀';
  }

  localStorage.setItem('planner_theme', name);

  // Re-render calendar and gantt so they pick up new CSS variables
  if (typeof renderCalendar === 'function') renderCalendar();
  if (typeof renderGantt === 'function') renderGantt();
}

// Toggle the theme dropdown open/closed
function toggleThemeMenu(e) {
  e.stopPropagation();
  const menu = document.getElementById('themeMenu');
  const btn  = document.getElementById('themeChipBtn');
  if (!menu || !btn) return;

  const isOpen = menu.classList.contains('open');

  if (isOpen) {
    menu.classList.remove('open');
    return;
  }

  // Position the fixed dropdown above the chip button
  const rect = btn.getBoundingClientRect();
  menu.style.left   = rect.left + 'px';
  menu.style.bottom = (window.innerHeight - rect.top + 6) + 'px';
  menu.style.top    = '';
  menu.classList.add('open');
}

// Close dropdown on any outside click
document.addEventListener('click', function() {
  const menu = document.getElementById('themeMenu');
  if (menu) menu.classList.remove('open');
});

// Cycle to next theme (used by settings panel and planner.html toggle)
function toggleTheme() {
  const v2css  = document.getElementById('v2css');
  const themes = v2css
    ? ['v2-dark', 'v2-light', 'v1-dark', 'v1-light']
    : ['v1-dark', 'v1-light'];
  const current = localStorage.getItem('planner_theme') || themes[0];
  const mapped  = (current === 'dark') ? 'v1-dark' : (current === 'light') ? 'v1-light' : current;
  const idx     = themes.indexOf(mapped);
  setTheme(themes[(idx + 1) % themes.length]);
}

// Initialize theme from localStorage on page load
(function initTheme() {
  const v2css  = document.getElementById('v2css');
  const saved  = localStorage.getItem('planner_theme');
  let theme = saved;
  if (!theme || theme === 'dark')  theme = v2css ? 'v2-dark'  : 'v1-dark';
  if (theme === 'light')           theme = v2css ? 'v2-light' : 'v1-light';
  setTheme(theme);
})();

// =============================================
// ONBOARDING WIZARD
// =============================================
let onboardChoice = null;

function showOnboarding() {
  document.getElementById('onboardOverlay').classList.add('active');
  // Set default start date to today
  document.getElementById('onboardStartDate').valueAsDate = new Date();
}

function onboardSelect(type) {
  onboardChoice = type;
  if (type === 'blank') {
    // Skip step 2 for blank — go straight but still show options
    document.getElementById('onboardStep2').querySelector('.bl-onboard-toggles').style.display = 'none';
  } else {
    document.getElementById('onboardStep2').querySelector('.bl-onboard-toggles').style.display = 'flex';
  }
  document.getElementById('onboardStep1').style.display = 'none';
  document.getElementById('onboardStep2').style.display = 'block';

  // Update button text based on choice
  const labels = { 
    garsonjera: t('btn_start_studio'), 
    dvosoban: t('btn_start_two'), 
    trosoban: t('btn_start_three'), 
    blank: t('btn_start_blank') 
  };
  document.getElementById('onboardGoText').textContent = labels[type] || t('btn_start_blank');
}

function onboardBack() {
  document.getElementById('onboardStep2').style.display = 'none';
  document.getElementById('onboardStep1').style.display = 'block';
  onboardChoice = null;
}

async function onboardApply() {
  const btn = document.getElementById('onboardGoBtn');
  btn.disabled = true;
  document.getElementById('onboardGoText').style.display = 'none';
  document.getElementById('onboardGoSpinner').style.display = 'inline';

  const projectName  = document.getElementById('onboardProjectName').value.trim() || 'Moje Renoviranje';
  const address      = document.getElementById('onboardAddress').value.trim();
  const startDate    = document.getElementById('onboardStartDate').value;
  const currency     = document.getElementById('onboardCurrency').value;
  const incCosts     = document.getElementById('onboardIncludeCosts')?.checked ?? true;
  const incNotes     = document.getElementById('onboardIncludeNotes')?.checked ?? true;
  const autoSchedule = document.getElementById('onboardAutoSchedule')?.checked ?? true;

  try {
    // Save currency preference
    localStorage.setItem('planner_cur', currency);
    currentCur = currency;

    // Save plan basics
    const planData = { title: projectName, address: address, start_date: startDate, end_date: '', notes: '', total_budget: 0 };

    if (onboardChoice !== 'blank') {
      const tpl = APARTMENT_TEMPLATES[onboardChoice];
      if (tpl) {
        planData.total_budget = tpl.budget;

        // Show Progress Area
        const progressArea = document.getElementById('onboardProgressArea');
        const progressBarInner = document.getElementById('onboardProgressBarInner');
        const progressStatus = document.getElementById('onboardProgressStatus');
        if (progressArea) progressArea.style.display = 'block';

        // Calculate end date from durations
        if (startDate && autoSchedule) {
          const totalDays = tpl.phases.reduce((s, p) => s + p.duration, 0);
          const ed = new Date(startDate);
          ed.setDate(ed.getDate() + totalDays);
          planData.end_date = ed.toISOString().slice(0,10);
        }

        await api('save_plan', planData);

        // Add phases and tasks
        let cursor = startDate ? new Date(startDate) : new Date();
        const totalPhases = tpl.phases.length;
        let pIndex = 0;

        for (const ph of tpl.phases) {
          pIndex++;
          const pct = Math.round((pIndex / totalPhases) * 100);
          if (progressBarInner) progressBarInner.style.width = pct + '%';
          if (progressStatus) progressStatus.textContent = `Učitavanje faze: ${ph.name} (${pct}%)`;

          let start = '', end = '';
          if (autoSchedule) {
            start = cursor.toISOString().slice(0,10);
            cursor.setDate(cursor.getDate() + ph.duration);
            end = cursor.toISOString().slice(0,10);
            cursor.setDate(cursor.getDate() + 1);
          }
          const phaseName = (typeof tplGetPhaseName === 'function') ? tplGetPhaseName(ph.name, currentLang) : ph.name;
          const phRes = await api('add_phase', { name: phaseName, notes: ph.notes, start, end, status: 'pending', progress: 0 });

          // Add tasks for this phase
          if (phRes && phRes.phase && ph.tasks && ph.tasks.length) {
            const phaseId = phRes.phase.id;
            for (const tk of ph.tasks) {
              const taskTitle = (typeof tplGetTaskTitle === 'function') ? tplGetTaskTitle(tk.title, currentLang) : tk.title;
              await api('add_task', {
                title:    taskTitle,
                phase_id: phaseId,
                priority: tk.priority || 'normal',
                cost:     incCosts ? (tk.cost || 0) : 0,
                notes:    incNotes ? (tk.notes || '') : '',
                status:   'todo'
              });
            }
          }
        }
      }
    } else {
      // Blank project — just save the plan
      await api('save_plan', planData);
    }

    // Mark onboarding as done for this project
    localStorage.setItem('planner_onboard_done_' + currentProject, '1');

    // Close overlay and reload data
    document.getElementById('onboardOverlay').classList.remove('active');
    await init();
    toast(t('project_ready_toast'));

  } catch (err) {
    console.error('Onboarding error:', err);
    toast(t('err_template_load'), 'err');
    btn.disabled = false;
    document.getElementById('onboardGoText').style.display = 'inline';
    document.getElementById('onboardGoSpinner').style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
});

// =============================================
// PROJECT BACKUP & RESTORE (.plan format)
// =============================================
function exportProjectData() {
  const data = {
    version: "1.1",
    generatedAt: new Date().toISOString(),
    project: appData.plan,
    phases: appData.phases,
    tasks: appData.tasks,
    workers: appData.workers,
    expenses: appData.expenses,
    materials: appData.materials,
    payments: appData.payments,
    punch_list: appData.punch_list,
    logs: appData.logs,
    changes: appData.changes
  };
  
  // Use a simple encoding (UTF-8 safe base64) to discourage manual editing
  const json = JSON.stringify(data);
  const payload = btoa(unescape(encodeURIComponent(json)));
  const fileName = (appData.plan?.title || 'Project').replace(/[^a-z0-9]/gi, '_').toLowerCase() + ".plan";
  
  const blob = new Blob([payload], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast(t('backup_saved') || "Rezervna kopija sačuvana.");
}

async function importProjectData(input) {
  const file = input.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const content = e.target.result;
      const jsonStr = decodeURIComponent(escape(atob(content)));
      const data = JSON.parse(jsonStr);
      
      const confirmMsg = t('confirm_import') || "Da li ste sigurni? Ovo će obrisati trenutne podatke i učitati backup.";
      if (!confirm(confirmMsg)) {
        input.value = "";
        return;
      }
      
      toast(t('restoring_data') || "Vraćanje podataka...", 'info');
      
      // 1. Clear current project
      await api('reset_project', { type: 'all' });
      
      // 2. Save Plan basics
      if (data.project) {
        await api('save_plan', {
          title: data.project.title,
          address: data.project.address,
          total_budget: data.project.total_budget,
          exchange_rate: data.project.exchange_rate,
          start_date: data.project.start_date,
          end_date: data.project.end_date,
          notes: data.project.notes
        });
      }

      // 3. Import Workers first (so tasks can link to them)
      const workerIdMap = {};
      if (data.workers) {
        for (const w of data.workers) {
          const res = await api('add_worker', { ...w, id: undefined });
          if (res && res.worker) workerIdMap[w.id] = res.worker.id;
        }
      }

      // 4. Import Phases and their Tasks/Materials/Payments
      if (data.phases) {
        for (const ph of data.phases) {
          const phRes = await api('add_phase', { ...ph, id: undefined });
          if (phRes && phRes.phase) {
            const newPhId = phRes.phase.id;
            
            // Tasks in this phase
            const tasksInPh = (data.tasks || []).filter(tk => tk.phase_id === ph.id);
            for (const tk of tasksInPh) {
              await api('add_task', { 
                ...tk, 
                id: undefined, 
                phase_id: newPhId, 
                worker_id: workerIdMap[tk.worker_id] || '' 
              });
            }
            
            // Materials in this phase
            const matsInPh = (data.materials || []).filter(m => m.phase_id === ph.id);
            for (const m of matsInPh) {
              await api('add_material', { ...m, id: undefined, phase_id: newPhId });
            }

            // Payments in this phase
            const paysInPh = (data.payments || []).filter(p => p.phase_id === ph.id);
            for (const p of paysInPh) {
              await api('add_payment', { ...p, id: undefined, phase_id: newPhId, worker_id: workerIdMap[p.worker_id] || '' });
            }
          }
        }
      }

      // 5. Global items (expenses, logs, punch, changes)
      if (data.expenses) {
        for (const ex of data.expenses) await api('add_expense', { ...ex, id: undefined });
      }
      if (data.logs) {
        for (const lg of data.logs) await api('add_log', { ...lg, id: undefined });
      }
      if (data.punch_list) {
        for (const pl of data.punch_list) await api('add_punch', { ...pl, id: undefined });
      }
      if (data.changes) {
        for (const ch of data.changes) await api('add_change', { ...ch, id: undefined });
      }

      input.value = "";
      await init();
      toast(t('import_success') || "Podaci uspešno vraćeni.");
      
    } catch (err) {
      console.error('Import error:', err);
      toast(t('err_import_failed') || "Greška pri učitavanju backup-a.", 'err');
      input.value = "";
    }
  };
  reader.readAsText(file);
}
