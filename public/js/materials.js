// =============================================
// MATERIALS / SHOPPING LIST
// =============================================
const MAT_STATUS_COLORS = { needed:'#ff9f0a', ordered:'#0a84ff', delivered:'#22c55e', installed:'#8e8e93' };
let matFilter = 'all';

function filterMaterials(filter) {
  matFilter = filter;
  document.querySelectorAll('.mat-filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === filter));
  renderMaterials();
}

function renderMaterials() {
  const materials = appData.materials || [];
  const total = materials.reduce((s,m) => s + (Number(m.quantity||0) * Number(m.price||0)), 0);
  document.getElementById('matTotalCost').textContent = fmt(total);
  document.getElementById('matOrdered').textContent   = materials.filter(m => m.status==='ordered').length;
  document.getElementById('matDelivered').textContent = materials.filter(m => m.status==='delivered').length;
  document.getElementById('matNeeded').textContent    = materials.filter(m => m.status==='needed').length;

  const phaseSelect = document.getElementById('materialPhase');
  if (phaseSelect) phaseSelect.innerHTML = `<option value="">—</option>` + appData.phases.map(ph => `<option value="${ph.id}">${esc(phaseTitle(ph))}</option>`).join('');

  const filtered = matFilter === 'all' ? materials : materials.filter(m => m.status === matFilter);
  const tbody = document.getElementById('materialsList');
  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="9" style="padding:3rem 2rem;text-align:center;color:var(--text-secondary); opacity:0.6;">${t('mat_no_results')}</td></tr>`;
    return;
  }
  const statusLabel = {needed: t('mat_status_needed'), ordered: t('mat_status_ordered'), delivered: t('mat_status_delivered'), installed: t('mat_status_installed')};
  tbody.innerHTML = filtered.map(m => {
    const ph = appData.phases.find(x => x.id === m.phase_id);
    const totalCost = Number(m.quantity||0) * Number(m.price||0);
    const statusColor = MAT_STATUS_COLORS[m.status] || 'var(--text-secondary)';
    let rowStyle = `border-bottom:1px solid rgba(255,255,255,0.08); font-size:0.875rem; color:var(--text-primary); transition: background 0.2s;`;
    if (m.status === 'installed') rowStyle += ` background: rgba(34, 197, 94, 0.1);`;
    else if (m.status === 'delivered') rowStyle += ` background: rgba(10, 132, 255, 0.1);`;
    else if (m.status === 'ordered') rowStyle += ` background: rgba(255, 255, 255, 0.08);`;

    return `<tr style="${rowStyle}">
      <td style="padding:1rem; font-weight:700;">${esc(m.name)}</td>
      <td style="padding:1rem; color:var(--text-secondary); font-size:0.75rem;">${ph ? `<span onclick="editPhase('${ph.id}')" style="cursor:pointer; text-decoration:none; border-bottom:1px solid var(--mist);" onmouseover="this.style.color='var(--accent-main)';this.style.borderColor='var(--accent-main)'" onmouseout="this.style.color='var(--text-secondary)';this.style.borderColor='var(--mist)'">${esc(phaseTitle(ph))}</span>` : '—'}</td>
      <td style="padding:1rem 0.5rem; text-align:right; font-family:'JetBrains Mono', monospace;">${m.quantity} ${esc(m.unit||'')}</td>
      <td style="padding:1rem 0.5rem; text-align:right; font-family:'JetBrains Mono', monospace;">${fmt(m.price)}</td>
      <td style="padding:1rem 0.5rem; text-align:right; font-weight:700; font-family:'JetBrains Mono', monospace;">${fmt(totalCost)}</td>
      <td style="padding:1rem 0.5rem; color:var(--text-secondary);">${esc(m.store||'—')}</td>
      <td style="padding:1rem 0.5rem; color:var(--text-secondary); font-family:'JetBrains Mono', monospace; font-size:0.75rem;">${m.order_by_date||'—'}</td>
      <td style="padding:1rem 0.5rem;">
        <select onchange="changeMaterialStatus('${esc(m.id)}',this.value)" style="font-size:0.7rem; border:1px solid ${statusColor}44; border-radius:var(--radius-sm); padding:4px 8px; color:${statusColor}; background:rgba(255,255,255,0.04); cursor:pointer; outline:none; text-transform:uppercase; font-weight:700;">
          ${['needed','ordered','delivered','installed'].map(s => `<option value="${s}" ${m.status===s?'selected':''}>${statusLabel[s]||s}</option>`).join('')}
        </select>
      </td>
      <td style="padding:1rem 0.5rem; text-align:right;">
        <div style="display:flex; gap:8px; justify-content:flex-end;">
          <button onclick="editMaterial('${esc(m.id)}')" class="bl-edit-btn" style="opacity:0.6;"><i data-lucide="edit-2" style="width:14px;height:14px;"></i></button>
          <button onclick="deleteMaterial('${esc(m.id)}')" class="bl-edit-btn" style="opacity:0.6; color:#ff3b30;"><i data-lucide="trash-2" style="width:14px;height:14px;"></i></button>
        </div>
      </td>
    </tr>`;
  }).join('');
  if (window.lucide) lucide.createIcons();
}

document.getElementById('addMaterialBtn').addEventListener('click', () => {
  document.getElementById('materialId').value = '';
  document.getElementById('materialModalTitle').textContent = t('add_material_title');
  document.getElementById('materialForm').reset();
  document.getElementById('materialUnit').value = 'kom';
  document.getElementById('materialStatus').value = 'needed';
  document.getElementById('materialPhase').innerHTML = `<option value="">—</option>` + appData.phases.map(ph => `<option value="${ph.id}">${esc(phaseTitle(ph))}</option>`).join('');
  openModal('materialModal');
});

document.getElementById('materialForm').addEventListener('submit', async e => {
  e.preventDefault();
  const id = document.getElementById('materialId').value;
  const body = {
    name: document.getElementById('materialName').value,
    quantity: document.getElementById('materialQty').value,
    unit: document.getElementById('materialUnit').value,
    price: document.getElementById('materialPrice').value,
    store: document.getElementById('materialStore').value,
    order_by_date: document.getElementById('materialOrderBy').value,
    phase_id: document.getElementById('materialPhase').value,
    status: document.getElementById('materialStatus').value,
  };
  try {
    if (id) { body.id = id; await api('update_material', body); } else { await api('add_material', body); }
    closeModal('materialModal'); await init();
    toast(id ? t('toast_material_updated') : t('toast_material_added'));
  } catch(err) { console.error(err); toast(t('err_generic'), 'err'); }
});

function editMaterial(id) {
  const m = appData.materials?.find(x => x.id == id); if (!m) return;
  document.getElementById('materialId').value = m.id;
  document.getElementById('materialName').value = m.name || '';
  document.getElementById('materialQty').value = m.quantity || 1;
  document.getElementById('materialUnit').value = m.unit || 'kom';
  document.getElementById('materialPrice').value = m.price || 0;
  document.getElementById('materialStore').value = m.store || '';
  document.getElementById('materialOrderBy').value = m.order_by_date || '';
  document.getElementById('materialStatus').value = m.status || 'needed';
  document.getElementById('materialPhase').innerHTML = `<option value="">—</option>` + appData.phases.map(ph => `<option value="${ph.id}" ${ph.id===m.phase_id?'selected':''}>${esc(phaseTitle(ph))}</option>`).join('');
  document.getElementById('materialModalTitle').textContent = t('edit_material_title');
  openModal('materialModal');
}

async function changeMaterialStatus(id, status) {
  await api('update_material', { id, status });
  const m = appData.materials?.find(x => x.id === id);
  if (m) m.status = status;
  renderMaterials();
}

async function deleteMaterial(id) {
  if (!confirm(t('confirm_delete_material'))) return;
  await api('delete_material', {id}); await init();
  toast(t('toast_material_deleted'), 'err');
}
