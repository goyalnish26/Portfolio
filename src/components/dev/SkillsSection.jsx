export default function SkillsSection() {
  return (
    <section id="skills" className="dev-section bg-deep-section">
      <div className="dev-section-inner">
        <div className="skills-container">
          <div className="skills-header">
            <span className="section-label">02 / SKILLS</span>
            <h2 className="section-headline">What I work with</h2>
          </div>
          
          <div className="skills-content">
            {/* DEV SIDE */}
            <div className="skills-dev">
              <h3>Development</h3>
              
              {/* TIER 1: PRODUCTION-READY */}
              <div className="skill-tier">
                <span className="tier-label">Production-Ready</span>
                <div className="skill-pills">
                  <span className="pill">Python</span>
                  <span className="pill">FastAPI</span>
                  <span className="pill">REST APIs</span>
                  <span className="pill">PostgreSQL</span>
                  <span className="pill">Git</span>
                </div>
                <p className="tier-description">
                  Built production systems at Dreamsoft4u. Odoo 15 REST API module, 
                  HTTP controllers, ORM queries, JSON pipelines. Real internship work.
                </p>
              </div>
              
              {/* TIER 2: COMPETENT */}
              <div className="skill-tier">
                <span className="tier-label">Competent</span>
                <div className="skill-pills">
                  <span className="pill">Flask</span>
                  <span className="pill">Odoo 15 ERP</span>
                  <span className="pill">Docker</span>
                  <span className="pill">Linux/Ubuntu</span>
                  <span className="pill">SQLite</span>
                </div>
                <p className="tier-description">
                  Used in projects and internships. Can build, deploy, and debug. 
                  Not day-to-day but confident when needed.
                </p>
              </div>
              
              {/* TIER 3: FAMILIAR */}
              <div className="skill-tier">
                <span className="tier-label">Familiar</span>
                <div className="skill-pills">
                  <span className="pill">JavaScript</span>
                  <span className="pill">React</span>
                  <span className="pill">HTML/CSS</span>
                </div>
                <p className="tier-description">
                  Building frontend. Good foundation, expanding capability. 
                  WriteBlog project and portfolio itself show working knowledge.
                </p>
              </div>
            </div>
            
            {/* CYBER SIDE */}
            <div className="skills-cyber">
              <h3>Cybersecurity</h3>
              
              {/* TIER 1: HANDS-ON */}
              <div className="skill-tier">
                <span className="tier-label">Hands-On</span>
                <div className="skill-items">
                  <div className="skill-item">
                    <span className="skill-name">Log Monitoring & Detection</span>
                    <span className="skill-note">Built AegisGuard — real-time SIEM monitoring SSH brute-force, SQL injection patterns</span>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">CVE Research & Tracking</span>
                    <span className="skill-note">IntelScope-Pulse dashboard — NVD API, severity analysis, threat intelligence</span>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">Linux Security Fundamentals</span>
                    <span className="skill-note">OverTheWire Bandit Level 12+ — file permissions, privilege escalation, bash scripting</span>
                  </div>
                </div>
              </div>
              
              {/* TIER 2: LEARNING ACTIVELY */}
              <div className="skill-tier">
                <span className="tier-label">Learning (Active)</span>
                <div className="skill-items">
                  <div className="skill-item">
                    <span className="skill-name">Web Application Security</span>
                    <span className="skill-note">TryHackMe CS101 — OWASP Top 10, SQLi, XSS, authentication bypasses</span>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">Network Analysis</span>
                    <span className="skill-note">Concepts: TCP/IP, routing, traffic analysis. Lab environment practice.</span>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">Pentesting Methodology</span>
                    <span className="skill-note">Reconnaissance, enumeration, exploitation patterns. Early stage, building foundation.</span>
                  </div>
                </div>
              </div>
              
              {/* TIER 3: PATHWAY */}
              <div className="skill-tier">
                <span className="tier-label">Certification Roadmap</span>
                <div className="skill-items">
                  <div className="skill-item">
                    <span className="skill-name">Google Cybersecurity Certificate</span>
                    <span className="skill-note">✓ Completed August 2025 — ID: LGYP4646QM36</span>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">eJPT → OSCP Pathway</span>
                    <span className="skill-note">Next: Junior Penetration Tester (eJPT), then build toward OSCP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
