// ---- SETTINGS ----
// ---- SETTINGS ----
async function fetchExchangeRate() {
  try {
    const r = await fetch('https://open.er-api.com/v6/latest/EUR');
    const d = await r.json();
    if (d.rates && d.rates.RSD && typeof d.rates.RSD === 'number') {
      document.getElementById('sExRate').value = d.rates.RSD;
      const lrEl = document.getElementById('liveRateText');
      if (lrEl) lrEl.textContent = `Live rate: 1 EUR = ${d.rates.RSD} RSD`;
      toast(t('exchange_rate_fetched'));
    }
  } catch(e) {
    console.error('Exchange API failed', e);
    toast(t('err_exchange_api'), 'err');
  }
}

function renderSettings() {
  const p = appData.plan || {};
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
  set('sTitle',   p.title);
  set('sAddress', p.address);
  set('sBudget',  p.total_budget);
  set('sExRate',  p.exchange_rate);
  set('sStart',   p.start_date);
  set('sEnd',     p.end_date);
  set('sNotes',   p.notes);
  if (typeof renderShareSection === 'function') renderShareSection();
}

// ---- TAB SWITCHING ----
function switchTab(tabId) {
  console.log('switchTab called:', tabId);
  const tabEl = document.getElementById('tab-' + tabId);
  if (!tabEl) {
    console.error('Tab not found:', 'tab-' + tabId);
    return;
  }
  document.querySelectorAll('.bl-tab').forEach(t2 => t2.classList.remove('active'));
  document.querySelectorAll('.bl-nav-item').forEach(n => n.classList.remove('active'));
  tabEl.classList.add('active');
  var navItem = document.querySelector('.bl-nav-item[data-tab="' + tabId + '"]');
  if (navItem) navItem.classList.add('active');
  const topBarTitle = document.getElementById('blTopbarTitle');
  if (topBarTitle) topBarTitle.textContent = t('nav_' + tabId);
  
  if (tabId === 'gantt') {
    renderGantt();
    if (window.ganttChart) setTimeout(() => ganttChart.updateSize(), 50);
  }
  if (tabId === 'calendar') {
    setTimeout(function() { 
      renderCalendar(); 
      if (window.fullCal) fullCal.updateSize();
    }, 50);
  }
  
  // Re-render the active tab content
  if (tabId === 'overview') {
    renderOverview();
  }
  if (tabId === 'phases') {
    renderPhases();
  }
  if (tabId === 'materials') {
    renderMaterials();
  }
  if (tabId === 'tasks') {
    renderTasks();
  }
  if (tabId === 'workers') {
    renderWorkers();
  }
  if (tabId === 'finances') {
    renderFinances();
  }
  if (tabId === 'map') {
    mmInitMap();
  }
  if (tabId === 'settings') {
    renderSettings();
  }
}

document.querySelectorAll('.bl-nav-item').forEach(a => {
  a.addEventListener('click', e => {
    // Only intercept if it's a tab switcher link (has data-tab)
    if (a.dataset.tab) {
      e.preventDefault();
      switchTab(a.dataset.tab);
      if (window.innerWidth < 900) closeSidebar();
    }
    // Otherwise let the normal <a href="..."> browser navigation happen
  });
});

// ---- SIDEBAR ----
document.getElementById('blMenuToggle').addEventListener('click', () => document.getElementById('blSidebar').classList.add('open'));
document.getElementById('blSidebarClose').addEventListener('click', closeSidebar);
function closeSidebar() { document.getElementById('blSidebar').classList.remove('open'); }

function updateSelectColor(el) {
  if (!el) return;
  if (el.value === 'in_progress' || el.value === 'active') {
    el.style.setProperty('background-color', 'rgba(10, 132, 255, 0.25)', 'important');
    el.style.setProperty('color', '#0a84ff', 'important');
    el.style.setProperty('border-color', '#0a84ff', 'important');
    el.style.setProperty('border-width', '1.5px', 'important');
  } else if (el.value === 'done') {
    el.style.setProperty('background-color', 'rgba(16, 185, 129, 0.25)', 'important');
    el.style.setProperty('color', '#10b981', 'important');
    el.style.setProperty('border-color', '#10b981', 'important');
    el.style.setProperty('border-width', '1.5px', 'important');
  } else {
    el.style.backgroundColor = 'var(--frost)';
    el.style.color = 'var(--text-primary)';
    el.style.borderColor = 'var(--mist)';
    el.style.borderWidth = '1px';
  }
}

