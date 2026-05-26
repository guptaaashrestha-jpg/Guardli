/* ============================================
   GUARDLI — MAIN APPLICATION
   The conductor. Everything starts here.
   ============================================ */

// ─── Styles ───
import './styles/variables.css';
import './styles/base.css';
import './styles/animations.css';
import './styles/loading.css';
import './styles/components.css';
import './styles/shield.css';
import './styles/dashboard.css';

// ─── Modules ───
import { store } from './store.js';
import { initCursor } from './cursor.js';
import { refreshScrollAnimations } from './animations.js';
import { render as renderShield } from './views/ShieldView.js';
import { render as renderDashboard } from './views/DashboardView.js';
import { threats } from './data/mockData.js';

// ─── Boot Sequence ───
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initLoadingScreen();
  initRoleSwitcher();
  initToastSystem();
  initDemoController();

  // Subscribe to view changes
  store.subscribe('currentView', (view) => {
    transitionToView(view);
  });
});

// ─── Loading Screen ───
function initLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  const app = document.getElementById('app');

  // Wait for loading animation to complete, then reveal app
  setTimeout(() => {
    // Render the default view
    renderCurrentView();

    // Allow body scroll by removing loading-active classes
    document.documentElement.classList.remove('loading-active');
    document.body.classList.remove('loading-active');

    // Fade out loading screen
    loadingScreen.classList.add('hidden');

    // Reveal app
    setTimeout(() => {
      app.classList.add('visible');
      refreshScrollAnimations();
    }, 400);
  }, 3500); // Total loading time: shield draw + text + progress bar
}

// ─── View Rendering ───
function renderCurrentView() {
  const app = document.getElementById('app');
  const view = store.get('currentView');

  // Clear existing content
  app.innerHTML = '';

  if (view === 'shield') {
    renderShield(app);
  } else {
    renderDashboard(app);
  }
}

// ─── View Transition ───
function transitionToView(view) {
  const app = document.getElementById('app');

  // Fade out
  app.style.opacity = '0';
  app.style.transform = 'scale(0.98)';
  app.style.transition = 'opacity 0.35s ease, transform 0.35s ease';

  setTimeout(() => {
    renderCurrentView();

    // Fade in
    requestAnimationFrame(() => {
      app.style.opacity = '1';
      app.style.transform = 'scale(1)';
      refreshScrollAnimations();
    });
  }, 350);
}

// ─── Role Switcher ───
function initRoleSwitcher() {
  // Create the floating role switcher
  const switcher = document.createElement('div');
  switcher.className = 'role-switcher';
  switcher.id = 'roleSwitcher';
  switcher.innerHTML = `
    <button class="role-switcher-btn active" data-view="shield">
      🛡️ User View
    </button>
    <button class="role-switcher-btn" data-view="dashboard">
      📊 Caregiver
    </button>
  `;

  document.body.appendChild(switcher);

  // Handle clicks
  switcher.addEventListener('click', (e) => {
    const btn = e.target.closest('.role-switcher-btn');
    if (!btn) return;

    const view = btn.dataset.view;
    if (view === store.get('currentView')) return;

    // Update active state
    switcher.querySelectorAll('.role-switcher-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    store.set('currentView', view);
  });

  // Update switcher on external view changes
  store.subscribe('currentView', (view) => {
    switcher.querySelectorAll('.role-switcher-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.view === view);
    });
  });

  // Initially hidden, show after loading
  switcher.style.opacity = '0';
  switcher.style.transform = 'translateX(-50%) translateY(20px)';
  switcher.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

  setTimeout(() => {
    switcher.style.opacity = '1';
    switcher.style.transform = 'translateX(-50%) translateY(0)';
  }, 4000);
}

// ─── Toast System ───
function initToastSystem() {
  // Create toast container
  const container = document.createElement('div');
  container.className = 'toast-container';
  container.id = 'toastContainer';
  document.body.appendChild(container);

  // Listen for toast changes
  store.subscribe('toasts', (toasts) => {
    renderToasts(toasts);
  });
}

