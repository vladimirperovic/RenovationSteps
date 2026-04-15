// =============================================
// PAYMENT MILESTONES
// =============================================

function renderPayments() {
  const payments = appData.payments || [];
  const total = payments.reduce((s,p) => s + Number(p.amount||0), 0);
  const paid  = payments.filter(p => p.paid).reduce((s,p) => s + Number(p.amount||0), 0);
  
  const elTotal = document.getElementById('pmTotal');
  const elPaid = document.getElementById('pmPaid');
  const elPending = document.getElementById('pmPending');
  
  if (elTotal) elTotal.textContent = fmt(total);
  if (elPaid) elPaid.textContent = fmt(paid);
  if (elPending) elPending.textContent = fmt(total - paid);

  // Per-worker owed
  const workerDebt = {};
  payments.filter(p => !p.paid && p.worker_id).forEach(p => {
    workerDebt[p.worker_id] = (workerDebt[p.worker_id] || 0) + Number(p.amount||0);
  });
  
  const wmEl = document.getElementById('pmWorkerList');
  if (wmEl) {
      const debtEntries = Object.entries(workerDebt);
      if (!debtEntries.length) {
        wmEl.innerHTML = `<p style="color:var(--graphite);font-size:0.875rem;">${t('no_payments')}</p>`;
      } else {
        wmEl.innerHTML = debtEntries.map(([wid, amt]) => {
          const wk = appData.workers.find(w => w.id === wid);
          return `<div style="display:flex;justify-content:space-between;align-items:center;padding:0.75rem 0;border-bottom:1px solid var(--mist);">
            <div style="font-weight:600;font-size:0.875rem;">${esc(wk?.name || wid)}</div>
            <div style="font-weight:700;color:#ef4444;font-family:'JetBrains Mono',monospace;">${fmt(amt)}</div>
          </div>`;
        }).join('');
      }
  }

  // Payment list
  const el = document.getElementById('paymentsList');
  if (el) {
      if (!payments.length) {
        el.innerHTML = `<p style="color:var(--graphite);font-size:0.875rem;">${t('no_payments')}</p>`;
        return;
      }
      el.innerHTML = [...payments].reverse().map(p => {
        const ph = appData.phases.find(x => x.id === p.phase_id);
        const wk = appData.workers.find(x => x.id === p.worker_id);
        const overdue = !p.paid && p.due_date && p.due_date < new Date().toISOString().slice(0,10);
        return `<div style="display:flex;align-items:center;gap:1.25rem;padding:1rem 0.5rem;border-bottom:1px solid var(--mist);transition:background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.02)'" onmouseout="this.style.background='transparent'">
          <label style="cursor:pointer;display:flex;align-items:center;gap:0.5rem;">
            <input type="checkbox" ${p.paid?'checked':''} onchange="togglePayment('${esc(p.id)}',this.checked)" style="width:1rem;height:1rem;accent-color:var(--ink);">
          </label>
          <div style="flex:1;">
            <div style="font-weight:600;font-size:0.875rem;${p.paid?'text-decoration:line-through;color:var(--silver);':''}">${esc(p.desc)}</div>
            <div style="font-size:0.7rem;color:var(--graphite);margin-top:0.2rem;">
              ${ph ? `<span style="margin-right:0.5rem;">📋 ${esc(phaseTitle(ph))}</span>` : ''}
              ${wk ? `<span style="margin-right:0.5rem;">👷 ${esc(wk.name)}</span>` : ''}
              ${p.due_date ? `<span style="color:${overdue?'#ef4444':'var(--graphite)'};">${overdue?'⚠️ ':''} ${p.due_date}</span>` : ''}
              ${p.paid && p.paid_date ? `<span style="color:#22c55e;margin-left:0.5rem;">✓ ${p.paid_date}</span>` : ''}
            </div>
          </div>
          <div style="font-weight:700;font-family:'JetBrains Mono',monospace;font-size:0.875rem;color:${p.paid?'#22c55e':'var(--ink)'};">${fmt(p.amount)}</div>
          <div style="display:flex;gap:0.25rem;">
            <button class="bl-icon-btn" onclick="editPayment('${esc(p.id)}')">✎</button>
            <button class="bl-icon-btn bl-icon-btn-danger" onclick="deletePayment('${esc(p.id)}')">×</button>
          </div>
        </div>`;
      }).join('');
  }
  if (window.lucide) lucide.createIcons();
}

