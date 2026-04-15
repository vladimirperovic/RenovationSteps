function taskNotes(tk) {
  if (currentLang === 'sr') {
    if (tk.notes_sr) return tk.notes_sr;
    if (TASK_NOTES_TRANSLATIONS[tk.title]) return TASK_NOTES_TRANSLATIONS[tk.title];
  }
  if (currentLang === 'ru' && tk.notes_ru) return tk.notes_ru;
  if (currentLang === 'zh' && tk.notes_zh) return tk.notes_zh;
  return tk.notes || '';
}

function showTaskDetail(title) {
  // Look up by exact title first, then fall back to alias mapping
  const lookupKey = TASK_DETAILED_DESCRIPTIONS[title] ? title : (TASK_ALIASES[title] || title);
  const detail = TASK_DETAILED_DESCRIPTIONS[lookupKey];
  if (!detail) {
    document.getElementById('taskDetailContent').innerHTML = `<div style="text-align:center;padding:2rem;color:var(--text-secondary);"><p>${t('no_details_available')}</p></div>`;
    openModal('taskDetailModal');
    return;
  }
  const desc = currentLang === 'sr' ? detail.desc_sr :
               currentLang === 'ru' ? (detail.desc_ru || detail.desc_en) :
               currentLang === 'zh' ? (detail.desc_zh || detail.desc_en) :
               detail.desc_en;
  const titleText = currentLang === 'sr' ? (detail.title_sr || title) :
                    currentLang === 'ru' ? (detail.title_ru || title) :
                    currentLang === 'zh' ? (detail.title_zh || title) :
                    title;
  const hasImage = detail.image;
  document.getElementById('taskDetailContent').innerHTML = `
    <div class="task-detail-split">
      ${hasImage ? `
      <div class="task-detail-image-side">
        <img src="${detail.image}" alt="${esc(titleText)}" loading="lazy"/>
      </div>` : `
      <div class="task-detail-image-side" style="background:#fff;flex:1;">
        <div style="display:flex;align-items:center;justify-content:center;width:120px;height:120px;border-radius:50%;background:rgba(0,196,204,0.1);border:1px solid rgba(0,196,204,0.2);color:var(--accent-main);">
          ${detail.icon}
        </div>
      </div>`}
      <div class="task-detail-text-side">
        <h2 class="task-detail-title">${esc(titleText)}</h2>
        <div class="task-detail-desc">${esc(desc)}</div>
      </div>
    </div>
  `;
  openModal('taskDetailModal');
}


function statusLabel(s) {
  return t('status_' + s) || s;
}

// ---- OVERVIEW ----
let budgetChart = null;

