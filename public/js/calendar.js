// ── Calendar state ──────────────────────────────────────────────────────────
let calView    = 'dayGridMonth';
let calFilters = { phases: true, tasks: true, materials: true, payments: true };
let fullCal    = null;

// ── Status → color maps ──────────────────────────────────────────────────────
const CAL_PHASE_COLORS = {
  pending:     { bg: 'rgba(100,116,139,0.18)', border: '#64748B', text: '#94A3B8' },
  active:      { bg: 'rgba(99,102,241,0.18)',  border: '#6366F1', text: '#818CF8' },
  in_progress: { bg: 'rgba(99,102,241,0.18)',  border: '#6366F1', text: '#818CF8' },
  done:        { bg: 'rgba(34,197,94,0.14)',   border: '#22C55E', text: '#4ADE80' },
  paused:      { bg: 'rgba(245,158,11,0.15)',  border: '#F59E0B', text: '#FCD34D' },
};

const CAL_TASK_COLORS = {
  todo:        { bg: '#334155', border: '#475569', text: '#94A3B8' },
  in_progress: { bg: '#1E3A8A', border: '#3B82F6', text: '#93C5FD' },
  done:        { bg: '#14532D', border: '#22C55E', text: '#86EFAC' },
};

// Light mode variants (switched in eventDidMount)
const CAL_PHASE_COLORS_LIGHT = {
  pending:     { bg: 'rgba(100,116,139,0.10)', border: '#94A3B8', text: '#64748B' },
  active:      { bg: 'rgba(99,102,241,0.10)',  border: '#6366F1', text: '#6366F1' },
  in_progress: { bg: 'rgba(99,102,241,0.10)',  border: '#6366F1', text: '#6366F1' },
  done:        { bg: 'rgba(34,197,94,0.10)',   border: '#16A34A', text: '#15803D' },
  paused:      { bg: 'rgba(245,158,11,0.10)',  border: '#D97706', text: '#B45309' },
};

const CAL_TASK_COLORS_LIGHT = {
  todo:        { bg: '#F1F5F9', border: '#CBD5E1', text: '#475569' },
  in_progress: { bg: '#EEF2FF', border: '#6366F1', text: '#4338CA' },
  done:        { bg: '#F0FDF4', border: '#22C55E', text: '#15803D' },
};

function _isLight() {
  return document.querySelector('.blanner-body')?.getAttribute('data-theme') === 'light';
}

function _phaseColors(status) {
  const map = _isLight() ? CAL_PHASE_COLORS_LIGHT : CAL_PHASE_COLORS;
  return map[status] || map.pending;
}

function _taskColors(status) {
  const map = _isLight() ? CAL_TASK_COLORS_LIGHT : CAL_TASK_COLORS;
  return map[status] || map.todo;
}

// Initials from worker name
function _initials(name) {
  if (!name) return '';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);
}

// ── View switcher ────────────────────────────────────────────────────────────
function switchCalView(view) {
  calView = view;
  document.querySelectorAll('[data-calview]').forEach(b => {
    b.classList.toggle('active', b.dataset.calview === view);
  });
  if (fullCal) fullCal.changeView(view);
}

function toggleCalFilter(filter) {
  calFilters[filter] = !calFilters[filter];
  const btn = document.querySelector(`[data-filter="${filter}"]`);
  if (btn) btn.classList.toggle('active', calFilters[filter]);
  renderCalendar();
}