// Add safely
function openAddPaymentModal() {
  document.getElementById('paymentId').value = '';
  document.getElementById('paymentModalTitle').textContent = t('add_payment_title');
  document.getElementById('paymentForm').reset();
  document.getElementById('paymentPhase').innerHTML = `<option value="">—</option>` + appData.phases.map(ph => `<option value="${ph.id}">${esc(phaseTitle(ph))}</option>`).join('');
  document.getElementById('paymentWorker').innerHTML = `<option value="">—</option>` + appData.workers.map(w => `<option value="${w.id}">${esc(w.name)}</option>`).join('');
  openModal('paymentModal');
}
const addPaymentBtn = document.getElementById('addPaymentBtn');
if (addPaymentBtn) {
    addPaymentBtn.addEventListener('click', openAddPaymentModal);
}

const paymentForm = document.getElementById('paymentForm');
if (paymentForm) {
    paymentForm.addEventListener('submit', async e => {
      e.preventDefault();
      const id = document.getElementById('paymentId').value;
      const body = {
        desc: document.getElementById('paymentDesc').value,
        amount: document.getElementById('paymentAmount').value,
        due_date: document.getElementById('paymentDue').value,
        phase_id: document.getElementById('paymentPhase').value,
        worker_id: document.getElementById('paymentWorker').value,
      };
      try {
        if (id) { body.id = id; await api('update_payment', body); } else { await api('add_payment', body); }
        closeModal('paymentModal'); await init();
        toast(id ? t('toast_payment_updated') : t('toast_payment_added'));
      } catch(err) { console.error(err); toast(t('err_generic'), 'err'); }
    });
}

function editPayment(id) {
  const p = appData.payments?.find(x => x.id == id); if (!p) return;
  const pmId = document.getElementById('paymentId');
  const pmDesc = document.getElementById('paymentDesc');
  const pmAmt = document.getElementById('paymentAmount');
  const pmDue = document.getElementById('paymentDue');
  const pmPh = document.getElementById('paymentPhase');
  const pmWk = document.getElementById('paymentWorker');
  const pmTitle = document.getElementById('paymentModalTitle');
  
  if (pmId) pmId.value = p.id;
  if (pmDesc) pmDesc.value = p.desc || '';
  if (pmAmt) pmAmt.value = p.amount || 0;
  if (pmDue) pmDue.value = p.due_date || '';
  if (pmPh) pmPh.innerHTML = `<option value="">—</option>` + appData.phases.map(ph => `<option value="${ph.id}" ${ph.id===p.phase_id?'selected':''}>${esc(phaseTitle(ph))}</option>`).join('');
  if (pmWk) pmWk.innerHTML = `<option value="">—</option>` + appData.workers.map(w => `<option value="${w.id}" ${w.id===p.worker_id?'selected':''}>${esc(w.name)}</option>`).join('');
  if (pmTitle) pmTitle.textContent = t('edit_payment_title');
  openModal('paymentModal');
}

async function togglePayment(id, paid) {
  await api('update_payment', { id, paid: paid ? '1' : '0' });
  const p = appData.payments?.find(x => x.id === id);
  if (p) { p.paid = paid; p.paid_date = paid ? new Date().toISOString().slice(0,10) : ''; }
  renderPayments();
}

async function deletePayment(id) {
  if (!confirm(t('confirm_delete_payment'))) return;
  await api('delete_payment', {id}); await init();
  toast(t('toast_payment_deleted'), 'err');
}
