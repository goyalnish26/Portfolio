# NISHCHAL GOYAL — PORTFOLIO BUILD PROMPT
## For Antigravity IDE / AI Code Generation

> Read this entire document before writing a single line of code.
> This is not a generic portfolio. Every decision here is intentional and personal.
> Do not default to common patterns. Do not simplify. Execute exactly what is described.

---

## WHO IS THIS PERSON

**Name:** Nishchal Goyal
**Degree:** B.Tech Electronics & Communication Engineering (ECE), SKIT Jaipur, Batch 2027
**CGPA:** 7.5, No backlogs
**Based in:** Jaipur, Rajasthan, India
**GitHub:** github.com/goyalnish26
**Email:** goyalnishchal71@gmail.com
**LinkedIn:** linkedin.com/in/nishchal-goyal-6409a5289

**Who he actually is:**
He is two things simultaneously — a backend developer building real production systems, and an offensive security learner who breaks things ethically. He loves Spider-Man deeply, especially Miles Morales and the Spider-Verse franchise. The reason: Miles didn't accept the canon event even when the entire Spider Society was against him. He didn't let his father die just because "that's how it's supposed to be." He broke the canon. This resonates with Nishchal personally — he is an ECE student doing cybersecurity and backend development in a world that tells ECE students to just do embedded systems or go for a government job.

He loves minimal aesthetics but is also excited by maximal, layered, dramatic design — as long as it is NOT cluttered. He is an anime geek and Marvel worshipper. He rides a Honda CB350 Classic (2024). He uses AI tools intelligently — he vibe codes but always makes sure he understands what's in his own codebase.

**Taglines that mean something to him:**
- "Breaking the canon."
- "No safety net. Just shipping."
- "Every system has a weakness. So does every setback. You just have to find the entry point."
- `// breaking the canon since 2021`

---

## THE CORE CONCEPT — DUAL IDENTITY

This portfolio has **two completely separate visual worlds** — like how every Spider-Person in Spider-Verse had their own distinct art style. Same person, radically different visual language.

### Entry Screen

When the page loads, show a **fullscreen entry/selection screen**.

```
Who are you looking for?

  [ D ]  The Developer
  [ H ]  The Security Researcher
```

- Styling of this entry screen: split down the middle — left half in Developer palette (butter yellow, warm), right half in Hacker palette (near-black, phosphor white). The split line subtly pulses or breathes.
- Keyboard press D or H, OR clicking either side, triggers the transition.
- A small line at the bottom of the entry screen in tiny muted text: `"He is both. Always has been."`

---

## THE GLITCH TRANSITION — SPIDER-VERSE STYLE

This transition is the signature moment. Do NOT make it a simple fade or slide.

**What it should feel like:**
The Spider-Verse moment when Miles falls into a different dimension — reality breaks, art styles collide for a brief instant, then a new world snaps into place.

**Technical implementation:**

```
1. RGB channel split — red, green, blue layers of the current screen separate by 8–12px for 200ms
2. Pixel scatter / noise burst — brief static overlay (CSS noise or canvas)
3. White flash frame — single frame of pure white (#FFFFFF) for 80ms
4. Screen "tears" horizontally — 3–4 thin horizontal strips of the page offset briefly
5. New mode snaps in — not fades in. SNAPS. Like a different comic panel cutting in.
```

Total transition duration: 600–800ms maximum. Fast and violent, not slow and smooth.

**The floating mode toggle** (always visible, bottom-right corner):
- In Developer mode: a small warm `[ >_ ]` pill button
- In Hacker mode: a small phosphor-white `[ ◈ DEV ]` pill button
- Clicking either triggers the full glitch transition
- The toggle itself has a subtle pulse animation so the user notices it

---

## MODE 1 — THE DEVELOPER

### Visual Philosophy
**Maximalist editorial magazine energy.** Think a high-end print magazine — big bold typography, warm creamy paper tones, asymmetric layouts, overlapping text elements, dramatic type sizing. NOT a SaaS landing page. NOT a dark portfolio. Warm, confident, alive. The Spider-Verse equivalent would be Gwen Stacy's watercolor world — soft but with bold strokes.

This mode is FULLY RESPONSIVE — mobile, tablet, desktop all polished.

