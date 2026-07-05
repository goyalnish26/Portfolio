import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    // ScrollTrigger timeline for center progress line growth
    const line = lineRef.current;
    if (line) {
      gsap.fromTo(line,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: '.experience-timeline',
            start: 'top 40%',
            end: 'bottom 60%',
            scrub: true,
          }
        }
      );
    }

    // Toggle viewport center focus class on milestones to scale/sharpen
    const items = containerRef.current?.querySelectorAll('.timeline-item');
    if (items && items.length) {
      items.forEach((item) => {
        gsap.to(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 55%',
            end: 'bottom 45%',
            toggleClass: 'timeline-focused',
            onEnter: () => item.classList.add('timeline-focused'),
            onLeave: () => item.classList.remove('timeline-focused'),
            onEnterBack: () => item.classList.add('timeline-focused'),
            onLeaveBack: () => item.classList.remove('timeline-focused'),
          }
        });
      });
    }
  }, []);

  return (
    <section ref={containerRef} id="experience" className="dev-section bg-deep-section">
      <div className="dev-section-inner">
        <div className="section-label">04 / EXPERIENCE</div>
        <h2 className="section-headline">Where I&apos;ve worked</h2>

        <div className="experience-timeline">
          {/* Vertical progress growth line */}
          <div className="timeline-line" ref={lineRef} style={{ transformScale: 'scaleY(0)' }} />

          <div className="timeline-item">
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
          </div>

          <div className="timeline-item">
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
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h3 className="timeline-title">Volunteer — Local Member</h3>
                <span className="timeline-date">2023</span>
              </div>
              <h4 className="timeline-org">AIESEC in Jaipur</h4>
              <p className="timeline-desc">
                Led initiatives for youth leadership development, cross-cultural project coordination,
                and international youth exchange event management.
              </p>
            </div>
          </div>
        </div>

        {/* Certifications Sub-grid */}
        <div className="certs-section">
          <h3 className="certs-headline">Professional Certifications</h3>
          <div className="certs-grid">
            <div className="cert-card cert-card-featured interactive">
              <div className="cert-verified cert-verified-red">[VERIFIED] ✓</div>
              <h4 className="cert-title-playfair">Google Cybersecurity Certificate</h4>
              <div className="cert-meta">Google / Coursera · August 2025</div>
              <div className="cert-cred">Credential ID: LGYP4646QM36</div>
            </div>

            <div className="cert-card cert-card-featured interactive">
              <div className="cert-verified cert-verified-red">[VERIFIED] ✓</div>
              <h4 className="cert-title-playfair">Deloitte Australia — Cyber Job Simulation</h4>
              <div className="cert-meta">Forage · October 2025</div>
              <div className="cert-cred">Credential ID: 2LN74jKozspnmt3kh</div>
              <div className="cert-desc-small">Threat analysis · Incident response · Security assessment</div>
            </div>

            <div className="cert-card interactive">
              <div className="cert-verified cert-verified-gold">[VERIFIED] ✓</div>
              <h4 className="cert-title-playfair">J.P. Morgan Chase — Software Engineering</h4>
              <div className="cert-meta">Forage · October 2025</div>
              <div className="cert-cred">Credential ID: BvwC2Ge8oKbGSzgfr</div>
              <div className="cert-desc-small">Project Setup · Kafka · H2 · REST API · Controllers</div>
            </div>

            <div className="cert-card interactive">
              <div className="cert-verified cert-verified-gold">[VERIFIED] ✓</div>
              <h4 className="cert-title-playfair">PLC Programming &amp; Applications</h4>
              <div className="cert-meta">CSIR-CEERI · November 2024</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