function renderToasts(toasts) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  container.innerHTML = toasts.map(t => {
    const iconMap = {
      info: '💡',
      success: '✅',
      warning: '⚠️',
      error: '🚨'
    };
    return `
      <div class="toast" data-toast-id="${t.id}">
        <span class="toast-icon">${iconMap[t.type] || '💡'}</span>
        <span class="toast-text">${t.text}</span>
      </div>
    `;
  }).join('');
}

// ─── Demo Controller drawer ───
function initDemoController() {
  const drawer = document.createElement('div');
  drawer.className = 'demo-drawer';
  drawer.id = 'demoDrawer';
  drawer.innerHTML = `
    <div class="demo-drawer-handle">⚙️</div>
    <div class="demo-drawer-title">Simulation Panel</div>
    <div class="demo-btn-list">
      <button class="demo-btn" data-scam="phishing">
        📧 Phishing Email Alert
      </button>
      <button class="demo-btn" data-scam="sms">
        💬 SMS Wire Transfer Scam
      </button>
      <button class="demo-btn" data-scam="support">
        🌐 Microsoft Virus Alert
      </button>
      <button class="demo-btn" data-scam="romance">
        💔 Romance Chat Coach
      </button>
      <div style="height: 1px; background: var(--border-subtle); margin: var(--space-2) 0;"></div>
      <button class="demo-btn" style="background: rgba(255, 95, 109, 0.1); border-color: rgba(255, 95, 109, 0.3); color: var(--accent-coral);" data-scam="sos">
        🚨 Trigger SOS Alarm
      </button>
    </div>
  `;

  document.body.appendChild(drawer);

  // Initially hidden, show after loading screen
  drawer.style.opacity = '0';
  drawer.style.transform = 'translateX(236px) translateY(20px)';
  drawer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  setTimeout(() => {
    drawer.style.opacity = '1';
    drawer.style.transform = ''; // Clear inline transform override so CSS stylesheet hover rules can trigger!
    // Restyle transition for sliding drawer hover effects
    setTimeout(() => {
      drawer.style.transition = 'transform 0.4s var(--ease-spring), opacity 0.5s ease';
    }, 500);
  }, 4000);

  // Wire click toggle to the drawer handle icon for tap/click expand support
  const handle = drawer.querySelector('.demo-drawer-handle');
  if (handle) {
    handle.addEventListener('click', (e) => {
      e.stopPropagation();
      drawer.classList.toggle('active');
    });
  }

  // Close when clicking outside of the drawer
  document.addEventListener('click', (e) => {
    if (!drawer.contains(e.target)) {
      drawer.classList.remove('active');
    }
  });

  // Wire click events
  drawer.addEventListener('click', (e) => {
    const btn = e.target.closest('.demo-btn');
    if (!btn) return;

    const scam = btn.dataset.scam;

    if (scam === 'sos') {
      store.triggerSOS();
      return;
    }

    // All threat scenarios should run on Shield View to show user warning popup first!
    if (store.get('currentView') !== 'shield') {
      store.set('currentView', 'shield');
      store.addToast('Switching to Elderly Shield view to process threat simulation...', 'info', 3000);
    }

    setTimeout(() => {
      if (scam === 'phishing') {
        store.triggerThreat(threats[0]);
      } else if (scam === 'sms') {
        store.triggerThreat(threats[1]);
      } else if (scam === 'support') {
        store.triggerThreat(threats[2]);
      } else if (scam === 'romance') {
        // Go to home, scroll or switch to activity, and pulse Richard Hearts
        store.set('shieldSection', 'home');
        store.addToast('Click Richard Hearts in the Activity Feed to type a reply!', 'info', 5000);
        
        setTimeout(() => {
          const activitySec = document.getElementById('shield-activity');
          if (activitySec) {
            activitySec.scrollIntoView({ behavior: 'smooth' });
            // Highlight/pulse Richard Hearts
            const items = activitySec.querySelectorAll('.activity-item');
            items.forEach(item => {
              if (item.textContent.includes('Richard Hearts')) {
                item.style.outline = '3px solid var(--accent-coral)';
                item.style.animation = 'breathe 2s ease infinite';
                setTimeout(() => {
                  item.style.outline = 'none';
                  item.style.animation = 'none';
                }, 10000);
              }
            });
          }
        }, 800);
      }
    }, store.get('currentView') !== 'shield' ? 500 : 0);
  });
}
