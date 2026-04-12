// ---- GANTT — Custom Implementation ----
let ganttViewMode = 'month'; // 'week' | 'month' | 'quarter'
let ganttShowTasks = true;
let ganttZoom = 200; // percent, 75–500
let ganttMinDate = new Date();
let ganttTotalDays = 0;

// Theme-aware colors
function getGanttColors() {
  const isLight = document.querySelector('.blanner-body').getAttribute('data-theme') === 'light';
  return {
    bar: isLight ? '#444444' : '#636366',
    prog: isLight ? '#222222' : '#8E8E93',
    text: isLight ? '#FFFFFF' : '#FFFFFF',
    grid: isLight ? '#E5E6E7' : '#3A3A3C',
    today: isLight ? '#FF3B30' : '#FF453A',
    phaseDone: isLight ? '#BBBBBB' : '#aeaeb2',
    phaseActive: isLight ? '#333333' : '#636366'
  };
}

function setZoom(val) {
  ganttZoom = Math.min(500, Math.max(75, val));
  const slider = document.getElementById('ganttZoomSlider');
  const label  = document.getElementById('ganttZoomLabel');
  if (slider) slider.value = ganttZoom;
  if (label)  label.textContent = ganttZoom + '%';
  const c = document.getElementById('ganttCustom');
  if (c) {
    c.style.width = ganttZoom + '%';
    c.style.minWidth = ganttZoom + '%';
  }
}

function adjustZoom(delta) { setZoom(ganttZoom + delta); }

function exportGanttPDF() {
  const wrap = document.getElementById('ganttWrap');
  const container = document.getElementById('ganttCustom');
  if (!wrap || !container) return;

  // Save original styles
  const wrapOvf = wrap.style.overflow;
  const cW      = container.style.width;
  const cMinW   = container.style.minWidth;

  // Expand fully for print
  wrap.style.overflow = 'visible';
  container.style.width    = '100%';
  container.style.minWidth = '100%';

  const prevTitle = document.title;
  document.title  = (appData.plan?.title || 'Project') + ' — Gantt Chart';

  window.print();

  // Restore after print dialog closes
  setTimeout(() => {
    wrap.style.overflow      = wrapOvf;
    container.style.width    = cW;
    container.style.minWidth = cMinW;
    document.title = prevTitle;
  }, 500);
}

function changeGanttView(mode) {
  ganttViewMode = mode;
  document.querySelectorAll('.bl-gantt-view-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.mode === mode);
  });
  renderGantt();
}

function toggleGanttTasks() {
  ganttShowTasks = !ganttShowTasks;
  const btn = document.getElementById('ganttToggleTasksBtn');
  if (btn) btn.textContent = t(ganttShowTasks ? 'gantt_hide_tasks' : 'gantt_show_tasks');
  renderGantt();
}

function _ganttMonthLabel(date) {
  const localeMap = { en: 'en', sr: 'sr', ru: 'ru', zh: 'zh-CN' };
  const loc = localeMap[currentLang] || 'en';
  return date.toLocaleDateString(loc, { month: 'short', year: 'numeric' });
}

function _ganttWeekNum(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const y = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - y) / 86400000) + 1) / 7);
}