function renderOverview() {
  try {
    const p = appData.plan || {};
    const defaultTitle = t('default_project_name') || 'My Project';
    
    // 1. Sidebar User Info (Critical UI)
    try {
      let userLabel = p.client_name || t('lbl_client_name') || 'Client';
      if (typeof IS_ADMIN !== 'undefined' && IS_ADMIN) userLabel = t('role_admin') || 'Administrator';
      
      const avatarEl = document.getElementById('blUserAvatar');
      if (avatarEl) avatarEl.textContent = (userLabel.charAt(0) || 'U').toUpperCase();
      const nameEl = document.getElementById('blUserName');
      if (nameEl) nameEl.textContent = userLabel;
    } catch(e) { console.error("User info fail", e); }

    // 2. Headings
    const planTitleEl = document.getElementById('planTitle');
    if (planTitleEl) planTitleEl.textContent = p.title || defaultTitle;
    
    const heroTitle = document.getElementById('ovHeroTitle');
    if (heroTitle && p.title) {
      const parts = p.title.trim().split(/\s+/);
      if (parts.length > 1) {
        const last = parts.pop();
        const first = parts.join(' ');
        heroTitle.style.lineHeight = '1.1';
        heroTitle.innerHTML = `${esc(first)}<br><span style="display: inline-block; padding-right: 0.15em; padding-bottom: 0.1em; font-family: 'Playfair Display', serif; font-style: italic; font-weight: 400; background: linear-gradient(135deg, var(--accent-main), #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${esc(last)}</span>`;
      } else {
        heroTitle.textContent = p.title;
      }
    }
    
    const heroDesc = document.getElementById('ovHeroDesc');
    if (heroDesc) {
      if (p.address && p.address.trim() !== '') {
        heroDesc.textContent = t('lbl_address') + ': ' + p.address;
      } else {
        heroDesc.textContent = t('hero_desc_default') || 'Track your budget and progress.';
      }
    }

    // 3. Stats & KPI Calculation
    try {
      const rawBudget = Number(p.total_budget || 0);
      const tasks = Array.isArray(appData.tasks) ? appData.tasks : [];
      const expenses = Array.isArray(appData.expenses) ? appData.expenses : [];
      const phs = Array.isArray(appData.phases) ? appData.phases : [];
      const wks = Array.isArray(appData.workers) ? appData.workers : [];

      const expCosts = expenses.reduce((s,ex) => s + Number(ex?.amount || 0), 0);
      const doneTaskCosts = tasks.filter(tk => tk?.status === 'done').reduce((s,tk) => s + Number(tk?.cost || 0), 0);
      const spent = expCosts + doneTaskCosts;
      const remaining = Math.max(0, rawBudget - spent);
      const pct = rawBudget > 0 ? Math.min(100, (spent/rawBudget)*100) : 0;

      // Update UI Elements
      const setVal = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };

      setVal('statHeroBudget', typeof fmt==='function' ? fmt(rawBudget) : rawBudget);
      setVal('ovBudgetTotal', typeof fmt==='function' ? fmt(rawBudget) : rawBudget);
      setVal('statSpent', (t('spent_prefix')||'Spent') + ': ' + (typeof fmt==='function' ? fmt(spent) : spent));
      
      setVal('statPhases', phs.length);
      const activePhs = phs.filter(ph => ph?.status === 'active').length;
      setVal('statPhasesActive', (t('active_prefix')||'Active') + ': ' + activePhs);
      
      setVal('statTasks', tasks.length);
      const doneTks = tasks.filter(tk => tk?.done).length;
      setVal('statTasksDone', (t('completed_prefix')||'Done') + ': ' + doneTks);
      
      setVal('statWorkers', wks.length);

      // Health Status
      const allDone = phs.length > 0 && phs.every(x => x?.status === 'done');
      const anyActive = phs.some(x => x?.status === 'active');
      const projectStarted = p.start_date && new Date(p.start_date) <= new Date();
      
      const healthEl = document.getElementById('ovHealthVal');
      if (healthEl) {
        if (allDone) { 
          healthEl.textContent = t('status_complete'); 
          healthEl.style.color='var(--status-done)'; 
        } else if (anyActive || projectStarted) { 
          healthEl.textContent = t('status_active'); 
          healthEl.style.color='var(--status-active)'; 
        } else { 
          healthEl.textContent = t('status_not_started'); 
          healthEl.style.color='var(--text-secondary)'; 
        }
      }

      // Budget Bar & Badges
      const bar = document.getElementById('budgetBar');
      if (bar) bar.style.width = pct.toFixed(1) + '%';
      const barLeft = document.getElementById('budgetBarLeft');
      if (barLeft) barLeft.textContent = typeof fmt==='function' ? fmt(spent) : spent;
      const barRight = document.getElementById('budgetBarRight');
      if (barRight) barRight.textContent = typeof fmt==='function' ? fmt(remaining) : remaining;
      const pctBadge = document.getElementById('ovBudgetPct');
      if (pctBadge) pctBadge.textContent = pct.toFixed(0) + '%';
      const donutCenter = document.getElementById('ovDonutCenter');
      if (donutCenter) donutCenter.textContent = pct.toFixed(0) + '%';

    } catch(e) { console.error("KPI calc fail", e); }

    // 4. Main Plan Progress (Middle Section)
    try {
      const progEl = document.getElementById('ovProgress');
      if (progEl) {
        const phs = Array.isArray(appData.phases) ? appData.phases : [];
        if (phs.length === 0) {
          progEl.innerHTML = `<div style="padding:2rem; text-align:center; opacity:0.5; font-size:0.8rem;">${t('no_phases_yet')}</div>`;
        } else {
          const phProgressions = phs.map(ph => {
            const pTasks = (appData.tasks || []).filter(tk => String(tk.phase_id) === String(ph.id));
            if (pTasks.length === 0) return ph.progress || 0;
            return Math.round((pTasks.filter(t => t.status === 'done').length / pTasks.length) * 100);
          });
          const avg = Math.round(phProgressions.reduce((s,p)=>s+p, 0) / phs.length);
          progEl.innerHTML = `
            <div style="display:flex; align-items:center; gap:1.5rem; margin-bottom:2.5rem; padding-bottom:1.5rem; border-bottom:1px solid var(--mist);">
              <div style="width:64px; height:64px; border-radius:18px; background:var(--frost); border:1px solid var(--mist); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                 <span style="font-size:1.5rem; font-weight:700; color:var(--text-primary); font-family:'Oswald',sans-serif;">${avg}%</span>
              </div>
              <div style="font-family:'Playfair Display',serif; font-style:italic; font-size:1.1rem; color:var(--text-primary);">${t('overall_progress')}</div>
            </div>
            <div style="display:flex; flex-direction:column; gap:1.5rem;">
              ${phs.map((ph, idx) => {
                const pr = phProgressions[idx];
                return `
                <div style="display:flex; flex-direction:column; gap:0.6rem;">
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span onclick="editPhase('${ph.id}')" style="cursor:pointer; font-weight:700; font-size:0.9rem;">${esc(phaseTitle(ph))}</span>
                    <span style="font-family:'Oswald',sans-serif; font-weight:700;">${pr}%</span>
                  </div>
                  <div style="height:4px; background:var(--mist); border-radius:10px; overflow:hidden;">
                    <div style="height:100%; width:${pr}%; background:var(--accent-main);"></div>
                  </div>
                </div>`;
              }).join('')}
            </div>`;
        }
      }
    } catch(e) { console.error("Progress render fail", e); }

    // 5. Upcoming Milestones
    try {
      const upEl = document.getElementById('ovUpcoming');
      if (upEl) {
        const today = new Date(); today.setHours(0,0,0,0);
        const limit = new Date(); limit.setDate(limit.getDate() + 60);
        let items = [];
        (appData.phases || []).filter(ph=>ph?.end).forEach(ph=>{
          const d = new Date(ph.end); if(d >= today && d <= limit) items.push({date:d, label:phaseTitle(ph), icon:'🏁', type:'phase', id:ph.id});
        });
        (appData.tasks || []).filter(tk=>!tk?.done && tk?.end_date).forEach(tk=>{
          const d = new Date(tk.end_date); if(d >= today && d <= limit) items.push({date:d, label:(typeof taskTitle==='function'?taskTitle(tk):tk.title), icon:'·', type:'task', id:tk.id});
        });
        items.sort((a,b)=>a.date-b.date);
        
        const countEl = document.getElementById('ovUpcomingCount');
        if (countEl) countEl.textContent = items.length || '';

        if (items.length === 0) {
          upEl.innerHTML = `<div style="padding:1rem; text-align:center; opacity:0.5; font-size:0.8rem;">${t('no_upcoming_events')}</div>`;
        } else {
          upEl.innerHTML = items.slice(0, 5).map(it => {
            const days = Math.ceil((it.date - today)/86400000);
            return `<div onclick="${it.type==='phase'?'editPhase':'editTask'}('${it.id}')" style="cursor:pointer; display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem; padding:0.5rem; border-radius:8px; transition:background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.02)'" onmouseout="this.style.background='transparent'">
              <div style="width:30px; height:30px; border-radius:6px; background:rgba(255,255,255,0.03); display:flex; align-items:center; justify-content:center;">${it.icon}</div>
              <div style="flex:1;">
                <div style="font-weight:600; font-size:0.85rem;">${esc(it.label)}</div>
                <div style="font-size:0.7rem; color:var(--text-secondary); opacity:0.6;">${days===0?'Today':days===1?'Tomorrow':'In '+days+' days'}</div>
              </div>
            </div>`;
          }).join('');
        }
      }
    } catch(e) { console.error("Upcoming fail", e); }

    // 6. Cashflow analysis
    try {
      const cfEl = document.getElementById('cashflowText');
      if (cfEl) {
        const today7 = new Date(); today7.setHours(0,0,0,0);
        const limit7 = new Date(today7); limit7.setDate(limit7.getDate() + 7);
        let upcomingCost = 0;
        let upcomingItems = [];
        (appData.payments || []).filter(p => !p.paid && p.due_date).forEach(p => {
          const d = new Date(p.due_date);
          if (d >= today7 && d <= limit7) { upcomingCost += Number(p.amount || 0); upcomingItems.push(p.desc); }
        });
        if (upcomingItems.length === 0) cfEl.textContent = t('no_obligations_next_7') || 'No obligations next 7 days.';
        else cfEl.textContent = (t('total_due')||'Total Due') + ': ' + (typeof fmt==='function'?fmt(upcomingCost):upcomingCost) + ' — ' + upcomingItems.join(', ');
      }
    } catch(e) {}

    // 7. Variance Chart
    try {
      const varCtx = document.getElementById('varianceChart');
      if (varCtx && typeof Chart !== 'undefined') {
        let catMap = {};
        (appData.expenses||[]).forEach(ex => {
          if(!ex || !ex.category) return;
          const c = t('cat_' + String(ex.category).toLowerCase()) || String(ex.category);
          catMap[c] = (catMap[c] || 0) + Number(ex.amount || 0);
        });
        const varLabels = Object.keys(catMap);
        const varValues = Object.values(catMap);
        if (window._varianceChart) window._varianceChart.destroy();
        if (varLabels.length > 0) {
          window._varianceChart = new Chart(varCtx, {
            type: 'bar',
            data: {
              labels: varLabels,
              datasets: [{ 
                label: t('lbl_amount')||'Amount', 
                data: varValues,
                backgroundColor: ['#6366f1','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#ec4899'],
                borderWidth: 0, 
                borderRadius: 4 
              }]
            },
            options: { 
              responsive: true, 
              maintainAspectRatio: false, 
              plugins: { legend: { display: false } },
              scales: { 
                x: { ticks: { color: 'var(--text-secondary)', font: { size: 10 } }, grid: { display: false } },
                y: { ticks: { color: 'var(--text-secondary)', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.05)' } } 
              } 
            }
          });
        }
      }
    } catch(e) {}

    if (window.lucide) {
      try { lucide.createIcons(); } catch(e) {}
    }

  } catch(e) {
    console.error("renderOverview critical fail", e);
  }
}

