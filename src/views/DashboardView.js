/* ============================================
   GUARDLI — DASHBOARD VIEW (Caregiver)
   Dark. Data-rich. Command center.
   ============================================ */

import { store } from '../store.js';
import {
  threats,
  contacts,
  scamSchoolProgress,
  heatmapData,
  autonomyState,
  weeklyDigest,
  timelineEvents,
  auditLog,
  timeAgo,
  getSeverityClass,
  getTrustLevel,
  getChannelIcon,
  getThreatTypeLabel
} from '../data/mockData.js';

/* ─── Constants ─── */
const NAV_ITEMS = [
  { section: 'MONITORING', items: [
    { id: 'overview', icon: '📊', label: 'Overview' },
    { id: 'threats', icon: '🚨', label: 'Threats' },
    { id: 'timeline', icon: '📅', label: 'Timeline' },
    { id: 'heatmap', icon: '🗺️', label: 'Heat Map' }
  ]},
  { section: 'INSIGHTS', items: [
    { id: 'school', icon: '🎓', label: 'Scam School' },
    { id: 'digest', icon: '📬', label: 'Weekly Digest' }
  ]},
  { section: 'SETTINGS', items: [
    { id: 'audit', icon: '🔒', label: 'Privacy Audit' }
  ]}
];

function getSectionTitles() {
  const senior = store.get('seniorName');
  return {
    overview: { title: 'Dashboard Overview', subtitle: `Real-time protection status for ${senior}` },
    threats: { title: 'Threat Intelligence', subtitle: 'All detected threats and risk signals' },
    timeline: { title: 'Activity Timeline', subtitle: 'Everything that happened today' },
    heatmap: { title: 'Scam Heat Map', subtitle: 'Real-time geographic threat intelligence' },
    school: { title: 'Scam School Progress', subtitle: `How ${senior}'s learning to spot scams` },
    digest: { title: 'Weekly Digest — May 19–25', subtitle: 'Your family protection summary' },
    audit: { title: 'Privacy Audit', subtitle: "Transparency into what you can see" }
  };
}

const HEATMAP_COLORS = {
  phishing: '#4FC3F7',
  techSupport: '#FFB547',
  romance: '#FF6B9D',
  financial: '#FF5F6D'
};

const THREAT_TYPE_ICONS = {
  phishing: '🎣',
  sms_scam: '💬',
  tech_support: '🖥️',
  romance: '💔',
  lottery: '🎰'
};

/* ─── Shield SVG ─── */
const SHIELD_SVG = `<svg viewBox="0 0 24 28" fill="none">
  <path d="M12 0L0 5v8c0 8.4 5.1 16.2 12 19 6.9-2.8 12-10.6 12-19V5L12 0z" fill="currentColor" opacity="0.85"/>
  <path d="M12 2.5L2 6.5v6.5c0 7.2 4.4 13.8 10 16.3 5.6-2.5 10-9.1 10-16.3V6.5L12 2.5z" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.4"/>
</svg>`;

/* ─── Utility ─── */
function truncate(str, len = 55) {
  return str.length > len ? str.slice(0, len) + '…' : str;
}

function animateCounter(el, target, duration = 1200) {
  const isNum = typeof target === 'number';
  const end = isNum ? target : parseInt(target, 10);
  if (isNaN(end)) { el.textContent = target; return; }
  const prefix = isNum ? '' : target.replace(/[\d]+/, '');
  const start = 0;
  const startTime = performance.now();
  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (end - start) * eased);
    el.textContent = prefix ? prefix.replace(/^(\D*)/, `$1`) + current : current;
    if (isNum) {
      el.textContent = current;
    } else {
      el.textContent = target.replace(/[\d]+/, current);
    }
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function observeAnimations(root) {
  const els = root.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('is-visible');
          entry.target.classList.add('animate-in');
        }, Number(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => observer.observe(el));
}

/* ─── Sidebar HTML ─── */
function buildSidebar(activeSection) {
  let navHTML = '';
  NAV_ITEMS.forEach(group => {
    navHTML += `<div class="dash-nav-section">${group.section}</div>`;
    group.items.forEach(item => {
      const active = item.id === activeSection ? ' active' : '';
      navHTML += `
        <div class="dash-nav-item${active}" data-section="${item.id}">
          <span class="nav-icon">${item.icon}</span>
          ${item.label}
        </div>`;
    });
  });

  return `
    <aside class="dash-sidebar">
      <div class="dash-sidebar-logo">
        ${SHIELD_SVG}
        Guardli
      </div>
      <nav class="dash-nav">
        ${navHTML}
      </nav>
      <div class="user-card">
        <div class="user-avatar">👩‍🦳</div>
        <div class="user-info">
          <div class="user-name">Mom (${store.get('seniorName')})</div>
          <div class="user-status">
            <span class="user-status-dot"></span>
            Protected • Level ${autonomyState.currentLevel}
          </div>
        </div>
      </div>
    </aside>`;
}

