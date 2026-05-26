/* ============================================
   GUARDLI — MOCK DATA
   Realistic. Chilling. Educational.
   ============================================ */

// ─── Threat Database ───
export const threats = [
  {
    id: 't001',
    type: 'phishing',
    channel: 'email',
    severity: 'high',
    riskScore: 92,
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    sender: 'security-alert@bankofamerica-verify.com',
    senderTrust: 8,
    subject: 'Urgent: Your account has been compromised',
    redactedSummary: 'Phishing email impersonating Bank of America requesting password reset via suspicious link',
    rawContent: 'Dear Customer, We detected unusual activity on your account. Click here immediately to verify your identity or your account will be locked within 24 hours. This is your final warning.',
    indicators: ['Fake sender domain', 'Urgency language', 'Password request', 'Threatening tone'],
    communityReports: 1247,
    userAction: 'blocked',
    autonomyLevel: 1
  },
  {
    id: 't002',
    type: 'sms_scam',
    channel: 'sms',
    severity: 'high',
    riskScore: 88,
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    sender: '+1-555-0199',
    senderTrust: 5,
    subject: null,
    redactedSummary: 'SMS claiming to be from grandchild requesting emergency wire transfer',
    rawContent: 'Grandma its me!! Im in trouble and need $2000 wired to me right away. Dont tell mom and dad please. Its an emergency!!!',
    indicators: ['Unknown number', 'Money request', 'Urgency', 'Secrecy request'],
    communityReports: 892,
    userAction: 'blocked',
    autonomyLevel: 1
  },
  {
    id: 't003',
    type: 'tech_support',
    channel: 'browser',
    severity: 'critical',
    riskScore: 95,
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    sender: 'microsoft-support-alert.xyz',
    senderTrust: 3,
    subject: 'VIRUS DETECTED ON YOUR COMPUTER',
    redactedSummary: 'Fake virus alert popup impersonating Microsoft, requesting remote access via phone call',
    rawContent: 'WARNING! Your computer has been infected with 3 viruses. Call Microsoft Support immediately at 1-800-555-0147 to prevent data loss. DO NOT SHUT DOWN YOUR COMPUTER.',
    indicators: ['Fake Microsoft branding', 'Popup blocker bypass', 'Phone number scam', 'Fear tactics'],
    communityReports: 3420,
    userAction: 'blocked',
    autonomyLevel: 1
  },
  {
    id: 't004',
    type: 'romance',
    channel: 'email',
    severity: 'medium',
    riskScore: 67,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    sender: 'richard.hearts@gmail.com',
    senderTrust: 23,
    subject: 'I can\'t stop thinking about you',
    redactedSummary: 'Potential romance scam — new contact showing love-bombing patterns over 2-week period',
    rawContent: 'My dearest, every moment without you feels like an eternity. I know we haven\'t met in person yet, but I feel a connection like never before. I have a small business emergency and was wondering if you could help...',
    indicators: ['Love-bombing language', 'New contact (2 weeks)', 'Building toward money request', 'Avoids video calls'],
    communityReports: 156,
    userAction: null,
    autonomyLevel: 2
  },
  {
    id: 't005',
    type: 'phishing',
    channel: 'email',
    severity: 'low',
    riskScore: 35,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    sender: 'noreply@amazon.com',
    senderTrust: 72,
    subject: 'Your order has shipped',
    redactedSummary: 'Legitimate Amazon shipping notification — verified sender',
    rawContent: 'Your order #113-7829361 has shipped and will arrive by Thursday.',
    indicators: [],
    communityReports: 0,
    userAction: 'safe',
    autonomyLevel: 4
  },
  {
    id: 't006',
    type: 'lottery',
    channel: 'sms',
    severity: 'high',
    riskScore: 91,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    sender: '+1-555-0342',
    senderTrust: 2,
    subject: null,
    redactedSummary: 'Lottery scam SMS claiming $50,000 prize with fee required to claim',
    rawContent: 'CONGRATULATIONS! You have won $50,000 in the National Sweepstakes! To claim, pay the $99 processing fee. Reply YES now or forfeit your prize.',
    indicators: ['Unsolicited prize', 'Fee required', 'Urgency to respond', 'Unknown sender'],
    communityReports: 2891,
    userAction: 'blocked',
    autonomyLevel: 1
  },
  {
    id: 't007',
    type: 'phishing',
    channel: 'email',
    severity: 'medium',
    riskScore: 58,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36),
    sender: 'delivery@fedex-tracking.net',
    senderTrust: 15,
    subject: 'Package delivery failed — action required',
    redactedSummary: 'Suspected phishing email impersonating FedEx with link to fake tracking page',
    rawContent: 'We were unable to deliver your package. Please click here to update your delivery address and pay the $3.50 redelivery fee.',
    indicators: ['Suspicious domain', 'Payment request', 'Generic greeting'],
    communityReports: 567,
    userAction: 'blocked',
    autonomyLevel: 2
  }
];

