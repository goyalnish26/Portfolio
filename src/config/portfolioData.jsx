/* eslint-disable react-refresh/only-export-components */
export const BOOT_LINES = [
  "NISHCHAL_OS v2.1.0 — Secure Boot Sequence",
  "==========================================",
  "[  OK  ] Loaded kernel modules",
  "[  OK  ] Started network interfaces",
  "[  OK  ] Mounted filesystems",
  "[ WARN ] Unrecognized session origin detected",
  "[  OK  ] Running identity verification...",
  "[  OK  ] Subject: NISHCHAL GOYAL — clearance confirmed",
  "[ INFO ] Loading security research environment",
  "[ INFO ] Importing threat models...",
  "[  OK  ] AegisGuard daemon: active",
  "[  OK  ] IntelScope-Pulse: syncing CVE feeds",
  "[ INFO ] OverTheWire session: bandit@lvl12",
  "[  OK  ] All systems nominal",
  "Type 'help' to see available commands."
];

export const logTemplates = [
  { text: 'nmap -sV --script=vuln target.host', isCommand: true, offsetSec: 0 },
  { text: '>> [SCAN] Port 22 open — SSH detected', isCommand: false, offsetSec: 3 },
  { text: '>> [SCAN] Port 80 open — Apache/2.4.41', isCommand: false, offsetSec: 4 },
  { text: '>> [SCAN] Port 443 open — TLS 1.3', isCommand: false, offsetSec: 5 },
  { text: 'cat /var/log/auth.log | grep FAILED', isCommand: true, offsetSec: 19 },
  { text: '>> 47 failed SSH attempts from 192.168.1.105', isCommand: false, offsetSec: 20 },
  { text: '>> [ALERT] Brute force pattern detected', isCommand: false, offsetSec: 20 },
  { text: 'python3 aegisguard.py --mode=detect', isCommand: true, offsetSec: 28 },
  { text: '>> [CRITICAL] SSH Brute Force — 192.168.1.105', isCommand: false, offsetSec: 29 },
  { text: '>> Webhook dispatched to Discord', isCommand: false, offsetSec: 29 },
  { text: './bandit --level=12', isCommand: true, offsetSec: 38 },
  { text: '>> OverTheWire session active', isCommand: false, offsetSec: 39 },
  { text: 'echo "current_target"', isCommand: true, offsetSec: 48 },
  { text: '>> THM Jr Pentester → HackTheBox → eJPT', isCommand: false, offsetSec: 49 }
];

export const devSkills = [
  { name: 'Python', size: '1.25rem' },
  { name: 'FastAPI', size: '1.2rem' },
  { name: 'Flask', size: '1.15rem' },
  { name: 'REST APIs', size: '1.25rem' },
  { name: 'PostgreSQL', size: '1.15rem' },
  { name: 'SQLite', size: '1.1rem' },
  { name: 'Odoo 15 ERP', size: '1.2rem' },
  { name: 'Git', size: '1.1rem' },
  { name: 'Linux/Ubuntu', size: '1.2rem' },
  { name: 'Docker', size: '1.1rem' },
  { name: 'JavaScript', size: '1.1rem' },
  { name: 'React', size: '1.15rem' },
  { name: 'HTML/CSS', size: '1.05rem' },
  { name: 'Odoo ORM', size: '1.15rem' },
  { name: 'PyCharm', size: '1.05rem' }
];

export const padRight = (str, len) => {
  return str + " ".repeat(Math.max(0, len - str.length));
};

export const HELP_TEXT = `AVAILABLE COMMANDS:

about           About Nishchal
whoami          Display identity
skills          Technical skills
projects        List projects
project         View project details
experience      Professional experience
certs           Certifications
journey         Learning journey
contact         Contact information
hero            Print hero greeting section

themes          List available themes
theme           Apply a theme

canon           Canon event status
lore            Personal story
origin          Starting point
reality         Current status
watcher         Hidden observer
masks           Dual identity
nexus           Universe status
bike            CB350 reference
coffee          Random coffee status

clear           Clear terminal
maskoff         Return to Developer Mode

Tab  =>  Autocompletes the command`;

export const WHOAMI_TEXT = `nishchal_goyal
ECE Final Year · SKIT Jaipur, Batch 2027
Backend Developer · Offensive Security Learner
Based in Jaipur, Rajasthan`;

export const ABOUT_TEXT = `I build backend systems that actually work.
I break into systems to make them better.

Currently in my final year at SKIT Jaipur,
interning at Dreamsoft4u building Odoo 15 REST APIs.

On the other side, I'm deep into offensive security —
OverTheWire, TryHackMe, building my own SIEM tools.

The goal: get good enough that breaking in becomes
second nature. Certified by Google in Cybersecurity.
Currently on the eJPT → OSCP pathway.

I don't accept the canon. I break it.`;

