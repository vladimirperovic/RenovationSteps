/* ── Mind Map Interaction Logic ── */
(function () {
  var mmDrag      = null;
  var mmTransform = { x: 0, y: 0, scale: 1 };
  var mmHidePrio    = new Set();
  var mmHideStatus  = new Set();
  var mmEventsOn    = false;

  // Pinch zoom state
  var pointers      = new Map();
  var initialDist   = 0;
  var initialScale  = 1;

  function esc(s) {
    return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function trunc(s, n) { return s.length > n ? s.slice(0, n - 1) + '…' : s; }

  function getDist(p1, p2) {
    var dx = p1.clientX - p2.clientX;
    var dy = p1.clientY - p2.clientY;
    return Math.sqrt(dx*dx + dy*dy);
  }

  function getMid(p1, p2) {
    return { x: (p1.clientX + p2.clientX)/2, y: (p1.clientY + p2.clientY)/2 };
  }

  function applyT() {
    var g = document.getElementById('mmCanvas');
    if (g) g.setAttribute('transform',
      'translate(' + mmTransform.x.toFixed(1) + ',' + mmTransform.y.toFixed(1) + ') scale(' + mmTransform.scale.toFixed(3) + ')');
    var lbl = document.getElementById('mmZoomLabel');
    if (lbl) lbl.textContent = Math.round(mmTransform.scale * 100) + '%';
  }

  window.mmAdjustZoom = function (delta) {
    mmTransform.scale = Math.min(Math.max(mmTransform.scale + delta, 0.2), 4);
    applyT();
  };

  window.mmInitMap = function () {
    mmTransform = { x: 0, y: 0, scale: 1 };
    renderMindMap();
    if (!mmEventsOn) attachMMEvents();
  };

  window.mmTogglePrio = function (prio, btn) {
    if (mmHidePrio.has(prio)) { mmHidePrio.delete(prio); btn.classList.add('active'); }
    else                      { mmHidePrio.add(prio);    btn.classList.remove('active'); }
    renderMindMap();
  };

  window.mmToggleStatus = function (status, btn) {
    if (mmHideStatus.has(status)) { mmHideStatus.delete(status); btn.classList.add('active'); }
    else                          { mmHideStatus.add(status);    btn.classList.remove('active'); }
    renderMindMap();
  };

  window.renderMindMap = function () {
    var wrap      = document.getElementById('mindmapWrap');
    var container = document.getElementById('mindmapContainer');
    if (!container || !wrap) return;

    var phases = appData.phases || [];
    var tasks  = appData.tasks  || [];
    var title  = (appData.plan && appData.plan.title) || 'Project';

    if (phases.length === 0) {
      container.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:1rem;color:var(--graphite);">'
        + '<div style="font-size:2.5rem;">🗺️</div>'
        + '<div style="font-size:1rem;font-weight:600;">No phases yet</div>'
        + '<div style="font-size:0.8125rem;">Add phases to see the mind map</div>'
        + '<button class="bl-btn bl-btn-primary" style="margin-top:0.5rem;" onclick="switchTab(\'phases\')">Go to Phases →</button>'
        + '</div>';
      return;
    }

    var W  = wrap.clientWidth  || 800;
    var H  = wrap.clientHeight || 600;
    var cx = W / 2, cy = H / 2;
    var phaseR = Math.min(W, H) * 0.28;
    var taskR  = phaseR * 0.46;

    var phCol = { done:'#30d158', active:'#0a84ff', planned:'#636366', pending:'#636366', todo:'#636366' };

    var edges = '', nodes = '';

    phases.forEach(function (ph, i) {
      var angle = (2 * Math.PI * i / phases.length) - Math.PI / 2;
      var px = cx + phaseR * Math.cos(angle);
      var py = cy + phaseR * Math.sin(angle);
      var col = phCol[ph.status] || '#636366';

      // center → phase (curved)
      edges += '<path d="M' + cx.toFixed(1) + ',' + cy.toFixed(1)
        + ' Q' + ((cx+px)/2).toFixed(1) + ',' + ((cy+py)/2).toFixed(1)
        + ' ' + px.toFixed(1) + ',' + py.toFixed(1)
        + '" fill="none" stroke="' + col + '" stroke-width="1.5" opacity="0.28"/>';

      // filter tasks
      var phaseTasks = tasks.filter(function (tk) {
        if (tk.phase_id !== ph.id) return false;
        var prio = tk.priority || 'normal';
        var st   = (tk.done || tk.status === 'done') ? 'done' : (tk.status || 'todo');
        return !mmHidePrio.has(prio) && !mmHideStatus.has(st);
      });

      var spread = Math.min(Math.PI * 0.55, Math.max(0, phaseTasks.length - 1) * 0.28);

      phaseTasks.forEach(function (tk, j) {
        var tAngle = phaseTasks.length < 2 ? angle
          : angle - spread / 2 + (spread * j / (phaseTasks.length - 1));
        var tx = px + taskR * Math.cos(tAngle);
        var ty = py + taskR * Math.sin(tAngle);
        var tc   = (tk.done || tk.status === 'done') ? '#30d158'
                 : tk.status === 'in_progress'       ? '#ff9f0a' : '#636366';
        var prio = tk.priority || 'normal';
        var dotR = prio === 'high' ? 10 : prio === 'low' ? 6 : 8;
        var dotExtra = prio === 'high'
          ? ' stroke="#ff453a" stroke-width="2.5" opacity="0.95"'
          : prio === 'low' ? ' opacity="0.45"' : ' opacity="0.88"';

        // phase → task edge
        edges += '<line x1="' + px.toFixed(1) + '" y1="' + py.toFixed(1)
          + '" x2="' + tx.toFixed(1) + '" y2="' + ty.toFixed(1)
          + '" stroke="' + tc + '" stroke-width="1" opacity="0.28"/>';

        // label: positioned outward along task angle
        var lDist = dotR + 9;
        var lx = tx + lDist * Math.cos(tAngle);
        var ly = ty + lDist * Math.sin(tAngle);
        var anch = Math.cos(tAngle) > 0.15 ? 'start' : (Math.cos(tAngle) < -0.15 ? 'end' : 'middle');
        var tkName = esc(trunc(tk.title || '', 17));
        var halosw = 'paint-order="stroke" stroke="var(--card-bg)" stroke-width="3" stroke-linejoin="round"';

        nodes += '<g onclick="editTask(\'' + tk.id + '\')" style="cursor:pointer;">'
          + '<circle cx="' + tx.toFixed(1) + '" cy="' + ty.toFixed(1) + '" r="' + dotR + '" fill="' + tc + '"' + dotExtra + '/>'
          + '<title>' + esc(tk.title || '') + '</title>'
          + '<text x="' + lx.toFixed(1) + '" y="' + (ly + 3).toFixed(1) + '" text-anchor="' + anch + '" font-size="8.5" fill="var(--text-secondary)" ' + halosw + '>' + tkName + '</text>'
          + '</g>';
      });

      // phase node (on top of task edges)
      var phName = esc(trunc(ph.name || 'Phase', 13));
      nodes += '<g onclick="switchTab(\'phases\')" style="cursor:pointer;">'
        + '<circle cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r="28" fill="' + col + '1a" stroke="' + col + '" stroke-width="1.5"/>'
        + '<text x="' + px.toFixed(1) + '" y="' + (py + 4).toFixed(1) + '" text-anchor="middle" font-size="9.5" font-weight="600" fill="' + col + '" paint-order="stroke" stroke="var(--card-bg)" stroke-width="2" stroke-linejoin="round">' + phName + '</text>'
        + '<title>' + esc(ph.name || 'Phase') + '</title>'
        + '</g>';
    });

    // center node
    var ptShort = esc(trunc(title, 13));
    var center = '<g>'
      + '<circle cx="' + cx + '" cy="' + cy + '" r="40" fill="var(--frost)" stroke="var(--mist)" stroke-width="1.5"/>'
      + '<text x="' + cx + '" y="' + (cy - 6) + '" text-anchor="middle" font-size="8" fill="var(--text-secondary)" font-weight="600" letter-spacing="0.1em">PROJECT</text>'
      + '<text x="' + cx + '" y="' + (cy + 9) + '" text-anchor="middle" font-size="10.5" fill="var(--text-primary)" font-weight="700">' + ptShort + '</text>'
      + '</g>';

    // legend
    var ly2 = H - 22;
    var legend = '<g opacity="0.6">'
      + '<circle cx="14" cy="' + ly2 + '" r="5" fill="#30d158"/><text x="24" y="' + (ly2+4) + '" font-size="9" fill="var(--text-secondary)">Done</text>'
      + '<circle cx="64" cy="' + ly2 + '" r="5" fill="#0a84ff"/><text x="74" y="' + (ly2+4) + '" font-size="9" fill="var(--text-secondary)">Active</text>'
      + '<circle cx="118" cy="' + ly2 + '" r="5" fill="#ff9f0a"/><text x="128" y="' + (ly2+4) + '" font-size="9" fill="var(--text-secondary)">In Progress</text>'
      + '<circle cx="198" cy="' + ly2 + '" r="5" fill="#636366"/><text x="208" y="' + (ly2+4) + '" font-size="9" fill="var(--text-secondary)">Planned</text>'
      + '</g>';

    container.innerHTML = '<svg id="mindmapSvg" width="' + W + '" height="' + H
      + '" style="display:block;font-family:inherit;cursor:grab;user-select:none;-webkit-user-select:none;touch-action:none;">'
      + '<g id="mmCanvas">' + edges + nodes + center + legend + '</g>'
      + '</svg>';

    applyT();
  };

  /* pan & zoom — attached once to the wrap container so they survive re-renders */
  function attachMMEvents() {
    var wrap = document.getElementById('mindmapWrap');
    if (!wrap) return;

    wrap.addEventListener('wheel', function (e) {
      e.preventDefault();
      var rect = wrap.getBoundingClientRect();
      var mouseX = e.clientX - rect.left;
      var mouseY = e.clientY - rect.top;
      var worldX = (mouseX - mmTransform.x) / mmTransform.scale;
      var worldY = (mouseY - mmTransform.y) / mmTransform.scale;
      var step = e.deltaY > 0 ? -0.07 : 0.07;
      var newScale = Math.min(Math.max(mmTransform.scale + step, 0.2), 4);
      mmTransform.scale = newScale;
      mmTransform.x = mouseX - worldX * newScale;
      mmTransform.y = mouseY - worldY * newScale;
      applyT();
    }, { passive: false });

    wrap.addEventListener('pointerdown', function (e) {
      if (e.target.closest('[onclick]')) return;
      e.preventDefault();
      pointers.set(e.pointerId, e);
      wrap.setPointerCapture(e.pointerId);

      if (pointers.size === 1) {
        mmDrag = { sx: e.clientX - mmTransform.x, sy: e.clientY - mmTransform.y };
        var svg = document.getElementById('mindmapSvg');
        if (svg) svg.style.cursor = 'grabbing';
      } else if (pointers.size === 2) {
        mmDrag = null; // stop panning
        var pts = Array.from(pointers.values());
        initialDist = getDist(pts[0], pts[1]);
        initialScale = mmTransform.scale;
      }
    });

    wrap.addEventListener('pointermove', function (e) {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, e);

      if (pointers.size === 1 && mmDrag) {
        mmTransform.x = e.clientX - mmDrag.sx;
        mmTransform.y = e.clientY - mmDrag.sy;
        applyT();
      } else if (pointers.size === 2) {
        var pts = Array.from(pointers.values());
        var dist = getDist(pts[0], pts[1]);
        if (initialDist > 0) {
          var scaleFactor = dist / initialDist;
          var newScale = Math.min(Math.max(initialScale * scaleFactor, 0.2), 4);
          
          // zoom relative to midpoint
          var mid = getMid(pts[0], pts[1]);
          var rect = wrap.getBoundingClientRect();
          var midX = mid.x - rect.left;
          var midY = mid.y - rect.top;
          
          var worldX = (midX - mmTransform.x) / mmTransform.scale;
          var worldY = (midY - mmTransform.y) / mmTransform.scale;
          
          mmTransform.scale = newScale;
          mmTransform.x = midX - worldX * newScale;
          mmTransform.y = midY - worldY * newScale;
          applyT();
        }
      }
    });

    wrap.addEventListener('pointerup', function (e) {
      pointers.delete(e.pointerId);
      if (pointers.size < 2) {
        initialDist = 0;
      }
      if (pointers.size === 0) {
        mmDrag = null;
        var svg = document.getElementById('mindmapSvg');
        if (svg) svg.style.cursor = 'grab';
      }
    });
    wrap.addEventListener('pointercancel', function (e) {
      pointers.delete(e.pointerId);
      mmDrag = null;
    });

    mmEventsOn = true;
  }
})();
