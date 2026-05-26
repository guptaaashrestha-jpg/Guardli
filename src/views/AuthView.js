/* ============================================
   GUARDLI — AUTH VIEW
   Premium split-screen Sign In / Sign Up.
   Firebase Auth + Demo fallback.
   ============================================ */

import { store } from '../store.js';

/* ─── Firebase Config (replace with your keys) ─── */
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID'
};

let firebaseApp = null;
let firebaseAuth = null;
let googleProvider = null;
let firebaseReady = false;

async function initFirebase() {
  if (firebaseConfig.apiKey === 'YOUR_API_KEY') return false;
  try {
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js');
    const { getAuth, GoogleAuthProvider } = await import('https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js');
    firebaseApp = initializeApp(firebaseConfig);
    firebaseAuth = getAuth(firebaseApp);
    googleProvider = new GoogleAuthProvider();
    firebaseReady = true;
    return true;
  } catch (e) {
    console.warn('Firebase init failed, using demo mode:', e);
    return false;
  }
}

/* ─── Style Injection ─── */
const STYLE_ID = 'guardli-auth-styles';

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    /* ═══ KEYFRAMES ═══ */
    @keyframes auth-shimmer {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes auth-shield-pulse {
      0%, 100% { transform: scale(1); filter: drop-shadow(0 0 16px rgba(0,229,160,0.3)); }
      50% { transform: scale(1.06); filter: drop-shadow(0 0 32px rgba(0,229,160,0.55)); }
    }
    @keyframes auth-float {
      0% { transform: translateY(0) translateX(0); opacity: 0; }
      10% { opacity: 0.6; }
      90% { opacity: 0.6; }
      100% { transform: translateY(-100vh) translateX(var(--drift, 20px)); opacity: 0; }
    }
    @keyframes auth-fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes auth-fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes auth-slideRight {
      from { opacity: 0; transform: translateX(40px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes auth-shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-6px); }
      80% { transform: translateX(6px); }
    }
    @keyframes auth-spin {
      to { transform: rotate(360deg); }
    }
    @keyframes auth-successPulse {
      0% { box-shadow: 0 0 0 0 rgba(0,229,160,0.4); }
      70% { box-shadow: 0 0 0 20px rgba(0,229,160,0); }
      100% { box-shadow: 0 0 0 0 rgba(0,229,160,0); }
    }
    @keyframes auth-statCycle {
      0%, 30% { opacity: 1; transform: translateY(0); }
      33% { opacity: 0; transform: translateY(-12px); }
      36%, 63% { opacity: 0; transform: translateY(12px); }
      66%, 96% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-12px); }
    }
    @keyframes auth-barGrow {
      from { width: 0; }
    }

    /* ═══ AUTH LAYOUT ═══ */
    .auth-view {
      display: flex;
      min-height: 100vh;
      width: 100%;
      background: var(--bg-deep);
      color: var(--text-primary);
      font-family: var(--font-body);
      overflow: hidden;
    }

    /* ═══ LEFT PANEL — BRAND ═══ */
    .auth-brand {
      width: 42%;
      min-height: 100vh;
      background: var(--bg-base);
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--space-12) var(--space-8);
      overflow: hidden;
      border-right: 1px solid var(--border-subtle);
    }
    .auth-brand::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at 50% 30%, rgba(0,229,160,0.07) 0%, transparent 60%),
                  radial-gradient(ellipse at 80% 70%, rgba(79,195,247,0.05) 0%, transparent 50%);
      pointer-events: none;
    }
    .auth-brand-content {
      position: relative;
      z-index: 2;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-6);
    }
    .auth-shield-svg {
      width: 80px;
      height: 96px;
      animation: auth-shield-pulse 3s ease-in-out infinite;
    }
    .auth-brand-name {
      font-family: var(--font-display);
      font-size: var(--text-4xl);
      font-weight: var(--weight-bold);
      letter-spacing: var(--tracking-wider);
      background: linear-gradient(135deg, #00E5A0, #4FC3F7);
      background-size: 200% 200%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: auth-shimmer 4s ease infinite;
    }
    .auth-brand-tagline {
      font-size: var(--text-base);
      color: var(--text-muted);
      letter-spacing: var(--tracking-wide);
    }

    /* Stats rotator */
    .auth-stats-rotator {
      height: 32px;
      position: relative;
      overflow: hidden;
      margin-top: var(--space-6);
      width: 100%;
      max-width: 340px;
    }
    .auth-stat-item {
      position: absolute;
      width: 100%;
      text-align: center;
      font-size: var(--text-sm);
      font-weight: var(--weight-medium);
      color: var(--accent-mint);
      opacity: 0;
      transform: translateY(12px);
      transition: all 0.5s var(--ease-out);
    }
    .auth-stat-item.active {
      opacity: 1;
      transform: translateY(0);
    }

    /* Testimonial */
    .auth-testimonial {
      margin-top: var(--space-10);
      max-width: 340px;
      min-height: 80px;
      position: relative;
    }
    .auth-testimonial-item {
      position: absolute;
      inset: 0;
      opacity: 0;
      transition: opacity 0.6s ease;
    }
    .auth-testimonial-item.active {
      opacity: 1;
    }
    .auth-testimonial-quote {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      font-style: italic;
      line-height: var(--leading-relaxed);
      margin-bottom: var(--space-2);
    }
    .auth-testimonial-author {
      font-size: var(--text-xs);
      color: var(--text-muted);
      font-weight: var(--weight-semibold);
    }

    /* Floating particles */
    .auth-particle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: var(--accent-mint);
      border-radius: 50%;
      opacity: 0;
      pointer-events: none;
      animation: auth-float var(--dur, 12s) linear infinite;
      animation-delay: var(--delay, 0s);
    }

    /* ═══ RIGHT PANEL — FORM ═══ */
    .auth-form-panel {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-8);
      position: relative;
      overflow-y: auto;
    }
    .auth-form-panel::before {
      content: '';
      position: absolute;
      top: -30%;
      right: -20%;
      width: 60%;
      height: 60%;
      background: radial-gradient(circle, rgba(0,229,160,0.04) 0%, transparent 70%);
      pointer-events: none;
    }

    .auth-card {
      width: 100%;
      max-width: 440px;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-2xl);
      padding: var(--space-10) var(--space-8);
      position: relative;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      animation: auth-slideRight 0.7s var(--ease-out) both;
      animation-delay: 0.2s;
    }
    .auth-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--accent-mint), transparent);
      border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
      opacity: 0.6;
    }

    /* Tab switcher */
    .auth-tabs {
      display: flex;
      gap: 0;
      margin-bottom: var(--space-8);
      position: relative;
      border-bottom: 1px solid var(--border-subtle);
    }
    .auth-tab {
      flex: 1;
      padding: var(--space-3) var(--space-4);
      font-family: var(--font-display);
      font-size: var(--text-sm);
      font-weight: var(--weight-semibold);
      color: var(--text-muted);
      text-align: center;
      cursor: none;
      transition: color var(--duration-normal) ease;
      position: relative;
      background: none;
      border: none;
    }
    .auth-tab.active {
      color: var(--accent-mint);
    }
    .auth-tab-indicator {
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 50%;
      height: 2px;
      background: var(--accent-mint);
      border-radius: var(--radius-full);
      transition: transform var(--duration-normal) var(--ease-spring);
      box-shadow: 0 0 8px rgba(0,229,160,0.4);
    }
    .auth-tab-indicator.signup {
      transform: translateX(100%);
    }

    /* Form body */
    .auth-form-body {
      min-height: 380px;
    }
    .auth-form-content {
      animation: auth-fadeIn 0.3s ease both;
    }

    /* Input groups */
    .auth-input-group {
      margin-bottom: var(--space-5);
      position: relative;
    }
    .auth-input-label {
      display: block;
      font-size: 11px;
      color: var(--text-secondary);
      font-weight: var(--weight-semibold);
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: var(--space-2);
    }
    .auth-input-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }
    .auth-input-icon {
      position: absolute;
      left: var(--space-4);
      color: var(--text-muted);
      font-size: 16px;
      pointer-events: none;
      transition: color var(--duration-fast) ease;
    }
    .auth-input {
      width: 100%;
      padding: var(--space-3) var(--space-4) var(--space-3) 44px;
      background: var(--bg-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      color: var(--text-primary);
      font-family: var(--font-body);
      font-size: var(--text-sm);
      outline: none;
      transition: border-color var(--duration-fast) ease, box-shadow var(--duration-fast) ease;
      cursor: none;
    }
    .auth-input::placeholder {
      color: var(--text-muted);
    }
    .auth-input:focus {
      border-color: var(--accent-mint);
      box-shadow: 0 0 0 3px rgba(0,229,160,0.1);
    }
    .auth-input:focus + .auth-input-icon,
    .auth-input:focus ~ .auth-input-icon {
      color: var(--accent-mint);
    }
    .auth-input.error {
      border-color: var(--accent-coral);
      box-shadow: 0 0 0 3px rgba(255,95,109,0.1);
    }
    .auth-eye-toggle {
      position: absolute;
      right: var(--space-3);
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: none;
      padding: var(--space-1);
      font-size: 16px;
      transition: color var(--duration-fast) ease;
    }
    .auth-eye-toggle:hover {
      color: var(--text-primary);
    }
    .auth-input-error {
      font-size: 11px;
      color: var(--accent-coral);
      margin-top: var(--space-1);
      display: none;
      animation: auth-fadeUp 0.2s ease;
    }
    .auth-input-error.visible {
      display: block;
    }

    /* Phone prefix */
    .auth-phone-wrap {
      display: flex;
      gap: var(--space-2);
    }
    .auth-phone-prefix {
      padding: var(--space-3) var(--space-3);
      background: var(--bg-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      color: var(--text-secondary);
      font-size: var(--text-sm);
      font-weight: var(--weight-semibold);
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: var(--space-1);
    }
    .auth-phone-input {
      flex: 1;
      padding: var(--space-3) var(--space-4);
      background: var(--bg-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      color: var(--text-primary);
      font-family: var(--font-body);
      font-size: var(--text-sm);
      outline: none;
      transition: border-color var(--duration-fast) ease, box-shadow var(--duration-fast) ease;
      cursor: none;
    }
    .auth-phone-input:focus {
      border-color: var(--accent-mint);
      box-shadow: 0 0 0 3px rgba(0,229,160,0.1);
    }

    /* Password strength */
    .auth-strength {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin-top: var(--space-2);
    }
    .auth-strength-bars {
      display: flex;
      gap: 3px;
    }
    .auth-strength-bar {
      width: 32px;
      height: 4px;
      background: var(--border-subtle);
      border-radius: var(--radius-full);
      transition: background var(--duration-normal) ease, width 0.4s ease;
    }
    .auth-strength-bar.active-weak { background: var(--accent-coral); }
    .auth-strength-bar.active-fair { background: var(--accent-amber); }
    .auth-strength-bar.active-good { background: var(--accent-amber); }
    .auth-strength-bar.active-strong { background: var(--accent-mint); }
    .auth-strength-label {
      font-size: 10px;
      font-weight: var(--weight-semibold);
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    /* Role selector */
    .auth-role-selector {
      display: flex;
      gap: var(--space-3);
      margin-bottom: var(--space-5);
    }
    .auth-role-card {
      flex: 1;
      padding: var(--space-4);
      background: var(--bg-elevated);
      border: 2px solid var(--border-subtle);
      border-radius: var(--radius-xl);
      text-align: center;
      cursor: none;
      transition: all var(--duration-normal) var(--ease-spring);
      position: relative;
    }
    .auth-role-card:hover {
      border-color: var(--border-medium);
      transform: translateY(-2px);
    }
    .auth-role-card.selected {
      border-color: var(--accent-mint);
      background: rgba(0,229,160,0.05);
      box-shadow: 0 0 20px rgba(0,229,160,0.1);
    }
    .auth-role-card.selected::after {
      content: '✓';
      position: absolute;
      top: 8px;
      right: 10px;
      color: var(--accent-mint);
      font-size: 14px;
      font-weight: bold;
    }
    .auth-role-emoji {
      font-size: 32px;
      margin-bottom: var(--space-2);
      display: block;
    }
    .auth-role-label {
      font-size: var(--text-xs);
      font-weight: var(--weight-semibold);
      color: var(--text-secondary);
    }

    /* Forgot password */
    .auth-forgot-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-6);
    }
    .auth-remember {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      cursor: none;
    }
    .auth-remember input[type="checkbox"] {
      accent-color: var(--accent-mint);
      cursor: none;
    }
    .auth-remember label {
      font-size: var(--text-xs);
      color: var(--text-muted);
      cursor: none;
    }
    .auth-forgot-link {
      font-size: var(--text-xs);
      color: var(--accent-sky);
      cursor: none;
      background: none;
      border: none;
      font-family: var(--font-body);
      transition: color var(--duration-fast) ease;
    }
    .auth-forgot-link:hover {
      color: var(--accent-mint);
    }

    /* Terms checkbox */
    .auth-terms {
      display: flex;
      align-items: flex-start;
      gap: var(--space-2);
      margin-bottom: var(--space-6);
    }
    .auth-terms input[type="checkbox"] {
      accent-color: var(--accent-mint);
      cursor: none;
      margin-top: 2px;
    }
    .auth-terms-text {
      font-size: var(--text-xs);
      color: var(--text-muted);
      line-height: 1.5;
    }
    .auth-terms-text a {
      color: var(--accent-sky);
      text-decoration: none;
    }
    .auth-terms-text a:hover {
      text-decoration: underline;
    }

    /* Primary CTA */
    .auth-submit {
      width: 100%;
      padding: var(--space-4) var(--space-6);
      background: var(--accent-mint);
      color: var(--text-inverse);
      border: none;
      border-radius: var(--radius-lg);
      font-family: var(--font-display);
      font-size: var(--text-sm);
      font-weight: var(--weight-bold);
      letter-spacing: var(--tracking-wide);
      cursor: none;
      transition: all var(--duration-normal) var(--ease-spring);
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,229,160,0.25);
    }
    .auth-submit:hover {
      box-shadow: 0 6px 30px rgba(0,229,160,0.4);
      transform: translateY(-2px);
    }
    .auth-submit:active {
      transform: scale(0.97);
    }
    .auth-submit.loading {
      pointer-events: none;
      opacity: 0.85;
    }
    .auth-submit.success {
      animation: auth-successPulse 0.8s ease;
      background: var(--accent-mint);
    }
    .auth-submit.shake {
      animation: auth-shake 0.4s ease;
    }
    .auth-submit-spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(8,9,13,0.2);
      border-top-color: var(--text-inverse);
      border-radius: 50%;
      animation: auth-spin 0.6s linear infinite;
      margin-right: var(--space-2);
      vertical-align: middle;
    }

    /* Divider */
    .auth-divider {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      margin: var(--space-6) 0;
    }
    .auth-divider-line {
      flex: 1;
      height: 1px;
      background: var(--border-subtle);
    }
    .auth-divider-text {
      font-size: var(--text-xs);
      color: var(--text-muted);
      white-space: nowrap;
    }

    /* Social buttons */
    .auth-social-buttons {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }
    .auth-social-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-3);
      padding: var(--space-3) var(--space-6);
      border-radius: var(--radius-lg);
      font-family: var(--font-display);
      font-size: var(--text-sm);
      font-weight: var(--weight-semibold);
      cursor: none;
      transition: all var(--duration-normal) var(--ease-spring);
      position: relative;
      overflow: hidden;
    }
    .auth-google-btn {
      background: #fff;
      color: #333;
      border: 1px solid rgba(0,0,0,0.1);
    }
    .auth-google-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(255,255,255,0.15);
    }
    .auth-google-icon {
      width: 18px;
      height: 18px;
    }
    .auth-phone-btn {
      background: var(--bg-elevated);
      color: var(--text-primary);
      border: 1px solid var(--border-medium);
    }
    .auth-phone-btn:hover {
      border-color: var(--accent-mint);
      background: var(--bg-glass-hover);
      transform: translateY(-2px);
    }

    /* Switch link */
    .auth-switch {
      text-align: center;
      margin-top: var(--space-6);
      font-size: var(--text-xs);
      color: var(--text-muted);
    }
    .auth-switch-link {
      color: var(--accent-mint);
      cursor: none;
      background: none;
      border: none;
      font-family: var(--font-body);
      font-size: var(--text-xs);
      font-weight: var(--weight-semibold);
      transition: color var(--duration-fast) ease;
    }
    .auth-switch-link:hover {
      color: var(--accent-sky);
    }

    /* ═══ WELCOME BACK (logged-in state) ═══ */
    .auth-welcome {
      text-align: center;
      animation: auth-fadeUp 0.6s var(--ease-out) both;
    }
    .auth-welcome-avatar {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent-mint), var(--accent-sky));
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--text-2xl);
      font-weight: var(--weight-bold);
      color: var(--text-inverse);
      margin: 0 auto var(--space-4);
      font-family: var(--font-display);
      box-shadow: 0 4px 24px rgba(0,229,160,0.3);
    }
    .auth-welcome-name {
      font-family: var(--font-display);
      font-size: var(--text-xl);
      font-weight: var(--weight-bold);
      margin-bottom: var(--space-1);
    }
    .auth-welcome-email {
      font-size: var(--text-sm);
      color: var(--text-muted);
      margin-bottom: var(--space-8);
    }
    .auth-welcome-continue {
      width: 100%;
      margin-bottom: var(--space-3);
    }
    .auth-signout-link {
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: var(--text-xs);
      cursor: none;
      font-family: var(--font-body);
      transition: color var(--duration-fast) ease;
    }
    .auth-signout-link:hover {
      color: var(--accent-coral);
    }

    /* Forgot password dropdown */
    .auth-forgot-dropdown {
      background: var(--bg-elevated);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      margin-bottom: var(--space-4);
      animation: auth-fadeUp 0.25s ease both;
      display: none;
    }
    .auth-forgot-dropdown.visible {
      display: block;
    }
    .auth-forgot-dropdown input {
      width: 100%;
      padding: var(--space-3) var(--space-4);
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-size: var(--text-sm);
      outline: none;
      margin-bottom: var(--space-3);
      cursor: none;
      font-family: var(--font-body);
    }
    .auth-forgot-dropdown input:focus {
      border-color: var(--accent-mint);
    }
    .auth-forgot-send {
      width: 100%;
      padding: var(--space-2) var(--space-4);
      background: var(--accent-sky);
      color: #fff;
      border: none;
      border-radius: var(--radius-md);
      font-size: var(--text-xs);
      font-weight: var(--weight-bold);
      cursor: none;
      transition: opacity 0.2s;
    }
    .auth-forgot-send:hover { opacity: 0.85; }

    /* ═══ RESPONSIVE ═══ */
    @media (max-width: 768px) {
      .auth-brand { display: none; }
      .auth-form-panel { padding: var(--space-4); }
      .auth-card { padding: var(--space-8) var(--space-6); }
    }
  `;
  document.head.appendChild(style);
}

/* ─── Google Icon SVG ─── */
const GOOGLE_SVG = `<svg class="auth-google-icon" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>`;

/* ─── Shield SVG ─── */
const SHIELD_SVG = `<svg class="auth-shield-svg" viewBox="0 0 100 120" width="80" height="96">
  <path d="M50 5 L90 25 L90 60 C90 85 70 105 50 115 C30 105 10 85 10 60 L10 25 Z"
    fill="none" stroke="#00E5A0" stroke-width="2.5" opacity="0.9"/>
  <path d="M30 60 L45 75 L70 45"
    fill="none" stroke="#00E5A0" stroke-width="3.5"
    stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

