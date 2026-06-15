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
  const typedBuffer = useRef("");

  // Navbar blur background state
  const [scrolled, setScrolled] = useState(false);

  // Trigger custom transition
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
      
      // Mode entry choice
      if (mode === 'entry' && !transitioning) {
        if (key === 'd') {
          triggerTransition('dev');
        } else if (key === 'h') {
          triggerTransition('hacker');
        }
      }

      // Hacker Easter Egg
      if (mode === 'hacker') {
        if (e.key.length === 1) {
          typedBuffer.current += key;
          if (typedBuffer.current.length > 20) {
            typedBuffer.current = typedBuffer.current.slice(-20);
          }
          if (typedBuffer.current.endsWith("sudo nish")) {
            setEasterEggActive(true);
            setTimeout(() => {
              setEasterEggActive(false);
            }, 5000);
            typedBuffer.current = "";
          }
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [mode, transitioning]);

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
      {mode === 'entry' && (
        <div className="entry-container">
          <div className="entry-side dev-side" onClick={() => triggerTransition('dev')}>
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
          <div className="entry-split-line"></div>
          <div className="entry-side hacker-side" onClick={() => triggerTransition('hacker')}>
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
          <div className="entry-center-box">
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
            <SpiderWebSVG />
            <div className="hero-content">
              <h1 className="hero-heading">
                <span className="hero-heading-first">{renderStaggeredLetters("Nishchal", 100)}</span>
                <span className="hero-heading-last">{renderStaggeredLetters("Goyal", 500)}</span>
              </h1>
              <p className="hero-tagline">"No safety net. Just shipping."</p>
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
                  <div className="project-card">
                    <div className="project-header">
                      <span className="project-category">Mini-SIEM Security Platform [SEC] <span className="red-spider-dot">🔴</span></span>
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
                  <div className="project-card">
                    <div className="project-header">
                      <span className="project-category">CVE &amp; Threat Intelligence Dashboard [SEC] <span className="red-spider-dot">🔴</span></span>
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
                  <div className="project-card">
                    <div className="project-header">
                      <span className="project-category">Full-Stack Blogging Platform</span>
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
                  <ScrollReveal className="cert-card">
                    <div className="cert-verified">[VERIFIED]</div>
                    <h4 className="cert-title">Google Cybersecurity Certificate</h4>
                    <div className="cert-meta">Google / Coursera · Aug 2025</div>
                    <div className="cert-cred">Credential ID: LGYP4646QM36</div>
                  </ScrollReveal>

                  <ScrollReveal className="cert-card">
                    <h4 className="cert-title">Ethical Hacking Certificate</h4>
                    <div className="cert-meta">IIT Kharagpur (NPTEL) · 2026</div>
                    <div className="cert-cred">12-week course covering NMAP, Wireshark, Burp Suite, Metasploit, SQLi</div>
                  </ScrollReveal>

                  <ScrollReveal className="cert-card">
                    <h4 className="cert-title">Cyber Security &amp; Privacy</h4>
                    <div className="cert-meta">NPTEL Certificate · 2026</div>
                  </ScrollReveal>

                  <ScrollReveal className="cert-card">
                    <h4 className="cert-title">AI Security with Microsoft Sentinel</h4>
                    <div className="cert-meta">Microsoft (AI Skills Fest) · 2026</div>
                    <div className="cert-cred">Project Glasswing playlist: Blue team &amp; AI SOC operations</div>
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
              <div>nishchal goyal · jaipur · 2025</div>
              <div className="footer-quote">&quot;I&apos;ll break it.&quot; — Miles Morales</div>
            </div>
          </footer>
        </div>
      )}

      {/* Screen 3: Security Researcher Mode */}
      {mode === 'hacker' && (
        <div className="hacker-portfolio-wrapper">
          <div className="hacker-status-bar">
            <span>[nish@kali:~] — SECURITY RESEARCH PORTFOLIO</span>
            <span className="nav-links-desktop">[SESSION ACTIVE] [2025]</span>
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

                <TerminalCommand command="cat /projects/aegisguard/README" delay={5000}>
                  <div style={{ color: 'var(--hacker-text-primary)' }}>
                    <span style={{ color: 'var(--hacker-text-bright)' }}>[PROJECT]    AegisGuard — Mini-SIEM Security Platform</span><br />
                    [STATUS]     Active | GitHub: <a href="https://github.com/goyalnish26/AegisGuard" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--hacker-amber)' }}>github.com/goyalnish26/AegisGuard</a><br />
                    [STACK]      Python · FastAPI · SQLite · JavaScript<br />
                    [THREAT-CAP] SSH Brute Force (stateful, 5+ attempts/60s window)<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SQL Injection · XSS · Path Traversal · Sensitive Dir Discovery<br />
                    [FEATURES]   Real-time log tailer (auth.log + web_access.log)<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Custom regex rules engine<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Live attack simulator sandbox<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Discord webhook alerts (High + Critical severity)<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Interactive web dashboard with alert management<br />
                    [LIVE]       <a href="https://goyalnish26.github.io/AegisGuard" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--hacker-amber)' }}>goyalnish26.github.io/AegisGuard</a>
                  </div>
                </TerminalCommand>

                <TerminalCommand command="cat /projects/intelscopepulse/README" delay={5700}>
                  <div style={{ color: 'var(--hacker-text-primary)' }}>
                    <span style={{ color: 'var(--hacker-text-bright)' }}>[PROJECT]    IntelScope-Pulse — CVE Threat Intelligence Dashboard</span><br />
                    [STATUS]     Active | GitHub: <a href="https://github.com/goyalnish26/IntelScope-Pulse" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--hacker-amber)' }}>github.com/goyalnish26/IntelScope-Pulse</a><br />
                    [STACK]      React · NVD API · Chart.js<br />
                    [FEATURES]   Dynamic 90-day CVE rolling window from NVD API<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Severity breakdown charts<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Persistent watchlist<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Real-time threat feed
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
                    <span style={{ color: '#00FF66' }}>[CREDENTIAL VERIFIED]</span> NPTEL — Ethical Hacking<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Issuer: IIT Kharagpur (Prof. Indranil Sengupta)<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date: 2026<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Coverage: NMAP · Wireshark · Burp Suite · Metasploit · SQLi<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Duration: 12 weeks<br /><br />
                    <span style={{ color: '#00FF66' }}>[CREDENTIAL VERIFIED]</span> NPTEL — Cyber Security &amp; Privacy<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Issuer: NPTEL | Date: 2026<br /><br />
                    <span style={{ color: '#00FF66' }}>[CREDENTIAL VERIFIED]</span> AI Security — Microsoft Sentinel &amp; Copilot for Security<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Issuer: Microsoft AI Skills Fest<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date: 2026<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Track: Blue team · AI-powered SOC operations
                  </div>
                </TerminalCommand>

                {/* 3. Live Simulated activity tail logger */}
                <div style={{ margin: '36px 0' }}>
                  <ActivityLog easterEggActive={easterEggActive} />
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
                  <div style={{ color: 'var(--hacker-text-dim)', marginTop: '6px' }}>
                    [QUOTE] &quot;Everyone told Miles this is how it&apos;s supposed to be. He broke the canon anyway.&quot;
                  </div>
                </div>
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
const ActivityLog = ({ easterEggActive }) => {
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

  return (
    <div className="terminal-log-panel">
      <div className="tail-log-header">
        $ tail -f /var/log/activity.log
      </div>
      
      {easterEggActive ? (
        <div className="easter-egg-terminal-content">
          <div className="red-alert-msg">[AUTH]  sudo: permission denied — you are not in the sudoers file.</div>
          <div>[INFO]  This incident will be reported.</div>
          <div className="amber-msg">[WARN]  Just kidding. But I&apos;m already in your system.</div>
          <div className="sig-line">— Nishchal</div>
        </div>
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
      border-color: #E9C46A;
      opacity: 0.55;
    }
    .cursor-ring.dev.cursor-hover {
      width: 48px;
      height: 48px;
      opacity: 1;
      background-color: rgba(233, 196, 106, 0.1);
    }

    .cursor-dot.hacker {
      background-color: #C0C0C0;
    }
    .cursor-ring.hacker {
      border-color: #C0C0C0;
      opacity: 0.35;
    }
    .cursor-ring.hacker.cursor-hover {
      width: 44px;
      height: 44px;
      opacity: 0.7;
      background-color: rgba(192, 192, 192, 0.05);
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
      font-size: 0.8rem;
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
    .hero-content {
      position: relative;
      z-index: 1;
    }
    .hero-heading {
      font-family: 'Playfair Display', serif;
      font-size: 10.5vw;
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
    }

    /* Hero bottom layout elements */
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
      font-size: 0.8rem;
      color: #8A7F6B;
      letter-spacing: 3px;
      margin-bottom: 1rem;
    }
    .section-headline {
      font-family: 'Playfair Display', serif;
      font-size: 3.5rem;
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
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
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
      padding: 2rem;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .cert-verified {
      font-family: 'DM Mono', monospace;
      font-size: 0.75rem;
      font-weight: bold;
      color: #E63946;
      letter-spacing: 1px;
    }
    .cert-title {
      font-family: 'DM Sans', sans-serif;
      font-size: 1.15rem;
      font-weight: bold;
      color: #1A1A1A;
    }
    .cert-meta {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.9rem;
      color: #8A7F6B;
    }
    .cert-cred {
      font-family: 'DM Mono', monospace;
      font-size: 0.75rem;
      color: #8A7F6B;
      margin-top: 4px;
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
      color: #4A4A4A;
      display: flex;
      justify-content: space-between;
      z-index: 1000;
      box-sizing: border-box;
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

    /* ----------------------------------------- */
    /* RESPONSIVE DESIGN STYLES */
    /* ----------------------------------------- */
    @media (max-width: 1024px) {
      .hero-heading { font-size: 12vw; }
      .section-headline { font-size: 3rem; }
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
      .hero-heading {
        font-size: 15vw;
      }
      .hero-heading-last {
        -webkit-text-stroke: 1.5px #1A1A1A;
      }
      .hero-tagline {
        font-size: 1.15rem;
      }
      .section-headline {
        font-size: 2.3rem;
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

      /* Hacker mobile responsiveness choice: */
      /* Real terminals aren't responsive. We allow horizontal scroll on mobile. */
      .hacker-portfolio-wrapper {
        overflow-x: auto;
      }
      .hacker-terminal-body {
        min-width: 800px; /* Force desktop width so terminal columns layout matches exactly */
      }
    }
  `}</style>
);

export default App;