// ─── Contacts Database ───
export const contacts = [
  { id: 'c001', name: 'Daughter', type: 'family', trustScore: 98, isCaregiver: true, avatar: '👩' },
  { id: 'c002', name: 'Son', type: 'family', trustScore: 97, isCaregiver: true, avatar: '👨' },
  { id: 'c003', name: 'Dr. Patricia Wilson', type: 'medical', trustScore: 95, avatar: '👩‍⚕️' },
  { id: 'c004', name: 'First National Bank', type: 'financial', trustScore: 90, avatar: '🏦' },
  { id: 'c005', name: 'Medicare Services', type: 'government', trustScore: 88, avatar: '🏛️' },
  { id: 'c006', name: 'Book Club - Mom', type: 'social', trustScore: 85, avatar: '📚' },
  { id: 'c007', name: 'Richard Hearts', type: 'unknown', trustScore: 23, avatar: '❓', flagged: true },
  { id: 'c008', name: 'Unknown +1-555-0199', type: 'unknown', trustScore: 5, avatar: '⚠️', flagged: true },
  { id: 'c009', name: 'Amazon', type: 'shopping', trustScore: 72, avatar: '📦' },
  { id: 'c010', name: 'Church Group', type: 'social', trustScore: 92, avatar: '⛪' }
];

// ─── Scam School Quizzes ───
export const quizzes = [
  {
    id: 'q001',
    difficulty: 'beginner',
    type: 'phishing',
    scenario: {
      from: 'security@bankofamerica-alert.com',
      subject: 'Urgent: Verify your account now',
      body: 'Dear Valued Customer, we have detected suspicious activity on your account ending in ****4821. Click the link below to verify your identity within 24 hours or your account will be permanently suspended.',
      url: 'http://boa-security-verify.suspicious-site.com/login'
    },
    redFlags: [
      { id: 'rf1', text: 'Fake sender domain', element: 'from', hint: 'Real Bank of America emails come from @bankofamerica.com' },
      { id: 'rf2', text: 'Creates false urgency', element: 'urgency', hint: 'Banks don\'t threaten to suspend accounts in 24 hours via email' },
      { id: 'rf3', text: 'Asks you to click a link', element: 'link', hint: 'The URL goes to a suspicious website, not bankofamerica.com' },
      { id: 'rf4', text: 'Generic greeting', element: 'greeting', hint: 'Your real bank knows your name' }
    ],
    xpReward: 10
  },
  {
    id: 'q002',
    difficulty: 'intermediate',
    type: 'romance',
    scenario: {
      from: 'michael.anderson@gmail.com',
      subject: 'I found your profile and felt a connection',
      body: 'Hello beautiful, I came across your profile on Facebook and I was captivated by your smile. I\'m a widowed engineer currently working on an oil rig overseas. I would love to get to know you better. I feel like we could have something special.',
      url: null
    },
    redFlags: [
      { id: 'rf1', text: 'Unsolicited romantic contact', element: 'unsolicited', hint: 'Be cautious of strangers who reach out with romantic interest' },
      { id: 'rf2', text: 'Claims to be overseas', element: 'overseas', hint: 'Common romance scam setup — can\'t meet in person' },
      { id: 'rf3', text: 'Widowed professional story', element: 'backstory', hint: 'Fake sympathetic backstory is a classic manipulation tactic' }
    ],
    xpReward: 15
  },
  {
    id: 'q003',
    difficulty: 'advanced',
    type: 'tech_support',
    scenario: {
      from: 'SYSTEM ALERT',
      subject: null,
      body: 'Windows Defender has detected (3) critical threats on your device. Your personal data including banking passwords and photos are at risk. Call Microsoft Certified Support: 1-888-555-0147 immediately. Error Code: DW6BD36.',
      url: null
    },
    redFlags: [
      { id: 'rf1', text: 'Fake system alert', element: 'fake_alert', hint: 'Real Windows alerts don\'t appear in your browser' },
      { id: 'rf2', text: 'Phone number scam', element: 'phone', hint: 'Microsoft never asks you to call a phone number from a popup' },
      { id: 'rf3', text: 'Fake error code', element: 'error_code', hint: 'Random error codes make it look official but are meaningless' },
      { id: 'rf4', text: 'Fear of data loss', element: 'fear', hint: 'Scammers use fear to make you act without thinking' }
    ],
    xpReward: 20
  }
];