function taskCardHtml(tk, isKanban = false) {
  const ph = appData.phases.find(p => String(p.id) === String(tk.phase_id));
  const wk = appData.workers.find(w => String(w.id) === String(tk.worker_id));
  const prioColor = tk.priority === 'high' ? '#ef4444' : tk.priority === 'normal' ? '#eab308' : '#0a84ff';
  const statusStyles = {
    todo: 'border-color: var(--mist); color: var(--text-secondary); background: transparent;',
    in_progress: 'border-color: #0a84ff !important; color: #0a84ff !important; background: rgba(10, 132, 255, 0.25) !important; border-width: 1.5px !important;',
    done: 'border-color: #10b981 !important; color: #10b981 !important; background: rgba(16, 185, 129, 0.25) !important; border-width: 1.5px !important;'
  };
  
  return `
    <div class="${isKanban ? 'kanban-card-editorial' : 'phase-task-card-editorial'}" 
         ${isKanban ? `draggable="true" ondragstart="dragTask(event, '${esc(tk.id)}')" id="card-${esc(tk.id)}"` : ''}
         style="background: rgba(255,255,255,0.015); border: 1px solid var(--mist); border-radius: 16px; padding: 1.25rem; margin-bottom: 1rem; cursor: ${isKanban ? 'grab' : 'default'}; transition: all 0.2s ease; position: relative;" 
         onmouseover="this.style.borderColor='var(--accent-main)'; this.style.background='rgba(255,255,255,0.03)'" 
         onmouseout="this.style.borderColor='var(--mist)'; this.style.background='rgba(255,255,255,0.015)'">
      <div style="position: absolute; left: 0; top: 1.25rem; width: 3px; height: 1.5rem; background: ${prioColor}; border-radius: 0 4px 4px 0;"></div>
      
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem; gap:0.5rem; padding-left: 0.5rem;">
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size:0.95rem; font-weight:700; line-height:1.4; color:var(--text-primary); cursor: pointer;" onclick="editTask('${esc(tk.id)}')">
          ${esc(taskTitle(tk))}
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <button class="bl-icon-btn" onclick="showTaskDetail('${esc(tk.title)}')" style="width:28px; height:28px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:50%; flex-shrink:0; cursor:pointer; color:var(--accent-main); display:flex; align-items:center; justify-content:center; transition:all 0.2s;" title="How To Guide" onmouseover="this.style.background='var(--accent-main)'; this.style.color='#000'" onmouseout="this.style.background='rgba(255,255,255,0.05)'; this.style.color='var(--accent-main)'">
            <i data-lucide="info" style="width:16px; height:16px;"></i>
          </button>
          <button class="bl-icon-btn" onclick="deleteTask('${tk.id}')" style="width:24px; height:24px; border-radius:50%; opacity:0.3; background: transparent; border: none; cursor: pointer; color: var(--text-secondary);">×</button>
        </div>
      </div>

      ${!isKanban && ph ? `<div style="font-family:'Plus Jakarta Sans',sans-serif; font-size:0.65rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-secondary); margin-bottom:0.75rem; padding-left: 0.5rem; opacity: 0.6;">${esc(phaseTitle(ph))}</div>` : ''}

      <div style="display:flex; flex-wrap:wrap; align-items:center; gap:0.6rem; padding-left: 0.5rem;">
        <!-- Priority Select/Chip -->
        <select onchange="setTaskPriority('${tk.id}', this.value)" style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.6rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: ${prioColor}; background: ${prioColor}15; border: 1px solid ${prioColor}30; border-radius: 4px; padding: 0.25rem 0.5rem; cursor: pointer; outline: none; transition: all 0.2s;">
          <option value="high" ${tk.priority==='high'?'selected':''}>HIGH</option>
          <option value="normal" ${tk.priority==='normal'?'selected':''}>NORMAL</option>
          <option value="low" ${tk.priority==='low'?'selected':''}>LOW</option>
        </select>
        
        <!-- Status Select/Chip -->
        <select onchange="setTaskStatus('${tk.id}', this.value)" style="font-family:'Plus Jakarta Sans',sans-serif; font-size:0.6rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; padding:0.25rem 0.5rem; border-radius:4px; cursor:pointer; outline:none; transition: all 0.2s; ${statusStyles[tk.status] || statusStyles.todo}">
          <option value="todo" ${tk.status==='todo'?'selected':''}>PENDING</option>
          <option value="in_progress" ${tk.status==='in_progress'?'selected':''}>ACTIVE</option>
          <option value="done" ${tk.status==='done'?'selected':''}>DONE</option>
        </select>

        ${wk ? `<div class="bl-worker-badge" onclick="editWorker('${wk.id}')" style="display:inline-flex; align-items:center; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.65rem; font-weight:700; color:var(--accent-main); background:var(--accent-main)10; padding:0.25rem 0.5rem; border-radius:4px; border:1px solid var(--accent-main)30; cursor:pointer;"><i data-lucide="user" style="width:12px; height:12px; margin-right:4px;"></i> ${esc(wk.name)}</div>` : ''}
        
        ${tk.cost > 0 ? `<div style="display:inline-flex; align-items:center; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.65rem; font-weight:700; color:var(--text-secondary); background:var(--frost); border:1px solid var(--mist); padding:0.25rem 0.5rem; border-radius:4px;">${fmt(tk.cost)}</div>` : ''}

        <div style="display:inline-flex; align-items:center; gap:0.4rem; background:rgba(255,255,255,0.03); padding:0.15rem 0.5rem; border-radius:4px; border:1px solid var(--mist);">
          <i data-lucide="calendar" style="width:12px; height:12px; opacity:0.5;"></i>
          <input type="date" value="${tk.start_date || ''}" onchange="updateTaskDateQuick('${tk.id}', 'start_date', this.value)" style="background:transparent; border:none; color:var(--text-secondary); font-family:'JetBrains Mono',monospace; font-size:0.65rem; padding:0; outline:none; cursor:pointer; width:85px;">
          <span style="opacity:0.3; font-size:0.65rem;">→</span>
          <input type="date" value="${tk.end_date || ''}" onchange="updateTaskDateQuick('${tk.id}', 'end_date', this.value)" style="background:transparent; border:none; color:var(--text-secondary); font-family:'JetBrains Mono',monospace; font-size:0.65rem; padding:0; outline:none; cursor:pointer; width:85px;">
        </div>
      </div>
    </div>
  `;
}

