import { useEffect, useRef, useState } from 'react';

export default function DevNav({ scrolled, setMenuOpen }) {
  const [activeSection, setActiveSection] = useState('about');
  const indicatorRef = useRef(null);
  const containerRef = useRef(null);

  // Monitor active section using IntersectionObserver
  useEffect(() => {
    const sections = ['about', 'skills', 'projects', 'experience', 'contact'];

    const observerCallback = (entries) => {
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

    return () => observer.disconnect();
  }, []);

  // Update sliding indicator pill dimensions and offset to match active nav item
  useEffect(() => {
    const activeLink = containerRef.current?.querySelector(`.nav-link[data-section="${activeSection}"]`);
    const indicator = indicatorRef.current;
    if (activeLink && indicator) {
      const linkRect = activeLink.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      indicator.style.left = `${linkRect.left - containerRect.left}px`;
      indicator.style.width = `${linkRect.width}px`;
      indicator.style.height = `${linkRect.height}px`;
      indicator.style.opacity = '1';
    } else if (indicator) {
      indicator.style.opacity = '0';
    }
  }, [activeSection]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
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
    }
  };

  return (
    <nav className={`dev-nav-capsule-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-capsule-inner" ref={containerRef}>
        {/* Sliding Morphing Indicator Backdrop */}
        <div className="nav-active-pill" ref={indicatorRef} />

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
        </div>

        <a
          href="#contact"
          data-section="contact"
          className="nav-cta-capsule interactive"
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