// ─── Scam School User Progress ───
export const scamSchoolProgress = {
  currentStreak: 7,
  totalCorrect: 42,
  totalAttempted: 49,
  accuracy: 86,
  level: 'Intermediate',
  xp: 340,
  xpToNextLevel: 500,
  badges: [
    { id: 'b1', name: 'Phishing Expert', icon: '🎣', earned: true, date: '2025-05-20' },
    { id: 'b2', name: 'SMS Sleuth', icon: '📱', earned: true, date: '2025-05-18' },
    { id: 'b3', name: 'First Catch', icon: '🥇', earned: true, date: '2025-05-10' },
    { id: 'b4', name: 'Week Warrior', icon: '🔥', earned: true, date: '2025-05-22' },
    { id: 'b5', name: 'Browser Guardian', icon: '🛡️', earned: false, date: null },
    { id: 'b6', name: 'Romance Radar', icon: '💔', earned: false, date: null }
  ],
  accuracyByType: {
    phishing: 92,
    sms_scam: 88,
    tech_support: 78,
    romance: 71
  }
};

// ─── Heat Map Data ───
export const heatmapData = {
  regions: [
    { name: 'Maharashtra', x: 38, y: 58, phishing: 340, techSupport: 890, romance: 1200, financial: 450 },
    { name: 'Delhi NCR', x: 46, y: 25, phishing: 780, techSupport: 560, romance: 340, financial: 890 },
    { name: 'Karnataka', x: 44, y: 75, phishing: 450, techSupport: 670, romance: 560, financial: 340 },
    { name: 'Tamil Nadu', x: 50, y: 85, phishing: 920, techSupport: 340, romance: 450, financial: 780 },
    { name: 'West Bengal', x: 74, y: 45, phishing: 230, techSupport: 450, romance: 340, financial: 230 },
    { name: 'Gujarat', x: 26, y: 48, phishing: 180, techSupport: 780, romance: 560, financial: 120 },
    { name: 'Telangana', x: 50, y: 62, phishing: 340, techSupport: 290, romance: 400, financial: 350 },
    { name: 'Uttar Pradesh', x: 54, y: 30, phishing: 290, techSupport: 380, romance: 670, financial: 220 }
  ],
  totalThisWeek: 12340,
  totalUsers: 52847,
  trendingType: 'romance',
  trendingRegion: 'Maharashtra',
  weeklyTrend: [
    { week: 'W1', count: 8900 },
    { week: 'W2', count: 9400 },
    { week: 'W3', count: 10200 },
    { week: 'W4', count: 12340 }
  ]
};

// ─── Autonomy State ───
export const autonomyState = {
  currentLevel: 3,
  maxLevel: 4,
  description: 'Confident',
  caregiverFloor: 2,
  factors: {
    scamSchoolAccuracy: 86,
    correctBlocks: 14,
    falsePositives: 2,
    daysActive: 45
  },
  levelDescriptions: {
    1: { name: 'New User', desc: 'Full blocking + detailed warnings' },
    2: { name: 'Learning', desc: 'Warnings with explanations, you choose' },
    3: { name: 'Confident', desc: 'Subtle badges, fewer popups' },
    4: { name: 'Expert', desc: 'Minimal interruption, dashboard logging' }
  }
};

// ─── Privacy Settings ───
export const privacySettings = {
  caregiverName: 'Daughter',
  shareHighThreats: true,
  shareWeeklySummary: true,
  shareMediumThreats: false,
  shareScamSchoolProgress: true,
  shareActivityFeed: false,
  lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 72)
};