// ---- PHASES ----
function renderPhases() {
  try {
    const el = document.getElementById('phasesList');
    if (!el) return;
    
    // Global budget setup for phases tab
    const rawBudget = Number(appData.plan?.total_budget || 0);
    const tasks = Array.isArray(appData.tasks) ? appData.tasks : [];
    const expenses = Array.isArray(appData.expenses) ? appData.expenses : [];
    const expCosts = expenses.reduce((s,ex) => s + Number(ex?.amount || 0), 0);
    const doneTaskCosts = tasks.filter(tk => tk?.status === 'done').reduce((s,tk) => s + Number(tk?.cost || 0), 0);
    const spent = expCosts + doneTaskCosts;
    
    const gbEl = document.getElementById('phGlobalBudget');
    if (gbEl) gbEl.textContent = typeof fmt==='function' ? fmt(rawBudget) : rawBudget;
    const gsEl = document.getElementById('phGlobalSpent');
    if (gsEl) gsEl.textContent = typeof fmt==='function' ? fmt(spent) : spent;
    
    if (!appData.phases || !appData.phases.length) {
      el.innerHTML = `
        <div style="text-align:center; padding:5rem 2rem; border: 1px dashed var(--mist); border-radius:32px; background:rgba(255,255,255,0.01);">
          <div style="font-size:3rem; margin-bottom:1.5rem;">🏗️</div>
          <div style="font-family:'Oswald',sans-serif; font-size:1.5rem; font-weight:700; color:var(--text-primary); margin-bottom:0.5rem;" data-i18n="no_phases_empty">No phases planned yet</div>
          <button class="bl-btn bl-btn-primary" onclick="openAddPhaseModal()" style="margin-top:1rem;">+ ${t('add_phase')}</button>
        </div>
      `;
      return;
    }

    const phasesHtml = appData.phases.map((ph, i) => {
      const phaseTasks = (appData.tasks || []).filter(tk => tk && String(tk.phase_id) === String(ph.id));
      const totalCost = phaseTasks.reduce((sum, tk) => sum + Number(tk.cost || 0), 0);
      const spentCost = phaseTasks.filter(t => t.status === 'done').reduce((sum, tk) => sum + Number(tk.cost || 0), 0);
      const uniqueWorkers = [...new Set(phaseTasks.map(tk => tk.worker_id).filter(id => id))]
        .map(id => appData.workers.find(w => w.id === id))
        .filter(w => w);

      const prog = phaseTasks.length > 0 
        ? Math.round((phaseTasks.filter(t => t.status === 'done').length / phaseTasks.length) * 100) 
        : (ph.progress || 0);
      const statusColor = ph.status==='done' ? 'var(--status-done)' : ph.status==='active' ? 'var(--status-active)' : 'var(--status-pending)';
      const statusBg    = ph.status==='done' ? 'var(--status-done-bg)' : ph.status==='active' ? 'var(--status-active-bg)' : 'var(--status-pending-bg)';

      return `
        <div class="ph-editorial-card" style="margin-bottom: 3rem; position: relative;">
          <!-- Phase Indicator -->
          <div style="display: flex; align-items: baseline; gap: 1.5rem; margin-bottom: 2rem;">
            <span style="font-family: 'Oswald', sans-serif; font-size: 5rem; font-weight: 800; line-height: 0.8; color: var(--mist); opacity: 0.4;">${String(i+1).padStart(2,'0')}</span>
            <div style="flex: 1; min-width: 0;">
              <div style="display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 0.5rem;">
                 <h3 class="ph-title-editorial" onclick="editPhase('${ph.id}')" style="cursor:pointer; font-family: 'Oswald', sans-serif; font-size: clamp(1.5rem, 5vw, 2.25rem); font-weight: 700; text-transform: uppercase; color: var(--text-primary); margin: 0; letter-spacing: -0.02em; min-width: 200px; flex: 1;">${esc(phaseTitle(ph))}</h3>
                 <div style="display: flex; align-items: center; gap: 0.75rem; flex-shrink: 0;">
                    <span class="ph-status-pill-editorial" style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; padding: 0.4rem 1rem; border-radius: 9999px; background: ${statusBg}; color: ${statusColor}; border: 1px solid ${statusColor}40;">${statusLabel(ph.status)}</span>
                    <div style="display:flex; gap:0.5rem;">
                      <button class="bl-icon-btn" onclick="editPhase('${ph.id}')" style="width:32px; height:32px; border-radius:50%; background:var(--frost); border:1px solid var(--mist);">✎</button>
                      <button class="bl-icon-btn bl-icon-btn-danger" onclick="deletePhase('${ph.id}')" style="width:32px; height:32px; border-radius:50%; background:rgba(239,68,68,0.05); border:1px solid rgba(239,68,68,0.2);">×</button>
                    </div>
                 </div>
              </div>
              <div style="display: flex; align-items: center; gap: 1.5rem; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.85rem; color: var(--text-secondary);">
                 <div style="display: flex; align-items: center; gap: 0.5rem;"><i data-lucide="calendar" style="width:14px; height:14px;"></i> ${ph.start || '?'} → ${ph.end || '?'}</div>
                 <div style="display: flex; align-items: center; gap: 0.5rem;">${fmt(totalCost)}</div>
                 <div style="display: flex; align-items: center; gap: 0.5rem;"><i data-lucide="users" style="width:14px; height:14px;"></i> ${uniqueWorkers.length} ${t('workers_label')}</div>
              </div>
            </div>
          </div>

          <div class="ph-editorial-body" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; background: rgba(255,255,255,0.01); border: 1px solid var(--mist); border-radius: 24px; padding: clamp(1rem, 5vw, 2.5rem); position: relative; overflow: hidden;">
             <!-- Phase Sidebar -->
             <div style="border-right: 1px solid var(--mist); padding-right: 2.5rem;">
                <div style="margin-bottom: 2.5rem;">
                  <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; color: var(--text-secondary); margin-bottom: 1rem;">Completion Status</div>
                  <div style="display: flex; align-items: baseline; gap: 0.5rem;">
                    <span style="font-family: 'Oswald', sans-serif; font-size: 3.5rem; font-weight: 700; color: var(--text-primary); line-height: 1;">${prog}</span>
                    <span style="font-family: 'Playfair Display', serif; font-style: italic; font-size: 1.5rem; color: var(--accent-main);">percent</span>
                  </div>
                  <div style="margin-top: 1rem; position: relative; height: 6px; background: var(--mist); border-radius: 10px; overflow: visible;">
                    <div style="position: absolute; left: 0; top: 0; height: 100%; width: ${prog}%; background: ${statusColor}; border-radius: 10px; box-shadow: 0 0 15px ${statusColor}40;"></div>
                    <input type="range" min="0" max="100" value="${prog}" 
                      oninput="quickUpdatePhaseProgress('${ph.id}', this.value)"
                      style="position: absolute; width: 100%; height: 24px; top: -9px; -webkit-appearance: none; background: transparent; z-index: 1; cursor: pointer;"
                      class="ph-prog-slider">
                  </div>
                </div>

                <div>
                  <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; color: var(--text-secondary); margin-bottom: 1rem;">Strategic Notes</div>
                  <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.9rem; line-height: 1.7; color: var(--text-secondary);">${esc(phaseNotes(ph)) || '<span style="opacity:0.4; font-style:italic;">No strategic notes provided for this phase.</span>'}</div>
                </div>

                <div style="margin-top: 2.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">
                   ${uniqueWorkers.map(w => `<span onclick="editWorker('${w.id}')" style="cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.65rem; font-weight:700; padding:0.4rem 0.8rem; border-radius:8px; background:var(--frost); border:1px solid var(--mist); color:var(--text-primary);">👷 ${esc(w.name)}</span>`).join('')}
                </div>

                <div style="margin-top: 2.5rem; border-top: 1px solid var(--mist); padding-top: 1.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                   <div>
                      <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.6rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-secondary); margin-bottom: 0.25rem;">Phase Budget</div>
                      <div style="font-family: 'Oswald', sans-serif; font-size: 1.25rem; font-weight: 700; color: var(--text-primary);">${typeof fmt==='function' ? fmt(totalCost) : totalCost}</div>
                   </div>
                   <div>
                      <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.6rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-secondary); margin-bottom: 0.25rem;">Capital Realized</div>
                      <div style="font-family: 'Oswald', sans-serif; font-size: 1.25rem; font-weight: 700; color: var(--accent-main);">${typeof fmt==='function' ? fmt(spentCost) : spentCost}</div>
                   </div>
                </div>
             </div>

             <!-- Task List Panel -->
             <div>
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.5rem;">
                  <h4 style="font-family: 'Oswald', sans-serif; font-size: 1.25rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-primary); margin: 0;">Operational <span style="font-family: 'Playfair Display', serif; font-style: italic; font-weight: 400; color: var(--accent-main);">Tasks</span></h4>
                  <button onclick="openAddTaskModal('${ph.id}')" style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; color: var(--accent-main); background: none; border: none; cursor: pointer; letter-spacing: 0.1em;">+ Add Execution Link</button>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                  ${phaseTasks.length > 0 ? phaseTasks.map(tk => taskCardHtml(tk)).join('') : `<div style="padding: 2.5rem; text-align: center; border: 1px dashed var(--mist); border-radius: 16px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.8rem; color: var(--text-secondary); opacity: 0.5;">No operational tasks assigned to this phase.</div>`}
                </div>
             </div>
          </div>
        </div>
      `;
    }).join('');

    el.innerHTML = `
      <div style="margin-bottom: 4rem;">
         ${phasesHtml}
      </div>
      <div style="display: flex; justify-content: center; padding: 2rem 0;">
        <button class="bl-btn bl-btn-primary" onclick="openAddPhaseModal()" style="padding: 1rem 3rem; border-radius: 12px; font-family:'Oswald',sans-serif; font-size:1.1rem; text-transform:uppercase; letter-spacing:0.1em;">
          Establish New Structural Phase
        </button>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  } catch(e) { console.error("renderPhases fail", e); }
}

// ---- FINANCES (Unified) ----
function renderFinances() {
  try {
    const tbody = document.getElementById('financesList');
    if (!tbody) return;

    // Budget from plan
    const budget = Number(appData.plan?.total_budget || 0);
    
    const taskCosts = (appData.tasks || []).reduce((s,t2) => s + Number(t2.cost || 0), 0);
    const expCosts  = (appData.expenses || []).reduce((s,e) => s + Number(e.amount || 0), 0);
    const payTotal  = (appData.payments || []).reduce((s,p) => s + Number(p.amount || 0), 0);
    const total     = taskCosts + expCosts + payTotal;
    
    const taskAdvance = (appData.tasks || []).reduce((s,t2) => s + Number(t2.advance_amount || 0), 0);
    const expAdvance  = (appData.expenses || []).reduce((s,e) => s + Number(e.advance_amount || 0), 0);
    const payAdvance  = (appData.payments || []).reduce((s,p) => s + Number(p.advance_amount || 0), 0);
    const totalAdvance = taskAdvance + expAdvance + payAdvance;

    // Update KPI displays if they exist in the editorial layout
    const elBudget = document.getElementById('finBudget');
    if (elBudget) elBudget.textContent = fmt(budget);
    const elTotal = document.getElementById('finTotal');
    if (elTotal) elTotal.textContent = fmt(total);
    const elAdv = document.getElementById('finAdvance');
    if (elAdv) elAdv.textContent = fmt(totalAdvance);

    // Combine everything into a single financial log
    let items = [];
    
    // Add payments
    (appData.payments || []).forEach(pm => {
      const wk = (appData.workers || []).find(w => String(w.id) === String(pm.worker_id));
      items.push({
        date: pm.due_date || pm.paid_date || '',
        to: wk ? wk.name : 'Labor',
        desc: pm.desc,
        amount: pm.amount,
        advance: pm.advance_amount || 0,
        is_advance: pm.advance_paid || false,
        type: 'payment',
        id: pm.id,
        worker_id: pm.worker_id,
        paid: pm.paid || false
      });
    });
    
    // Add tasks
    (appData.tasks || []).filter(tk => (Number(tk.cost) > 0 || Number(tk.advance_amount) > 0)).forEach(tk => {
      const wk = (appData.workers || []).find(w => String(w.id) === String(tk.worker_id));
      items.push({
        date: tk.end_date || tk.start_date || '',
        to: wk ? wk.name : 'Labor',
        desc: taskTitle(tk),
        amount: tk.cost,
        advance: tk.advance_amount || 0,
        is_advance: tk.advance_paid || false,
        type: 'task',
        id: tk.id,
        worker_id: tk.worker_id
      });
    });
    (appData.expenses || []).forEach(ex => {
      items.push({
        date: ex.date || '',
        to: ex.recipient || t('cat_' + String(ex.category || '').toLowerCase()) || ex.category,
        desc: ex.desc,
        amount: ex.amount,
        advance: ex.advance_amount || 0,
        is_advance: ex.advance_paid || false,
        type: 'expense',
        id: ex.id
      });
    });

    items.sort((a,b) => new Date(b.date || 0) - new Date(a.date || 0));

    if (!items.length) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:5rem 2rem;color:var(--text-secondary); opacity:0.6; font-family:'Plus Jakarta Sans',sans-serif;">${t('no_expenses')}</td></tr>`;
      return;
    }

    tbody.innerHTML = items.map(it => {
      const workerAction = it.worker_id ? `onclick="editWorker('${it.worker_id}')" style="cursor:pointer;"` : '';
      const taskAction   = it.type === 'task' ? `onclick="editTask('${it.id}')" style="cursor:pointer;"` : '';
      const isPaid = it.paid || (it.type !== 'payment'); // Assuming tasks/expenses are accounted for
      const statusColor = isPaid ? '#10b981' : '#ef4444';
      const statusLabelText = isPaid ? 'RECONCILED' : 'DUE';
      
      return `
      <tr class="bl-finance-row">
        <td>
          <div style="font-family:'JetBrains Mono',monospace; font-size:0.75rem; color:var(--text-secondary); opacity:0.8;">${it.date || '—'}</div>
        </td>
        <td>
          <div style="font-family:'Plus Jakarta Sans',sans-serif; font-weight:700; font-size:0.95rem; color:var(--text-primary); cursor:pointer;" ${workerAction}>${esc(it.to)}</div>
          <div style="font-family:'Plus Jakarta Sans',sans-serif; font-size:0.6rem; font-weight:800; text-transform:uppercase; letter-spacing:0.08em; color:var(--accent-main); margin-top:0.35rem; opacity:0.7;">${it.type} entry</div>
        </td>
        <td>
          <div style="font-family:'Plus Jakarta Sans',sans-serif; font-size:0.875rem; color:var(--text-secondary); max-width:320px; line-height:1.5;" ${taskAction}>${esc(it.desc)}</div>
        </td>
        <td class="text-right">
          <div style="font-family:'Oswald',sans-serif; font-weight:700; font-size:1.25rem; color:var(--text-primary); letter-spacing:-0.01em;">${fmt(it.amount)}</div>
        </td>
        <td class="text-center">
          <div style="display:flex; align-items:center; justify-content:center; gap:0.5rem;">
            <span class="bl-status-badge-fin ${isPaid ? 'reconciled' : 'due'}">
              ${isPaid ? 'RECONCILED' : 'DUE'}
            </span>
            ${it.is_advance ? `<span class="bl-status-badge-fin advance">ADVANCE</span>` : ''}
          </div>
        </td>
        <td class="text-right">
          <button class="bl-icon-btn" onclick="${it.type==='task'?'editTask':(it.type==='expense'?'editExpense':'editPayment')}('${it.id}')" style="opacity:0.3; transition: all 0.2s;" onmouseover="this.style.opacity=1; this.style.transform='scale(1.1)'" onmouseout="this.style.opacity=0.3; this.style.transform='scale(1)'">✎</button>
        </td>
      </tr>`;
    }).join('');
    if (window.lucide) lucide.createIcons();
  } catch(e) { console.error("renderFinances fail", e); }
}