// ---- MODALS ----
function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }
document.querySelectorAll('[data-modal]').forEach(btn => btn.addEventListener('click', () => closeModal(btn.dataset.modal)));
document.querySelectorAll('.bl-modal-overlay').forEach(ov => ov.addEventListener('click', e => { if(e.target===ov) ov.classList.remove('active'); }));

// ---- TOAST ----
function toast(msg, type='ok') {
  const el = document.getElementById('blToast');
  el.textContent = msg;
  el.className = 'bl-toast bl-toast-show bl-toast-' + type;
  setTimeout(() => el.classList.remove('bl-toast-show'), 2800);
}

// ---- PHASES CRUD ----
function openAddPhaseModal() {
  document.getElementById('phaseId').value = '';
  document.getElementById('phaseModalTitle').textContent = t('add_phase_title');
  document.getElementById('phaseForm').reset();
  document.getElementById('progressVal').textContent = '0';
  openModal('phaseModal');
}
document.getElementById('addPhaseBtn').addEventListener('click', openAddPhaseModal);

document.getElementById('phaseForm').addEventListener('submit', async e => {
  e.preventDefault();
  const id = document.getElementById('phaseId').value;
  const body = { name: document.getElementById('phaseName').value, start: document.getElementById('phaseStart').value, end: document.getElementById('phaseEnd').value, status: document.getElementById('phaseStatus').value, progress: document.getElementById('phaseProgress').value, notes: document.getElementById('phaseNotes').value };
  try {
    if (id) { body.id = id; await api('update_phase', body); } else { await api('add_phase', body); }
    closeModal('phaseModal'); await init();
    toast(id ? t('toast_phase_updated') : t('toast_phase_added'));
  } catch(err) { console.error(err); toast(t('err_generic'), 'err'); }
});

function editPhase(id) {
  const ph = appData.phases.find(p => p.id == id); if (!ph) return;
  document.getElementById('phaseId').value = ph.id;
  document.getElementById('phaseName').value = ph.name;
  document.getElementById('phaseStart').value = ph.start||'';
  document.getElementById('phaseEnd').value = ph.end||'';
  document.getElementById('phaseStatus').value = ph.status||'pending';
  document.getElementById('phaseProgress').value = ph.progress||0;
  document.getElementById('progressVal').textContent = ph.progress||0;
  document.getElementById('phaseNotes').value = ph.notes||'';
  document.getElementById('phaseModalTitle').textContent = t('edit_phase_title');
  updateSelectColor(document.getElementById('phaseStatus'));
  openModal('phaseModal');
}

async function quickUpdatePhaseProgress(id, progress) {
  try {
    const ph = appData.phases.find(x => x.id == id);
    if (ph) ph.progress = parseInt(progress);
    
    // Update display text immediately
    const pctEl = document.getElementById(`ovProgPct-${id}`);
    if (pctEl) pctEl.textContent = progress + '%';
    
    // Update specific progress bar width
    const fillEl = document.getElementById(`ovProgFill-${id}`);
    if (fillEl) fillEl.style.width = progress + '%';

    // Call API
    await api('update_phase', { id, progress: parseInt(progress) });
  } catch(e) { console.error(e); }
}


async function deletePhase(id) { if (!confirm(t('confirm_delete_phase'))) return; await api('delete_phase',{id}); await init(); toast(t('toast_phase_deleted'),'err'); }

// ---- EXPENSES CRUD ----
function openAddExpenseModal() {
  document.getElementById('expId').value = '';
  document.getElementById('expenseForm').reset();
  const dateEl = document.getElementById('expDate');
  if (dateEl) dateEl.valueAsDate = new Date();
  const titleEl = document.getElementById('expenseModalTitle');
  if (titleEl) titleEl.textContent = t('add_expense_title');
  openModal('expenseModal');
}
document.getElementById('addExpenseBtn')?.addEventListener('click', openAddExpenseModal);

document.getElementById('expenseForm').addEventListener('submit', async e => {
  e.preventDefault();
  const id = document.getElementById('expId').value;
  const body = { 
    desc:     document.getElementById('expDesc').value, 
    category: document.getElementById('expCategory').value, 
    amount:   document.getElementById('expAmount').value, 
    date:     document.getElementById('expDate').value, 
    paid:     document.getElementById('expPaid').checked ? '1' : '0' 
  };
  try {
    if (id) {
       body.id = id;
       await api('update_expense', body);
    } else {
       await api('add_expense', body);
    }
    closeModal('expenseModal'); await init(); 
    toast(id ? t('toast_expense_updated') : t('toast_expense_added'));
  } catch(err) { console.error(err); toast(t('err_generic'), 'err'); }
});

