/**
 * auth-logic.js
 * Unified authentication system for RenovationSteps.com
 * Injects modern glassmorphism Login/Register UI into any page.
 */

const authStyles = `
  @property --border-angle { syntax: "<angle>"; inherits: true; initial-value: 0deg; }
  @keyframes borderSpin { 0% { --border-angle: 0deg; } 100% { --border-angle: 360deg; } }
  
  .auth-overlay {
    position: fixed; inset: 0; z-index: 100000;
    display: none; align-items: center; justify-content: center;
    background: rgba(0, 0, 0, 0.9); backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  .auth-card {
    background: linear-gradient(180deg, #0a0a0f, #0d0d14);
    border: 1px solid rgba(99, 102, 241, 0.2);
    border-radius: 24px; padding: 2.5rem;
    max-width: 380px; width: 92%;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 100px rgba(99, 102, 241, 0.1);
    position: relative;
    color: #fff;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .auth-card * { box-sizing: border-box; }
  .auth-close {
    position: absolute; top: 1.25rem; right: 1.25rem;
    background: none; border: none; color: rgba(255, 255, 255, 0.4);
    font-size: 1.5rem; cursor: pointer; transition: color 0.2s;
  }
  .auth-close:hover { color: #fff; }
  .auth-input {
    width: 100%; padding: 0.85rem; margin-top: 0.5rem;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px; color: #fff; font-size: 1rem;
    transition: all 0.2s;
  }
  .auth-input:focus {
    border-color: rgba(99, 102, 241, 0.5);
    background: rgba(255, 255, 255, 0.08);
    outline: none;
  }
  .auth-label {
    display: block; font-size: 0.7rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.05em;
    color: rgba(255, 255, 255, 0.5); margin-top: 1rem;
  }
  .auth-btn {
    width: 100%; padding: 1rem; margin-top: 1.5rem;
    border-radius: 12px; border: none;
    background: rgba(255, 255, 255, 0.05); color: #fff;
    font-size: 1rem; font-weight: 700; cursor: pointer;
    position: relative; transition: all 0.3s;
    backdrop-filter: blur(8px);
  }
  .auth-btn::before {
    content: ""; position: absolute; inset: -1px; padding: 1px;
    border-radius: 12px;
    background: conic-gradient(from var(--border-angle), transparent 20%, rgba(255, 255, 255, 0.6) 50%, transparent 80%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    animation: borderSpin 3s linear infinite;
    pointer-events: none;
  }
  .auth-btn:hover { background: rgba(255, 255, 255, 0.1); }
  .auth-link {
    color: #818cf8; text-decoration: none; font-weight: 600;
  }
  .auth-link:hover { text-decoration: underline; }
`;

