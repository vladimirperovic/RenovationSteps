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
  
  const elTotal = document.getElementById('matTotalCost');
  if (elTotal) elTotal.textContent = fmt(total);
  
  const elOrdered = document.getElementById('matOrdered');
  if (elOrdered) elOrdered.textContent = materials.filter(m => m.status==='ordered').length;
  
  const elDelivered = document.getElementById('matDelivered');
  if (elDelivered) elDelivered.textContent = materials.filter(m => m.status==='delivered').length;
  
  const elNeeded = document.getElementById('matNeeded');
  if (elNeeded) elNeeded.textContent = materials.filter(m => m.status==='needed').length;

  const phaseSelect = document.getElementById('materialPhase');
  if (phaseSelect) {
    phaseSelect.innerHTML = `<option value="">—</option>` + 
      appData.phases.map(ph => `<option value="${ph.id}">${esc(phaseTitle(ph))}</option>`).join('');
  }

  const filtered = matFilter === 'all' ? materials : materials.filter(m => m.status === matFilter);
  const listEl = document.getElementById('materialsList');
  if (!listEl) return;

  if (!filtered.length) {
    listEl.innerHTML = `<tr><td colspan="9" style="padding:5rem 2rem; text-align:center; color:var(--text-secondary); font-family:'Plus Jakarta Sans',sans-serif; opacity:0.6;">${t('mat_no_results')}</td></tr>`;
    return;
  }

  const statusLabel = {needed: t('mat_status_needed'), ordered: t('mat_status_ordered'), delivered: t('mat_status_delivered'), installed: t('mat_status_installed')};

  listEl.innerHTML = filtered.map(m => {
    const ph = appData.phases.find(x => x.id === m.phase_id);
    const totalCost = Number(m.quantity||0) * Number(m.price||0);
    const statusColor = MAT_STATUS_COLORS[m.status] || 'var(--text-secondary)';

    return `
      <tr style="border-bottom: 1px solid var(--mist); transition: background 0.2s; position: relative;" onmouseover="this.style.background='rgba(255,255,255,0.02)'" onmouseout="this.style.background='transparent'">
        <td style="padding: 1.5rem 1rem;">
          <div style="font-family: 'Oswald', sans-serif; font-size: 1.1rem; font-weight: 700; color: var(--text-primary); text-transform: uppercase; letter-spacing: -0.01em; margin-bottom: 0.25rem;">${esc(m.name)}</div>
          <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-secondary); opacity: 0.6;">REF: ${m.id.substring(0,6)}</div>
        </td>
        <td style="padding: 1.5rem 1rem;">
          ${ph ? `
            <div style="display:inline-flex; align-items:center; gap:0.5rem; padding:0.35rem 0.75rem; border-radius:6px; background:var(--frost); border:1px solid var(--mist); font-family:'Plus Jakarta Sans',sans-serif; font-size:0.7rem; font-weight:700; color:var(--text-primary); cursor:pointer;" onclick="editPhase('${ph.id}')">
              <span style="width:6px; height:6px; border-radius:50%; background:var(--accent-main);"></span>
              ${esc(phaseTitle(ph))}
            </div>
          ` : '<span style="color:var(--text-secondary); opacity:0.3;">—</span>'}
        </td>
        <td style="padding: 1.5rem 1rem; text-align: right; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: var(--text-primary); font-weight: 600;">
          ${m.quantity} <span style="font-size: 0.65rem; opacity: 0.5;">${esc(m.unit||'kom')}</span>
        </td>
        <td style="padding: 1.5rem 1rem; text-align: right; font-family: 'Oswald', sans-serif; font-size: 1rem; color: var(--text-primary);">
          ${fmt(m.price)}
        </td>
        <td style="padding: 1.5rem 1rem; text-align: right; font-family: 'Oswald', sans-serif; font-size: 1.25rem; font-weight: 700; color: var(--accent-main);">
          ${fmt(totalCost)}
        </td>
        <td style="padding: 1.5rem 1rem; text-align: center;">
          <select onchange="changeMaterialStatus('${esc(m.id)}',this.value)" style="font-family:'Plus Jakarta Sans',sans-serif; font-size:0.6rem; font-weight:800; text-transform:uppercase; border:1.5px solid ${statusColor}44; border-radius:8px; padding:6px 12px; color:${statusColor}; background:${statusColor}10; cursor:pointer; outline:none; letter-spacing:0.05em;">
            ${['needed','ordered','delivered','installed'].map(s => `<option value="${s}" ${m.status===s?'selected':''}>${(statusLabel[s]||s).toUpperCase()}</option>`).join('')}
          </select>
        </td>
        <td style="padding: 1.5rem 1rem; text-align: right;">
          <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
            <button class="bl-icon-btn" onclick="editMaterial('${esc(m.id)}')" style="width:32px; height:32px; border-radius:50%; background:var(--frost); border:1px solid var(--mist); color:var(--text-secondary);"><i data-lucide="edit-3" style="width:14px; height:14px;"></i></button>
            <button class="bl-icon-btn bl-icon-btn-danger" onclick="deleteMaterial('${esc(m.id)}')" style="width:32px; height:32px; border-radius:50%; background:rgba(239,68,68,0.05); border:1px solid rgba(239,68,68,0.2); color:#ef4444;"><i data-lucide="trash-2" style="width:14px; height:14px;"></i></button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
  if (window.lucide) lucide.createIcons();
}

function openAddMaterialModal() {
  document.getElementById('materialId').value = '';
  const titleEl = document.getElementById('materialModalTitle');
  if (titleEl) titleEl.textContent = t('add_material_title');
  document.getElementById('materialForm').reset();
  document.getElementById('materialUnit').value = 'kom';
  document.getElementById('materialStatus').value = 'needed';
  document.getElementById('materialPhase').innerHTML = `<option value="">—</option>` + appData.phases.map(ph => `<option value="${ph.id}">${esc(phaseTitle(ph))}</option>`).join('');
  openModal('materialModal');
}
document.getElementById('addMaterialBtn')?.addEventListener('click', openAddMaterialModal);

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