### Color Palette — EXACT HEX VALUES
```
--bg:           #FEFAE0   (warm butter, main background)
--bg-surface:   #FDF5C0   (slightly deeper cream, card backgrounds)
--bg-deep:      #F5EDB0   (for section dividers, subtle contrast)
--text-primary: #1A1A1A   (near-black)
--text-muted:   #8A7F6B   (warm grey)
--accent:       #E9C46A   (golden yellow, primary accent)
--accent-dark:  #C9A84C   (deeper gold, hover states)
--ink:          #2D2416   (dark warm brown, display headings)
--red-spider:   #E63946   (Spider-Man red — use VERY sparingly, one or two moments only)
--white:        #FAFAFA
```

### Typography
```
Display / Hero: "Playfair Display" — bold, italic where dramatic, large sizes
Subheadings:    "DM Sans" — medium weight, clean
Body:           "DM Sans" — regular, comfortable line height 1.7
Accent labels:  "DM Mono" — small, for section labels, metadata, dates
```
Import all from Google Fonts.

### Layout Details

**Custom Cursor (applies to BOTH modes but styled differently):**
- A small filled dot (6px) in the center
- A circle (28px diameter, 1.5px border) that follows with a slight lag (lerp/ease)
- In Dev mode: dot is `#1A1A1A`, circle is `#E9C46A` with 60% opacity
- In Hacker mode: dot is `#C0C0C0`, circle is `#C0C0C0` with 40% opacity
- Hide the default system cursor on the entire page (`cursor: none`)
- On hover over clickable elements: circle scales up to 48px and fills slightly

**Navigation:**
- Fixed top navbar — background: transparent initially, becomes `rgba(254,250,224,0.92)` with backdrop blur on scroll
- Left: `NG.` logotype in Playfair Display italic
- Right: nav links in DM Mono, small uppercase, warm muted color
- No hamburger menu on mobile — instead a minimal `[ menu ]` text button

**Hero Section:**
- Full viewport height
- LARGE display heading — Nishchal in Playfair Display at ~10vw, bold, italic, ink color
- Under it: `Goyal` in an outline/stroke style (same font, same size, but -webkit-text-stroke, no fill)
- Tagline below: `"No safety net. Just shipping."` in DM Sans, muted warm grey
- Bottom left: a vertical text label rotated 90deg — `ECE '27 · SKIT Jaipur · Jaipur, IN` in DM Mono tiny
- Bottom right: small animated arrow pointing down
- Background: plain `#FEFAE0` — the typography IS the design here. No gradients, no patterns in the main bg.
- One Spider-Verse easter egg: a tiny spider web drawn in CSS (SVG inline) in one corner of the hero, very subtle, `#E9C46A` at 15% opacity. It should look like an accidental texture, not a decoration.
- Hidden line in very small DM Mono at very bottom of hero section, color `#C9A84C` at 40% opacity: `// breaking the canon since 2021`

**About Section:**
- Two-column layout on desktop: left column has a big decorative number `01` in Playfair Display at 8rem, light `#F5EDB0` color (background text, behind content). Right column has the actual content.
- Headline: `"Final-year ECE student who actually ships."` — Playfair Display, bold
- Two paragraphs of body text (see content below)
- Below text: a horizontal list of quick facts in pill format — warm surface bg `#FDF5C0`, border `1px solid #E9C46A`:
  - `ECE · SKIT Jaipur`
  - `7.5 CGPA · No Backlogs`
  - `Batch 2027`
  - `Jaipur, Rajasthan`
  - `Honda CB350 · 2024`

About body text:
```
I build backend systems that actually work and security tools that actually detect. 
Currently in my final year at SKIT Jaipur, interning at Dreamsoft4u building Odoo 15 
REST APIs — HTTP controllers, ORM queries, JSON pipelines — on a Python + PostgreSQL + 
Linux stack.

On the other side, I'm deep into offensive security — OverTheWire, TryHackMe, building 
my own SIEM tools. The goal isn't just to get a job. It's to get good enough that breaking 
in becomes second nature. Certified by Google in Cybersecurity. Currently on the 
eJPT → OSCP pathway.
```

**Skills Section:**
- Section label: `02 / SKILLS` in DM Mono, small, `#8A7F6B`
- Headline: `"What I work with"` — Playfair Display
- Two visual zones, clearly separated:

**Zone A — Development (clean editorial pills):**
Arrange as a flowing wrap of tags, each tag slightly different size based on proficiency (CSS font-size variation, nothing too dramatic). Tags: Python · FastAPI · Flask · REST APIs · PostgreSQL · SQLite · Odoo 15 ERP · Git · Linux/Ubuntu · Docker · JavaScript · React · HTML/CSS · Odoo ORM · PyCharm

**Zone B — Cybersecurity (dramatic, different treatment):**
Give this a distinct visual break — a full-width dark `#1A1A1A` panel inside the light page (like a dark insert in a magazine). Inside it, white/gold text:
- Heading: `"The other side."` in Playfair Display italic, white
- Skills listed as two-column with subtle progress indicators (not terminal style here — more like magazine infographic bars, thin golden `#E9C46A` lines)
- Skills: Network Security · SIEM & Log Analysis · Web App Pentesting · OverTheWire Bandit (Lvl 12+) · TryHackMe CS101 · Threat Intelligence · OSINT & CVE Research · Burp Suite · NMAP · Wireshark · Metasploit (learning)
- Bottom of this dark panel: `"Pathway: OverTheWire → THM Jr Pentester → HackTheBox → eJPT → OSCP"` in DM Mono, small, gold

**Projects Section:**
- Section label: `03 / PROJECTS`
- Headline: `"Things I've built"` — Playfair Display
- Layout: NOT a uniform grid. Make it editorial:
  - First project: large card, full width or 70% width, left-aligned
  - Second project: medium card, right-aligned, slightly overlapping visually with first
  - Third project: medium card, left-aligned
  - This staggered, offset layout is intentional — it should feel like a magazine spread
- Each card: `#FDF5C0` background, `1px solid #E9C46A` border on left side only (like a bookmark), subtle shadow
- Card contents: Project name (Playfair Display, large), tag/category (DM Mono, small, muted), description, tech stack pills, GitHub link + Live link if available
- Cybersecurity projects (AegisGuard, IntelScope) get a tiny `🔴` red dot or `[SEC]` label — the `--red-spider` accent, used here

**Projects Data:**

```
PROJECT 1 — AegisGuard
Tag: Mini-SIEM Security Platform [SEC]
Description: Real-time security monitoring platform that tails auth and web access logs, 
detects SSH brute force attacks (5+ failed attempts from same IP in 60s window), 
SQL injection, XSS, and path traversal using a custom regex rules engine. Ships with 
a live attack simulator sandbox and Discord webhook alerts for High/Critical events.
Stack: Python · FastAPI · SQLite · JavaScript
GitHub: https://github.com/goyalnish26/AegisGuard
Live: https://goyalnish26.github.io/AegisGuard

PROJECT 2 — IntelScope-Pulse
Tag: CVE & Threat Intelligence Dashboard [SEC]
Description: Live threat intelligence dashboard pulling CVE data from NVD API with 
dynamic 90-day rolling windows, severity breakdown charts, and a persistent watchlist. 
Built for analysts who want actionable intel without the noise.
Stack: React · NVD API · Chart.js
GitHub: https://github.com/goyalnish26/IntelScope-Pulse

PROJECT 3 — WriteBlog
Tag: Full-Stack Blogging Platform
Description: Polished Flask blogging platform with role-based auth (reader/author/admin), 
markdown editor with live preview, nested comments, likes, bookmarks, image uploads, 
admin analytics dashboard, rate-limited auth routes, and full Docker + CI support.
Stack: Python · Flask · SQLAlchemy · Bootstrap 5 · Chart.js · Docker · GitHub Actions
GitHub: https://github.com/goyalnish26/writeblog
```

**Experience Section:**
- Section label: `04 / EXPERIENCE`
- Headline: `"Where I've worked"` — Playfair Display
- Timeline layout — a vertical warm `#E9C46A` line on the left, entries hanging off it

```
EXPERIENCE ENTRIES:

1. Backend Developer Intern
   Dreamsoft4u Pvt. Ltd. | 2025 – Present | Jaipur
   Building Odoo 15 REST API module integrating mobile app with Sales module.
   HTTP controllers, ORM queries, JSON response pipelines.
   Stack: Python · Odoo 15 · PostgreSQL · Ubuntu · PyCharm · Git

2. Volunteer — Local Committee Member
   AIESEC in Jaipur | 2023
   Leadership development, cross-cultural project coordination, 
   event management for international youth exchange programs.

3. Intern
   True Value Infosoft | Prior Experience
   Earlier internship experience in software context.
```