export const SKILLS_TEXT = `DEVELOPMENT:
  Python, FastAPI, Flask, REST APIs, PostgreSQL,
  SQLite, Odoo 15 ERP, Git, Linux/Ubuntu, Docker,
  JavaScript, React, HTML/CSS, ORM

CYBERSECURITY:
  Network Security, SIEM & Log Analysis,
  Web Application Pentesting, OverTheWire Bandit,
  TryHackMe, Threat Intelligence, OSINT,
  CVE Research, Burp Suite, NMAP`;

export const PROJECTS_TEXT = `aegisguard         Mini-SIEM Security Platform
intelscope         CVE Threat Intelligence Dashboard
writeblog          Full-Stack Blogging Platform

View details: project <name>`;

export const EXPERIENCE_TEXT = `Dreamsoft4u Pvt. Ltd. — Backend Developer Intern
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
May 21, 2026 – Present | Jaipur

Building Odoo 15 REST API module integrating mobile
app with Sales module. HTTP controllers, ORM queries,
JSON response pipelines.

Stack: Python · Odoo 15 · PostgreSQL · Ubuntu

---

True Value Infosoft — Python Developer Intern
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Prior

Developed Flask-based multi-user blog application with authentication, dashboard, CRUD functionality.
Implemented user dashboard, full CRUD functionalities for articles, and database mapping using SQLAlchemy.
Designed responsive Bootstrap templates and integrated SQLite database schemas.

---

AIESEC in Jaipur — Volunteer
━━━━━━━━━━━━━━━━━━━━━━━━━━
2023

Leadership development, cross-cultural project
coordination, international youth exchange programs.`;

export const CERTS_TEXT = `Google Cybersecurity Certificate
  Issuer: Google / Coursera
  Date: August 2025
  ID: LGYP4646QM36
  [VERIFIED ✓]

Deloitte Australia — Cyber Job Simulation
  Issuer: Forage
  Date: October 2025
  ID: 2LN74jKozspnmt3kh
  [VERIFIED ✓]

J.P. Morgan — Software Engineering Job Simulation
  Issuer: Forage
  Date: October 2025
  ID: BvwC2Ge8oKbGSzgfr
  [VERIFIED ✓]

PLC Programming & Its Applications
  Issuer: CSIR-CEERI
  Date: November 2024
  [VERIFIED ✓]`;

export const JOURNEY_TEXT = `Started learning Python in 2nd year.
Fell in love with backend development.
Built Flask projects, REST APIs, databases.

ECE student doing cybersecurity was unconventional.
Everyone said: embedded systems, placement chasing.
I said: no thanks.

Started with OverTheWire Bandit. Level 12+.
Moved to TryHackMe CS101 path.
Building my own SIEM tools.

The learning never stops.
The canon isn't the destination.
Breaking it is.`;

export const CONTACT_TEXT_JSX = () => (
  <pre className="terminal-output-text">
    {'Email: '}<a href="mailto:goyalnishchal71@gmail.com" target="_blank" rel="noopener noreferrer" className="terminal-link">goyalnishchal71@gmail.com</a>{`\nLinkedIn: `}<a href="https://linkedin.com/in/nishchal-goyal-6409a5289" target="_blank" rel="noopener noreferrer" className="terminal-link">linkedin.com/in/nishchal-goyal-6409a5289</a>{`\nGitHub: `}<a href="https://github.com/goyalnish26" target="_blank" rel="noopener noreferrer" className="terminal-link">github.com/goyalnish26</a>{`\n\nOpen to: SOC Analyst · Security Intern · \n         Pentesting · Backend Development\nLocation: Remote or Jaipur-based\nResponse: < 24 hours`}
  </pre>
);

export const CANON_TEXT = `Canon Event 1:
  Everyone told me: ECE = embedded systems
Canon Breaker Response:
  I chose: backend + cybersecurity

Canon Event 2:
  Placement culture = TCS / Infosys / Wipro
Canon Breaker Response:
  I'm building my own path

Canon Event 3:
  Students follow the conventional roadmap
Canon Breaker Response:
  I break the roadmap

This universe rewards risk-takers.
I'm taking risks.`;

export const LORE_TEXT = `Started in 2nd year with Python basics.
Syntax felt natural. Logic clicked.

Built small projects. Flask apps. Database queries.
Fell in love with the craft.

3rd year: discovered cybersecurity.
Found something even more compelling —
the intersection of building AND breaking.

ECE student doing backend + hacking?
Not on the conventional path.
But the best journeys never are.

Everyone has a canon event — the moment
the universe tells you who you're supposed to be.

I rejected mine.`;

export const ORIGIN_TEXT = `SKIT Jaipur
B.Tech Electronics & Communication Engineering
Batch 2027 · 7.5 CGPA · No Backlogs

Started with Python.
Moved to FastAPI, Flask.
REST APIs became home.

Found security in year 3.
Never looked back.

This is where it began.`;

