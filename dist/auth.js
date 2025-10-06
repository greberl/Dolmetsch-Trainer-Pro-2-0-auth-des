// Simple Authorization System for Dolmetsch-Trainer Pro 2.0
// This file provides client-side access control

const AUTH_CONFIG = {
  STORAGE_KEY: 'dolmetsch_trainer_auth',
  EXPIRY_KEY: 'dolmetsch_trainer_auth_expiry',
  VALIDITY_DAYS: 30,
  // Base64 encoded tokens for security through obscurity
  TOKENS: [
    'SUZBMjUyNg==', // IFA2526
    'RkFDSEFLQURFTUlFMjAyNA==', // FACHAKADEMIE2024
    'RE9MTUVUU0NIVFJBSU5FUg==', // DOLMETSCHTRAINER
    'U1BFQ0lBTEFDQ0VTUzIwMjQ=', // SPECIALACCESS2024
    'UFJFTUZVTUFDR0VTUw==', // PREMIUMACCESS
  ]
};

class AuthSystem {
  constructor() {
    this.isAuthenticated = false;
    this.init();
  }

  init() {
    // Check if already authenticated
    if (this.checkExistingAuth()) {
      this.isAuthenticated = true;
      return;
    }
    
    // Show auth screen if not authenticated
    this.showAuthScreen();
  }

  checkExistingAuth() {
    const storedAuth = localStorage.getItem(AUTH_CONFIG.STORAGE_KEY);
    const storedExpiry = localStorage.getItem(AUTH_CONFIG.EXPIRY_KEY);
    
    if (storedAuth && storedExpiry) {
      const expiryDate = new Date(storedExpiry);
      const now = new Date();
      
      if (now < expiryDate) {
        return true;
      } else {
        // Token expired, clean up
        this.clearAuth();
      }
    }
    
    return false;
  }

  validateToken(token) {
    const validTokens = AUTH_CONFIG.TOKENS.map(t => atob(t));
    const normalizedInput = token.trim().toUpperCase();
    return validTokens.includes(normalizedInput);
  }

  setAuth() {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + AUTH_CONFIG.VALIDITY_DAYS);
    
    localStorage.setItem(AUTH_CONFIG.STORAGE_KEY, 'authenticated');
    localStorage.setItem(AUTH_CONFIG.EXPIRY_KEY, expiryDate.toISOString());
    this.isAuthenticated = true;
  }

  clearAuth() {
    localStorage.removeItem(AUTH_CONFIG.STORAGE_KEY);
    localStorage.removeItem(AUTH_CONFIG.EXPIRY_KEY);
    this.isAuthenticated = false;
  }

  showAuthScreen() {
    // Create auth overlay
    const overlay = document.createElement('div');
    overlay.className = 'auth-overlay';
    overlay.innerHTML = `
      <div class="auth-container">
        <div class="auth-header">
          <h1>Dolmetsch-Trainer Pro 2.0</h1>
          <p>Zugang für autorisierte Nutzer</p>
        </div>
        
        <form class="auth-form" id="authForm">
          <div class="auth-field">
            <label for="accessCode">Zugangscode eingeben:</label>
            <input
              id="accessCode"
              type="text"
              placeholder="Ihr Zugangscode"
              required
            />
          </div>
          
          <div class="auth-error" id="authError" style="display: none;">
            <span class="error-icon">⚠️</span>
            <span id="errorMessage">Ungültiger Zugangscode. Bitte überprüfen Sie Ihre Eingabe.</span>
          </div>
          
          <button type="submit" class="auth-submit" id="authSubmit">
            Zugang gewähren
          </button>
        </form>
        
        <div class="auth-footer">
          <p>
            <strong>Sie haben noch keinen Zugangscode?</strong><br/>
            Bitte kontaktieren Sie <a href="mailto:roland.kleiber@ifa.fau.de">roland.kleiber@ifa.fau.de</a>
          </p>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Add event listeners
    const form = document.getElementById('authForm');
    const input = document.getElementById('accessCode');
    const submitBtn = document.getElementById('authSubmit');
    const errorDiv = document.getElementById('authError');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const token = input.value;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="button-spinner"></span> Überprüfe...';
      errorDiv.style.display = 'none';

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 500));

      if (this.validateToken(token)) {
        this.setAuth();
        overlay.remove();
        this.onAuthSuccess();
      } else {
        errorDiv.style.display = 'flex';
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Zugang gewähren';
      }
    });
  }

  onAuthSuccess() {
    // Add logout button
    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'logout-button';
    logoutBtn.innerHTML = 'Abmelden';
    logoutBtn.title = 'Abmelden';
    logoutBtn.addEventListener('click', () => {
      this.clearAuth();
      location.reload();
    });
    document.body.appendChild(logoutBtn);
  }
}

// Initialize auth system when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new AuthSystem();
  });
} else {
  new AuthSystem();
}