function editExpense(id) {
  const ex = appData.expenses.find(x => x.id == id); if (!ex) return;
  document.getElementById('expId').value = ex.id;
  document.getElementById('expDesc').value = ex.desc || '';
  document.getElementById('expCategory').value = ex.category || 'Other';
  document.getElementById('expAmount').value = ex.amount || 0;
  document.getElementById('expDate').value = ex.date || '';
  document.getElementById('expPaid').checked = ex.paid == true || ex.paid == '1';
  document.getElementById('expenseModalTitle').textContent = t('edit_expense_title');
  openModal('expenseModal');
}

async function deleteExpense(id) { if (!confirm(t('confirm_delete_expense'))) return; await api('delete_expense',{id}); await init(); toast(t('toast_expense_deleted'),'err'); }

// ---- WORKERS CRUD ----
function openAddWorkerModal() {
  document.getElementById('workerId').value = '';
  const titleEl = document.getElementById('workerModalTitle');
  if (titleEl) titleEl.textContent = t('add_worker_title');
  document.getElementById('workerForm').reset();
  openModal('workerModal');
}
document.getElementById('addWorkerBtn')?.addEventListener('click', openAddWorkerModal);

document.getElementById('workerForm').addEventListener('submit', async e => {
  e.preventDefault();
  const id = document.getElementById('workerId').value;
  const body = { name: document.getElementById('workerName').value, trade: document.getElementById('workerTrade').value, phone: document.getElementById('workerPhone').value, email: document.getElementById('workerEmail').value, rate: document.getElementById('workerRate').value, rating: document.getElementById('workerRating').value, notes: document.getElementById('workerNotes').value };
  try {
    if (id) { body.id = id; await api('update_worker', body); } else { await api('add_worker', body); }
    closeModal('workerModal'); await init();
    toast(id ? t('toast_worker_updated') : t('toast_worker_added'));
  } catch(err) { console.error(err); toast(t('err_generic'), 'err'); }
});

function editWorker(id) {
  const w = appData.workers.find(x => x.id == id); if (!w) return;
  document.getElementById('workerId').value = w.id;
  document.getElementById('workerName').value = w.name||'';
  document.getElementById('workerTrade').value = w.trade||'';
  document.getElementById('workerPhone').value = w.phone||'';
  document.getElementById('workerEmail').value = w.email||'';
  document.getElementById('workerRate').value = w.rate||'';
  document.getElementById('workerRating').value = w.rating||'';
  document.getElementById('workerNotes').value = w.notes||'';
  document.getElementById('workerModalTitle').textContent = t('edit_worker_title');
  openModal('workerModal');
}

async function deleteWorker(id) { if (!confirm(t('confirm_delete_worker'))) return; await api('delete_worker',{id}); await init(); toast(t('toast_worker_deleted'),'err'); }

// ---- TASKS CRUD ----
function openAddTaskModal(phaseId) {
  document.getElementById('taskId').value=''; 
  document.getElementById('taskForm').reset(); 
  if (phaseId) {
    const sel = document.getElementById('taskPhase');
    if (sel) sel.value = phaseId;
  }
  document.getElementById('taskModalTitle').textContent = t('add_task_title') || 'Add Task'; 
  const btn = document.getElementById('taskSubmitBtn');
  if (btn) {
    btn.textContent = t('btn_add') || 'Establish Intent';
    btn.setAttribute('data-i18n', 'btn_add');
  }
  openModal('taskModal'); 
}
document.getElementById('addTaskBtn').addEventListener('click', () => openAddTaskModal());

document.getElementById('taskForm').addEventListener('submit', async e => {
  e.preventDefault();
  const id = document.getElementById('taskId').value;
  const body = {
    title:      document.getElementById('taskTitle').value,
    phase_id:   document.getElementById('taskPhase').value,
    worker_id:  document.getElementById('taskWorker')?.value || '',
    lead_time:  document.getElementById('taskLeadTime')?.value || 0,
    cost:       document.getElementById('taskCost')?.value || 0,
    advance_amount: document.getElementById('taskAdvanceAmount')?.value || 0,
    advance_paid:   document.getElementById('taskAdvancePaid')?.checked || false,
    notes:      document.getElementById('taskNotes')?.value || '',
    status:     document.getElementById('taskStatus')?.value || 'todo',
    priority:   document.getElementById('taskPriority').value,
    start_date: document.getElementById('taskStart').value,
    end_date:   document.getElementById('taskEnd').value
  };
  try {
    if (id) {
      body.id = id;
      await api('update_task', body);
    } else {
      await api('add_task', body);
    }
    if (body.phase_id) await syncPhaseProgress(body.phase_id);
    closeModal('taskModal'); await init();
    toast(id ? (t('toast_task_updated') || 'Task updated.') : t('toast_task_added'));
  } catch(err) { console.error(err); toast(t('err_generic'), 'err'); }
});

