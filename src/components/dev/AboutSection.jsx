import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImage from '../../assets/hero.png';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection({ triggerBikeRide }) {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const cardRef = useRef(null);
  const pcbPathRef = useRef(null);

  // 3D Card tilt states
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Word-by-word scroll fade-in for text
    const textEl = textRef.current;
    if (textEl) {
      const paragraph = textEl.querySelectorAll('p');
      paragraph.forEach(p => {
        const words = p.innerText.split(' ');
        p.innerHTML = words.map(word => `<span class="scroll-word">${word}</span>`).join(' ');

        const wordElements = p.querySelectorAll('.scroll-word');
        gsap.fromTo(wordElements, 
          { opacity: 0.1, y: 5 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.02,
            scrollTrigger: {
              trigger: p,
              start: 'top 85%',
              end: 'bottom 60%',
              scrub: true,
            }
          }
        );
      });
    }

    // SVG PCB path trace draw on scroll
    const pcbPath = pcbPathRef.current;
    if (pcbPath) {
      const length = pcbPath.getTotalLength();
      pcbPath.style.strokeDasharray = length;
      pcbPath.style.strokeDashoffset = length;

      gsap.to(pcbPath, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: true,
        }
      });
    }
  }, []);

  // Handle 3D Tilt calculations
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x coordinate within the element
    const y = e.clientY - rect.top;  // y coordinate within the element

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (centerY - y) / 10; // Max tilt 10 degrees
    const rotateY = (x - centerX) / 10;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section ref={sectionRef} id="about" className="dev-section">
      {/* Background SVG PCB Traces */}
      <div className="about-pcb-background" aria-hidden="true">
        <svg viewBox="0 0 800 600" className="pcb-svg">
          <path
            ref={pcbPathRef}
            d="M 100,50 L 100,200 L 250,280 L 250,450 L 400,520 L 700,520"
            fill="none"
            className="pcb-trace-path"
          />
          <circle cx="100" cy="50" r="4" fill="var(--hacker-accent, #E9C46A)" className="pcb-node" />
          <circle cx="250" cy="280" r="4" fill="var(--hacker-accent, #E9C46A)" className="pcb-node" />
          <circle cx="400" cy="520" r="4" fill="var(--hacker-accent, #E9C46A)" className="pcb-node" />
        </svg>
      </div>

      <div className="about-grid">
        <div className="about-left-col">
          {/* Gwen Stacy Editorial Magazine Title Number */}
          <div className="decor-num">01</div>

          {/* Interactive 3D Tilt Profile Card */}
          <div
            ref={cardRef}
            className="about-profile-card interactive"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`,
              transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.5s ease' : 'none'
            }}
          >
            <div className="profile-card-glow" />
            <div className="profile-image-wrap">
              <img src={heroImage} alt="Nishchal Goyal Profile Card" className="profile-image" />
            </div>
            <div className="profile-card-details">
              <span className="profile-tag">ECE CO-FOUNDER</span>
              <h4 className="profile-name">NISHCHAL GOYAL</h4>
              <span className="profile-role">Jaipur, IN</span>
            </div>
          </div>
        </div>

        <div className="about-right-col">
          <div className="section-label">01 / LORE</div>
          <h2 className="section-headline">Final-year ECE student who actually ships.</h2>
          <div className="section-body-text" ref={textRef}>
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
      </div>
    </section>
  );
}