// ─── Privacy Audit Log ───
export const auditLog = [
  { time: '3:15 PM', action: 'Viewed threat summary for phishing alert #t001', type: 'view' },
  { time: '3:12 PM', action: 'Acknowledged high-risk alert for Mom', type: 'action' },
  { time: '2:45 PM', action: 'Viewed weekly digest report', type: 'view' },
  { time: '11:30 AM', action: 'Checked Scam School progress', type: 'view' },
  { time: '9:15 AM', action: 'Viewed activity timeline', type: 'view' },
  { time: 'Yesterday', action: 'Mom updated privacy preferences', type: 'privacy_change' },
  { time: 'Yesterday', action: 'Set autonomy floor to Level 2', type: 'setting' },
  { time: '2 days ago', action: 'Viewed heat map for Maharashtra region', type: 'view' }
];

// ─── Weekly Digest ───
export const weeklyDigest = {
  weekOf: 'May 19 — May 25, 2025',
  summary: 'It was a good week. Mom is safe and getting sharper.',
  threatsBlocked: 4,
  threatsTotal: 18,
  channelsScanned: { email: 89, sms: 34, browser: 156 },
  riskScoreAvg: 23,
  riskScorePrev: 31,
  scamSchoolStreak: 7,
  scamSchoolAccuracy: 86,
  newBadges: ['Week Warrior'],
  autonomyLevel: 3,
  insight: 'Romance scams are trending in Mom\'s area. Consider having a conversation about online relationships.',
  communityStats: {
    scamsBlockedNetwork: 12340,
    newPatternsDetected: 23,
    usersProtected: 52847
  }
};

// ─── Activity Timeline Events ───
export const timelineEvents = [
  { time: '3:15 PM', text: 'Phishing email blocked', detail: 'Fake Bank of America alert', severity: 'coral', icon: '🚫' },
  { time: '2:30 PM', text: 'Scam School: Scored 3/4', detail: 'Phishing challenge completed', severity: 'mint', icon: '🎓' },
  { time: '1:45 PM', text: 'SMS scam blocked', detail: 'Fake grandchild emergency', severity: 'coral', icon: '🚫' },
  { time: '12:00 PM', text: '34 messages scanned — all clear', detail: 'Routine scan completed', severity: 'mint', icon: '✅' },
  { time: '11:30 AM', text: 'Trust Score updated', detail: 'Richard Hearts: 23 → 19', severity: 'amber', icon: '📉' },
  { time: '10:15 AM', text: 'Reply Coach activated', detail: 'Mom was coached before replying to flagged sender', severity: 'amber', icon: '💬' },
  { time: '9:00 AM', text: 'Daily protection started', detail: 'All channels active', severity: 'sky', icon: '🛡️' },
  { time: 'Yesterday', text: 'Autonomy Level → 3', detail: 'Promoted to Confident level! 🎉', severity: 'mint', icon: '📈' },
  { time: 'Yesterday', text: 'Tech support scam blocked', detail: 'Fake Microsoft virus alert', severity: 'coral', icon: '🚫' },
  { time: '2 days ago', text: 'Privacy settings updated', detail: 'Mom chose to share less detail', severity: 'sky', icon: '🔒' }
];

// ─── Helper: Format time ago ───
export function timeAgo(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

// ─── Helper: Get severity color class ───
export function getSeverityClass(severity) {
  const map = { low: 'mint', medium: 'amber', high: 'coral', critical: 'coral' };
  return map[severity] || 'sky';
}

// ─── Helper: Get trust level ───
export function getTrustLevel(score) {
  if (score >= 80) return { level: 'high', label: 'Trusted', class: 'trust-high' };
  if (score >= 40) return { level: 'medium', label: 'Verify', class: 'trust-medium' };
  return { level: 'low', label: 'Caution', class: 'trust-low' };
}

// ─── Helper: Channel icon ───
export function getChannelIcon(channel) {
  const map = { email: '📧', sms: '💬', browser: '🌐' };
  return map[channel] || '📱';
}

// ─── Helper: Threat type label ───
export function getThreatTypeLabel(type) {
  const map = {
    phishing: 'Phishing',
    sms_scam: 'SMS Scam',
    tech_support: 'Tech Support',
    romance: 'Romance Fraud',
    lottery: 'Lottery Scam'
  };
  return map[type] || type;
}
