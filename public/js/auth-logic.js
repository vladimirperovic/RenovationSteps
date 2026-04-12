/**
 * auth-logic.js
 * Handles authentication state synchronization across the platform.
 */

function syncAuthUI() {
  const logged = localStorage.getItem('clientLoggedIn') === 'true';
  // Target only navbar Sign Up buttons and hero "Start" buttons
  const btns = document.querySelectorAll('nav [data-i18n="btn_signup"], .hero-auth-btn');
  
  btns.forEach(btn => {
    if (logged) {
      const userName = localStorage.getItem('userName');
      if (btn.hasAttribute('data-i18n') && btn.getAttribute('data-i18n') === 'btn_signup') {
        btn.innerHTML = userName || 'Planner'; 
      }
      btn.classList.add('heroSecondary');
      btn.style.minWidth = '120px';
      btn.onclick = (e) => {
        e.preventDefault();
        window.location.href = 'planner.html';
      };
    } else {
      btn.onclick = (e) => {
        e.preventDefault();
        if (typeof openAuthOverlay === 'function') openAuthOverlay();
        else window.location.href = 'index.html?auth=open';
      };
    }
  });
}


document.addEventListener('DOMContentLoaded', syncAuthUI);
