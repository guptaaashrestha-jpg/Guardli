/* ============================================
   GUARDLI — REACTIVE STORE
   Simple pub/sub state management.
   No frameworks. Just signals.
   ============================================ */

class Store {
  constructor() {
    this.state = {
      currentView: 'shield',     // 'shield' | 'dashboard'
      dashSection: 'overview',   // active dashboard section
      shieldSection: 'home',     // active shield section
      showThreatPopup: false,
      activeThreat: null,
      showSOS: false,
      showReplyCoach: false,
      toasts: [],
      sosActive: false,
      scamSchoolActive: false,
      scamSchoolScore: null,
      // Dynamic simulated stats
      threatsBlocked: 4,
      messagesScanned: 279,
      schoolStreak: 7,
      riskScore: 23,
      liveAlerts: [], // Array of live threats that care giver should see
      scanning: false,
      scanningMsg: ''
    };
    this.listeners = new Map();
    this.nextToastId = 0;
  }

  get(key) {
    return this.state[key];
  }

  set(key, value) {
    const old = this.state[key];
    this.state[key] = value;
    if (old !== value) {
      this._notify(key, value, old);
    }
  }

  subscribe(key, callback) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key).add(callback);
    return () => this.listeners.get(key)?.delete(callback);
  }

  _notify(key, value, old) {
    this.listeners.get(key)?.forEach(cb => cb(value, old));
  }

  // Toast system
  addToast(text, type = 'info', duration = 4000) {
    const id = ++this.nextToastId;
    const toast = { id, text, type };
    this.state.toasts = [...this.state.toasts, toast];
    this._notify('toasts', this.state.toasts);
    setTimeout(() => this.removeToast(id), duration);
    return id;
  }

  removeToast(id) {
    this.state.toasts = this.state.toasts.filter(t => t.id !== id);
    this._notify('toasts', this.state.toasts);
  }

  // ─── Real-Time Simulation Engine Actions ───
  triggerThreat(threatObj) {
    this.set('scanning', true);
    this.set('scanningMsg', `Checking incoming ${threatObj.channel === 'email' ? 'email' : threatObj.channel === 'sms' ? 'SMS' : 'link'} reputation...`);
    this.set('activeThreat', threatObj);
    
    setTimeout(() => {
      this.set('scanning', false);
      this.set('showThreatPopup', true);
      this.set('messagesScanned', this.state.messagesScanned + 1);
    }, 2000);
  }

  blockActiveThreat() {
    const threat = this.state.activeThreat;
    if (!threat) return;

    this.set('showThreatPopup', false);
    this.set('threatsBlocked', this.state.threatsBlocked + 1);
    this.set('riskScore', Math.max(10, this.state.riskScore - 3)); // reduce risk

    // Add to live alerts for caregiver dashboard
    const alert = {
      id: 'alert-' + Date.now(),
      text: `Blocked a dangerous ${threat.type === 'phishing' ? 'email' : threat.type === 'sms_scam' ? 'SMS' : 'website'} from ${threat.sender}`,
      time: 'Just now',
      severity: threat.severity,
      threat: threat
    };
    this.set('liveAlerts', [alert, ...this.state.liveAlerts]);

    this.addToast('Shield Active! We kept you safe. 🛡️ (+10 XP)', 'success', 4000);

    // Dispatch real-world email alert!
    this.dispatchRealEmailAlert(
      '🛡️ Scam Threat Blocked',
      `Guardli successfully blocked a high-risk ${threat.type.toUpperCase()} scam attempt from ${threat.sender} directed at Shikha.`
    );

    this.set('activeThreat', null);
  }

  triggerSOS() {
    this.set('sosActive', true);
    this.addToast('Help is on the way. Shrestha and Shikhar have been notified. 🚨', 'warning', 6000);

    // Dispatch real-world SOS panic email alert!
    this.dispatchRealEmailAlert(
      '🚨 SOS PANIC EMERGENCY',
      `Shikha has triggered the SOS Emergency Button on her Guardli Shield interface! Shrestha and Shikhar have been designated as contacts.`
    );
  }

  resetSOS() {
    this.set('sosActive', false);
    this.addToast('SOS emergency cleared.', 'info', 3000);

    this.dispatchRealEmailAlert(
      '✅ SOS Emergency Resolved',
      `The SOS panic state has been marked as resolved by the caregiver dashboard.`
    );
  }

  triggerReplyCoach(active) {
    this.set('showReplyCoach', active);

    if (active) {
      // Dispatch real-world Reply Coach email warning!
      this.dispatchRealEmailAlert(
        '⚠️ Conversation Reply Coached',
        `Guardli intervened with real-time Reply Coaching before Shikha could reply to unverified romance scam contact: richard.hearts@gmail.com.`
      );
    }
  }

  // ─── Real-World Email Dispatcher (EmailJS) ───
  dispatchRealEmailAlert(alertType, messageText) {
    // =========================================================================
    // ⚙️ COPY-PASTE YOUR FREE KEYS FROM EMAILJS HERE:
    // =========================================================================
    const SERVICE_ID = 'service_sg112129';
    const TEMPLATE_ID = 'template_csd548m';
    const PUBLIC_KEY = '7SOYCA-8bDj-Bnnx7';
    // =========================================================================

    if (SERVICE_ID === 'YOUR_SERVICE_ID') {
      console.log(`[API Simulation] Email alert would be sent: [${alertType}] - "${messageText}"`);
      return;
    }

    fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        template_params: {
          to_name: 'Caregiver (Shrestha & Shikhar)',
          from_name: 'Guardli Digital Guardian',
          alert_type: alertType,
          message: messageText
        }
      })
    })
    .then(res => {
      if (res.ok) {
        console.log(`✅ Real-world email alert [${alertType}] sent successfully!`);
      } else {
        console.error('❌ EmailJS API returned an error:', res.statusText);
      }
    })
    .catch(err => {
      console.error('❌ EmailJS Fetch Error:', err);
    });
  }
}

export const store = new Store();
