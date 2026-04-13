// =============================================
// PDF EXPORT (Phases Only)
// =============================================
function exportPDF() {
  const data = (typeof appData !== 'undefined') ? appData : {};
  const p = data.plan || {};
  const phases = data.phases || [];
  
  // 1. Phases & Tasks HTML
  let phasesHtml = '';
  phases.forEach(ph => {
    let tasksHtml = '';
    let phaseTotalCost = 0;
    const phaseTasks = (data.tasks || []).filter(tk => tk.phase_id === ph.id);
    
    if (phaseTasks.length) {
      tasksHtml = phaseTasks.map(tk => {
        const wk = (data.workers || []).find(w => w.id === tk.worker_id);
        const costVal = Number(tk.cost || 0);
        if (costVal > 0) phaseTotalCost += costVal;

        const prioStyle = tk.priority === 'high' ? 'color:#ef4444;background:rgba(239,68,68,0.1);' 
                        : tk.priority === 'low' ? 'color:#0a84ff;background:rgba(10,132,255,0.1);' 
                        : 'color:#eab308;background:rgba(234,179,8,0.1);';
        
        const statusBg = tk.status === 'done' ? 'background:rgba(48,209,88,0.1);color:#30d158;border-color:rgba(48,209,88,0.4);' 
                       : tk.status === 'in_progress' ? 'background:rgba(10,132,255,0.1);color:#0a84ff;border-color:#0a84ff;' 
                       : 'background:#f5f5f7;color:#636366;border-color:#e5e5ea;';
        
        return `<div style="display:flex;align-items:center;gap:4px;margin-bottom:5px;flex-wrap:wrap;">
            <span style="font-size:10px;font-weight:600;min-width:110px;">${esc(taskTitle(tk))}</span>
            <span style="padding:1px 6px;border-radius:4px;font-size:8px;font-weight:600;border:1px solid currentColor;${prioStyle}">
              ${tk.priority==='high'?'↑ High':tk.priority==='low'?'↓ Low':'— Normal'}
            </span>
            ${wk ? `<span style="background:#f5f5f7;padding:1px 6px;border-radius:4px;font-size:8px;color:#111;border:1px solid #e5e5ea;">👷 ${esc(wk.name)}</span>` : ''}
            ${costVal > 0 ? `<span style="background:#fff7ed;padding:1px 6px;border-radius:4px;font-size:8px;font-weight:800;color:#c2410c;border:1px solid #fed7aa;">💰 ${fmt(costVal)}</span>` : ''}
            <span style="padding:1px 6px;border-radius:4px;font-size:8px;font-weight:600;border:1px solid currentColor;${statusBg}">
              ${t('status_' + (tk.status||(tk.done?'done':'todo'))) || (tk.status||(tk.done?'done':'todo'))}
            </span>
          </div>`;
      }).join('');
    } else {
      tasksHtml = `<div style="font-size:9px;color:#888;font-style:italic;">${t('no_tasks') || 'Nema zadataka.'}</div>`;
    }

    const uniqueWorkers = [...new Set(phaseTasks.map(tk => tk.worker_id).filter(id => id))]
      .map(id => (data.workers || []).find(w => w.id === id))
      .filter(w => w);

    const workersPdfText = uniqueWorkers.length > 0 
      ? `👷 ${t('needed_workers') || 'Potrebno'} ${uniqueWorkers.length} ${t('workers_label') || 'radnika'}: ${uniqueWorkers.map(w => esc(w.name)).join(', ')}`
      : '';

    phasesHtml += `
      <div style="display:flex;align-items:stretch;margin-bottom:20px;page-break-inside:avoid;">
        <div style="width:140px;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;text-align:left;padding-right:10px;">
          <h3 style="margin:0;font-size:11px;font-weight:700;color:#000;">${esc(phaseTitle(ph))}</h3>
          <div style="font-size:8px;color:#666;margin-top:1px;">
            ${(ph.start || ph.end) ? `${ph.start || '—'} do ${ph.end || '—'}` : ''}
          </div>
          <div style="display:flex;flex-direction:column;gap:3px;margin-top:4px;">
            <div style="display:flex;flex-wrap:wrap;gap:4px;">
              <div style="font-size:7px;color:#000;font-weight:700;background:rgba(0,0,0,0.05);padding:1px 4px;border-radius:3px;border:0.5px solid #ddd;">
                ${ph.progress || 0}% gotov
              </div>
              ${phaseTotalCost > 0 ? `<div style="font-size:8px;color:#15803d;font-weight:800;background:rgba(34,197,94,0.1);padding:1px 4px;border-radius:3px;border:1px solid rgba(34,197,94,0.2);">💰 ${fmt(phaseTotalCost)}</div>` : ''}
            </div>
            ${workersPdfText ? `<div style="font-size:7px;color:#4b5563;line-height:1.2;">${workersPdfText}</div>` : ''}
          </div>
        </div>
        <div style="width:18px;display:flex;align-items:stretch;margin-right:10px;margin-left:0;color:#ccc;">
          <svg viewBox="0 0 24 100" preserveAspectRatio="none" style="width:100%;height:100%;" stroke="currentColor" fill="none">
            <path d="M 4 0 C 20 0 20 10 20 45 C 20 50 24 50 24 50 C 20 50 20 50 20 55 C 20 90 20 100 4 100" stroke-width="1.5" vector-effect="non-scaling-stroke" stroke-linecap="round"/>
          </svg>
        </div>
        <div style="flex:1;padding-left:5px;display:flex;flex-direction:column;justify-content:center;padding-top:2px;padding-bottom:2px;">
          ${tasksHtml}
        </div>
      </div>
    `;
  });

  // 2. Wrap UI structure
  let existingOverlay = document.getElementById('bl-temp-print-overlay');
  if (existingOverlay) existingOverlay.remove();
  
  const printDiv = document.createElement('div');
  printDiv.id = 'bl-temp-print-overlay';
  printDiv.innerHTML = `
    <style>
      @media screen { #bl-temp-print-overlay { display: none !important; } }
      @media print {
        @page { size: A4 portrait; margin: 15mm; }
        html, body { visibility: visible !important; background: #fff !important; }
        #bl-temp-print-overlay { 
          display: block !important; 
          visibility: visible !important;
          width: 100%; 
          margin: 0; 
          padding: 0; 
          background: #fff !important; 
          color: #000 !important; 
        }
        body > *:not(#bl-temp-print-overlay) { display: none !important; }
        #bl-temp-print-overlay * { 
          visibility: visible !important;
          color: #000 !important;
          border-color: #ddd !important;
          -webkit-print-color-adjust: exact !important; 
          print-color-adjust: exact !important; 
        }
      }
    </style>
    
    <div style="width:100%;max-width:850px;margin:0 auto;color:#000;font-family:'Helvetica Neue',Arial,sans-serif;padding-bottom:40px;background:#fff;">
      <div style="border-bottom:3px solid #000;padding-bottom:1.5rem;margin-bottom:2rem;">
        <div style="font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;color:#666;margin-bottom:0.4rem;font-weight:700;">AA / STUDIO — Izveštaj Projekta</div>
        <h1 style="font-size:2.2rem;font-weight:800;margin:0 0 0.3rem;">${(p.title||'Project Report').replace(/</g, '&lt;')}</h1>
        <div style="color:#222;font-size:0.875rem;">${(p.address||'').replace(/</g, '&lt;')} &nbsp;|&nbsp; Datum: ${new Date().toLocaleDateString('sr-RS')}</div>
      </div>

      <h2 style="font-size:1.1rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:1.5rem;padding-bottom:0.5rem;border-bottom:1px solid #e5e5ea;color:#000;">
        Faze i Zadaci
      </h2>
      
      <div style="padding-top:10px;">
        ${phasesHtml}
      </div>
      
      <div style="border-top:1px solid #e5e5ea;padding-top:1.5rem;margin-top:3rem;font-size:0.75rem;color:#666;display:flex;justify-content:space-between;font-weight:600;">
        <span>AA / Studio Belgrade — aastudiobelgrade.rs</span>
        <span>Generisano: ${new Date().toLocaleString('sr-RS')}</span>
      </div>
    </div>
  `;
  
  document.body.appendChild(printDiv);
  setTimeout(() => { window.print(); }, 200);
}

