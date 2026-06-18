# Portfolio Build Walkthrough — Nishchal Goyal

## What Was Built

A fully-featured **dual-identity portfolio** for Nishchal Goyal — a single-file React application (`src/App.jsx`) with no external component libraries. The portfolio features two completely different visual worlds that feel like different websites, not just a color swap.

---

## How to Run

```bash
# From d:\programs\Portfolio
npm run dev
```

Then open **http://localhost:5173/** in your browser.

---

## Features Implemented

### Entry Split Screen
- Fullscreen split: left half warm cream (Developer), right half near-black (Security Researcher)
- The dividing line pulses/glows with a gradient animation
- Both sides expand on hover for a living feel
- Keyboard shortcuts: press **D** → Developer mode, **H** → Hacker mode
- Click either half to enter
- Center floating pill: _"Who are you looking for?"_ + _"He is both. Always has been."_

### Glitch Transition (Spider-Verse Style)
- Triggered on mode switches between Dev ↔ Hacker
- **RGB channel-split strips** with horizontal offsets (3–4 strips)
- **Pixel noise overlay** with CSS noise animation
- **White flash** at the peak
- **`CANON SHIFT`** text with red/cyan RGB ghost layers
- Total duration: 800ms — violent and fast, not smooth

### Custom Cursor System
- Small filled **dot** (6px) snapping to mouse position instantly
- Large **ring** (28px) that lerps behind using `requestAnimationFrame` at 12% per frame
- **Dev mode**: dot `#1A1A1A`, ring `#E9C46A` at 55% opacity
- **Hacker mode**: dot `#C0C0C0`, ring `#C0C0C0` at 35% opacity
- On hover over clickable elements: ring scales to 48px (dev) / 44px (hacker)
- Hidden on mobile (under 768px)

### Floating Mode Toggle
- Bottom-right pill button, always visible after entry
- **Dev mode**: `[ >_ ]` warm golden pill with pulse glow animation
- **Hacker mode**: `[ ◈ DEV ]` monochrome pill with subtle silver pulse

---

## Developer Mode (Gwen Stacy — Warm Magazine)

### Fonts
- **Playfair Display** — headings, hero, project titles
- **DM Sans** — body, nav links
- **DM Mono** — section labels, metadata, pills, contact note

### Hero Section
- **10.5vw Playfair Display** headline — `Nishchal` solid ink, `Goyal` outline stroke
- Letters animate in staggered (40px Y drop) with `animationDelay` per character
- Tagline: _"No safety net. Just shipping."_
- Bottom-left: vertical rotated `ECE '27 · SKIT Jaipur · Jaipur, IN`
- Bottom-center: hidden faint `// breaking the canon since 2021`
- Bottom-right: bouncing scroll arrow
- Top-right corner: SVG spider web at 18% opacity in `#E9C46A`

### About Section
- 2-column desktop: decorative `01` at 12rem light color / content column
- Exact body text from the prompt
- Pill row: `ECE · SKIT Jaipur`, `7.5 CGPA · No Backlogs`, `Batch 2027`, `Jaipur, Rajasthan`, `Honda CB350 · 2024`

### Skills Section
- **Zone A**: Flowing tag cloud with slight font-size variation by proficiency
- **Zone B**: Full-width dark `#1A1A1A` magazine insert with:
  - `The other side.` in Playfair italic white
  - Animated gold progress bars per skill (IntersectionObserver triggered)
  - CRT-style amber scan line sweeping down every 8 seconds
  - Pathway footer in DM Mono gold

### Projects (Editorial Staggered Grid)
- **Project 1** (AegisGuard): large card, 72% width, left-aligned
- **Project 2** (IntelScope-Pulse): medium card, 62% width, right-aligned, slight overlap
- **Project 3** (WriteBlog): medium card, 62% width, left-aligned
- Cards have left-border bookmark accent, hover lift + golden bottom-bar animation
- Security projects tagged with `[SEC] 🔴` in `--red-spider` accent

### Experience Timeline
- Vertical `#E9C46A` timeline line with dot connectors
- Three entries: Dreamsoft4u (active), AIESEC (volunteer), True Value Infosoft

### Certifications
- 2×2 grid of editorial cert cards
- Google Cybersecurity (with `[VERIFIED]` badge in red), NPTEL Ethical Hacking, NPTEL Cyber Security & Privacy, Microsoft AI Security

### Contact + Footer
- Large centered `Let's work together.` heading
- Three pill buttons: Send Email, LinkedIn, GitHub
- Easter note: _"Or find a vulnerability in this site. I'll be impressed."_
- Footer: `nishchal goyal · jaipur · 2025` + _"I'll break it." — Miles Morales_

---

## Hacker Mode (Spider-Noir — Vintage Phosphor Monitor)

### Fonts
- **JetBrains Mono** exclusively — weights differentiate hierarchy

### Boot Sequence
- 15 lines type out sequentially at ~120–200ms each
- `[OK]` lines in silver, `[WARN]` in amber `#FFB300`, `[INFO]` in dim `#4A4A4A`
- Blinking cursor block after completion
- 1-second pause before main content appears

