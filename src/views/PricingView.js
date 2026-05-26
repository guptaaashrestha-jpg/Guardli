/* ============================================
   GUARDLI — PRICING VIEW
   Stunning. Premium. Animated.
   Subscription & pricing plans showcase.
   ============================================ */

import { store } from '../store.js';

/* ─── Pricing Data ─── */
const PLANS = [
  {
    id: 'basic',
    name: 'Guardli Basic',
    tagline: 'Essential protection',
    monthlyPrice: 0,
    annualPrice: 0,
    accent: '#4FC3F7',
    accentDim: 'rgba(79, 195, 247, 0.12)',
    accentGlow: 'rgba(79, 195, 247, 0.35)',
    badge: null,
    cta: 'Get Started Free',
    ctaStyle: 'ghost',
    features: [
      'Basic scam detection',
      '1 caregiver',
      '3 SOS alerts/month',
      'Weekly digest',
      'Community alerts'
    ]
  },
  {
    id: 'shield',
    name: 'Guardli Shield',
    tagline: 'Complete protection',
    monthlyPrice: 149,
    annualPrice: 1499,
    accent: '#00E5A0',
    accentDim: 'rgba(0, 229, 160, 0.12)',
    accentGlow: 'rgba(0, 229, 160, 0.4)',
    badge: 'MOST POPULAR',
    cta: 'Start Free Trial',
    ctaStyle: 'primary',
    features: [
      'Everything in Basic',
      'Unlimited caregivers (5)',
      'Real-time AI detection',
      'Live location sharing',
      'Unlimited SOS alerts',
      'Priority support',
      'Threat analytics dashboard',
      'India scam heat map'
    ]
  },
  {
    id: 'family',
    name: 'Guardli Family',
    tagline: 'Full family coverage',
    monthlyPrice: 349,
    annualPrice: 3499,
    accent: '#FFB547',
    accentDim: 'rgba(255, 181, 71, 0.12)',
    accentGlow: 'rgba(255, 181, 71, 0.35)',
    badge: null,
    cta: 'Contact Sales',
    ctaStyle: 'ghost-amber',
    features: [
      'Everything in Shield',
      'Up to 3 seniors',
      'Up to 10 caregivers',
      'Fall detection alerts',
      'Legal helpline access',
      'Insurance discounts',
      'Dedicated family advisor'
    ]
  }
];

const IMPACT_COUNTERS = [
  { icon: '🛡️', value: 2847, label: 'Scams Blocked This Month', suffix: '', prefix: '' },
  { icon: '💰', value: 4.2, label: 'Money Saved for Families', suffix: ' Cr', prefix: '₹', isDecimal: true },
  { icon: '👵', value: 12500, label: 'Protected Seniors', suffix: '+', prefix: '' },
  { icon: '🎯', value: 98.7, label: 'Detection Accuracy', suffix: '%', prefix: '', isDecimal: true }
];

const COMPARISON_FEATURES = [
  { name: 'Scam Detection', basic: 'Basic', shield: 'Advanced AI', family: 'Advanced AI' },
  { name: 'Real-time AI Analysis', basic: false, shield: true, family: true },
  { name: 'Caregivers', basic: '1', shield: '5', family: '10' },
  { name: 'SOS Alerts', basic: '3/month', shield: 'Unlimited', family: 'Unlimited' },
  { name: 'Location Sharing', basic: false, shield: true, family: true },
  { name: 'Scam Heat Map', basic: false, shield: true, family: true },
  { name: 'Threat Analytics', basic: false, shield: true, family: true },
  { name: 'Priority Support', basic: false, shield: true, family: true },
  { name: 'Fall Detection', basic: false, shield: false, family: true },
  { name: 'Legal Helpline', basic: false, shield: false, family: true },
  { name: 'Insurance Discounts', basic: false, shield: false, family: true },
  { name: 'Dedicated Advisor', basic: false, shield: false, family: true }
];

const TESTIMONIALS = [
  {
    avatar: '👩‍🦳',
    name: 'Priya Sharma',
    location: 'Mumbai, Maharashtra',
    quote: 'Guardli Shield saved my mother from a ₹2 lakh phishing scam. The real-time alerts gave us peace of mind we never had before.',
    stars: 5
  },
  {
    avatar: '👨‍🦰',
    name: 'Rajesh Kapoor',
    location: 'Delhi, NCR',
    quote: 'As a son living abroad, the Family plan lets me monitor my parents\' safety. The heat map feature is incredible — truly groundbreaking.',
    stars: 5
  },
  {
    avatar: '👩',
    name: 'Anita Desai',
    location: 'Bengaluru, Karnataka',
    quote: 'My father-in-law was being targeted by tech support scammers. Guardli blocked 4 attempts in the first week itself. Worth every rupee!',
    stars: 5
  }
];

const FAQS = [
  {
    q: 'Is the free plan really free forever?',
    a: 'Yes! Guardli Basic is completely free with no hidden charges. You get essential scam detection, 1 caregiver connection, and 3 SOS alerts per month — no credit card required.'
  },
  {
    q: 'How does the 14-day free trial work?',
    a: 'Start with Guardli Shield or Family risk-free for 14 days. No credit card needed to begin. You\'ll get full access to all premium features, and you can cancel anytime before the trial ends.'
  },
  {
    q: 'Can I cancel my subscription anytime?',
    a: 'Absolutely. There are no lock-in contracts. You can cancel your subscription anytime from your account settings. Your protection continues until the end of your billing cycle.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit/debit cards, UPI, net banking, and popular wallets like Paytm, PhonePe, and Google Pay. Annual plans can also be paid via bank transfer.'
  },
  {
    q: 'Can I protect multiple seniors with one plan?',
    a: 'The Guardli Family plan covers up to 3 seniors and 10 caregivers under a single subscription. For larger families, contact our sales team for custom enterprise pricing.'
  }
];

