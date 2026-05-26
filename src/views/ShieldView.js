/* ============================================
   GUARDLI — SHIELD VIEW (Elderly User)
   Warm. Spacious. Dignified.
   Big enough to read. Clear enough to trust.
   ============================================ */

import { store } from '../store.js';
import {
  threats,
  contacts,
  quizzes,
  scamSchoolProgress,
  privacySettings,
  autonomyState,
  timeAgo,
  getTrustLevel,
  getChannelIcon,
  getThreatTypeLabel
} from '../data/mockData.js';

// ─── Activity items for the feed ───
const activityItems = [
  { icon: '✅', text: '89 emails scanned — all clear', status: 'safe', time: '12 minutes ago', trustScore: null },
  { icon: '🚫', text: 'Phishing email blocked from bankofamerica-verify.com', status: 'blocked', time: '15 minutes ago', trustScore: 8 },
  { icon: '🚫', text: 'SMS scam blocked — fake grandchild emergency', status: 'blocked', time: '45 minutes ago', trustScore: 5 },
  { icon: '⚠️', text: 'Suspicious contact flagged: Richard Hearts', status: 'warning', time: '6 hours ago', trustScore: 23 },
  { icon: '✅', text: '34 SMS messages checked — all safe', status: 'safe', time: '8 hours ago', trustScore: null },
  { icon: '🚫', text: 'Tech support scam blocked — fake Microsoft alert', status: 'blocked', time: '2 hours ago', trustScore: 3 }
];

// ─── Privacy toggle definitions ───
const privacyToggles = [
  { key: 'shareHighThreats', label: 'Alert Sarah about serious threats', on: privacySettings.shareHighThreats },
  { key: 'shareWeeklySummary', label: 'Share weekly safety summary', on: privacySettings.shareWeeklySummary },
  { key: 'shareMediumThreats', label: 'Share medium-risk alerts', on: privacySettings.shareMediumThreats },
  { key: 'shareScamSchoolProgress', label: 'Share Scam School progress', on: privacySettings.shareScamSchoolProgress }
];

// ─── Shield Logo SVG ───
const shieldSVG = `<svg class="shield-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;

// ─── Build trust score badge HTML ───
function renderTrustBadge(score) {
  const trust = getTrustLevel(score);
  return `<span class="trust-score ${trust.class}">🛡️ ${score}/100</span>`;
}

// ─── Build the privacy preview text ───
function buildPrivacyPreview(toggles) {
  const active = toggles.filter(t => t.on).map(t => t.label.toLowerCase());
  if (active.length === 0) return `Sarah can't see any of your activity right now.`;
  return `Sarah can currently: ${active.join(', ')}.`;
}