**Certifications — presented as editorial cards in a 2x2 grid:**

```
1. Google Cybersecurity Certificate
   Issued by: Google / Coursera
   Year: August 2025
   Credential ID: LGYP4646QM36
   [VERIFIED]

2. NPTEL — Ethical Hacking
   Issued by: IIT Kharagpur (Prof. Indranil Sengupta)
   Year: 2026
   Covers: NMAP, Wireshark, Burp Suite, Metasploit, SQL Injection — 12 weeks

3. NPTEL — Cyber Security & Privacy
   Issued by: NPTEL
   Year: 2026

4. AI Security with Microsoft Sentinel & Copilot for Security
   Issued by: Microsoft (AI Skills Fest — Project Glasswing playlist)
   Year: 2026
   Track: Blue team / AI-powered security operations
```

**Contact Section:**
- Minimal, centered, large
- Headline: `"Let's work together."` — Playfair Display, very large
- Subtext: `"Open to backend roles, cybersecurity internships, SOC positions, and freelance. Remote or Jaipur-based."`
- Three buttons: Send Email · LinkedIn · GitHub
- Below buttons, small DM Mono text: `"Or find a vulnerability in this site. I'll be impressed."`

**Footer:**
```
nishchal goyal · jaipur · 2025
"I'll break it." — Miles Morales
```

---

## MODE 2 — THE SECURITY RESEARCHER

### Visual Philosophy
**Kernel terminal. System intrusion. Phosphor monitor.** NOT the cliché green matrix. Think an actual terminal session on a vintage phosphor monitor — white/silver text on near-black, with amber warnings for critical events. Feels like you've SSH'd into a real system. The Spider-Verse equivalent is Spider-Noir — black and white, high contrast, deeply atmospheric, everything stripped to its raw essence.

This mode is **intentionally less responsive** — on mobile it should look like a terminal that wasn't designed for mobile (because real terminals aren't). It can scroll horizontally slightly on very small screens. On tablet/desktop it is fully usable. This is a design choice, not a bug.

### Color Palette — EXACT HEX VALUES
```
--bg:           #0D0D0D   (near-black, not pure black)
--bg-surface:   #111111   (card/panel backgrounds)
--bg-raised:    #161616   (slightly elevated elements)
--text-primary: #C0C0C0   (silver phosphor white — NOT bright white)
--text-dim:     #4A4A4A   (dimmed text, comments)
--text-bright:  #E8E8E8   (highlighted, important output)
--accent:       #C0C0C0   (same as text-primary, monochromatic)
--amber:        #FFB300   (warnings, alerts, [WARN] tags — use for impact)
--amber-dim:    #7A5500   (dimmed amber for less critical)
--red-alert:    #FF3B30   (critical alerts only — rare)
--border:       #1E1E1E   (subtle borders)
--cursor-blink: #C0C0C0   (terminal cursor)
```

### Typography
```
Everything: "JetBrains Mono" — the ONLY font in hacker mode
Different weights and sizes for hierarchy, but always monospace
Import from Google Fonts
```

### Boot Sequence (Entry Animation)
When user selects H and the glitch transition completes, show a boot sequence BEFORE the portfolio loads:

```
NISHCHAL_OS v2.1.0 — Secure Boot Sequence
==========================================

[  OK  ] Loaded kernel modules
[  OK  ] Started network interfaces
[  OK  ] Mounted filesystems
[ WARN ] Unrecognized session origin detected
[  OK  ] Running identity verification...
[  OK  ] Subject: NISHCHAL GOYAL — clearance confirmed
[ INFO ] Loading security research environment
[ INFO ] Importing threat models...
[  OK  ] AegisGuard daemon: active
[  OK  ] IntelScope-Pulse: syncing CVE feeds
[ INFO ] OverTheWire session: bandit@lvl12
[  OK  ] All systems nominal

Type 'help' to see available commands.
> _
```

Each line types out one by one with slight delay (not too slow — feel like actual boot, not dramatic movie hacking). After last line, brief pause, then portfolio content loads below.

### Layout

**NO traditional navbar.** Instead, a fixed top bar that looks like a terminal status bar:
```
[nish@kali:~] — SECURITY RESEARCH PORTFOLIO          [SESSION ACTIVE] [2025]
```
Single line, full width, `#111111` background, `1px solid #1E1E1E` bottom border. Text in small JetBrains Mono, `#4A4A4A`.