/* ─── Header HTML ─── */
function buildHeader(section) {
  const senior = store.get('seniorName');
  let title = 'Dashboard Overview';
  let subtitle = `Real-time protection status for ${senior}`;

  switch (section) {
    case 'overview':
      title = 'Dashboard Overview';
      subtitle = `Real-time protection status for ${senior}`;
      break;
    case 'threats':
      title = 'Threat Intelligence';
      subtitle = 'All detected threats and risk signals';
      break;
    case 'timeline':
      title = 'Activity Timeline';
      subtitle = 'Everything that happened today';
      break;
    case 'heatmap':
      title = 'Scam Heat Map';
      subtitle = 'Real-time geographic threat intelligence';
      break;
    case 'school':
      title = 'Scam School Progress';
      subtitle = `How ${senior}'s learning to spot scams`;
      break;
    case 'digest':
      title = 'Weekly Digest — May 19–25';
      subtitle = 'Your family protection summary';
      break;
    case 'audit':
      title = 'Privacy Audit';
      subtitle = 'Transparency into what you can see';
      break;
  }

  return `
    <div class="dash-header">
      <div>
        <h1 class="dash-title">${title}</h1>
        <p class="dash-subtitle">${subtitle}</p>
      </div>
      <div class="dash-header-actions">
        <div class="notification-bell" data-action="bell">
          🔔
          <span class="notification-dot"></span>
        </div>
      </div>
    </div>`;
}