function renderGantt() {
  const gTab = document.getElementById('tab-gantt');
  if (!gTab || !gTab.classList.contains('active')) return;

  const validPhases = appData.phases.filter(p => p.start && p.end);
  const validTasks  = appData.tasks.filter(tk => tk.start_date && tk.end_date);
  const emptyEl  = document.getElementById('ganttEmpty');
  const wrapEl   = document.getElementById('ganttWrap');
  const container = document.getElementById('ganttCustom');

  if (!validPhases.length && !validTasks.length) {
    if (emptyEl) emptyEl.style.display = 'block';
    if (wrapEl)  wrapEl.style.display  = 'none';
    return;
  }
  if (emptyEl) emptyEl.style.display = 'none';
  if (wrapEl)  wrapEl.style.display  = 'block';
  if (!container) return;

  // ── Compute date range ───────────────────────────────────────────────────────
  const allDates = validPhases.flatMap(ph => [new Date(ph.start), new Date(ph.end)]);
  if (ganttShowTasks) {
    appData.tasks.forEach(tk => {
      if (tk.start_date) allDates.push(new Date(tk.start_date));
      if (tk.end_date)   allDates.push(new Date(tk.end_date));
    });
  }
  let minDate = new Date(Math.min(...allDates));
  let maxDate = new Date(Math.max(...allDates));

  // Pad & align minDate to Monday
  minDate.setDate(minDate.getDate() - 7);
  maxDate.setDate(maxDate.getDate() + 14);
  const dow = minDate.getDay();
  minDate.setDate(minDate.getDate() - (dow === 0 ? 6 : dow - 1));
  minDate.setHours(0, 0, 0, 0);
  maxDate.setHours(0, 0, 0, 0);

  ganttMinDate = new Date(minDate);
  const totalDays = Math.round((maxDate - minDate) / 86400000);
  ganttTotalDays = totalDays;
  const today = new Date(); today.setHours(0, 0, 0, 0);

  function dayOff(dateStr) {
    const d = new Date(dateStr); d.setHours(0, 0, 0, 0);
    return Math.round((d - minDate) / 86400000);
  }
  function pct(days) { return ((days / totalDays) * 100).toFixed(3) + '%'; }

  // ── Status color map ─────────────────────────────────────────────────────────
  const isLight = document.querySelector('.blanner-body').getAttribute('data-theme') === 'light';
  const SC = isLight ? {
    active:      { bar: '#ccebff', prog: '#0a84ff', text: '#004085' }, // Light Blue
    in_progress: { bar: '#ccebff', prog: '#0a84ff', text: '#004085' },
    done:        { bar: '#d4edda', prog: '#28a745', text: '#155724' }, // Light Green
    pending:     { bar: '#f8f9fa', prog: '#dee2e6', text: '#495057' },
    todo:        { bar: '#f8f9fa', prog: '#dee2e6', text: '#495057' },
    paused:      { bar: '#fff3cd', prog: '#ffc107', text: '#856404' },
  } : {
    active:      { bar: '#003366', prog: '#0a84ff', text: '#fff' },
    in_progress: { bar: '#003366', prog: '#0a84ff', text: '#fff' },
    done:        { bar: '#1b5e20', prog: '#28a745', text: '#fff' },
    pending:     { bar: '#2c2c2e', prog: '#636366', text: '#fff' },
    todo:        { bar: '#2c2c2e', prog: '#636366', text: '#fff' },
    paused:      { bar: '#664d03', prog: '#ffc107', text: '#fff' },
  };
  function sc(s) { return SC[s] || SC.pending; }

  // ── Header columns ───────────────────────────────────────────────────────────
  let monthsHtml = '', weeksHtml = '';

  if (ganttViewMode === 'week') {
    const months = {};
    let cur = new Date(minDate);
    while (cur <= maxDate) {
      const key = cur.getFullYear() + '-' + cur.getMonth();
      if (!months[key]) months[key] = { date: new Date(cur), start: dayOff(cur), end: 0 };
      months[key].end = dayOff(cur) + 7;
      weeksHtml += `<div class="bl-gantt-week-lbl" style="left:${pct(dayOff(cur))};width:${pct(7)}">W${_ganttWeekNum(cur)}</div>`;
      cur.setDate(cur.getDate() + 7);
    }
    Object.values(months).forEach(m => {
      const w = Math.min(m.end, totalDays) - m.start;
      monthsHtml += `<div class="bl-gantt-month-lbl" style="left:${pct(m.start)};width:${pct(w)}">${_ganttMonthLabel(m.date)}</div>`;
    });
    weeksHtml = `<div class="bl-gantt-sub-header">${weeksHtml}</div>`;

  } else if (ganttViewMode === 'month') {
    let cur = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    while (cur <= maxDate) {
      const start = Math.max(0, dayOff(cur));
      const next  = new Date(cur.getFullYear(), cur.getMonth() + 1, 1);
      const end   = Math.min(totalDays, dayOff(next));
      if (end > start) monthsHtml += `<div class="bl-gantt-month-lbl" style="left:${pct(start)};width:${pct(end - start)}">${_ganttMonthLabel(cur)}</div>`;
      cur = next;
    }

  } else { // quarter
    let cur = new Date(minDate.getFullYear(), Math.floor(minDate.getMonth() / 3) * 3, 1);
    while (cur <= maxDate) {
      const start = Math.max(0, dayOff(cur));
      const next  = new Date(cur.getFullYear(), cur.getMonth() + 3, 1);
      const end   = Math.min(totalDays, dayOff(next));
      const qn    = Math.floor(cur.getMonth() / 3) + 1;
      if (end > start) monthsHtml += `<div class="bl-gantt-month-lbl" style="left:${pct(start)};width:${pct(end - start)}">Q${qn} ${cur.getFullYear()}</div>`;
      cur = next;
    }
  }

  // ── Grid lines ───────────────────────────────────────────────────────────────
  let gridHtml = '';
  if (ganttViewMode === 'week') {
    let cur = new Date(minDate);
    while (cur <= maxDate) { gridHtml += `<div class="bl-gantt-grid-line" style="left:${pct(dayOff(cur))}"></div>`; cur.setDate(cur.getDate() + 7); }
  } else if (ganttViewMode === 'month') {
    let cur = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    while (cur <= maxDate) { gridHtml += `<div class="bl-gantt-grid-line" style="left:${pct(dayOff(cur))}"></div>`; cur.setMonth(cur.getMonth() + 1); }
  } else {
    let cur = new Date(minDate.getFullYear(), Math.floor(minDate.getMonth() / 3) * 3, 1);
    while (cur <= maxDate) { gridHtml += `<div class="bl-gantt-grid-line" style="left:${pct(dayOff(cur))}"></div>`; cur.setMonth(cur.getMonth() + 3); }
  }

  // ── Today marker ─────────────────────────────────────────────────────────────
  const todayOff = dayOff(today);
  const todayHtml = (todayOff >= 0 && todayOff <= totalDays)
    ? `<div class="bl-gantt-today-line" style="left:${pct(todayOff)}"><div class="bl-gantt-today-dot"></div></div>`
    : '';

  // ── Rows ─────────────────────────────────────────────────────────────────────
  let rowsHtml = '';
  const localeMap = { en: 'en', sr: 'sr', ru: 'ru', zh: 'zh-CN' };
  const loc = localeMap[currentLang] || 'en';
  const fmtDate = d => new Date(d).toLocaleDateString(loc, { day: 'numeric', month: 'short' });

  validPhases.forEach((ph, idx) => {
    const c       = sc(ph.status || 'pending');
    const sOff    = dayOff(ph.start);
    const eOff    = dayOff(ph.end) + 1;
    const barW    = Math.max(1, eOff - sOff);
    const prog    = Number(ph.progress || 0);
    const phNum   = String(idx + 1).padStart(2, '0');
    const label   = phaseTitle(ph) || ('Phase ' + (idx + 1));
    const barLabel = label + (prog > 0 ? ` · ${prog}%` : '');

    rowsHtml += `
    <div class="bl-gantt-row bl-gantt-phase-row">
      <div class="bl-gantt-label" onmousedown="event.stopPropagation()" onclick="event.stopPropagation(); editPhase('${ph.id}')">
        <span class="bl-gantt-phase-num">${phNum}</span>
        <div class="bl-gantt-label-text">
          <div class="bl-gantt-phase-name">${esc(label)}</div>
          <div class="bl-gantt-phase-meta">${fmtDate(ph.start)} → ${fmtDate(ph.end)}</div>
        </div>
        <span class="bl-gantt-status-pill status-${ph.status||'pending'}">${statusLabel(ph.status||'pending')}</span>
      </div>
      <div class="bl-gantt-timeline">
        ${gridHtml}
        <div class="bl-gantt-bar bl-gantt-draggable-bar" style="left:${pct(sOff)};width:${pct(barW)};background:${c.bar}" data-id="${ph.id}" data-start="${ph.start}" data-end="${ph.end}">
          <div class="bl-gantt-resizer left-edge" data-edge="left"></div>
          <div class="bl-gantt-bar-prog" style="width:${prog}%;background:${c.prog}"></div>
          <span class="bl-gantt-bar-lbl" style="color:${c.text}; pointer-events: none;" title="Uredi etapu">${esc(barLabel)}</span>
          <div class="bl-gantt-resizer right-edge" data-edge="right"></div>
        </div>
        ${todayHtml}
      </div>
    </div>`;

    if (ganttShowTasks) {
      const phaseTasks = appData.tasks.filter(tk => tk.phase_id === ph.id && tk.start_date && tk.end_date);
      phaseTasks.forEach(tk => {
        const tsOff = dayOff(tk.start_date);
        const teOff = dayOff(tk.end_date) + 1;
        const tbW   = Math.max(1, teOff - tsOff);
        const st    = tk.status || (tk.done ? 'done' : 'todo');
        const colors = sc(st);
        const tCol   = colors.bar;
        const tProg  = colors.prog;
        rowsHtml += `
    <div class="bl-gantt-row bl-gantt-task-row">
      <div class="bl-gantt-label bl-gantt-task-label" onmousedown="event.stopPropagation()" onclick="event.stopPropagation(); editTask('${tk.id}')">
        <span class="bl-gantt-task-connector"></span>
        <span class="bl-gantt-task-dot" style="background:${tCol};${tk.done?'opacity:0.5':''}"></span>
        <span class="bl-gantt-task-name${tk.done?' done':''}">${esc(taskTitle(tk))}</span>
      </div>
      <div class="bl-gantt-timeline">
        ${gridHtml}
        <div class="bl-gantt-task-bar" onmousedown="event.stopPropagation()" onclick="event.stopPropagation(); editTask('${tk.id}')" style="cursor:pointer; left:${pct(tsOff)};width:${pct(tbW)};background:${tCol};border:1px solid ${tProg};${tk.status==='done'?'opacity:0.6':''}">
          ${tk.done ? '<span class="bl-gantt-task-check">✓</span>' : ''}
        </div>
        ${todayHtml}
      </div>
    </div>`;
      });
    }
  });

  // ── Assemble ─────────────────────────────────────────────────────────────────
  container.innerHTML = `
    <div class="bl-gantt-head">
      <div class="bl-gantt-head-label">
        <span style="font-family:'JetBrains Mono',monospace;font-size:0.5rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--silver);">${t('gantt_phase_task')}</span>
      </div>
      <div class="bl-gantt-head-timeline">
        <div class="bl-gantt-main-header">${monthsHtml}${todayHtml}</div>
        ${weeksHtml}
      </div>
    </div>
    <div class="bl-gantt-body">${rowsHtml}</div>`;

  // Scroll today into view
  if (todayOff >= 0 && todayOff <= totalDays) {
    setTimeout(() => {
      const wrap = document.getElementById('ganttWrap');
      if (wrap) {
        const ratio = todayOff / totalDays;
        wrap.scrollLeft = Math.max(0, wrap.scrollWidth * ratio - wrap.clientWidth / 2);
      }
    }, 60);
  }
  
  setZoom(ganttZoom);
  initGanttDraggable();
}

