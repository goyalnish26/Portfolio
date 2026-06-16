import React, { useState, useEffect, useRef } from 'react';

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

  // Hacker Boot state
  const [bootIndex, setBootIndex] = useState(0);
  const [hackerBooted, setHackerBooted] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [hackerEasterEggContent, setHackerEasterEggContent] = useState(null);
  const typedBuffer = useRef("");

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
        setBootIndex(0);
        setHackerBooted(false);
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
        setBootIndex(0);
        setHackerBooted(false);
      }
    }, 400);

    // Complete transition (800ms)
    setTimeout(() => {
      setTransitioning(false);
      setNextMode(null);
    }, 800);
  };

  // Keyboard input for selection and easter eggs
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

      // Hacker Easter Eggs — shared keydown buffer
      if (mode === 'hacker') {
        // Don't capture when in input fields
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        if (e.key.length === 1) {
          typedBuffer.current += key;
          if (typedBuffer.current.length > 20) {
            typedBuffer.current = typedBuffer.current.slice(-20);
          }
          
          // Check for all hacker commands
          if (typedBuffer.current.endsWith("sudo nish")) {
            setEasterEggActive(true);
            setHackerEasterEggContent('sudo');
            setTimeout(() => { setEasterEggActive(false); setHackerEasterEggContent(null); }, 5000);
            typedBuffer.current = "";
          } else if (typedBuffer.current.endsWith("help")) {
            setEasterEggActive(true);
            setHackerEasterEggContent('help');
            setTimeout(() => { setEasterEggActive(false); setHackerEasterEggContent(null); }, 8000);
            typedBuffer.current = "";
          } else if (typedBuffer.current.endsWith("ls /secrets")) {
            setEasterEggActive(true);
            setHackerEasterEggContent('secrets');
            setTimeout(() => { setEasterEggActive(false); setHackerEasterEggContent(null); }, 5000);
            typedBuffer.current = "";
          } else if (typedBuffer.current.endsWith("cat flag.txt")) {
            setEasterEggActive(true);
            setHackerEasterEggContent('flag');
            setTimeout(() => { setEasterEggActive(false); setHackerEasterEggContent(null); }, 6000);
            typedBuffer.current = "";
          }
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [mode, transitioning, entryExpandingSide]);

  // === DEV MODE EASTER EGG STATES ===
  const [konamiActive, setKonamiActive] = useState(false);
  const konamiIndex = useRef(0);
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'];
  
  const [slashSearchOpen, setSlashSearchOpen] = useState(false);
  const [slashSearchResult, setSlashSearchResult] = useState('');
  const slashInputRef = useRef(null);
  
  const [spiderWebTooltip, setSpiderWebTooltip] = useState(false);
  const [nameTripleClickFlash, setNameTripleClickFlash] = useState(false);
  
  // === POST CREDITS STATES ===
  const [devPostCreditsActive, setDevPostCreditsActive] = useState(false);
  const [hackerPostCreditsActive, setHackerPostCreditsActive] = useState(false);
  const [ctfStage, setCtfStage] = useState(() => {
    const saved = sessionStorage.getItem('breachLayer');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [ctfInput, setCtfInput] = useState('');
  const [ctfMessage, setCtfMessage] = useState('');
  const [ctfHintCount, setCtfHintCount] = useState(0);
  const ctfInputRef = useRef(null);
  const devPostCreditsSentinelRef = useRef(null);
  const hackerPostCreditsSentinelRef = useRef(null);

  useEffect(() => {
    sessionStorage.setItem('breachLayer', ctfStage);
  }, [ctfStage]);

  // Konami Code listener
  useEffect(() => {
    if (mode !== 'dev') return;
    const handleKonami = (e) => {
      if (e.code === KONAMI[konamiIndex.current]) {
        konamiIndex.current++;
        if (konamiIndex.current === KONAMI.length) {
          setKonamiActive(true);
          konamiIndex.current = 0;
          setTimeout(() => setKonamiActive(false), 8500);
        }
      } else {
        konamiIndex.current = 0;
      }
    };
    window.addEventListener('keydown', handleKonami);
    return () => window.removeEventListener('keydown', handleKonami);
  }, [mode]);

  // Dev mode slash search listener
  useEffect(() => {
    if (mode !== 'dev') return;
    const handleSlash = (e) => {
      if (e.key === '/' && !e.target.closest('input, textarea')) {
        e.preventDefault();
        setSlashSearchOpen(true);
        setSlashSearchResult('');
        setTimeout(() => slashInputRef.current?.focus(), 100);
      }
      if (e.key === 'Escape' && slashSearchOpen) {
        setSlashSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleSlash);
    return () => window.removeEventListener('keydown', handleSlash);
  }, [mode, slashSearchOpen]);

  // Slash search handler
  const handleSlashSearch = (query) => {
    const q = query.toLowerCase().trim();
    if (q === 'aegisguard') {
      setSlashSearchOpen(false);
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      setSlashSearchResult('aegisguard');
      setTimeout(() => setSlashSearchResult(''), 3000);
    } else if (['intelscopepulse', 'intelscoppe', 'intel'].includes(q)) {
      setSlashSearchOpen(false);
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      setSlashSearchResult('intelscopepulse');
      setTimeout(() => setSlashSearchResult(''), 3000);
    } else if (['writeblog', 'blog'].includes(q)) {
      setSlashSearchOpen(false);
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      setSlashSearchResult('writeblog');
      setTimeout(() => setSlashSearchResult(''), 3000);
    } else if (q === 'miles') {
      setSlashSearchOpen(false);
      setSlashSearchResult('miles');
      setTimeout(() => setSlashSearchResult(''), 2000);
    } else if (q === 'spider') {
      setSlashSearchOpen(false);
      setSlashSearchResult('spider');
      setTimeout(() => setSlashSearchResult(''), 2000);
    } else if (q === 'canon') {
      setSlashSearchOpen(false);
      setSlashSearchResult('canon');
      setTimeout(() => setSlashSearchResult(''), 3000);
    } else {
      setSlashSearchResult('notfound');
      setTimeout(() => setSlashSearchResult(''), 2000);
    }
  };

  // Dev post-credits observer
  useEffect(() => {
    if (mode !== 'dev' || !devPostCreditsSentinelRef.current) return;
    if (sessionStorage.getItem('devPostCreditsSeen')) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        sessionStorage.setItem('devPostCreditsSeen', 'true');
        setDevPostCreditsActive(true);
        setTimeout(() => setDevPostCreditsActive(false), 8500);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(devPostCreditsSentinelRef.current);
    return () => observer.disconnect();
  }, [mode]);

  // Hacker post-credits observer
  useEffect(() => {
    if (mode !== 'hacker' || !hackerBooted || !hackerPostCreditsSentinelRef.current) return;
    if (sessionStorage.getItem('hackerPostCreditsSeen')) return;
    let timer;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        timer = setTimeout(() => {
          setHackerPostCreditsActive(true);
          setCtfStage(() => {
            const saved = sessionStorage.getItem('breachLayer');
            const savedStage = saved ? parseInt(saved, 10) : 0;
            return savedStage > 0 ? savedStage : 1;
          });
          observer.disconnect();
        }, 5000);
      } else {
        clearTimeout(timer);
      }
    }, { threshold: 0.1 });
    observer.observe(hackerPostCreditsSentinelRef.current);
    return () => { observer.disconnect(); clearTimeout(timer); };
  }, [mode, hackerBooted]);

  // CTF challenge handler
  const handleCtfSubmit = () => {
    const answer = ctfInput.trim().toLowerCase();
    setCtfInput('');
    
    const cleanStr = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

    if (ctfStage === 1) {
      if (cleanStr(answer) === cleanStr('aegisguard')) {
        setCtfMessage('[OK] AegisGuard. You\'ve been paying attention.\n[OK] Layer 1 breached.\n[INFO] Moving deeper...');
        setTimeout(() => { setCtfStage(2); setCtfMessage(''); setCtfHintCount(0); }, 2500);
      } else {
        setCtfHintCount(prev => prev + 1);
        setCtfMessage('[DENIED] Incorrect. The system remembers.');
      }
    } else if (ctfStage === 2) {
      if (cleanStr(answer) === cleanStr("Nah, I'mma do my own thing.")) {
        setCtfMessage('[OK] "Nah, I\'mma do my own thing."\n[OK] You know the mission.\n[OK] Layer 2 breached.');
        setTimeout(() => { setCtfStage(3); setCtfMessage(''); setCtfHintCount(0); }, 2500);
      } else {
        const nextHintCount = ctfHintCount + 1;
        setCtfHintCount(nextHintCount);
        if (nextHintCount >= 2) {
          setCtfMessage('[DENIED] Incorrect.\n[HINT] Every two hex characters is one ASCII byte.');
        } else {
          setCtfMessage('[DENIED] Incorrect. Try again.');
        }
      }
    } else if (ctfStage === 3) {
      if (cleanStr(answer) === cleanStr("you won't know I was there")) {
        setCtfMessage('[OK] "...you won\'t know I was there."\n[OK] Exactly.');
        setTimeout(() => { 
          setCtfStage(4); 
          setCtfMessage(''); 
          sessionStorage.setItem('hackerPostCreditsSeen', 'true');
        }, 2500);
      } else {
        const nextHintCount = ctfHintCount + 1;
        setCtfHintCount(nextHintCount);
        if (nextHintCount >= 2) {
          setCtfMessage('[DENIED] Incorrect.\n[HINT] Check the footer. It was always there.');
        } else {
          setCtfMessage('[DENIED] Incorrect. Try again.');
        }
      }
    }
  };

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

  // Custom Cursor tracking
  useEffect(() => {
    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${e.clientX}px`;
        cursorDotRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

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

  // Hacker Boot sequence ticking
  useEffect(() => {
    if (mode !== 'hacker') return;
    if (bootIndex < BOOT_LINES.length) {
      const timer = setTimeout(() => {
        setBootIndex(prev => prev + 1);
      }, 120 + Math.random() * 80);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setHackerBooted(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [mode, bootIndex]);

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
      <div id="custom-cursor-ring" ref={cursorRingRef} className={`cursor-ring ${mode === 'dev' ? 'dev' : 'hacker'}`} />

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
          onClick={() => triggerTransition(mode === 'dev' ? 'hacker' : 'dev')}
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
                <a href="#about">01. ABOUT</a>
                <a href="#skills">02. SKILLS</a>
                <a href="#projects">03. PROJECTS</a>
                <a href="#experience">04. EXPERIENCE</a>
                <a href="#contact" className="nav-cta">GET IN TOUCH</a>
              </div>
              <button className="nav-menu-btn" onClick={() => setMenuOpen(true)}>[ menu ]</button>
            </div>
          </nav>

          {/* Fullscreen Menu Drawer */}
          {menuOpen && (
            <div className="dev-menu-overlay">
              <button className="dev-menu-close" onClick={() => setMenuOpen(false)}>[ close ]</button>
              <div className="dev-menu-links">
                <a href="#about" onClick={() => setMenuOpen(false)}>01. ABOUT</a>
                <a href="#skills" onClick={() => setMenuOpen(false)}>02. SKILLS</a>
                <a href="#projects" onClick={() => setMenuOpen(false)}>03. PROJECTS</a>
                <a href="#experience" onClick={() => setMenuOpen(false)}>04. EXPERIENCE</a>
                <a href="#contact" onClick={() => setMenuOpen(false)}>05. CONTACT</a>
              </div>
            </div>
          )}

          {/* Hero Section */}
          <header className="dev-hero">
            <div 
              className={`spider-web-wrapper ${slashSearchResult === 'spider' ? 'spider-animate' : ''}`}
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
            <div className="hero-content">
              <h1 className="hero-heading">
                <span 
                  className={`hero-heading-first ${nameTripleClickFlash ? 'name-outline-flash' : ''}`}
                  onClick={(e) => {
                    if (e.detail === 3) {
                      setNameTripleClickFlash(true);
                      setTimeout(() => setNameTripleClickFlash(false), 400);
                    }
                  }}
                >{renderStaggeredLetters("Nishchal", 100)}</span>
                <span className="hero-heading-last">{renderStaggeredLetters("Goyal", 500)}</span>
              </h1>
              <p className="hero-tagline">"Behind the IDE, just a student from Jaipur."</p>
              <p className="hero-tagline hero-tagline-dim">"Behind the terminal, you won't know I was there."</p>
            </div>

            <div className="hero-bottom-left">
              ECE &apos;27 · SKIT Jaipur · Jaipur, IN
            </div>
            <div className={`hero-bottom-center ${slashSearchResult === 'canon' ? 'canon-revealed' : ''}`}>
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
                <div className="section-label">01 / ABOUT</div>
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
                  <span className="about-pill">Honda CB350 · 2024</span>
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
                    <DevCyberSkill name="Network Security" percentage={90} />
                    <DevCyberSkill name="SIEM &amp; Log Analysis" percentage={85} />
                    <DevCyberSkill name="Web App Pentesting" percentage={78} />
                    <DevCyberSkill name="OverTheWire Bandit (Lvl 12+)" percentage={75} />
                    <DevCyberSkill name="TryHackMe CS101" percentage={70} />
                    <DevCyberSkill name="Threat Intelligence" percentage={76} />
                    <DevCyberSkill name="OSINT &amp; CVE Research" percentage={68} />
                    <DevCyberSkill name="Burp Suite / NMAP / Wireshark" percentage={60} />
                    <DevCyberSkill name="Metasploit Framework (learning)" percentage={50} />
                    <DevCyberSkill name="SQL Injection / XSS" percentage={65} />
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
                  <div className={`project-card project-card-sec project-card-aegis ${slashSearchResult === 'aegisguard' ? 'project-card-pulse' : ''}`}>
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
                  <div className={`project-card project-card-sec ${slashSearchResult === 'intelscopepulse' ? 'project-card-pulse' : ''}`}>
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
                  <div className={`project-card project-card-normal ${slashSearchResult === 'writeblog' ? 'project-card-pulse' : ''}`}>
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
                      <span className="timeline-date">2025 – Present</span>
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

                <ScrollReveal className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h3 className="timeline-title">Intern</h3>
                      <span className="timeline-date">Prior Experience</span>
                    </div>
                    <h4 className="timeline-org">True Value Infosoft</h4>
                    <p className="timeline-desc">
                      Acquired hands-on software development exposure within commercial context.
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

                  <ScrollReveal className="cert-card">
                    <div className="cert-verified cert-verified-gold">[VERIFIED] ✓</div>
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
              <div className={`footer-quote ${slashSearchResult === 'miles' ? 'footer-quote-flash' : ''}`}>&quot;I&apos;ll break it.&quot; — Miles Morales</div>
            </div>
          </footer>

          {/* Post-credits sentinel — hidden below footer */}
          <div ref={devPostCreditsSentinelRef} style={{ height: '1px', width: '100%' }} />

          {/* Slash Search Bar */}
          {slashSearchOpen && (
            <div className="slash-search-bar">
              <input
                ref={slashInputRef}
                className="slash-search-input"
                type="text"
                placeholder="Search... try 'aegisguard', 'miles', 'spider'"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSlashSearch(e.target.value);
                  if (e.key === 'Escape') setSlashSearchOpen(false);
                }}
              />
              {slashSearchResult === 'notfound' && (
                <div className="slash-search-notfound">Nothing found. But you know where to look.</div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Spider-Verse Post Credits Overlay */}
      {devPostCreditsActive && (
        <div className="spiderverse-overlay">
          <div className="sv-panel sv-panel-1">
            <div className="sv-halftone" />
            <div className="sv-label">SKIT JAIPUR, 2023</div>
            <div className="sv-large">STUDENT.</div>
            <div className="sv-small">Nobody knew what was coming.</div>
          </div>
          <div className="sv-panel sv-panel-2">
            <div className="sv-halftone" />
            <div className="sv-label">DREAMSOFT4U, 2025</div>
            <div className="sv-large">DEVELOPER.</div>
            <div className="sv-small">REST APIs. ORM queries. Shipping code.</div>
          </div>
          <div className="sv-panel sv-panel-3">
            <div className="sv-halftone" />
            <div className="sv-label">3AM. TERMINAL OPEN.</div>
            <div className="sv-large">HACKER.</div>
            <div className="sv-small">The logs don&apos;t lie. <span className="sv-cursor">▋</span></div>
          </div>
          <div className="sv-panel sv-panel-4">
            <div className="sv-halftone" />
            <div className="sv-label">JAIPUR.</div>
            <div className="sv-large">CANON BREAKER.</div>
            <div className="sv-small">They said this is how the story goes.</div>
          </div>
          <div className="sv-panel sv-panel-5">
            <div className="sv-halftone sv-halftone-multi" />
            <div className="sv-large sv-large-splash">NAH.</div>
            <div className="sv-splash-sub">I&apos;MMA DO MY OWN THING.</div>
            <div className="sv-splash-sig">— Nishchal Goyal, ECE &apos;27</div>
          </div>
          <div className="sv-to-be-continued">
            <span className="sv-typewriter">// to be continued</span>
            <span className="terminal-cursor" />
          </div>
        </div>
      )}

      {/* Konami Code — AoT Manga Overlay */}
      {konamiActive && (
        <div className="aot-overlay">
          <div className="aot-crack" />
          <div className="aot-panels">
            <div className="aot-panel aot-panel-1">
              <div className="aot-halftone" />
              <div className="aot-text-large">STUDENT.</div>
              <div className="aot-text-small">Jaipur, Rajasthan</div>
            </div>
            <div className="aot-panel aot-panel-2">
              <div className="aot-halftone" />
              <div className="aot-text-large">DEVELOPER.</div>
              <div className="aot-text-small">Ships before breakfast.</div>
            </div>
            <div className="aot-panel aot-panel-3">
              <div className="aot-halftone" />
              <div className="aot-text-large">HACKER.</div>
              <div className="aot-text-small">You won&apos;t know I was there.</div>
              <div className="aot-eye">
                <div className="aot-iris" />
              </div>
            </div>
            <div className="aot-panel aot-panel-4">
              <div className="aot-halftone" />
              <div className="aot-wings">
                <svg viewBox="0 0 100 60" className="wings-svg">
                  <path d="M50 30 L20 5 L15 20 L35 30 L15 40 L20 55 Z" fill="white" />
                  <path d="M50 30 L80 5 L85 20 L65 30 L85 40 L80 55 Z" fill="white" />
                  <circle cx="50" cy="30" r="5" fill="white" />
                </svg>
              </div>
              <div className="aot-text-small">&quot;If you keep moving forward, you will win.&quot;</div>
              <div className="aot-text-small">&quot;— Eren Yeager&quot;</div>
              <div className="aot-kanji">進撃の巨人</div>
            </div>
          </div>
        </div>
      )}

      {/* Screen 3: Security Researcher Mode */}
      {mode === 'hacker' && (
        <div className="hacker-portfolio-wrapper">
          <div className="hacker-status-bar">
            <span>[nish@kali:~] — SECURITY RESEARCH PORTFOLIO</span>
            <span className="status-tags">[SESSION ACTIVE] [2026]</span>
          </div>

          <div className="hacker-terminal-body">
            {/* 1. Boot sequence output */}
            <div className="terminal-boot-container">
              {BOOT_LINES.slice(0, bootIndex).map((line, i) => (
                <div
                  key={i}
                  className={`boot-line ${line.includes('[  OK  ]') ? 'ok' : line.includes('[ WARN ]') ? 'warn' : 'info'}`}
                >
                  {line}
                </div>
              ))}
              {bootIndex === BOOT_LINES.length && !hackerBooted && (
                <div className="cursor-blink-line">
                  <span>&gt; </span>
                  <span className="terminal-cursor"></span>
                </div>
              )}
            </div>

            {/* 2. Main Portfolio terminal command lines */}
            {hackerBooted && (
              <div className="terminal-content">
                <TerminalCommand command="whoami" delay={100}>
                  <div style={{ color: 'var(--hacker-text-bright)' }}>&gt; nishchal_goyal</div>
                </TerminalCommand>

                <TerminalCommand command="cat identity.txt" delay={800}>
                  <div style={{ color: 'var(--hacker-text-primary)' }}>
                    &gt; ECE Final Year — SKIT Jaipur, Batch 2027<br />
                    &gt; Backend Developer. Offensive Security Learner.<br />
                    &gt; Based in Jaipur, Rajasthan, IN.
                  </div>
                </TerminalCommand>

                <TerminalCommand command="cat mission.txt" delay={1500}>
                  <div style={{ color: 'var(--hacker-text-primary)' }}>
                    &gt; Break things ethically.<br />
                    &gt; Find what others miss.<br />
                    &gt; Never accept the canon.
                  </div>
                </TerminalCommand>

                <TerminalCommand command="uptime" delay={2200}>
                  <div style={{ color: 'var(--hacker-text-primary)' }}>
                    &gt; Skills active for 3+ years | Currently: eJPT → OSCP pathway
                  </div>
                </TerminalCommand>

                <TerminalCommand command="cat skills --category=security" delay={2900}>
                  <div style={{ color: 'var(--hacker-text-dim)', marginBottom: '8px' }}>
                    [SYSTEM] Loading security competency matrix...
                  </div>
                  <div className="skills-matrix-monocle">
                    <HackerSkillRow name="Network Security" percentage={90} targetCount={9} statusText="[PROFICIENT]" />
                    <HackerSkillRow name="SIEM &amp; Log Analysis" percentage={85} targetCount={8} statusText="[PROFICIENT]" />
                    <HackerSkillRow name="Web Application Pentesting" percentage={78} targetCount={8} statusText="[DEVELOPING]" />
                    <HackerSkillRow name="OverTheWire Bandit" percentage={75} targetCount={7} statusText="[Lvl 12+ ACTIVE]" />
                    <HackerSkillRow name="TryHackMe CS101" percentage={70} targetCount={7} statusText="[IN PROGRESS]" />
                    <HackerSkillRow name="Threat Intelligence &amp; CVE" percentage={76} targetCount={7} statusText="[DEVELOPING]" />
                    <HackerSkillRow name="OSINT &amp; CVE Research" percentage={68} targetCount={7} statusText="[DEVELOPING]" />
                    <HackerSkillRow name="Burp Suite / NMAP / Wireshark" percentage={60} targetCount={6} statusText="[LEARNING]" />
                    <HackerSkillRow name="Metasploit Framework" percentage={50} targetCount={5} statusText="[LEARNING]" />
                    <HackerSkillRow name="SQL Injection / XSS" percentage={65} targetCount={6} statusText="[DEVELOPING]" />
                  </div>
                  <div style={{ color: 'var(--hacker-text-dim)', marginTop: '8px' }}>
                    [INFO] Current pathway: OverTheWire → THM Jr Pentester → HackTheBox → eJPT → OSCP<br />
                    [INFO] Long-term target: OSCP certification
                  </div>
                </TerminalCommand>

                <TerminalCommand command="cat skills --category=development" delay={3600}>
                  <div style={{ color: 'var(--hacker-text-primary)' }}>
                    [+] Python                        [CORE — 3yrs]<br />
                    [+] FastAPI / Flask               [CORE — backend]<br />
                    [+] REST API Design               [CORE]<br />
                    [+] PostgreSQL / SQLite           [PROFICIENT]<br />
                    [+] Odoo 15 ERP                   [ACTIVE — current internship]<br />
                    [+] Linux/Ubuntu                  [DAILY DRIVER]<br />
                    [+] Git                           [DAILY]<br />
                    [+] Docker                        [COMPETENT]<br />
                    [+] JavaScript / React            [COMPETENT]<br />
                    [+] HTML/CSS                      [COMPETENT]
                  </div>
                </TerminalCommand>

                <TerminalCommand command="ls -la /projects/" delay={4300}>
                  <div style={{ color: 'var(--hacker-text-primary)' }}>
                    total 12<br />
                    drwxr-xr-x  2 nish nish 4096 Jun 15 12:00 aegisguard/<br />
                    drwxr-xr-x  2 nish nish 4096 Jun 15 12:00 intelscopepulse/<br />
                    drwxr-xr-x  2 nish nish 4096 Jun 15 12:00 writeblog/
                  </div>
                </TerminalCommand>

                <TerminalCommand command="cat /projects/aegisguard/threat_report.txt" delay={5000}>
                  <div className="terminal-command-output" style={{ color: 'var(--hacker-text-primary)' }}>
                    ╔══════════════════════════════════════════════╗<br />
                    ║  THREAT DETECTION SYSTEM — AEGISGUARD v1.0  ║<br />
                    ║  STATUS: ACTIVE | CLASSIFICATION: SEC-TOOL  ║<br />
                    ╚══════════════════════════════════════════════╝<br /><br />
                    [SYSTEM]  Real-time log monitoring daemon<br />
                    [DETECTS] SSH Brute Force (5+ attempts/60s window)<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SQL Injection patterns<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;XSS attack vectors<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Path traversal attempts<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sensitive directory probing<br />
                    [ENGINE]  Custom regex rules — zero dependencies<br />
                    [ALERTS]  Discord webhook → High + Critical severity<br />
                    [SANDBOX] Live attack simulator included<br />
                    [STACK]   Python · FastAPI · SQLite · JavaScript<br />
                    [REPO]    <a href="https://github.com/goyalnish26/AegisGuard" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--hacker-amber)' }}>github.com/goyalnish26/AegisGuard</a><br />
                    [LIVE]    <a href="https://goyalnish26.github.io/AegisGuard" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--hacker-amber)' }}>goyalnish26.github.io/AegisGuard</a>
                  </div>
                </TerminalCommand>

                <TerminalCommand command="cat /projects/intelscopepulse/threat_report.txt" delay={5700}>
                  <div className="terminal-command-output" style={{ color: 'var(--hacker-text-primary)' }}>
                    ╔══════════════════════════════════════════════╗<br />
                    ║  CVE INTELLIGENCE FEED — INTELSCOPEPULSE    ║<br />
                    ║  STATUS: SYNCING | SOURCE: NVD API          ║<br />
                    ╚══════════════════════════════════════════════╝<br /><br />
                    [FEED]    NVD API — dynamic 90-day rolling window<br />
                    [OUTPUT]  Severity breakdown charts<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Persistent watchlist<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Real-time threat classification<br />
                    [STACK]   React · NVD API · Chart.js<br />
                    [REPO]    <a href="https://github.com/goyalnish26/IntelScope-Pulse" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--hacker-amber)' }}>github.com/goyalnish26/IntelScope-Pulse</a>
                  </div>
                </TerminalCommand>

                <TerminalCommand command="cat /projects/writeblog/README" delay={6400}>
                  <div style={{ color: 'var(--hacker-text-primary)' }}>
                    <span style={{ color: 'var(--hacker-text-bright)' }}>[PROJECT]    WriteBlog — Full-Stack Blogging Platform</span><br />
                    [STATUS]     Deployed | GitHub: <a href="https://github.com/goyalnish26/writeblog" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--hacker-amber)' }}>github.com/goyalnish26/writeblog</a><br />
                    [STACK]      Python · Flask · SQLAlchemy · Bootstrap 5 · Docker · GitHub Actions<br />
                    [FEATURES]   Role-based auth (reader/author/admin)<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Markdown editor with live preview<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Nested comments · Likes · Bookmarks<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Admin analytics dashboard<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rate-limited auth routes<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Docker + CI/CD pipeline
                  </div>
                </TerminalCommand>

                <TerminalCommand command="cat /etc/work_history" delay={7100}>
                  <div style={{ color: 'var(--hacker-text-primary)' }}>
                    <span style={{ color: 'var(--hacker-text-bright)' }}>[ACTIVE]   Dreamsoft4u Pvt. Ltd. — Backend Developer Intern | 2025–Present</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Building Odoo 15 REST API module<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; HTTP controllers · ORM queries · JSON pipelines<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Stack: Python · Odoo 15 · PostgreSQL · Ubuntu · PyCharm · Git<br /><br />
                    [INACTIVE] AIESEC in Jaipur — Volunteer | 2023<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cross-cultural project coordination<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Leadership development · International youth exchange<br /><br />
                    [INACTIVE] True Value Infosoft — Intern | Prior<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Software development internship
                  </div>
                </TerminalCommand>

                <TerminalCommand command="cat /etc/credentials" delay={7800}>
                  <div style={{ color: 'var(--hacker-text-primary)' }}>
                    <span style={{ color: '#00FF66' }}>[CREDENTIAL VERIFIED]</span> Google Cybersecurity Certificate<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Issuer: Google / Coursera<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date: August 2025<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ID: LGYP4646QM36<br /><br />
                    <span style={{ color: '#00FF66' }}>[CREDENTIAL VERIFIED]</span> Deloitte Australia — Cyber Job Simulation<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Issuer: Forage | Date: October 2025<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ID: 2LN74jKozspnmt3kh<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tasks: Threat analysis · Incident response<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Security assessment<br /><br />
                    <span style={{ color: '#00FF66' }}>[CREDENTIAL VERIFIED]</span> J.P. Morgan — Software Engineering Simulation<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Issuer: Forage | Date: October 2025<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ID: BvwC2Ge8oKbGSzgfr<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tasks: Kafka · H2 · REST API · Controllers<br /><br />
                    <span style={{ color: '#00FF66' }}>[CREDENTIAL VERIFIED]</span> PLC Programming &amp; Its Applications<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Issuer: CSIR-CEERI | Date: November 2024
                  </div>
                </TerminalCommand>

                {/* 3. Live Simulated activity tail logger */}
                <div style={{ margin: '36px 0' }}>
                  <ActivityLog easterEggActive={easterEggActive} hackerEasterEggContent={hackerEasterEggContent} />
                </div>

                <TerminalCommand command="contact --list" delay={8500}>
                  <div style={{ color: 'var(--hacker-text-primary)' }}>
                    [METHOD 01] email<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &gt; <a href="mailto:goyalnishchal71@gmail.com" style={{ color: 'var(--hacker-amber)' }}>goyalnishchal71@gmail.com</a><br /><br />
                    [METHOD 02] linkedin<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &gt; <a href="https://linkedin.com/in/nishchal-goyal-6409a5289" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--hacker-amber)' }}>linkedin.com/in/nishchal-goyal-6409a5289</a><br /><br />
                    [METHOD 03] github<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &gt; <a href="https://github.com/goyalnish26" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--hacker-amber)' }}>github.com/goyalnish26</a><br /><br />
                    <span style={{ color: 'var(--hacker-text-dim)' }}>[NOTE] Open to: SOC Analyst · Security Intern · Pentesting · Backend Dev</span><br />
                    <span style={{ color: 'var(--hacker-text-dim)' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Remote or Jaipur-based preferred</span><br />
                    <span style={{ color: 'var(--hacker-text-dim)' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Response time: &lt; 24 hours</span>
                  </div>
                </TerminalCommand>

                {/* Prompt block ready for typing */}
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '24px', color: 'var(--hacker-text-primary)' }}>
                  <span style={{ color: 'var(--hacker-amber)', marginRight: '8px' }}>$</span>
                  <span style={{ marginRight: '8px' }}>_</span>
                  <span className="terminal-cursor"></span>
                </div>

                <div className="hacker-footer">
                  <div>[SESSION END] nishchal_goyal@kali — all rights reserved, none respected</div>
                  <div className="hacker-footer-quote">
                    &quot;Everyone keeps telling me how my story is supposed to go&hellip; Nah, I&apos;mma do my own thing.&quot; &mdash; Miles Morales
                  </div>
                </div>

                {/* CTF Post-Credits */}
                <div ref={hackerPostCreditsSentinelRef} style={{ height: '1px', width: '100%' }} />
                
                {hackerPostCreditsActive && (
                  <div className="ctf-container">
                    {ctfStage === 0 && (
                      <div className="ctf-intro">
                        <div style={{ color: 'var(--hacker-text-dim)' }}>[SYS] End of public profile reached.</div>
                        <div style={{ color: 'var(--hacker-text-dim)' }}>[SYS] Deeper access requires authentication.</div>
                        <div style={{ color: '#C0C0C0' }}>[INFO] There is another layer. Find it.</div>
                      </div>
                    )}
                    {ctfStage >= 1 && ctfStage <= 3 && (
                      <div className="ctf-game">
                        <div className="ctf-banner">
                          ╔═══════════════════════════════════╗<br />
                          ║&nbsp;&nbsp; BREACH PROTOCOL — NISHCHAL OS&nbsp;&nbsp;║<br />
                          ║&nbsp;&nbsp; Unauthorized access detected.&nbsp;&nbsp;║<br />
                          ║&nbsp;&nbsp; Prove you belong here.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;║<br />
                          ╚═══════════════════════════════════╝
                        </div>
                        <div style={{ color: 'var(--hacker-text-dim)', marginBottom: '16px' }}>
                          [SYS] 3 layers of security. Break them all.<br />
                          [SYS] Your keystrokes are being logged.
                        </div>

                        {ctfStage === 1 && (
                          <div>
                            <div style={{ color: 'var(--hacker-amber)' }}>[LAYER 1/3] RECON</div>
                            <div style={{ color: '#C0C0C0' }}>The system has fingerprints. Find mine.</div>
                            <div style={{ color: 'var(--hacker-text-dim)', marginTop: '4px' }}>
                              Clue: &quot;What tool did I build that watches your auth.log?&quot;
                            </div>
                            <div className="ctf-progress">████░░░░░░░░ 0%</div>
                          </div>
                        )}
                        {ctfStage === 2 && (
                          <div>
                            <div style={{ color: 'var(--hacker-amber)' }}>[LAYER 2/3] CRYPTANALYSIS</div>
                            <div style={{ color: '#C0C0C0' }}>Someone left a message in the logs.</div>
                            <div style={{ color: 'var(--hacker-amber)', marginTop: '8px', fontFamily: 'JetBrains Mono', wordBreak: 'break-all' }}>
                              4e61682c2049276d6d6120646f206d79206f776e207468696e672e
                            </div>
                            <div style={{ color: 'var(--hacker-text-dim)', marginTop: '4px' }}>
                              [INFO] It&apos;s not encrypted. Just encoded.<br />
                              [INFO] Standard encoding. You know this.
                            </div>
                            <div className="ctf-progress">████████░░░░ 33%</div>
                          </div>
                        )}
                        {ctfStage === 3 && (
                          <div>
                            <div style={{ color: 'var(--hacker-amber)' }}>[LAYER 3/3] FINAL ACCESS</div>
                            <div style={{ color: '#C0C0C0' }}>One last thing. This one&apos;s personal.</div>
                            <div style={{ color: 'var(--hacker-text-dim)', marginTop: '8px', fontFamily: 'JetBrains Mono', fontSize: '0.75rem' }}>
                              0x00: 42 65 68 69 6e 64 20 74 68 65 20&nbsp;&nbsp;&quot;Behind the &quot;<br />
                              0x0B: 49 44 45 2c 20 6a 75 73 74 20 61&nbsp;&nbsp;&quot;IDE, just a&quot;<br />
                              0x17: 20 73 74 75 64 65 6e 74 20 66 72&nbsp;&nbsp;&quot; student fr&quot;<br />
                              0x23: 6f 6d 20 4a 61 69 70 75 72 2e&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;om Jaipur.&quot;<br />
                              0x2C: 42 65 68 69 6e 64 20 74 68 65 20&nbsp;&nbsp;&quot;Behind the &quot;<br />
                              0x38: 74 65 72 6d 69 6e 61 6c 2c 20&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;terminal, &quot;<br />
                              0x43: ?? ?? ?? ?? ?? ?? ?? ?? ?? ??&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;??????????&quot;
                            </div>
                            <div style={{ color: 'var(--hacker-text-dim)', marginTop: '4px' }}>
                              [INFO] Complete the redacted section.<br />
                              [INFO] What won&apos;t I leave behind?
                            </div>
                            <div className="ctf-progress">████████████ 66%</div>
                          </div>
                        )}

                        {ctfMessage && (
                          <div className="ctf-message">
                            {ctfMessage.split('\n').map((line, i) => (
                              <div key={i} style={{ color: line.includes('[OK]') ? '#00FF66' : line.includes('[DENIED]') ? '#FF3B30' : line.includes('[HINT]') ? '#FFB300' : '#C0C0C0' }}>{line}</div>
                            ))}
                          </div>
                        )}

                        <div className="ctf-input-row">
                          <span style={{ color: 'var(--hacker-amber)' }}>&gt; </span>
                          <input
                            ref={ctfInputRef}
                            className="ctf-input"
                            type="text"
                            value={ctfInput}
                            onChange={(e) => setCtfInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleCtfSubmit(); }}
                            autoFocus
                          />
                        </div>
                      </div>
                    )}
                    {ctfStage === 4 && (
                      <div className="ctf-victory">
                        <div style={{ color: '#C0C0C0' }}>[SYS] ================================</div>
                        <div style={{ color: '#C0C0C0' }}>[SYS] BREACH PROTOCOL — COMPLETE</div>
                        <div style={{ color: '#C0C0C0', marginBottom: '12px' }}>[SYS] ================================</div>
                        <div style={{ color: '#00FF66' }}>[OK]&nbsp; Identity confirmed.</div>
                        <div style={{ color: '#00FF66' }}>[OK]&nbsp; You think like I do.</div>
                        <div style={{ color: '#00FF66', marginBottom: '12px' }}>[OK]&nbsp; That&apos;s rare.</div>
                        <div style={{ color: '#C0C0C0' }}>[SYS] Dropping you a flag:</div>
                        <div style={{ color: '#FFB300', fontWeight: 'bold', marginBottom: '12px' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;flag&#123;c4n0n_br34k3r_1n_th3_n3tw0rk&#125;</div>
                        <div style={{ color: '#C0C0C0' }}>[SYS] And something more useful:</div>
                        <div className="ctf-contact-box">
                          ╔══════════════════════════════════════╗<br />
                          ║&nbsp; DIRECT LINE — NISHCHAL GOYAL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;║<br />
                          ║&nbsp; goyalnishchal71@gmail.com&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;║<br />
                          ║&nbsp; github.com/goyalnish26&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;║<br />
                          ║&nbsp; linkedin.com/in/nishchal-goyal-&nbsp;&nbsp;&nbsp;&nbsp;║<br />
                          ║&nbsp; 6409a5289&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;║<br />
                          ╚══════════════════════════════════════╝
                        </div>
                        <div style={{ color: '#4A4A4A', fontStyle: 'italic', marginTop: '12px' }}>
                          [SYS] &quot;Everyone keeps telling me how my story is supposed to go…&quot;<br />
                          [SYS] &quot;Nah, I&apos;mma do my own thing.&quot;<br />
                          [SYS] — Miles Morales
                        </div>
                        <div style={{ color: '#4A4A4A', marginTop: '12px' }}>[SYS] Session terminated. Good hunt.</div>
                        <div className="ctf-final-cursor">
                          <span style={{ color: 'var(--hacker-amber)' }}>&gt; </span>
                          <span className="terminal-cursor" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="crt-scanline"></div>
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

// Subcomponent: Terminal Output command line typing simulator
const TerminalCommand = ({ command, children, delay = 0 }) => {
  const [showCommand, setShowCommand] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowCommand(true);
    }, delay);

    const timer2 = setTimeout(() => {
      setShowOutput(true);
    }, delay + 400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [delay]);

  if (!showCommand) return null;

  return (
    <div className="terminal-command-group" style={{ marginBottom: '24px' }}>
      <div style={{ color: 'var(--hacker-text-primary)', display: 'flex', alignItems: 'center' }}>
        <span style={{ color: 'var(--hacker-amber)', marginRight: '8px' }}>$</span>
        <span className="typewriter-text" style={{ borderRight: showOutput ? 'none' : '1.5px solid var(--hacker-text-primary)' }}>{command}</span>
      </div>
      {showOutput && (
        <div style={{ color: 'var(--hacker-text-primary)', marginTop: '8px', paddingLeft: '8px' }}>
          {children}
        </div>
      )}
    </div>
  );
};

// Subcomponent: Monospace Character Hacker Progress Bar
const ProgressBar = ({ targetCount, percentage, statusText }) => {
  const [currentCount, setCurrentCount] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setCurrentCount(prev => {
        if (prev < targetCount) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 45);
    return () => clearInterval(interval);
  }, [targetCount]);

  const solid = "█".repeat(currentCount);
  const empty = "░".repeat(10 - currentCount);

  return (
    <span>
      <span style={{ color: 'var(--hacker-text-bright)' }}>{solid}</span>
      <span style={{ color: 'var(--hacker-text-dim)' }}>{empty}</span>
      &nbsp;&nbsp;{percentage}%&nbsp;&nbsp;&nbsp;&nbsp;{statusText}
    </span>
  );
};

const HackerSkillRow = ({ name, percentage, targetCount, statusText }) => {
  return (
    <div className="hacker-skill-row" style={{ lineHeight: '1.6' }}>
      <span style={{ color: 'var(--hacker-text-primary)' }}>[+] {padRight(name, 32)}</span>
      <ProgressBar targetCount={targetCount} percentage={percentage} statusText={statusText} />
    </div>
  );
};

// Subcomponent: Active rolling activity tail log simulator
const ActivityLog = ({ easterEggActive, hackerEasterEggContent }) => {
  const [logs, setLogs] = useState([]);
  const logIndex = useRef(0);
  const baseTime = useRef(new Date());

  useEffect(() => {
    // Populate first 4 entries immediately on load
    const initialLogs = [];
    for (let i = 0; i < 4; i++) {
      const template = logTemplates[i];
      const logTime = new Date(baseTime.current.getTime() + template.offsetSec * 1000);
      const pad = (num) => String(num).padStart(2, '0');
      const formattedDate = `${logTime.getFullYear()}-${pad(logTime.getMonth() + 1)}-${pad(logTime.getDate())}`;
      const formattedTime = `${pad(logTime.getHours())}:${pad(logTime.getMinutes())}:${pad(logTime.getSeconds())}`;
      const timestamp = `[${formattedDate} ${formattedTime}]`;
      initialLogs.push(`${timestamp} ${template.isCommand ? '' : '>> '}${template.text}`);
    }
    setLogs(initialLogs);
    logIndex.current = 4;

    const interval = setInterval(() => {
      if (easterEggActive) return;

      setLogs(prev => {
        const nextIndex = logIndex.current % logTemplates.length;
        if (nextIndex === 0 && logIndex.current !== 0) {
          baseTime.current = new Date();
        }

        const template = logTemplates[nextIndex];
        const logTime = new Date(baseTime.current.getTime() + template.offsetSec * 1000);
        const pad = (num) => String(num).padStart(2, '0');
        const formattedDate = `${logTime.getFullYear()}-${pad(logTime.getMonth() + 1)}-${pad(logTime.getDate())}`;
        const formattedTime = `${pad(logTime.getHours())}:${pad(logTime.getMinutes())}:${pad(logTime.getSeconds())}`;
        const timestamp = `[${formattedDate} ${formattedTime}]`;
        const logLine = `${timestamp} ${template.isCommand ? '' : '>> '}${template.text}`;

        logIndex.current += 1;
        const updated = [...prev, logLine];
        if (updated.length > 9) updated.shift();
        return updated;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [easterEggActive]);

  const renderEasterEggContent = () => {
    switch (hackerEasterEggContent) {
      case 'sudo':
        return (
          <div className="easter-egg-terminal-content">
            <div className="red-alert-msg">[AUTH]  sudo: permission denied</div>
            <div className="red-alert-msg">[AUTH]  nish is not in the sudoers file.</div>
            <div style={{ color: '#C0C0C0' }}>[INFO]  This incident will be reported.</div>
            <div className="amber-msg">[WARN]  Just kidding. But I&apos;m already in your system.</div>
            <div className="sig-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— Nishchal</div>
          </div>
        );
      case 'help':
        return (
          <div className="easter-egg-terminal-content" style={{ animation: 'none' }}>
            <div style={{ color: 'var(--hacker-amber)', marginBottom: '8px' }}>$ help</div>
            <div style={{ color: '#C0C0C0', marginBottom: '4px' }}>AVAILABLE COMMANDS:</div>
            <div style={{ color: '#C0C0C0' }}>&nbsp;&nbsp;whoami&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— you already know</div>
            <div style={{ color: '#C0C0C0' }}>&nbsp;&nbsp;ls /secrets&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— nice try</div>
            <div style={{ color: '#C0C0C0' }}>&nbsp;&nbsp;cat flag.txt&nbsp;&nbsp;&nbsp;&nbsp;— not today</div>
            <div style={{ color: '#C0C0C0' }}>&nbsp;&nbsp;sudo nish&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— you wish</div>
            <div style={{ color: '#C0C0C0', marginBottom: '8px' }}>&nbsp;&nbsp;exit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— why would you?</div>
            <div style={{ color: '#C0C0C0' }}>[INFO] Some commands do more than others.</div>
            <div style={{ color: '#C0C0C0' }}>[INFO] Type carefully.</div>
          </div>
        );
      case 'secrets':
        return (
          <div className="easter-egg-terminal-content" style={{ animation: 'none' }}>
            <div style={{ color: 'var(--hacker-amber)', marginBottom: '8px' }}>$ ls /secrets</div>
            <div style={{ color: '#C0C0C0' }}>ls: cannot access &apos;/secrets&apos;: Permission denied</div>
            <div className="red-alert-msg">[ERRNO 13] Access denied — not your directory.</div>
            <div className="amber-msg">[HINT] Try harder. Or maybe don&apos;t.</div>
          </div>
        );
      case 'flag':
        return (
          <div className="easter-egg-terminal-content" style={{ animation: 'none' }}>
            <div style={{ color: 'var(--hacker-amber)', marginBottom: '8px' }}>$ cat flag.txt</div>
            <div style={{ color: '#FFB300', fontWeight: 'bold', marginBottom: '8px' }}>flag&#123;y0u_f0und_n0th1ng_but_y0u_tr13d&#125;</div>
            <div style={{ color: '#C0C0C0' }}>[INFO] Points for effort.</div>
            <div style={{ color: '#C0C0C0' }}>[INFO] Zero for success.</div>
            <div style={{ color: '#C0C0C0' }}>[INFO] But I respect the attempt.</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="terminal-log-panel">
      <div className="tail-log-header">
        $ tail -f /var/log/activity.log
      </div>

      {easterEggActive ? (
        renderEasterEggContent()
      ) : (
        <div className="logs-scroller-content">
          {logs.map((log, i) => (
            <div
              key={i}
              className={`log-line-entry ${log.includes('ALERT') ? 'amber-log' : log.includes('CRITICAL') ? 'red-log' : 'normal-log'}`}
            >
              {log}
            </div>
          ))}
          <div className="cursor-blink-line">
            <span className="terminal-cursor"></span>
          </div>
        </div>
      )}
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

    /* Hero */
    .dev-hero {
      position: relative;
      height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 0;
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
      width: 72%;
      align-self: flex-start;
    }
    .p-card-medium-right {
      width: 62%;
      align-self: flex-end;
      margin-top: -3.5rem;
      z-index: 2;
    }
    .p-card-medium-left {
      width: 62%;
      align-self: flex-start;
      margin-top: -1.5rem;
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
      padding: 2rem;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      gap: 8px;
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
    /* HACKER MODE DESIGN (SPIDER-NOIR Vintage Monitor) */
    /* ----------------------------------------- */
    .hacker-portfolio-wrapper {
      min-height: 100vh;
      width: 100%;
      background-color: #0D0D0D;
      font-family: 'JetBrains Mono', monospace;
      color: #C0C0C0;
      position: relative;
      display: flex;
      flex-direction: column;

      /* CSS custom properties for hacker palette — used by var() in inline styles */
      --hacker-bg: #0D0D0D;
      --hacker-bg-surface: #111111;
      --hacker-bg-raised: #161616;
      --hacker-text-primary: #C0C0C0;
      --hacker-text-dim: #4A4A4A;
      --hacker-text-bright: #E8E8E8;
      --hacker-amber: #FFB300;
      --hacker-amber-dim: #7A5500;
      --hacker-red-alert: #FF3B30;
      --hacker-border: #1E1E1E;
    }

    .hacker-status-bar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background-color: #111111;
      border-bottom: 1px solid #1E1E1E;
      padding: 0.6rem 1.5rem;
      font-size: 0.75rem;
      color: #6A6A6A;
      display: flex;
      justify-content: space-between;
      z-index: 1000;
      box-sizing: border-box;
    }
    .hacker-status-bar .status-tags {
      color: #888888;
    }

    .hacker-terminal-body {
      padding: 4rem 2rem 6rem 2rem;
      max-width: 900px;
      margin: 0 auto;
      width: 100%;
      box-sizing: border-box;
      flex-grow: 1;
    }

    /* Boot text styling */
    .terminal-boot-container {
      font-size: 0.85rem;
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    .boot-line {
      margin-bottom: 4px;
      white-space: pre-wrap;
    }
    .boot-line.ok { color: #C0C0C0; }
    .boot-line.warn { color: #FFB300; }
    .boot-line.info { color: #4A4A4A; }
    
    .cursor-blink-line {
      display: inline-flex;
      align-items: center;
    }
    .terminal-cursor {
      width: 8px;
      height: 15px;
      background-color: #C0C0C0;
      animation: blink 1s step-end infinite;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    /* Typewriter animation inside commands */
    .typewriter-text {
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      animation: typing-effect 0.4s steps(20, end) forwards;
    }
    @keyframes typing-effect {
      from { width: 0; }
      to { width: 100%; }
    }

    .terminal-command-group {
      font-size: 0.9rem;
    }
    .terminal-command-group a {
      color: #FFB300;
      text-decoration: underline;
      cursor: none;
    }
    .terminal-command-group a:hover {
      color: #E8E8E8;
    }

    /* Hacker Skills Table */
    .skills-matrix-monocle {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin: 12px 0;
      border-left: 2px solid #1E1E1E;
      padding-left: 16px;
    }

    /* Simulated Activity Tail Log panel */
    .terminal-log-panel {
      border: 1px solid #1E1E1E;
      background-color: #111111;
      padding: 1.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
      min-height: 220px;
      position: relative;
    }
    .tail-log-header {
      color: #4A4A4A;
      margin-bottom: 12px;
      border-bottom: 1px solid #1E1E1E;
      padding-bottom: 8px;
      font-size: 0.75rem;
    }
    .logs-scroller-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .log-line-entry {
      white-space: pre-wrap;
    }
    .normal-log { color: #C0C0C0; }
    .amber-log { color: #FFB300; }
    .red-log { color: #FF3B30; }

    /* Easter egg block style */
    .easter-egg-terminal-content {
      color: #FFB300;
      animation: crt-flicker-short 0.1s infinite;
      line-height: 1.6;
    }
    .red-alert-msg {
      color: #FF3B30;
      font-weight: bold;
    }
    .amber-msg {
      color: #FFB300;
    }
    .sig-line {
      text-align: right;
      color: #E8E8E8;
    }

    @keyframes crt-flicker-short {
      0% { opacity: 0.95; }
      50% { opacity: 1; }
      100% { opacity: 0.98; }
    }

    /* Hacker footer */
    .hacker-footer {
      border-top: 1px solid #1E1E1E;
      padding-top: 2rem;
      margin-top: 6rem;
      font-size: 0.75rem;
      color: #4A4A4A;
      line-height: 1.6;
    }
    .hacker-footer-quote {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: #4A4A4A;
      margin-top: 0.8rem;
      text-align: center;
      font-style: italic;
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

    /* Accessibility / Reset utility overrides */
    a:focus-visible, button:focus-visible {
      outline: 2px solid #E9C46A;
      outline-offset: 4px;
    }
    .hacker-portfolio-wrapper a:focus-visible {
      outline: 2px solid #FFB300;
    }

    /* Slash Search Bar styling */
    .slash-search-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: #FDF5C0;
      border-top: 1px solid #E9C46A;
      padding: 1.5rem 2rem;
      z-index: 10000;
      box-shadow: 0 -10px 30px rgba(45, 36, 22, 0.08);
      display: flex;
      flex-direction: column;
      align-items: center;
      animation: search-slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      box-sizing: border-box;
    }
    @keyframes search-slide-up {
      0% { transform: translateY(100%); }
      100% { transform: translateY(0); }
    }
    .slash-search-input {
      width: 100%;
      max-width: 600px;
      padding: 0.8rem 1.2rem;
      background: transparent;
      border: 1px solid #E9C46A;
      border-radius: 4px;
      font-family: 'DM Mono', monospace;
      font-size: 0.95rem;
      color: #1A1A1A;
      outline: none;
    }
    .slash-search-input::placeholder {
      color: #A89F8B;
    }
    .slash-search-notfound {
      font-family: 'DM Mono', monospace;
      font-size: 0.8rem;
      color: #8A7F6B;
      margin-top: 0.8rem;
    }

    /* Keyword animations */
    .project-card-pulse {
      animation: gold-pulse-anim 1s ease-in-out 3;
    }
    @keyframes gold-pulse-anim {
      0%, 100% { box-shadow: 0 4px 20px rgba(45, 36, 22, 0.04); border-color: rgba(233, 196, 106, 0.3); }
      50% { box-shadow: 0 0 25px rgba(233, 196, 106, 0.6); border-color: #E9C46A; transform: scale(1.02); }
    }

    .footer-quote-flash {
      animation: quote-flash-anim 2s ease-in-out forwards;
    }
    @keyframes quote-flash-anim {
      0%, 100% { color: #8A7F6B; font-weight: normal; }
      20%, 80% { color: #E9C46A; text-shadow: 0 0 8px rgba(233, 196, 106, 0.5); font-weight: bold; }
    }

    .canon-revealed {
      animation: canon-reveal-anim 3s ease-in-out forwards;
    }
    @keyframes canon-reveal-anim {
      0%, 100% { opacity: 0.5; color: #C9A84C; }
      10%, 90% { opacity: 1; color: #1A1A1A; font-weight: bold; }
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

    /* Web spinning stroke animation */
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

    /* Name Outline Flash styling */
    .name-outline-flash {
      animation: mask-outline 400ms ease forwards;
    }
    @keyframes mask-outline {
      0% {
        color: transparent;
        -webkit-text-stroke: 2px #1A1A1A;
      }
      90% {
        color: transparent;
        -webkit-text-stroke: 2px #1A1A1A;
      }
      100% {
        color: #2D2416;
        -webkit-text-stroke: 0px transparent;
      }
    }

    /* CTF Breach Protocol styling */
    .ctf-container {
      margin-top: 3rem;
      border-top: 1px dashed #1E1E1E;
      padding-top: 2rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
    }
    .ctf-banner {
      color: #FFB300;
      line-height: 1.4;
      margin-bottom: 1rem;
      white-space: pre-wrap;
    }
    .ctf-progress {
      font-family: 'JetBrains Mono', monospace;
      color: #FFB300;
      margin-top: 8px;
      margin-bottom: 16px;
    }
    .ctf-message {
      margin: 16px 0;
      white-space: pre-wrap;
      line-height: 1.6;
    }
    .ctf-input-row {
      display: flex;
      align-items: center;
      margin-top: 12px;
    }
    .ctf-input {
      background: transparent;
      border: none;
      outline: none;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      color: #C0C0C0;
      flex-grow: 1;
      caret-color: #FFB300;
    }
    .ctf-contact-box {
      color: #C0C0C0;
      border: 1px solid #FFB300;
      padding: 1rem;
      margin: 1rem 0;
      display: inline-block;
      line-height: 1.5;
      background-color: #111111;
      white-space: pre-wrap;
    }
    .ctf-victory {
      line-height: 1.6;
    }
    .ctf-final-cursor {
      display: flex;
      align-items: center;
      margin-top: 16px;
    }

    /* Spider-Verse Post Credits Overlay styling */
    .spiderverse-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: #000;
      z-index: 100000;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: 1.2fr 1.5fr;
      padding: 2rem;
      gap: 1.5rem;
      box-sizing: border-box;
      animation: sv-fade-out 0.5s ease 8s forwards;
    }
    @keyframes sv-fade-out {
      to { opacity: 0; pointer-events: none; }
    }
    .sv-panel {
      border: 4px solid #000;
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
    .sv-halftone {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      opacity: 0.15;
    }
    .sv-label {
      position: absolute;
      top: 1rem;
      left: 1rem;
      background-color: #000;
      color: #fff;
      font-family: 'DM Mono', monospace;
      font-size: 0.7rem;
      padding: 2px 8px;
      z-index: 2;
      font-weight: bold;
    }
    .sv-large {
      font-family: 'Bangers', sans-serif;
      font-size: clamp(2rem, 5vw, 4rem);
      color: #fff;
      z-index: 1;
      text-shadow: 2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000;
      margin-bottom: 0.5rem;
      letter-spacing: 2px;
    }
    .sv-small {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.9rem;
      color: #fff;
      z-index: 1;
      font-weight: bold;
      text-shadow: 1px 1px 0px #000;
    }
    .sv-panel-1 {
      grid-column: 1 / 3;
      background-color: #8B0000;
      animation: panel-show 0.1s forwards 0.3s;
    }
    .sv-panel-1 .sv-halftone {
      background-image: radial-gradient(#A50000 20%, transparent 20%);
      background-size: 10px 10px;
    }
    .sv-panel-2 {
      grid-column: 3 / 5;
      background-color: #1A1A5E;
      animation: panel-show 0.1s forwards 1.3s;
    }
    .sv-panel-2 .sv-halftone {
      background-image: radial-gradient(#1E1E6E 20%, transparent 20%);
      background-size: 10px 10px;
    }
    .sv-panel-3 {
      grid-column: 1 / 3;
      background-color: #0D0D0D;
      animation: panel-show 0.1s forwards 2.3s;
    }
    .sv-panel-3 .sv-halftone {
      background-image: radial-gradient(#FF006E 15%, transparent 15%);
      background-size: 8px 8px;
    }
    .sv-cursor {
      color: #FF006E;
      animation: blink 1s step-end infinite;
    }
    .sv-panel-4 {
      grid-column: 3 / 5;
      background-color: #000;
      border-color: #fff;
      animation: panel-show 0.1s forwards 3.3s;
    }
    .sv-panel-4 .sv-halftone {
      background-image: radial-gradient(#fff 10%, transparent 10%);
      background-size: 12px 12px;
      opacity: 0.1;
    }
    .sv-panel-5 {
      grid-column: 1 / 5;
      background: linear-gradient(135deg, #8B0000, #1A1A5E, #FF006E, #000);
      animation: panel-show 0.1s forwards 4.3s;
      border-width: 5px;
    }
    .sv-panel-5 .sv-halftone-multi {
      background-image: radial-gradient(#E9C46A 20%, transparent 20%);
      background-size: 10px 10px;
      opacity: 0.1;
    }
    .sv-large-splash {
      font-size: clamp(4rem, 10vw, 8rem);
      color: #E9C46A;
      animation: splash-scale 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) 4.4s both;
    }
    @keyframes splash-scale {
      0% { transform: scale(0.5); }
      100% { transform: scale(1); }
    }
    .sv-splash-sub {
      font-family: 'Bangers', sans-serif;
      font-size: clamp(2rem, 4vw, 3rem);
      color: #fff;
      text-shadow: 3px 3px 0px #000;
      letter-spacing: 2px;
      z-index: 1;
      margin-bottom: 1rem;
    }
    .sv-splash-sig {
      font-family: 'DM Mono', monospace;
      font-size: 0.85rem;
      color: #fff;
      opacity: 0.8;
      z-index: 1;
    }
    @keyframes panel-show {
      to { opacity: 1; }
    }
    .sv-to-be-continued {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: #000;
      z-index: 200;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      animation: tbc-show 0.1s forwards 5.8s;
      font-family: 'JetBrains Mono', monospace;
      font-size: 1.5rem;
      color: #fff;
    }
    @keyframes tbc-show {
      to { opacity: 1; }
    }
    .sv-typewriter {
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      width: 0;
      animation: sv-typing 1.2s steps(20, end) forwards 6.1s;
    }
    @keyframes sv-typing {
      from { width: 0; }
      to { width: 220px; }
    }

    /* Konami AoT Manga Overlay styling */
    .aot-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: #000;
      z-index: 100000;
      display: flex;
      flex-direction: column;
      animation: sv-fade-out 0.5s ease 8s forwards;
    }
    .aot-crack {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' stroke='black' stroke-width='1.5' fill='none'><path d='M50 50 L10 10 M50 50 L90 10 M50 50 L10 90 M50 50 L90 90 M50 50 L50 0 M50 50 L50 100 M50 50 L0 50 M50 50 L100 50 M30 30 L40 10 L50 30 L70 20 L80 40 L60 50 L70 70 L90 60 L80 80 L50 70 L30 80 L10 70 L30 50 L20 40 Z'/></svg>");
      background-size: cover;
      z-index: 200;
      pointer-events: none;
      animation: crack-shatter 0.5s ease-out forwards;
    }
    .aot-crack-end {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' stroke='black' stroke-width='1.5' fill='none'><path d='M50 50 L10 10 M50 50 L90 10 M50 50 L10 90 M50 50 L90 90 M50 50 L50 0 M50 50 L50 100 M50 50 L0 50 M50 50 L100 50 M30 30 L40 10 L50 30 L70 20 L80 40 L60 50 L70 70 L90 60 L80 80 L50 70 L30 80 L10 70 L30 50 L20 40 Z'/></svg>");
      background-size: cover;
      z-index: 200;
      pointer-events: none;
      opacity: 0;
      animation: crack-shatter 0.5s ease-out forwards 8s;
    }
    @keyframes crack-shatter {
      0% { opacity: 0; transform: scale(0.8); }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { opacity: 0; }
    }
    .aot-panels {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      width: 100%;
      height: 100%;
      gap: 10px;
      padding: 10px;
      box-sizing: border-box;
      background-color: #000;
    }
    .aot-panel {
      position: relative;
      background-color: #000;
      border: 4px solid #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      text-align: center;
      overflow: hidden;
      opacity: 0;
      animation: panel-show 0.1s forwards 0.5s;
    }
    .aot-halftone {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: radial-gradient(#333 15%, transparent 15%);
      background-size: 8px 8px;
      opacity: 0.3;
      z-index: 0;
    }
    .aot-text-large {
      font-family: 'Impact', 'Arial Black', sans-serif;
      font-size: clamp(2.5rem, 6vw, 5rem);
      color: #fff;
      z-index: 1;
      letter-spacing: 2px;
      text-shadow: 2px 2px 0px #000;
      margin-bottom: 0.5rem;
    }
    .aot-text-small {
      font-family: 'Impact', sans-serif;
      font-size: clamp(1rem, 2vw, 1.8rem);
      color: #ccc;
      z-index: 1;
      letter-spacing: 1px;
      text-shadow: 1px 1px 0px #000;
    }
    .aot-panel-1 {
      border-right-width: 6px;
      border-bottom-width: 6px;
    }
    .aot-panel-2 {
      border-left-width: 6px;
      border-bottom-width: 6px;
    }
    .aot-panel-3 {
      border-right-width: 6px;
      border-top-width: 6px;
    }
    .aot-panel-3 .aot-halftone {
      background-image: radial-gradient(#555 20%, transparent 20%);
      background-size: 6px 6px;
      opacity: 0.5;
    }
    .aot-panel-4 {
      border-left-width: 6px;
      border-top-width: 6px;
    }
    .aot-eye {
      width: 80px;
      height: 40px;
      background-color: #fff;
      border-radius: 50% 50%;
      border: 3px solid #000;
      position: relative;
      margin-top: 1rem;
      z-index: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      box-shadow: 0 0 10px rgba(255,255,255,0.5);
    }
    .aot-iris {
      width: 30px;
      height: 30px;
      background-color: #000;
      border-radius: 50%;
      border: 2px solid #fff;
      position: relative;
    }
    .aot-iris::after {
      content: '';
      position: absolute;
      top: 5px;
      left: 5px;
      width: 6px;
      height: 6px;
      background-color: #fff;
      border-radius: 50%;
    }
    .aot-wings {
      margin-bottom: 1rem;
      z-index: 1;
    }
    .wings-svg {
      width: 100px;
      height: 60px;
      filter: drop-shadow(0 0 8px rgba(255,255,255,0.8));
    }
    .aot-kanji {
      font-family: 'Impact', sans-serif;
      font-size: 1.5rem;
      color: #888;
      margin-top: 1rem;
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
        cursor: auto !important; /* fallback for mobile tap actions */
      }
      .cursor-dot, .cursor-ring {
        display: none !important; /* Hide custom cursor on mobile */
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

      /* Hero vertical text positioning on mobile */
      .hero-bottom-left {
        position: relative;
        writing-mode: horizontal-tb;
        transform: none;
        bottom: auto;
        left: auto;
        margin-top: 2rem;
        padding-left: 0.5rem;
      }

      /* Hacker responsive styling - no horizontal page scroll, scroll only inside containers */
      .hacker-portfolio-wrapper {
        overflow-x: hidden;
      }
      .hacker-terminal-body {
        width: 100%;
        max-width: 900px;
        min-width: 0 !important;
        padding: 4rem 1.2rem 6rem 1.2rem;
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