**All sections are presented as terminal command outputs.**

**Hero / Identity Block:**
```
$ whoami
> nishchal_goyal

$ cat identity.txt
> ECE Final Year — SKIT Jaipur, Batch 2027
> Backend Developer. Offensive Security Learner.
> Based in Jaipur, Rajasthan, IN.

$ cat mission.txt
> Break things ethically.
> Find what others miss.
> Never accept the canon.

$ uptime
> Skills active for 3+ years | Currently: eJPT → OSCP pathway
```

**Cyber Skills Block:**
```
$ cat skills --category=security

[SYSTEM] Loading security competency matrix...

[+] Network Security              ██████████░  90%    [PROFICIENT]
[+] SIEM & Log Analysis           █████████░░  85%    [PROFICIENT]
[+] Web Application Pentesting    ████████░░░  78%    [DEVELOPING]
[+] OverTheWire Bandit            ████████░░░  75%    [Lvl 12+ ACTIVE]
[+] TryHackMe CS101               ███████░░░░  70%    [IN PROGRESS]
[+] Threat Intelligence & CVE     ████████░░░  76%    [DEVELOPING]
[+] OSINT & CVE Research          ███████░░░░  68%    [DEVELOPING]
[+] Burp Suite / NMAP / Wireshark ██████░░░░░  60%    [LEARNING]
[+] Metasploit Framework          █████░░░░░░  50%    [LEARNING]
[+] SQL Injection / XSS           ███████░░░░  65%    [DEVELOPING]

[INFO] Current pathway: OverTheWire → THM Jr Pentester → HackTheBox → eJPT → OSCP
[INFO] Long-term target: OSCP certification
```

**Dev Skills (shown as a secondary system scan):**
```
$ cat skills --category=development

[+] Python                        [CORE — 3yrs]
[+] FastAPI / Flask               [CORE — backend]
[+] REST API Design               [CORE]
[+] PostgreSQL / SQLite           [PROFICIENT]
[+] Odoo 15 ERP                   [ACTIVE — current internship]
[+] Linux/Ubuntu                  [DAILY DRIVER]
[+] Git                           [DAILY]
[+] Docker                        [COMPETENT]
[+] JavaScript / React            [COMPETENT]
[+] HTML/CSS                      [COMPETENT]
```

**Projects Block — presented as system entries / threat reports:**
```
$ ls -la /projects/

drwxr-xr-x  aegisguard/
drwxr-xr-x  intelscopepulse/
drwxr-xr-x  writeblog/

$ cat /projects/aegisguard/README

[PROJECT]    AegisGuard — Mini-SIEM Security Platform
[STATUS]     Active | GitHub: github.com/goyalnish26/AegisGuard
[STACK]      Python · FastAPI · SQLite · JavaScript
[THREAT-CAP] SSH Brute Force (stateful, 5+ attempts/60s window)
             SQL Injection · XSS · Path Traversal · Sensitive Dir Discovery
[FEATURES]   Real-time log tailer (auth.log + web_access.log)
             Custom regex rules engine
             Live attack simulator sandbox
             Discord webhook alerts (High + Critical severity)
             Interactive web dashboard with alert management
[LIVE]       goyalnish26.github.io/AegisGuard

$ cat /projects/intelscopepulse/README

[PROJECT]    IntelScope-Pulse — CVE Threat Intelligence Dashboard
[STATUS]     Active | GitHub: github.com/goyalnish26/IntelScope-Pulse
[STACK]      React · NVD API · Chart.js
[FEATURES]   Dynamic 90-day CVE rolling window from NVD API
             Severity breakdown charts
             Persistent watchlist
             Real-time threat feed

$ cat /projects/writeblog/README

[PROJECT]    WriteBlog — Full-Stack Blogging Platform
[STATUS]     Deployed | GitHub: github.com/goyalnish26/writeblog
[STACK]      Python · Flask · SQLAlchemy · Bootstrap 5 · Docker · GitHub Actions
[FEATURES]   Role-based auth (reader/author/admin)
             Markdown editor with live preview
             Nested comments · Likes · Bookmarks
             Admin analytics dashboard
             Rate-limited auth routes
             Docker + CI/CD pipeline
```