// =============================================
// THEME SYSTEM — 4 themes: v2-dark, v2-light, v1-dark, v1-light
// =============================================
const _THEME_META = {
  'v2-dark':  { bg: '#0D1117', bd: '#6366F1', label: 'Indigo' },
  'v2-light': { bg: '#F1F5F9', bd: '#6366F1', label: 'Slate'  },
  'v1-dark':  { bg: '#1c1c1e', bd: '#636366', label: 'Classic' },
  'v1-light': { bg: '#f5f5f5', bd: '#c7c7cc', label: 'Light'  },
};

// Initialize the theme menu on load
(function createThemeMenu() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('themeMenu')) return;

  const menu = document.createElement('div');
  menu.id = 'themeMenu';
  menu.className = 'bl-theme-menu';
  menu.innerHTML = `
    <div class="bl-theme-menu-header" style="padding: 10px 10px 10px 31px; font-size: 0.8rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--mist); margin-bottom: 4px;">Select Theme</div>
    <button class="bl-theme-menu-item" data-theme-pick="v2-dark"  onclick="setTheme('v2-dark')">
      <span class="bl-theme-dot" style="background:#0D1117; border-color:#6366F1;"></span> Indigo Dark
    </button>
    <button class="bl-theme-menu-item" data-theme-pick="v2-light" onclick="setTheme('v2-light')">
      <span class="bl-theme-dot" style="background:#F1F5F9; border-color:#6366F1;"></span> Indigo Light
    </button>
    <button class="bl-theme-menu-item" data-theme-pick="v1-dark"  onclick="setTheme('v1-dark')">
      <span class="bl-theme-dot" style="background:#1c1c1e; border-color:#636366;"></span> Classic Dark
    </button>
    <button class="bl-theme-menu-item" data-theme-pick="v1-light" onclick="setTheme('v1-light')">
      <span class="bl-theme-dot" style="background:#f5f5f5; border-color:#c7c7cc;"></span> Classic Light
    </button>
  `;
  document.body.appendChild(menu);
})();