// ---- WORKERS ----
function renderWorkers() {
  try {
    const el = document.getElementById('workersList');
    if (!el) return;

    if (!appData.workers || !appData.workers.length) {
      el.innerHTML = `<div style="text-align:center; padding:5rem 2rem; border: 1px dashed var(--mist); border-radius:32px; background:rgba(255,255,255,0.01); color:var(--text-secondary);">${t('no_workers')}</div>`;
      return;
    }

    el.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 2rem;">
        ${appData.workers.map(w => {
          const hisTasks = (appData.tasks || []).filter(tk => tk && String(tk.worker_id) === String(w.id));
          const totalEarned = hisTasks.reduce((s,tk) => s + Number(tk.cost || 0), 0);
          const phaseIds = [...new Set(hisTasks.map(tk => tk.phase_id).filter(id => id))];
          const hisPhases = (appData.phases || []).filter(ph => phaseIds.includes(ph.id));
          const initial = (w.name || 'W').charAt(0).toUpperCase();

          return `
            <div class="worker-card-editorial" style="background: var(--card-bg); border: 1px solid var(--glass-border); border-radius: 32px; padding: 2.25rem; position: relative; transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); box-shadow: 0 10px 30px rgba(0,0,0,0.04); backdrop-filter: blur(10px);" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.08)'; this.style.borderColor='var(--accent-main)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.04)'; this.style.borderColor='var(--glass-border)'">
              <div style="position:absolute; top:0; left:50%; transform: translateX(-50%); width:70px; height:5px; background: #000; border-radius: 0 0 10px 10px;"></div>
              
              <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem;">
                <div style="width: 64px; height: 64px; border-radius: 20px; background: var(--accent-main)10; border: 1px solid var(--accent-main)30; display: flex; align-items: center; justify-content: center; font-family:'Oswald',sans-serif; font-size: 1.5rem; font-weight: 700; color: var(--accent-main);">
                  ${initial}
                </div>
                <div style="flex: 1;">
                   <h3 style="font-family: 'Oswald', sans-serif; font-size: 1.5rem; font-weight: 700; text-transform: uppercase; color: var(--text-primary); margin: 0; letter-spacing: -0.01em;">${esc(w.name)}</h3>
                   <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent-main);">${esc(w.trade) || 'General Contractor'}</div>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                  <button class="bl-icon-btn" onclick="editWorker('${w.id}')" style="width:32px; height:32px; border-radius:50%; background:var(--frost); border:1px solid var(--mist);">✎</button>
                  <button class="bl-icon-btn bl-icon-btn-danger" onclick="deleteWorker('${w.id}')" style="width:32px; height:32px; border-radius:50%; background:rgba(239,68,68,0.05); border:1px solid rgba(239,68,68,0.2);">×</button>
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; margin-bottom: 2rem;">
                 <div style="background: var(--card-bg); border: 1px solid var(--glass-border); border-radius: 14px; padding: 1.25rem; backdrop-filter: blur(10px); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: 0.35rem;">
                    <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.55rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: var(--accent-main); opacity: 0.9;">Cumulative Earnings</div>
                    <div style="font-family: 'Oswald', sans-serif; font-size: 1.35rem; font-weight: 700; color: var(--text-primary);">${fmt(totalEarned)}</div>
                 </div>
                 <div style="background: var(--card-bg); border: 1px solid var(--glass-border); border-radius: 14px; padding: 1.25rem; backdrop-filter: blur(10px); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: 0.35rem;">
                    <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.55rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: var(--accent-main); opacity: 0.9;">Active Mandates</div>
                    <div style="font-family: 'Oswald', sans-serif; font-size: 1.35rem; font-weight: 700; color: var(--text-primary);">${hisTasks.length} <span style="font-size:0.75rem; font-weight:500; opacity:0.4; letter-spacing:0.05em; vertical-align:middle;">TASKS</span></div>
                 </div>
              </div>

              <div style="margin-bottom: 1.5rem;">
                 <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-secondary); margin-bottom: 0.75rem;">Phase Integration</div>
                 <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                   ${hisPhases.length > 0 ? hisPhases.map(ph => `<span style="font-family:'Plus Jakarta Sans',sans-serif; font-size:0.65rem; font-weight:700; padding:0.3rem 0.6rem; border-radius:6px; background:var(--frost); border:1px solid var(--mist); color:var(--text-primary);">${esc(phaseTitle(ph))}</span>`).join('') : '<span style="font-size:0.7rem; color:var(--silver); font-style:italic;">No active phases</span>'}
                 </div>
              </div>

              <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 1.5rem; border-top: 1px solid var(--mist);">
                 <div style="display: flex; align-items: center; gap: 0.75rem; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.85rem; color:var(--text-secondary);">
                    <i data-lucide="phone" style="width:14px; height:14px;"></i>
                    <span>${esc(w.phone) || 'N/A'}</span>
                 </div>
                 <div style="display: flex; align-items: center; gap: 0.75rem; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.85rem; color:var(--text-secondary);">
                    <i data-lucide="mail" style="width:14px; height:14px;"></i>
                    <span>Email Portal</span>
                 </div>
              </div>

            </div>
          `;
        }).join('')}
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  } catch(e) { console.error("renderWorkers fail", e); }
}


