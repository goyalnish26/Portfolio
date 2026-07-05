import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpiderWebSVG from './SpiderWebSVG';
import heroImage from '../../assets/hero.png';

gsap.registerPlugin(ScrollTrigger);
export default function HeroSection({
  spiderWebTooltip,
  setSpiderWebTooltip
}) {
  const heroRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      const lettersFirst = containerRef.current?.querySelectorAll('.hero-heading-first .hero-letter');
      const lettersLast = containerRef.current?.querySelectorAll('.hero-heading-last .hero-letter');
      const illustration = containerRef.current?.querySelector('.hero-illustration-img');
      const taglines = containerRef.current?.querySelectorAll('.hero-tagline');
      const details = containerRef.current?.querySelectorAll('.hero-bottom-left, .hero-bottom-center, .hero-bottom-right');

      // Scroll-triggered cinematic zoom & splitting timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: true,
          pinSpacing: true,
        }
      });

      if (lettersFirst && lettersFirst.length) {
        tl.to(lettersFirst, {
          x: (i) => (i - lettersFirst.length / 2) * 15,
          opacity: 0,
          scale: 0.9,
          ease: 'power1.out',
        }, 0);
      }

      if (lettersLast && lettersLast.length) {
        tl.to(lettersLast, {
          x: (i) => (i - lettersLast.length / 2) * 15,
          opacity: 0,
          scale: 0.9,
          ease: 'power1.out',
        }, 0);
      }

      if (illustration) {
        tl.to(illustration, {
          scale: 1.18,
          y: -15,
          filter: 'drop-shadow(0 25px 45px rgba(45, 36, 22, 0.22))',
          ease: 'power1.out',
        }, 0);
      }

      if (taglines && taglines.length) {
        tl.to(taglines, {
          y: -30,
          opacity: 0,
          stagger: 0.1,
          ease: 'none',
        }, 0);
      }

      if (details && details.length) {
        tl.to(details, {
          y: 20,
          opacity: 0,
          stagger: 0.05,
          ease: 'none',
        }, 0);
      }
    }, heroRef);

    return () => context.revert();
  }, []);

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
    <header ref={heroRef} className="dev-hero">
      <div className="hero-section-wrapper-inner" ref={containerRef}>
        {/* Spider Web Easter Egg */}
        <div
          className="spider-web-wrapper spider-sense-trigger interactive"
          onClick={() => {
            setSpiderWebTooltip(true);
            setTimeout(() => setSpiderWebTooltip(false), 6000);
          }}
        >
          <SpiderWebSVG />
        </div>
        {spiderWebTooltip && (
          <div className="spider-tooltip">
            <button
              className="spider-tooltip-close"
              onClick={(e) => {
                e.stopPropagation();
                setSpiderWebTooltip(false);
              }}
            >
              ✕
            </button>
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
      </div>
    </header>
  );
}
