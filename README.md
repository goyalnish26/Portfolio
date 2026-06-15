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
[![Single File](https://img.shields.io/badge/Single%20File-App.jsx-C0C0C0?style=for-the-badge&logo=javascript)](./src/App.jsx)

*A dual-identity portfolio — same person, two radically different visual worlds.*

</div>

---

## 🕷️ The Concept

This is not a standard portfolio. It is built around a structural idea borrowed from **Spider-Man: Into the Spider-Verse** — every Spider-Person has their own distinct art style. Same hero, different visual language.

**Nishchal Goyal** is two things simultaneously:
- A **backend developer** building production REST APIs, Odoo ERP modules, and full-stack platforms
- An **offensive security learner** doing OverTheWire, TryHackMe, and building his own SIEM tools

When you open the portfolio, you're asked to **choose**. That choice matters.

```
Who are you looking for?

  [ D ]  The Developer
  [ H ]  The Security Researcher

         "He is both. Always has been."
```

---

## 🎨 Two Worlds

### Mode 1 — The Developer
> *Gwen Stacy energy. Warm. Maximalist editorial magazine.*

| Property | Value |
|---|---|
| Background | `#FEFAE0` — warm butter cream |
| Accent | `#E9C46A` — golden yellow |
| Fonts | Playfair Display · DM Sans · DM Mono |
| Feel | High-end print magazine, asymmetric grids, dramatic type sizing |

**Features:**
- Staggered letter-drop hero animation (Nishchal / outline Goyal)
- Subtle SVG spider web in corner at 18% opacity
- Hidden `// breaking the canon since 2021` in the hero
- Two-column editorial About section with decorative large number
- Flowing skill tag cloud + dark magazine insert panel for cybersecurity
- Staggered, offset project cards (not a uniform grid — intentional)
- Golden vertical timeline for experience
- 2×2 certification grid

---

### Mode 2 — The Security Researcher
> *Spider-Noir energy. Monospace phosphor monitor. Vintage terminal session.*

| Property | Value |
|---|---|
| Background | `#0D0D0D` — near-black |
| Accent | `#FFB300` — amber warnings |
| Font | JetBrains Mono — the only font |
| Feel | You've SSH'd into someone's actual system |

**Features:**
- Boot sequence animation (15 lines, staggered timing)
- All content displayed as `$ command` → output blocks
- Block-character `█████░░░░░` progress bars filling on scroll
- Live cycling `tail -f /var/log/activity.log` with real timestamps
- CRT scanline overlay on the entire page
- Easter egg: type `sudo nish` anywhere → permission denied response

---

## ✨ Technical Highlights

### Glitch Transition (The Canon Break)

When switching between modes, a violent 800ms transition fires — not a fade:

```
1. RGB channel split — red/green/blue layers offset by 8–12px (200ms)
2. Pixel noise burst — CSS noise overlay
3. White flash frame — pure #FFFFFF for 80ms
4. Horizontal screen tears — 3-4 strips offset
5. New mode SNAPS in — like a different comic panel cutting in
```

### Custom Cursor

A two-layer cursor system driven entirely by `requestAnimationFrame`:

```js
// Dot: snaps to mouse instantly
cursorDot.style.left = `${e.clientX}px`

// Ring: lerps toward mouse at 12% per frame — organic feel
ringPos.x += (mousePos.x - ringPos.x) * 0.12
```

- **Dev mode** — dot `#1A1A1A`, ring `#E9C46A` at 55% opacity
- **Hacker mode** — dot `#C0C0C0`, ring `#C0C0C0` at 35% opacity
- On hover: ring scales up and fills slightly

### Architecture

| Concern | Approach |
|---|---|
| **State** | `useState` — mode, transitioning, boot index, easter egg, menu |
| **Cursor** | Pure `requestAnimationFrame` loop — zero React re-renders |
| **Scroll reveals** | `IntersectionObserver` per element |
| **Fonts** | `@import` Google Fonts inside embedded `<style>` tag |
| **CSS** | Single `CustomStyles` component injecting a `<style>` tag — no external files |
| **Build** | Vite 8 + React 19, production build in ~240ms |

---

## 🚀 Running Locally

```bash
# Clone or navigate to the project folder
cd d:\programs\Portfolio

# Install dependencies (only needed once)
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
│   ├── App.jsx          ← The entire portfolio (single file, ~2500 lines)
│   ├── index.css        ← Minimal reset only (cursor: none, box-sizing)
│   └── main.jsx         ← React DOM entry point
├── index.html           ← Root HTML with SEO meta tags
├── package.json
├── vite.config.js
└── README.md
```

> **Note:** Everything lives in `src/App.jsx`. No component files, no separate CSS files, no external UI libraries. That was an intentional constraint from the build prompt.

---

## 🔐 Easter Egg

While in **Hacker Mode**, type anywhere on the page:

```
sudo nish
```

You'll get a response in the live activity log. That's all I'll say.

---

## 🧰 Tech Stack

| Tool | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 8** | Build tool + dev server |
| **Vanilla CSS** (embedded) | All styling — no Tailwind, no CSS-in-JS libraries |
| **Google Fonts** | Playfair Display, DM Sans, DM Mono, JetBrains Mono |
| **IntersectionObserver** | Scroll-triggered reveals and skill bar fills |
| **requestAnimationFrame** | Custom cursor lerp loop |

---

## 👤 About Nishchal

**B.Tech ECE · SKIT Jaipur · Batch 2027**

> *An ECE student doing backend development and cybersecurity in a world that tells ECE students to just do embedded systems or go for a government job. Miles Morales didn't accept the canon. Neither does he.*

- 🏢 **Interning** at Dreamsoft4u — building Odoo 15 REST API modules
- 🔐 **Security pathway** — OverTheWire → TryHackMe → HackTheBox → eJPT → OSCP
- 🏍️ Rides a Honda CB350 Classic (2024)
- 📍 Based in Jaipur, Rajasthan, India

### Contact

| Platform | Link |
|---|---|
| 📧 Email | [goyalnishchal71@gmail.com](mailto:goyalnishchal71@gmail.com) |
| 💼 LinkedIn | [linkedin.com/in/nishchal-goyal-6409a5289](https://linkedin.com/in/nishchal-goyal-6409a5289) |
| 🐙 GitHub | [github.com/goyalnish26](https://github.com/goyalnish26) |

---

## 📦 Projects Featured

### [AegisGuard](https://github.com/goyalnish26/AegisGuard) `[SEC]`
Mini-SIEM platform — real-time log tailer, SSH brute force detection, regex rules engine, Discord webhook alerts, live attack simulator sandbox.
`Python · FastAPI · SQLite · JavaScript`

### [IntelScope-Pulse](https://github.com/goyalnish26/IntelScope-Pulse) `[SEC]`
CVE threat intelligence dashboard — live NVD API feed, 90-day rolling windows, severity charts, persistent watchlist.
`React · NVD API · Chart.js`

### [WriteBlog](https://github.com/goyalnish26/writeblog)
Full-stack blogging platform — role-based auth, markdown editor, nested comments, image uploads, admin analytics, Docker + CI.
`Python · Flask · SQLAlchemy · Docker · GitHub Actions`

---

<div align="center">

*"Everyone told Miles this is how it's supposed to be. He broke the canon anyway."*

**`nishchal goyal · jaipur · 2025`**

</div>