// ---- PUNCH LIST ----
function renderPunchList() {
  const list = document.getElementById('punchList');
  if (!list) return;
  if (!appData.punch_list || !appData.punch_list.length) {
    list.innerHTML = `<div style="text-align:center; padding:3rem 2rem; color:var(--text-secondary); opacity:0.6; font-size:0.875rem;">${t('no_issues')}</div>`;
    return;
  }
  list.innerHTML = appData.punch_list.map(p => `
    <div class="bl-task-item ${p.done ? 'bl-task-done' : ''}" style="padding:1.25rem; background:var(--card-bg); border:1px solid var(--glass-border); border-radius:var(--radius-md); margin-bottom:0.75rem; display:flex; align-items:center; gap:1.25rem; backdrop-filter:blur(12px);">
      <label class="bl-task-check">
        <input type="checkbox" ${p.done ? 'checked' : ''} onchange="togglePunch('${p.id}', this.checked)">
        <span class="bl-checkmark"></span>
      </label>
      <div class="bl-task-body" style="flex:1;">
        <div class="bl-task-title" style="font-weight:600; color:var(--text-primary);">${esc(p.text)}</div>
      </div>
      <button class="bl-edit-btn" onclick="deletePunch('${p.id}')" style="color:#ff3b30; opacity:0.6;"><i data-lucide="trash-2" style="width:16px;height:16px;"></i></button>
    </div>`).join('');
  if (window.lucide) lucide.createIcons();
}