/* Monthly growth data for the bar chart */
const MONTHLY_GROWTH = [
  { month: 'Jan', value: 40 },
  { month: 'Feb', value: 52 },
  { month: 'Mar', value: 61 },
  { month: 'Apr', value: 73 },
  { month: 'May', value: 89 },
  { month: 'Jun', value: 100 }
];

/* ─── CSS Injection ─── */
const STYLE_ID = 'guardli-pricing-styles';

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    /* ═══════════════════════════════════════════
       PRICING VIEW — ANIMATIONS
       ═══════════════════════════════════════════ */

    @keyframes pv-gradientShimmer {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes pv-shieldPulse {
      0%, 100% { transform: scale(1); filter: drop-shadow(0 0 12px rgba(0,229,160,0.3)); }
      50% { transform: scale(1.08); filter: drop-shadow(0 0 28px rgba(0,229,160,0.55)); }
    }

    @keyframes pv-glowBorder {
      0%, 100% { box-shadow: 0 0 20px rgba(0,229,160,0.15), 0 0 60px rgba(0,229,160,0.05), inset 0 1px 0 rgba(255,255,255,0.05); }
      50% { box-shadow: 0 0 30px rgba(0,229,160,0.3), 0 0 80px rgba(0,229,160,0.1), inset 0 1px 0 rgba(255,255,255,0.08); }
    }

    @keyframes pv-badgePulse {
      0%, 100% { box-shadow: 0 0 8px rgba(0,229,160,0.3); }
      50% { box-shadow: 0 0 20px rgba(0,229,160,0.6); }
    }

    @keyframes pv-fadeUpIn {
      from { opacity: 0; transform: translateY(32px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes pv-fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes pv-slideIn {
      from { opacity: 0; transform: translateX(60px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @keyframes pv-slideOut {
      from { opacity: 1; transform: translateX(0); }
      to { opacity: 0; transform: translateX(-60px); }
    }

    @keyframes pv-floatParticle {
      0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateY(-120vh) translateX(var(--pv-drift, 30px)) scale(0.3); opacity: 0; }
    }

    @keyframes pv-iconRotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(180deg); }
    }

    @keyframes pv-barGrow {
      from { height: 0; }
    }

    @keyframes pv-checkPop {
      0% { transform: scale(0); opacity: 0; }
      60% { transform: scale(1.2); }
      100% { transform: scale(1); opacity: 1; }
    }

    @keyframes pv-toggleSlide {
      from { background-position: 100% 50%; }
      to { background-position: 0% 50%; }
    }

    @keyframes pv-starPop {
      0% { transform: scale(0) rotate(-30deg); opacity: 0; }
      60% { transform: scale(1.3) rotate(5deg); }
      100% { transform: scale(1) rotate(0); opacity: 1; }
    }

    /* ═══════════════════════════════════════════
       PRICING VIEW — LAYOUT
       ═══════════════════════════════════════════ */

    .pricing-view {
      width: 100%;
      min-height: 100vh;
      background: var(--bg-deep);
      color: var(--text-primary);
      font-family: var(--font-body);
      overflow-x: hidden;
      scroll-behavior: smooth;
    }

    .pricing-view *,
    .pricing-view *::before,
    .pricing-view *::after {
      box-sizing: border-box;
    }

    /* Scroll-triggered animation base */
    .pv-animate {
      opacity: 0;
      transform: translateY(32px);
      transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out);
    }
    .pv-animate.pv-visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* ═══════════════════════════════════════════
       SECTION 1: HERO BANNER
       ═══════════════════════════════════════════ */

    .pv-hero {
      text-align: center;
      padding: var(--space-20) var(--space-6) var(--space-16);
      position: relative;
      overflow: hidden;
    }

    .pv-hero::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -25%;
      width: 150%;
      height: 150%;
      background: radial-gradient(ellipse at 50% 20%, rgba(0,229,160,0.06) 0%, transparent 60%),
                  radial-gradient(ellipse at 80% 60%, rgba(79,195,247,0.04) 0%, transparent 50%);
      pointer-events: none;
      z-index: 0;
    }

    .pv-hero-content {
      position: relative;
      z-index: 1;
    }

    .pv-shield-icon {
      width: 72px;
      height: 72px;
      margin: 0 auto var(--space-6);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 42px;
      animation: pv-shieldPulse 3s ease-in-out infinite;
    }

    .pv-hero-title {
      font-family: var(--font-display);
      font-size: clamp(2.2rem, 5vw, 3.75rem);
      font-weight: var(--weight-bold);
      letter-spacing: var(--tracking-tight);
      line-height: var(--leading-tight);
      margin-bottom: var(--space-4);
      background: linear-gradient(135deg, #00E5A0, #4FC3F7, #FFB547, #00E5A0);
      background-size: 300% 300%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: pv-gradientShimmer 6s ease infinite;
    }

    .pv-hero-subtitle {
      font-size: var(--text-lg);
      color: var(--text-secondary);
      max-width: 520px;
      margin: 0 auto var(--space-10);
      line-height: var(--leading-relaxed);
    }

    /* Billing Toggle */
    .pv-billing-toggle {
      display: inline-flex;
      align-items: center;
      gap: var(--space-4);
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-full);
      padding: var(--space-2) var(--space-3);
    }

    .pv-billing-label {
      font-size: var(--text-sm);
      font-weight: var(--weight-medium);
      color: var(--text-secondary);
      transition: color var(--duration-fast) var(--ease-smooth);
      cursor: none;
      user-select: none;
      padding: var(--space-2) var(--space-3);
      border-radius: var(--radius-full);
      transition: all var(--duration-fast) var(--ease-smooth);
    }

    .pv-billing-label.active {
      color: var(--text-primary);
      background: var(--bg-elevated);
    }

    .pv-toggle-track {
      width: 52px;
      height: 28px;
      background: var(--bg-elevated);
      border-radius: var(--radius-full);
      position: relative;
      cursor: none;
      border: 1px solid var(--border-medium);
      transition: background var(--duration-normal) var(--ease-smooth);
    }

    .pv-toggle-track.annual {
      background: var(--accent-mint-dim);
      border-color: rgba(0,229,160,0.3);
    }

    .pv-toggle-thumb {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: var(--accent-mint);
      position: absolute;
      top: 2px;
      left: 2px;
      transition: transform var(--duration-normal) var(--ease-spring);
      box-shadow: 0 2px 8px rgba(0,229,160,0.3);
    }

    .pv-toggle-track.annual .pv-toggle-thumb {
      transform: translateX(24px);
    }

    .pv-save-badge {
      display: inline-flex;
      align-items: center;
      gap: var(--space-1);
      background: var(--accent-mint-dim);
      color: var(--accent-mint);
      font-size: 11px;
      font-weight: var(--weight-bold);
      padding: 3px 10px;
      border-radius: var(--radius-full);
      letter-spacing: var(--tracking-wide);
      white-space: nowrap;
      opacity: 0;
      transform: scale(0.8);
      transition: all var(--duration-normal) var(--ease-spring);
    }

    .pv-save-badge.show {
      opacity: 1;
      transform: scale(1);
    }

    /* ═══════════════════════════════════════════
       SECTION 2: PRICING CARDS
       ═══════════════════════════════════════════ */

    .pv-cards-section {
      padding: 0 var(--space-6) var(--space-16);
      max-width: 1200px;
      margin: 0 auto;
    }

    .pv-cards-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-6);
      align-items: start;
    }

    .pv-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-xl);
      padding: var(--space-8) var(--space-6);
      position: relative;
      overflow: hidden;
      transition: transform var(--duration-normal) var(--ease-spring),
                  box-shadow var(--duration-normal) var(--ease-smooth),
                  border-color var(--duration-normal) var(--ease-smooth);
      opacity: 0;
      transform: translateY(48px);
    }

    .pv-card.pv-card-visible {
      opacity: 1;
      transform: translateY(0);
      transition: opacity 0.65s var(--ease-out), transform 0.65s var(--ease-spring);
    }

    .pv-card:hover {
      transform: translateY(-8px) !important;
      box-shadow: var(--shadow-xl);
      cursor: none;
    }

    .pv-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    }

    .pv-card--basic::before { background: #4FC3F7; }
    .pv-card--shield::before { background: linear-gradient(90deg, #00E5A0, #4FC3F7); }
    .pv-card--family::before { background: linear-gradient(90deg, #FFB547, #FF5F6D); }

    /* Shield card featured state */
    .pv-card--shield {
      border-color: rgba(0,229,160,0.2);
      transform: translateY(48px) scale(1.0);
      background: linear-gradient(180deg, rgba(0,229,160,0.03) 0%, var(--bg-surface) 40%);
    }

    .pv-card--shield.pv-card-visible {
      transform: scale(1.05);
    }

    .pv-card--shield:hover {
      transform: translateY(-8px) scale(1.05) !important;
    }

    .pv-card--shield.pv-card-visible {
      animation: pv-glowBorder 4s ease-in-out infinite;
    }

    /* Most Popular Badge */
    .pv-popular-badge {
      position: absolute;
      top: var(--space-4);
      right: var(--space-4);
      background: var(--accent-mint);
      color: var(--text-inverse);
      font-size: 10px;
      font-weight: var(--weight-bold);
      padding: 4px 12px;
      border-radius: var(--radius-full);
      letter-spacing: var(--tracking-wider);
      text-transform: uppercase;
      animation: pv-badgePulse 2.5s ease-in-out infinite;
    }

    /* Card content */
    .pv-card-name {
      font-family: var(--font-display);
      font-size: var(--text-xl);
      font-weight: var(--weight-bold);
      margin-bottom: var(--space-1);
    }

    .pv-card-tagline {
      font-size: var(--text-sm);
      color: var(--text-muted);
      margin-bottom: var(--space-6);
    }

    .pv-card-price {
      display: flex;
      align-items: baseline;
      gap: var(--space-2);
      margin-bottom: var(--space-1);
    }

    .pv-price-currency {
      font-size: var(--text-lg);
      font-weight: var(--weight-semibold);
      color: var(--text-secondary);
    }

    .pv-price-amount {
      font-family: var(--font-display);
      font-size: var(--text-4xl);
      font-weight: var(--weight-bold);
      line-height: 1;
      letter-spacing: var(--tracking-tighter);
    }

    .pv-price-period {
      font-size: var(--text-sm);
      color: var(--text-muted);
    }

    .pv-price-annual-note {
      font-size: var(--text-xs);
      color: var(--text-muted);
      margin-bottom: var(--space-6);
      min-height: 18px;
    }

    /* Features list */
    .pv-features-list {
      list-style: none;
      padding: 0;
      margin: 0 0 var(--space-8);
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .pv-feature-item {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      font-size: var(--text-sm);
      color: var(--text-secondary);
      opacity: 0;
      transform: scale(0.9);
      transition: opacity 0.35s var(--ease-out), transform 0.35s var(--ease-spring);
    }

    .pv-feature-item.pv-feat-visible {
      opacity: 1;
      transform: scale(1);
    }

    .pv-feature-check {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      flex-shrink: 0;
    }

    /* CTA Buttons */
    .pv-card-cta {
      width: 100%;
      padding: var(--space-3) var(--space-6);
      border-radius: var(--radius-lg);
      font-family: var(--font-display);
      font-size: var(--text-sm);
      font-weight: var(--weight-bold);
      letter-spacing: var(--tracking-wide);
      border: none;
      cursor: none;
      transition: all var(--duration-normal) var(--ease-spring);
      position: relative;
      overflow: hidden;
    }

    .pv-card-cta::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
      opacity: 0;
      transition: opacity var(--duration-fast);
    }

    .pv-card-cta:hover::after { opacity: 1; }

    .pv-cta-ghost {
      background: var(--bg-elevated);
      color: var(--text-primary);
      border: 1px solid var(--border-medium);
    }
    .pv-cta-ghost:hover {
      border-color: var(--border-strong);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .pv-cta-primary {
      background: var(--accent-mint);
      color: var(--text-inverse);
      box-shadow: 0 4px 20px rgba(0,229,160,0.25);
    }
    .pv-cta-primary:hover {
      box-shadow: 0 6px 30px rgba(0,229,160,0.4);
      transform: translateY(-2px);
    }

    .pv-cta-ghost-amber {
      background: var(--bg-elevated);
      color: var(--accent-amber);
      border: 1px solid rgba(255,181,71,0.2);
    }
    .pv-cta-ghost-amber:hover {
      border-color: rgba(255,181,71,0.4);
      background: var(--accent-amber-dim);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    /* ═══════════════════════════════════════════
       SECTION 3: IMPACT COUNTERS
       ═══════════════════════════════════════════ */

    .pv-impact-section {
      padding: var(--space-16) var(--space-6);
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;
    }

    .pv-section-title {
      font-family: var(--font-display);
      font-size: clamp(1.5rem, 3vw, var(--text-3xl));
      font-weight: var(--weight-bold);
      margin-bottom: var(--space-3);
      color: var(--text-primary);
    }

    .pv-section-subtitle {
      font-size: var(--text-base);
      color: var(--text-muted);
      margin-bottom: var(--space-12);
    }

    .pv-counters-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-6);
      margin-bottom: var(--space-12);
    }

    .pv-counter-card {
      background: var(--bg-glass);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-xl);
      padding: var(--space-8) var(--space-4);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      transition: all var(--duration-normal) var(--ease-smooth);
    }

    .pv-counter-card:hover {
      background: var(--bg-glass-hover);
      border-color: var(--border-medium);
      transform: translateY(-4px);
      cursor: none;
    }

    .pv-counter-icon {
      font-size: 36px;
      margin-bottom: var(--space-4);
      display: block;
    }

    .pv-counter-value {
      font-family: var(--font-display);
      font-size: var(--text-3xl);
      font-weight: var(--weight-bold);
      color: var(--text-primary);
      margin-bottom: var(--space-2);
    }

    .pv-counter-label {
      font-size: var(--text-xs);
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: var(--tracking-wider);
    }

    /* Mini bar chart */
    .pv-growth-chart {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: var(--space-3);
      height: 120px;
      padding: var(--space-4) var(--space-6);
      background: var(--bg-glass);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-xl);
      max-width: 500px;
      margin: 0 auto;
    }

    .pv-bar-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-2);
      flex: 1;
    }

    .pv-bar {
      width: 100%;
      max-width: 40px;
      border-radius: var(--radius-sm) var(--radius-sm) 0 0;
      background: linear-gradient(180deg, var(--accent-mint), rgba(0,229,160,0.4));
      transition: height 1s var(--ease-spring);
      min-height: 4px;
    }

    .pv-bar-label {
      font-size: 10px;
      color: var(--text-muted);
      letter-spacing: var(--tracking-wide);
    }

    /* ═══════════════════════════════════════════
       SECTION 4: COMPARISON TABLE
       ═══════════════════════════════════════════ */

    .pv-comparison-section {
      padding: var(--space-16) var(--space-6);
      max-width: 1000px;
      margin: 0 auto;
    }

    .pv-table-wrap {
      overflow-x: auto;
      border-radius: var(--radius-xl);
      border: 1px solid var(--border-subtle);
      background: var(--bg-glass);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }

    .pv-table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--text-sm);
    }

    .pv-table thead th {
      padding: var(--space-5) var(--space-4);
      font-family: var(--font-display);
      font-weight: var(--weight-bold);
      font-size: var(--text-sm);
      letter-spacing: var(--tracking-wide);
      text-align: center;
      border-bottom: 1px solid var(--border-medium);
    }

    .pv-table thead th:first-child {
      text-align: left;
      color: var(--text-secondary);
    }

    .pv-th-basic { color: #4FC3F7; }
    .pv-th-shield { color: #00E5A0; }
    .pv-th-family { color: #FFB547; }

    .pv-table tbody tr {
      opacity: 0;
      transform: translateY(12px);
      transition: opacity 0.45s var(--ease-out), transform 0.45s var(--ease-out), background var(--duration-fast);
    }

    .pv-table tbody tr.pv-row-visible {
      opacity: 1;
      transform: translateY(0);
    }

    .pv-table tbody tr:hover {
      background: var(--bg-glass-hover);
    }

    .pv-table tbody td {
      padding: var(--space-4);
      text-align: center;
      border-bottom: 1px solid var(--border-subtle);
      color: var(--text-secondary);
    }

    .pv-table tbody td:first-child {
      text-align: left;
      color: var(--text-primary);
      font-weight: var(--weight-medium);
    }

    .pv-check-yes {
      color: var(--accent-mint);
      font-weight: var(--weight-bold);
      font-size: var(--text-base);
    }
    .pv-check-no {
      color: var(--text-muted);
      font-size: var(--text-base);
    }

    /* ═══════════════════════════════════════════
       SECTION 5: TESTIMONIALS
       ═══════════════════════════════════════════ */

    .pv-testimonials-section {
      padding: var(--space-16) var(--space-6);
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }

    .pv-testimonial-viewport {
      position: relative;
      overflow: hidden;
      border-radius: var(--radius-xl);
      background: var(--bg-glass);
      border: 1px solid var(--border-subtle);
      min-height: 260px;
    }

    .pv-testimonial-slide {
      position: absolute;
      inset: 0;
      padding: var(--space-10) var(--space-8);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transform: translateX(60px);
      transition: opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out);
      pointer-events: none;
    }

    .pv-testimonial-slide.pv-slide-active {
      opacity: 1;
      transform: translateX(0);
      pointer-events: auto;
    }

    .pv-testimonial-slide.pv-slide-exit {
      opacity: 0;
      transform: translateX(-60px);
    }

    .pv-testimonial-avatar {
      font-size: 48px;
      margin-bottom: var(--space-4);
    }

    .pv-testimonial-quote {
      font-size: var(--text-base);
      color: var(--text-secondary);
      line-height: var(--leading-relaxed);
      max-width: 580px;
      margin: 0 auto var(--space-5);
      font-style: italic;
    }

    .pv-testimonial-quote::before { content: '"'; color: var(--accent-mint); font-size: var(--text-2xl); font-weight: var(--weight-bold); }
    .pv-testimonial-quote::after { content: '"'; color: var(--accent-mint); font-size: var(--text-2xl); font-weight: var(--weight-bold); }

    .pv-testimonial-name {
      font-family: var(--font-display);
      font-weight: var(--weight-semibold);
      color: var(--text-primary);
      margin-bottom: var(--space-1);
    }

    .pv-testimonial-location {
      font-size: var(--text-xs);
      color: var(--text-muted);
      margin-bottom: var(--space-3);
    }

    .pv-testimonial-stars {
      display: flex;
      gap: 4px;
      justify-content: center;
    }

    .pv-star {
      color: var(--accent-amber);
      font-size: var(--text-base);
    }

    /* Dot indicators */
    .pv-dots {
      display: flex;
      justify-content: center;
      gap: var(--space-2);
      margin-top: var(--space-6);
    }

    .pv-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--bg-elevated);
      border: 1px solid var(--border-medium);
      cursor: none;
      transition: all var(--duration-normal) var(--ease-spring);
    }

    .pv-dot.active {
      background: var(--accent-mint);
      border-color: var(--accent-mint);
      transform: scale(1.3);
      box-shadow: 0 0 10px rgba(0,229,160,0.4);
    }

    /* ═══════════════════════════════════════════
       SECTION 6: FAQ ACCORDION
       ═══════════════════════════════════════════ */

    .pv-faq-section {
      padding: var(--space-16) var(--space-6);
      max-width: 760px;
      margin: 0 auto;
    }

    .pv-faq-item {
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      margin-bottom: var(--space-3);
      background: var(--bg-surface);
      overflow: hidden;
      transition: border-color var(--duration-fast);
    }

    .pv-faq-item:hover {
      border-color: var(--border-medium);
    }

    .pv-faq-question {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--space-5) var(--space-5);
      cursor: none;
      user-select: none;
      font-family: var(--font-display);
      font-size: var(--text-base);
      font-weight: var(--weight-semibold);
      color: var(--text-primary);
      transition: color var(--duration-fast);
      gap: var(--space-4);
    }

    .pv-faq-question:hover {
      color: var(--accent-mint);
    }

    .pv-faq-icon {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--bg-elevated);
      border: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: var(--text-muted);
      flex-shrink: 0;
      transition: transform var(--duration-normal) var(--ease-spring),
                  background var(--duration-fast),
                  color var(--duration-fast);
    }

    .pv-faq-item.open .pv-faq-icon {
      transform: rotate(45deg);
      background: var(--accent-mint-dim);
      color: var(--accent-mint);
    }

    .pv-faq-answer-wrap {
      max-height: 0;
      overflow: hidden;
      transition: max-height var(--duration-slow) var(--ease-out);
    }

    .pv-faq-item.open .pv-faq-answer-wrap {
      max-height: 300px;
    }

    .pv-faq-answer {
      padding: 0 var(--space-5) var(--space-5);
      font-size: var(--text-sm);
      color: var(--text-secondary);
      line-height: var(--leading-relaxed);
    }

    /* ═══════════════════════════════════════════
       SECTION 7: CTA FOOTER
       ═══════════════════════════════════════════ */

    .pv-cta-footer {
      padding: var(--space-20) var(--space-6);
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .pv-cta-footer-content {
      position: relative;
      z-index: 1;
    }

    .pv-cta-footer-title {
      font-family: var(--font-display);
      font-size: clamp(1.6rem, 4vw, var(--text-3xl));
      font-weight: var(--weight-bold);
      margin-bottom: var(--space-4);
      background: linear-gradient(135deg, #00E5A0, #4FC3F7, #FFB547);
      background-size: 300% 300%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: pv-gradientShimmer 5s ease infinite;
      line-height: var(--leading-snug);
    }

    .pv-cta-footer-sub {
      font-size: var(--text-base);
      color: var(--text-muted);
      margin-bottom: var(--space-8);
    }

    .pv-cta-buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-4);
      flex-wrap: wrap;
    }

    .pv-cta-btn-primary {
      padding: var(--space-4) var(--space-10);
      border-radius: var(--radius-lg);
      background: var(--accent-mint);
      color: var(--text-inverse);
      font-family: var(--font-display);
      font-size: var(--text-base);
      font-weight: var(--weight-bold);
      border: none;
      cursor: none;
      box-shadow: 0 4px 24px rgba(0,229,160,0.3);
      transition: all var(--duration-normal) var(--ease-spring);
    }
    .pv-cta-btn-primary:hover {
      box-shadow: 0 8px 40px rgba(0,229,160,0.45);
      transform: translateY(-3px);
    }

    .pv-cta-btn-ghost {
      padding: var(--space-4) var(--space-10);
      border-radius: var(--radius-lg);
      background: transparent;
      color: var(--text-secondary);
      font-family: var(--font-display);
      font-size: var(--text-base);
      font-weight: var(--weight-semibold);
      border: 1px solid var(--border-medium);
      cursor: none;
      transition: all var(--duration-normal) var(--ease-spring);
    }
    .pv-cta-btn-ghost:hover {
      border-color: var(--border-strong);
      background: var(--bg-glass-hover);
      color: var(--text-primary);
      transform: translateY(-2px);
    }

    /* Floating particles */
    .pv-particles {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
      z-index: 0;
    }

    .pv-particle {
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--accent-mint);
      opacity: 0;
      animation: pv-floatParticle var(--pv-duration, 8s) linear infinite;
      animation-delay: var(--pv-delay, 0s);
    }

    /* ═══════════════════════════════════════════
       RESPONSIVE — MOBILE
       ═══════════════════════════════════════════ */

    @media (max-width: 768px) {
      .pv-cards-grid {
        grid-template-columns: 1fr;
        gap: var(--space-6);
        max-width: 420px;
        margin: 0 auto;
      }

      .pv-card--shield.pv-card-visible,
      .pv-card--shield:hover {
        transform: none !important;
      }

      .pv-card:hover {
        transform: translateY(-4px) !important;
      }

      .pv-counters-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .pv-hero {
        padding: var(--space-12) var(--space-4) var(--space-10);
      }

      .pv-testimonial-slide {
        padding: var(--space-6) var(--space-4);
      }

      .pv-growth-chart {
        height: 90px;
      }
    }

    @media (max-width: 480px) {
      .pv-counters-grid {
        grid-template-columns: 1fr 1fr;
        gap: var(--space-3);
      }

      .pv-counter-card {
        padding: var(--space-5) var(--space-3);
      }

      .pv-counter-value {
        font-size: var(--text-2xl);
      }

      .pv-billing-toggle {
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  `;

  document.head.appendChild(style);
}

/* ─── Utility: Animate a number counting up ─── */
function countUp(el, target, duration = 1400, prefix = '', suffix = '', isDecimal = false) {
  const startTime = performance.now();
  const start = 0;

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = start + (target - start) * eased;

    if (isDecimal) {
      el.textContent = prefix + current.toFixed(1) + suffix;
    } else {
      el.textContent = prefix + Math.round(current).toLocaleString('en-IN') + suffix;
    }

    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

/* ─── Utility: Format price ─── */
function formatPrice(amount) {
  if (amount === 0) return 'FREE';
  return amount.toLocaleString('en-IN');
}

/* ─── Render ─── */
export function render(container) {
  injectStyles();

  // State
  let isAnnual = false;
  let testimonialIndex = 0;
  let testimonialTimer = null;
  let observers = [];

  // Build HTML
  container.innerHTML = `
    <div class="pricing-view">

      <!-- ═══ SECTION 1: HERO BANNER ═══ -->
      <section class="pv-hero" id="pv-hero">
        <div class="pv-hero-content pv-animate">
          <div class="pv-shield-icon">🛡️</div>
          <h1 class="pv-hero-title">Choose Your Shield</h1>
          <p class="pv-hero-subtitle">Protect your loved ones with the plan that fits your family</p>

          <div class="pv-billing-toggle" id="pv-billing-toggle">
            <span class="pv-billing-label active" data-billing="monthly">Monthly</span>
            <div class="pv-toggle-track" id="pv-toggle-track">
              <div class="pv-toggle-thumb"></div>
            </div>
            <span class="pv-billing-label" data-billing="annual">Annual</span>
            <span class="pv-save-badge" id="pv-save-badge">Save 20%</span>
          </div>
        </div>
      </section>

      <!-- ═══ SECTION 2: PRICING CARDS ═══ -->
      <section class="pv-cards-section" id="pv-cards">
        <div class="pv-cards-grid">
          ${PLANS.map(plan => `
            <div class="pv-card pv-card--${plan.id}" data-plan="${plan.id}">
              ${plan.badge ? `<div class="pv-popular-badge">${plan.badge}</div>` : ''}
              <div class="pv-card-name" style="color: ${plan.accent};">${plan.name}</div>
              <div class="pv-card-tagline">${plan.tagline}</div>

              <div class="pv-card-price">
                ${plan.monthlyPrice > 0 ? `<span class="pv-price-currency">₹</span>` : ''}
                <span class="pv-price-amount" data-price-monthly="${plan.monthlyPrice}" data-price-annual="${plan.annualPrice}" style="color: ${plan.accent};">
                  ${plan.monthlyPrice === 0 ? 'FREE' : formatPrice(plan.monthlyPrice)}
                </span>
                ${plan.monthlyPrice > 0 ? `<span class="pv-price-period" data-period>/mo</span>` : ''}
              </div>
              <div class="pv-price-annual-note" data-annual-note>
                ${plan.annualPrice > 0 ? `₹${formatPrice(plan.annualPrice)}/year when billed annually` : ''}
              </div>

              <ul class="pv-features-list">
                ${plan.features.map(f => `
                  <li class="pv-feature-item">
                    <span class="pv-feature-check" style="background: ${plan.accentDim}; color: ${plan.accent};">✓</span>
                    <span>${f}</span>
                  </li>
                `).join('')}
              </ul>

              <button class="pv-card-cta pv-cta-${plan.ctaStyle}">${plan.cta}</button>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- ═══ SECTION 3: IMPACT COUNTERS ═══ -->
      <section class="pv-impact-section" id="pv-impact">
        <div class="pv-animate">
          <h2 class="pv-section-title">Guardli by the Numbers</h2>
          <p class="pv-section-subtitle">Protecting India's seniors, one alert at a time</p>
        </div>

        <div class="pv-counters-grid">
          ${IMPACT_COUNTERS.map((c, i) => `
            <div class="pv-counter-card pv-animate" style="transition-delay: ${i * 100}ms;">
              <span class="pv-counter-icon">${c.icon}</span>
              <div class="pv-counter-value" data-count-target="${c.value}" data-count-prefix="${c.prefix}" data-count-suffix="${c.suffix}" data-count-decimal="${c.isDecimal || false}">
                ${c.prefix}0${c.suffix}
              </div>
              <div class="pv-counter-label">${c.label}</div>
            </div>
          `).join('')}
        </div>

        <div class="pv-animate" style="transition-delay: 400ms;">
          <div class="pv-growth-chart" id="pv-growth-chart">
            ${MONTHLY_GROWTH.map(m => `
              <div class="pv-bar-col">
                <div class="pv-bar" data-bar-height="${m.value}" style="height: 0;"></div>
                <span class="pv-bar-label">${m.month}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- ═══ SECTION 4: COMPARISON TABLE ═══ -->
      <section class="pv-comparison-section" id="pv-comparison">
        <div class="pv-animate" style="text-align: center; margin-bottom: var(--space-10);">
          <h2 class="pv-section-title">Compare Plans</h2>
          <p class="pv-section-subtitle">Find the perfect level of protection</p>
        </div>

        <div class="pv-table-wrap pv-animate" style="transition-delay: 150ms;">
          <table class="pv-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th class="pv-th-basic">Basic</th>
                <th class="pv-th-shield">Shield</th>
                <th class="pv-th-family">Family</th>
              </tr>
            </thead>
            <tbody>
              ${COMPARISON_FEATURES.map((f, i) => `
                <tr data-row-delay="${i * 60}">
                  <td>${f.name}</td>
                  <td>${f.basic === true ? '<span class="pv-check-yes">✓</span>' : f.basic === false ? '<span class="pv-check-no">✗</span>' : `<span style="color:var(--text-primary);">${f.basic}</span>`}</td>
                  <td>${f.shield === true ? '<span class="pv-check-yes">✓</span>' : f.shield === false ? '<span class="pv-check-no">✗</span>' : `<span style="color:var(--accent-mint);">${f.shield}</span>`}</td>
                  <td>${f.family === true ? '<span class="pv-check-yes">✓</span>' : f.family === false ? '<span class="pv-check-no">✗</span>' : `<span style="color:var(--accent-amber);">${f.family}</span>`}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>

      <!-- ═══ SECTION 5: TESTIMONIALS ═══ -->
      <section class="pv-testimonials-section" id="pv-testimonials">
        <div class="pv-animate" style="margin-bottom: var(--space-8);">
          <h2 class="pv-section-title">Loved by Families Across India</h2>
          <p class="pv-section-subtitle">Hear from the people we protect</p>
        </div>

        <div class="pv-testimonial-viewport pv-animate" id="pv-testimonial-viewport" style="transition-delay: 150ms;">
          ${TESTIMONIALS.map((t, i) => `
            <div class="pv-testimonial-slide ${i === 0 ? 'pv-slide-active' : ''}" data-slide="${i}">
              <div class="pv-testimonial-avatar">${t.avatar}</div>
              <div class="pv-testimonial-quote">${t.quote}</div>
              <div class="pv-testimonial-name">${t.name}</div>
              <div class="pv-testimonial-location">${t.location}</div>
              <div class="pv-testimonial-stars">
                ${Array.from({ length: t.stars }, () => '<span class="pv-star">★</span>').join('')}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="pv-dots" id="pv-dots">
          ${TESTIMONIALS.map((_, i) => `
            <div class="pv-dot ${i === 0 ? 'active' : ''}" data-dot="${i}"></div>
          `).join('')}
        </div>
      </section>

      <!-- ═══ SECTION 6: FAQ ═══ -->
      <section class="pv-faq-section" id="pv-faq">
        <div class="pv-animate" style="text-align: center; margin-bottom: var(--space-10);">
          <h2 class="pv-section-title">Frequently Asked Questions</h2>
          <p class="pv-section-subtitle">Everything you need to know about Guardli plans</p>
        </div>

        <div id="pv-faq-list">
          ${FAQS.map((faq, i) => `
            <div class="pv-faq-item pv-animate" style="transition-delay: ${i * 80}ms;" data-faq="${i}">
              <div class="pv-faq-question">
                <span>${faq.q}</span>
                <div class="pv-faq-icon">+</div>
              </div>
              <div class="pv-faq-answer-wrap">
                <div class="pv-faq-answer">${faq.a}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- ═══ SECTION 7: CTA FOOTER ═══ -->
      <section class="pv-cta-footer" id="pv-cta">
        <div class="pv-particles" id="pv-particles"></div>
        <div class="pv-cta-footer-content pv-animate">
          <h2 class="pv-cta-footer-title">Start Protecting Your Family Today</h2>
          <p class="pv-cta-footer-sub">No credit card required. 14-day free trial.</p>
          <div class="pv-cta-buttons">
            <button class="pv-cta-btn-primary">Start Free Trial</button>
            <button class="pv-cta-btn-ghost">Talk to Sales</button>
          </div>
        </div>
      </section>

    </div>
  `;

  // ─────────────────────────────────────
  // POST-RENDER SETUP
  // ─────────────────────────────────────

  const root = container.querySelector('.pricing-view');

  // ─── Scroll-triggered animations via IntersectionObserver ───
  const animElements = root.querySelectorAll('.pv-animate');
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('pv-visible');
        animObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  animElements.forEach(el => animObserver.observe(el));
  observers.push(animObserver);

  // ─── Pricing Cards stagger animation ───
  const cards = root.querySelectorAll('.pv-card');
  const cardsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const allCards = root.querySelectorAll('.pv-card');
        allCards.forEach((card, i) => {
          setTimeout(() => {
            card.classList.add('pv-card-visible');
            // Stagger feature checkmarks
            const features = card.querySelectorAll('.pv-feature-item');
            features.forEach((feat, fi) => {
              setTimeout(() => feat.classList.add('pv-feat-visible'), fi * 50);
            });
          }, i * 180);
        });
        cardsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  if (cards.length > 0) cardsObserver.observe(cards[0]);
  observers.push(cardsObserver);

  // ─── Price counting animation (triggered when cards become visible) ───
  const priceAmounts = root.querySelectorAll('.pv-price-amount');
  const priceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const monthly = parseInt(el.dataset.priceMonthly, 10);
        if (monthly > 0) {
          countUp(el, monthly, 1200, '', '', false);
        }
        priceObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  priceAmounts.forEach(el => {
    if (parseInt(el.dataset.priceMonthly, 10) > 0) {
      priceObserver.observe(el);
    }
  });
  observers.push(priceObserver);

  // ─── Impact counters animation ───
  const counterValues = root.querySelectorAll('.pv-counter-value[data-count-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.countTarget);
        const prefix = el.dataset.countPrefix || '';
        const suffix = el.dataset.countSuffix || '';
        const isDecimal = el.dataset.countDecimal === 'true';
        countUp(el, target, 2000, prefix, suffix, isDecimal);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  counterValues.forEach(el => counterObserver.observe(el));
  observers.push(counterObserver);

  // ─── Bar chart grow animation ───
  const chartEl = root.querySelector('#pv-growth-chart');
  if (chartEl) {
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bars = chartEl.querySelectorAll('.pv-bar');
          bars.forEach((bar, i) => {
            const targetH = (parseFloat(bar.dataset.barHeight) / 100) * 80;
            setTimeout(() => {
              bar.style.height = targetH + 'px';
            }, i * 100);
          });
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    barObserver.observe(chartEl);
    observers.push(barObserver);
  }

  // ─── Comparison table rows stagger ───
  const tableRows = root.querySelectorAll('.pv-table tbody tr');
  const rowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tableRows.forEach((row, i) => {
          setTimeout(() => row.classList.add('pv-row-visible'), i * 60);
        });
        rowObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  if (tableRows.length > 0) rowObserver.observe(tableRows[0]);
  observers.push(rowObserver);

  // ─── Billing Toggle ───
  const toggleTrack = root.querySelector('#pv-toggle-track');
  const saveBadge = root.querySelector('#pv-save-badge');
  const monthlyLabel = root.querySelector('[data-billing="monthly"]');
  const annualLabel = root.querySelector('[data-billing="annual"]');

  function updateBilling() {
    toggleTrack.classList.toggle('annual', isAnnual);
    saveBadge.classList.toggle('show', isAnnual);
    monthlyLabel.classList.toggle('active', !isAnnual);
    annualLabel.classList.toggle('active', isAnnual);

    // Update all prices
    root.querySelectorAll('.pv-price-amount').forEach(el => {
      const monthly = parseInt(el.dataset.priceMonthly, 10);
      const annual = parseInt(el.dataset.priceAnnual, 10);

      if (monthly === 0) return; // FREE plan

      if (isAnnual) {
        const perMonth = Math.round(annual / 12);
        el.textContent = formatPrice(perMonth);
      } else {
        el.textContent = formatPrice(monthly);
      }
    });

    // Update period labels
    root.querySelectorAll('[data-period]').forEach(el => {
      el.textContent = isAnnual ? '/mo' : '/mo';
    });

    // Update annual notes
    const notes = root.querySelectorAll('[data-annual-note]');
    const plans = [PLANS[0], PLANS[1], PLANS[2]];
    notes.forEach((note, i) => {
      if (plans[i].annualPrice > 0) {
        if (isAnnual) {
          note.textContent = `₹${formatPrice(plans[i].annualPrice)}/year — billed annually`;
        } else {
          note.textContent = `₹${formatPrice(plans[i].annualPrice)}/year when billed annually`;
        }
      }
    });
  }

  toggleTrack.addEventListener('click', () => {
    isAnnual = !isAnnual;
    updateBilling();
  });

  monthlyLabel.addEventListener('click', () => {
    isAnnual = false;
    updateBilling();
  });

  annualLabel.addEventListener('click', () => {
    isAnnual = true;
    updateBilling();
  });

  // ─── Testimonial Carousel ───
  const slides = root.querySelectorAll('.pv-testimonial-slide');
  const dots = root.querySelectorAll('.pv-dot');

  function goToSlide(index) {
    const current = root.querySelector('.pv-slide-active');
    if (current) {
      current.classList.remove('pv-slide-active');
      current.classList.add('pv-slide-exit');
      setTimeout(() => current.classList.remove('pv-slide-exit'), 500);
    }

    dots.forEach(d => d.classList.remove('active'));

    testimonialIndex = index;
    slides[testimonialIndex].classList.add('pv-slide-active');
    dots[testimonialIndex].classList.add('active');
  }

  function nextSlide() {
    goToSlide((testimonialIndex + 1) % TESTIMONIALS.length);
  }

  // Start auto-rotation
  testimonialTimer = setInterval(nextSlide, 4000);

  // Dot click handlers
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(testimonialTimer);
      goToSlide(parseInt(dot.dataset.dot, 10));
      testimonialTimer = setInterval(nextSlide, 4000);
    });
  });

  // ─── FAQ Accordion ───
  const faqList = root.querySelector('#pv-faq-list');
  faqList.addEventListener('click', (e) => {
    const question = e.target.closest('.pv-faq-question');
    if (!question) return;

    const item = question.closest('.pv-faq-item');
    if (!item) return;

    // Close all others
    root.querySelectorAll('.pv-faq-item.open').forEach(openItem => {
      if (openItem !== item) openItem.classList.remove('open');
    });

    item.classList.toggle('open');
  });

  // ─── CTA button actions ───
  root.querySelectorAll('.pv-card-cta, .pv-cta-btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
      store.addToast('🛡️ Thank you! Redirecting to sign up...', 'success', 3000);
    });
  });

  root.querySelectorAll('.pv-cta-btn-ghost').forEach(btn => {
    btn.addEventListener('click', () => {
      store.addToast('📞 Our team will reach out to you shortly!', 'info', 3000);
    });
  });

  // ─── Floating Particles (CTA section) ───
  const particlesContainer = root.querySelector('#pv-particles');
  if (particlesContainer) {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'pv-particle';
      const size = 2 + Math.random() * 4;
      const colors = ['rgba(0,229,160,0.5)', 'rgba(79,195,247,0.4)', 'rgba(255,181,71,0.4)', 'rgba(255,255,255,0.15)'];
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        bottom: -10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        --pv-duration: ${6 + Math.random() * 10}s;
        --pv-delay: ${Math.random() * 8}s;
        --pv-drift: ${-40 + Math.random() * 80}px;
      `;
      particlesContainer.appendChild(particle);
    }
  }

  // ─── Cleanup on view destruction ───
  const cleanup = () => {
    if (testimonialTimer) clearInterval(testimonialTimer);
    observers.forEach(obs => obs.disconnect());
    observers = [];
  };

  // Use MutationObserver to detect when this view is removed from the DOM
  const mutationObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const removed of mutation.removedNodes) {
        if (removed === root || removed.contains?.(root)) {
          cleanup();
          mutationObserver.disconnect();
          return;
        }
      }
    }
  });

  if (container.parentElement) {
    mutationObserver.observe(container.parentElement, { childList: true, subtree: true });
  }
}