function editTask(id) {
  const tk = appData.tasks.find(x => x.id == id); if (!tk) return;
  document.getElementById('taskId').value = tk.id || '';
  document.getElementById('taskTitle').value = tk.title || '';
  document.getElementById('taskPhase').value = tk.phase_id || '';
  document.getElementById('taskWorker').value   = tk.worker_id || '';
  document.getElementById('taskPriority').value = tk.priority  || 'normal';
  document.getElementById('taskLeadTime').value = tk.lead_time || 0;
  document.getElementById('taskCost').value     = tk.cost      || '';
  document.getElementById('taskNotes').value    = tk.notes     || '';
  document.getElementById('taskStatus').value   = tk.status    || 'todo';
  document.getElementById('taskStart').value    = tk.start_date || '';
  document.getElementById('taskEnd').value      = tk.end_date   || '';
  
  const advAmt = document.getElementById('taskAdvanceAmount');
  if (advAmt) advAmt.value = tk.advance_amount || '';
  const advPaid = document.getElementById('taskAdvancePaid');
  if (advPaid) advPaid.checked = tk.advance_paid === true || tk.advance_paid === '1';

  document.getElementById('taskModalTitle').textContent = t('edit_task_title') || 'Edit Task';
  const btn = document.getElementById('taskSubmitBtn');
  if (btn) {
    btn.textContent = t('btn_save') || 'Sync Changes';
    btn.setAttribute('data-i18n', 'btn_save');
  }
  updateSelectColor(document.getElementById('taskStatus'));
  openModal('taskModal');
}
async function updateTaskDateQuick(id, field, value) {
  try {
    const data = {}; data[field] = value;
    await api('update_task', { id, ...data });
    const tk = appData.tasks.find(x => x.id == id);
    if (tk) tk[field] = value;
    if (window.renderGantt) renderGantt();
    if (window.renderCalendar) renderCalendar();
    toast(t('toast_task_updated'));
  } catch(e) { console.error(e); }
}

async function setTaskStatus(id, status) {
  const isDone = (status === 'done');
  await api('update_task', { id, status, done: isDone ? '1' : '0' });
  const tk = appData.tasks.find(x => x.id === id);
  if (tk) {
    tk.status = status;
    tk.done   = isDone;
    if (tk.phase_id) await syncPhaseProgress(tk.phase_id);
  }
  renderOverview();
  renderTasks();
  renderPhases();
  if (window.renderGantt) renderGantt();
}

async function syncPhaseProgress(phaseId) {
  if (!phaseId) return;
  const tasks = (appData.tasks || []).filter(t => String(t.phase_id) === String(phaseId));
  if (tasks.length === 0) return; 
  
  const doneCount = tasks.filter(t => t.status === 'done').length;
  const newProgress = Math.round((doneCount / tasks.length) * 100);
  
  const ph = appData.phases.find(p => String(p.id) === String(phaseId));
  if (ph) {
    ph.progress = newProgress;
    await api('update_phase', { id: phaseId, progress: newProgress });
  }
}

async function setTaskPriority(id, priority) {
  await api('update_task', { id, priority });
  const tk = appData.tasks.find(x => x.id === id);
  if (tk) tk.priority = priority;
  renderOverview();
  renderTasks();
  renderPhases();
  if (window.renderGantt) renderGantt();
}

async function deleteTask(id) { 
  if (!confirm(t('confirm_delete_task'))) return; 
  const tk = appData.tasks.find(t => t.id === id);
  const phaseId = tk ? tk.phase_id : null;
  await api('delete_task',{id}); 
  if (phaseId) await syncPhaseProgress(phaseId);
  await init(); 
  toast(t('toast_task_deleted'),'err'); 
}

// ---- SETTINGS ----
// ---- NEW FEATURES CRUD ----
document.getElementById('changeForm')?.addEventListener('submit', async e => {
  e.preventDefault();
  try {
    await api('add_change', { desc: document.getElementById('changeDesc').value, amount: document.getElementById('changeAmount').value });
    closeModal('changeModal'); await init(); toast(t('toast_change_added'));
  } catch(err) { console.error(err); toast(t('err_generic'), 'err'); }
});
async function deleteChange(id) { if(!confirm(t('confirm_delete_change')))return; await api('delete_change',{id}); await init(); toast(t('toast_change_deleted'),'err'); }