let isHighPriorityFilterActive = false;
window.toggleHighPriorityFilter = function() {
  isHighPriorityFilterActive = !isHighPriorityFilterActive;
  const btn = document.getElementById('filterHighPriorityBtn');
  if (btn) {
    if (isHighPriorityFilterActive) {
      btn.style.background = 'rgba(239, 68, 68, 0.1)';
      btn.style.borderColor = '#ef4444';
      btn.style.color = '#ef4444';
    } else {
      btn.style.background = 'var(--frost)';
      btn.style.borderColor = 'var(--mist)';
      btn.style.color = 'var(--text-secondary)';
    }
  }
  renderTasks();
};

// ---- TASKS (KANBAN) ----
function renderTasks() {
  try {
    const phaseSelect = document.getElementById('taskPhase');
    if (phaseSelect) {
      phaseSelect.innerHTML = `<option value="">${t('no_phase_option')}</option>` +
        appData.phases.map(ph => `<option value="${ph.id}">${esc(phaseTitle(ph))}</option>`).join('');
    }

    const workerSelect = document.getElementById('taskWorker');
    if(workerSelect) {
      workerSelect.innerHTML = `<option value="">—</option>` + appData.workers.map(w => `<option value="${w.id}">${esc(w.name)}</option>`).join('');
    }

    const cols = {
      todo: document.getElementById('tasks-todo'),
      in_progress: document.getElementById('tasks-in_progress'),
      done: document.getElementById('tasks-done')
    };

    if (!cols.todo) return;

    let counts = { todo:0, in_progress:0, done:0 };
    const buffers = { todo: [], in_progress: [], done: [] };

    appData.tasks.forEach(tk => {
      if (isHighPriorityFilterActive && tk.priority !== 'high') return;

      let s = tk.status || (tk.done ? 'done' : 'todo');
      counts[s] = (counts[s] || 0) + 1;

      buffers[s].push(taskCardHtml(tk, true));
    });

    cols.todo.innerHTML = buffers.todo.join('');
    cols.in_progress.innerHTML = buffers.in_progress.join('');
    cols.done.innerHTML = buffers.done.join('');

    const countElTodo = document.getElementById('count-todo');
    if (countElTodo) countElTodo.textContent = counts.todo;
    const countElInProgress = document.getElementById('count-in_progress');
    if (countElInProgress) countElInProgress.textContent = counts.in_progress;
    const countElDone = document.getElementById('count-done');
    if (countElDone) countElDone.textContent = counts.done;

    if (window.lucide) lucide.createIcons();
  } catch(e) { console.error("renderTasks fail", e); }
}

// Kanban Drag and Drop Logic
function dragTask(ev, id) {
  ev.dataTransfer.setData("task_id", id);
  setTimeout(() => document.getElementById(`card-${id}`).classList.add('dragging'), 0);
}

function allowDropTask(ev) {
  ev.preventDefault();
  const col = ev.target.closest('.bl-kanban-col');
  if (col) {
    document.querySelectorAll('.bl-kanban-col').forEach(c => c.classList.remove('drag-over'));
    col.classList.add('drag-over');
  }
}

function leaveDrop(ev) {
  const col = ev.target.closest('.bl-kanban-col');
  if (col && !col.contains(ev.relatedTarget)) col.classList.remove('drag-over');
}

async function dropTask(ev) {
  ev.preventDefault();
  document.querySelectorAll('.bl-kanban-col').forEach(c => c.classList.remove('drag-over'));
  const id = ev.dataTransfer.getData("task_id");
  const col = ev.target.closest('.bl-kanban-col');
  if (!col || !id) return;
  document.getElementById(`card-${id}`)?.classList.remove('dragging');
  
  const status = col.id.replace('col-', '');
  const tk = appData.tasks.find(x => x.id === id);
  if (tk && tk.status !== status) {
    const prevStatus = tk.status;
    const prevDone = tk.done;
    tk.status = status;
    tk.done = (status === 'done');
    renderTasks();
    renderOverview();
    renderPhases();
    const res = await api('update_task', {id, status, done: tk.done ? '1' : '0'});
    if (!res || !res.ok) {
      tk.status = prevStatus;
      tk.done = prevDone;
      renderTasks();
      renderOverview();
      renderPhases();
      toast(t('err_generic'), 'err');
    }
  }
}
// ---- GLOBAL SEARCH ----
let searchSelectedIndex = -1;

function openSearchModal() {
  const input = document.getElementById('globalSearchInput');
  if (!input) return;
  input.value = '';
  searchSelectedIndex = -1;
  document.getElementById('globalSearchResults').innerHTML = `
    <div style="padding: 3.5rem 2rem; text-align: center; color: var(--text-secondary); opacity: 0.4; font-size: 0.9rem;">
      <i data-lucide="command" style="width:32px; height:32px; margin-bottom:1rem;"></i>
      <div data-i18n="type_to_search">Type to explore your construction lifecycle...</div>
    </div>`;
  if (window.lucide) lucide.createIcons();
  openModal('searchModal');
  setTimeout(() => input.focus(), 100);
}