/* ─── Section: Overview ─── */
function buildOverview() {
  const liveAlerts = store.get('liveAlerts') || [];
  
  // Merge live triggered threats with mock threats database
  const topThreats = [
    ...liveAlerts.map(la => la.threat),
    ...threats.filter(t => t.severity !== 'low')
  ].slice(0, 4);

  // Merge live triggered warnings into the recent timeline list
  const recentTimeline = [
    ...liveAlerts.map(la => ({
      time: la.time,
      text: la.text,
      detail: `Severity: ${la.severity.toUpperCase()}`,
      severity: getSeverityClass(la.severity),
      icon: la.threat.type === 'romance' ? '💔' : la.threat.type === 'phishing' ? '🎣' : '🚫'
    })),
    ...timelineEvents
  ].slice(0, 5);

  const circumference = 2 * Math.PI * 65;
  const riskScore = store.get('riskScore');
  const offset = circumference - (circumference * riskScore / 100);

  return `
    <!-- Metrics Grid -->
    <div class="metrics-grid">
      <div class="card metric-card" data-animate data-delay="0">
        <div class="metric-icon mint">🛡️</div>
        <div class="metric-value" data-counter="${store.get('threatsBlocked')}">0</div>
        <div class="metric-label">THREATS BLOCKED</div>
        <div class="metric-change positive">+2 this week</div>
      </div>
      <div class="card metric-card" data-animate data-delay="80">
        <div class="metric-icon sky">📧</div>
        <div class="metric-value" data-counter="${store.get('messagesScanned')}">0</div>
        <div class="metric-label">MESSAGES SCANNED</div>
        <div class="metric-change positive">Today</div>
      </div>
      <div class="card metric-card" data-animate data-delay="160">
        <div class="metric-icon amber">🔥</div>
        <div class="metric-value" data-counter="${store.get('schoolStreak')}">0</div>
        <div class="metric-label">SCHOOL STREAK</div>
        <div class="metric-change positive">86% accuracy</div>
      </div>
      <div class="card metric-card" data-animate data-delay="240">
        <div class="metric-icon mint">📈</div>
        <div class="metric-value" data-counter-text="Lvl 3">—</div>
        <div class="metric-label">AUTONOMY</div>
        <div class="metric-change positive">Confident</div>
      </div>
    </div>

    <!-- Two-column grid -->
    <div class="dash-grid">
      <!-- Risk Gauge -->
      <div class="dash-section card" data-animate data-delay="300">
        <div class="dash-section-header">
          <div class="dash-section-title">📉 Risk Score</div>
        </div>
        <div class="risk-gauge">
          <div class="risk-gauge-circle">
            <svg class="risk-gauge-svg" viewBox="0 0 160 160">
              <circle class="risk-gauge-bg" cx="80" cy="80" r="65"></circle>
              <circle class="risk-gauge-fill" cx="80" cy="80" r="65"
                stroke="var(--accent-mint)"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${circumference}"
                data-target-offset="${offset}">
              </circle>
            </svg>
            <div class="risk-gauge-value">
              <span class="risk-gauge-number" data-counter="${riskScore}">0</span>
              <span class="risk-gauge-label">RISK SCORE</span>
            </div>
          </div>
          <div style="color: var(--accent-mint); font-size: var(--text-sm); text-align: center;">
            Down from 31 last week ↓
          </div>
        </div>
      </div>

      <!-- Recent Threats -->
      <div class="dash-section card" data-animate data-delay="380">
        <div class="dash-section-header">
          <div class="dash-section-title">🚨 Recent Threats</div>
          <span class="dash-section-action" data-goto="threats">View All →</span>
        </div>
        <div class="threat-list">
          ${topThreats.map(t => {
            const sevClass = getSeverityClass(t.severity);
            const icon = THREAT_TYPE_ICONS[t.type] || '⚠️';
            return `
            <div class="threat-item">
              <div class="threat-type-icon ${sevClass}" style="background: var(--accent-${sevClass}-dim);">
                ${icon}
              </div>
              <div class="threat-info">
                <div class="threat-title">${truncate(t.redactedSummary)}</div>
                <div class="threat-meta">
                  <span class="threat-channel">${getChannelIcon(t.channel)} ${getThreatTypeLabel(t.type)}</span>
                  <span>${t.timestamp instanceof Date ? timeAgo(t.timestamp) : t.timestamp}</span>
                </div>
              </div>
              <span class="badge badge-${sevClass}">${t.severity}</span>
              ${t.communityReports > 0 ? `<span class="threat-community">👥 ${t.communityReports.toLocaleString()}</span>` : ''}
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>

    <!-- Activity Timeline Preview -->
    <div class="dash-section card dash-grid-full" data-animate data-delay="460" style="margin-bottom: var(--space-8);">
      <div class="dash-section-header">
        <div class="dash-section-title">📅 Activity Timeline</div>
        <span class="dash-section-action" data-goto="timeline">View All →</span>
      </div>
      <div class="timeline">
        ${recentTimeline.map(ev => `
          <div class="timeline-item">
            <div class="timeline-dot ${ev.severity}"></div>
            <div class="timeline-content">
              <div class="timeline-text">${ev.icon} ${ev.text}</div>
              <div class="timeline-time">${ev.detail} • ${ev.time || 'just now'}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Community Shield -->
    <p style="text-align: center; color: var(--text-muted); font-size: var(--text-sm); padding: var(--space-4) 0;" data-animate data-delay="540">
      Guardli protected <strong style="color: var(--accent-mint);">${heatmapData.totalUsers.toLocaleString()}</strong> users from
      <strong style="color: var(--accent-mint);">${heatmapData.totalThisWeek.toLocaleString()}</strong> scams this week
    </p>`;
}

/* ─── Section: Threats ─── */
function buildThreats(activeFilter = 'all') {
  const filters = ['all', 'email', 'sms', 'browser'];
  const filtered = activeFilter === 'all'
    ? threats
    : threats.filter(t => t.channel === activeFilter);

  return `
    <div style="display: flex; gap: var(--space-2); margin-bottom: var(--space-6); flex-wrap: wrap;">
      ${filters.map(f => `
        <button class="btn btn-sm ${f === activeFilter ? 'btn-primary' : 'btn-ghost'}" data-filter="${f}">
          ${f === 'all' ? '🔍 All' : getChannelIcon(f) + ' ' + f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      `).join('')}
    </div>
    <div class="threat-list">
      ${filtered.map(t => {
        const sevClass = getSeverityClass(t.severity);
        const icon = THREAT_TYPE_ICONS[t.type] || '⚠️';
        const action = t.userAction
          ? `<span class="badge badge-${t.userAction === 'blocked' ? 'high' : t.userAction === 'safe' ? 'low' : 'medium'}">${t.userAction}</span>`
          : '<span class="badge badge-medium">pending</span>';
        return `
        <div class="card" style="margin-bottom: var(--space-3);" data-animate>
          <div class="threat-item" data-threat-id="${t.id}" style="border: none; background: none;">
            <div class="threat-type-icon" style="background: var(--accent-${sevClass}-dim);">
              ${icon}
            </div>
            <div class="threat-info">
              <div class="threat-title" style="white-space: normal;">${t.redactedSummary}</div>
              <div class="threat-meta">
                <span class="threat-channel">${getChannelIcon(t.channel)} ${getThreatTypeLabel(t.type)}</span>
                <span>Risk: ${t.riskScore}/100</span>
                <span>${timeAgo(t.timestamp)}</span>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: var(--space-2);">
              <span class="badge badge-${sevClass}">${t.severity}</span>
              ${action}
            </div>
            ${t.communityReports > 0 ? `<span class="threat-community">👥 ${t.communityReports.toLocaleString()}</span>` : ''}
          </div>
          <div class="threat-detail" id="detail-${t.id}" style="display: none; padding: 0 var(--space-4) var(--space-4);">
            <div style="display: flex; flex-wrap: wrap; gap: var(--space-2); margin-bottom: var(--space-3);">
              ${t.indicators.map(ind => `<span class="badge badge-info">${ind}</span>`).join('')}
            </div>
            <div style="font-size: var(--text-xs); color: var(--text-muted);">
              Sender: <strong style="color: var(--text-secondary);">${t.sender}</strong>
              &nbsp;•&nbsp; Trust Score: <strong style="color: var(--accent-${getSeverityClass(t.senderTrust < 30 ? 'high' : t.senderTrust < 60 ? 'medium' : 'low')});">${t.senderTrust}/100</strong>
            </div>
          </div>
        </div>`;
      }).join('')}
    </div>
    ${filtered.length === 0 ? '<div class="empty-state"><div class="empty-state-icon">✅</div><div class="empty-state-text">No threats in this channel. All clear.</div></div>' : ''}`;
}

/* ─── Section: Timeline ─── */
function buildTimeline() {
  return `
    <div class="timeline" data-animate>
      ${timelineEvents.map((ev, i) => `
        <div class="timeline-item" data-animate data-delay="${i * 60}">
          <div class="timeline-dot ${ev.severity}"></div>
          <div class="timeline-content">
            <div class="timeline-text">${ev.icon} ${ev.text}</div>
            <div class="timeline-time">${ev.detail} • ${ev.time}</div>
          </div>
        </div>
      `).join('')}
    </div>`;
}

/* ─── Section: Heat Map ─── */
function buildHeatmap() {
  const legendItems = [
    { key: 'phishing', label: 'Phishing', color: HEATMAP_COLORS.phishing },
    { key: 'techSupport', label: 'Tech Support', color: HEATMAP_COLORS.techSupport },
    { key: 'romance', label: 'Romance', color: HEATMAP_COLORS.romance },
    { key: 'financial', label: 'Financial', color: HEATMAP_COLORS.financial }
  ];

  return `
    <div class="card dash-section" data-animate>
      <div class="heatmap-container">
        <canvas class="heatmap-canvas" id="heatmap-canvas"></canvas>
      </div>
      <div class="heatmap-legend">
        ${legendItems.map(l => `
          <div class="heatmap-legend-item">
            <span class="heatmap-legend-dot" style="background: ${l.color};"></span>
            ${l.label}
          </div>
        `).join('')}
      </div>
    </div>

    <div class="metrics-grid" style="margin-top: var(--space-6);">
      <div class="card metric-card" data-animate data-delay="100">
        <div class="metric-icon coral">🎯</div>
        <div class="metric-value" data-counter="${heatmapData.totalThisWeek}">0</div>
        <div class="metric-label">TOTAL SCAMS</div>
        <div class="metric-change negative">This week</div>
      </div>
      <div class="card metric-card" data-animate data-delay="180">
        <div class="metric-icon amber">📈</div>
        <div class="metric-value" style="font-size: var(--text-2xl);">Romance</div>
        <div class="metric-label">TRENDING TYPE</div>
        <div class="metric-change negative">↑ 340%</div>
      </div>
      <div class="card metric-card" data-animate data-delay="260">
        <div class="metric-icon sky">📍</div>
        <div class="metric-value" style="font-size: var(--text-2xl);">Maharashtra</div>
        <div class="metric-label">TRENDING REGION</div>
        <div class="metric-change negative">Highest volume</div>
      </div>
      <div class="card metric-card" data-animate data-delay="340">
        <div class="metric-icon mint">👥</div>
        <div class="metric-value" data-counter="${heatmapData.totalUsers}">0</div>
        <div class="metric-label">USERS PROTECTED</div>
        <div class="metric-change positive">Network-wide</div>
      </div>
    </div>

    <div class="card dash-section" style="margin-top: var(--space-6);" data-animate data-delay="420">
      <div class="digest-insight">
        <span>💡</span>
        <span>Romance scams are up <strong>340%</strong> in Maharashtra this month. ${store.get('seniorName')}'s area shows elevated risk — consider a conversation about online relationships.</span>
      </div>
    </div>`;
}

/* ─── Section: Scam School ─── */
function buildSchool() {
  const sp = scamSchoolProgress;
  const typeLabels = { phishing: 'Phishing', sms_scam: 'SMS Scams', tech_support: 'Tech Support', romance: 'Romance Scams' };
  const typeColors = { phishing: 'var(--accent-sky)', sms_scam: 'var(--accent-mint)', tech_support: 'var(--accent-amber)', romance: 'var(--accent-coral)' };

  return `
    <div class="school-progress-chart" data-animate>
      <div class="school-progress-item">
        <div class="school-progress-value" data-counter="${sp.accuracy}">0</div>
        <div class="school-progress-label">Accuracy %</div>
      </div>
      <div class="school-progress-item">
        <div class="school-progress-value" data-counter="${sp.currentStreak}">0</div>
        <div class="school-progress-label">Day Streak 🔥</div>
      </div>
      <div class="school-progress-item">
        <div class="school-progress-value">${sp.totalCorrect}/${sp.totalAttempted}</div>
        <div class="school-progress-label">Total Score</div>
      </div>
      <div class="school-progress-item">
        <div class="school-progress-value" style="font-size: var(--text-lg);">${sp.level}</div>
        <div class="school-progress-label">Current Level</div>
      </div>
    </div>

    <!-- Accuracy by Type -->
    <div class="card dash-section" data-animate data-delay="120">
      <div class="dash-section-header">
        <div class="dash-section-title">📊 Accuracy by Scam Type</div>
      </div>
      ${Object.entries(sp.accuracyByType).map(([type, acc]) => `
        <div style="margin-bottom: var(--space-4);">
          <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-2); font-size: var(--text-sm);">
            <span style="color: var(--text-secondary);">${typeLabels[type] || type}</span>
            <span style="color: ${typeColors[type] || 'var(--text-primary)'}; font-weight: var(--weight-semibold);">${acc}%</span>
          </div>
          <div style="height: 6px; background: var(--bg-surface); border-radius: var(--radius-full); overflow: hidden;">
            <div class="accuracy-bar" style="height: 100%; width: 0%; background: ${typeColors[type] || 'var(--accent-mint)'}; border-radius: var(--radius-full); transition: width 1s var(--ease-out);" data-target-width="${acc}%"></div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Badge Gallery -->
    <div class="card dash-section" style="margin-top: var(--space-6);" data-animate data-delay="240">
      <div class="dash-section-header">
        <div class="dash-section-title">🏆 Badge Gallery</div>
      </div>
      <div class="badge-gallery">
        ${sp.badges.map(b => `
          <div class="earned-badge" style="opacity: ${b.earned ? '1' : '0.3'}; ${b.earned ? '' : 'filter: grayscale(1);'}" title="${b.name}${b.earned ? ' — Earned ' + b.date : ' — Not yet earned'}">
            ${b.icon}
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Recommendation -->
    <div class="card dash-section" style="margin-top: var(--space-6);" data-animate data-delay="360">
      <div class="digest-insight">
        <span>💡</span>
        <span>${store.get('seniorName')} struggles with <strong>tech support scams</strong> (78% accuracy) — consider discussing common patterns with her, like fake virus popups and unsolicited phone calls.</span>
      </div>
    </div>`;
}

/* ─── Section: Weekly Digest ─── */
function buildDigest() {
  const wd = weeklyDigest;
  return `
    <div class="card dash-section digest-card" data-animate>
      <div style="font-size: var(--text-lg); color: var(--text-primary); font-weight: var(--weight-semibold); margin-bottom: var(--space-5); font-family: var(--font-display);">
        ${wd.summary}
      </div>

      <div class="digest-section">
        <div class="digest-section-label">🛡️ Protection</div>
        <div class="digest-section-value">
          <strong>${wd.threatsBlocked}</strong> threats blocked out of <strong>${wd.threatsTotal}</strong> suspicious signals.
          That's a ${Math.round((1 - wd.threatsBlocked / wd.threatsTotal) * 100)}% false-positive rate — the AI is learning ${store.get('seniorName')}'s patterns well.
        </div>
      </div>

      <div class="digest-section">
        <div class="digest-section-label">📧 Channels Scanned</div>
        <div class="digest-section-value">
          Email: <strong>${wd.channelsScanned.email}</strong> &nbsp;•&nbsp;
          SMS: <strong>${wd.channelsScanned.sms}</strong> &nbsp;•&nbsp;
          Browser: <strong>${wd.channelsScanned.browser}</strong>
        </div>
      </div>

      <div class="digest-section">
        <div class="digest-section-label">📉 Risk Score</div>
        <div class="digest-section-value">
          Average this week: <strong style="color: var(--accent-mint);">${wd.riskScoreAvg}</strong>
          (down from <span style="color: var(--text-muted);">${wd.riskScorePrev}</span> last week) — trending in the right direction.
        </div>
      </div>

      <div class="digest-section">
        <div class="digest-section-label">🎓 Scam School</div>
        <div class="digest-section-value">
          <strong>${wd.scamSchoolStreak}-day streak</strong> with <strong>${wd.scamSchoolAccuracy}%</strong> accuracy.
          ${wd.newBadges.length > 0 ? `New badge earned: <strong style="color: var(--accent-amber);">${wd.newBadges.join(', ')}</strong> 🎉` : 'No new badges this week.'}
        </div>
      </div>

      <div class="digest-section">
        <div class="digest-section-label">👥 Community</div>
        <div class="digest-section-value">
          The Guardli network blocked <strong>${wd.communityStats.scamsBlockedNetwork.toLocaleString()}</strong> scams
          and detected <strong>${wd.communityStats.newPatternsDetected}</strong> new scam patterns this week,
          protecting <strong>${wd.communityStats.usersProtected.toLocaleString()}</strong> users.
        </div>
      </div>
    </div>

    <!-- Insight -->
    <div class="card dash-section" style="margin-top: var(--space-6);" data-animate data-delay="150">
      <div class="digest-insight">
        <span>⚠️</span>
        <span>${wd.insight}</span>
      </div>
    </div>

    <!-- Share Button -->
    <div style="display: flex; justify-content: center; margin-top: var(--space-6);" data-animate data-delay="250">
      <button class="btn btn-primary btn-lg" data-action="share-digest">
        📤 Send to family members
      </button>
    </div>`;
}

/* ─── Section: Privacy Audit ─── */
function buildAudit() {
  const consentItems = [
    { label: 'Share high-severity threats', key: 'shareHighThreats', value: true },
    { label: 'Share weekly summary', key: 'shareWeeklySummary', value: true },
    { label: 'Share medium-severity threats', key: 'shareMediumThreats', value: false },
    { label: 'Share Scam School progress', key: 'shareScamSchoolProgress', value: true },
    { label: 'Share activity feed', key: 'shareActivityFeed', value: false }
  ];

  const auditTypeIcons = {
    view: '👁️',
    action: '⚡',
    privacy_change: '🔒',
    setting: '⚙️'
  };

  return `
    <!-- Consent Status -->
    <div class="card dash-section" data-animate>
      <div class="dash-section-header">
        <div class="dash-section-title">🔐 ${store.get('seniorName')}'s Sharing Preferences</div>
      </div>
      ${consentItems.map(item => `
        <div class="toggle-wrapper">
          <span class="toggle-label">${item.label}</span>
          <div class="toggle ${item.value ? 'active' : ''}" data-toggle="${item.key}">
            <div class="toggle-knob"></div>
          </div>
        </div>
      `).join('')}
      <div style="font-size: var(--text-xs); color: var(--text-muted); margin-top: var(--space-4);">
        Last updated by ${store.get('seniorName')}: 3 days ago
      </div>
    </div>

    <!-- Audit Log -->
    <div class="card dash-section" style="margin-top: var(--space-6);" data-animate data-delay="150">
      <div class="dash-section-header">
        <div class="dash-section-title">📋 Access Log</div>
      </div>
      <div class="audit-log">
        ${auditLog.map(entry => `
          <div class="audit-entry">
            <span class="audit-time">${entry.time}</span>
            <span class="audit-action">${entry.action}</span>
            <span class="audit-badge">${auditTypeIcons[entry.type] || '📝'}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Autonomy Explanation -->
    <div class="card dash-section" style="margin-top: var(--space-6);" data-animate data-delay="300">
      <div class="dash-section-header">
        <div class="dash-section-title">🎚️ Autonomy Level: ${autonomyState.currentLevel}</div>
      </div>
      <div style="display: flex; flex-direction: column; gap: var(--space-3);">
        ${Object.entries(autonomyState.levelDescriptions).map(([lvl, info]) => {
          const isCurrent = Number(lvl) === autonomyState.currentLevel;
          const isFloor = Number(lvl) === autonomyState.caregiverFloor;
          return `
          <div style="display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3); border-radius: var(--radius-md); ${isCurrent ? 'background: var(--accent-mint-dim); border: 1px solid var(--accent-mint-dim);' : ''}">
            <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: var(--text-sm); font-weight: var(--weight-bold); background: ${isCurrent ? 'var(--accent-mint)' : 'var(--bg-surface)'}; color: ${isCurrent ? 'var(--text-inverse)' : 'var(--text-muted)'};">
              ${lvl}
            </div>
            <div style="flex: 1;">
              <div style="font-size: var(--text-sm); font-weight: var(--weight-semibold); color: ${isCurrent ? 'var(--accent-mint)' : 'var(--text-secondary)'};">
                ${info.name} ${isCurrent ? '← Current' : ''} ${isFloor ? '(caregiver floor)' : ''}
              </div>
              <div style="font-size: var(--text-xs); color: var(--text-muted);">${info.desc}</div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <!-- Privacy Message -->
    <div class="card dash-section" style="margin-top: var(--space-6);" data-animate data-delay="420">
      <div class="digest-insight" style="background: var(--accent-sky-dim); color: var(--accent-sky);">
        <span>🔒</span>
        <span>${store.get('seniorName')} has chosen to share limited detail with you. <strong>This is her right.</strong> Guardli ensures transparency while respecting her autonomy.</span>
      </div>
    </div>

    <!-- Customize Profiles Button -->
    <div class="card dash-section" style="margin-top: var(--space-6); text-align: center;" data-animate data-delay="480">
      <button class="btn btn-ghost" id="open-profile-customizer-dash" style="width: 100%; border: 1px dashed var(--border-subtle); cursor: none;">
        ⚙️ Customize Family Names
      </button>
    </div>`;
}

/* ─── Render section content into main ─── */
function renderMainContent(mainEl, section) {
  const currentFilter = store.get('threatFilter') || 'all';

  let contentHTML = buildHeader(section);

  switch (section) {
    case 'overview': contentHTML += buildOverview(); break;
    case 'threats': contentHTML += buildThreats(currentFilter); break;
    case 'timeline': contentHTML += buildTimeline(); break;
    case 'heatmap': contentHTML += buildHeatmap(); break;
    case 'school': contentHTML += buildSchool(); break;
    case 'digest': contentHTML += buildDigest(); break;
    case 'audit': contentHTML += buildAudit(); break;
    default: contentHTML += buildOverview(); break;
  }

  mainEl.innerHTML = contentHTML;

  // Post-render actions
  attachMainListeners(mainEl, section);
  animateCounters(mainEl);
  animateGauge(mainEl);
  animateAccuracyBars(mainEl);
  observeAnimations(mainEl);

  if (section === 'heatmap') {
    requestAnimationFrame(() => drawHeatmap(mainEl));
  }
}

/* ─── Animate metric counters ─── */
function animateCounters(root) {
  root.querySelectorAll('[data-counter]').forEach(el => {
    const target = el.dataset.counter;
    const num = parseInt(target, 10);
    if (!isNaN(num)) {
      animateCounter(el, num, 1400);
    }
  });
  root.querySelectorAll('[data-counter-text]').forEach(el => {
    const text = el.dataset.counterText;
    setTimeout(() => { el.textContent = text; }, 600);
  });
}

/* ─── Animate risk gauge SVG ─── */
function animateGauge(root) {
  const fill = root.querySelector('.risk-gauge-fill');
  if (!fill) return;
  const targetOffset = fill.dataset.targetOffset;
  requestAnimationFrame(() => {
    setTimeout(() => {
      fill.style.strokeDashoffset = targetOffset;
    }, 300);
  });
}

/* ─── Animate accuracy bars ─── */
function animateAccuracyBars(root) {
  const bars = root.querySelectorAll('.accuracy-bar');
  bars.forEach(bar => {
    const w = bar.dataset.targetWidth;
    requestAnimationFrame(() => {
      setTimeout(() => { bar.style.width = w; }, 400);
    });
  });
}

/* ─── Draw heatmap canvas ─── */
function drawHeatmap(root) {
  const canvas = root.querySelector('#heatmap-canvas');
  if (!canvas) return;

  const container = canvas.parentElement;
  const dpr = window.devicePixelRatio || 1;
  let animationId;

  function renderLoop(time) {
    if (!canvas.isConnected) {
      cancelAnimationFrame(animationId);
      return;
    }

    const rect = container.getBoundingClientRect();
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    }

    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.scale(dpr, dpr);
    const W = rect.width;
    const H = rect.height;

    // Deep rich dark cyber background
    ctx.fillStyle = '#08090D';
    ctx.fillRect(0, 0, W, H);

    // Dynamic grid dots
    for (let gx = 0; gx < W; gx += 25) {
      for (let gy = 0; gy < H; gy += 25) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
        ctx.arc(gx, gy, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Precise India Vector Outline
    const indiaOutline = [
      [0.50, 0.05], // North Kashmir tip
      [0.54, 0.12], // Ladakh east
      [0.53, 0.20], // Himachal / Uttarakhand
      [0.58, 0.25], // Nepal border west
      [0.68, 0.32], // Nepal border east
      [0.72, 0.31], // Sikkim
      [0.76, 0.35], // Bhutan border
      [0.85, 0.30], // Arunachal Pradesh north tip
      [0.92, 0.33], // Arunachal east tip
      [0.90, 0.42], // Nagaland / Manipur
      [0.86, 0.48], // Mizoram
      [0.82, 0.46], // Tripura
      [0.81, 0.41], // Meghalaya / Bangladesh border
      [0.75, 0.43], // West Bengal north / Bangladesh west
      [0.77, 0.51], // West Bengal coast (Ganges Delta)
      [0.70, 0.57], // Odisha coast north
      [0.65, 0.65], // Andhra Pradesh coast north
      [0.58, 0.78], // Chennai / Tamil Nadu coast
      [0.52, 0.95], // Kanyakumari (South tip)
      [0.48, 0.82], // Kerala coast
      [0.43, 0.70], // Karnataka coast (Goa)
      [0.40, 0.58], // Mumbai / Maharashtra coast
      [0.32, 0.55], // Gujarat south coast
      [0.24, 0.54], // Saurashtra peninsula
      [0.20, 0.46], // Kutch peninsula (West tip)
      [0.28, 0.42], // Gujarat-Rajasthan border
      [0.28, 0.30], // Rajasthan west border
      [0.34, 0.22], // Punjab border
      [0.42, 0.18], // Jammu border west
      [0.44, 0.08]  // Jammu north
    ];

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 229, 160, 0.15)'; // glowing cyber green
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(0, 229, 160, 0.3)';

    indiaOutline.forEach(([px, py], i) => {
      const x = px * W, y = py * H;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.stroke();

    // Subtle grid neon scanlines
    ctx.shadowBlur = 0; // reset shadow
    ctx.fillStyle = 'rgba(0, 229, 160, 0.02)';
    ctx.fill();

    // Pulses and Radar sweep wave
    const scanY = (time * 0.08) % H;
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 229, 160, 0.08)';
    ctx.lineWidth = 2;
    ctx.moveTo(0, scanY);
    ctx.lineTo(W, scanY);
    ctx.stroke();

    // Glowing laser scanner blur
    const scanGrad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 2);
    scanGrad.addColorStop(0, 'rgba(0, 229, 160, 0)');
    scanGrad.addColorStop(1, 'rgba(0, 229, 160, 0.04)');
    ctx.fillStyle = scanGrad;
    ctx.fillRect(0, scanY - 30, W, 30);

    // Draw region hotspots
    heatmapData.regions.forEach(region => {
      const cx = (region.x / 100) * W;
      const cy = (region.y / 100) * H;
      const total = region.phishing + region.techSupport + region.romance + region.financial;

      // Pulsing multiplier using time
      const pulse = 1 + 0.15 * Math.sin(time * 0.005 + region.x);
      
      const types = [
        { key: 'phishing', val: region.phishing, color: HEATMAP_COLORS.phishing },
        { key: 'techSupport', val: region.techSupport, color: HEATMAP_COLORS.techSupport },
        { key: 'romance', val: region.romance, color: HEATMAP_COLORS.romance },
        { key: 'financial', val: region.financial, color: HEATMAP_COLORS.financial }
      ];

      // Outer breathing glow
      const baseRadius = Math.max(12, total / 80) * pulse;
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseRadius * 2.5);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(cx, cy, baseRadius * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Draw radar ripple rings
      const rippleRadius = (time * 0.03 + region.x * 5) % (baseRadius * 3);
      const rippleOpacity = 1 - rippleRadius / (baseRadius * 3);
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 255, 255, ${rippleOpacity * 0.08})`;
      ctx.lineWidth = 1;
      ctx.arc(cx, cy, rippleRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Type-colored circles (mini clusters)
      let angleOffset = time * 0.0004 + region.y; // spin clusters slowly
      types.forEach(t => {
        const r = Math.max(4, t.val / 100) * pulse;
        const intensity = Math.min(0.7, t.val / 1500);
        const ox = Math.cos(angleOffset) * 6;
        const oy = Math.sin(angleOffset) * 6;

        const grad = ctx.createRadialGradient(cx + ox, cy + oy, 0, cx + ox, cy + oy, r);
        grad.addColorStop(0, t.color + Math.round(intensity * 255).toString(16).padStart(2, '0'));
        grad.addColorStop(1, t.color + '00');
        ctx.beginPath();
        ctx.fillStyle = grad;
        ctx.arc(cx + ox, cy + oy, r, 0, Math.PI * 2);
        ctx.fill();

        angleOffset += Math.PI / 2;
      });

      // Region label (subtle glass tag)
      ctx.fillStyle = 'rgba(232, 232, 236, 0.75)';
      ctx.font = '500 10px "Inter", system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.shadowBlur = 4;
      ctx.shadowColor = 'rgba(0,0,0,0.8)';
      ctx.fillText(region.name, cx, cy + baseRadius + 14);
      ctx.shadowBlur = 0; // reset
    });

    ctx.restore();
    animationId = requestAnimationFrame(renderLoop);
  }

  animationId = requestAnimationFrame(renderLoop);
}

/* ─── Attach listeners for main content area ─── */
function attachMainListeners(mainEl, section) {
  // "View All" links
  mainEl.querySelectorAll('[data-goto]').forEach(el => {
    el.addEventListener('click', () => {
      const target = el.dataset.goto;
      store.set('dashSection', target);
    });
  });

  // Notification bell
  mainEl.querySelectorAll('[data-action="bell"]').forEach(el => {
    el.addEventListener('click', () => {
      store.addToast('No new notifications', 'info', 3000);
    });
  });

  // Threat filters (threats section)
  if (section === 'threats') {
    mainEl.querySelectorAll('[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        store.set('threatFilter', btn.dataset.filter);
        renderMainContent(mainEl, 'threats');
      });
    });

    // Expandable threat details
    mainEl.querySelectorAll('[data-threat-id]').forEach(item => {
      item.addEventListener('click', () => {
        const detailEl = mainEl.querySelector(`#detail-${item.dataset.threatId}`);
        if (detailEl) {
          const isVisible = detailEl.style.display !== 'none';
          detailEl.style.display = isVisible ? 'none' : 'block';
        }
      });
    });
  }

  // Toggles (audit section)
  if (section === 'audit') {
    mainEl.querySelectorAll('[data-toggle]').forEach(toggle => {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        const key = toggle.dataset.toggle;
        const isActive = toggle.classList.contains('active');
        store.addToast(
          isActive ? `Sharing enabled: ${key}` : `Sharing disabled: ${key}`,
          'info',
          2500
        );
      });
    });

    const customizerBtn = mainEl.querySelector('#open-profile-customizer-dash');
    if (customizerBtn) {
      customizerBtn.addEventListener('click', () => {
        const modal = document.querySelector('#guardli-onboarding-modal');
        if (modal) modal.classList.add('active');
      });
    }
  }

  // Share digest button
  mainEl.querySelectorAll('[data-action="share-digest"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const c1 = store.get('caregiver1Name');
      const c2 = store.get('caregiver2Name');
      store.addToast(`Weekly digest sent to ${c1} and ${c2} ✉️`, 'info', 4000);
      btn.textContent = '✅ Sent!';
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-ghost');
      setTimeout(() => {
        btn.innerHTML = '📤 Send to family members';
        btn.classList.remove('btn-ghost');
        btn.classList.add('btn-primary');
      }, 3000);
    });
  });
}