function injectAuthUI() {
  if (document.getElementById('authOverlay')) return;

  const styleSheet = document.createElement("style");
  styleSheet.innerText = authStyles;
  document.head.appendChild(styleSheet);

  const overlay = document.createElement('div');
  overlay.id = 'authOverlay';
  overlay.className = 'auth-overlay';
  overlay.innerHTML = `
    <div class="auth-card">
      <button class="auth-close" onclick="closeAuthOverlay()">✕</button>
      
      <!-- LOGIN FORM -->
      <div id="loginForm">
        <div style="display:flex; justify-content:center; margin-bottom:1.5rem;">
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="6" style="color:#fff;">
            <rect x="10" y="10" width="80" height="80" rx="20"/>
            <rect x="30" y="30" width="15" height="10" rx="2" fill="currentColor"/>
            <rect x="45" y="45" width="25" height="10" rx="2" fill="currentColor"/>
            <rect x="60" y="60" width="10" height="10" rx="2" fill="currentColor"/>
          </svg>
        </div>
        <h2 style="text-align:center; font-size:1.5rem; margin-bottom:0.5rem;" data-i18n="login_title">Prijava</h2>
        <p style="text-align:center; color:rgba(255,255,255,0.4); font-size:0.9rem; margin-bottom:1.5rem;" data-i18n="login_subtitle">Pristup renoviranju</p>
        
        <label class="auth-label" data-i18n="lbl_email">Email</label>
        <input type="text" id="loginUser" class="auth-input" onkeydown="if(event.key==='Enter') attemptLogin()">
        
        <label class="auth-label" data-i18n="lbl_password">Lozinka</label>
        <input type="password" id="loginPass" class="auth-input" onkeydown="if(event.key==='Enter') attemptLogin()">
        
        <p id="loginError" style="color:#ff4b4b; font-size:0.8rem; display:none; margin-top:1rem; text-align:center;"></p>
        
        <button onclick="attemptLogin()" class="auth-btn" data-i18n="btn_login">Pristupi</button>
        
        <p style="text-align:center; margin-top:1.5rem; font-size:0.85rem; color:rgba(255,255,255,0.5);">
          <a href="#" onclick="showForgotForm(); return false;" class="auth-link" data-i18n="forgot_password">Šifra?</a>
          &nbsp;&bull;&nbsp;
          <span data-i18n="no_account">Nemaš nalog?</span> <a href="#" onclick="showRegister(); return false;" class="auth-link" data-i18n="btn_register">Registruj se</a>
        </p>
      </div>

      <!-- REGISTER FORM -->
      <div id="registerForm" style="display:none;">
        <h2 style="text-align:center; font-size:1.5rem; margin-bottom:0.5rem;" data-i18n="register_title">Novi nalog</h2>
        <p style="text-align:center; color:rgba(255,255,255,0.4); margin-bottom:1.5rem;" data-i18n="register_subtitle">Započni planiranje</p>
        
        <label class="auth-label" data-i18n="lbl_name">Ime</label>
        <input type="text" id="registerName" class="auth-input">
        
        <label class="auth-label" data-i18n="lbl_email">Email</label>
        <input type="email" id="registerEmail" class="auth-input">
        
        <label class="auth-label" data-i18n="lbl_password">Lozinka (min 8)</label>
        <input type="password" id="registerPass" class="auth-input">
        
        <p id="registerError" style="color:#ff4b4b; font-size:0.8rem; display:none; margin-top:1rem; text-align:center;"></p>
        <p id="registerSuccess" style="color:#4ade80; font-size:0.8rem; display:none; margin-top:1rem; text-align:center;"></p>
        
        <button onclick="attemptRegister()" class="auth-btn" data-i18n="btn_signup">Napravi nalog</button>
        
        <p style="text-align:center; margin-top:1.5rem; font-size:0.85rem; color:rgba(255,255,255,0.5);">
          <span data-i18n="has_account">Imaš nalog?</span> <a href="#" onclick="showLogin(); return false;" class="auth-link" data-i18n="btn_login_link">Prijavi se</a>
        </p>
      </div>

      <!-- FORGOT FORM -->
      <div id="forgotForm" style="display:none;">
        <h2 style="text-align:center; font-size:1.5rem; margin-bottom:1.5rem;" data-i18n="forgot_title">Zaboravljena lozinka</h2>
        <label class="auth-label">Email</label>
        <input type="email" id="forgotEmail" class="auth-input">
        <p id="forgotMsg" style="font-size:0.85rem; display:none; margin-top:1rem; text-align:center;"></p>
        <button onclick="submitForgot()" class="auth-btn">Pošalji link</button>
        <p style="text-align:center; margin-top:1.5rem; font-size:0.85rem;">
          <a href="#" onclick="showLogin(); return false;" class="auth-link" data-i18n="back_to_login">← Povratak na login</a>
        </p>
      </div>

      <!-- RESET FORM -->
      <div id="resetForm" style="display:none;">
        <h2 style="text-align:center; font-size:1.5rem; margin-bottom:1.5rem;" data-i18n="reset_title">Nova lozinka</h2>
        <label class="auth-label" data-i18n="lbl_new_password">Nova lozinka (min 8)</label>
        <input type="password" id="resetPass" class="auth-input">
        <p id="resetMsg" style="font-size:0.85rem; display:none; margin-top:1rem; text-align:center;"></p>
        <button onclick="submitReset()" class="auth-btn" data-i18n="btn_save_password">Sačuvaj lozinku</button>
      </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

// UI HELPERS
window.openAuthOverlay = (options = { isClosable: true }) => { 
  injectAuthUI(); 
  const overlay = document.getElementById('authOverlay');
  overlay.style.display = 'flex'; 
  document.body.style.overflow='hidden'; 
  
  const closeBtn = overlay.querySelector('.auth-close');
  if (closeBtn) {
    if (!options.isClosable) closeBtn.remove();
    else closeBtn.style.display = 'block';
  }
  
  // Trigger translation if available
  if (typeof applyI18n === 'function') applyI18n();
  else if (typeof applyLandingI18n === 'function') {
     const lang = localStorage.getItem('landing_lang') || 'en';
     applyLandingI18n(lang);
  }
};
window.closeAuthOverlay = () => { document.getElementById('authOverlay').style.display = 'none'; document.body.style.overflow=''; };
window.showRegister = () => { document.getElementById('loginForm').style.display='none'; document.getElementById('forgotForm').style.display='none'; document.getElementById('registerForm').style.display='block'; };
window.showLogin = () => { document.getElementById('registerForm').style.display='none'; document.getElementById('forgotForm').style.display='none'; document.getElementById('resetForm').style.display='none'; document.getElementById('loginForm').style.display='block'; };
window.showForgotForm = () => { document.getElementById('loginForm').style.display='none'; document.getElementById('registerForm').style.display='none'; document.getElementById('resetForm').style.display='none'; document.getElementById('forgotForm').style.display='block'; };
window.showResetForm = () => { document.getElementById('loginForm').style.display='none'; document.getElementById('registerForm').style.display='none'; document.getElementById('forgotForm').style.display='none'; document.getElementById('resetForm').style.display='block'; };

// CORE LOGIC
window.attemptLogin = () => {
  const u = document.getElementById('loginUser').value.trim();
  const p = document.getElementById('loginPass').value.trim();
  if(!u || !p) return;
  
  const err = document.getElementById('loginError');
  err.style.display = 'none';

  fetch('/api/auth/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email: u, password: p})
  })
  .then(r => r.json())
  .then(d => {
    if(d.ok) {
      localStorage.setItem('clientLoggedIn', 'true');
      localStorage.setItem('userEmail', u);
      localStorage.setItem('userToken', d.token);
      localStorage.setItem('userId', d.user?.id || '');
      localStorage.setItem('userName', d.user?.name || '');
      window.location.href = 'index.html';
    } else {
      err.textContent = d.error || 'Pogrešni podaci.';
      err.style.display = 'block';
    }
  }).catch(() => { err.textContent = 'Greška.'; err.style.display='block'; });
};

window.attemptRegister = () => {
  const n = document.getElementById('registerName').value.trim();
  const e = document.getElementById('registerEmail').value.trim();
  const p = document.getElementById('registerPass').value.trim();
  if(!n || !e || !p) return;

  fetch('/api/auth/signup', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: n, email:e, password: p})
  }).then(r => r.json()).then(d => {
    if(d.ok) {
      document.getElementById('registerSuccess').style.display = 'block';
      document.getElementById('registerError').style.display = 'none';
    } else {
      document.getElementById('registerError').textContent = d.error || 'Greška.';
      document.getElementById('registerError').style.display = 'block';
    }
  });
};

window.submitForgot = () => {
  const email = document.getElementById('forgotEmail').value.trim();
  const msg = document.getElementById('forgotMsg');
  fetch('/api/auth/forgot', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email})
  }).then(r => r.json()).then(d => {
    msg.style.display = 'block';
    msg.textContent = d.ok ? 'Link poslat!' : (d.error || 'Greška.');
  });
};

window.submitReset = () => {
  const token = new URLSearchParams(window.location.search).get('reset');
  const pass  = document.getElementById('resetPass').value.trim();
  const msg   = document.getElementById('resetMsg');
  if (!pass || pass.length < 8) {
    if (msg) {
      msg.style.display = 'block'; msg.style.color = '#ff4b4b';
      msg.textContent = 'Password must be at least 8 characters.';
    }
    return;
  }
  fetch('/api/auth/reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password: pass })
  }).then(r => r.json()).then(d => {
    if (d.ok) {
      if (msg) {
        msg.style.display = 'block'; msg.style.color = '#4ade80';
        msg.textContent = 'Password updated! You can now log in.';
      }
      setTimeout(() => {
        window.history.replaceState({}, '', window.location.pathname);
        showLogin();
      }, 2000);
    } else {
      if (msg) {
        msg.style.display = 'block'; msg.style.color = '#ff4b4b';
        msg.textContent = d.error || 'Something went wrong.';
      }
    }
  });
};

window.attemptLogout = () => {
  localStorage.removeItem('clientLoggedIn');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userToken');
  localStorage.removeItem('userName');
  localStorage.removeItem('userId');
  window.location.href = 'index.html';
};

function syncAuthUI() {
  const logged = localStorage.getItem('clientLoggedIn') === 'true';
  const btns = document.querySelectorAll('nav [data-i18n="btn_signup"], nav [data-i18n="btn_login"], [data-i18n="hero_btn_start"], [data-i18n="pricing_btn_free"], [data-i18n="btn_start"], .hero-auth-btn, .hero-main-btn');
  
  btns.forEach(btn => {
    // Remove the hardcoded onclick attribute from HTML to prevent flickers
    btn.removeAttribute('onclick');
    
    if (logged) {
      if (btn.tagName === 'A') {
        btn.href = 'index.html';
      }
      
      // Override any existing logic with a direct redirect
      btn.onclick = (e) => {
          if (e) e.preventDefault();
          window.location.href = 'index.html';
      };
      
      const label = 'PLANNER';
      
      // Update text while preserving icons
      const span = btn.querySelector('span');
      if (span) {
         span.innerText = label;
      } else if (btn.hasAttribute('data-i18n') && (btn.getAttribute('data-i18n') === 'btn_signup' || btn.getAttribute('data-i18n') === 'btn_login')) {
         btn.innerText = label;
      }
    } else {
      btn.onclick = (e) => { 
        if (e) e.preventDefault(); 
        openAuthOverlay(); 
      };
    }
  });

  // Handle Planner.html Sidebar specifically
  const sidebarUser = document.querySelector('.bl-user-info');
  const logoutBtn = document.querySelector('.bl-logout-btn');
  if (sidebarUser && logoutBtn) {
    if (logged) {
      sidebarUser.style.display = 'flex';
      logoutBtn.style.display = 'flex';
      const nameEl = document.getElementById('blUserName');
      if (nameEl) nameEl.innerText = localStorage.getItem('userName') || 'Client';
    } else {
      // If on index.html and not logged in, we might want a simple "Login" 
      // instead of the user profile area
      sidebarUser.style.display = 'none';
      logoutBtn.innerText = 'LOGIN';
      logoutBtn.removeAttribute('data-i18n');
      logoutBtn.onclick = (e) => { e.preventDefault(); openAuthOverlay(); };
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  injectAuthUI(); 
  syncAuthUI();
  // Check if forced open via URL
  if(new URLSearchParams(window.location.search).get('auth') === 'open') openAuthOverlay();
});
