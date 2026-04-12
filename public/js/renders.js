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
  const p = appData.plan || {};
  const defaultTitle = t('default_project_name');
  
  const planTitleEl = document.getElementById('planTitle');
  if (planTitleEl) planTitleEl.textContent = p.title || defaultTitle;
  
  // Update the hero header block inside the Overview tab
  const heroTitle = document.getElementById('ovHeroTitle');
  if (heroTitle) heroTitle.textContent = p.title || defaultTitle;
  
  const heroDesc = document.getElementById('ovHeroDesc');
  if (heroDesc) {
    if (p.address && p.address.trim() !== '') {
      heroDesc.textContent = t('lbl_address') + ': ' + p.address;
    } else {
      heroDesc.textContent = t('hero_desc_default');
    }
  }

  const planAddressEl = document.getElementById('planAddress');
  if (planAddressEl) planAddressEl.textContent = p.address || '';

  // Dates in KPI strip
  const datesEl = document.getElementById('planDates');
  if (datesEl) {
    if (p.start_date && p.end_date) datesEl.textContent = `${p.start_date} → ${p.end_date}`;
    else datesEl.textContent = '';
  }

  // ── KPI numbers ───────────────────────────────────────────────────────────
  const rawBudget = Number(p.total_budget || 0);
  const taskCosts = appData.tasks.reduce((s,t2) => s + Number(t2.cost || 0), 0);
  const expCosts  = appData.expenses.reduce((s,e) => s + Number(e.amount || 0), 0);
  const spent     = taskCosts + expCosts;
  const remaining = rawBudget - spent;
  const pct       = rawBudget > 0 ? Math.min(100, spent/rawBudget*100) : 0;

  const elBudget = document.getElementById('statBudget');
  if (elBudget) elBudget.textContent = fmt(rawBudget);
  const elHeroBudget = document.getElementById('statHeroBudget');
  if (elHeroBudget) elHeroBudget.textContent = fmt(rawBudget);
  const elBudgetSnap = document.getElementById('ovBudgetTotal');
  if (elBudgetSnap) elBudgetSnap.textContent = fmt(rawBudget);
  const elSpent = document.getElementById('statSpent');
  if (elSpent) elSpent.textContent = t('spent_prefix') + ': ' + fmt(spent);
  const elPhases = document.getElementById('statPhases');
  if (elPhases) elPhases.textContent = appData.phases.length;
  const elPhasesActive = document.getElementById('statPhasesActive');
  if (elPhasesActive) elPhasesActive.textContent = t('active_prefix') + ': ' + appData.phases.filter(x=>x.status==='active').length;
  const elTasks = document.getElementById('statTasks');
  if (elTasks) elTasks.textContent  = appData.tasks.length;
  const elTasksDone = document.getElementById('statTasksDone');
  if (elTasksDone) elTasksDone.textContent = t('completed_prefix') + ': ' + appData.tasks.filter(t2=>t2.done).length;
  const elWorkers = document.getElementById('statWorkers');
  if (elWorkers) elWorkers.textContent = appData.workers.length;

  // ── Project health ────────────────────────────────────────────────────────
  const allDone    = appData.phases.length > 0 && appData.phases.every(x=>x.status==='done');
  const anyActive  = appData.phases.some(x=>x.status==='active');
  const healthEl   = document.getElementById('ovHealthVal');
  if (healthEl) {
    if (allDone)       { healthEl.textContent = t('status_complete');    healthEl.style.color='#30d158'; }
    else if (anyActive){ healthEl.textContent = t('status_active');  healthEl.style.color='#0a84ff'; }
    else               { healthEl.textContent = t('status_not_started'); healthEl.style.color='var(--silver)'; }
  }

  // ── Budget bar ────────────────────────────────────────────────────────────
  const bar = document.getElementById('budgetBar');
  if (bar) {
    bar.style.width = pct.toFixed(1) + '%';
    bar.style.background = pct > 90 ? '#ff3b30' : pct > 70 ? '#ff9f0a' : 'var(--graphite)';
  }
  const barLeft = document.getElementById('budgetBarLeft');
  if (barLeft) barLeft.textContent  = fmt(spent);
  const barRight = document.getElementById('budgetBarRight');
  if (barRight) barRight.textContent = fmt(remaining < 0 ? 0 : remaining);

  const pctBadge = document.getElementById('ovBudgetPct');
  if (pctBadge) pctBadge.textContent = pct.toFixed(0) + '%';
  const donutCenter = document.getElementById('ovDonutCenter');
  if (donutCenter) donutCenter.textContent = pct.toFixed(0) + '%';

  // ── Budget donut chart ────────────────────────────────────────────────────
  const ctx = document.getElementById('budgetChart');
  if (ctx) {
    let catData = {};
    appData.expenses.forEach(ex => {
      const c = t('cat_' + ex.category.toLowerCase()) || ex.category;
      catData[c] = (catData[c]||0) + Number(ex.amount||0);
    });
    const hasCats = Object.keys(catData).length > 0;
    if (hasCats) {
      if (budgetChart) budgetChart.destroy();
      budgetChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: Object.keys(catData),
          datasets: [{ data: Object.values(catData),
            backgroundColor: ['#7A6B8B', '#D9D1E0', '#E8D5C8', '#8A6D58', '#9B8B7A', '#CFC2B4', '#554A61'],
            borderWidth: 0 }]
        },
        options: { cutout:'72%', plugins:{ legend:{ display:false } }, responsive:true, maintainAspectRatio:false }
      });
    } else if (rawBudget > 0) {
      // Show empty ring with "no expenses" placeholder
      if (budgetChart) budgetChart.destroy();
      budgetChart = new Chart(ctx, {
        type: 'doughnut',
        data: { datasets:[{ data:[1], backgroundColor:['var(--mist)'], borderWidth:0 }] },
        options: { cutout:'72%', plugins:{ legend:{ display:false }, tooltip:{ enabled:false } }, responsive:true, maintainAspectRatio:false }
      });
    }
  }

  // ── Phase progress rows ───────────────────────────────────────────────────
  const progEl = document.getElementById('ovProgress');
  if (progEl) {
    if (!appData.phases || !appData.phases.length) {
      progEl.innerHTML = `<div class="bl-ov-empty" style="padding: 2rem 0; color: var(--text-secondary); text-align: center;">${t('no_phases_yet')}</div>`;
    } else {
    const avgProg = Math.round(appData.phases.reduce((s,ph)=>s+(ph.progress||0),0)/appData.phases.length);
    progEl.innerHTML = `
      <div class="bl-ov-prog-summary" style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1.5rem; padding-bottom:1rem; border-bottom:1px dashed var(--mist);">
        <div style="display:flex; align-items:center; gap:0.75rem;">
          <div style="width:48px; height:48px; border-radius:50%; background:var(--mist); display:flex; align-items:center; justify-content:center;">
             <span class="bl-ov-prog-avg" style="font-size:1.2rem; font-weight:700; color:var(--text-primary); font-family:'JetBrains Mono',monospace;">${avgProg}<span style="font-size:0.7rem;color:var(--silver);">%</span></span>
          </div>
          <span class="bl-ov-prog-label" style="font-size:0.9rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-secondary); font-weight:600;">${t('overall_progress')}</span>
        </div>
      </div>
      <div class="bl-ov-prog-list" style="display:flex; flex-direction:column; gap:1.25rem;">
        ${appData.phases.map((ph, idx) => {
          const prog = ph.progress || 0;
          const dotC = ph.status==='done' ? '#30d158' : ph.status==='active' ? '#0a84ff' : 'var(--mist)';
          const barC = ph.status==='done' ? '#30d158' : ph.status==='active' ? '#0a84ff' : 'var(--mist)';
          return `<div class="bl-ov-prog-row" style="display:flex; flex-direction:column; gap:0.5rem; padding:0.75rem; border-radius:12px; background:rgba(255,255,255,0.02); border:1px solid var(--mist); transition:box-shadow 0.2s;">
            <div style="display:flex; align-items:center; justify-content:space-between;">
              <span class="bl-ov-prog-name" onclick="editPhase('${ph.id}')" style="cursor:pointer; font-weight:600; font-size:0.85rem; color:var(--text-primary);">${esc(phaseTitle(ph))}</span>
              <span class="bl-ov-prog-pct" id="ovProgPct-${ph.id}" style="font-family:'JetBrains Mono',monospace; font-size:0.8rem; font-weight:700; color:${dotC};">${prog}%</span>
            </div>
            <div style="position:relative; height:20px; display:flex; align-items:center;">
              <div class="bl-ov-prog-track" style="position:absolute; left:0; right:0; height:6px; background:var(--mist); border-radius:3px; overflow:hidden; z-index:0;">
                <div class="bl-ov-prog-fill" id="ovProgFill-${ph.id}" style="width:${prog}%; background:${barC}; height:100%; border-radius:3px; transition:width 0.2s;"></div>
              </div>
              <input type="range" min="0" max="100" value="${prog}" 
                oninput="quickUpdatePhaseProgress('${ph.id}', this.value)"
                style="position:relative; width:100%; height:100%; -webkit-appearance:none; background:transparent; z-index:1; cursor:pointer;"
                class="bl-ov-prog-slider">
            </div>
          </div>`;
        }).join('')}
      </div>`;

    }
  }

  // ── Upcoming deadlines ────────────────────────────────────────────────────
  const today   = new Date(); today.setHours(0,0,0,0);
  const limit   = new Date(today); limit.setDate(limit.getDate()+60);
  const upItems = [];

  appData.phases.forEach(ph => {
    if (ph.end) { const d=new Date(ph.end); if(d>=today&&d<=limit) upItems.push({date:d, label:phaseTitle(ph) + ' ' + t('phrase_ends'), color:'#48484a', icon:'◼', type:'phase', id:ph.id}); }
  });
  (appData.payments||[]).filter(p2=>!p2.paid&&p2.due_date).forEach(p2=>{
    const d=new Date(p2.due_date); if(d>=today&&d<=limit) upItems.push({date:d, label:p2.desc, color:'#ef4444', icon:'💳', type:'payment', id:p2.id});
  });
  (appData.materials||[]).filter(m=>m.status!=='installed'&&m.order_by_date).forEach(m=>{
    const d=new Date(m.order_by_date); if(d>=today&&d<=limit) upItems.push({date:d, label:m.name, color:'#ff9f0a', icon:'📦', type:'material', id:m.id});
  });
  appData.tasks.filter(tk=>!tk.done&&tk.end_date).forEach(tk=>{
    const d=new Date(tk.end_date); if(d>=today&&d<=limit) upItems.push({date:d, label:taskTitle(tk), color:'#0a84ff', icon:'·', type:'task', id:tk.id});
  });

  upItems.sort((a,b)=>a.date-b.date);
  const upEl     = document.getElementById('ovUpcoming');
  const countEl  = document.getElementById('ovUpcomingCount');
  if (countEl) countEl.textContent = upItems.length || '';

  if (upEl) {
    if (!upItems.length) {
      upEl.innerHTML = `<div class="bl-ov-empty" style="padding: 2rem 0; color: var(--text-secondary); text-align: center;">${t('no_upcoming_events')}</div>`;
    } else {
    upEl.innerHTML = upItems.slice(0,8).map(ev => {
      const diff = Math.round((ev.date - today)/86400000);
      const rel  = diff===0 ? t('today') : diff===1 ? t('tomorrow') : `${diff} ${t('lead_time_suffix')}`;
      const urgent = diff <= 3;
      const clickAction = ev.type === 'phase' ? `editPhase('${ev.id}')` 
                        : ev.type === 'task' ? `editTask('${ev.id}')` 
                        : ev.type === 'payment' ? `editPayment('${ev.id}')` 
                        : ev.type === 'material' ? `editMaterial('${ev.id}')` : '';
      return `<div class="bl-ov-upcoming-item" onclick="${clickAction}" style="cursor:pointer; display:flex; align-items:center; justify-content:space-between; padding:0.75rem 0.5rem; border-bottom:1px solid var(--mist); transition:background 0.2s;" onmouseover="this.style.background='var(--frost)'" onmouseout="this.style.background='transparent'">
        <div style="display:flex; align-items:center; gap:0.75rem;">
          <div style="width:28px; height:28px; border-radius:6px; background:${ev.color}20; display:flex; align-items:center; justify-content:center; color:${ev.color}; font-size:0.85rem; font-weight:800;">${ev.icon}</div>
          <span class="bl-ov-upcoming-label" style="font-weight:600; font-size:0.875rem;">${esc(ev.label)}</span>
        </div>
        <span class="bl-ov-upcoming-rel" style="font-family:'JetBrains Mono',monospace; font-size:0.75rem; font-weight:700; background:${urgent?'rgba(239, 68, 68, 0.1)':'var(--mist)'}; color:${urgent?'#ef4444':'var(--text-secondary)'}; padding:0.2rem 0.5rem; border-radius:6px;">${rel}</span>
      </div>`;
      }).join('');
    }
  }

  if (window.lucide) lucide.createIcons();

  // ── Update sidebar user info ──────────────────────────────────────────────
  const clientName = appData.plan?.client_name || t('lbl_client_name');
  if (appData.plan?.client_name) {
    localStorage.setItem('userName', appData.plan.client_name);
  }
  const avatarEl = document.getElementById('blUserAvatar');
  if (avatarEl) avatarEl.textContent = clientName.charAt(0).toUpperCase();
  const nameEl = document.getElementById('blUserName');
  if (nameEl) nameEl.textContent = clientName;

  // ── Cashflow text (upcoming 7-day obligations) ────────────────────────────
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
    if (upcomingItems.length === 0) {
      cfEl.textContent = t('no_obligations_next_7');
    } else {
      cfEl.textContent = t('total_due') + ': ' + fmt(upcomingCost) + ' — ' + upcomingItems.join(', ');
    }
  }

  // ── Variance chart (expense breakdown by category) ────────────────────────
  const varCtx = document.getElementById('varianceChart');
  if (varCtx && window.Chart) {
    let catMap = {};
    appData.expenses.forEach(ex => {
      const c = t('cat_' + ex.category.toLowerCase()) || ex.category;
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
          datasets: [{ label: t('lbl_amount'), data: varValues,
            backgroundColor: ['#7A6B8B', '#D9D1E0', '#E8D5C8', '#8A6D58', '#9B8B7A', '#CFC2B4', '#554A61'],
            borderWidth: 0, borderRadius: 4 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
          scales: { x: { ticks: { color: 'var(--text-secondary)', font: { size: 10 } }, grid: { display: false } },
                    y: { ticks: { color: 'var(--text-secondary)', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.05)' } } } }
      });
    } else {
      window._varianceChart = new Chart(varCtx, {
        type: 'bar', data: { labels: [t('no_expenses')], datasets: [{ data: [0], backgroundColor: ['rgba(255,255,255,0.1)'], borderWidth: 0 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } },
          scales: { x: { display: false }, y: { display: false } } }
      });
    }
  }
}

// ---- PHASES ----
function renderPhases() {
  const el = document.getElementById('phasesList');
  if (!el) return;
  if (!appData.phases || !appData.phases.length) {
    el.innerHTML = `<div class="bl-card"><div class="bl-card-body"><div class="bl-empty">${t('no_phases_empty')}</div></div></div>`;
    return;
  }
  el.innerHTML = appData.phases.map((ph, i) => `
    <div class="bl-phase-card bl-phase-${ph.status}">
      <div class="bl-phase-card-header">
        <div class="bl-phase-card-left">
          <span class="bl-phase-num">${String(i+1).padStart(2,'0')}</span>
          <div>
            <div style="display:flex;align-items:center;gap:0.5rem;">
              <div class="bl-phase-name">${esc(phaseTitle(ph))}</div>
              <button class="bl-icon-btn bl-icon-btn-info" onclick="editPhase('${ph.id}')" title="${t('lbl_notes')}" style="width:20px;height:20px;font-size:0.65rem;">ℹ</button>
            </div>
            ${ph.start||ph.end ? `<div class="bl-phase-dates">${ph.start||'?'} → ${ph.end||'?'}</div>` : ''}
          </div>
        </div>
        <div class="bl-phase-card-right">
          <span class="bl-status-badge bl-status-${ph.status}">${statusLabel(ph.status)}</span>
          <button class="bl-icon-btn" onclick="editPhase('${ph.id}')" title="Edit" style="font-size:0.75rem;">✎</button>
          <button class="bl-icon-btn bl-icon-btn-danger" onclick="deletePhase('${ph.id}')" title="Delete" style="font-size:0.9rem;">×</button>
        </div>
      </div>
      <div class="bl-phase-progress">
        <div class="bl-progress-track"><div class="bl-progress-fill" style="width:${ph.progress||0}%"></div></div>
        <span class="bl-progress-label">${ph.progress||0}%</span>
      </div>
      ${ph.notes ? `<div class="bl-phase-notes">${esc(phaseNotes(ph))}</div>` : ''}
      <div class="bl-phase-tasks" style="margin-top:1rem;border-top:1px solid var(--mist);padding-top:1rem;">
        <div style="font-family:'JetBrains Mono',monospace; font-size:0.6rem; color:var(--silver); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:0.75rem;">${t('stat_tasks')}</div>
        ${appData.tasks.filter(tk => tk.phase_id === ph.id).map(tk => {
           const wk       = appData.workers.find(w => w.id === tk.worker_id);
           const prioStyles = {
             high: 'background:rgba(239, 68, 68, 0.15); border:1px solid #ef4444; color:#ef4444;',
             normal: 'background:rgba(234, 179, 8, 0.15); border:1px solid #eab308; color:#eab308;',
             low: 'background:rgba(10, 132, 255, 0.15); border:1px solid #0a84ff; color:#0a84ff;'
           };
           const statusBg = { todo:'rgba(0,0,0,0.05)', in_progress:'rgba(10,132,255,0.1)', done:'rgba(48,209,88,0.1)' };
           const statusCl = { todo:'var(--silver)', in_progress:'#0a84ff', done:'#30d158' };
           const hasCost  = tk.cost && Number(tk.cost) > 0;
           const statusChipStyle = {
             todo:        'background:var(--frost);border-color:var(--mist);color:var(--silver);',
             in_progress: 'background:rgba(10,132,255,0.1);border-color:#0a84ff;color:#0a84ff;',
             done:        'background:rgba(48,209,88,0.07);border-color:rgba(48,209,88,0.4);color:#30d158;'
           };
           return `<div class="bl-ph-task ${tk.status === 'done' ? 'bl-ph-task-done' : ''}" style="display:flex;align-items:center;gap:0.5rem;padding:0.3rem 0.5rem;border-radius:0.4rem;margin-bottom:0.25rem;min-height:0;">
             <span class="bl-ph-task-title" onclick="editTask('${tk.id}')" style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:0.8rem;cursor:pointer;">${esc(taskTitle(tk))}</span>
             <span style="color:var(--mist);font-size:0.8rem;margin:0 0.1rem;opacity:0.5;">|</span>
             <button class="bl-ph-meta-chip" onclick="showTaskDetail('${esc(tk.title)}')" title="${t('task_detail_title')}" style="margin:0;padding:2px 6px;font-size:0.6rem;cursor:pointer;border:1px solid var(--mist);background:var(--frost);color:var(--graphite);font-weight:600;white-space:nowrap;border-radius:4px;">${t('label_how_it_works')}</button>
             <div style="display:flex;align-items:center;gap:0.3rem;flex-shrink:0;margin-left:auto;">
               <select onchange="setTaskPriority('${tk.id}', this.value)" class="bl-ph-meta-chip" style="cursor:pointer;appearance:none;outline:none;margin:0;${prioStyles[tk.priority]||'background:var(--frost);border-color:var(--mist);color:var(--silver);'}">
                 <option value="high" ${tk.priority==='high'?'selected':''}>↑ High</option>
                 <option value="normal" ${tk.priority==='normal'?'selected':''}>— Normal</option>
                 <option value="low" ${tk.priority==='low'?'selected':''}>↓ Low</option>
               </select>
               ${wk ? `<span class="bl-ph-meta-chip" onclick="editWorker('${wk.id}')" style="cursor:pointer;margin:0;padding:0.1rem 0.4rem;font-size:0.65rem;">👷 ${esc(wk.name)}</span>` : ''}
               ${hasCost ? `<span class="bl-ph-meta-chip bl-ph-meta-cost" style="margin:0;padding:0.1rem 0.4rem;font-size:0.65rem;">💰 ${fmt(Number(tk.cost))}</span>` : ''}
               <select onchange="setTaskStatus('${tk.id}', this.value)" class="bl-ph-meta-chip" style="cursor:pointer;appearance:none;outline:none;margin:0;${statusChipStyle[tk.status]||statusChipStyle.todo}">
                 <option value="todo" ${tk.status==='todo'?'selected':''}>${t('status_todo')}</option>
                 <option value="in_progress" ${tk.status==='in_progress'?'selected':''}>${t('status_active')}</option>
                 <option value="done" ${tk.status==='done'?'selected':''}>${t('status_done')}</option>
               </select>
               <div style="display:flex;gap:0.15rem;border-left:1px solid var(--mist);padding-left:0.35rem;">
                 <button class="bl-icon-btn" onclick="editTask('${tk.id}')" title="${t('btn_save')}" style="width:20px;height:20px;font-size:0.7rem;">✎</button>
                 <button class="bl-icon-btn bl-icon-btn-danger" onclick="deleteTask('${tk.id}')" title="${t('confirm_delete_task')}" style="width:20px;height:20px;font-size:0.8rem;">×</button>
               </div>
             </div>
           </div>`;
        }).join('') || `<div style="font-size:0.8rem;color:var(--graphite);padding:0.5rem 0;">${t('no_tasks')}</div>`}
      </div>
    </div>`).join('');
  if (window.lucide) lucide.createIcons();
}



// ---- EXPENSES ----
// ---- FINANCES (Unified) ----
function renderFinances() {
  const tbody = document.getElementById('financesList');
  if (!tbody) return;

  // Budget from plan
  const budget = Number(appData.plan?.total_budget || 0);
  
  const taskCosts = appData.tasks.reduce((s,t2) => s + Number(t2.cost || 0), 0);
  const expCosts  = appData.expenses.reduce((s,e) => s + Number(e.amount || 0), 0);
  const payCosts = appData.payments.reduce((s,p) => s + Number(p.amount || 0), 0);
  const total     = taskCosts + expCosts + payCosts;
  
  const taskAdvance = appData.tasks.reduce((s,t2) => s + Number(t2.advance_amount || 0), 0);
  const expAdvance  = appData.expenses.reduce((s,e) => s + Number(e.advance_amount || 0), 0);
  const payAdvance  = appData.payments.reduce((s,p) => s + Number(p.advance_amount || 0), 0);
  const totalAdvance = taskAdvance + expAdvance + payAdvance;

  const elBudget = document.getElementById('finBudget');
  if (elBudget) elBudget.textContent = fmt(budget);
  const elTotal = document.getElementById('finTotal');
  if (elTotal) elTotal.textContent = fmt(total);
  const elAdv = document.getElementById('finAdvance');
  if (elAdv) elAdv.textContent = fmt(totalAdvance);

  // Combine everything into a single financial log
  let items = [];
  
  // Add payments
  appData.payments.forEach(pm => {
    const wk = appData.workers.find(w => w.id === pm.worker_id);
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
  appData.tasks.filter(tk => (tk.cost > 0 || tk.advance_amount > 0)).forEach(tk => {
    const wk = appData.workers.find(w => w.id === tk.worker_id);
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
  appData.expenses.forEach(ex => {
    items.push({
      date: ex.date || '',
      to: ex.recipient || t('cat_' + ex.category.toLowerCase()) || ex.category,
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
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:3rem 2rem;color:var(--text-secondary); opacity:0.6;">${t('no_expenses')}</td></tr>`;
    return;
  }

  tbody.innerHTML = items.map(it => {
    const workerAction = it.worker_id ? `onclick="editWorker('${it.worker_id}')" style="cursor:pointer;"` : '';
    const taskAction   = it.type === 'task' ? `onclick="editTask('${it.id}')" style="cursor:pointer;"` : '';
    
    return `
    <tr style="border-bottom: 1px solid var(--mist); transition: background 0.2s;" onmouseover="this.style.background='var(--frost)'" onmouseout="this.style.background='transparent'">
      <td style="color: var(--text-secondary); font-size: 0.8125rem; padding: 1rem;">${it.date}</td>
      <td style="font-weight: 600; padding: 1rem;">
        <span ${workerAction}>${esc(it.to)}</span>
      </td>
      <td style="font-size: 0.875rem; padding: 1rem;">
        <span ${taskAction}>${esc(it.desc)}</span>
      </td>
      <td style="font-weight: 700; text-align: right; padding: 1rem;">${fmt(it.amount)}</td>
      <td style="padding: 1rem; text-align: center;">
        <span style="font-size: 0.7rem; padding: 4px 10px; border-radius: 6px; background: ${it.is_advance ? 'var(--accent-main)' : 'var(--mist)'}; color: ${it.is_advance ? 'var(--body-bg)' : 'var(--text-secondary)'}; font-weight: 600;">
          ${it.is_advance ? 'AVANS' : '—'}
        </span>
      </td>
      <td style="text-align: center; padding: 1rem;">
        <button style="background: transparent; border: none; color: var(--text-secondary); cursor: pointer; font-size: 0.875rem;">✎</button>
      </td>
    </tr>`;
  }).join('');
}

// ---- WORKERS ----
function renderWorkers() {
  const el = document.getElementById('workersList');
  if (!appData.workers.length) {
    el.innerHTML = `<div class="bl-empty" style="grid-column:1/-1;">${t('no_workers')}</div>`;
    return;
  }
  el.innerHTML = `
  <div class="bl-card" style="padding:0; overflow:hidden; border:1px solid var(--mist); border-radius:var(--radius-xl);">
    <table class="bl-table" style="width:100%; border-collapse:collapse; text-align:left;">
      <thead>
        <tr style="background:var(--frost); border-bottom:1px solid var(--mist);">
          <th style="padding:1rem; font-family:'Oswald',sans-serif; text-transform:uppercase; font-size:0.65rem; color:var(--text-secondary);">${t('th_worker')}</th>
          <th style="padding:1rem; font-family:'Oswald',sans-serif; text-transform:uppercase; font-size:0.65rem; color:var(--text-secondary);">Etape (Faze)</th>
          <th style="padding:1rem; font-family:'Oswald',sans-serif; text-transform:uppercase; font-size:0.65rem; color:var(--text-secondary);">Materijali</th>
          <th style="padding:1rem; font-family:'Oswald',sans-serif; text-transform:uppercase; font-size:0.65rem; color:var(--text-secondary); text-align:right;">Finansije</th>
          <th style="padding:1rem; font-family:'Oswald',sans-serif; text-transform:uppercase; font-size:0.65rem; color:var(--text-secondary);">Kontakt</th>
          <th style="padding:1rem; font-family:'Oswald',sans-serif; text-transform:uppercase; font-size:0.65rem; color:var(--text-secondary); text-align:center;">${t('th_actions')}</th>
        </tr>
      </thead>
      <tbody>
        ${appData.workers.map(w => {
          // Pronađi sve zadatke ovog radnika
          const hisTasks = appData.tasks.filter(tk => tk.worker_id === w.id);
          const totalEarned = hisTasks.reduce((s,tk) => s + Number(tk.cost || 0), 0);
          
          // Pronađi unikatne faze na kojima radi
          const phaseIds = [...new Set(hisTasks.map(tk => tk.phase_id).filter(id => id))];
          const hisPhases = appData.phases.filter(ph => phaseIds.includes(ph.id));
          
          // Pronađi materijale vezane za te iste faze
          const hisMaterials = (appData.materials || []).filter(m => phaseIds.includes(m.phase_id));
          const matCount = hisMaterials.length;

          return `
          <tr style="border-bottom:1px solid var(--mist); transition:background 0.2s;" onmouseover="this.style.background='var(--frost)'" onmouseout="this.style.background='transparent'">
            <td style="padding:1rem;">
              <div style="font-weight:700; color:var(--text-primary); font-size:1rem;">${esc(w.name)}</div>
              <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.2rem;">${esc(w.trade)}</div>
            </td>
            <td style="padding:1rem; font-size:0.875rem;">
              <div style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom: 0.5rem;">
                ${hisPhases.length > 0 ? hisPhases.map(ph => `<span onclick="editPhase('${ph.id}')" style="background:var(--mist); color:var(--text-primary); padding:2px 8px; border-radius:4px; font-size:0.7rem; cursor:pointer;" onmouseover="this.style.background='var(--accent-main)';this.style.color='#000'" onmouseout="this.style.background='var(--mist)';this.style.color='var(--text-primary)'">${esc(phaseTitle(ph))}</span>`).join('') : '<span style="color:var(--silver);">—</span>'}
              </div>
              <div style="display:flex; flex-wrap:wrap; gap:4px; opacity: 0.8;">
                ${hisTasks.length > 0 ? hisTasks.map(tk => `<span onclick="editTask('${tk.id}')" style="background:rgba(0,0,0,0.05); color:var(--text-secondary); padding:2px 6px; border-radius:4px; font-size:0.65rem; cursor:pointer; border:1px solid var(--mist);" onmouseover="this.style.borderColor='var(--accent-main)';this.style.color='var(--text-primary)'" onmouseout="this.style.borderColor='var(--mist)';this.style.color='var(--text-secondary)'">· ${esc(taskTitle(tk))}</span>`).join('') : ''}
              </div>
            </td>
            <td style="padding:1rem; font-size:0.875rem;">
              <div style="color:var(--text-primary); font-weight:500;">${matCount > 0 ? `${matCount} stavki` : '<span style="color:var(--silver);">0 stavki</span>'}</div>
              ${matCount > 0 ? `<div style="font-size:0.7rem; color:var(--text-secondary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:140px;">${hisMaterials.slice(0,2).map(m => esc(m.name)).join(', ')}${matCount > 2 ? '...' : ''}</div>` : ''}
            </td>
            <td style="padding:1rem; text-align:right;">
               <div style="font-weight:700; color:var(--text-primary); font-size:1.1rem;">${fmt(totalEarned)}</div>
               <div onclick="switchTab('tasks')" style="font-size:0.7rem; color:var(--text-secondary); cursor:pointer; text-decoration:underline;">${hisTasks.length} zadataka</div>
            </td>
            <td style="padding:1rem; font-size:0.875rem;">
              <div>${w.phone ? `📞 ${esc(w.phone)}` : ''}</div>
              <div style="color:var(--text-secondary); font-size:0.75rem;">${w.email || ''}</div>
            </td>
            <td style="padding:1rem; text-align:center;">
              <div style="display:flex; justify-content:center; gap:0.5rem;">
                <button onclick="editWorker('${w.id}')" style="background:transparent; border:none; color:var(--text-secondary); cursor:pointer; font-size:1rem;">✎</button>
                <button onclick="deleteWorker('${w.id}')" style="background:transparent; border:none; color:var(--text-secondary); cursor:pointer; font-size:1.1rem;">×</button>
              </div>
            </td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
  </div>`;
  if (window.lucide) lucide.createIcons();
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

// ---- TASKS (KANBAN) ----
function renderTasks() {
  const phaseSelect = document.getElementById('taskPhase');
  phaseSelect.innerHTML = `<option value="">${t('no_phase_option')}</option>` +
    appData.phases.map(ph => `<option value="${ph.id}">${esc(phaseTitle(ph))}</option>`).join('');

  const workerSelect = document.getElementById('taskWorker');
  if(workerSelect) workerSelect.innerHTML = `<option value="">—</option>` + appData.workers.map(w => `<option value="${w.id}">${esc(w.name)}</option>`).join('');

  const cols = {
    todo: document.getElementById('tasks-todo'),
    in_progress: document.getElementById('tasks-in_progress'),
    done: document.getElementById('tasks-done')
  };

  let counts = { todo:0, in_progress:0, done:0 };
  const buffers = { todo: [], in_progress: [], done: [] };
  const priorities = { high:'<i data-lucide="alert-circle" style="width:14px;color:#ef4444;display:inline-block;vertical-align:bottom;"></i>', normal:'<i data-lucide="help-circle" style="width:14px;color:#eab308;display:inline-block;vertical-align:bottom;"></i>', low:'<i data-lucide="check-circle" style="width:14px;color:#22c55e;display:inline-block;vertical-align:bottom;"></i>' };

  appData.tasks.forEach(tk => {
    // legacy support (if status is missing but done is true)
    let s = tk.status || (tk.done ? 'done' : 'todo');
    counts[s] = (counts[s] || 0) + 1;

    if (!buffers[s]) return;
    const ph = appData.phases.find(p => p.id === tk.phase_id);
    const wk = appData.workers.find(w => w.id === tk.worker_id);

    const prioChipStyle = {high:'background:rgba(239,68,68,0.15);border-color:#ef4444;color:#ef4444;', normal:'background:rgba(234,179,8,0.15);border-color:#eab308;color:#eab308;', low:'background:rgba(10,132,255,0.15);border-color:#0a84ff;color:#0a84ff;'};
    buffers[s].push(`
    <div class="bl-task-card" draggable="true" ondragstart="dragTask(event, '${esc(tk.id)}')" id="card-${esc(tk.id)}">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.6rem; gap:0.5rem;">
        <div class="bl-task-title" style="font-size:0.875rem;font-weight:600;line-height:1.3;flex:1;">${esc(taskTitle(tk))}</div>
        <button class="bl-icon-btn" onclick="editTask('${esc(tk.id)}')" style="width:24px;height:24px;opacity:0.6;flex-shrink:0;transition:all 0.2s;"><i data-lucide="edit-3" style="width:12px;height:12px;"></i></button>
      </div>
      ${ph ? `<div class="bl-task-phase" style="display:inline-block;margin-right:0.5rem;font-size:0.7rem;"><i data-lucide="folder" style="width:12px;height:12px;display:inline-block;vertical-align:middle;margin-right:2px;"></i> ${esc(phaseTitle(ph))}</div>` : ''}
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.35rem;margin-top:0.5rem;">
        <select onchange="setTaskPriority('${tk.id}', this.value)" class="bl-prio-chip" style="${prioChipStyle[tk.priority]||'background:var(--frost);border-color:var(--mist);color:var(--silver);'}" title="${tk.priority||'normal'} priority">
          <option value="high" ${tk.priority==='high'?'selected':''}>↑ High</option>
          <option value="normal" ${tk.priority==='normal'?'selected':''}>— Normal</option>
          <option value="low" ${tk.priority==='low'?'selected':''}>↓ Low</option>
        </select>
        ${wk ? `<div class="bl-worker-badge" onclick="editWorker('${wk.id}')" style="display:inline-flex;align-items:center;font-size:0.7rem;color:var(--graphite);background:var(--mist);padding:0 6px;border-radius:4px;cursor:pointer;"><i data-lucide="hard-hat" style="width:12px;height:12px;margin-right:2px;"></i> ${esc(wk.name)}</div>` : ''}
        ${tk.start_date || tk.end_date ? `<div class="bl-worker-badge" style="display:inline-flex;align-items:center;font-size:0.7rem;color:var(--graphite);background:rgba(255,255,255,0.04);padding:0 6px;border-radius:4px;"><i data-lucide="calendar" style="width:12px;height:12px;margin-right:2px;"></i> ${tk.start_date?tk.start_date.substring(5):'?'} &rarr; ${tk.end_date?tk.end_date.substring(5):'?'}</div>` : ''}
        ${tk.lead_time > 0 ? `<div class="bl-worker-badge" style="display:inline-flex;align-items:center;font-size:0.7rem;color:#ff9f0a;background:rgba(255,159,10,0.1);padding:0 4px;border-radius:4px;"><i data-lucide="package" style="width:12px;height:12px;margin-right:2px;"></i> ${tk.lead_time}${t('lead_time_suffix')}</div>` : ''}
      </div>
    </div>`);
  });

  cols.todo.innerHTML = buffers.todo.join('');
  cols.in_progress.innerHTML = buffers.in_progress.join('');
  cols.done.innerHTML = buffers.done.join('');

  document.getElementById('count-todo').textContent = counts.todo;
  document.getElementById('count-in_progress').textContent = counts.in_progress;
  document.getElementById('count-done').textContent = counts.done;
  if (window.lucide) lucide.createIcons();
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
function openSearchModal() {
  const input = document.getElementById('globalSearchInput');
  input.value = '';
  document.getElementById('globalSearchResults').innerHTML = `<div style="padding: 2rem; text-align: center; color: var(--text-secondary); opacity: 0.6; font-size: 0.85rem;">${t('type_to_search')}</div>`;
  openModal('searchModal');
  setTimeout(() => input.focus(), 100);
}

document.addEventListener('DOMContentLoaded', () => {
  const sa = document.getElementById('globalSearchInput');
  if (sa) {
    sa.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const resEl = document.getElementById('globalSearchResults');
      if (!q) {
        resEl.innerHTML = `<div style="padding: 2rem; text-align: center; color: var(--text-secondary); opacity: 0.6; font-size: 0.85rem;">${t('type_to_search')}</div>`;
        return;
      }
      let html = '';
      
      // Search Phases
      const phs = appData.phases.filter(p => phaseTitle(p).toLowerCase().includes(q));
      if (phs.length) {
        html += `<div style="font-size:0.7rem; color:var(--silver); font-family:'Oswald',sans-serif; text-transform:uppercase; letter-spacing:0.1em; margin: 1rem 0 0.5rem 0.5rem;">${t('nav_phases')}</div>`;
        phs.forEach(p => {
          html += `<div onclick="closeModal('searchModal'); editPhase('${p.id}')" style="padding: 0.75rem; background: rgba(255,255,255,0.02); border: 1px solid var(--mist); border-radius: 8px; margin-bottom: 0.4rem; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='var(--frost)'" onmouseout="this.style.background='rgba(255,255,255,0.02)'">
            <div style="font-weight:600; color:var(--text-primary); font-size: 0.9rem;">${esc(phaseTitle(p))}</div>
          </div>`;
        });
      }
      
      // Search Tasks
      const tks = appData.tasks.filter(tk => taskTitle(tk).toLowerCase().includes(q));
      if (tks.length) {
        html += `<div style="font-size:0.7rem; color:var(--silver); font-family:'Oswald',sans-serif; text-transform:uppercase; letter-spacing:0.1em; margin: 1rem 0 0.5rem 0.5rem;">${t('nav_tasks')}</div>`;
        tks.slice(0, 10).forEach(tk => {
          html += `<div onclick="closeModal('searchModal'); editTask('${tk.id}')" style="padding: 0.75rem; background: rgba(255,255,255,0.02); border: 1px solid var(--mist); border-radius: 8px; margin-bottom: 0.4rem; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='var(--frost)'" onmouseout="this.style.background='rgba(255,255,255,0.02)'">
            <div style="font-weight:600; color:var(--text-primary); font-size: 0.9rem;">${esc(taskTitle(tk))}</div>
            ${tk.phase_id ? `<div style="font-size:0.7rem; color:var(--text-secondary); margin-top:0.2rem;">${esc(phaseTitle(appData.phases.find(p=>p.id==tk.phase_id)) || '')}</div>` : ''}
          </div>`;
        });
      }

      // Search Workers
      const wks = appData.workers.filter(w => (w.name||'').toLowerCase().includes(q) || (w.trade||'').toLowerCase().includes(q));
      if (wks.length) {
        html += `<div style="font-size:0.7rem; color:var(--silver); font-family:'Oswald',sans-serif; text-transform:uppercase; letter-spacing:0.1em; margin: 1rem 0 0.5rem 0.5rem;">${t('nav_workers')}</div>`;
        wks.forEach(w => {
          html += `<div onclick="closeModal('searchModal'); editWorker('${w.id}')" style="padding: 0.75rem; background: rgba(255,255,255,0.02); border: 1px solid var(--mist); border-radius: 8px; margin-bottom: 0.4rem; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='var(--frost)'" onmouseout="this.style.background='rgba(255,255,255,0.02)'">
            <div style="font-weight:600; color:var(--text-primary); font-size: 0.9rem;">👷 ${esc(w.name)}</div>
            ${w.trade ? `<div style="font-size:0.7rem; color:var(--text-secondary); margin-top:0.2rem;">${esc(w.trade)}</div>` : ''}
          </div>`;
        });
      }

      // Search Materials
      const mats = (appData.materials||[]).filter(m => (m.name||'').toLowerCase().includes(q));
      if (mats.length) {
        html += `<div style="font-size:0.7rem; color:var(--silver); font-family:'Oswald',sans-serif; text-transform:uppercase; letter-spacing:0.1em; margin: 1rem 0 0.5rem 0.5rem;">${t('nav_materials')}</div>`;
        mats.slice(0,10).forEach(m => {
          html += `<div onclick="closeModal('searchModal'); editMaterial('${m.id}')" style="padding: 0.75rem; background: rgba(255,255,255,0.02); border: 1px solid var(--mist); border-radius: 8px; margin-bottom: 0.4rem; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='var(--frost)'" onmouseout="this.style.background='rgba(255,255,255,0.02)'">
            <div style="font-weight:600; color:var(--text-primary); font-size: 0.9rem;">📦 ${esc(m.name)}</div>
            ${m.store ? `<div style="font-size:0.7rem; color:var(--text-secondary); margin-top:0.2rem;">${esc(m.store)}</div>` : ''}
          </div>`;
        });
      }

      if (!html) {
        html = `<div style="padding: 2rem; text-align: center; color: var(--text-secondary); opacity: 0.6; font-size: 0.85rem;">No results found.</div>`;
      }
      resEl.innerHTML = html;
    });
  }
});