document.getElementById('logForm')?.addEventListener('submit', async e => {
  e.preventDefault();
  try {
    await api('add_log', { text: document.getElementById('logText').value });
    closeModal('logModal'); await init(); toast(t('toast_log_added'));
  } catch(err) { console.error(err); toast(t('err_generic'), 'err'); }
});
async function deleteLog(id) { if(!confirm(t('confirm_delete_log')))return; await api('delete_log',{id}); await init(); toast(t('toast_log_deleted'),'err'); }

document.getElementById('punchForm').addEventListener('submit', async e => {
  e.preventDefault();
  try {
    await api('add_punch', { text: document.getElementById('punchDesc').value });
    closeModal('punchModal'); await init(); toast(t('toast_punch_added'));
  } catch(err) { console.error(err); toast(t('err_generic'), 'err'); }
});
async function togglePunch(id, done) {
  await api('update_punch', {id, done: done ? '1' : '0'});
  const p = appData.punch_list.find(x=>x.id===id); if (p) p.done = done;
  renderPunchList();
}
async function deletePunch(id) { if(!confirm(t('confirm_delete_punch')))return; await api('delete_punch',{id}); await init(); toast(t('toast_punch_deleted'),'err'); }

document.getElementById('settingsForm').addEventListener('submit', async e => {
  e.preventDefault();
  try {
    const payload = {
      title:         document.getElementById('sTitle')?.value || '',
      address:       document.getElementById('sAddress')?.value || '',
      total_budget:  document.getElementById('sBudget')?.value || 0,
      exchange_rate: document.getElementById('sExRate')?.value || 0,
      start_date:    document.getElementById('sStart')?.value || '',
      end_date:      document.getElementById('sEnd')?.value || '',
      notes:         document.getElementById('sNotes')?.value || ''
    };
    const res = await api('save_plan', payload);
    if (res && res.ok) {
       await init(); 
       toast(t('toast_settings_saved'));
    } else {
       toast(res?.error || t('err_generic'), 'err');
    }
  } catch(err) { 
    console.error('Settings save failed:', err); 
    toast(t('err_generic'), 'err'); 
  }
});

// ---- ADMIN TEMPLATE SYNC ----
async function syncTemplate() {
  const btn = document.getElementById('syncTemplateBtn');
  if (!IS_ADMIN) return;
  if (!confirm(t('confirm_sync_template'))) return;
  btn.textContent = t('syncing_msg');
  btn.disabled = true;
  try {
    const res = await api('sync_template', {});
    if (res.ok) {
      toast(t('sync_done_toast').replace('{n}', res.synced));
    } else {
      toast(t('sync_error_toast'), 'err');
    }
  } catch(e) {
    toast(t('sync_error_toast'), 'err');
  }
  btn.textContent = t('btn_sync_all');
  btn.disabled = false;
}

function openEditPlan() {
  const p = appData.plan || {};
  document.getElementById('editPlanTitle').value = p.title || '';
  document.getElementById('editPlanAddress').value = p.address || '';
  document.getElementById('editPlanBudget').value = p.total_budget || 0;
  document.getElementById('editPlanRate').value = p.exchange_rate || 117.5;
  openModal('editPlanModal');
}

document.getElementById('planForm').addEventListener('submit', async e => {
  e.preventDefault();
  const body = {
    title: document.getElementById('editPlanTitle')?.value || '',
    address: document.getElementById('editPlanAddress')?.value || '',
    total_budget: document.getElementById('editPlanBudget')?.value || 0,
    exchange_rate: document.getElementById('editPlanRate')?.value || 0
  };
  try {
    const res = await api('save_plan', body);
    if (res && res.ok) {
      closeModal('editPlanModal'); await init();
      toast(t('toast_settings_saved'));
    } else {
      toast(res?.error || t('err_generic'), 'err');
    }
  } catch(err) { console.error(err); toast(t('err_generic'), 'err'); }
});

function exportReport() {
  window.print();
}

async function resetProjectData(type) {
  let msg = type === 'tasks' ? t('confirm_delete_all_tasks') : t('confirm_delete_everything');
  
  if (!confirm(msg)) return;
  
  try {
    await api('reset_project', { type });
    await init();
    toast(t('toast_project_reset') || "Podaci su obrisani.");
  } catch(e) {
    console.error(e);
    toast(t('err_generic') || "Greška pri brisanju", 'err');
  }
}