// ── Upcoming list (sidebar) ──────────────────────────────────────────────────
function renderCalUpcoming() {
  const today = new Date(); today.setHours(0,0,0,0);
  const limit = new Date(today); limit.setDate(limit.getDate() + 30);
  const localeMap = { en: 'en', sr: 'sr', ru: 'ru', zh: 'zh-CN' };
  const loc = localeMap[currentLang] || 'en';

  const headerDateEl = document.getElementById('calTodayHeader');
  if (headerDateEl) {
    headerDateEl.textContent = '· ' + today.toLocaleDateString(loc, { weekday: 'long', day: 'numeric', month: 'long' });
  }

  const upEl = document.getElementById('calUpcomingList');
  if (!upEl) return;
  const upcoming = [];

  const phaseStatusColors = { pending: '#64748B', in_progress: '#6366F1', active: '#6366F1', done: '#22C55E', paused: '#F59E0B' };

  if (calFilters.phases) {
    appData.phases.forEach(ph => {
      const col = phaseStatusColors[ph.status] || '#64748B';
      if (ph.start) { const d = new Date(ph.start); if (d >= today && d <= limit) upcoming.push({ date: d, label: phaseTitle(ph) + ' — ' + t('phase_starts'), color: col, type: 'phase' }); }
      if (ph.end)   { const d = new Date(ph.end);   if (d >= today && d <= limit) upcoming.push({ date: d, label: phaseTitle(ph) + ' — ' + t('phase_ends'),   color: col, type: 'phase' }); }
    });
  }
  if (calFilters.tasks) {
    const taskStatusColors = { todo: '#64748B', in_progress: '#6366F1', done: '#22C55E' };
    appData.tasks.filter(tk => !tk.done).forEach(tk => {
      const anchor = tk.start_date || tk.end_date;
      const col = taskStatusColors[tk.status] || (tk.priority === 'high' ? '#EF4444' : '#64748B');
      if (anchor) { const d = new Date(anchor); if (d >= today && d <= limit) upcoming.push({ date: d, label: taskTitle(tk), color: col, type: 'task' }); }
    });
  }
  if (calFilters.materials) {
    (appData.materials || []).filter(mt => mt.status !== 'installed').forEach(mt => {
      if (mt.order_by_date)  { const d = new Date(mt.order_by_date);  if (d >= today && d <= limit) upcoming.push({ date: d, label: mt.name + ' — ' + t('label_order'), color: '#F59E0B', type: 'material' }); }
      if (mt.delivered_date) { const d = new Date(mt.delivered_date); if (d >= today && d <= limit) upcoming.push({ date: d, label: mt.name + ' — ' + t('label_delivery'), color: '#22C55E', type: 'material' }); }
    });
  }
  if (calFilters.payments) {
    (appData.payments || []).filter(p => !p.paid && p.due_date).forEach(p => {
      const d = new Date(p.due_date); if (d >= today && d <= limit) upcoming.push({ date: d, label: p.desc + ' — ' + t('label_payment_short'), color: '#EF4444', type: 'payment' });
    });
  }


  upcoming.sort((a, b) => a.date - b.date);
  const displayList = upcoming.slice(0, 6);

  if (displayList.length === 0) {
    upEl.innerHTML = `<div class="bl-cal-upcoming-rel-compact" style="opacity:0.4">${t('cal_upcoming_empty')}</div>`;
    return;
  }

  upEl.innerHTML = displayList.map(ev => {
    const diff = Math.round((ev.date - today) / 86400000);
    let rel = diff === 0 ? t('date_today') : diff === 1 ? t('date_tomorrow') : t('date_in_days').replace('{n}', diff);
    const typeIcon = { phase: '▬', task: '·', material: '◆', payment: '!' }[ev.type] || '·';
    return `
      <div class="bl-cal-upcoming-item-compact">
        <span style="color:${ev.color};font-size:0.7rem;flex-shrink:0;font-weight:700;">${typeIcon}</span>
        <span class="bl-cal-upcoming-label-compact">${esc(ev.label)}</span>
        <span class="bl-cal-upcoming-rel-compact" style="color:${ev.color}">${rel}</span>
      </div>`;
  }).join('');
}

