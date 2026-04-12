// =============================================
// SHARE LINK
// =============================================
function renderShareSection() {
  const token = appData.plan?.share_token;
  const section = document.getElementById('shareTokenSection');
  const revokeBtn = document.getElementById('revokeShareBtn');
  if (token) {
    const url = window.location.origin + '/planner.html?project=' + currentProject + '&token=' + token;
    document.getElementById('shareTokenInput').value = url;
    section.style.display = 'block';
    if (revokeBtn) revokeBtn.style.display = 'inline-flex';
  } else {
    section.style.display = 'none';
    if (revokeBtn) revokeBtn.style.display = 'none';
  }
}

async function generateShareToken() {
  try {
    const res = await api('generate_share_token');
    if (res.ok) { appData.plan.share_token = res.token; renderShareSection(); toast(t('share_generated')); }
  } catch(err) { toast(t('err_generic'), 'err'); }
}

async function revokeShareToken() {
  try {
    await api('revoke_share_token');
    appData.plan.share_token = '';
    renderShareSection();
    toast(t('share_revoked'));
  } catch(err) { toast(t('err_generic'), 'err'); }
}

function copyShareLink() {
  const val = document.getElementById('shareTokenInput').value;
  navigator.clipboard.writeText(val).then(() => toast(t('share_copied')));
}

