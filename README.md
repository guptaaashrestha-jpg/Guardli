# Guardli 🛡️ — Digital Guardian for Elderly Users

> **"Protection without surveillance."**

Guardli is an elegant, non-intrusive cyber-protection layer designed for elderly users (65+), offering real-time scam pattern detection across email, SMS, and browser interfaces. It builds a robust safety net that respects the senior's dignity and independence, while giving caregivers peace of mind through a dynamic, real-time telemetry dashboard.

---

## 🚀 Key Product Features

### 🎓 1. Scam School — Gamified Awareness Training
Most security layers just block files—Guardli empowers seniors to protect themselves. Includes daily bite-sized email and SMS scenario challenges. Users tap on suspicious headers, links, and fake domains, instantly earning XP and streaking toward becoming a "Phishing Expert."

### 🗺️ 2. Geographic Scam Heat Map
An advanced geographic visualization dashboard for caregivers. Renders live, custom `<canvas>` abstract map coordinates highlighting romantic, financial, tech support, and phishing scams trending regionally.

### 💬 3. Conversation Interceptor & Reply Coach
When a user attempts to compose and send replies to unverified or suspicious senders (e.g., romantic scam targets), Guardli intercepts the draft and overlays a safety coach advising: `"Before you reply... Richard Hearts is not verified. Talk to Sarah first?"`

### 📈 4. Progressive Autonomy
Dignity is hardcoded. As the senior proves their scam spotting ability in Scam School and accurately blocks threats, Guardli automatically lowers active interruption levels (Level 1: full blocking, Level 2: warning explanations, Level 3: subtle trust score badges, Level 4: dashboard logs only).

### 🏆 5. Reputation Trust Scores
Every sender receives a reputation score (0-100) color-coded as green (trusted), amber (verify), or red (caution).

---

## 🛠️ Architecture & Tech Stack

Guardli is built entirely on a **zero-framework, vanilla frontend architecture** to ensure blazing-fast performance and seamless rendering transitions:

*   **Bundler**: Vite 6 (ES Modules)
*   **Structure**: Semantic HTML5 (Hash-based state routing)
*   **Logic**: Reactive Pub/Sub State Store (`store.js`)
*   **Styles**: Vanilla modern CSS (Harmonized dual design variable sheets)
*   **Aesthetics**: Glassmorphic cards, custom trailing cursor rings, IntersectionObserver scroll animations, canvas map renders, and count-up metric loaders.

---

## 💻 Local Setup & Installation

To run this project locally on your machine, make sure you have [Node.js](https://nodejs.org) installed and run:

```bash
# 1. Clone the repository
git clone https://github.com/guptaaashrestha-jpg/Guardli.git

# 2. Enter the directory
cd Guardli

# 3. Install development dependencies
npm install

# 4. Start the local Vite development server
npm run dev
```

Your browser will automatically open **`http://localhost:3000`** to run the app.

---

## 🌐 Production Deployment

This project compiles into clean, static HTML, CSS, and JS. It is optimized to be deployed 100% free with unlimited uptime on:
*   **Vercel** (Automatic GitHub pipeline continuous integration)
*   **Netlify**
*   **GitHub Pages**