/** 
 * Omogućava drag-to-scroll na gantogramu
 */
function initGanttDraggable() {
  const slider = document.getElementById('ganttWrap');
  if (!slider) return;

  let isDown = false;
  let startX;
  let startY;
  let scrollLeft;
  let scrollTop;

  let tooltip = document.getElementById('ganttTooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'ganttTooltip';
    document.body.appendChild(tooltip);
  }

  // Stavi početni kursor
  slider.style.cursor = 'grab';

  slider.onmousedown = (e) => {
    const resizer = e.target.closest('.bl-gantt-resizer');
    const dragBar = e.target.closest('.bl-gantt-draggable-bar');
    const isButton = e.target.closest('button');

    if (isButton) return;

    function pxToDate(pct) {
      let d = Math.round((pct / 100) * ganttTotalDays);
      let date = new Date(ganttMinDate);
      date.setDate(date.getDate() + d);
      return date;
    }
    
    function dateToPx(date) {
      let d = Math.round((date - ganttMinDate) / 86400000);
      return (d / ganttTotalDays) * 100;
    }

    function fmtStr(d) {
      let m = (d.getMonth() + 1).toString().padStart(2, '0');
      let dt = d.getDate().toString().padStart(2, '0');
      return d.getFullYear() + '-' + m + '-' + dt;
    }

    // 1) RESIZING 
    if (resizer) {
      e.preventDefault();
      e.stopPropagation();
      let isResizing = true;
      let edge = resizer.dataset.edge;
      let bar = dragBar;
      let phaseId = bar.dataset.id;
      let phase = appData.phases.find(p => p.id === phaseId);
      if (!phase) return;

      let timeline = bar.parentElement;
      let timelineW = timeline.clientWidth;
      
      let rStartX = e.pageX;
      let origLeft = parseFloat(bar.style.left);
      let origWidth = parseFloat(bar.style.width);
      
      let newStartDate = new Date(phase.start);
      let newEndDate = new Date(phase.end);
      
      document.body.style.cursor = 'col-resize';
      tooltip.style.display = 'block';

      const doMousemove = (ev) => {
        if (!isResizing) return;
        let deltaPx = ev.pageX - rStartX;
        let deltaPct = (deltaPx / timelineW) * 100;
        
        if (edge === 'left') {
           let nLeft = origLeft + deltaPct;
           let nWidth = origWidth - deltaPct;
           if (nWidth > 0.5) {
             bar.style.left = nLeft + '%';
             bar.style.width = nWidth + '%';
             newStartDate = pxToDate(nLeft);
             tooltip.textContent = fmtStr(newStartDate);
           }
        } else {
           let nWidth = origWidth + deltaPct;
           if (nWidth > 0.5) {
             bar.style.width = nWidth + '%';
             let nEndPct = origLeft + nWidth;
             newEndDate = pxToDate(nEndPct);
             newEndDate.setDate(newEndDate.getDate() - 1);
             tooltip.textContent = fmtStr(newEndDate);
           }
        }
        tooltip.style.left = (ev.pageX + 15) + 'px';
        tooltip.style.top = (ev.pageY + 15) + 'px';
      };

      const doMouseup = async (ev) => {
        isResizing = false;
        document.body.style.cursor = '';
        tooltip.style.display = 'none';
        document.removeEventListener('mousemove', doMousemove);
        document.removeEventListener('mouseup', doMouseup);

        let finalStart = fmtStr(newStartDate);
        let finalEnd = fmtStr(newEndDate);
        
        if (phase.start !== finalStart || phase.end !== finalEnd) {
           phase.start = finalStart;
           phase.end = finalEnd;
           try { await api('update_phase', phase); } catch(err) { console.error(err); }
           renderGantt();
        }
      };

      document.addEventListener('mousemove', doMousemove);
      document.addEventListener('mouseup', doMouseup);
      return;
    }

    // 2) DRAGGING ENTIRE BAR OR CLICKING
    if (dragBar) {
      e.preventDefault();
      e.stopPropagation();
      let isDraggingBar = true;
      let hasDragged = false;
      let phaseId = dragBar.dataset.id;
      let phase = appData.phases.find(p => p.id === phaseId);
      if (!phase) return;

      let timeline = dragBar.parentElement;
      let timelineW = timeline.clientWidth;
      
      let dStartX = e.pageX;
      let dStartY = e.pageY;
      let origLeft = parseFloat(dragBar.style.left);
      
      let oldStartDate = new Date(phase.start);
      let oldEndDate = new Date(phase.end);
      let durationDays = Math.round((oldEndDate - oldStartDate) / 86400000);
      
      let snapPoints = [];
      appData.phases.forEach(p => {
          if (p.id !== phaseId && p.end) {
              let snapD = new Date(p.end);
              snapD.setDate(snapD.getDate() + 1); // Snap: Dan nakon kraja prethodne faze
              snapPoints.push({ ms: snapD.getTime(), d: snapD });
          }
      });
      
      let newStartDate = new Date(phase.start);
      let newEndDate = new Date(phase.end);

      const doMousemove = (ev) => {
        if (!isDraggingBar) return;
        let deltaPx = ev.pageX - dStartX;
        let deltaY = ev.pageY - dStartY;
        
        if (!hasDragged) {
           if (Math.abs(deltaPx) > 3 || Math.abs(deltaY) > 3) {
              hasDragged = true;
              document.body.style.cursor = 'move';
              tooltip.style.display = 'block';
           } else {
              return; // Ignore minor jitter
           }
        }
        
        let deltaPct = (deltaPx / timelineW) * 100;
        let nLeft = origLeft + deltaPct;
        newStartDate = pxToDate(nLeft);
        
        let snapped = false;
        let toleranceDays = 2; // Opseg u danima
        for (let sp of snapPoints) {
            let diffDays = Math.abs(newStartDate.getTime() - sp.ms) / 86400000;
            if (diffDays <= toleranceDays) {
                newStartDate = new Date(sp.ms);
                nLeft = dateToPx(newStartDate);
                snapped = true;
                break;
            }
        }
        
        dragBar.style.left = nLeft + '%';
        // Vizuelni indikator snapanja
        if (snapped) dragBar.style.boxShadow = '0 0 0 2px var(--accent-main)';
        else dragBar.style.boxShadow = '';
        
        newEndDate = new Date(newStartDate);
        newEndDate.setDate(newEndDate.getDate() + durationDays);
        
        tooltip.textContent = fmtStr(newStartDate) + ' → ' + fmtStr(newEndDate);
        tooltip.style.left = (ev.pageX + 15) + 'px';
        tooltip.style.top = (ev.pageY + 15) + 'px';
      };

      const doMouseup = async (ev) => {
        isDraggingBar = false;
        document.body.style.cursor = '';
        tooltip.style.display = 'none';
        dragBar.style.boxShadow = '';
        document.removeEventListener('mousemove', doMousemove);
        document.removeEventListener('mouseup', doMouseup);

        if (!hasDragged) {
            // Bio je samo click
            editPhase(phaseId);
            return;
        }

        let finalStart = fmtStr(newStartDate);
        let finalEnd = fmtStr(newEndDate);
        
        if (phase.start !== finalStart || phase.end !== finalEnd) {
           phase.start = finalStart;
           phase.end = finalEnd;
           try { await api('update_phase', phase); } catch(err) { console.error(err); }
           renderGantt();
        }
      };

      document.addEventListener('mousemove', doMousemove);
      document.addEventListener('mouseup', doMouseup);
      return;
    }

    // 3) DRAG TO SCROLL WRAPPER
    isDown = true;
    slider.classList.add('dragging');
    slider.style.cursor = 'grabbing';
    
    startX = e.pageX - slider.offsetLeft;
    startY = e.pageY - slider.offsetTop;
    scrollLeft = slider.scrollLeft;
    scrollTop = slider.scrollTop;
  };

  slider.onmouseleave = () => {
    isDown = false;
    slider.classList.remove('dragging');
    slider.style.cursor = 'grab';
  };

  slider.onmouseup = () => {
    isDown = false;
    slider.classList.remove('dragging');
    slider.style.cursor = 'grab';
  };

  slider.onmousemove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    
    const x = e.pageX - slider.offsetLeft;
    const y = e.pageY - slider.offsetTop;
    
    const walkX = (x - startX); 
    const walkY = (y - startY); 
    
    slider.scrollLeft = scrollLeft - walkX;
    slider.scrollTop = scrollTop - walkY;
  };
}