// ── Main calendar render ─────────────────────────────────────────────────────
function renderCalendar() {
  const calEl = document.getElementById('calendar');
  if (!calEl || !document.getElementById('tab-calendar').classList.contains('active')) return;
  if (fullCal) { fullCal.destroy(); fullCal = null; }

  const events = [];
  const light  = _isLight();

  // ── Phases ─────────────────────────────────────────────────────────────────
  if (calFilters.phases) {
    appData.phases.forEach((ph, idx) => {
      if (!ph.start || !ph.end) return;
      const c   = _phaseColors(ph.status || 'pending');
      const end = new Date(ph.end); end.setDate(end.getDate() + 1);
      const num = String(idx + 1).padStart(2, '0');
      events.push({
        id: 'ph_' + ph.id,
        title: num + ' ' + phaseTitle(ph),
        start: ph.start,
        end: end.toISOString().split('T')[0],
        allDay: true,
        backgroundColor: c.bg,
        borderColor: c.border,
        textColor: c.text,
        extendedProps: {
          type: 'phase',
          phaseId: ph.id,
          status: ph.status || 'pending',
          progress: ph.progress || 0,
          num,
        }
      });
    });
  }

  // ── Tasks ──────────────────────────────────────────────────────────────────
  if (calFilters.tasks) {
    appData.tasks.forEach(tk => {
      const anchor = tk.start_date || tk.end_date;
      if (!anchor) return;
      const status = tk.status || (tk.done ? 'done' : 'todo');
      const c = _taskColors(status);
      const wk = appData.workers.find(w => w.id === tk.worker_id);
      const ph = appData.phases.find(p => p.id === tk.phase_id);

      let ev = {
        id: 'tk_' + tk.id,
        title: taskTitle(tk),
        start: anchor,
        allDay: true,
        backgroundColor: c.bg,
        borderColor: tk.priority === 'high' ? '#EF4444' : c.border,
        textColor: c.text,
        extendedProps: {
          type: 'task',
          taskId: tk.id,
          status,
          done: tk.done,
          priority: tk.priority,
          workerName: wk ? wk.name : '',
          phaseName: ph ? phaseTitle(ph) : '',
        }
      };
      if (tk.start_date && tk.end_date) {
        const e = new Date(tk.end_date); e.setDate(e.getDate() + 1);
        ev.end = e.toISOString().split('T')[0];
      }
      events.push(ev);
    });
  }

  // ── Materials ──────────────────────────────────────────────────────────────
  if (calFilters.materials) {
    (appData.materials || []).forEach(mt => {
      if (mt.status === 'installed') return;
      const base = { allDay: true, extendedProps: { type: 'material', materialId: mt.id } };
      if (mt.order_by_date)  events.push({ ...base, id: 'mt_o_' + mt.id, title: mt.name, start: mt.order_by_date,  backgroundColor: light ? '#FEF9C3' : '#451A03', borderColor: '#F59E0B', textColor: light ? '#92400E' : '#FCD34D', extendedProps: { ...base.extendedProps, subtype: 'order' } });
      if (mt.delivered_date) events.push({ ...base, id: 'mt_d_' + mt.id, title: mt.name, start: mt.delivered_date, backgroundColor: light ? '#F0FDF4' : '#14532D', borderColor: '#22C55E', textColor: light ? '#15803D' : '#86EFAC', extendedProps: { ...base.extendedProps, subtype: 'delivery' } });
    });
  }

  // ── Payments ───────────────────────────────────────────────────────────────
  if (calFilters.payments) {
    (appData.payments || []).filter(p => !p.paid && p.due_date).forEach(p => {
      events.push({
        id: 'pm_' + p.id,
        title: p.desc,
        start: p.due_date,
        allDay: true,
        backgroundColor: light ? '#FEF2F2' : '#450A0A',
        borderColor: '#EF4444',
        textColor: light ? '#B91C1C' : '#FCA5A5',
        extendedProps: { type: 'payment', paymentId: p.id }
      });
    });
  }

  // ── FullCalendar init ──────────────────────────────────────────────────────
  fullCal = new FullCalendar.Calendar(calEl, {
    initialView: calView,
    locale: currentLang === 'sr' ? 'sr-cyrl' : (currentLang || 'en'),
    headerToolbar: { left: 'prev,next today', center: 'title', right: '' },
    events: events,
    height: 'auto',
    dayMaxEvents: 5,
    firstDay: 1, // Monday

    // ── Custom event rendering ───────────────────────────────────────────────
    eventContent: function(arg) {
      const ep = arg.event.extendedProps;
      const isMonth = calView === 'dayGridMonth';
      const title = arg.event.title;

      if (ep.type === 'phase') {
        const prog = ep.progress || 0;
        const progBar = prog > 0
          ? `<div style="height:2px;background:${arg.event.borderColor};opacity:0.6;width:${prog}%;border-radius:1px;margin-top:2px;"></div>`
          : '';
        return { html: `
          <div style="display:flex;flex-direction:column;gap:0;padding:1px 4px;overflow:hidden;width:100%;box-sizing:border-box;">
            <div style="display:flex;align-items:center;gap:3px;overflow:hidden;">
              <span style="font-size:0.55rem;font-weight:800;letter-spacing:0.06em;color:${arg.event.borderColor};flex-shrink:0;font-family:'JetBrains Mono',monospace;">${ep.num}</span>
              <span style="font-size:0.7rem;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:-0.01em;">${esc(title.substring(3))}</span>
              ${prog > 0 && isMonth ? `<span style="font-size:0.55rem;opacity:0.7;flex-shrink:0;margin-left:auto;">${prog}%</span>` : ''}
            </div>
            ${progBar}
          </div>` };
      }

      if (ep.type === 'task') {
        const initials = _initials(ep.workerName);
        const prioMark = ep.priority === 'high' ? `<span style="color:#EF4444;font-size:0.6rem;font-weight:900;flex-shrink:0;">!</span>` : '';
        const workerBadge = initials
          ? `<span style="font-size:0.5rem;font-weight:700;background:${arg.event.borderColor};color:${arg.event.backgroundColor};border-radius:3px;padding:0 3px;flex-shrink:0;letter-spacing:0.03em;">${initials}</span>`
          : '';
        const doneStyle = ep.done ? 'text-decoration:line-through;opacity:0.5;' : '';
        return { html: `
          <div style="display:flex;align-items:center;gap:3px;padding:1px 4px;overflow:hidden;width:100%;box-sizing:border-box;">
            ${prioMark}
            <span style="font-size:0.7rem;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;${doneStyle}">${esc(title)}</span>
            ${workerBadge}
          </div>` };
      }

      if (ep.type === 'material') {
        const icon = ep.subtype === 'order' ? '▼' : '▲';
        return { html: `
          <div style="display:flex;align-items:center;gap:3px;padding:1px 4px;overflow:hidden;width:100%;box-sizing:border-box;">
            <span style="font-size:0.6rem;font-weight:900;flex-shrink:0;">${icon}</span>
            <span style="font-size:0.7rem;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(title)}</span>
          </div>` };
      }

      if (ep.type === 'payment') {
        return { html: `
          <div style="display:flex;align-items:center;gap:3px;padding:1px 4px;overflow:hidden;width:100%;box-sizing:border-box;">
            <span style="font-size:0.6rem;font-weight:900;flex-shrink:0;color:#EF4444;">$</span>
            <span style="font-size:0.7rem;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(title)}</span>
          </div>` };
      }

      // fallback
      return { html: `<div style="padding:1px 4px;font-size:0.7rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(title)}</div>` };
    },

    // ── Event mounted — apply custom styles ──────────────────────────────────
    eventDidMount: function(info) {
      const ep = info.event.extendedProps;
      const el = info.el;

      // Left accent border for all events
      el.style.borderLeft = `3px solid ${info.event.borderColor}`;
      el.style.borderTop = 'none';
      el.style.borderRight = 'none';
      el.style.borderBottom = 'none';
      el.style.borderRadius = '4px';
      el.style.padding = '0';

      if (ep.done) {
        el.style.opacity = '0.5';
      }

      // Tooltip
      const parts = [];
      if (ep.type === 'phase' && ep.progress > 0) parts.push(`${ep.progress}% dovrseno`);
      if (ep.workerName) parts.push(`Radnik: ${ep.workerName}`);
      if (ep.phaseName)  parts.push(`Etapa: ${ep.phaseName}`);
      if (parts.length)  el.title = parts.join(' · ');
    },

    // ── Event click ──────────────────────────────────────────────────────────
    eventClick: function(info) {
      const ep = info.event.extendedProps;
      if (ep.type === 'phase')    editPhase(ep.phaseId);
      if (ep.type === 'task')     editTask(ep.taskId);
      if (ep.type === 'material_order' || ep.type === 'material_delivered' || ep.type === 'material') editMaterial(ep.materialId);
      if (ep.type === 'payment')  editPayment(ep.paymentId);
    },

    // ── Day click — could be used for quick add ───────────────────────────
    // dayCellClassNames: function(arg) { ... }
  });

  fullCal.render();
  renderCalUpcoming();
}
