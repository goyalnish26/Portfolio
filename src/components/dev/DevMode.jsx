import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Refactored Sections
import BackgroundDepth from './BackgroundDepth';
import DevNav from './DevNav';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import ExperienceSection from './ExperienceSection';
import ContactSection from './ContactSection';

gsap.registerPlugin(ScrollTrigger);

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
  // Sync Lenis smooth scroll with GSAP ScrollTrigger ticker
  useEffect(() => {
    // Check user preference for motion reduction
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="dev-portfolio">
      {/* Layered Parallax Background */}
      <BackgroundDepth />

      {/* Floating Capsule Nav */}
      <DevNav scrolled={scrolled} setMenuOpen={setMenuOpen} />

      {/* Mobile Drawer Navigation (Frosted Glass Overlay) */}
      {menuOpen && (
        <div className="dev-menu-overlay">
          <button className="dev-menu-close interactive" onClick={() => setMenuOpen(false)}>
            [ close ]
          </button>
          <div className="dev-menu-links">
            <a
              href="#about"
              className="interactive"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                setTimeout(() => {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }, 300);
              }}
            >
              01. LORE
            </a>
            <a
              href="#skills"
              className="interactive"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                setTimeout(() => {
                  document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                }, 300);
              }}
            >
              02. SKILLS
            </a>
            <a
              href="#projects"
              className="interactive"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                setTimeout(() => {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }, 300);
              }}
            >
              03. PROJECTS
            </a>
            <a
              href="#experience"
              className="interactive"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                setTimeout(() => {
                  document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
                }, 300);
              }}
            >
              04. EXPERIENCE
            </a>
            <a
              href="#contact"
              className="interactive"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 300);
              }}
            >
              05. CONTACT
            </a>
          </div>
        </div>
      )}

      {/* Main Dev Mode Section Nodes */}
      <HeroSection
        spiderWebTooltip={spiderWebTooltip}
        setSpiderWebTooltip={setSpiderWebTooltip}
        triggerBikeRide={triggerBikeRide}
      />

      <AboutSection triggerBikeRide={triggerBikeRide} />

      <SkillsSection />

      <ProjectsSection />

      <ExperienceSection />

      <ContactSection
        devPostCreditsSentinelRef={devPostCreditsSentinelRef}
        devPostCreditsState={devPostCreditsState}
      />
    </div>
  );
}
