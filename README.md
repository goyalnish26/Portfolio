<div align="center">

```
 ███╗   ██╗██╗███████╗██╗  ██╗ ██████╗██╗  ██╗ █████╗ ██╗     
 ████╗  ██║██║██╔════╝██║  ██║██╔════╝██║  ██║██╔══██╗██║     
 ██╔██╗ ██║██║███████╗███████║██║     ███████║███████║██║     
 ██║╚██╗██║██║╚════██║██╔══██║██║     ██╔══██║██╔══██║██║     
 ██║ ╚████║██║███████║██║  ██║╚██████╗██║  ██║██║  ██║███████╗
 ╚═╝  ╚═══╝╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
```

# Nishchal Goyal — Portfolio

**`// breaking the canon since 2021`**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-goyalnish26.github.io-E9C46A?style=for-the-badge&logo=github)](https://goyalnish26.github.io)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)

*A dual-identity portfolio — same person, two radically different visual worlds.*

</div>

---

## 🕷️ The Concept

This portfolio is built around a structural idea borrowed from **Spider-Man: Into the Spider-Verse** — every Spider-Person has their own distinct art style. Same hero, different visual language.

I am two things simultaneously:
- A **backend developer** building production REST APIs, Odoo ERP modules, and full-stack platforms.
- An **offensive security learner** exploring web security, logs analysis, and threat intelligence.

When you open the portfolio, you're asked to **choose**. That choice matters.

```
Who are you looking for?

  [ D ]  The Developer
  [ H ]  The Offensive Security Learner

         "I am both. Always have been."
```

---

## 🎨 Two Worlds

### Mode 1 — The Developer
> *Gwen Stacy energy. Warm. Maximalist editorial magazine.*

| Property | Value |
|---|---|
| Background | `#FEFAE0` — warm butter cream |
| Accent | `#E9C46A` — golden yellow |
| Fonts | Space Grotesk · Playfair Display · DM Sans · DM Mono |
| Feel | High-end print magazine, asymmetric grids, dramatic bold type sizing |

**Features:**
- **Space Grotesk Hero Name:** Staggered letter-drop hero animation.
- **Interactive Favicon:** Uses the transparent `hero.png` as the site icon.
- **Top-left Navigation:** Clickable logo in the header with a scroll-to-top handler.
- **Subtle SVG spider web** in corner.
- **Two-column editorial About section** with decorative large typography.
- **Flowing skill tag cloud** + dark magazine insert panel for cybersecurity.
- **Staggered, offset project cards** (an intentional asymmetric layout).
- **Golden vertical timeline** for experience.

---

### Mode 2 — The Offensive Security Learner
> *Spider-Noir energy. Monospace phosphor monitor. Vintage terminal session.*

| Property | Value |
|---|---|
| Background | `#0D0D0D` — near-black |
| Accent | `#FFB300` — amber warnings |
| Font | JetBrains Mono — the only font |
| Feel | A vintage computer terminal logging system |
| Themes | Supports various command themes (`light`, `dark`, `miles`, `kali`, `peter`) |

**Features:**
- **Boot sequence animation** with staggered terminal sequence.
- **All content displayed as CLI query outputs** (`about`, `skills`, `projects`, etc.).
- **Interactive terminal environment** accepting custom commands and inputs.
- **Block-character progress indicators** rendering details dynamically.
- **CRT scanline overlay** rendering on the entire screen.

---

## ✨ Technical Highlights

### Glitch Transition (The Canon Break)
When switching between modes, a custom 800ms transition fires:
1. **RGB channel split** — red/green/blue offset layers.
2. **Pixel noise burst** — custom SVG noise filter overlay.
3. **White flash frame** — pure white peak transition frame.
4. **Horizontal screen tears** — offset visual slices.
5. **New mode SNAPS in** — instant visual transition.

### Custom Cursor Hook
A dynamic cursor system driven by `requestAnimationFrame` for organic interpolation:
* **Developer mode** — multiply blend mode, dark styling.
* **Hacker mode** — normal blend mode, light styling.
* **Mobile/Touch Optimization** — checks pointer capabilities (`pointer: coarse`) and completely disables mouse tracking loops on touch-only devices to save resources.

### Architectural Clean-up & Structure
To prevent layout thrashing and maintain 60 FPS performance:
* **Proximity queries cache**: Bounding boxes of interactive targets are cached on window mount, scroll, and resize rather than calling `getBoundingClientRect()` inside mouse tracking listeners.
* **SEO Crawlability**: Incorporates a pre-rendered fallback HTML body inside `index.html` (ignored by layout styling but scanned by crawlers), combined with dynamic document title and meta sync inside `App.jsx`.
* **Vercel Analytics**: Fully integrated to monitor theme toggles, command executions, and choices.

---

## 🚀 Running Locally

```bash
# Navigate to the project folder
cd d:\programs\Portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open **http://localhost:5173/** in your browser.

```bash
# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
Portfolio/
├── src/
│   ├── components/
│   │   ├── common/         ← CustomCursor, GlitchTransition, CRTScanline
│   │   ├── entry/          ← EntryScreen choice layout
│   │   ├── dev/            ← DevMode views, cyber panel inserts, and SVGs
│   │   └── hacker/         ← HackerTerminal console and prompt handlers
│   ├── config/
│   │   └── portfolioData.jsx ← Static content arrays, command descriptions, and greeting ASCIIs
│   ├── hooks/
│   │   └── useCustomCursor.js ← Dynamic cursor lerping and touch detection
│   ├── styles/
│   │   ├── global.css      ← Custom scrollbars and styling rules
│   │   ├── Entry.css       ← Split entry screen layout
│   │   ├── DevMode.css     ← Magazine grid layout
│   │   └── HackerMode.css  ← Phosphor terminal styles and colors
│   ├── App.jsx             ← Main state coordinator and router
│   └── main.jsx            ← Mount entry script
├── index.html              ← Root HTML with SEO fallback shell and Google Analytics
├── package.json
├── vite.config.js
└── README.md
```

---

## 🧰 Tech Stack

| Tool | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 8** | Build tool + dev server |
| **Vanilla CSS** | Independent modular stylesheets |
| **Vercel Analytics** | Dynamic analytics and user interaction tracking |
| **Google Analytics** | Site traffic monitoring |

---

## 👤 About Me

**B.Tech ECE · SKIT Jaipur · Batch 2027**

- 🏢 **Interning** at Dreamsoft4u — building Odoo 15 REST API modules
- 🔐 **Security pathway** — OverTheWire → TryHackMe → HackTheBox → eJPT → OSCP
- 🏍️ I ride a Honda CB350 Classic (2024)
- 📍 Based in Jaipur, Rajasthan, India

### Contact

* **Email:** [goyalnishchal71@gmail.com](mailto:goyalnishchal71@gmail.com)
* **LinkedIn:** [linkedin.com/in/nishchal-goyal-6409a5289](https://linkedin.com/in/nishchal-goyal-6409a5289)
* **GitHub:** [github.com/goyalnish26](https://github.com/goyalnish26)

---

## 📦 Projects Featured

### [AegisGuard](https://github.com/goyalnish26/AegisGuard) `[SEC]`
Mini-SIEM platform — real-time log tailer, SSH brute force detection, regex rules engine, Discord webhook alerts, live attack simulator sandbox.
`Python · FastAPI · SQLite · JavaScript`

### [IntelScope-Pulse](https://github.com/goyalnish26/IntelScope-Pulse) `[SEC]`
CVE threat intelligence dashboard — live NVD API feed, rolling logs tracker, watchlist dashboards.
`React · NVD API · Chart.js`

### [WriteBlog](https://github.com/goyalnish26/writeblog)
Full-stack blogging platform — role-based auth, markdown editor, rate-limited auth, Docker deployments.
`Python · Flask · SQLAlchemy · Docker · GitHub Actions`

---

<div align="center">

*"Everyone told Miles this is how it's supposed to be. He broke the canon anyway."*

**`nishchal goyal · jaipur · 2026`**

</div>