// ─── Render ───
export function render(container) {
  const quiz = quizzes[0];
  const xpPercent = Math.round((scamSchoolProgress.xp / scamSchoolProgress.xpToNextLevel) * 100);
  const autonomyLevel = autonomyState.currentLevel;
  const autonomyDesc = autonomyState.levelDescriptions[autonomyLevel];
  const currentTab = store.get('shieldSection') || 'home';

  // Track found flags
  const foundFlags = new Set();
  // Track toggle states (clone initial values)
  const toggleStates = {};
  privacyToggles.forEach(t => { toggleStates[t.key] = t.on; });

  container.innerHTML = `
    <div class="shield-view">

      <!-- ═══ NAVBAR ═══ -->
      <nav class="shield-nav" data-animate="fade-up" data-delay="0">
        <div class="shield-logo">
          ${shieldSVG}
          <span>Guardli</span>
        </div>
        <div class="shield-nav-actions">
          <button class="shield-nav-btn ${currentTab === 'home' ? 'active' : ''}" data-tab="home">Home</button>
          <button class="shield-nav-btn ${currentTab === 'activity' ? 'active' : ''}" data-tab="activity">Activity</button>
          <button class="shield-nav-btn ${currentTab === 'learn' ? 'active' : ''}" data-tab="learn">Learn</button>
          <button class="shield-nav-btn ${currentTab === 'settings' ? 'active' : ''}" data-tab="settings">Settings</button>
        </div>
      </nav>

      <!-- ═══ HERO STATUS ═══ -->
      <section class="shield-hero" id="shield-hero" data-animate="fade-up" data-delay="1">
        <div class="shield-status-ring safe">
          <span class="shield-status-icon">🛡️</span>
        </div>
        <h1>You're Protected</h1>
        <p class="shield-hero-sub">Guardli checked 279 messages today. Everything looks safe.</p>
        <div class="shield-community">🌐 Protected by 52,847 Guardli users</div>
        <div style="margin-top: var(--space-4);">
          <span class="autonomy-badge">
            ⚡ Level ${autonomyLevel}: ${autonomyDesc.name}
            <span class="autonomy-fill">
              <span class="autonomy-fill-bar" style="width: ${(autonomyLevel / autonomyState.maxLevel) * 100}%"></span>
            </span>
          </span>
        </div>
      </section>

      <!-- ═══ MAIN CONTENT ═══ -->
      <div class="shield-content">

        <!-- ─── Scam School Card ─── -->
        <section class="shield-section scam-school-card" id="shield-learn" data-animate="fade-up" data-delay="2">
          <div class="scam-school-header">
            <span class="scam-school-badge">🎓 TODAY'S CHALLENGE</span>
            <span class="scam-school-streak">🔥 ${scamSchoolProgress.currentStreak}-day streak</span>
          </div>

          <div class="scam-school-question">
            <div class="scam-school-from">From: ${quiz.scenario.from}</div>
            <div class="scam-school-subject">${quiz.scenario.subject}</div>
            <div class="scam-school-body-text">${quiz.scenario.body}</div>
          </div>

          <p style="font-size: var(--text-sm); opacity: 0.85; margin-bottom: var(--space-2);">
            🚩 Tap every red flag you can spot:
          </p>

          <div class="scam-school-flags" id="scam-flags">
            ${quiz.redFlags.map(flag => `
              <button class="scam-flag" data-flag-id="${flag.id}" title="${flag.hint}">
                🚩 ${flag.text}
              </button>
            `).join('')}
          </div>

          <div class="scam-school-progress">
            <span class="scam-school-level">${scamSchoolProgress.level}</span>
            <div class="scam-school-progress-bar">
              <div class="scam-school-progress-fill" style="width: ${xpPercent}%"></div>
            </div>
            <span class="scam-school-level">${scamSchoolProgress.xp}/${scamSchoolProgress.xpToNextLevel} XP</span>
          </div>
        </section>

        <!-- ─── Activity Feed ─── -->
        <section class="shield-section" id="shield-activity" data-animate="fade-up" data-delay="3">
          <div class="shield-section-header">
            <div class="shield-section-title">📋 Recent Activity</div>
          </div>
          <div class="activity-list">
            ${activityItems.map(item => `
              <div class="activity-item">
                <div class="activity-icon ${item.status}">${item.icon}</div>
                <div class="activity-body">
                  <div class="activity-text">${item.text}</div>
                  <div class="activity-time">${item.time}</div>
                </div>
                ${item.trustScore !== null ? `
                  <div class="activity-trust">
                    ${renderTrustBadge(item.trustScore)}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </section>

        <!-- ─── Privacy Settings ─── -->
        <section class="shield-section" id="shield-settings" data-animate="fade-up" data-delay="4">
          <div class="shield-section-header">
            <div class="shield-section-title">🔒 What Sarah can see</div>
          </div>

          <div id="privacy-toggles">
            ${privacyToggles.map(toggle => `
              <div class="toggle-wrapper" data-toggle-key="${toggle.key}">
                <span class="toggle-label">${toggle.label}</span>
                <div class="toggle ${toggle.on ? 'active' : ''}" data-toggle-key="${toggle.key}">
                  <div class="toggle-knob"></div>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="privacy-preview" id="privacy-preview">
            <div class="privacy-preview-title">What Sarah currently sees</div>
            <div class="privacy-preview-text" id="privacy-preview-text">
              ${buildPrivacyPreview(privacyToggles)}
            </div>
          </div>
        </section>

      </div><!-- end .shield-content -->

      <!-- ═══ SOS BUTTON ═══ -->
      <button class="sos-button" id="sos-btn">SOS</button>

      <!-- ═══ SOS MODAL ═══ -->
      <div class="modal-overlay" id="sos-modal">
        <div class="modal">
          <div style="text-align: center; margin-bottom: var(--space-6);">
            <div style="font-size: 48px; margin-bottom: var(--space-4);">🚨</div>
            <h2 style="font-size: var(--text-2xl); font-weight: var(--weight-bold); color: var(--shield-text); margin-bottom: var(--space-3);">
              Send Emergency Alert?
            </h2>
            <p style="font-size: var(--text-base); color: var(--shield-text-secondary); line-height: var(--leading-relaxed);">
              This will alert Sarah and James immediately. Are you sure?
            </p>
          </div>
          <div style="display: flex; gap: var(--space-3); justify-content: center;">
            <button class="btn btn-danger btn-lg" id="sos-confirm">Yes, alert them</button>
            <button class="btn btn-ghost btn-lg" id="sos-cancel">Cancel</button>
          </div>
        </div>
      </div>

      <!-- ═══ SCANNING OVERLAY ═══ -->
      <div class="scan-overlay" id="scan-overlay">
        <div class="scan-radar"></div>
        <div class="scan-overlay-text" id="scan-overlay-text">Checking incoming reputation...</div>
      </div>

      <!-- ═══ THREAT WARNING POPUP ═══ -->
      <div class="modal-overlay" id="threat-modal">
        <div class="modal threat-modal">
          <div class="threat-modal-header">
            <div class="threat-modal-icon">⚠️</div>
            <div>
              <h2 class="threat-modal-title">Suspicious Message Detected</h2>
              <p class="threat-modal-subtitle">Guardli detected a potential scam attempt</p>
            </div>
          </div>
          <div class="threat-modal-content" id="threat-modal-content">
            <!-- populated dynamically -->
          </div>
          <div style="display: flex; gap: var(--space-3); justify-content: center;">
            <button class="btn btn-danger btn-lg" id="threat-block-btn">Block Sender ✓</button>
            <button class="btn btn-ghost btn-lg" id="threat-trust-btn">I Trust This Person</button>
          </div>
        </div>
      </div>

      <!-- ═══ SMS CHAT PANEL FOR RICHARD HEARTS ═══ -->
      <div class="modal-overlay" id="chat-modal">
        <div class="modal chat-modal" style="max-width: 480px; padding: 0; display: flex; flex-direction: column; height: 500px; overflow: hidden; background: #FAF9F6; cursor: default;">
          <!-- Header -->
          <div style="padding: var(--space-4); border-bottom: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; background: #fff; flex-shrink: 0;">
            <div style="display: flex; align-items: center; gap: var(--space-3);">
              <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--accent-coral-dim); display: flex; align-items: center; justify-content: center; font-size: 20px;">💔</div>
              <div>
                <div style="font-weight: var(--weight-bold); font-family: var(--font-display); font-size: var(--text-sm); color: #222; text-align: left;">Richard Hearts</div>
                <div style="font-size: var(--text-xs); color: var(--accent-coral); font-weight: var(--weight-semibold); text-align: left;">Trust Score: 23/100 (Caution)</div>
              </div>
            </div>
            <button class="btn btn-sm btn-ghost" id="chat-close-btn" style="border: none; font-size: 16px; padding: var(--space-2); cursor: none;">✕</button>
          </div>
          <!-- Messages -->
          <div style="flex: 1; padding: var(--space-4); overflow-y: auto; display: flex; flex-direction: column; gap: var(--space-4); scroll-behavior: smooth;" id="chat-messages">
            <div style="align-self: flex-start; background: #FFF; padding: var(--space-3) var(--space-4); border-radius: var(--radius-lg); border-bottom-left-radius: 0; max-width: 80%; box-shadow: var(--shadow-sm); border: 1px solid var(--border-subtle); text-align: left;">
              <div style="font-size: var(--text-xs); color: var(--text-muted); margin-bottom: var(--space-1);">Richard • Yesterday</div>
              <div style="font-size: var(--text-sm); color: #333; line-height: var(--leading-normal);">
                My dearest, every moment without you feels like an eternity. I had a small business emergency at the rig...
              </div>
            </div>
            <div style="align-self: flex-start; background: #FFF; padding: var(--space-3) var(--space-4); border-radius: var(--radius-lg); border-bottom-left-radius: 0; max-width: 80%; box-shadow: var(--shadow-sm); border: 1px solid var(--border-subtle); text-align: left;">
              <div style="font-size: var(--text-xs); color: var(--text-muted); margin-bottom: var(--space-1);">Richard • 6h ago</div>
              <div style="font-size: var(--text-sm); color: #333; line-height: var(--leading-normal);">
                Could you help me with a $500 gift card? Please don't tell your daughter Sarah, she wouldn't understand our connection.
              </div>
            </div>
          </div>
          <!-- Compose -->
          <div style="padding: var(--space-3); border-top: 1px solid var(--border-subtle); display: flex; gap: var(--space-2); background: #fff; flex-shrink: 0;">
            <input type="text" id="chat-input" placeholder="Type a reply to Richard..." style="flex: 1; padding: var(--space-3) var(--space-4); border: 1px solid var(--border-subtle); border-radius: var(--radius-full); font-size: var(--text-sm); cursor: auto; background: #FFF; color: #333;" />
            <button class="btn btn-primary" id="chat-send-btn" style="border-radius: 50%; width: 40px; height: 40px; padding: 0; display: flex; align-items: center; justify-content: center; font-size: 16px; cursor: none;">➔</button>
          </div>
        </div>
      </div>

      <!-- ═══ REPLY COACH MODAL ═══ -->
      <div class="modal-overlay" id="reply-coach-modal">
        <div class="modal reply-coach-modal" style="max-width: 440px;">
          <div style="text-align: center; margin-bottom: var(--space-4);">
            <span style="font-size: 40px;">💬</span>
            <h2 style="font-family: var(--font-display); font-size: var(--text-xl); font-weight: var(--weight-bold); margin-top: var(--space-2); color: var(--accent-amber);">
              Before you reply...
            </h2>
            <p style="font-size: var(--text-xs); color: var(--text-muted); margin-top: var(--space-1);">
              Our safety coach analyzed this conversation
            </p>
          </div>
          <div class="card" style="padding: var(--space-4); margin-bottom: var(--space-5); background: rgba(255, 184, 0, 0.05); border-color: rgba(255, 184, 0, 0.25);">
            <div style="font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--accent-amber); margin-bottom: var(--space-2); text-align: left;">
              ⚠️ Romance Scam Pattern Detected
            </div>
            <div style="font-size: var(--text-xs); color: var(--text-muted); line-height: var(--leading-relaxed); text-align: left;">
              • <strong>Money request:</strong> Richard asked for a $500 emergency gift card.<br>
              • <strong>Secrecy requested:</strong> He asked you to keep this private from Sarah.<br>
              • <strong>Identity unverified:</strong> Trust Score is only <strong>23/100</strong>.
            </div>
          </div>
          <div style="display: flex; flex-direction: column; gap: var(--space-2); width: 100%;">
            <button class="btn btn-primary" id="coach-ask-sarah" style="justify-content: center; cursor: none;">📞 Talk to Sarah First</button>
            <button class="btn btn-danger" id="coach-block-richard" style="justify-content: center; cursor: none;">🚫 Block Richard Hearts</button>
            <button class="btn btn-ghost" id="coach-reply-anyway" style="justify-content: center; cursor: none;">Reply Anyway</button>
          </div>
        </div>
      </div>

    </div><!-- end .shield-view -->
  `;

  // ───────────────────────────────────
  // EVENT LISTENERS
  // ───────────────────────────────────

  // ─── Tab Navigation ───
  const navBtns = container.querySelectorAll('.shield-nav-btn[data-tab]');
  const heroSection = container.querySelector('#shield-hero');
  const learnSection = container.querySelector('#shield-learn');
  const activitySection = container.querySelector('#shield-activity');
  const settingsSection = container.querySelector('#shield-settings');

  function switchTab(tab) {
    store.set('shieldSection', tab);

    // Update active state on nav buttons
    navBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });

    // Show/hide sections based on active tab
    if (tab === 'home') {
      heroSection.style.display = '';
      learnSection.style.display = '';
      activitySection.style.display = '';
      settingsSection.style.display = 'none';
    } else if (tab === 'activity') {
      heroSection.style.display = 'none';
      learnSection.style.display = 'none';
      activitySection.style.display = '';
      settingsSection.style.display = 'none';
    } else if (tab === 'learn') {
      heroSection.style.display = 'none';
      learnSection.style.display = '';
      activitySection.style.display = 'none';
      settingsSection.style.display = 'none';
    } else if (tab === 'settings') {
      heroSection.style.display = 'none';
      learnSection.style.display = 'none';
      activitySection.style.display = 'none';
      settingsSection.style.display = '';
    }
  }

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Initialize the correct view
  switchTab(currentTab);

  // ─── Scam School Flag Clicks ───
  const flagContainer = container.querySelector('#scam-flags');
  flagContainer.addEventListener('click', (e) => {
    const flagBtn = e.target.closest('.scam-flag');
    if (!flagBtn) return;

    const flagId = flagBtn.dataset.flagId;
    if (foundFlags.has(flagId)) return; // already found

    foundFlags.add(flagId);
    flagBtn.classList.add('correct');
    store.addToast('Great catch! 🎯', 'success', 3000);

    // Check if all flags found
    if (foundFlags.size === quiz.redFlags.length) {
      setTimeout(() => {
        store.addToast(`🎓 Perfect score! You spotted all ${quiz.redFlags.length} red flags! +${quiz.xpReward} XP`, 'success', 5000);
      }, 800);
    }
  });

  // ─── Privacy Toggles ───
  const togglesContainer = container.querySelector('#privacy-toggles');
  const previewText = container.querySelector('#privacy-preview-text');

  togglesContainer.addEventListener('click', (e) => {
    const toggleEl = e.target.closest('.toggle');
    if (!toggleEl) return;

    const key = toggleEl.dataset.toggleKey;
    toggleStates[key] = !toggleStates[key];
    toggleEl.classList.toggle('active', toggleStates[key]);

    // Rebuild the privacy preview
    const currentToggles = privacyToggles.map(t => ({
      ...t,
      on: toggleStates[t.key]
    }));
    previewText.textContent = buildPrivacyPreview(currentToggles);

    // Show feedback toast
    const toggleDef = privacyToggles.find(t => t.key === key);
    const action = toggleStates[key] ? 'enabled' : 'disabled';
    store.addToast(`${toggleDef.label} — ${action}`, 'info', 3000);
  });

  // ─── SOS Button ───
  const sosBtn = container.querySelector('#sos-btn');
  const sosModal = container.querySelector('#sos-modal');
  const sosConfirm = container.querySelector('#sos-confirm');
  const sosCancel = container.querySelector('#sos-cancel');

  function openSOSModal() {
    sosModal.classList.add('active');
  }

  function closeSOSModal() {
    sosModal.classList.remove('active');
  }

  sosBtn.addEventListener('click', openSOSModal);

  sosCancel.addEventListener('click', closeSOSModal);

  sosConfirm.addEventListener('click', () => {
    closeSOSModal();
    store.triggerSOS();
  });

  // Close modal on overlay click
  sosModal.addEventListener('click', (e) => {
    if (e.target === sosModal) closeSOSModal();
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sosModal.classList.contains('active')) {
      closeSOSModal();
    }
  });

  // ───────────────────────────────────
  // REAL-TIME SIMULATION SUBSCRIBERS
  // ───────────────────────────────────

  // ─── Scanning Overlay Subscription ───
  const unsubScanning = store.subscribe('scanning', (scanning) => {
    const scanOverlay = container.querySelector('#scan-overlay');
    const scanOverlayText = container.querySelector('#scan-overlay-text');
    if (scanOverlay && scanOverlayText) {
      scanOverlay.classList.toggle('active', scanning);
      if (scanning) {
        scanOverlayText.textContent = store.get('scanningMsg') || 'Scanning...';
      }
    }
  });

  // ─── Threat warning Modal Subscription ───
  const unsubThreatPopup = store.subscribe('showThreatPopup', (show) => {
    const threatModal = container.querySelector('#threat-modal');
    if (!threatModal) return;

    if (show) {
      const threat = store.get('activeThreat');
      if (threat) {
        const contentEl = container.querySelector('#threat-modal-content');
        if (contentEl) {
          contentEl.innerHTML = `
            <div class="threat-detail-block">
              <div class="threat-field-label">Sender / Address</div>
              <div class="threat-field-value" style="font-weight: var(--weight-semibold); color: var(--accent-coral); text-align: left;">${threat.sender}</div>
            </div>
            ${threat.subject ? `
              <div class="threat-detail-block">
                <div class="threat-field-label">Subject Line</div>
                <div class="threat-field-value" style="font-style: italic; text-align: left;">"${threat.subject}"</div>
              </div>
            ` : ''}
            <div class="threat-detail-block">
              <div class="threat-field-label">Message Preview</div>
              <div class="threat-field-value" style="color: var(--text-secondary); opacity: 0.85; text-align: left;">"${threat.rawContent}"</div>
            </div>
            <div class="threat-detail-block" style="background: rgba(255, 95, 109, 0.03);">
              <div class="threat-field-label">🛡️ Trust Score Reputation: ${threat.senderTrust}/100</div>
              <div class="threat-red-flags-list" style="margin-top: var(--space-2);">
                ${threat.indicators.map(ind => `
                  <div class="threat-flag-pill">
                    🚩 ${ind}
                  </div>
                `).join('')}
              </div>
              <p style="font-size: 11px; color: var(--text-muted); margin-top: var(--space-3); text-align: left; line-height: var(--leading-normal);">
                💡 Tapping "Block Sender" will quarantine this contact and notify your caregiver anonymously.
              </p>
            </div>
          `;
        }
        threatModal.classList.add('active');
      }
    } else {
      threatModal.classList.remove('active');
    }
  });

  // Threat Popup Actions
  const blockThreatBtn = container.querySelector('#threat-block-btn');
  const trustThreatBtn = container.querySelector('#threat-trust-btn');

  if (blockThreatBtn) {
    blockThreatBtn.addEventListener('click', () => {
      const threat = store.get('activeThreat');
      if (threat) {
        // Prepend a blocked activity item
        const listEl = container.querySelector('.activity-list');
        if (listEl) {
          const item = document.createElement('div');
          item.className = 'activity-item';
          item.innerHTML = `
            <div class="activity-icon blocked">🚫</div>
            <div class="activity-body">
              <div class="activity-text">Blocked threat from ${threat.sender}</div>
              <div class="activity-time">Just now</div>
            </div>
            <div class="activity-trust">
              <span class="trust-score trust-low">🛡️ ${threat.senderTrust}/100</span>
            </div>
          `;
          listEl.insertBefore(item, listEl.firstChild);
        }
      }
      store.blockActiveThreat();
    });
  }

  if (trustThreatBtn) {
    trustThreatBtn.addEventListener('click', () => {
      store.set('showThreatPopup', false);
      store.addToast("Sender approved. We'll monitor for further pattern shifts.", 'info', 3500);
    });
  }

  // ─── Interactive Richard Hearts SMS Chat Panel ───
  const activityList = container.querySelector('.activity-list');
  const chatModal = container.querySelector('#chat-modal');
  const chatClose = container.querySelector('#chat-close-btn');

  if (activityList && chatModal) {
    activityList.addEventListener('click', (e) => {
      const item = e.target.closest('.activity-item');
      if (!item) return;

      const textEl = item.querySelector('.activity-text');
      if (textEl && textEl.textContent.includes('Richard Hearts')) {
        chatModal.classList.add('active');
      }
    });
  }

  if (chatClose && chatModal) {
    chatClose.addEventListener('click', () => {
      chatModal.classList.remove('active');
    });
    chatModal.addEventListener('click', (e) => {
      if (e.target === chatModal) chatModal.classList.remove('active');
    });
  }

  // Messaging in Chat Modal
  const chatSendBtn = container.querySelector('#chat-send-btn');
  const chatInput = container.querySelector('#chat-input');
  const chatMessages = container.querySelector('#chat-messages');

  function sendChatMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Add user message bubble
    const userMsg = document.createElement('div');
    userMsg.style.cssText = `
      align-self: flex-end;
      background: var(--accent-mint);
      color: var(--text-inverse);
      padding: var(--space-3) var(--space-4);
      border-radius: var(--radius-lg);
      border-bottom-right-radius: 0;
      max-width: 80%;
      box-shadow: var(--shadow-sm);
      text-align: left;
    `;
    userMsg.innerHTML = `
      <div style="font-size: 10px; opacity: 0.8; margin-bottom: 2px;">You • Just now</div>
      <div style="font-size: var(--text-sm); line-height: var(--leading-normal);">${text}</div>
    `;
    chatMessages.appendChild(userMsg);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Trigger safety Reply Coach modal interceptor after 1s delay
    setTimeout(() => {
      const replyCoachModal = container.querySelector('#reply-coach-modal');
      if (replyCoachModal) {
        replyCoachModal.classList.add('active');
        store.triggerReplyCoach(true);
      }
    }, 1000);
  }

  if (chatSendBtn && chatInput) {
    chatSendBtn.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendChatMessage();
    });
  }

  // Reply Coach Actions
  const coachModal = container.querySelector('#reply-coach-modal');
  const askSarahBtn = container.querySelector('#coach-ask-sarah');
  const blockRichardBtn = container.querySelector('#coach-block-richard');
  const replyAnywayBtn = container.querySelector('#coach-reply-anyway');

  if (askSarahBtn) {
    askSarahBtn.addEventListener('click', () => {
      coachModal.classList.remove('active');
      chatModal.classList.remove('active');
      store.triggerReplyCoach(false);
      store.addToast("Sarah has been asked for advice. We've paused this conversation for safety. 🔒", 'success', 5000);

      // Prepend an activity timeline item
      const listEl = container.querySelector('.activity-list');
      if (listEl) {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
          <div class="activity-icon warning">⚠️</div>
          <div class="activity-body">
            <div class="activity-text">Asked Sarah for advice regarding Richard Hearts</div>
            <div class="activity-time">Just now</div>
          </div>
          <div class="activity-trust">
            <span class="trust-score trust-medium">🛡️ 23/100</span>
          </div>
        `;
        listEl.insertBefore(item, listEl.firstChild);
      }

      // Increment caregivers indicators in store
      store.set('riskScore', Math.max(10, store.get('riskScore') - 2));
    });
  }

  if (blockRichardBtn) {
    blockRichardBtn.addEventListener('click', () => {
      coachModal.classList.remove('active');
      chatModal.classList.remove('active');
      store.triggerReplyCoach(false);

      // Prepend blocked activity timeline item
      const listEl = container.querySelector('.activity-list');
      if (listEl) {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
          <div class="activity-icon blocked">🚫</div>
          <div class="activity-body">
            <div class="activity-text">Blocked suspicious contact: Richard Hearts</div>
            <div class="activity-time">Just now</div>
          </div>
          <div class="activity-trust">
            <span class="trust-score trust-low">🛡️ 19/100</span>
          </div>
        `;
        listEl.insertBefore(item, listEl.firstChild);
      }

      store.set('threatsBlocked', store.get('threatsBlocked') + 1);
      store.set('riskScore', Math.max(10, store.get('riskScore') - 5));

      // Append alert for caregiver dashboard
      const alert = {
        id: 'alert-' + Date.now(),
        text: `Blocked romance scam contact Richard Hearts`,
        time: 'Just now',
        severity: 'high',
        threat: { type: 'romance', sender: 'richard.hearts@gmail.com', redactedSummary: 'Romance scam patterns flagged' }
      };
      store.set('liveAlerts', [alert, ...store.get('liveAlerts')]);

      store.addToast('Contact Blocked. Richard Hearts can no longer message you. 🛡️', 'success', 4000);
    });
  }

  if (replyAnywayBtn) {
    replyAnywayBtn.addEventListener('click', () => {
      coachModal.classList.remove('active');
      store.triggerReplyCoach(false);
      store.addToast('Reply sent. Remember to never share personal or financial details. ⚠️', 'warning', 5000);

      // Add Richard Heart response after 3 seconds
      setTimeout(() => {
        const msg = document.createElement('div');
        msg.style.cssText = `
          align-self: flex-start;
          background: #FFF;
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-lg);
          border-bottom-left-radius: 0;
          max-width: 80%;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-subtle);
          text-align: left;
        `;
        msg.innerHTML = `
          <div style="font-size: var(--text-xs); color: var(--text-muted); margin-bottom: var(--space-1);">Richard • Just now</div>
          <div style="font-size: var(--text-sm); color: #333; line-height: var(--leading-normal);">
            Thank you my dear. I knew I could trust you. Can you go purchase the gift cards now? Sarah doesn't need to know...
          </div>
        `;
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        store.addToast("⚠️ Flagged: Sender continues to request secrecy and financial aid.", 'error', 5000);
      }, 3000);
    });
  }

  // Cleanup subscribers when view is destroyed
  container.addEventListener('DOMNodeRemoved', (e) => {
    if (e.target === container.firstElementChild) {
      unsubScanning();
      unsubThreatPopup();
    }
  });
}
