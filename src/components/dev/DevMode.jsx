import heroImage from '../../assets/hero.png';
import { devSkills } from '../../config/portfolioData';
import ScrollReveal from './ScrollReveal';
import DevCyberSkill from './DevCyberSkill';
import SpiderWebSVG from './SpiderWebSVG';

export default function DevMode({
  scrolled,
  menuOpen,
  setMenuOpen,
  spiderWebTooltip,
  setSpiderWebTooltip,
  devPostCreditsState,
  devPostCreditsSentinelRef,
  triggerBikeRide
}) {
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
    <div className="dev-portfolio">
      {/* Sticky Navigation */}
      <nav className={`dev-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo" role="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>NG.</div>
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
          <div className="footer-quote">
            &quot;Everyone keeps telling me how my story is supposed to go.
            <br />
            Nah… I&apos;m-a do my own thing.&quot; — Miles Morales
          </div>
        </div>
      </footer>

      {/* Post-credits sentinel — hidden below footer */}
      <div ref={devPostCreditsSentinelRef} style={{ height: '1px', width: '100%' }} />

      {/* Dev Mode Post-Credits Timeline */}
      {devPostCreditsState !== null && (
        <div className="dev-post-credits-timeline">
          {devPostCreditsState === 'wait' && <span>wait</span>}
          {devPostCreditsState === 'rejected' && <span>Canon rejected</span>}
          {devPostCreditsState === 'loading' && <span>Story still loading</span>}
          {devPostCreditsState === 'cursor' && <span className="blinking-cursor">_</span>}
        </div>
      )}
    </div>
  );
}