/* ─── Main render ─── */
/* ─── Main render ─── */
export function render(container) {
  const currentSection = store.get('dashSection') || 'overview';

  container.innerHTML = `
    <div class="dashboard-view" style="position: relative;">
      <!-- Flashing Red SOS Alert Banner -->
      <div class="sos-alert-banner" id="sos-alert-banner">
        <div class="sos-alert-pulse"></div>
        <div class="sos-alert-text">🚨 EMERGENCY PANIC ACTIVE: ${store.get('seniorName')} triggered the SOS alert! ${store.get('caregiver1Name')} and ${store.get('caregiver2Name')} have been notified.</div>
        <button class="btn btn-sm btn-danger" id="sos-resolve-btn" style="cursor: none; margin-left: var(--space-4);">Clear Emergency</button>
      </div>

      ${buildSidebar(currentSection)}
      <main class="dash-main" id="dash-main-content"></main>
    </div>`;

  const mainEl = container.querySelector('#dash-main-content');
  renderMainContent(mainEl, currentSection);

  // Sidebar nav click handlers
  container.querySelectorAll('.dash-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const section = item.dataset.section;
      if (!section) return;

      // Update active state visually
      container.querySelectorAll('.dash-nav-item').forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      // Update store and re-render only main content
      store.set('dashSection', section);
      renderMainContent(mainEl, section);
    });
  });

  // Subscribe to store changes for section switching (from "View All" links etc.)
  const unsubDashSection = store.subscribe('dashSection', (newSection) => {
    // Update sidebar active state
    container.querySelectorAll('.dash-nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.section === newSection);
    });
    renderMainContent(mainEl, newSection);
  });

  // ─── Real-Time Sync Subscriptions ───
  
  // SOS Alert banner toggle
  const unsubSOS = store.subscribe('sosActive', (active) => {
    const banner = container.querySelector('#sos-alert-banner');
    if (banner) {
      banner.classList.toggle('active', active);
    }
  });

  // Wire Resolve SOS button click
  const resolveBtn = container.querySelector('#sos-resolve-btn');
  if (resolveBtn) {
    resolveBtn.addEventListener('click', () => {
      store.resetSOS();
    });
  }

  // Redraw dashboard views instantly when threat events or risk scores change
  const unsubAlerts = store.subscribe('liveAlerts', () => {
    const activeSection = store.get('dashSection');
    if (activeSection === 'overview' || activeSection === 'threats' || activeSection === 'timeline') {
      renderMainContent(mainEl, activeSection);
    }
  });

  const unsubBlocked = store.subscribe('threatsBlocked', () => {
    const activeSection = store.get('dashSection');
    if (activeSection === 'overview') {
      renderMainContent(mainEl, 'overview');
    }
  });

  const unsubRisk = store.subscribe('riskScore', () => {
    const activeSection = store.get('dashSection');
    if (activeSection === 'overview') {
      renderMainContent(mainEl, 'overview');
    }
  });

  // Handle window resize for heatmap redraw
  let resizeTimer;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (store.get('dashSection') === 'heatmap') {
        drawHeatmap(mainEl);
      }
    }, 250);
  };
  window.addEventListener('resize', onResize);

  // Sync initial SOS banner status
  if (store.get('sosActive')) {
    const banner = container.querySelector('#sos-alert-banner');
    if (banner) banner.classList.add('active');
  }

  // Cleanup subscribers when view is destroyed
  container.addEventListener('DOMNodeRemoved', (e) => {
    if (e.target === container.firstElementChild) {
      unsubDashSection();
      unsubSOS();
      unsubAlerts();
      unsubBlocked();
      unsubRisk();
      window.removeEventListener('resize', onResize);
    }
  });
}