/* ─── Password Strength Calculator ─── */
function getPasswordStrength(pw) {
  if (!pw || pw.length < 1) return { level: 0, label: '', cls: '' };
  if (pw.length < 6) return { level: 1, label: 'Weak', cls: 'weak' };
  const hasNumber = /\d/.test(pw);
  const hasSpecial = /[^A-Za-z0-9]/.test(pw);
  if (pw.length >= 8 && hasNumber && hasSpecial) return { level: 4, label: 'Strong', cls: 'strong' };
  if (pw.length >= 8 && hasNumber) return { level: 3, label: 'Good', cls: 'good' };
  return { level: 2, label: 'Fair', cls: 'fair' };
}

/* ─── Firebase Error Messages ─── */
function getAuthErrorMessage(code) {
  const map = {
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/email-already-in-use': 'This email is already registered. Try signing in.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/invalid-credential': 'Invalid credentials. Please check and try again.',
    'auth/too-many-requests': 'Too many attempts. Please wait a moment.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed. Please try again.',
    'auth/network-request-failed': 'Network error. Check your connection.',
  };
  return map[code] || 'Something went wrong. Please try again.';
}

/* ═══════════════════════════════════════════
   RENDER FUNCTION
   ═══════════════════════════════════════════ */
export function render(container) {
  injectStyles();

  // State
  let currentTab = 'signin'; // 'signin' | 'signup'
  let selectedRole = 'caregiver';
  let showPassword = false;
  let showSignupPassword = false;
  let isLoading = false;
  let showForgotDropdown = false;

  const intervals = [];
  const timeouts = [];

  // Check if already logged in
  const existingUser = localStorage.getItem('guardli_user');
  let loggedInUser = existingUser ? JSON.parse(existingUser) : null;

  // Try init Firebase in background
  initFirebase();

  /* ─── Build DOM ─── */
  const root = document.createElement('div');
  root.className = 'auth-view';

  function renderView() {
    root.innerHTML = '';
    // Clear timers
    intervals.forEach(clearInterval);
    intervals.length = 0;
    timeouts.forEach(clearTimeout);
    timeouts.length = 0;

    if (loggedInUser) {
      renderWelcomeBack();
    } else {
      renderAuthPanels();
    }
    container.appendChild(root);
  }

  /* ─── Welcome Back State ─── */
  function renderWelcomeBack() {
    const initial = (loggedInUser.name || loggedInUser.email || 'U')[0].toUpperCase();

    root.innerHTML = `
      <div class="auth-brand">
        <div class="auth-brand-content">
          ${SHIELD_SVG}
          <div class="auth-brand-name">GUARDLI</div>
          <div class="auth-brand-tagline">Your Digital Guardian</div>
        </div>
        ${buildParticles()}
      </div>
      <div class="auth-form-panel">
        <div class="auth-card">
          <div class="auth-welcome">
            <div class="auth-welcome-avatar">${loggedInUser.photoURL ? `<img src="${loggedInUser.photoURL}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">` : initial}</div>
            <div class="auth-welcome-name">Welcome back! 👋</div>
            <div class="auth-welcome-email">Signed in as ${loggedInUser.email}</div>
            <button class="auth-submit auth-welcome-continue" id="auth-continue-btn">Continue to Dashboard 🛡️</button>
            <button class="auth-signout-link" id="auth-signout-btn">Sign out</button>
          </div>
        </div>
      </div>
    `;

    root.querySelector('#auth-continue-btn')?.addEventListener('click', () => {
      store.set('currentView', 'shield');
    });
    root.querySelector('#auth-signout-btn')?.addEventListener('click', () => {
      localStorage.removeItem('guardli_user');
      loggedInUser = null;
      if (firebaseReady && firebaseAuth) {
        import('https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js').then(m => m.signOut(firebaseAuth));
      }
      store.addToast('Signed out successfully', 'info', 3000);
      renderView();
    });
  }

  /* ─── Full Auth Panels ─── */
  function renderAuthPanels() {
    root.innerHTML = `
      <!-- LEFT BRAND PANEL -->
      <div class="auth-brand">
        <div class="auth-brand-content" style="animation: auth-fadeUp 0.8s var(--ease-out) both;">
          ${SHIELD_SVG}
          <div class="auth-brand-name">GUARDLI</div>
          <div class="auth-brand-tagline">Your Digital Guardian</div>

          <div class="auth-stats-rotator" id="auth-stats">
            <div class="auth-stat-item active" data-idx="0">🛡️ 12,500+ Seniors Protected</div>
            <div class="auth-stat-item" data-idx="1">🚫 2,847 Scams Blocked This Month</div>
            <div class="auth-stat-item" data-idx="2">⭐ 4.9/5 Family Trust Rating</div>
          </div>

          <div class="auth-testimonial" id="auth-testimonials">
            <div class="auth-testimonial-item active" data-idx="0">
              <div class="auth-testimonial-quote">"Guardli saved my mother from a ₹2 lakh fraud. The alerts are instant and lifesaving."</div>
              <div class="auth-testimonial-author">— Priya S., Mumbai</div>
            </div>
            <div class="auth-testimonial-item" data-idx="1">
              <div class="auth-testimonial-quote">"Peace of mind knowing my parents are protected even when I'm abroad."</div>
              <div class="auth-testimonial-author">— Rajesh K., Delhi</div>
            </div>
          </div>
        </div>
        ${buildParticles()}
      </div>

      <!-- RIGHT FORM PANEL -->
      <div class="auth-form-panel">
        <div class="auth-card">
          <div class="auth-tabs">
            <button class="auth-tab ${currentTab === 'signin' ? 'active' : ''}" id="auth-tab-signin">Sign In</button>
            <button class="auth-tab ${currentTab === 'signup' ? 'active' : ''}" id="auth-tab-signup">Sign Up</button>
            <div class="auth-tab-indicator ${currentTab === 'signup' ? 'signup' : ''}" id="auth-indicator"></div>
          </div>
          <div class="auth-form-body" id="auth-form-body">
            ${currentTab === 'signin' ? buildSignInForm() : buildSignUpForm()}
          </div>
        </div>
      </div>
    `;

    wireTabEvents();
    wireFormEvents();
    startRotations();
  }

  /* ─── Build Sign In Form ─── */
  function buildSignInForm() {
    return `
      <div class="auth-form-content" id="auth-form-content">
        <div class="auth-input-group">
          <label class="auth-input-label">Email Address</label>
          <div class="auth-input-wrap">
            <input type="email" class="auth-input" id="auth-email" placeholder="you@example.com" autocomplete="email">
            <span class="auth-input-icon">✉️</span>
          </div>
          <div class="auth-input-error" id="auth-email-error"></div>
        </div>

        <div class="auth-input-group">
          <label class="auth-input-label">Password</label>
          <div class="auth-input-wrap">
            <input type="${showPassword ? 'text' : 'password'}" class="auth-input" id="auth-password" placeholder="••••••••" autocomplete="current-password" style="padding-right: 44px;">
            <span class="auth-input-icon">🔒</span>
            <button class="auth-eye-toggle" id="auth-eye-toggle" type="button">${showPassword ? '🙈' : '👁️'}</button>
          </div>
          <div class="auth-input-error" id="auth-password-error"></div>
        </div>

        <div class="auth-forgot-row">
          <div class="auth-remember">
            <input type="checkbox" id="auth-remember" checked>
            <label for="auth-remember">Remember me</label>
          </div>
          <button class="auth-forgot-link" id="auth-forgot-btn">Forgot Password?</button>
        </div>

        <div class="auth-forgot-dropdown" id="auth-forgot-dropdown">
          <input type="email" id="auth-forgot-email" placeholder="Enter your email address">
          <button class="auth-forgot-send" id="auth-forgot-send">Send Reset Link 📧</button>
        </div>

        <button class="auth-submit" id="auth-submit-btn">Sign In</button>

        <div class="auth-divider">
          <div class="auth-divider-line"></div>
          <span class="auth-divider-text">or continue with</span>
          <div class="auth-divider-line"></div>
        </div>

        <div class="auth-social-buttons">
          <button class="auth-social-btn auth-google-btn" id="auth-google-btn">
            ${GOOGLE_SVG}
            Continue with Google
          </button>
          <button class="auth-social-btn auth-phone-btn" id="auth-phone-btn">
            📱 Sign in with Phone
          </button>
        </div>

        <div class="auth-switch">
          Don't have an account?
          <button class="auth-switch-link" id="auth-go-signup">Sign Up</button>
        </div>
      </div>
    `;
  }

  /* ─── Build Sign Up Form ─── */
  function buildSignUpForm() {
    return `
      <div class="auth-form-content" id="auth-form-content">
        <div class="auth-role-selector">
          <div class="auth-role-card ${selectedRole === 'senior' ? 'selected' : ''}" data-role="senior" id="auth-role-senior">
            <span class="auth-role-emoji">👵</span>
            <span class="auth-role-label">I'm a Senior</span>
          </div>
          <div class="auth-role-card ${selectedRole === 'caregiver' ? 'selected' : ''}" data-role="caregiver" id="auth-role-caregiver">
            <span class="auth-role-emoji">👨‍👩‍👦</span>
            <span class="auth-role-label">I'm a Caregiver</span>
          </div>
        </div>

        <div class="auth-input-group">
          <label class="auth-input-label">Full Name</label>
          <div class="auth-input-wrap">
            <input type="text" class="auth-input" id="auth-signup-name" placeholder="Your full name" autocomplete="name">
            <span class="auth-input-icon">👤</span>
          </div>
          <div class="auth-input-error" id="auth-signup-name-error"></div>
        </div>

        <div class="auth-input-group">
          <label class="auth-input-label">Email Address</label>
          <div class="auth-input-wrap">
            <input type="email" class="auth-input" id="auth-signup-email" placeholder="you@example.com" autocomplete="email">
            <span class="auth-input-icon">✉️</span>
          </div>
          <div class="auth-input-error" id="auth-signup-email-error"></div>
        </div>

        <div class="auth-input-group">
          <label class="auth-input-label">Phone Number</label>
          <div class="auth-phone-wrap">
            <div class="auth-phone-prefix">🇮🇳 +91</div>
            <input type="tel" class="auth-phone-input" id="auth-signup-phone" placeholder="98765 43210" autocomplete="tel">
          </div>
        </div>

        <div class="auth-input-group">
          <label class="auth-input-label">Password</label>
          <div class="auth-input-wrap">
            <input type="${showSignupPassword ? 'text' : 'password'}" class="auth-input" id="auth-signup-password" placeholder="Min. 6 characters" autocomplete="new-password" style="padding-right: 44px;">
            <span class="auth-input-icon">🔒</span>
            <button class="auth-eye-toggle" id="auth-signup-eye" type="button">${showSignupPassword ? '🙈' : '👁️'}</button>
          </div>
          <div class="auth-strength" id="auth-strength">
            <div class="auth-strength-bars">
              <div class="auth-strength-bar" id="auth-str-1"></div>
              <div class="auth-strength-bar" id="auth-str-2"></div>
              <div class="auth-strength-bar" id="auth-str-3"></div>
              <div class="auth-strength-bar" id="auth-str-4"></div>
            </div>
            <span class="auth-strength-label" id="auth-str-label"></span>
          </div>
          <div class="auth-input-error" id="auth-signup-password-error"></div>
        </div>

        <div class="auth-terms">
          <input type="checkbox" id="auth-terms-check">
          <span class="auth-terms-text">
            I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
          </span>
        </div>

        <button class="auth-submit" id="auth-signup-submit-btn">Create Account 🚀</button>

        <div class="auth-divider">
          <div class="auth-divider-line"></div>
          <span class="auth-divider-text">or continue with</span>
          <div class="auth-divider-line"></div>
        </div>

        <div class="auth-social-buttons">
          <button class="auth-social-btn auth-google-btn" id="auth-google-btn">
            ${GOOGLE_SVG}
            Continue with Google
          </button>
        </div>

        <div class="auth-switch">
          Already have an account?
          <button class="auth-switch-link" id="auth-go-signin">Sign In</button>
        </div>
      </div>
    `;
  }

  /* ─── Build Particles ─── */
  function buildParticles() {
    let html = '';
    for (let i = 0; i < 10; i++) {
      const left = Math.random() * 100;
      const dur = 10 + Math.random() * 15;
      const delay = Math.random() * 10;
      const drift = -30 + Math.random() * 60;
      const size = 2 + Math.random() * 4;
      html += `<div class="auth-particle" style="left:${left}%;bottom:-10px;width:${size}px;height:${size}px;--dur:${dur}s;--delay:${delay}s;--drift:${drift}px;"></div>`;
    }
    return html;
  }

  /* ─── Wire Tab Events ─── */
  function wireTabEvents() {
    const tabSignin = root.querySelector('#auth-tab-signin');
    const tabSignup = root.querySelector('#auth-tab-signup');
    const indicator = root.querySelector('#auth-indicator');
    const formBody = root.querySelector('#auth-form-body');

    function switchTab(tab) {
      if (tab === currentTab) return;
      currentTab = tab;

      // Update tab styles
      tabSignin?.classList.toggle('active', tab === 'signin');
      tabSignup?.classList.toggle('active', tab === 'signup');
      indicator?.classList.toggle('signup', tab === 'signup');

      // Fade transition
      if (formBody) {
        formBody.style.opacity = '0';
        formBody.style.transform = 'translateY(8px)';
        formBody.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

        const t = setTimeout(() => {
          formBody.innerHTML = tab === 'signin' ? buildSignInForm() : buildSignUpForm();
          wireFormEvents();
          requestAnimationFrame(() => {
            formBody.style.opacity = '1';
            formBody.style.transform = 'translateY(0)';
          });
        }, 200);
        timeouts.push(t);
      }
    }

    tabSignin?.addEventListener('click', () => switchTab('signin'));
    tabSignup?.addEventListener('click', () => switchTab('signup'));

    // Switch links inside forms
    root.addEventListener('click', (e) => {
      if (e.target.id === 'auth-go-signup') switchTab('signup');
      if (e.target.id === 'auth-go-signin') switchTab('signin');
    });
  }

  /* ─── Wire Form Events ─── */
  function wireFormEvents() {
    // Eye toggles
    root.querySelector('#auth-eye-toggle')?.addEventListener('click', () => {
      showPassword = !showPassword;
      const inp = root.querySelector('#auth-password');
      const btn = root.querySelector('#auth-eye-toggle');
      if (inp) inp.type = showPassword ? 'text' : 'password';
      if (btn) btn.textContent = showPassword ? '🙈' : '👁️';
    });
    root.querySelector('#auth-signup-eye')?.addEventListener('click', () => {
      showSignupPassword = !showSignupPassword;
      const inp = root.querySelector('#auth-signup-password');
      const btn = root.querySelector('#auth-signup-eye');
      if (inp) inp.type = showSignupPassword ? 'text' : 'password';
      if (btn) btn.textContent = showSignupPassword ? '🙈' : '👁️';
    });

    // Password strength meter
    root.querySelector('#auth-signup-password')?.addEventListener('input', (e) => {
      const str = getPasswordStrength(e.target.value);
      const bars = [1,2,3,4].map(i => root.querySelector(`#auth-str-${i}`));
      const label = root.querySelector('#auth-str-label');
      const colorMap = { weak: 'var(--accent-coral)', fair: 'var(--accent-amber)', good: 'var(--accent-amber)', strong: 'var(--accent-mint)' };
      bars.forEach((bar, i) => {
        if (!bar) return;
        bar.className = 'auth-strength-bar';
        if (i < str.level) bar.classList.add(`active-${str.cls}`);
      });
      if (label) {
        label.textContent = str.label;
        label.style.color = colorMap[str.cls] || 'var(--text-muted)';
      }
    });

    // Role selector
    root.querySelectorAll('.auth-role-card').forEach(card => {
      card.addEventListener('click', () => {
        selectedRole = card.dataset.role;
        root.querySelectorAll('.auth-role-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });

    // Forgot password
    root.querySelector('#auth-forgot-btn')?.addEventListener('click', () => {
      showForgotDropdown = !showForgotDropdown;
      const dd = root.querySelector('#auth-forgot-dropdown');
      if (dd) dd.classList.toggle('visible', showForgotDropdown);
    });

    root.querySelector('#auth-forgot-send')?.addEventListener('click', async () => {
      const email = root.querySelector('#auth-forgot-email')?.value?.trim();
      if (!email || !email.includes('@')) {
        store.addToast('Please enter a valid email address.', 'error', 3000);
        return;
      }
      if (firebaseReady) {
        try {
          const { sendPasswordResetEmail } = await import('https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js');
          await sendPasswordResetEmail(firebaseAuth, email);
        } catch (e) { /* fallthrough */ }
      }
      store.addToast(`Password reset link sent to ${email} 📧`, 'success', 4000);
      showForgotDropdown = false;
      root.querySelector('#auth-forgot-dropdown')?.classList.remove('visible');
    });

    // Sign In submit
    root.querySelector('#auth-submit-btn')?.addEventListener('click', () => handleSignIn());

    // Sign Up submit
    root.querySelector('#auth-signup-submit-btn')?.addEventListener('click', () => handleSignUp());

    // Google Sign In
    root.querySelector('#auth-google-btn')?.addEventListener('click', () => handleGoogleSignIn());

    // Phone btn
    root.querySelector('#auth-phone-btn')?.addEventListener('click', () => {
      store.addToast('Phone OTP sign-in coming soon! Use email or Google for now.', 'info', 4000);
    });

    // Enter key
    root.querySelector('#auth-password')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSignIn();
    });
    root.querySelector('#auth-signup-password')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSignUp();
    });
  }

  /* ─── Handle Sign In ─── */
  async function handleSignIn() {
    if (isLoading) return;
    const email = root.querySelector('#auth-email')?.value?.trim();
    const password = root.querySelector('#auth-password')?.value;
    const submitBtn = root.querySelector('#auth-submit-btn');

    // Clear errors
    clearErrors();

    // Validate
    let valid = true;
    if (!email || !email.includes('@')) {
      showError('auth-email', 'auth-email-error', 'Please enter a valid email address.');
      valid = false;
    }
    if (!password || password.length < 6) {
      showError('auth-password', 'auth-password-error', 'Password must be at least 6 characters.');
      valid = false;
    }
    if (!valid) {
      submitBtn?.classList.add('shake');
      const t = setTimeout(() => submitBtn?.classList.remove('shake'), 500);
      timeouts.push(t);
      return;
    }

    // Loading state
    isLoading = true;
    if (submitBtn) submitBtn.innerHTML = '<span class="auth-submit-spinner"></span> Signing in...';
    submitBtn?.classList.add('loading');

    try {
      if (firebaseReady) {
        const { signInWithEmailAndPassword } = await import('https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js');
        const cred = await signInWithEmailAndPassword(firebaseAuth, email, password);
        handleAuthSuccess(cred.user.displayName || email.split('@')[0], email, null);
      } else {
        // Demo mode
        await fakDelay(1200);
        handleAuthSuccess(email.split('@')[0], email, null);
      }
    } catch (e) {
      isLoading = false;
      if (submitBtn) submitBtn.innerHTML = 'Sign In';
      submitBtn?.classList.remove('loading');
      const msg = getAuthErrorMessage(e.code);
      store.addToast(msg, 'error', 4000);
      showError('auth-password', 'auth-password-error', msg);
    }
  }

  /* ─── Handle Sign Up ─── */
  async function handleSignUp() {
    if (isLoading) return;
    const name = root.querySelector('#auth-signup-name')?.value?.trim();
    const email = root.querySelector('#auth-signup-email')?.value?.trim();
    const password = root.querySelector('#auth-signup-password')?.value;
    const termsChecked = root.querySelector('#auth-terms-check')?.checked;
    const submitBtn = root.querySelector('#auth-signup-submit-btn');

    clearErrors();

    let valid = true;
    if (!name) {
      showError('auth-signup-name', 'auth-signup-name-error', 'Please enter your name.');
      valid = false;
    }
    if (!email || !email.includes('@')) {
      showError('auth-signup-email', 'auth-signup-email-error', 'Please enter a valid email address.');
      valid = false;
    }
    if (!password || password.length < 6) {
      showError('auth-signup-password', 'auth-signup-password-error', 'Password must be at least 6 characters.');
      valid = false;
    }
    if (!termsChecked) {
      store.addToast('Please agree to the Terms of Service to continue.', 'warning', 3000);
      valid = false;
    }
    if (!valid) {
      submitBtn?.classList.add('shake');
      const t = setTimeout(() => submitBtn?.classList.remove('shake'), 500);
      timeouts.push(t);
      return;
    }

    isLoading = true;
    if (submitBtn) submitBtn.innerHTML = '<span class="auth-submit-spinner"></span> Creating account...';
    submitBtn?.classList.add('loading');

    try {
      if (firebaseReady) {
        const { createUserWithEmailAndPassword, updateProfile } = await import('https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js');
        const cred = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        await updateProfile(cred.user, { displayName: name });
        handleAuthSuccess(name, email, null);
      } else {
        await fakDelay(1500);
        handleAuthSuccess(name, email, null);
      }
    } catch (e) {
      isLoading = false;
      if (submitBtn) submitBtn.innerHTML = 'Create Account 🚀';
      submitBtn?.classList.remove('loading');
      const msg = getAuthErrorMessage(e.code);
      store.addToast(msg, 'error', 4000);
      showError('auth-signup-email', 'auth-signup-email-error', msg);
    }
  }

  /* ─── Handle Google Sign In ─── */
  async function handleGoogleSignIn() {
    if (isLoading) return;

    try {
      if (firebaseReady) {
        const { signInWithPopup } = await import('https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js');
        const result = await signInWithPopup(firebaseAuth, googleProvider);
        const user = result.user;
        handleAuthSuccess(user.displayName || 'User', user.email, user.photoURL);
      } else {
        store.addToast('Demo mode — Google Sign-In simulated! 🎉', 'success', 3000);
        await fakDelay(800);
        handleAuthSuccess('Demo User', 'demo@guardli.com', null);
      }
    } catch (e) {
      const msg = getAuthErrorMessage(e.code);
      store.addToast(msg, 'error', 4000);
    }
  }

  /* ─── Auth Success Handler ─── */
  function handleAuthSuccess(name, email, photoURL) {
    isLoading = false;
    const user = { name, email, role: selectedRole, photoURL };
    localStorage.setItem('guardli_user', JSON.stringify(user));
    loggedInUser = user;

    store.set('isAuthenticated', true);

    // Animate success
    const btn = root.querySelector('.auth-submit');
    if (btn) {
      btn.classList.add('success');
      btn.innerHTML = '✓ Success!';
    }

    const modeLabel = firebaseReady ? '' : ' (Demo)';
    store.addToast(`Welcome, ${name}!${modeLabel} 🛡️`, 'success', 4000);

    const t = setTimeout(() => {
      store.set('currentView', 'shield');
    }, 1000);
    timeouts.push(t);
  }

  /* ─── Helpers ─── */
  function showError(inputId, errorId, msg) {
    const input = root.querySelector(`#${inputId}`);
    const error = root.querySelector(`#${errorId}`);
    if (input) input.classList.add('error');
    if (error) {
      error.textContent = msg;
      error.classList.add('visible');
    }
  }

  function clearErrors() {
    root.querySelectorAll('.auth-input.error').forEach(el => el.classList.remove('error'));
    root.querySelectorAll('.auth-input-error.visible').forEach(el => el.classList.remove('visible'));
  }

  function fakDelay(ms) {
    return new Promise(r => { const t = setTimeout(r, ms); timeouts.push(t); });
  }

  /* ─── Start Rotations ─── */
  function startRotations() {
    // Stats rotation
    let statIdx = 0;
    const statsContainer = root.querySelector('#auth-stats');
    if (statsContainer) {
      const statsInterval = setInterval(() => {
        const items = statsContainer.querySelectorAll('.auth-stat-item');
        items.forEach(item => item.classList.remove('active'));
        statIdx = (statIdx + 1) % items.length;
        items[statIdx]?.classList.add('active');
      }, 3000);
      intervals.push(statsInterval);
    }

    // Testimonial rotation
    let testIdx = 0;
    const testContainer = root.querySelector('#auth-testimonials');
    if (testContainer) {
      const testInterval = setInterval(() => {
        const items = testContainer.querySelectorAll('.auth-testimonial-item');
        items.forEach(item => item.classList.remove('active'));
        testIdx = (testIdx + 1) % items.length;
        items[testIdx]?.classList.add('active');
      }, 5000);
      intervals.push(testInterval);
    }
  }

  // Initial render
  renderView();

  // Cleanup on unmount
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const removed of m.removedNodes) {
        if (removed === root || removed.contains?.(root)) {
          intervals.forEach(clearInterval);
          timeouts.forEach(clearTimeout);
          observer.disconnect();
          return;
        }
      }
    }
  });
  if (container.parentElement) {
    observer.observe(container.parentElement, { childList: true, subtree: true });
  }
}