function setTheme(name) {
  const body  = document.querySelector('.blanner-body') || document.body;
  const v2css = document.getElementById('v2css');

  const isLight = name === 'v1-light' || name === 'v2-light';
  const isV2    = name === 'v2-dark'  || name === 'v2-light';

  // Apply color mode
  if (isLight) body.setAttribute('data-theme', 'light');
  else         body.removeAttribute('data-theme');

  // Toggle planner2.css (Indigo theme)
  if (v2css) {
    if (isV2) v2css.removeAttribute('disabled');
    else      v2css.setAttribute('disabled', 'true');
  }

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
  if (e && e.stopPropagation) e.stopPropagation();
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
  setTimeout(() => {
    const v2css  = document.getElementById('v2css');
    const saved  = localStorage.getItem('planner_theme');
    const themes = v2css
      ? ['v2-dark', 'v2-light', 'v1-dark', 'v1-light']
      : ['v1-dark', 'v1-light'];
    
    if (saved && themes.includes(saved)) {
      setTheme(saved);
    } else if (saved === 'dark') {
      setTheme('v1-dark');
    } else if (saved === 'light') {
      setTheme('v1-light');
    } else {
      setTheme(themes[0]);
    }
  }, 100);
})();

// =============================================
// BACKUP / RESTORE / EXPORT (JS Side)
// =============================================
async function exportProjectJSON() {
    const data = { ...appData, export_date: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Project_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
}

async function handleImportProject(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data.plan) throw new Error("Invalid format");

      // 1. Update Project basic info
      await api('update_project', data.plan);

      // 2. Clear & Restore workers
      const workerIdMap = {};
      if (data.workers) {
        for (const w of data.workers) {
          const res = await api('add_worker', { ...w, id: undefined });
          if (res.ok && res.worker) workerIdMap[w.id] = res.worker.id;
        }
      }

      // 3. Restore phases
      if (data.phases) {
        for (const ph of data.phases) {
          const res = await api('add_phase', { ...ph, id: undefined });
          if (res.ok && res.phase) {
            const newPhId = res.phase.id;
            // Restore tasks for this phase
            const phaseTasks = (data.tasks || []).filter(t => t.phase_id === ph.id);
            for (const t of phaseTasks) {
              await api('add_task', { 
                ...t, 
                id: undefined, 
                phase_id: newPhId, 
                worker_id: workerIdMap[t.worker_id] || '' 
              });
            }
            // Restore materials
            const phaseMaterials = (data.materials || []).filter(m => m.phase_id === ph.id);
            for (const m of phaseMaterials) {
              await api('add_material', { ...m, id: undefined, phase_id: newPhId });
            }
            // Restore payments
            const phasePayments = (data.payments || []).filter(p => p.phase_id === ph.id);
            for (const p of phasePayments) {
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