**Experience Block:**
```
$ cat /etc/work_history

[ACTIVE]   Dreamsoft4u Pvt. Ltd. — Backend Developer Intern | 2025–Present
           Building Odoo 15 REST API module
           HTTP controllers · ORM queries · JSON pipelines
           Stack: Python · Odoo 15 · PostgreSQL · Ubuntu · PyCharm · Git

[INACTIVE] AIESEC in Jaipur — Volunteer | 2023
           Cross-cultural project coordination
           Leadership development · International youth exchange

[INACTIVE] True Value Infosoft — Intern | Prior
           Software development internship
```

**Certifications Block:**
```
$ cat /etc/credentials

[CREDENTIAL VERIFIED] Google Cybersecurity Certificate
                      Issuer: Google / Coursera
                      Date: August 2025
                      ID: LGYP4646QM36

[CREDENTIAL VERIFIED] NPTEL — Ethical Hacking
                      Issuer: IIT Kharagpur (Prof. Indranil Sengupta)
                      Date: 2026
                      Coverage: NMAP · Wireshark · Burp Suite · Metasploit · SQLi
                      Duration: 12 weeks

[CREDENTIAL VERIFIED] NPTEL — Cyber Security & Privacy
                      Issuer: NPTEL | Date: 2026

[CREDENTIAL VERIFIED] AI Security — Microsoft Sentinel & Copilot for Security
                      Issuer: Microsoft AI Skills Fest
                      Date: 2026
                      Track: Blue team · AI-powered SOC operations
```

**Live Activity Log (animated typewriter, cycling):**

Below credentials, a continuously running log that cycles through these lines with typewriter effect:

```
$ tail -f /var/log/activity.log

[2025-xx-xx 03:17:42] nmap -sV --script=vuln target.host
[2025-xx-xx 03:17:45] >> [SCAN] Port 22 open — SSH detected
[2025-xx-xx 03:17:46] >> [SCAN] Port 80 open — Apache/2.4.41
[2025-xx-xx 03:17:47] >> [SCAN] Port 443 open — TLS 1.3
[2025-xx-xx 03:18:01] cat /var/log/auth.log | grep FAILED
[2025-xx-xx 03:18:02] >> 47 failed SSH attempts from 192.168.1.105
[2025-xx-xx 03:18:02] >> [ALERT] Brute force pattern detected
[2025-xx-xx 03:18:10] python3 aegisguard.py --mode=detect
[2025-xx-xx 03:18:11] >> [CRITICAL] SSH Brute Force — 192.168.1.105
[2025-xx-xx 03:18:11] >> Webhook dispatched to Discord
[2025-xx-xx 03:18:20] ./bandit --level=12
[2025-xx-xx 03:18:21] >> OverTheWire session active
[2025-xx-xx 03:18:30] echo "current_target"
[2025-xx-xx 03:18:31] >> THM Jr Pentester → HackTheBox → eJPT
```

Use actual timestamps with current date, second increments. Loop the sequence.

**Contact Block:**
```
$ contact --list

[METHOD 01] email
            > goyalnishchal71@gmail.com
            > mailto link on click

[METHOD 02] linkedin
            > linkedin.com/in/nishchal-goyal-6409a5289
            > opens in new tab

[METHOD 03] github
            > github.com/goyalnish26
            > opens in new tab

[NOTE] Open to: SOC Analyst · Security Intern · Pentesting · Backend Dev
       Remote or Jaipur-based preferred
       Response time: < 24 hours

$ _
```

**Easter Egg — IMPORTANT:**
If the user types `sudo nish` anywhere while in Hacker mode (listen for keydown events globally in this mode), show a response in the activity log area:

```
[AUTH]  sudo: permission denied — you are not in the sudoers file.
[INFO]  This incident will be reported.
[WARN]  Just kidding. But I'm already in your system.
        — Nishchal
```

Then clear it after 5 seconds.

**Footer in Hacker mode:**
```
[SESSION END] nishchal_goyal@kali — all rights reserved, none respected
[QUOTE] "Everyone told Miles this is how it's supposed to be. He broke the canon anyway."
```

---

## CUSTOM CURSOR — BOTH MODES

Implement a custom cursor on the entire site. Hide the default OS cursor with `cursor: none` on the body.

**Cursor anatomy:**
- A small filled dot, 6px × 6px, perfectly centered
- A circle (ring, no fill), 28px diameter, 1.5px border, following with slight lag (lerp animation — target follows mouse at ~10% per frame)
- The dot snaps to mouse position instantly
- The ring lerps behind with easing