### Terminal Command Blocks
Each section prefixed with a `$` command, then delayed output appears:
- `whoami` → identity
- `cat identity.txt`, `cat mission.txt`, `uptime`
- `cat skills --category=security` → competency matrix with animated block-character progress bars filling left-to-right
- `cat skills --category=development`
- `ls -la /projects/` + `cat /projects/aegisguard/README`, intelscopepulse, writeblog
- `cat /etc/work_history` → 3 employment entries
- `cat /etc/credentials` → 4 verified credentials in green
- `contact --list` with amber hyperlinks

### Live Activity Log (`tail -f /var/log/activity.log`)
- Auto-cycling terminal simulation with real timestamps
- Rotates through 14 log line templates (nmap, auth.log, aegisguard, bandit, etc.)
- `[ALERT]` lines in amber, `[CRITICAL]` in red, normal in silver

### CRT Scanline Overlay
- Fixed `repeating-linear-gradient` overlay at 40% opacity across the whole page

### Easter Egg
- Listen globally for `sudo nish` typed anywhere while in Hacker mode
- Replaces the activity log with:
  ```
  [AUTH]  sudo: permission denied — you are not in the sudoers file.
  [INFO]  This incident will be reported.
  [WARN]  Just kidding. But I'm already in your system.
          — Nishchal
  ```
- Auto-clears after 5 seconds

---

## Technical Architecture

| Concern | Approach |
|---|---|
| State | `useState` for mode, transitioning, boot, menu, easter egg |
| Animations | CSS keyframes + IntersectionObserver + rAF cursor loop |
| Cursor | Pure `requestAnimationFrame` lerp, no React state updates |
| Fonts | Google Fonts via `@import` in `<style>` tag in JSX |
| CSS | Single embedded `<style>` tag as `CustomStyles` component |
| Build | Vite + React 19, builds in ~240ms |
| Responsive | Dev mode: fully responsive. Hacker mode: intentionally terminal-like (min-width: 800px on mobile) |

---

## Files Modified

| File | Change |
|---|---|
| [`src/App.jsx`](file:///d:/programs/Portfolio/src/App.jsx) | Modified — Added `isMaskProtocolRunning` guard, updated name typography, made NG. logo clickable, updated Miles Morales quote |
| [`src/index.css`](file:///d:/programs/Portfolio/src/index.css) | Replaced with minimal reset + `cursor: none` |
| [`index.html`](file:///d:/programs/Portfolio/index.html) | Updated title, SEO meta tags, and changed favicon to transparent `/hero.png` |
| `src/App.css` | Deleted (not needed) |

---

## Recent Updates (June 2026)

1. **Hero Illustration Processing:**
   - The user-uploaded `hero.png` had a baked-in gray/white checkered background.
   - We processed the image using a flood-fill script from the borders to remove the outer grid.
   - We then extracted the exact grid size ($S=19$px) and cleared the remaining checkerboard grid inside the internal gaps (like under the **coffee mug handle** and between the **shoe laces**) without affecting solid white illustration details.
2. **Maskon & Maskoff Transition Fixes:**
   - Added a React ref-based state guard `isMaskProtocolRunning` to prevent the keydown listener and timeouts from double-triggering the transition animation sequence due to state update batching.
   - Updated the `maskoff` command handler in terminal mode to trigger the unmask overlay immediately (removed the 3-second delay) and bypass appending the command/exiting text to the terminal history, ensuring a seamless and clean black screen overlay transition.
3. **Hero Name Redesign (Geometric Bold):**
   - Switched the hero name font from 'Playfair Display' to **'Space Grotesk'** for a modern, geometric, tech-confident look.
   - Removed italics from "Nishchal" so it is straight up bold (font-weight: 800).
   - Structured it to show "Nishchal" on the first line and "Goyal" (with the golden accent outline stroke) directly under it.
   - **Responsive Wrapping Fix:** Added `white-space: nowrap;` and `max-width: 600px;` to the name styling to guarantee that "Nishchal" and "Goyal" stay entirely on their respective lines without broken word wraps across all viewports and browser zoom levels (from 75% to 200%). Added `max-width: 500px;` to the tagline to prevent awkward wrapping.
4. **Header Logo Navigation:**
   - Made the top-left logo `NG.` clickable with a smooth hover effect and scroll-to-top handler.
5. **Miles Morales Quote Update:**
   - Updated and split the dev mode footer quote across two lines:
     *"Everyone keeps telling me how my story is supposed to go.*
     *Nah… I’m-a do my own thing."* — Miles Morales
6. **Favicon Update:**
   - Replaced the purple lightning SVG favicon with the transparent `hero.png` illustration.
7. **Peter Theme Color Overhaul:**
   - Re-designed the custom `peter` theme inside Hacker Mode to create a high-contrast Spider-Man suit aesthetic.
   - Replaced the redundant all-red variables with an interplay of solid bright red for primary text (`#FF0000`) and solid bright blue for accent elements, highlights, glows, and borders (`#0066FF`).