export const REALITY_TEXT = `Current State:
  Final year ECE student
  Backend Intern @ Dreamsoft4u
  Building Odoo 15 REST APIs

Goals:
  Secure a backend/security role (startup preferred)
  Complete eJPT certification
  Begin OSCP pathway
  Build more SIEM tools

Challenges:
  Time management: full-time student + internship + learning
  Skills still developing in offensive security
  Balancing portfolio projects + placement prep
  Finding mentors in the pentesting space

But I'm not stopping.`;

export const WATCHER_TEXT = `You weren't supposed to find this.

But you did.

This terminal is a window into parallel dimensions.
Each theme is a different universe.
Each command is a breadcrumb.

The watcher observes all versions of reality.
The one where you chose the mask.
The one where you put it down.
The one where you break the canon.

Welcome to Earth-26.`;

export const MASKS_TEXT = `Mask 1: THE DEVELOPER
  Clean code. REST APIs. Production systems.
  Writes. Ships. Iterates.
  Attention to detail. Craft matters.

Mask 2: THE SECURITY RESEARCHER
  Breaking systems. Finding entry points.
  Ethical hacking. Offensive mindset.
  Nobody gets past. Always looking deeper.

Same person.
Different masks.
Same core: curiosity + precision + relentless learning.

The masks are real.
The person beneath them is realer.`;

export const NEXUS_TEXT = `Current Universe: Earth-26
Status: Stable
Anomalies: None detected

Dimension bridged via Spider-Verse protocol.
Canon events: 3 rejected
Reality stability: High
Observer status: Active

Welcome to the nexus point.
This is where the canon breaks.`;

export const BIKE_TEXT = `Honda CB350 Classic · 2024 · Jaipur

Black fuel tank, retro frame, classic vibes.
Two wheels. Open road. No distractions.

When the terminal gets too intense,
the bike reminds me: sometimes you just ride.`;

export const MILES_TEXT = `NAAAHHHHHH,
The mask stays on.`;

export const PETER_TEXT = `With great power, 
comes great technical debt.`;

export const THEMES_TEXT = `Available themes:

light  dark  peter  miles  noir  2099  kali

Usage: theme <name>
Example: theme miles`;

export const COFFEE_TEXTS = [
  `☕ Status: Brewing...
Current caffeine level: 73%
Motivation multiplier: 2.1x`,
  `☕ Null pointer exception detected in coffee cup
Stack overflow of espresso shots
No solutions. Only more coffee.`,
  `☕ Coffee status: Too hot to handle
Temperature: Absolute unit
Recommendation: Wait 5 minutes. Or don't.`,
  `☕ Coffee debug log:
[01:47:23] Coffee loaded
[01:47:24] Neural pathways activated
[01:47:26] Debugging initiated. All systems nominal.`,
  `☕ sudo make coffee
[sudo] password for nishchal:
Making coffee... ✓ Complete`
];

export const getGreetingOutput = () => {
  const nameLines = [
    " ███╗   ██╗██╗███████╗██╗  ██╗ ██████╗██╗  ██╗ █████╗ ██╗     ",
    " ████╗  ██║██║██╔════╝██║  ██║██╔════╝██║  ██║██╔══██╗██║     ",
    " ██╔██╗ ██║██║███████╗███████║██║     ███████║███████║██║     ",
    " ██║╚██╗██║██║╚════██║██╔══██║██║     ██╔══██║██╔══██║██║     ",
    " ██║ ╚████║██║███████║██║  ██║╚██████╗██║  ██║██║  ██║███████╗",
    " ╚═╝  ╚═══╝╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝"
  ];
  const figureLines = [
    "       ,##,,eew,",
    "     ,##############C",
    "  a###############@##",
    " 7####^`^\"7W7^\"@####",
    " @#@b`         ^@#@^",
    "  ##^,,,,   ,,,,^#^",
    " ,,@######\"#######=",
    "  .''555\"` '5555b|",
    "  T\"@  ,,,^,mg,@,*",
    "     %p||`~~'.#`",
    "      ^Wp  ,#T",
    "     :b''@@b^}",
    "  ,^      ^      b 3-",
    ".<` 'p    <🕷>    b   *.",
    "      }   #\"GpGb   [",
    "      3 * @#######Nl      `",
    "           ^@##b     ($    !"
  ];
  return (
    <div className="terminal-system-greeting">
      <div className="terminal-hero-row">
        <div className="terminal-hero-left">
          <pre className="terminal-ascii-art">
            {nameLines.join("\n")}
          </pre>
          <div className="terminal-welcome-msg" style={{ marginTop: '1rem' }}>Welcome back.</div>
          <div className="terminal-welcome-sub" style={{ fontStyle: 'italic', margin: '0.4rem 0', color: 'var(--hacker-secondary)' }}>
            building systems by day<br />
            breaking them by night
          </div>
          <div className="terminal-welcome-sub">Type &apos;help&apos; to begin.</div>
        </div>
        <div className="terminal-hero-right">
          <pre className="terminal-ascii-figure">
            {figureLines.join("\n")}
          </pre>
        </div>
      </div>
    </div>
  );
};
