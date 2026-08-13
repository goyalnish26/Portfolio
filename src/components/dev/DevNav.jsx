import { useEffect, useRef, useState } from 'react';

export default function DevNav({ scrolled, setMenuOpen, devNightMode, toggleDevNightMode }) {
  const [activeSection, setActiveSection] = useState('about');
  const containerRef = useRef(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Monitor active section using a performant custom scroll-spy listener
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ['about', 'skills', 'projects', 'experience', 'contact'];
          const scrollPosition = window.scrollY + window.innerHeight / 3;

          // Default to first section (Lore) when near the top of the page
          if (window.scrollY < 120) {
            setActiveSection('about');
            ticking = false;
            return;
          }

          // Force highlight last section (Contact) when scrolled to the very bottom
          if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120) {
            setActiveSection('contact');
            ticking = false;
            return;
          }

          for (const sectionId of sections) {
            const el = document.getElementById(sectionId);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPosition >= top && scrollPosition < top + height) {
                setActiveSection(sectionId);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on load to set initial state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
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
            href="https://drive.google.com/file/d/1wUdacEusDCz0rU0xPIZAj25vImhFiyqu/view?usp=drive_link"
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