**Dev mode cursor:**
- Dot: `#1A1A1A` fill
- Ring: `#E9C46A` border, 55% opacity
- On hover over any clickable element: ring scales to 48px and border becomes 100% opacity

**Hacker mode cursor:**
- Dot: `#C0C0C0` fill
- Ring: `#C0C0C0` border, 35% opacity
- On hover over clickable: ring scales to 44px, opacity to 70%

**Implementation note:** Use `requestAnimationFrame` loop for smooth lerp. Store mouse X/Y in variables, lerp ring position toward them each frame. Do not use CSS transitions for the ring position — use JS lerp for organic feel.

---

## ANIMATIONS — WHERE THEY MATTER

**Dev Mode:**
- Hero heading: letters animate in on load, staggered, dropping down from above (not fade — actual y-axis movement, 40px drop, easing out)
- Section entries: fade + slight upward slide on scroll into view (IntersectionObserver)
- Project cards: on hover, the left border accent `#E9C46A` slides up from bottom (clip-path or height animation)
- Skill pills: on hover, scale 1.05 and background warms slightly
- The dark cybersecurity panel inside skills section: a subtle amber/gold scan line passes over it every 8 seconds (like a CRT effect, but very subtle — this is still the dev mode)
- Scroll indicator in hero: bouncing arrow, gentle

**Hacker Mode:**
- Boot sequence: each line types in with cursor blink
- All content after boot: typewriter effect, but FAST (not slow dramatic — like real terminal output)
- Activity log: continuous typewriter cycle with realistic timestamp ticking
- Progress bars in skills: fill left to right on first appearance (IntersectionObserver)
- Cursor blink `▋` on the last active line, always
- Subtle CRT scanline overlay on entire page (thin horizontal lines, very low opacity — `repeating-linear-gradient`)
- NO bounce, NO slide animations — everything either types in or appears. This is a terminal.

---

## TECHNICAL REQUIREMENTS

- **Single React JSX file** — everything in one file, no component imports from separate files
- **Google Fonts:** Playfair Display · DM Sans · DM Mono · JetBrains Mono — import via @import in style tag
- **No external component libraries** — no MUI, no Chakra, no Tailwind (Tailwind utility classes are OK if available in environment)
- **No Three.js, no heavy 3D libraries**
- **CSS-in-JS** (inline styles) or a single `<style>` tag at the top of the JSX
- **State management:** useState for mode, useEffect for animations, useRef for cursor
- **Mobile responsive:** Dev mode fully responsive. Hacker mode intentionally terminal-like (less responsive on very small screens — this is a design decision)
- **Performance:** No unnecessary re-renders. Cursor animation via rAF, not React state.
- **Accessibility:** Keep tab focus visible in Dev mode. Hacker mode can be more raw.

---

## THINGS TO NEVER DO

- Do NOT use generic "I am a passionate developer" copy anywhere
- Do NOT make the cybersecurity section just "green text on black" — the hacker mode has its own sophisticated palette
- Do NOT make both modes look similar with just a color change — they must feel like completely different websites
- Do NOT use placeholder Lorem Ipsum text anywhere
- Do NOT add unnecessary sections (no "hobbies" carousel, no "testimonials", no skills percentage circles in dev mode)
- Do NOT simplify the glitch transition to a fade — it must be violent and fast
- Do NOT make the entry screen boring — it should already feel like a choice between two worlds
- Do NOT forget the easter egg (`sudo nish` command in hacker mode)
- Do NOT forget the hidden `// breaking the canon since 2021` line in dev mode hero
- Do NOT forget the Miles Morales quote in the hacker mode footer
- Do NOT use green as the primary hacker mode color — it's silver/phosphor white with amber accents

---

## THE FEELING THIS PORTFOLIO SHOULD LEAVE

Someone opens this portfolio and is immediately asked to choose. That choice matters — it sets the tone for everything after. If they pick Developer, they encounter a warm, editorial, confident person who ships real things. If they pick Security Researcher, they feel like they've SSHed into someone's actual system and are reading their logs. In both cases, they finish and think: *"I need to talk to this person."*

The Spider-Verse reference isn't a theme slapped on top. It's the structural logic — same person, different visual language, different way of telling the same story. Miles broke the canon. Nishchal is breaking his.

---

*End of prompt. Build exactly this. No shortcuts.*