// Global Keypad Listeners (Cmd+K, Escape, Arrows)
document.addEventListener('keydown', (e) => {
  // 1. Handle Escape for ANY open modal
  if (e.key === 'Escape') {
    const activeModal = document.querySelector('.bl-modal-overlay.active, .search-palette-overlay.active, .bl-onboard-overlay.active');
    if (activeModal) {
      e.preventDefault();
      closeModal(activeModal.id);
      return;
    }
  }

  // 2. Handle Cmd+K / Ctrl+K
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    openSearchModal();
    return;
  }

  // 3. Search Palette Specific Navigation
  const searchModal = document.getElementById('searchModal');
  if (searchModal && searchModal.classList.contains('active')) {
    const results = document.querySelectorAll('.search-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      searchSelectedIndex = Math.min(searchSelectedIndex + 1, results.length - 1);
      updateSearchSelection(results);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      searchSelectedIndex = Math.max(searchSelectedIndex - 1, 0);
      updateSearchSelection(results);
    } else if (e.key === 'Enter') {
      if (searchSelectedIndex >= 0 && results[searchSelectedIndex]) {
        e.preventDefault();
        results[searchSelectedIndex].click();
      }
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const sa = document.getElementById('globalSearchInput');
  if (sa) {
    sa.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const resEl = document.getElementById('globalSearchResults');
      searchSelectedIndex = -1;
      
      if (!q) {
        resEl.innerHTML = `
          <div style="padding: 3.5rem 2rem; text-align: center; color: var(--text-secondary); opacity: 0.4; font-size: 0.9rem;">
            <i data-lucide="command" style="width:32px; height:32px; margin-bottom:1rem;"></i>
            <div data-i18n="type_to_search">Type to explore your construction lifecycle...</div>
          </div>`;
        if (window.lucide) lucide.createIcons();
        return;
      }

      let html = '';
      
      // Search Groups Definition
      const groups = [
        {
          title: t('nav_phases') || 'Phases',
          icon: 'layers',
          items: appData.phases.filter(p => phaseTitle(p).toLowerCase().includes(q)).map(p => ({
            id: p.id,
            title: phaseTitle(p),
            subtitle: t('structural_segment') || 'Structural Segment',
            action: `editPhase('${p.id}')`
          }))
        },
        {
          title: t('nav_tasks') || 'Tasks',
          icon: 'check-square',
          items: appData.tasks.filter(tk => taskTitle(tk).toLowerCase().includes(q)).slice(0, 8).map(tk => ({
            id: tk.id,
            title: taskTitle(tk),
            subtitle: phTitle(tk.phase_id),
            action: `editTask('${tk.id}')`
          }))
        },
        {
          title: t('nav_workers') || 'Workers',
          icon: 'users',
          items: appData.workers.filter(w => (w.name||'').toLowerCase().includes(q) || (w.trade||'').toLowerCase().includes(q)).map(w => ({
            id: w.id,
            title: w.name,
            subtitle: w.trade || (t('contractor') || 'Contractor'),
            action: `editWorker('${w.id}')`
          }))
        },
        {
          title: t('nav_materials') || 'Materials',
          icon: 'package',
          items: (appData.materials||[]).filter(m => (m.name||'').toLowerCase().includes(q)).slice(0, 8).map(m => ({
            id: m.id,
            title: m.name,
            subtitle: m.store || (t('procurement_item') || 'Procurement Item'),
            action: `editMaterial('${m.id}')`
          }))
        }
      ];

      groups.forEach(group => {
        if (group.items.length) {
          html += `<div class="search-group-title">${group.title}</div>`;
          group.items.forEach(it => {
            html += `
              <div class="search-item" onclick="closeModal('searchModal'); ${it.action}">
                <div class="search-item-icon"><i data-lucide="${group.icon}" style="width:18px; height:18px;"></i></div>
                <div class="search-item-content">
                  <div class="search-item-title">${esc(it.title)}</div>
                  <div class="search-item-subtitle">${esc(it.subtitle)}</div>
                </div>
              </div>`;
          });
        }
      });

      if (!html) {
        html = `
          <div style="padding: 4rem 2rem; text-align: center; color: var(--text-secondary); opacity: 0.6; font-size: 0.9rem;">
            No results found for "<span style="color:var(--text-primary)">${esc(q)}</span>"
          </div>`;
      }
      resEl.innerHTML = html;
      if (window.lucide) lucide.createIcons();
    });
  }
});

function phTitle(pid) {
  if (!pid) return '';
  const ph = appData.phases.find(p => String(p.id) === String(pid));
  return ph ? phaseTitle(ph) : '';
}

function updateSearchSelection(results) {
  results.forEach((r, idx) => {
    if (idx === searchSelectedIndex) {
      r.classList.add('selected');
      r.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    } else {
      r.classList.remove('selected');
    }
  });
}


/**
 * PREMIUM TASK DETAILS OVERLAY LOGIC
 */
window.showTaskDetails = function(taskId) {
  const tk = appData.tasks.find(t => String(t.id) === String(taskId));
  if (!tk) return;
  
  const ph = appData.phases.find(p => String(p.id) === String(tk.phase_id));
  const wk = appData.workers.find(w => String(w.id) === String(tk.worker_id));
  
  const titleEl = document.getElementById('tdTitle');
  const phaseEl = document.getElementById('tdPhase');
  const notesEl = document.getElementById('tdNotes');
  const datesEl = document.getElementById('tdDates');
  const costEl  = document.getElementById('tdCost');
  const workerEl = document.getElementById('tdWorker');
  const prioEl  = document.getElementById('tdPriority');
  const statEl  = document.getElementById('tdStatus');
  
  if (titleEl) titleEl.textContent = taskTitle(tk);
  if (phaseEl) phaseEl.textContent = ph ? phaseTitle(ph) : 'Independent Task';
  if (notesEl) notesEl.innerHTML = (tk.notes ? esc(tk.notes) : '<span style="opacity:0.4; font-style:italic;">Detailed execution brief currently unavailable.</span>');
  if (datesEl) datesEl.textContent = (tk.start_date || '?') + ' → ' + (tk.end_date || '?');
  if (costEl)  costEl.textContent  = fmt(tk.cost || 0);
  
  if (workerEl) {
    workerEl.innerHTML = wk 
      ? `<div style="width: 32px; height: 32px; border-radius: 10px; background: var(--accent-main)10; border: 1px solid var(--accent-main)30; display: flex; align-items: center; justify-content: center; color: var(--accent-main); font-weight:700;">${wk.name[0]}</div>
         <div style="display:flex; flex-direction:column;">
           <span style="font-size:0.9rem; color:var(--text-primary);">${esc(wk.name)}</span>
           <span style="font-size:0.65rem; color:var(--text-secondary); text-transform:uppercase;">${esc(wk.trade)||'Contractor'}</span>
         </div>`
      : `<div style="width: 32px; height: 32px; border-radius: 10px; background: var(--frost); display: flex; align-items: center; justify-content: center;">·</div>
         <span style="opacity:0.4; font-size:0.9rem;">No operator linked</span>`;
  }
  
  const pVal = tk.priority || 'normal';
  if (prioEl) {
    const prioColor = pVal === 'high' ? '#ef4444' : pVal === 'normal' ? '#eab308' : '#0a84ff';
    prioEl.textContent = pVal;
    prioEl.style.background = prioColor + '15';
    prioEl.style.color = prioColor;
    prioEl.style.border = '1px solid ' + prioColor + '30';
  }
  
  const sVal = tk.status || 'todo';
  if (statEl) {
    const statColor = sVal === 'done' ? '#10b981' : sVal === 'in_progress' ? '#0a84ff' : 'var(--text-secondary)';
    statEl.textContent = statusLabel(sVal);
    statEl.style.background = statColor + '15';
    statEl.style.color = statColor;
    statEl.style.border = '1px solid ' + statColor + '30';
  }
  
  const editBtn = document.getElementById('tdEditBtn');
  if (editBtn) editBtn.onclick = () => { closeModal('taskDetailsModal'); editTask(taskId); };

  const doneBtn = document.getElementById('tdDoneBtn');
  if (doneBtn) {
    doneBtn.style.display = tk.status === 'done' ? 'none' : 'block';
    doneBtn.onclick = async () => {
      closeModal('taskDetailsModal');
      await setTaskStatus(taskId, 'done');
    };
  }

  openModal('taskDetailsModal');
  if (window.lucide) lucide.createIcons();
};
