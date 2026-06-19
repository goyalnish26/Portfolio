# Portfolio Build Walkthrough — Nishchal Goyal

## What Was Built

A fully-featured, optimized, and highly polished **dual-identity portfolio** for Nishchal Goyal. The portfolio features two completely different visual worlds that feel like different websites, not just a color swap:
1. **Developer Mode**: A maximalist editorial design with a warm butter cream theme, geometric typography, and smooth grid transitions.
2. **Offensive Security Learner Mode**: A retro phosphor monochrome terminal simulator accepting custom command queries and tracking mock SIEM logs.

---

## How to Run

```bash
# Clone or navigate to the project directory
cd d:\programs\Portfolio

# Install dependencies (Vite + React 19 + Vercel Analytics)
npm install

# Start the development server
npm run dev
```

Then open **http://localhost:5173/** in your browser.

---

## Clean Architecture Overhaul (Refactoring)

We successfully extracted the 3,150-line single-file monolithic structure of `src/App.jsx` into a highly maintainable, component-driven architecture:

```
Portfolio/
├── src/
│   ├── components/
│   │   ├── common/         ← CustomCursor, GlitchTransition, CRTScanline
│   │   ├── entry/          ← EntryScreen choice layout
│   │   ├── dev/            ← DevMode views, cyber panels, and SVGs
│   │   └── hacker/         ← HackerTerminal console and command execution loops
│   ├── config/
│   │   └── portfolioData.jsx ← All static data, commands map, and ASCII greeting blocks
│   ├── hooks/
│   │   └── useCustomCursor.js ← requestAnimationFrame cursor tracking hook
│   ├── styles/
│   │   ├── global.css      ← Custom scrollbars and styling rules
│   │   ├── Entry.css       ← Split entry screen layout styles
│   │   ├── DevMode.css     ← Magazine grid layout styles
│   │   └── HackerMode.css  ← Phosphor terminal styles and colors
│   ├── App.jsx             ← Main state coordinator and router
│   └── main.jsx            ← Mount entry script
├── index.html              ← Root HTML with SEO fallback shell and Google Analytics tag
├── package.json
├── vite.config.js
└── README.md
```

* **App.jsx** is now under **800 lines** and only coordinates top-level states (mode selection, unmask/mask protocols, Vercel tracking hooks, and dynamic browser title updates).
* **Stylesheets** are separated, keeping global concerns clean from mode-specific overrides.
* **Vite build size** and Fast Refresh compiler warnings are resolved.

---

## Core Optimizations

### 1. Dynamic SEO & Crawlability
* **Semantic HTML Fallback**: Added a structured, search-crawler-readable fallback body in `index.html` (inside `<div id="root">`, hidden from layout using `display: none` / `aria-hidden="true"`). Search engine indexers parse the content immediately without relying on JavaScript executions.
* **Header Syncing**: Updated `App.jsx` with active `useEffect` hooks syncing the document title and meta descriptions on mode switches:
  - **Dev Mode**: `Nishchal Goyal | Backend Developer`
  - **Offensive Security Learner Mode**: `nishchal@canon-breaker:~$`
  - **Default**: `Nishchal Goyal | Developer & Offensive Security Learner`

### 2. Analytics Integration
* **Vercel Analytics**: Fully integrated to monitor theme selections, command executions, and identity choices.
* **Google Analytics**: Installed the global `gtag.js` tracking tag immediately inside the `<head>` element in `index.html` for comprehensive traffic auditing.

### 3. Mobile Performance & Proximity Optimization
* **Touch Device Bypass**: Cursor coordinate tracking loops are completely disabled on coarse pointer devices (e.g. mobile phones and tablets) to save mobile processors from running expensive drawing routines.
* **Proximity Coordinate Cache**: Interactive target coordinates are cached dynamically on mount, scroll, and resize rather than invoking layout-triggering `getBoundingClientRect()` calls inside mouse move event handlers. This prevents layout thrashing and keeps rendering at a smooth 60 FPS.

---

## Recent Modifications

1. **Hacker Mode Rename (Humble & Honest)**:
   - Changed the title from `SECURITY RESEARCHER` to `OFFENSIVE SECURITY LEARNER` on the entry split screen, matching headers, and document titles.
   - Refactored the entry screen description to represent an honest and limit-aligned description of your current cybersecurity path:
     *"Retro phosphor terminal interface. Simulated commands, logs, and CLI tools. Documenting my learning journey in web application security, threat analysis, and defensive scripting."*
2. **Bike Output Update**:
   - Changed the CB350 fuel tank color description in terminal output from `Red fuel tank` to `Black fuel tank` in `src/config/portfolioData.jsx` to accurately match your bike.
3. **Public Git Scrubbing**:
   - Removed local spec sheets (`dev_mode_final_prompt.md` and `hacker_mode_terminal_prompt.md`) from the tracking path and added pattern rules to `.gitignore`.
   - Staged, committed, and successfully pushed all clean modifications to your origin branch on GitHub.
