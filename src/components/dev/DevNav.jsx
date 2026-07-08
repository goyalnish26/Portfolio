import { useEffect, useRef, useState } from 'react';

export default function DevNav({ scrolled, setMenuOpen, devNightMode, toggleDevNightMode }) {
  const [activeSection, setActiveSection] = useState('about');
  const containerRef = useRef(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Monitor active section using IntersectionObserver
  useEffect(() => {
    const sections = ['about', 'skills', 'projects', 'experience', 'contact'];

    const observerCallback = (entries) => {
      // Prevent jumpy underlines during smooth scrolls from clicking links
      if (isScrollingRef.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Trigger near center viewport
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    isScrollingRef.current = true;

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // offset for the floating capsule
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Release scroll block after smooth scroll is expected to end
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 850);
    }
  };

  return (
    <nav className={`dev-nav-capsule-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-capsule-inner" ref={containerRef}>

        <div
          className="nav-logo-capsule interactive"
          role="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          NG.
        </div>

        <div className="nav-links-capsule-desktop">
          <a
            href="#about"
            data-section="about"
            className={`nav-link interactive ${activeSection === 'about' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'about')}
          >
            LORE
          </a>
          <a
            href="#skills"
            data-section="skills"
            className={`nav-link interactive ${activeSection === 'skills' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'skills')}
          >
            SKILLS
          </a>
          <a
            href="#projects"
            data-section="projects"
            className={`nav-link interactive ${activeSection === 'projects' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'projects')}
          >
            PROJECTS
          </a>
          <a
            href="#experience"
            data-section="experience"
            className={`nav-link interactive ${activeSection === 'experience' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'experience')}
          >
            EXPERIENCE
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link nav-resume-capsule interactive"
          >
            RESUME
          </a>
        </div>

        <button
          className="nav-night-toggle-capsule interactive"
          onClick={toggleDevNightMode}
          aria-label={devNightMode ? 'Switch to day mode' : 'Switch to night mode'}
          title={devNightMode ? 'Switch to day mode' : 'Switch to night mode'}
        >
          {devNightMode ? '☼' : '☾'}
        </button>

        <a
          href="#contact"
          data-section="contact"
          className={`nav-cta-capsule interactive ${activeSection === 'contact' ? 'active' : ''}`}
          onClick={(e) => handleNavClick(e, 'contact')}
        >
          CONNECT
        </a>

        <button className="nav-menu-btn-capsule interactive" onClick={() => setMenuOpen(true)}>
          Menu
        </button>
      </div>
    </nav>
  );
}
