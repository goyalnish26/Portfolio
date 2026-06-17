import React, { useState, useEffect, useRef } from 'react';
import heroImage from './assets/hero.png';

// Google Fonts are imported dynamically in the styles below.

const BOOT_LINES = [
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

const logTemplates = [
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

const devSkills = [
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

// Helper to pad strings for monospace alignment
const padRight = (str, len) => {
  return str + " ".repeat(Math.max(0, len - str.length));
};

const TerminalText = ({ children }) => (
  <pre className="terminal-output-text">{children}</pre>
);

const HELP_TEXT = `AVAILABLE COMMANDS:

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
maskoff         Return to Developer Mode`;

const WHOAMI_TEXT = `nishchal_goyal
ECE Final Year · SKIT Jaipur, Batch 2027
Backend Developer · Offensive Security Learner
Based in Jaipur, Rajasthan`;

const ABOUT_TEXT = `I build backend systems that actually work.
I break into systems to make them better.

Currently in my final year at SKIT Jaipur,
interning at Dreamsoft4u building Odoo 15 REST APIs.

On the other side, I'm deep into offensive security —
OverTheWire, TryHackMe, building my own SIEM tools.

The goal: get good enough that breaking in becomes
second nature. Certified by Google in Cybersecurity.
Currently on the eJPT → OSCP pathway.

I don't accept the canon. I break it.`;

const SKILLS_TEXT = `DEVELOPMENT:
  Python, FastAPI, Flask, REST APIs, PostgreSQL,
  SQLite, Odoo 15 ERP, Git, Linux/Ubuntu, Docker,
  JavaScript, React, HTML/CSS, ORM

CYBERSECURITY:
  Network Security, SIEM & Log Analysis,
  Web Application Pentesting, OverTheWire Bandit,
  TryHackMe, Threat Intelligence, OSINT,
  CVE Research, Burp Suite, NMAP`;

const PROJECTS_TEXT = `aegisguard         Mini-SIEM Security Platform
intelscope         CVE Threat Intelligence Dashboard
writeblog          Full-Stack Blogging Platform

View details: project <name>`;

const EXPERIENCE_TEXT = `Dreamsoft4u Pvt. Ltd. — Backend Developer Intern
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

const CERTS_TEXT = `Google Cybersecurity Certificate
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

const JOURNEY_TEXT = `Started learning Python in 2nd year.
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

const CONTACT_TEXT_JSX = () => (
  <pre className="terminal-output-text">
    {'Email: '}<a href="mailto:goyalnishchal71@gmail.com" target="_blank" rel="noopener noreferrer" className="terminal-link">goyalnishchal71@gmail.com</a>{`\nLinkedIn: `}<a href="https://linkedin.com/in/nishchal-goyal-6409a5289" target="_blank" rel="noopener noreferrer" className="terminal-link">linkedin.com/in/nishchal-goyal-6409a5289</a>{`\nGitHub: `}<a href="https://github.com/goyalnish26" target="_blank" rel="noopener noreferrer" className="terminal-link">github.com/goyalnish26</a>{`\n\nOpen to: SOC Analyst · Security Intern · \n         Pentesting · Backend Development\nLocation: Remote or Jaipur-based\nResponse: < 24 hours`}
  </pre>
);

const CANON_TEXT = `Canon Event 1:
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

const LORE_TEXT = `Started in 2nd year with Python basics.
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

const ORIGIN_TEXT = `SKIT Jaipur
B.Tech Electronics & Communication Engineering
Batch 2027 · 7.5 CGPA · No Backlogs

Started with Python.
Moved to FastAPI, Flask.
REST APIs became home.

Found security in year 3.
Never looked back.

This is where it began.`;

const REALITY_TEXT = `Current State:
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

const WATCHER_TEXT = `You weren't supposed to find this.

But you did.

This terminal is a window into parallel dimensions.
Each theme is a different universe.
Each command is a breadcrumb.

The watcher observes all versions of reality.
The one where you chose the mask.
The one where you put it down.
The one where you break the canon.

Welcome to Earth-26.`;

const MASKS_TEXT = `Mask 1: THE DEVELOPER
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

const NEXUS_TEXT = `Current Universe: Earth-26
Status: Stable
Anomalies: None detected

Dimension bridged via Spider-Verse protocol.
Canon events: 3 rejected
Reality stability: High
Observer status: Active

Welcome to the nexus point.
This is where the canon breaks.`;

const BIKE_TEXT = `Honda CB350 Classic · 2024 · Jaipur

Red fuel tank, retro frame, classic vibes.
Two wheels. Open road. No distractions.

When the terminal gets too intense,
the bike reminds me: sometimes you just ride.`;

const MILES_TEXT = `The mask stays on.`;

const PETER_TEXT = `With great power comes technical debt.`;

const THEMES_TEXT = `Available themes:

light  dark  peter  miles  noir  2099  kali

Usage: theme <name>
Example: theme miles`;

const COFFEE_TEXTS = [
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

const getGreetingOutput = () => {
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

function App() {
  const [mode, setMode] = useState('entry'); // 'entry', 'dev', 'hacker'
  const [transitioning, setTransitioning] = useState(false);
  const [nextMode, setNextMode] = useState(null);
  const [entryExpandingSide, setEntryExpandingSide] = useState(null); // 'dev' or 'hacker'

  // Custom Cursor Refs
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  // Developer Menu state
  const [menuOpen, setMenuOpen] = useState(false);

  // Rebuilt Hacker Mode state variables & refs
  const [hackerState, setHackerState] = useState('terminal'); // starts directly in terminal
  const [hackerInput, setHackerInput] = useState('');
  const [hackerHistory, setHackerHistory] = useState([
    { command: null, output: getGreetingOutput() }
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cursorPos, setCursorPos] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [hackerTheme, setHackerTheme] = useState(() => {
    return localStorage.getItem('hackerModeTheme') || 'dark';
  });
  const [lastLoginTime, setLastLoginTime] = useState('');
  const [canonRejectedActive, setCanonRejectedActive] = useState(false);
  const [exitingTerminal, setExitingTerminal] = useState(false);
  const [unmaskProtocolState, setUnmaskProtocolState] = useState(null); // null, 'exit', 'sync', 'off'

  const terminalInputRef = useRef(null);
  const terminalHistoryRef = useRef(null);

  // Navbar blur background state
  const [scrolled, setScrolled] = useState(false);

  // Smooth expand transition for entry screen
  const entryTransition = (targetMode) => {
    if (entryExpandingSide) return;
    setEntryExpandingSide(targetMode);
    
    // After expand animation completes (700ms), switch mode
    setTimeout(() => {
      setMode(targetMode);
      setEntryExpandingSide(null);
      if (targetMode === 'hacker') {
        setHackerState('terminal');
        setHackerInput('');
        setCursorPos(0);
        setHistoryIndex(-1);
        setHackerHistory([{ command: null, output: getGreetingOutput() }]);
        setCanonRejectedActive(false);
        setExitingTerminal(false);
        const now = new Date();
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const dayStr = days[now.getDay()];
        const monthStr = months[now.getMonth()];
        const dateStr = String(now.getDate()).padStart(2, '0');
        const timeStr = now.toTimeString().split(' ')[0];
        const yearStr = now.getFullYear();
        setLastLoginTime(`${dayStr} ${monthStr} ${dateStr} ${timeStr} ${yearStr}`);
      }
    }, 700);
  };

  // Canon Shift glitch transition — ONLY for switching between dev <-> hacker
  const triggerTransition = (targetMode) => {
    if (transitioning) return;
    setTransitioning(true);
    setNextMode(targetMode);

    // Switch underlying content at the visual peak (400ms)
    setTimeout(() => {
      setMode(targetMode);
      if (targetMode === 'hacker') {
        setHackerState('terminal');
        setHackerInput('');
        setCursorPos(0);
        setHistoryIndex(-1);
        setHackerHistory([{ command: null, output: getGreetingOutput() }]);
        setCanonRejectedActive(false);
        setExitingTerminal(false);
        const now = new Date();
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const dayStr = days[now.getDay()];
        const monthStr = months[now.getMonth()];
        const dateStr = String(now.getDate()).padStart(2, '0');
        const timeStr = now.toTimeString().split(' ')[0];
        const yearStr = now.getFullYear();
        setLastLoginTime(`${dayStr} ${monthStr} ${dateStr} ${timeStr} ${yearStr}`);
      }
    }, 400);

    // Complete transition (800ms)
    setTimeout(() => {
      setTransitioning(false);
      setNextMode(null);
    }, 800);
  };

  // Keyboard input for selection
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      const key = e.key.toLowerCase();

      // Mode entry choice — smooth expand (no glitch)
      if (mode === 'entry' && !entryExpandingSide) {
        if (key === 'd') {
          entryTransition('dev');
        } else if (key === 'h') {
          entryTransition('hacker');
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [mode, entryExpandingSide]);

  // === DEV MODE EASTER EGG STATES ===
  const [spiderWebTooltip, setSpiderWebTooltip] = useState(false);
  const [maskProtocolState, setMaskProtocolState] = useState(null); // null, 'init', 'sync', 'ready'
  const [bikeRides, setBikeRides] = useState([]);
  const [devPostCreditsState, setDevPostCreditsState] = useState(null); // null, 'wait', 'rejected', 'loading', 'cursor'
  const [spiderSenseNear, setSpiderSenseNear] = useState(false);
  const devPostCreditsSentinelRef = useRef(null);

  const triggerMaskProtocol = () => {
    if (maskProtocolState !== null) return;
    setMaskProtocolState('init');
    setTimeout(() => {
      setMaskProtocolState('sync');
    }, 1000);
    setTimeout(() => {
      setMaskProtocolState('ready');
    }, 2000);
    setTimeout(() => {
      triggerTransition('hacker');
      setTimeout(() => {
        setMaskProtocolState(null);
      }, 1000);
    }, 2600);
  };

  const triggerBikeRide = () => {
    const newRide = { id: Date.now() + Math.random() };
    setBikeRides(prev => [...prev, newRide]);
  };

  // Dev mode keydown buffer for "maskon"
  const devKeyBuffer = useRef('');
  useEffect(() => {
    if (mode !== 'dev') return;
    const handleDevKeyDown = (e) => {
      if (e.target.closest('input, textarea')) return;
      if (e.key.length === 1) {
        devKeyBuffer.current = (devKeyBuffer.current + e.key.toLowerCase()).slice(-10);
        if (devKeyBuffer.current.endsWith('maskon')) {
          triggerMaskProtocol();
          devKeyBuffer.current = '';
        }
      }
    };
    window.addEventListener('keydown', handleDevKeyDown);
    return () => window.removeEventListener('keydown', handleDevKeyDown);
  }, [mode, maskProtocolState]);

  // Dev post-credits observer with 4s delay and state transitions
  const isSentinelIntersecting = useRef(false);
  const postCreditsTimer = useRef(null);

  useEffect(() => {
    if (mode !== 'dev' || !devPostCreditsSentinelRef.current) return;
    if (sessionStorage.getItem('devPostCreditsSeen')) return;

    const observer = new IntersectionObserver(([entry]) => {
      isSentinelIntersecting.current = entry.isIntersecting;

      if (entry.isIntersecting) {
        if (postCreditsTimer.current) clearTimeout(postCreditsTimer.current);

        postCreditsTimer.current = setTimeout(() => {
          if (isSentinelIntersecting.current) {
            sessionStorage.setItem('devPostCreditsSeen', 'true');
            setDevPostCreditsState('wait');
            
            setTimeout(() => {
              setDevPostCreditsState('rejected');
            }, 2000);
            
            setTimeout(() => {
              setDevPostCreditsState('loading');
            }, 3500);
            
            setTimeout(() => {
              setDevPostCreditsState('cursor');
            }, 4500);
          }
        }, 4000);
      } else {
        if (postCreditsTimer.current) {
          clearTimeout(postCreditsTimer.current);
          postCreditsTimer.current = null;
        }
      }
    }, { threshold: 0.1 });

    observer.observe(devPostCreditsSentinelRef.current);
    return () => {
      observer.disconnect();
      if (postCreditsTimer.current) clearTimeout(postCreditsTimer.current);
    };
  }, [mode]);



  // Navbar scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom Cursor tracking & Proximity detection
  useEffect(() => {
    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${e.clientX}px`;
        cursorDotRef.current.style.top = `${e.clientY}px`;
      }

      // Proximity check for spider sense
      if (mode === 'dev') {
        const triggers = document.querySelectorAll('.spider-sense-trigger');
        let near = false;
        const radius = window.innerWidth < 768 ? 60 : 40;
        
        for (let i = 0; i < triggers.length; i++) {
          const rect = triggers[i].getBoundingClientRect();
          const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
          const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < radius) {
            near = true;
            break;
          }
        }
        setSpiderSenseNear(near);
      } else {
        setSpiderSenseNear(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [mode]);

  // Custom Cursor ring lerping
  useEffect(() => {
    let rAF;
    const updateRing = () => {
      const lerpFactor = 0.12;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = `${ringPos.current.x}px`;
        cursorRingRef.current.style.top = `${ringPos.current.y}px`;
      }
      rAF = requestAnimationFrame(updateRing);
    };
    rAF = requestAnimationFrame(updateRing);
    return () => cancelAnimationFrame(rAF);
  }, []);

  // Hover detection for interactive items
  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, select, input, textarea, [role="button"], .interactive');
      if (target) {
        if (cursorRingRef.current) cursorRingRef.current.classList.add('cursor-hover');
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, select, input, textarea, [role="button"], .interactive');
      if (target) {
        if (cursorRingRef.current) cursorRingRef.current.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  // Scroll terminal history to bottom
  useEffect(() => {
    if (mode === 'hacker' && hackerState === 'terminal' && terminalHistoryRef.current) {
      terminalHistoryRef.current.scrollTop = terminalHistoryRef.current.scrollHeight;
    }
  }, [hackerHistory, hackerState, mode]);

  // Focus terminal input
  useEffect(() => {
    if (mode === 'hacker' && hackerState === 'terminal') {
      terminalInputRef.current?.focus();
    }
  }, [mode, hackerState]);

  // Handle terminal command execution
  const handleTerminalKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const historyCmds = hackerHistory
        .map(h => h.command)
        .filter(cmd => cmd !== null && cmd !== undefined && cmd.trim() !== '');
      if (historyCmds.length > 0) {
        let newIndex = historyIndex;
        if (historyIndex === -1) {
          newIndex = historyCmds.length - 1;
        } else if (historyIndex > 0) {
          newIndex = historyIndex - 1;
        }
        setHistoryIndex(newIndex);
        setHackerInput(historyCmds[newIndex]);
        setCursorPos(historyCmds[newIndex].length);
      }
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const historyCmds = hackerHistory
        .map(h => h.command)
        .filter(cmd => cmd !== null && cmd !== undefined && cmd.trim() !== '');
      if (historyCmds.length > 0 && historyIndex !== -1) {
        if (historyIndex < historyCmds.length - 1) {
          const newIndex = historyIndex + 1;
          setHistoryIndex(newIndex);
          setHackerInput(historyCmds[newIndex]);
          setCursorPos(historyCmds[newIndex].length);
        } else {
          setHistoryIndex(-1);
          setHackerInput('');
          setCursorPos(0);
        }
      }
    }
    if (e.key === 'Enter') {
      const rawCmd = hackerInput;
      const cmdTrimmed = rawCmd.trim();
      setHackerInput('');
      setCursorPos(0);
      setHistoryIndex(-1);
      
      if (!cmdTrimmed) {
        setHackerHistory(prev => [...prev, { command: '', output: null }]);
        return;
      }
      
      const parts = cmdTrimmed.split(/\s+/);
      const command = parts[0].toLowerCase();
      const args = parts.slice(1);
      
      let output = null;

      // Abbreviations mapping
      let cmdMatched = command;
      if (command === 's') cmdMatched = 'skills';
      else if (command === 'p') cmdMatched = 'projects';
      else if (command === 'c') cmdMatched = 'contact';

      switch (cmdMatched) {
        case 'help':
          output = <TerminalText>{HELP_TEXT}</TerminalText>;
          break;
        case 'whoami':
          output = <TerminalText>{WHOAMI_TEXT}</TerminalText>;
          break;
        case 'about':
          output = <TerminalText>{ABOUT_TEXT}</TerminalText>;
          break;
        case 'skills':
          output = <TerminalText>{SKILLS_TEXT}</TerminalText>;
          break;
        case 'projects':
          output = <TerminalText>{PROJECTS_TEXT}</TerminalText>;
          break;
        case 'project': {
          const targetProj = args[0] ? args[0].toLowerCase() : '';
          if (targetProj === 'aegisguard') {
            output = (
              <pre className="terminal-output-text">
                {`AegisGuard — Real-time Security Monitoring Platform\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nReal-time log monitoring tailing auth.log and\nweb_access.log streams. Detects:\n\n  • SSH Brute Force (5+ failed attempts per 60s window)\n  • SQL Injection patterns\n  • Cross-Site Scripting (XSS) vectors\n  • Path Traversal attempts\n  • Sensitive directory discovery\n\nCustom regex rules engine. Zero dependencies.\nLive attack simulator sandbox for testing.\nDiscord webhook alerts for High + Critical severity events.\n\nStack: Python · FastAPI · SQLite · JavaScript\n\nRepository: `}<a href="https://github.com/goyalnish26/AegisGuard" target="_blank" rel="noopener noreferrer" className="terminal-link">github.com/goyalnish26/AegisGuard</a>{`\nLive Demo: `}<a href="https://goyalnish26.github.io/AegisGuard" target="_blank" rel="noopener noreferrer" className="terminal-link">goyalnish26.github.io/AegisGuard</a>
              </pre>
            );
          } else if (targetProj === 'intelscope' || targetProj === 'intelscope-pulse') {
            output = (
              <pre className="terminal-output-text">
                {`IntelScope-Pulse — CVE Threat Intelligence Dashboard\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nLive threat intelligence dashboard pulling CVE data\nfrom the NVD API. Features:\n\n  • Dynamic 90-day rolling window queries\n  • Real-time severity breakdown charts\n  • Persistent CVE watchlist\n  • Actionable threat classification\n\nBuilt for analysts who want signal, not noise.\n\nStack: React · NVD API · Chart.js\n\nRepository: `}<a href="https://github.com/goyalnish26/IntelScope-Pulse" target="_blank" rel="noopener noreferrer" className="terminal-link">github.com/goyalnish26/IntelScope-Pulse</a>
              </pre>
            );
          } else if (targetProj === 'writeblog') {
            output = (
              <pre className="terminal-output-text">
                {`WriteBlog — Full-Stack Blogging Platform\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nPolished Flask blogging application with:\n\n  • Role-based authentication (reader/author/admin)\n  • Markdown editor with live preview\n  • Nested comments system\n  • Likes and bookmarks\n  • Image uploads\n  • Admin analytics dashboard\n  • Rate-limited auth routes\n  • Full Docker + CI/CD pipeline\n\nStack: Python · Flask · SQLAlchemy · Bootstrap 5 ·\n       Chart.js · Docker · GitHub Actions\n\nRepository: `}<a href="https://github.com/goyalnish26/writeblog" target="_blank" rel="noopener noreferrer" className="terminal-link">github.com/goyalnish26/writeblog</a>
              </pre>
            );
          } else {
            output = <TerminalText>{`Project not found.
Available: aegisguard, intelscope, writeblog`}</TerminalText>;
          }
          break;
        }
        case 'experience':
          output = <TerminalText>{EXPERIENCE_TEXT}</TerminalText>;
          break;
        case 'certs':
          output = <TerminalText>{CERTS_TEXT}</TerminalText>;
          break;
        case 'journey':
          output = <TerminalText>{JOURNEY_TEXT}</TerminalText>;
          break;
        case 'contact':
          output = <CONTACT_TEXT_JSX />;
          break;
        case 'canon':
          output = <TerminalText>{CANON_TEXT}</TerminalText>;
          break;
        case 'lore':
          output = <TerminalText>{LORE_TEXT}</TerminalText>;
          break;
        case 'origin':
          output = <TerminalText>{ORIGIN_TEXT}</TerminalText>;
          break;
        case 'reality':
          output = <TerminalText>{REALITY_TEXT}</TerminalText>;
          break;
        case 'watcher':
          output = <TerminalText>{WATCHER_TEXT}</TerminalText>;
          break;
        case 'masks':
          output = <TerminalText>{MASKS_TEXT}</TerminalText>;
          break;
        case 'nexus':
          output = <TerminalText>{NEXUS_TEXT}</TerminalText>;
          break;
        case 'bike':
          output = <TerminalText>{BIKE_TEXT}</TerminalText>;
          break;
        case 'coffee': {
          const randomIndex = Math.floor(Math.random() * COFFEE_TEXTS.length);
          output = <TerminalText>{COFFEE_TEXTS[randomIndex]}</TerminalText>;
          break;
        }
        case 'miles':
          output = <TerminalText>{MILES_TEXT}</TerminalText>;
          break;
        case 'peter':
          output = <TerminalText>{PETER_TEXT}</TerminalText>;
          break;
        case 'glitch':
          setIsGlitching(true);
          setTimeout(() => {
            setIsGlitching(false);
          }, 250);
          output = null;
          break;
        case 'hero':
          output = getGreetingOutput();
          break;
        case 'themes':
          output = <TerminalText>{THEMES_TEXT}</TerminalText>;
          break;
        case 'theme': {
          const targetTheme = args[0] ? args[0].toLowerCase() : '';
          const validThemes = ['light', 'dark', 'peter', 'miles', 'noir', '2099', 'kali'];
          if (validThemes.includes(targetTheme)) {
            setHackerTheme(targetTheme);
            localStorage.setItem('hackerModeTheme', targetTheme);
            let themeResponse = '';
            if (targetTheme === 'light') themeResponse = "Day Mode Activated.\nTheme updated successfully.";
            else if (targetTheme === 'dark') themeResponse = "Night Mode Activated.\nTheme updated successfully.";
            else if (targetTheme === 'peter') themeResponse = "Dimension Shift Successful.\nPeter Universe Connected.";
            else if (targetTheme === 'miles') themeResponse = "Dimension Shift Successful.\nEarth-1610 Connected.";
            else if (targetTheme === 'noir') themeResponse = "Dimension Shift Successful.\nNoir Universe Connected.";
            else if (targetTheme === '2099') themeResponse = "Dimension Shift Successful.\nNueva York Connected.";
            else if (targetTheme === 'kali') themeResponse = "Kali Environment Loaded.\nHappy Hacking.";
            output = <TerminalText>{themeResponse}</TerminalText>;
          } else {
            output = <TerminalText>{`Theme not found.
Type: themes
to view available themes.`}</TerminalText>;
          }
          break;
        }
        case 'clear':
          setHackerHistory([]);
          return;
        case 'maskoff':
          setExitingTerminal(true);
          setHackerHistory(prev => [...prev, { command: rawCmd, output: <TerminalText>Exiting terminal...</TerminalText> }]);
          setTimeout(() => {
            setHackerHistory(prev => [...prev, { command: null, output: <TerminalText>Synchronizing dimensions...</TerminalText> }]);
          }, 1000);
          setTimeout(() => {
            setHackerHistory(prev => [...prev, { command: null, output: <TerminalText>Mask off.</TerminalText> }]);
          }, 2000);
          setTimeout(() => {
            setHackerHistory(prev => [...prev, { command: null, output: <TerminalText>Welcome back.</TerminalText> }]);
          }, 2500);
          setTimeout(() => {
            // Trigger unmask protocol overlay (black bg, reverse text)
            setUnmaskProtocolState('exit');
            setTimeout(() => setUnmaskProtocolState('sync'), 800);
            setTimeout(() => setUnmaskProtocolState('off'), 1600);
            setTimeout(() => {
              triggerTransition('dev');
              setTimeout(() => setUnmaskProtocolState(null), 1000);
            }, 2200);
          }, 3000);
          return;
        default:
          output = <TerminalText>{`Command not found: ${command}\nType 'help' for available commands.`}</TerminalText>;
      }
      
      setHackerHistory(prev => [...prev, { command: rawCmd, output }]);
    }
  };

  // Staggered letters for dev hero
  const renderStaggeredLetters = (word, startDelay = 0) => {
    return word.split('').map((char, index) => (
      <span
        key={index}
        className="hero-letter"
        style={{ animationDelay: `${startDelay + index * 50}ms` }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div className={`root-wrapper-theme ${mode}-mode-active`}>
      <CustomStyles />

      {/* Custom Cursor Dot & Ring */}
      <div id="custom-cursor-dot" ref={cursorDotRef} className={`cursor-dot ${mode === 'dev' ? 'dev' : 'hacker'}`} />
      <div 
        id="custom-cursor-ring" 
        ref={cursorRingRef} 
        className={`cursor-ring ${mode === 'dev' ? 'dev' : 'hacker'}`}
      >
        {mode === 'dev' && spiderSenseNear && (
          <div className="spider-sense-bolts">
            <svg viewBox="0 0 100 100" className="spider-sense-svg">
              <path d="M 28,48 C 22,46 18,52 10,48" className="bolt-path" />
              <path d="M 34,34 C 28,28 26,34 18,26" className="bolt-path" />
              <path d="M 50,28 C 47,20 53,16 50,6" className="bolt-path" />
              <path d="M 66,34 C 72,28 74,34 82,26" className="bolt-path" />
              <path d="M 72,48 C 78,46 82,52 90,48" className="bolt-path" />
            </svg>
          </div>
        )}
      </div>

      {/* Glitch Overlay */}
      {transitioning && (
        <div className="glitch-overlay">
          <div className="glitch-white-flash" />
          <div className="glitch-noise" />
          <div className="glitch-strips-container">
            <div className="glitch-strip glitch-strip-1">CANON_BREAK_SHUFFLE</div>
            <div className="glitch-strip glitch-strip-2">SEC_BREACH_DETECTED</div>
            <div className="glitch-strip glitch-strip-3">REALITY_TEAR_M1_M2</div>
            <div className="glitch-strip glitch-strip-4">NISHCHAL_GOYAL_OS</div>
          </div>
          <div className="glitch-text">CANON SHIFT</div>
        </div>
      )}

      {/* Floating Toggle Button */}
      {mode !== 'entry' && (
        <button
          className={`mode-toggle-button ${mode === 'dev' ? 'dev-toggle' : 'hacker-toggle'}`}
          onClick={() => {
            if (mode === 'dev') {
              triggerMaskProtocol();
            } else {
              // Trigger unmask protocol overlay for hacker→dev
              setUnmaskProtocolState('exit');
              setTimeout(() => setUnmaskProtocolState('sync'), 800);
              setTimeout(() => setUnmaskProtocolState('off'), 1600);
              setTimeout(() => {
                triggerTransition('dev');
                setTimeout(() => setUnmaskProtocolState(null), 1000);
              }, 2200);
            }
          }}
        >
          {mode === 'dev' ? '[ >_ ]' : '[ ◈ DEV ]'}
        </button>
      )}

      {/* Screen 1: Entry Screen */}
      {(mode === 'entry' || entryExpandingSide) && (
        <div className={`entry-container ${entryExpandingSide ? 'entry-expanding' : ''}`}>
          <div 
            className={`entry-side dev-side ${entryExpandingSide === 'dev' ? 'entry-side-chosen' : ''} ${entryExpandingSide === 'hacker' ? 'entry-side-dismissed' : ''}`} 
            onClick={() => entryTransition('dev')}
          >
            <div className="entry-side-content">
              <div className="side-label">MODE 01</div>
              <div className="side-title">THE DEVELOPER</div>
              <div className="side-desc">
                Maximalist magazine aesthetic. Asymmetric grids. High-end typography.
                Focused on shipping backend REST APIs, DB schemes, and robust code.
              </div>
              <button className="entry-btn dev-btn">[ D ] SELECT</button>
            </div>
          </div>
          <div className={`entry-split-line ${entryExpandingSide ? 'entry-split-hidden' : ''}`}></div>
          <div 
            className={`entry-side hacker-side ${entryExpandingSide === 'hacker' ? 'entry-side-chosen' : ''} ${entryExpandingSide === 'dev' ? 'entry-side-dismissed' : ''}`} 
            onClick={() => entryTransition('hacker')}
          >
            <div className="entry-side-content">
              <div className="side-label">MODE 02</div>
              <div className="side-title">SECURITY RESEARCHER</div>
              <div className="side-desc">
                Kernel terminal session. Monospace phosphor. Intrusive threat logs.
                Focused on ethical hacking, CVE research, and building SIEM modules.
              </div>
              <button className="entry-btn hacker-btn">[ H ] SELECT</button>
            </div>
          </div>
          <div className={`entry-center-box ${entryExpandingSide ? 'entry-center-hidden' : ''}`}>
            <div className="entry-question">Who are you looking for?</div>
            <div className="entry-subtext">"He is both. Always has been."</div>
          </div>
        </div>
      )}

      {/* Screen 2: Developer Mode */}
      {mode === 'dev' && (
        <div className="dev-portfolio">
          {/* Sticky Navigation */}
          <nav className={`dev-nav ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
              <div className="nav-logo">NG.</div>
              <div className="nav-links-desktop">
                <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>01. LORE</a>
                <a href="#skills" onClick={(e) => { e.preventDefault(); document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }); }}>02. SKILLS</a>
                <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>03. PROJECTS</a>
                <a href="#experience" onClick={(e) => { e.preventDefault(); document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }); }}>04. EXPERIENCE</a>
                <a href="#contact" className="nav-cta" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>GET IN TOUCH</a>
              </div>
              <button className="nav-menu-btn" onClick={() => setMenuOpen(true)}>[ menu ]</button>
            </div>
          </nav>

          {/* Fullscreen Menu Drawer */}
          {menuOpen && (
            <div className="dev-menu-overlay">
              <button className="dev-menu-close" onClick={() => setMenuOpen(false)}>[ close ]</button>
              <div className="dev-menu-links">
                <a href="#about" onClick={(e) => { e.preventDefault(); setMenuOpen(false); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>01. LORE</a>
                <a href="#skills" onClick={(e) => { e.preventDefault(); setMenuOpen(false); setTimeout(() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>02. SKILLS</a>
                <a href="#projects" onClick={(e) => { e.preventDefault(); setMenuOpen(false); setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>03. PROJECTS</a>
                <a href="#experience" onClick={(e) => { e.preventDefault(); setMenuOpen(false); setTimeout(() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>04. EXPERIENCE</a>
                <a href="#contact" onClick={(e) => { e.preventDefault(); setMenuOpen(false); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>05. CONTACT</a>
              </div>
            </div>
          )}

          {/* Hero Section */}
          <header className="dev-hero">
            <div 
              className="spider-web-wrapper spider-sense-trigger"
              onClick={() => { setSpiderWebTooltip(true); setTimeout(() => setSpiderWebTooltip(false), 6000); }}
            >
              <SpiderWebSVG />
            </div>
            {spiderWebTooltip && (
              <div className="spider-tooltip">
                <button className="spider-tooltip-close" onClick={(e) => { e.stopPropagation(); setSpiderWebTooltip(false); }}>✕</button>
                <div>You found it. Most people don&apos;t observe this carefully.</div>
                <div className="spider-tooltip-bold">That&apos;s exactly the kind of attention to detail I bring.</div>
              </div>
            )}
            
            <div className="hero-grid-container">
              <div className="hero-left-column">
                <div className="hero-content">
                  <h1 className="hero-heading">
                    <span className="hero-heading-first">{renderStaggeredLetters("Nishchal", 100)}</span>
                    <span className="hero-heading-last">{renderStaggeredLetters("Goyal", 500)}</span>
                  </h1>
                  <p className="hero-tagline">&quot;Behind the IDE, just a student from Jaipur.&quot;</p>
                  <p className="hero-tagline hero-tagline-dim">&quot;Behind the terminal, you won&apos;t know I was there.&quot;</p>
                </div>
              </div>
              <div className="hero-right-column">
                <div className="hero-illustration-wrapper">
                  <img src={heroImage} alt="Nishchal Goyal Illustration" className="hero-illustration-img" />
                </div>
              </div>
            </div>

            <div className="hero-bottom-left">
              ECE &apos;27 · SKIT Jaipur · Jaipur, IN
            </div>
            <div className="hero-bottom-center">
              // breaking the canon since 2021
            </div>
            <div className="hero-bottom-right">
              <div className="bouncing-arrow">↓</div>
            </div>
          </header>

          {/* About Section */}
          <section id="about" className="dev-section">
            <ScrollReveal className="about-grid">
              <div className="about-left-col">
                <div className="decor-num">01</div>
              </div>
              <div className="about-right-col">
                <div className="section-label">01 / LORE</div>
                <h2 className="section-headline">Final-year ECE student who actually ships.</h2>
                <div className="section-body-text">
                  <p>
                    I build backend systems that actually work and security tools that actually detect.
                    Currently in my final year at SKIT Jaipur, interning at Dreamsoft4u building Odoo 15
                    REST APIs — HTTP controllers, ORM queries, JSON pipelines — on a Python + PostgreSQL +
                    Linux stack.
                  </p>
                  <p>
                    On the other side, I&apos;m deep into offensive security — OverTheWire, TryHackMe, building
                    my own SIEM tools. The goal isn&apos;t just to get a job. It&apos;s to get good enough that breaking
                    in becomes second nature. Certified by Google in Cybersecurity. Currently on the
                    eJPT → OSCP pathway.
                  </p>
                </div>
                <div className="about-pills-container">
                  <span className="about-pill">ECE · SKIT Jaipur</span>
                  <span className="about-pill">7.5 CGPA · No Backlogs</span>
                  <span className="about-pill">Batch 2027</span>
                  <span className="about-pill">Jaipur, Rajasthan</span>
                  <span 
                    className="about-pill spider-sense-trigger interactive"
                    style={{ cursor: 'pointer' }}
                    onClick={triggerBikeRide}
                    onMouseEnter={triggerBikeRide}
                    tabIndex="0"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        triggerBikeRide();
                      }
                    }}
                  >
                    Honda CB350 · 2024
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Skills Section */}
          <section id="skills" className="dev-section bg-deep-section">
            <div className="dev-section-inner">
              <div className="section-label">02 / SKILLS</div>
              <h2 className="section-headline">What I work with</h2>

              <div className="skills-layout">
                {/* Zone A: Development */}
                <ScrollReveal className="skills-zone-a">
                  <h3 className="skills-subtitle">Development Competency</h3>
                  <div className="skills-tags-wrap">
                    {devSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="skill-tag"
                        style={{ fontSize: skill.size }}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </ScrollReveal>

                {/* Zone B: Cybersecurity (Dark Panel insert) */}
                <ScrollReveal className="skills-zone-b-dark-panel">
                  <div className="dark-panel-scanline"></div>
                  <h3 className="dark-panel-title">The other side.</h3>

                  <div className="dark-panel-grid">
                    <DevCyberSkill name="Network Security" percentage={22} />
                    <DevCyberSkill name="SIEM &amp; Log Analysis" percentage={18} />
                    <DevCyberSkill name="Web App Pentesting" percentage={15} />
                    <DevCyberSkill name="OverTheWire Bandit (Lvl 12+)" percentage={25} />
                    <DevCyberSkill name="TryHackMe CS101" percentage={20} />
                    <DevCyberSkill name="Threat Intelligence" percentage={16} />
                    <DevCyberSkill name="OSINT &amp; CVE Research" percentage={14} />
                    <DevCyberSkill name="Burp Suite / NMAP / Wireshark" percentage={19} />
                    <DevCyberSkill name="Metasploit Framework (learning)" percentage={10} />
                    <DevCyberSkill name="SQL Injection / XSS" percentage={17} />
                  </div>

                  <div className="dark-panel-pathway">
                    Pathway: OverTheWire → THM Jr Pentester → HackTheBox → eJPT → OSCP
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="dev-section">
            <div className="dev-section-inner">
              <div className="section-label">03 / PROJECTS</div>
              <h2 className="section-headline">Things I&apos;ve built</h2>

              <div className="projects-editorial-grid">
                {/* Project 1 */}
                <ScrollReveal className="project-card-wrapper p-card-large">
                  <div className="project-card project-card-sec project-card-aegis">
                    <div className="project-sec-badge">[SEC] 🔴</div>
                    <div className="project-header">
                      <span className="project-category project-category-sec">SIEM Security Platform</span>
                      <h3 className="project-title">AegisGuard</h3>
                    </div>
                    <p className="project-desc">
                      Real-time security monitoring platform that tails auth and web access logs,
                      detects SSH brute force attacks (5+ failed attempts from same IP in 60s window),
                      SQL injection, XSS, and path traversal using a custom regex rules engine. Ships with
                      a live attack simulator sandbox and Discord webhook alerts for High/Critical events.
                    </p>
                    <div className="project-stack">
                      <span>Python</span>
                      <span>FastAPI</span>
                      <span>SQLite</span>
                      <span>JavaScript</span>
                    </div>
                    <div className="project-links">
                      <a href="https://github.com/goyalnish26/AegisGuard" target="_blank" rel="noopener noreferrer" className="project-link-btn">GitHub</a>
                      <a href="https://goyalnish26.github.io/AegisGuard" target="_blank" rel="noopener noreferrer" className="project-link-btn">Live Demo</a>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Project 2 */}
                <ScrollReveal className="project-card-wrapper p-card-medium-right">
                  <div className="project-card project-card-sec">
                    <div className="project-sec-badge">[SEC] 🔴</div>
                    <div className="project-header">
                      <span className="project-category project-category-sec">Threat Intelligence Dashboard</span>
                      <h3 className="project-title">IntelScope-Pulse</h3>
                    </div>
                    <p className="project-desc">
                      Live threat intelligence dashboard pulling CVE data from NVD API with
                      dynamic 90-day rolling windows, severity breakdown charts, and a persistent watchlist.
                      Built for analysts who want actionable intel without the noise.
                    </p>
                    <div className="project-stack">
                      <span>React</span>
                      <span>NVD API</span>
                      <span>Chart.js</span>
                    </div>
                    <div className="project-links">
                      <a href="https://github.com/goyalnish26/IntelScope-Pulse" target="_blank" rel="noopener noreferrer" className="project-link-btn">GitHub</a>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Project 3 */}
                <ScrollReveal className="project-card-wrapper p-card-medium-left">
                  <div className="project-card project-card-normal">
                    <div className="project-header">
                      <span className="project-category">Full-Stack Platform</span>
                      <h3 className="project-title">WriteBlog</h3>
                    </div>
                    <p className="project-desc">
                      Polished Flask blogging platform with role-based auth (reader/author/admin),
                      markdown editor with live preview, nested comments, likes, bookmarks, image uploads,
                      admin analytics dashboard, rate-limited auth routes, and full Docker + CI support.
                    </p>
                    <div className="project-stack">
                      <span>Python</span>
                      <span>Flask</span>
                      <span>SQLAlchemy</span>
                      <span>Bootstrap 5</span>
                      <span>Docker</span>
                    </div>
                    <div className="project-links">
                      <a href="https://github.com/goyalnish26/writeblog" target="_blank" rel="noopener noreferrer" className="project-link-btn">GitHub</a>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="dev-section bg-deep-section">
            <div className="dev-section-inner">
              <div className="section-label">04 / EXPERIENCE</div>
              <h2 className="section-headline">Where I&apos;ve worked</h2>

              <div className="experience-timeline">
                <div className="timeline-line"></div>

                <ScrollReveal className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h3 className="timeline-title">Backend Developer Intern</h3>
                      <span className="timeline-date">May 21, 2026 – Present</span>
                    </div>
                    <h4 className="timeline-org">Dreamsoft4u Pvt. Ltd. | Jaipur, IN</h4>
                    <p className="timeline-desc">
                      Building Odoo 15 REST API module integrating mobile app with Sales module.
                      Developing custom HTTP controllers, complex ORM queries, and JSON response pipelines.
                    </p>
                    <div className="timeline-stack">
                      <span>Python</span>
                      <span>Odoo 15</span>
                      <span>PostgreSQL</span>
                      <span>Ubuntu</span>
                      <span>Git</span>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h3 className="timeline-title">Python Developer Intern</h3>
                      <span className="timeline-date">Prior Experience</span>
                    </div>
                    <h4 className="timeline-org">True Value Infosoft | Jaipur, IN</h4>
                    <p className="timeline-desc">
                      Developed Flask-based multi-user blog application with authentication, dashboard, CRUD functionality.
                      Implemented user dashboard, full CRUD functionalities for articles, and database mapping using SQLAlchemy.
                      Designed responsive Bootstrap templates and integrated SQLite database schemas.
                    </p>
                    <div className="timeline-stack">
                      <span>Python</span>
                      <span>Flask</span>
                      <span>SQLAlchemy</span>
                      <span>SQLite</span>
                      <span>Bootstrap</span>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h3 className="timeline-title">Volunteer — Local Committee Member</h3>
                      <span className="timeline-date">2023</span>
                    </div>
                    <h4 className="timeline-org">AIESEC in Jaipur</h4>
                    <p className="timeline-desc">
                      Led initiatives for youth leadership development, cross-cultural project coordination,
                      and international youth exchange event management.
                    </p>
                  </div>
                </ScrollReveal>
              </div>

              {/* Certifications Sub-grid */}
              <div className="certs-section">
                <h3 className="certs-headline">Professional Certifications</h3>
                <div className="certs-grid">
                  <ScrollReveal className="cert-card cert-card-featured">
                    <div className="cert-verified cert-verified-red">[VERIFIED] ✓</div>
                    <h4 className="cert-title-playfair">Google Cybersecurity Certificate</h4>
                    <div className="cert-meta">Google / Coursera · August 2025</div>
                    <div className="cert-cred">Credential ID: LGYP4646QM36</div>
                  </ScrollReveal>

                  <ScrollReveal className="cert-card cert-card-featured">
                    <div className="cert-verified cert-verified-red">[VERIFIED] ✓</div>
                    <h4 className="cert-title-playfair">Deloitte Australia — Cyber Job Simulation</h4>
                    <div className="cert-meta">Forage · October 2025</div>
                    <div className="cert-cred">Credential ID: 2LN74jKozspnmt3kh</div>
                    <div className="cert-desc-small">Threat analysis · Incident response · Security assessment</div>
                  </ScrollReveal>

                  <ScrollReveal className="cert-card">
                    <div className="cert-verified cert-verified-gold">[VERIFIED] ✓</div>
                    <h4 className="cert-title-playfair">J.P. Morgan Chase — Software Engineering Job Simulation</h4>
                    <div className="cert-meta">Forage · October 2025</div>
                    <div className="cert-cred">Credential ID: BvwC2Ge8oKbGSzgfr</div>
                    <div className="cert-desc-small">Project Setup · Kafka · H2 · REST API · Controllers</div>
                  </ScrollReveal>

                  <ScrollReveal className="cert-card">
                    <div className="cert-verified cert-verified-gold">[VERIFIED] ✓</div>
                    <h4 className="cert-title-playfair">PLC Programming &amp; Its Applications</h4>
                    <div className="cert-meta">CSIR-CEERI · November 2024</div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="dev-contact-section">
            <ScrollReveal className="contact-box">
              <h2 className="contact-headline">Let&apos;s work together.</h2>
              <p className="contact-subtext">
                Open to backend roles, cybersecurity internships, SOC positions, and freelance.
                Remote or Jaipur-based.
              </p>

              <div className="contact-buttons-group">
                <a href="mailto:goyalnishchal71@gmail.com" className="contact-btn email-btn">Send Email</a>
                <a href="https://linkedin.com/in/nishchal-goyal-6409a5289" target="_blank" rel="noopener noreferrer" className="contact-btn secondary-btn">LinkedIn</a>
                <a href="https://github.com/goyalnish26" target="_blank" rel="noopener noreferrer" className="contact-btn secondary-btn">GitHub</a>
              </div>

              <div className="contact-vuln-note">
                Or find a vulnerability in this site. I&apos;ll be impressed.
              </div>
            </ScrollReveal>
          </section>

          {/* Footer */}
          <footer className="dev-footer">
            <div className="footer-content">
              <div>nishchal goyal · jaipur · 2026</div>
              <div className="footer-quote">&quot;I&apos;ll break it.&quot; — Miles Morales</div>
            </div>
          </footer>

          {/* Post-credits sentinel — hidden below footer */}
          <div ref={devPostCreditsSentinelRef} style={{ height: '1px', width: '100%' }} />
        </div>
      )}

      {/* Dev Mode Post-Credits Timeline */}
      {devPostCreditsState !== null && (
        <div className="dev-post-credits-timeline">
          {devPostCreditsState === 'wait' && <span>wait</span>}
          {devPostCreditsState === 'rejected' && <span>Canon rejected</span>}
          {devPostCreditsState === 'loading' && <span>Story still loading</span>}
          {devPostCreditsState === 'cursor' && <span className="blinking-cursor">_</span>}
        </div>
      )}

      {/* Mask Protocol Phased Overlay */}
      {maskProtocolState !== null && (
        <div className="mask-protocol-overlay">
          <div className="mask-protocol-content">
            {maskProtocolState === 'init' && (
              <div className="mask-phase-text">Initializing Mask Protocol...</div>
            )}
            {maskProtocolState === 'sync' && (
              <div className="mask-phase-text">Synchronizing dimensions...</div>
            )}
            {maskProtocolState === 'ready' && (
              <div className="mask-phase-text">Mask on.</div>
            )}
          </div>
        </div>
      )}

      {/* Unmask Protocol Overlay — Terminal to Dev (Black BG, opposite text) */}
      {unmaskProtocolState !== null && (
        <div className="unmask-protocol-overlay">
          <div className="unmask-protocol-content">
            {unmaskProtocolState === 'exit' && (
              <div className="unmask-phase-text">Exiting Terminal Session...</div>
            )}
            {unmaskProtocolState === 'sync' && (
              <div className="unmask-phase-text">Synchronizing Dimensions...</div>
            )}
            {unmaskProtocolState === 'off' && (
              <div className="unmask-phase-text">Mask Off.</div>
            )}
          </div>
        </div>
      )}

      {/* Dynamic motorcycle runs */}
      {bikeRides.map(ride => (
        <div 
          key={ride.id} 
          className="cb350-bike"
          style={{ animationDuration: window.innerWidth < 768 ? '1.8s' : '2.5s' }}
          onAnimationEnd={() => {
            setBikeRides(prev => prev.filter(b => b.id !== ride.id));
          }}
        >
          🏍️
        </div>
      ))}



      {/* Screen 3: Security Researcher Mode */}
      {mode === 'hacker' && (
        <div className={`hacker-portfolio-wrapper theme-${hackerTheme} ${isGlitching ? 'terminal-glitching' : ''}`} onClick={() => {
          terminalInputRef.current?.focus();
        }}>
          <div className="hacker-terminal-container">
            <div className="hacker-status-bar">
              <span>nishchal@canon-breaker:~</span>
              <span className="status-tags">[SESSION ACTIVE]</span>
            </div>
            
            <div className="terminal-history-scroller" ref={terminalHistoryRef}>
              {hackerHistory.map((item, idx) => (
                <div key={idx} className="history-item-group">
                  {item.command !== null && (
                    <div className="history-command-line">
                      <span className="terminal-prompt-text">nishchal@canon-breaker:~$ </span>
                      <span className="history-command-text">{item.command}</span>
                    </div>
                  )}
                  {item.output && (
                    <div className="history-output-line">
                      {item.output}
                    </div>
                  )}
                </div>
              ))}
              
              {!exitingTerminal && (
                <div className="terminal-input-row">
                  <span className="terminal-prompt-text">nishchal@canon-breaker:~$ </span>
                  <div className="terminal-input-container">
                    <span className="terminal-typed-text">{hackerInput.slice(0, cursorPos)}</span>
                    <span className="terminal-cursor-block">{cursorPos < hackerInput.length ? hackerInput[cursorPos] : ' '}</span>
                    <span className="terminal-typed-text">{hackerInput.slice(cursorPos + 1)}</span>
                    <input
                      ref={terminalInputRef}
                      className="terminal-hidden-input"
                      type="text"
                      value={hackerInput}
                      onChange={(e) => {
                        setHackerInput(e.target.value);
                        setCursorPos(e.target.selectionStart);
                      }}
                      onKeyDown={(e) => {
                        setTimeout(() => {
                          if (terminalInputRef.current) {
                            setCursorPos(terminalInputRef.current.selectionStart);
                          }
                        }, 0);
                        handleTerminalKeyDown(e);
                      }}
                      onClick={() => {
                        if (terminalInputRef.current) {
                          setCursorPos(terminalInputRef.current.selectionStart);
                        }
                      }}
                      onKeyUp={() => {
                        if (terminalInputRef.current) {
                          setCursorPos(terminalInputRef.current.selectionStart);
                        }
                      }}
                      onFocus={() => {
                        if (terminalInputRef.current) {
                          setCursorPos(terminalInputRef.current.selectionStart);
                        }
                      }}
                      autoFocus
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="crt-scanline"></div>
        </div>
      )}
      
      {/* Canon Rejected Ending Noir Overlay */}
      {canonRejectedActive && (
        <div className="canon-rejected-overlay" onClick={() => setCanonRejectedActive(false)}>
          <div className="aot-crack" />
          <div className="sv-panels-noir">
            <div className="sv-panel-noir sv-panel-noir-1">
              <div className="sv-halftone" />
              <div className="sv-panel-noir-title">ANOMALY DETECTED</div>
              <div className="sv-panel-noir-desc">Subject: Nishchal Goyal, ECE &apos;27. Diverging from the prescribed syllabus pathway.</div>
            </div>
            <div className="sv-panel-noir-2">
              <div className="sv-halftone" />
              <div className="sv-panel-noir-title">THE SHIFT</div>
              <div className="sv-panel-noir-desc">Writing high-performance API layers, structuring PostgreSQL queries, building log parsers in the dark.</div>
            </div>
            <div className="sv-panel-noir-3">
              <div className="sv-halftone" />
              <div className="sv-panel-noir-title">CANON BROKEN</div>
              <div className="sv-panel-noir-desc">Standard curriculum expectations rejected. Operating outside standard dimensions.</div>
            </div>
            <div className="sv-panel-noir-4">
              <div className="sv-halftone-multi" />
              <div className="sv-panel-noir-large-splash">REJECTED.</div>
              <div className="sv-panel-noir-splash-sub">NAH, I&apos;MMA DO MY OWN THING.</div>
              <div className="sv-panel-noir-splash-sig">— Nishchal Goyal, ECE &apos;27</div>
            </div>
          </div>
          <div className="sv-to-be-continued">
            <span className="sv-typewriter">// ending verified.</span>
            <span className="terminal-cursor" />
          </div>
        </div>
      )}

    </div>
  );
}

// Subcomponent: Scroll Reveal wrapper using Intersection Observer
const ScrollReveal = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-el ${isVisible ? 'revealed' : ''} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Subcomponent: Dev Mode Cyber Skill Progress Bar infographics
const DevCyberSkill = ({ name, percentage }) => {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRevealed(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ marginBottom: '18px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontFamily: '"DM Sans", sans-serif', fontSize: '0.95rem' }}>
        <span style={{ color: '#FAFAFA' }}>{name}</span>
        <span style={{ color: '#E9C46A', fontFamily: '"DM Mono", monospace' }}>{percentage}%</span>
      </div>
      <div style={{ height: '2.5px', background: '#222', width: '100%', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          background: '#E9C46A',
          width: revealed ? `${percentage}%` : '0%',
          transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }} />
      </div>
    </div>
  );
};

// Inline SVG components
const SpiderWebSVG = () => (
  <svg
    className="spider-web-element"
    viewBox="0 0 100 100"
  >
    <circle cx="100" cy="0" r="20" />
    <circle cx="100" cy="0" r="40" />
    <circle cx="100" cy="0" r="60" />
    <circle cx="100" cy="0" r="80" />
    <circle cx="100" cy="0" r="100" />
    <line x1="100" y1="0" x2="0" y2="0" />
    <line x1="100" y1="0" x2="0" y2="100" />
    <line x1="100" y1="0" x2="50" y2="100" />
    <line x1="100" y1="0" x2="100" y2="100" />
    <line x1="100" y1="0" x2="0" y2="50" />
  </svg>
);

// Stylesheet Injector Component
const CustomStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

    /* CSS variables scoping */
    .root-wrapper-theme {
      margin: 0;
      padding: 0;
      min-height: 100vh;
      width: 100%;
      box-sizing: border-box;
      transition: background-color 0.5s ease;
    }

    /* Core Styles for Entry */
    .dev-mode-active {
      background-color: #FEFAE0;
      color: #1A1A1A;
    }
    .hacker-mode-active {
      background-color: #0D0D0D;
      color: #C0C0C0;
    }

    /* Custom Cursor */
    .cursor-dot {
      position: fixed;
      left: 0;
      top: 0;
      transform: translate(-50%, -50%);
      width: 6px;
      height: 6px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 100000;
      transition: background-color 0.3s ease;
    }
    .cursor-ring {
      position: fixed;
      left: 0;
      top: 0;
      transform: translate(-50%, -50%);
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1.5px solid;
      pointer-events: none;
      z-index: 100000;
      transition: width 0.2s cubic-bezier(0.16, 1, 0.3, 1), 
                  height 0.2s cubic-bezier(0.16, 1, 0.3, 1), 
                  border-color 0.3s ease, 
                  background-color 0.2s ease, 
                  opacity 0.3s ease;
    }
    
    .cursor-dot.dev {
      background-color: #1A1A1A;
    }
    .cursor-ring.dev {
      border-color: #C9A84C;
      border-width: 2px;
      opacity: 0.85;
      mix-blend-mode: multiply;
    }
    .cursor-ring.dev.cursor-hover {
      width: 48px;
      height: 48px;
      border-color: #1A1A1A;
      opacity: 1;
      background-color: transparent;
    }

    .cursor-dot.hacker {
      background-color: #C0C0C0;
    }
    .cursor-ring.hacker {
      border-color: #C0C0C0;
      opacity: 0.4;
      mix-blend-mode: normal;
    }
    .cursor-ring.hacker.cursor-hover {
      width: 44px;
      height: 44px;
      opacity: 0.75;
      background-color: rgba(192, 192, 192, 0.05);
    }

    /* Text Selection Colors */
    .dev-mode-active ::selection {
      background: #E9C46A;
      color: #1A1A1A;
    }
    .dev-mode-active ::-moz-selection {
      background: #E9C46A;
      color: #1A1A1A;
    }
    .hacker-mode-active ::selection {
      background: rgba(0, 255, 65, 0.15);
      color: #00FF41;
    }
    .hacker-mode-active ::-moz-selection {
      background: rgba(0, 255, 65, 0.15);
      color: #00FF41;
    }

    /* Entry Split Screen styling */
    .entry-container {
      display: flex;
      width: 100%;
      height: 100vh;
      position: relative;
      overflow: hidden;
      font-family: 'DM Sans', sans-serif;
    }
    .entry-side {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4rem;
      position: relative;
      transition: flex 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .entry-side:hover {
      flex: 1.25;
    }
    .dev-side {
      background-color: #FEFAE0;
      color: #1A1A1A;
      text-align: left;
    }
    .hacker-side {
      background-color: #0D0D0D;
      color: #C0C0C0;
      text-align: right;
    }
    .entry-side-content {
      max-width: 400px;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .side-label {
      font-family: 'DM Mono', monospace;
      font-size: clamp(0.65rem, 1.5vw, 0.78rem);
      opacity: 0.5;
      letter-spacing: 2px;
    }
    .dev-side .side-title {
      font-family: 'Playfair Display', serif;
      font-size: 2.8rem;
      font-weight: 900;
      color: #2D2416;
    }
    .hacker-side .side-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 2.3rem;
      font-weight: 700;
      color: #E8E8E8;
    }
    .side-desc {
      font-size: 0.95rem;
      line-height: 1.6;
      opacity: 0.8;
    }
    .entry-btn {
      align-self: flex-start;
      padding: 0.8rem 2rem;
      font-family: 'DM Mono', monospace;
      font-size: 0.9rem;
      border: 1px solid;
      background: none;
      transition: all 0.3s ease;
    }
    .dev-btn {
      color: #1A1A1A;
      border-color: #1A1A1A;
    }
    .dev-btn:hover {
      background-color: #1A1A1A;
      color: #FEFAE0;
    }
    .hacker-btn {
      color: #C0C0C0;
      border-color: #C0C0C0;
      align-self: flex-end;
    }
    .hacker-btn:hover {
      background-color: #C0C0C0;
      color: #0D0D0D;
    }

    .entry-split-line {
      width: 2px;
      height: 100%;
      background: linear-gradient(to bottom, transparent, #E9C46A, #C0C0C0, transparent);
      animation: split-glow 3s ease-in-out infinite alternate;
    }
    @keyframes split-glow {
      0% { opacity: 0.4; filter: blur(0.5px); }
      50% { opacity: 0.9; filter: blur(2px); }
      100% { opacity: 0.4; filter: blur(0.5px); }
    }

    .entry-center-box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 8px;
    }
    .entry-question {
      font-family: 'Playfair Display', serif;
      font-size: 2.2rem;
      font-style: italic;
      font-weight: 700;
      color: #ffffff;
      text-shadow: 0 4px 20px rgba(0,0,0,0.8);
      background-color: rgba(0, 0, 0, 0.7);
      padding: 10px 24px;
      border-radius: 40px;
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .entry-subtext {
      font-family: 'DM Mono', monospace;
      font-size: 0.85rem;
      color: #E9C46A;
      background-color: rgba(0, 0, 0, 0.8);
      padding: 4px 12px;
      border-radius: 4px;
    }

    /* Entry Expansion Animation */
    .entry-expanding {
      position: relative;
    }
    .entry-side {
      transition: flex 700ms cubic-bezier(0.76, 0, 0.24, 1), opacity 700ms cubic-bezier(0.76, 0, 0.24, 1);
    }
    .entry-side-chosen {
      flex: 1 0 100% !important;
      opacity: 1 !important;
      z-index: 10;
    }
    .entry-side-dismissed {
      flex: 0 0 0% !important;
      opacity: 0 !important;
      pointer-events: none;
      overflow: hidden;
      z-index: 5;
    }
    .entry-split-hidden {
      opacity: 0 !important;
      transition: opacity 300ms ease;
    }
    .entry-center-hidden {
      opacity: 0 !important;
      transition: opacity 300ms ease;
      pointer-events: none;
    }

    /* Floating Toggle Button */
    .mode-toggle-button {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 1000;
      padding: 0.75rem 1.5rem;
      border-radius: 50px;
      border: 1.5px solid;
      background: none;
      font-size: 0.9rem;
      font-weight: bold;
      transition: all 0.3s ease;
    }
    .dev-toggle {
      font-family: 'DM Mono', monospace;
      background-color: #FDF5C0;
      border-color: #E9C46A;
      color: #1A1A1A;
      animation: dev-pulse 3s infinite;
    }
    .dev-toggle:hover {
      background-color: #FEFAE0;
      transform: translateY(-2px);
    }
    .hacker-toggle {
      font-family: 'JetBrains Mono', monospace;
      background-color: #111111;
      border-color: #1E1E1E;
      color: #C0C0C0;
      animation: hacker-pulse 3s infinite;
    }
    .hacker-toggle:hover {
      background-color: #161616;
      border-color: #C0C0C0;
      transform: translateY(-2px);
    }

    @keyframes dev-pulse {
      0% { box-shadow: 0 0 0 0 rgba(233, 196, 106, 0.5); }
      70% { box-shadow: 0 0 0 10px rgba(233, 196, 106, 0); }
      100% { box-shadow: 0 0 0 0 rgba(233, 196, 106, 0); }
    }
    @keyframes hacker-pulse {
      0% { box-shadow: 0 0 0 0 rgba(192, 192, 192, 0.3); }
      70% { box-shadow: 0 0 0 10px rgba(192, 192, 192, 0); }
      100% { box-shadow: 0 0 0 0 rgba(192, 192, 192, 0); }
    }

    /* Glitch Transition Overlay styling */
    .glitch-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 99999;
      background: transparent;
      pointer-events: none;
    }
    .glitch-white-flash {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #FFFFFF;
      animation: white-flash-anim 0.35s ease-out forwards;
    }
    @keyframes white-flash-anim {
      0% { opacity: 0; }
      10% { opacity: 1; }
      30% { opacity: 1; }
      100% { opacity: 0; }
    }
    .glitch-noise {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: repeating-radial-gradient(circle at 50% 50%, #fff, #000 0.0002px);
      opacity: 0.18;
      animation: noise-anim 0.25s steps(2) infinite;
    }
    @keyframes noise-anim {
      0% { background-position: 0 0; }
      100% { background-position: 15px 15px; }
    }
    .glitch-strips-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .glitch-strip {
      position: absolute;
      left: 0;
      width: 100%;
      color: rgba(255,255,255,0.7);
      background-color: #000;
      font-family: 'JetBrains Mono', monospace;
      font-size: 3rem;
      font-weight: 900;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
    }
    .glitch-strip-1 { top: 0; height: 25%; clip-path: inset(0 0 0 0); animation: shift-1 0.4s steps(3) infinite; }
    .glitch-strip-2 { top: 25%; height: 25%; clip-path: inset(0 0 0 0); animation: shift-2 0.3s steps(3) infinite; }
    .glitch-strip-3 { top: 50%; height: 25%; clip-path: inset(0 0 0 0); animation: shift-3 0.5s steps(3) infinite; }
    .glitch-strip-4 { top: 75%; height: 25%; clip-path: inset(0 0 0 0); animation: shift-4 0.4s steps(3) infinite; }
    
    @keyframes shift-1 { 0% { transform: translate(-10px, 0); } 50% { transform: translate(12px, -4px); } }
    @keyframes shift-2 { 0% { transform: translate(15px, 2px); } 50% { transform: translate(-15px, 0); } }
    @keyframes shift-3 { 0% { transform: translate(-8px, -3px); } 50% { transform: translate(10px, 3px); } }
    @keyframes shift-4 { 0% { transform: translate(12px, 0); } 50% { transform: translate(-10px, -2px); } }

    .glitch-text {
      font-family: 'JetBrains Mono', monospace;
      font-size: 6vw;
      font-weight: 900;
      color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-transform: uppercase;
      letter-spacing: 8px;
    }
    .glitch-text::before, .glitch-text::after {
      content: "CANON SHIFT";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .glitch-text::before {
      color: #E63946;
      left: -6px;
      text-shadow: 2px 0 0 #E63946;
      animation: rgb-split-1 0.3s infinite linear alternate-reverse;
    }
    .glitch-text::after {
      color: #00ffff;
      left: 6px;
      text-shadow: -2px 0 0 #00ffff;
      animation: rgb-split-2 0.3s infinite linear alternate-reverse;
    }
    @keyframes rgb-split-1 {
      0% { clip: rect(20px, 9999px, 66px, 0); transform: skew(0.5deg); }
      100% { clip: rect(80px, 9999px, 120px, 0); transform: skew(-0.5deg); }
    }
    @keyframes rgb-split-2 {
      0% { clip: rect(40px, 9999px, 90px, 0); transform: skew(-1deg); }
      100% { clip: rect(10px, 9999px, 50px, 0); transform: skew(1deg); }
    }

    /* ----------------------------------------- */
    /* DEVELOPER MODE DESIGN (GWEN STACY WARM MAGAZINE) */
    /* ----------------------------------------- */
    .dev-portfolio {
      max-width: 1300px;
      margin: 0 auto;
      padding: 0 2rem;
      background-color: #FEFAE0;
      font-family: 'DM Sans', sans-serif;
      color: #1A1A1A;
      overflow: hidden;
    }

    /* Sticky Navbar */
    .dev-nav {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1000;
      transition: background-color 0.4s ease, backdrop-filter 0.4s ease;
      background: transparent;
      padding: 1.5rem 0;
    }
    .dev-nav.scrolled {
      background: rgba(254, 250, 224, 0.92);
      backdrop-filter: blur(12px);
      padding: 1rem 0;
      border-bottom: 1px solid rgba(233, 196, 106, 0.2);
    }
    .nav-container {
      max-width: 1300px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 2rem;
    }
    .nav-logo {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-weight: 900;
      font-size: 1.8rem;
      color: #2D2416;
    }
    .nav-links-desktop {
      display: flex;
      gap: 2rem;
      align-items: center;
    }
    .nav-links-desktop a {
      font-family: 'DM Mono', monospace;
      font-size: 0.8rem;
      font-weight: 500;
      color: #8A7F6B;
      text-decoration: none;
      letter-spacing: 1.5px;
      transition: color 0.3s ease;
    }
    .nav-links-desktop a:hover {
      color: #1A1A1A;
    }
    .nav-links-desktop .nav-cta {
      border: 1px solid #E9C46A;
      padding: 0.5rem 1rem;
      background-color: #FDF5C0;
      color: #1A1A1A;
      transition: all 0.3s ease;
    }
    .nav-links-desktop .nav-cta:hover {
      background-color: #E9C46A;
      border-color: #C9A84C;
    }
    .nav-menu-btn {
      display: none;
      font-family: 'DM Mono', monospace;
      font-size: 0.9rem;
      background: none;
      border: none;
      color: #8A7F6B;
    }

    /* Menu Drawer overlay */
    .dev-menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: #FEFAE0;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .dev-menu-close {
      position: absolute;
      top: 2rem;
      right: 2rem;
      font-family: 'DM Mono', monospace;
      font-size: 1.1rem;
      background: none;
      border: none;
      color: #1A1A1A;
    }
    .dev-menu-links {
      display: flex;
      flex-direction: column;
      gap: 2.2rem;
      text-align: center;
    }
    .dev-menu-links a {
      font-family: 'Playfair Display', serif;
      font-size: 3rem;
      font-weight: 900;
      font-style: italic;
      color: #2D2416;
      text-decoration: none;
      transition: transform 0.3s ease, color 0.3s ease;
    }
    .dev-menu-links a:hover {
      transform: translateX(10px);
      color: #C9A84C;
    }

    /* Hero Grid & Layout */
    .dev-hero {
      position: relative;
      min-height: 100vh;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      overflow: hidden;
    }
    .hero-grid-container {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      align-items: center;
      gap: 2rem;
      padding: 0 4rem;
      box-sizing: border-box;
      z-index: 2;
    }
    .hero-left-column {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .hero-right-column {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 45%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;
    }
    .hero-illustration-wrapper {
      width: 100%;
      max-width: 520px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .hero-illustration-img {
      width: 100%;
      height: auto;
      max-height: 72vh;
      object-fit: contain;
      opacity: 1;
      filter: drop-shadow(0 10px 30px rgba(45, 36, 22, 0.15));
      animation: illustration-fade-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards, hero-float 4s ease-in-out 1.5s infinite;
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease;
    }
    .hero-illustration-img:hover {
      transform: scale(1.12);
      filter: drop-shadow(0 15px 40px rgba(45, 36, 22, 0.18));
    }
    @keyframes illustration-fade-in {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes hero-float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-12px); }
    }
    .spider-web-element {
      position: absolute;
      top: 0;
      right: 0;
      width: 200px;
      height: 200px;
      fill: none;
      stroke: #E9C46A;
      strokeWidth: 0.5px;
      opacity: 0.18;
      pointer-events: none;
      z-index: 0;
    }

    .hero-heading {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2.5rem, 8vw, 6.5rem);
      line-height: 0.9;
      font-weight: 900;
      margin: 0 0 1.5rem 0;
      display: flex;
      flex-direction: column;
    }
    .hero-heading-first {
      color: #2D2416;
      font-style: italic;
    }
    .hero-heading-last {
      -webkit-text-stroke: 2.5px #1A1A1A;
      color: transparent;
      padding-left: 2vw;
    }
    .hero-letter {
      display: inline-block;
      opacity: 0;
      transform: translateY(-40px);
      animation: letter-drop 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes letter-drop {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .hero-tagline {
      font-size: 1.5rem;
      color: #8A7F6B;
      margin: 0;
      padding-left: 0.5rem;
      line-height: 1.6;
    }
    .hero-tagline-dim {
      color: #A89F8B;
      font-weight: 300;
      opacity: 0.85;
    }
    .hero-content {
      position: relative;
      z-index: 1;
      margin-top: 2rem;
    }
    .hero-bottom-left {
      position: absolute;
      bottom: 2rem;
      left: 0;
      font-family: 'DM Mono', monospace;
      font-size: 0.75rem;
      letter-spacing: 1px;
      color: #8A7F6B;
      writing-mode: vertical-lr;
      transform: rotate(180deg);
    }
    .hero-bottom-center {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      font-family: 'DM Mono', monospace;
      font-size: 0.8rem;
      color: #C9A84C;
      opacity: 0.5;
      letter-spacing: 1.5px;
    }
    .hero-bottom-right {
      position: absolute;
      bottom: 2rem;
      right: 0;
    }
    .bouncing-arrow {
      font-family: 'DM Mono', monospace;
      font-size: 1.5rem;
      color: #8A7F6B;
      animation: bounce 1.8s infinite;
    }
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
      60% { transform: translateY(-5px); }
    }

    /* Editorial sections styling */
    .dev-section {
      padding: 8rem 0;
      border-top: 1px solid #F5EDB0;
      position: relative;
    }
    .bg-deep-section {
      background-color: #FEFAE0;
      margin: 0 -2rem;
      padding: 8rem 2rem;
      border-top: 1px solid #F5EDB0;
      border-bottom: 1px solid #F5EDB0;
    }
    .dev-section-inner {
      width: 100%;
    }

    .section-label {
      font-family: 'DM Mono', monospace;
      font-size: clamp(0.65rem, 1.5vw, 0.78rem);
      color: #8A7F6B;
      letter-spacing: 3px;
      margin-bottom: 1rem;
    }
    .section-headline {
      font-family: 'Playfair Display', serif;
      font-size: clamp(1.6rem, 4vw, 2.6rem);
      line-height: 1.15;
      font-weight: 900;
      color: #2D2416;
      margin-bottom: 3rem;
      max-width: 800px;
    }

    /* About split grid */
    .about-grid {
      display: grid;
      grid-template-columns: 1fr 2.5fr;
      gap: 3rem;
      align-items: start;
    }
    .about-left-col {
      position: relative;
    }
    .decor-num {
      font-family: 'Playfair Display', serif;
      font-size: 12rem;
      line-height: 1;
      font-weight: 900;
      color: #F5EDB0;
      user-select: none;
      position: absolute;
      top: -2.5rem;
      left: 0;
    }
    .about-right-col {
      display: flex;
      flex-direction: column;
    }
    .section-body-text p {
      font-size: 1.15rem;
      line-height: 1.75;
      margin-bottom: 1.5rem;
      color: #1A1A1A;
    }
    .about-pills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;
      margin-top: 1.5rem;
    }
    .about-pill {
      background-color: #FDF5C0;
      border: 1px solid #E9C46A;
      border-radius: 50px;
      padding: 0.4rem 1.1rem;
      font-family: 'DM Mono', monospace;
      font-size: 0.8rem;
      font-weight: 500;
      color: #2D2416;
    }

    /* Skills Infographics */
    .skills-layout {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 4rem;
      align-items: start;
    }
    .skills-subtitle {
      font-family: 'Playfair Display', serif;
      font-size: 2rem;
      font-style: italic;
      font-weight: 800;
      color: #2D2416;
      margin-bottom: 2rem;
    }
    .skills-tags-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 0.7rem;
    }
    .skill-tag {
      background-color: #FDF5C0;
      border: 1px solid rgba(233, 196, 106, 0.6);
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-family: 'DM Mono', monospace;
      color: #1A1A1A;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .skill-tag:hover {
      transform: scale(1.05);
      background-color: #FEFAE0;
      border-color: #E9C46A;
    }

    /* Zone B Cybersecurity insert */
    .skills-zone-b-dark-panel {
      background-color: #1A1A1A;
      border-radius: 8px;
      padding: 2.5rem;
      position: relative;
      overflow: hidden;
      color: #FAFAFA;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    }
    .dark-panel-scanline {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(to right, transparent, rgba(233,196,106,0.8), transparent);
      animation: dev-panel-scan 8s linear infinite;
    }
    @keyframes dev-panel-scan {
      0% { top: 0%; }
      100% { top: 100%; }
    }
    .dark-panel-title {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 2rem;
      font-weight: 900;
      color: #FAFAFA;
      margin-bottom: 2rem;
    }
    .dark-panel-grid {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .dark-panel-pathway {
      margin-top: 2rem;
      border-top: 1px solid #333;
      padding-top: 1.5rem;
      font-family: 'DM Mono', monospace;
      font-size: 0.75rem;
      color: #E9C46A;
      line-height: 1.5;
    }

    /* Staggered Projects Grid */
    .projects-editorial-grid {
      display: flex;
      flex-direction: column;
      gap: 3rem;
      position: relative;
    }
    .project-card-wrapper {
      position: relative;
    }
    .p-card-large {
      width: 70%;
      align-self: flex-start;
    }
    .p-card-medium-right {
      width: 65%;
      align-self: flex-end;
      margin-top: -6rem;
      z-index: 2;
    }
    .p-card-medium-left {
      width: 65%;
      align-self: flex-start;
      margin-top: -6rem;
    }

    .project-card {
      background-color: #FDF5C0;
      padding: 3rem;
      border-radius: 4px;
      border-left: 1px solid rgba(233, 196, 106, 0.3);
      box-shadow: 0 4px 20px rgba(45, 36, 22, 0.04);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease;
    }
    .project-card:hover {
      transform: translateY(-5px);
      background-color: #FEFAE0;
    }
    .project-card::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 3px;
      height: 0%;
      background-color: #E9C46A;
      transition: height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .project-card:hover::before {
      height: 100%;
    }

    /* Security project card styles */
    .project-card-sec {
      border-left: 3px solid #E63946 !important;
    }
    .project-card-sec::before {
      background-color: #E63946 !important;
    }
    .project-card-aegis:hover {
      background-color: #FEF5F5 !important;
    }
    .project-sec-badge {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      font-family: 'DM Mono', monospace;
      font-size: 0.72rem;
      font-weight: bold;
      color: #E63946;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .project-category-sec {
      color: #E63946 !important;
    }

    .project-header {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .project-category {
      font-family: 'DM Mono', monospace;
      font-size: 0.8rem;
      color: #8A7F6B;
      text-transform: uppercase;
      letter-spacing: 1px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .red-spider-dot {
      color: #E63946;
      font-size: 0.75rem;
    }
    .project-title {
      font-family: 'Playfair Display', serif;
      font-size: 2.2rem;
      font-weight: 900;
      color: #2D2416;
    }
    .project-desc {
      font-size: 1.05rem;
      line-height: 1.7;
      color: #1A1A1A;
    }
    .project-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .project-stack span {
      background-color: rgba(233, 196, 106, 0.2);
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-family: 'DM Mono', monospace;
      font-size: 0.75rem;
      color: #2D2416;
    }
    .project-links {
      display: flex;
      gap: 1rem;
      margin-top: 0.5rem;
    }
    .project-link-btn {
      font-family: 'DM Mono', monospace;
      font-size: 0.85rem;
      font-weight: bold;
      color: #1A1A1A;
      text-decoration: none;
      border-bottom: 2px solid #E9C46A;
      padding-bottom: 2px;
      transition: border-color 0.3s ease;
    }
    .project-link-btn:hover {
      border-color: #C9A84C;
    }

    /* Experience Timeline */
    .experience-timeline {
      position: relative;
      margin-left: 2rem;
      padding-left: 2rem;
    }
    .timeline-line {
      position: absolute;
      left: 0;
      top: 5px;
      bottom: 5px;
      width: 2px;
      background-color: #E9C46A;
    }
    .timeline-item {
      position: relative;
      margin-bottom: 4rem;
    }
    .timeline-dot {
      position: absolute;
      left: -2.35rem;
      top: 6px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #FEFAE0;
      border: 3px solid #E9C46A;
    }
    .timeline-content {
      background-color: #FDF5C0;
      padding: 2.2rem;
      border-radius: 4px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.02);
    }
    .timeline-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
    .timeline-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.6rem;
      font-weight: 900;
      color: #2D2416;
    }
    .timeline-date {
      font-family: 'DM Mono', monospace;
      font-size: 0.8rem;
      color: #8A7F6B;
    }
    .timeline-org {
      font-family: 'DM Sans', sans-serif;
      font-weight: 500;
      font-size: 1rem;
      color: #8A7F6B;
      margin-bottom: 1rem;
    }
    .timeline-desc {
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 1.2rem;
    }
    .timeline-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
    }
    .timeline-stack span {
      background-color: rgba(233, 196, 106, 0.2);
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
      font-family: 'DM Mono', monospace;
      font-size: 0.75rem;
      color: #2D2416;
    }

    /* Certifications editorial sub-grid */
    .certs-section {
      margin-top: 6rem;
      border-top: 1px dashed rgba(233, 196, 106, 0.5);
      padding-top: 5rem;
    }
    .certs-headline {
      font-family: 'Playfair Display', serif;
      font-size: 2rem;
      font-style: italic;
      font-weight: 900;
      color: #2D2416;
      margin-bottom: 2.5rem;
    }
    .certs-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }
    .cert-card {
      background-color: #FDF5C0;
      border: 1px solid rgba(233, 196, 106, 0.3);
      border-left: 3px solid #E9C46A;
      padding: 1.25rem 1.5rem;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .cert-card-featured {
      border-left: 3px solid #E63946;
    }
    .cert-verified {
      font-family: 'DM Mono', monospace;
      font-size: 0.75rem;
      font-weight: bold;
      letter-spacing: 1px;
    }
    .cert-verified-red {
      color: #E63946;
    }
    .cert-verified-gold {
      color: #C9A84C;
    }
    .cert-title-playfair {
      font-family: 'Playfair Display', serif;
      font-size: 1.15rem;
      font-weight: bold;
      color: #1A1A1A;
    }
    .cert-title {
      font-family: 'DM Sans', sans-serif;
      font-size: 1.15rem;
      font-weight: bold;
      color: #1A1A1A;
    }
    .cert-meta {
      font-family: 'DM Mono', monospace;
      font-size: 0.8rem;
      color: #8A7F6B;
    }
    .cert-cred {
      font-family: 'DM Mono', monospace;
      font-size: 0.72rem;
      color: #C9A84C;
      margin-top: 4px;
    }
    .cert-desc-small {
      font-family: 'DM Mono', monospace;
      font-size: 0.72rem;
      color: #8A7F6B;
      opacity: 0.8;
    }

    /* Contact Section */
    .dev-contact-section {
      padding: 10rem 0;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    .contact-box {
      max-width: 700px;
    }
    .contact-headline {
      font-family: 'Playfair Display', serif;
      font-size: 4rem;
      font-weight: 900;
      color: #2D2416;
      margin-bottom: 1.5rem;
    }
    .contact-subtext {
      font-size: 1.2rem;
      line-height: 1.6;
      color: #8A7F6B;
      margin-bottom: 3rem;
    }
    .contact-buttons-group {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-bottom: 3rem;
    }
    .contact-btn {
      padding: 0.9rem 2.2rem;
      font-family: 'DM Mono', monospace;
      font-size: 0.95rem;
      font-weight: bold;
      text-decoration: none;
      border-radius: 50px;
      transition: all 0.3s ease;
    }
    .email-btn {
      background-color: #1A1A1A;
      color: #FEFAE0;
    }
    .email-btn:hover {
      background-color: #2D2416;
      transform: translateY(-2px);
    }
    .secondary-btn {
      background-color: #FDF5C0;
      border: 1px solid #E9C46A;
      color: #1A1A1A;
    }
    .secondary-btn:hover {
      background-color: #E9C46A;
      transform: translateY(-2px);
    }
    .contact-vuln-note {
      font-family: 'DM Mono', monospace;
      font-size: 0.8rem;
      color: #C9A84C;
    }

    /* Footer */
    .dev-footer {
      border-top: 1px solid #F5EDB0;
      padding: 3rem 0;
      font-family: 'DM Mono', monospace;
      font-size: 0.8rem;
      color: #8A7F6B;
    }
    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .footer-quote {
      font-style: italic;
    }

    /* Scroll reveal transitions */
    .reveal-el {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reveal-el.revealed {
      opacity: 1;
      transform: translateY(0);
    }

    /* ----------------------------------------- */
    /* HACKER MODE DESIGN (REAL TERMINAL ENVIRONMENT) */
    /* ----------------------------------------- */
    .hacker-portfolio-wrapper {
      min-height: 100vh;
      width: 100%;
      background-color: var(--hacker-bg);
      color: var(--hacker-text-primary);
      font-family: 'JetBrains Mono', monospace;
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-sizing: border-box;

      /* Defaults (Miles Theme) */
      --hacker-bg: #050505;
      --hacker-accent: #9D4EDD;
      --hacker-text-primary: #E0AAFF;
      --hacker-text-bright: #FF2E63;
      --hacker-text-dim: #5c5470;
      --hacker-border: #240046;
      --hacker-glow: rgba(157, 78, 221, 0.25);
      --hacker-secondary: #FF2E63;
    }
    
    .hacker-portfolio-wrapper.theme-light {
      --hacker-bg: #FEFAE0;
      --hacker-text-primary: #1A1A1A;
      --hacker-text-bright: #1A1A1A;
      --hacker-text-dim: #8A7F6B;
      --hacker-accent: #E9C46A;
      --hacker-border: #E9C46A;
      --hacker-secondary: #E9C46A;
      --hacker-glow: rgba(233, 196, 106, 0.25);
    }
    .hacker-portfolio-wrapper.theme-dark {
      --hacker-bg: #0D0D0D;
      --hacker-text-primary: #C0C0C0;
      --hacker-text-bright: #C0C0C0;
      --hacker-text-dim: #4A4A4A;
      --hacker-accent: #C0C0C0;
      --hacker-border: #1E1E1E;
      --hacker-secondary: #C0C0C0;
      --hacker-glow: rgba(192, 192, 192, 0.25);
    }
    .hacker-portfolio-wrapper.theme-peter {
      --hacker-bg: #0a0a0a;
      --hacker-text-primary: #FF0000;
      --hacker-text-bright: #FF0000;
      --hacker-text-dim: #660000;
      --hacker-accent: #FF0000;
      --hacker-border: #660000;
      --hacker-secondary: #FF0000;
      --hacker-glow: rgba(255, 0, 0, 0.25);
    }
    .hacker-portfolio-wrapper.theme-miles {
      --hacker-bg: #0a0a0a;
      --hacker-text-primary: #B833FF;
      --hacker-text-bright: #FF3D3D;
      --hacker-text-dim: #660080;
      --hacker-accent: #FF3D3D;
      --hacker-border: #660080;
      --hacker-secondary: #FF3D3D;
      --hacker-glow: rgba(255, 61, 61, 0.25);
    }
    .hacker-portfolio-wrapper.theme-noir {
      --hacker-bg: #000000;
      --hacker-text-primary: #FFFFFF;
      --hacker-text-bright: #FFFFFF;
      --hacker-text-dim: #808080;
      --hacker-accent: #FFFFFF;
      --hacker-border: #808080;
      --hacker-secondary: #FFFFFF;
      --hacker-glow: rgba(255, 255, 255, 0.25);
    }
    .hacker-portfolio-wrapper.theme-2099 {
      --hacker-bg: #0a0a2e;
      --hacker-text-primary: #00D9FF;
      --hacker-text-bright: #00D9FF;
      --hacker-text-dim: #0066CC;
      --hacker-accent: #00D9FF;
      --hacker-border: #0066CC;
      --hacker-secondary: #00D9FF;
      --hacker-glow: rgba(0, 217, 255, 0.25);
    }
    .hacker-portfolio-wrapper.theme-kali {
      --hacker-bg: #1a1a2e;
      --hacker-text-primary: #33FF00;
      --hacker-text-bright: #33FF00;
      --hacker-text-dim: #006600;
      --hacker-accent: #6B00B0;
      --hacker-border: #006600;
      --hacker-secondary: #6B00B0;
      --hacker-glow: rgba(107, 0, 176, 0.25);
    }

    /* Glitch visual animation */
    .hacker-portfolio-wrapper.terminal-glitching {
      animation: glitch-skew 250ms steps(2) infinite;
      position: relative;
    }
    .hacker-portfolio-wrapper.terminal-glitching::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.05);
      pointer-events: none;
      z-index: 10000;
      animation: glitch-flash 150ms infinite alternate;
    }
    @keyframes glitch-skew {
      0% { transform: skew(0deg); filter: hue-rotate(0deg); }
      20% { transform: skew(3deg); filter: hue-rotate(90deg); }
      40% { transform: skew(-3deg); filter: hue-rotate(180deg); }
      60% { transform: skew(2deg); filter: hue-rotate(270deg); }
      80% { transform: skew(-2deg); filter: hue-rotate(360deg); }
      100% { transform: skew(0deg); filter: hue-rotate(0deg); }
    }
    @keyframes glitch-flash {
      0% { opacity: 0.3; }
      100% { opacity: 0.8; }
    }

    /* Hacker Terminal Environment */
    .hacker-terminal-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 100%;
      background-color: var(--hacker-bg);
      color: var(--hacker-text-primary);
      box-sizing: border-box;
      position: relative;
    }
    .hacker-terminal-container .hacker-status-bar {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background-color: rgba(22, 22, 22, 0.4);
      border-bottom: 1px solid var(--hacker-border);
      padding: 0.6rem 1.5rem;
      font-size: 0.75rem;
      color: var(--hacker-text-dim);
      display: flex;
      justify-content: space-between;
      z-index: 10;
      box-sizing: border-box;
      backdrop-filter: blur(4px);
    }
    .hacker-terminal-container .hacker-status-bar .status-tags {
      color: var(--hacker-text-dim);
    }
    .terminal-history-scroller {
      padding: 4rem 2rem 2rem 2rem;
      flex-grow: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      line-height: 1.6;
      box-sizing: border-box;
    }
    .history-item-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .history-command-line {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .terminal-prompt-text {
      color: var(--hacker-text-dim);
      font-family: 'JetBrains Mono', monospace;
      font-weight: bold;
    }
    .history-command-text {
      color: var(--hacker-text-bright);
      font-family: 'JetBrains Mono', monospace;
    }
    .history-output-line {
      color: var(--hacker-text-primary);
      white-space: pre-wrap;
    }
    /* Terminal Hero Row — name left, figure right */
    .terminal-hero-row {
      display: flex;
      align-items: flex-start;
      gap: 4rem;
      width: 100%;
    }
    .terminal-hero-left {
      flex: 0 1 auto;
      min-width: 0;
    }
    .terminal-hero-right {
      flex: 0 0 auto;
      display: flex;
      align-items: flex-start;
      padding-top: 0.5rem;
    }
    .terminal-ascii-figure {
      margin: 0;
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      line-height: 1.3;
      color: var(--hacker-accent, #E9C46A);
      white-space: pre;
      opacity: 0.85;
    }

    .terminal-output-text {
      margin: 0;
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      line-height: 1.6;
      letter-spacing: 0.02em;
      white-space: pre-wrap;
      word-break: break-word;
      color: var(--hacker-text-primary);
    }
    .terminal-input-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .terminal-input-container {
      display: inline-flex;
      align-items: center;
      position: relative;
      flex-grow: 1;
    }
    .terminal-typed-text {
      color: var(--hacker-text-bright);
      font-family: 'JetBrains Mono', monospace;
      white-space: pre-wrap;
      word-break: break-all;
    }
    .terminal-cursor-block {
      display: inline-block;
      min-width: 9px;
      height: 19px;
      background-color: var(--hacker-text-bright);
      color: var(--hacker-bg) !important;
      line-height: 19px;
      text-align: center;
      animation: blink 1s step-end infinite;
      vertical-align: middle;
      white-space: pre;
    }
    @keyframes blink {
      0%, 100% {
        background-color: var(--hacker-text-bright);
        color: var(--hacker-bg) !important;
      }
      50% {
        background-color: transparent;
        color: inherit !important;
      }
    }
    .terminal-hidden-input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      border: none;
      outline: none;
      background: transparent;
      color: transparent;
      caret-color: transparent;
      z-index: 5;
    }

    /* Command Output Formatting */
    .terminal-help-table {
      display: flex;
      flex-direction: column;
      gap: 4px;
      max-width: 800px;
    }
    .help-row {
      display: grid;
      grid-template-columns: 160px 1.5fr 1fr;
      gap: 1rem;
      padding: 4px 0;
    }
    .help-row.header {
      border-bottom: 1px dashed var(--hacker-border);
      color: var(--hacker-text-bright);
      font-weight: bold;
    }
    .help-col.cmd {
      color: var(--hacker-accent);
    }
    .help-col.ex {
      color: var(--hacker-text-dim);
    }
    .terminal-whoami, .terminal-about, .terminal-skills-tree, .terminal-projects-list, .terminal-project-details, .terminal-experience, .terminal-certs, .terminal-journey, .terminal-contact, .terminal-easter-egg, .terminal-shutdown {
      line-height: 1.6;
      color: var(--hacker-text-primary);
    }
    .whoami-label, .about-hl, .proj-title, .exp-header strong, .canon-detector-header {
      color: var(--hacker-text-bright);
    }
    .cmd-ex {
      color: var(--hacker-accent);
      font-weight: bold;
    }
    .terminal-error {
      color: var(--hacker-secondary);
      font-weight: bold;
    }
    .terminal-project-details a, .terminal-contact a {
      color: var(--hacker-accent);
      text-decoration: underline;
      cursor: pointer;
    }
    .terminal-project-details a:hover, .terminal-contact a:hover {
      color: var(--hacker-text-bright);
    }
    .exp-date {
      float: right;
      color: var(--hacker-text-dim);
    }

    /* CRT scanline simulation overlay */
    .crt-scanline {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 9999;
      background: linear-gradient(
        rgba(18, 16, 16, 0) 50%, 
        rgba(0, 0, 0, 0.25) 50%
      ), linear-gradient(
        90deg, 
        rgba(255, 0, 0, 0.06), 
        rgba(0, 255, 0, 0.02), 
        rgba(0, 0, 255, 0.06)
      );
      background-size: 100% 4px, 6px 100%;
      opacity: 0.4;
    }

    .hacker-portfolio-wrapper a:focus-visible {
      outline: 2px solid var(--hacker-accent);
    }





    /* Spider web click & search animation */
    .spider-web-wrapper {
      position: absolute;
      top: 0;
      right: 0;
      width: 200px;
      height: 200px;
      cursor: pointer;
      z-index: 10;
    }
    .spider-web-element {
      width: 100%;
      height: 100%;
      fill: none;
      stroke: #E9C46A;
      stroke-width: 0.5px;
      opacity: 0.15;
      transition: opacity 0.3s ease, stroke-width 0.3s ease;
    }
    .spider-web-wrapper:hover .spider-web-element {
      opacity: 0.35;
      stroke-width: 1px;
    }
    .spider-animate .spider-web-element circle,
    .spider-animate .spider-web-element line {
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
      animation: draw-web 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      opacity: 0.5;
    }
    @keyframes draw-web {
      to {
        stroke-dashoffset: 0;
      }
    }

    /* Spider Tooltip styling */
    .spider-tooltip {
      position: absolute;
      top: 180px;
      right: 20px;
      background-color: #FDF5C0;
      border: 1px solid #E9C46A;
      padding: 1.2rem 1.5rem;
      border-radius: 4px;
      box-shadow: 0 4px 20px rgba(45, 36, 22, 0.08);
      z-index: 100;
      max-width: 280px;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.85rem;
      color: #1A1A1A;
      animation: tooltip-fade-in 0.3s ease forwards;
    }
    @keyframes tooltip-fade-in {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .spider-tooltip-close {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: none;
      border: none;
      font-size: 0.8rem;
      cursor: pointer;
      color: #8A7F6B;
    }
    .spider-tooltip-close:hover {
      color: #1A1A1A;
    }
    .spider-tooltip-bold {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-weight: bold;
      margin-top: 0.4rem;
    }

    /* Mask Protocol Phased Overlay */
    .mask-protocol-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: #FEFAE0;
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: maskOverlayFadeIn 0.3s ease forwards;
    }
    .mask-protocol-content {
      text-align: center;
      color: #1A1A1A;
      font-size: clamp(1.2rem, 3vw, 2.2rem);
      font-weight: bold;
    }
    .mask-phase-text {
      font-family: 'DM Mono', monospace;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    @keyframes maskOverlayFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* Unmask Protocol Overlay — Terminal to Dev (Black) */
    .unmask-protocol-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: #0D0D0D;
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: unmaskOverlayFadeIn 0.3s ease forwards;
    }
    .unmask-protocol-content {
      text-align: center;
      color: #00FF41;
      font-size: clamp(1.2rem, 3vw, 2.2rem);
      font-weight: bold;
    }
    .unmask-phase-text {
      font-family: 'DM Mono', monospace;
      letter-spacing: 2px;
      text-transform: uppercase;
      text-shadow: 0 0 10px rgba(0, 255, 65, 0.4);
    }
    @keyframes unmaskOverlayFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* Terminal clickable links */
    .terminal-link {
      color: var(--hacker-secondary, #E9C46A);
      text-decoration: underline;
      text-decoration-style: dotted;
      text-underline-offset: 3px;
      cursor: pointer;
      transition: color 0.2s ease, text-shadow 0.2s ease;
    }
    .terminal-link:hover {
      color: #00FF41;
      text-shadow: 0 0 8px rgba(0, 255, 65, 0.3);
      text-decoration-style: solid;
    }

    /* Spider Sense Bolts */
    .spider-sense-bolts {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80px;
      height: 80px;
      pointer-events: none;
    }
    .spider-sense-svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    .bolt-path {
      stroke: #E63946;
      stroke-width: 2.5px;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
      filter: drop-shadow(0 0 3px #E63946);
      animation: bolt-flicker 0.2s infinite alternate;
    }
    @keyframes bolt-flicker {
      0% { opacity: 0.3; transform: scale(0.95); }
      100% { opacity: 1; transform: scale(1.05); }
    }

    /* CB350 Motorcycle Animation */
    .cb350-bike {
      position: fixed;
      bottom: 2rem;
      left: 100vw;
      font-size: 2.5rem;
      z-index: 9999;
      pointer-events: none;
      animation: rideScreen 2.5s linear forwards;
    }
    @keyframes rideScreen {
      0% {
        left: calc(100vw + 50px);
        transform: translateY(0);
      }
      10% { transform: translateY(-4px); }
      20% { transform: translateY(0); }
      30% { transform: translateY(-4px); }
      40% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
      60% { transform: translateY(0); }
      70% { transform: translateY(-4px); }
      80% { transform: translateY(0); }
      90% { transform: translateY(-4px); }
      100% {
        left: -80px;
        transform: translateY(0);
      }
    }

    /* Dev Mode Post-Credits Timeline */
    .dev-post-credits-timeline {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      font-family: 'DM Mono', monospace;
      font-size: 0.9rem;
      color: #8A7F6B;
      letter-spacing: 2px;
      z-index: 1000;
      text-transform: uppercase;
      pointer-events: none;
      animation: fadeInPostCredits 0.5s ease forwards;
    }
    @keyframes fadeInPostCredits {
      from { opacity: 0; transform: translate(-50%, 10px); }
      to { opacity: 1; transform: translate(-50%, 0); }
    }
    .blinking-cursor {
      animation: blinkCursorPost 1s infinite step-end;
    }
    @keyframes blinkCursorPost {
      from, to { color: transparent }
      50% { color: #8A7F6B }
    }

    /* Canon Rejected Ending Noir Overlay */
    .canon-rejected-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: #000;
      z-index: 100000;
      display: flex;
      flex-direction: column;
      padding: 2rem;
      box-sizing: border-box;
      overflow: hidden;
      cursor: pointer;
    }
    .aot-crack {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' stroke='white' stroke-width='1.5' fill='none'><path d='M50 50 L10 10 M50 50 L90 10 M50 50 L10 90 M50 50 L90 90 M50 50 L50 0 M50 50 L50 100 M50 50 L0 50 M50 50 L100 50 M30 30 L40 10 L50 30 L70 20 L80 40 L60 50 L70 70 L90 60 L80 80 L50 70 L30 80 L10 70 L30 50 L20 40 Z'/></svg>");
      background-size: cover;
      z-index: 200;
      pointer-events: none;
      opacity: 0.2;
      animation: crack-shatter 0.5s ease-out forwards;
    }
    @keyframes crack-shatter {
      0% { opacity: 0; transform: scale(0.8); }
      10% { opacity: 0.2; }
      90% { opacity: 0.2; }
      100% { opacity: 0.15; }
    }
    .sv-panels-noir {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: 1.2fr 1.5fr;
      gap: 1.5rem;
      width: 100%;
      height: calc(100% - 60px);
      box-sizing: border-box;
    }
    .sv-panel-noir {
      border: 4px solid #fff;
      background-color: #000;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1.5rem;
      text-align: center;
      opacity: 0;
    }
    .sv-panel-noir .sv-halftone {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      opacity: 0.15;
      background-image: radial-gradient(#fff 15%, transparent 15%);
      background-size: 8px 8px;
    }
    .sv-panel-noir-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(1.2rem, 3vw, 2.2rem);
      font-weight: 900;
      color: #fff;
      z-index: 1;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      font-style: italic;
    }
    .sv-panel-noir-desc {
      font-family: 'DM Mono', monospace;
      font-size: 0.9rem;
      color: #ccc;
      z-index: 1;
    }
    .sv-panel-noir-1 {
      grid-column: 1 / 3;
      animation: panel-show 0.1s forwards 0.3s;
    }
    .sv-panel-noir-2 {
      grid-column: 3 / 5;
      animation: panel-show 0.1s forwards 1.3s;
    }
    .sv-panel-noir-3 {
      grid-column: 1 / 3;
      animation: panel-show 0.1s forwards 2.3s;
    }
    .sv-panel-noir-4 {
      grid-column: 3 / 5;
      animation: panel-show 0.1s forwards 3.3s;
      background: #0D0D0D;
    }
    .sv-panel-noir-4 .sv-halftone-multi {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      opacity: 0.2;
      background-image: radial-gradient(#fff 20%, transparent 20%);
      background-size: 10px 10px;
    }
    .sv-panel-noir-large-splash {
      font-family: 'Playfair Display', serif;
      font-size: clamp(3rem, 7vw, 5.5rem);
      font-weight: 900;
      font-style: italic;
      color: #fff;
      z-index: 1;
      animation: splash-scale 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) 3.4s both;
    }
    .sv-panel-noir-splash-sub {
      font-family: 'JetBrains Mono', monospace;
      font-size: clamp(1rem, 2vw, 1.5rem);
      color: #fff;
      z-index: 1;
      margin-bottom: 1rem;
      letter-spacing: 1px;
    }
    .sv-panel-noir-splash-sig {
      font-family: 'DM Mono', monospace;
      font-size: 0.85rem;
      color: #aaa;
      z-index: 1;
    }

    /* ----------------------------------------- */
    /* RESPONSIVE DESIGN STYLES */
    /* ----------------------------------------- */
    @media (max-width: 1024px) {
      .about-grid { grid-template-columns: 1fr; gap: 1rem; }
      .decor-num { display: none; }
      .skills-layout { grid-template-columns: 1fr; gap: 3rem; }
      .certs-grid { grid-template-columns: 1fr; }
      .project-card-wrapper {
        width: 100% !important;
        margin-top: 0 !important;
      }
    }

    @media (max-width: 768px) {
      body {
        cursor: auto !important;
      }
      .cursor-dot, .cursor-ring {
        display: none !important;
      }
      .nav-links-desktop {
        display: none;
      }
      .nav-menu-btn {
        display: block;
      }
      .dev-portfolio {
        padding: 0 1.2rem;
      }
      .bg-deep-section {
        margin: 0 -1.2rem;
        padding: 5rem 1.2rem;
      }
      .dev-section {
        padding: 5rem 0;
      }
      .hero-heading-last {
        -webkit-text-stroke: 1.5px #1A1A1A;
      }
      .hero-tagline {
        font-size: 1.15rem;
      }
      .project-card {
        padding: 2rem;
      }
      .project-title {
        font-size: 1.8rem;
      }
      .contact-headline {
        font-size: 2.8rem;
      }
      .contact-buttons-group {
        flex-direction: column;
        align-items: stretch;
        gap: 0.8rem;
      }
      .footer-content {
        flex-direction: column;
        gap: 12px;
        text-align: center;
      }
      .hero-bottom-left {
        position: relative;
        writing-mode: horizontal-tb;
        transform: none;
        bottom: auto;
        left: auto;
        margin-top: 2rem;
        padding-left: 0.5rem;
      }
      .hero-right-column {
        position: relative;
        top: auto;
        right: auto;
        transform: none;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .hero-grid-container {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        padding: 5rem 1.2rem 2rem 1.2rem;
        height: auto;
        gap: 1.5rem;
      }
      .dev-hero {
        height: auto;
        min-height: 100vh;
      }
      .hero-illustration-wrapper {
        max-width: 340px;
        margin-top: 1rem;
      }
      .hero-illustration-img {
        width: 100%;
        max-height: 45vh;
      }

      /* Hacker responsive styling */
      .terminal-hero-row {
        flex-direction: column;
        gap: 1rem;
      }
      .terminal-hero-right {
        display: none;
      }
      .hacker-portfolio-wrapper {
        overflow-x: hidden;
      }
      .hacker-terminal-container {
        height: 100vh;
      }
      .terminal-history-scroller {
        padding: 3.5rem 1rem 1.5rem 1rem;
        font-size: 12px;
        gap: 1.2rem;
      }
      .terminal-output-text {
        font-size: 12px;
      }
      .terminal-prompt-text {
        font-size: 12px;
      }
      .history-command-text {
        font-size: 12px;
      }
      .terminal-typed-text {
        font-size: 12px;
      }
      .terminal-cursor-block {
        width: 8px;
        height: 14px;
      }
      .sv-panels-noir {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(4, 1fr);
        gap: 0.8rem;
        height: calc(100% - 40px);
      }
      .sv-panel-noir-1, .sv-panel-noir-2, .sv-panel-noir-3, .sv-panel-noir-4 {
        grid-column: 1 / 2;
      }
    }

    @media (max-width: 600px) {
      .certs-grid {
        grid-template-columns: 1fr !important;
      }
      .entry-container {
        flex-direction: column;
      }
      .entry-side {
        padding: 2rem;
      }
      .hacker-side {
        text-align: left;
      }
      .hacker-btn {
        align-self: flex-start;
      }
    }

  `}</style>
);

export default App;
