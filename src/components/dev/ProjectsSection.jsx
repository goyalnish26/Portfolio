import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  // AegisGuard attack simulation state
  const [aegisLogs, setAegisLogs] = useState([
    { time: '18:24:01', msg: 'System initialized. Monitoring auth.log...' }
  ]);
  const [aegisStatus, setAegisStatus] = useState('NOMINAL');

  // IntelScope watchlist search state
  const [watchlist, setWatchlist] = useState([
    { cve: 'CVE-2026-3001', score: 9.8, severity: 'CRITICAL', status: 'MONITORED' },
    { cve: 'CVE-2026-1184', score: 7.5, severity: 'HIGH', status: 'PATCHED' },
    { cve: 'CVE-2025-4921', score: 5.3, severity: 'MEDIUM', status: 'MONITORED' }
  ]);
  const [newCve, setNewCve] = useState('');

  // WriteBlog docker terminal state
  const [dockerLogs, setDockerLogs] = useState([
    'Step 1/5 : FROM python:3.9-slim-buster',
    '---> 856fa16b0df4',
    'Step 2/5 : WORKDIR /app',
    '---> Using cache',
    'Step 3/5 : RUN pip3 install -r requirements.txt',
    '---> Installing Flask, SQLAlchemy, Gunicorn...',
    'Step 4/5 : COPY . .',
    'Step 5/5 : CMD ["gunicorn", "-w", "4", "app:app"]',
    'Successfully built writeblog-web-1',
    '[OK] Container started listening on 0.0.0.0:8000'
  ]);

  // Projects stack scroll animation
  useEffect(() => {
    const cards = cardRefs.current;
    if (!cards || !cards.length) return;

    cards.forEach((card, index) => {
      if (!card) return;

      const isLast = index === cards.length - 1;

      if (!isLast) {
        // Pin & shrink card as the next one stacks over it
        gsap.to(card, {
          scale: 0.92,
          yPercent: -10,
          opacity: 0.5,
          ease: 'none',
          scrollTrigger: {
            trigger: cards[index + 1],
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          }
        });
      }
    });
  }, []);

  // Simulates an attack on AegisGuard SIEM sandbox
  const handleAegisAttack = (type) => {
    setAegisStatus('THREAT_DETECTED');
    const time = new Date().toLocaleTimeString();

    if (type === 'ssh') {
      const logsToAppend = [
        { time, msg: '[ATTEMPT] SSH login failure from 198.51.100.12 (user root)' },
        { time, msg: '[ATTEMPT] SSH login failure from 198.51.100.12 (user admin)' },
        { time, msg: '[ATTEMPT] SSH login failure from 198.51.100.12 (user guest)' },
        { time, msg: '[ALERT] Brute force pattern detected (3 attempts / 5s)' },
        { time, msg: '[CRITICAL] AegisGuard deployed ban: Blocked 198.51.100.12' },
        { time, msg: '[DISPATCH] Discord webhook alert dispatched successfully' }
      ];

      setAegisLogs((prev) => [...prev, ...logsToAppend]);
    } else if (type === 'sqli') {
      const logsToAppend = [
        { time, msg: '[REQUEST] GET /api/user?id=1%20OR%201=1' },
        { time, msg: '[ALERT] Regex matched SQL injection: "OR 1=1"' },
        { time, msg: '[HIGH] Sanitized input: Decomposed command vectors' },
        { time, msg: '[SUCCESS] Dispatched intrusion details to SIEM archive' }
      ];
      setAegisLogs((prev) => [...prev, ...logsToAppend]);
    }

    setTimeout(() => {
      setAegisStatus('NOMINAL');
    }, 5000);
  };

  // Adds a CVE search watchdog alert in IntelScope
  const handleAddCve = (e) => {
    e.preventDefault();
    if (!newCve.trim()) return;

    const scores = [6.5, 7.8, 8.2, 9.3, 4.2];
    const score = scores[Math.floor(Math.random() * scores.length)];
    const severity = score >= 9.0 ? 'CRITICAL' : score >= 7.0 ? 'HIGH' : 'MEDIUM';

    setWatchlist((prev) => [
      ...prev,
      { cve: newCve.toUpperCase(), score, severity, status: 'MONITORED' }
    ]);
    setNewCve('');
  };

  // Simulates rebuild logs in WriteBlog
  const handleDockerRebuild = () => {
    setDockerLogs((prev) => [
      ...prev,
      `[REBUILD] Triggered manual rebuild at ${new Date().toLocaleTimeString()}`,
      'Step 1/2 : RUN flask db upgrade',
      '---> Running database seed migrations...',
      '---> Table: posts seeded (12 articles)',
      '---> Table: users seeded (2 roles: admin/guest)',
      '[OK] Server restarted successfully'
    ]);
  };

  return (
    <section ref={containerRef} id="projects" className="dev-section">
      <div className="dev-section-inner">
        <div className="section-label">03 / PROJECTS</div>
        <h2 className="section-headline">Things I&apos;ve built</h2>

        <div className="projects-stacked-deck">
          {/* Project 1: AegisGuard */}
          <div
            ref={(el) => (cardRefs.current[0] = el)}
            className="project-stack-card p-card-aegis"
          >
            <div className="project-card-glass">
              <div className="project-sec-badge">[SEC] 🔴</div>
              <div className="project-grid-main">
                <div className="project-info-side">
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
                    <a
                      href="https://github.com/goyalnish26/AegisGuard"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn interactive"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://goyalnish26.github.io/AegisGuard"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn interactive"
                    >
                      Live Demo
                    </a>
                  </div>
                </div>

                {/* AegisGuard Live Sandbox Simulator */}
                <div className="project-preview-side">
                  <div className="preview-terminal">
                    <div className="preview-terminal-header">
                      <span className="window-title">AegisGuard attack sandbox</span>
                      <span className={`status-badge ${aegisStatus}`}>
                        {aegisStatus}
                      </span>
                    </div>
                    <div className="preview-terminal-body">
                      {aegisLogs.map((log, idx) => (
                        <div key={idx} className="preview-log-row">
                          <span className="log-time">{log.time}</span>
                          <span className={`log-text ${log.msg.includes('ALERT') || log.msg.includes('CRITICAL') ? 'danger' : ''}`}>
                            {log.msg}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="preview-terminal-actions">
                      <button
                        onClick={() => handleAegisAttack('ssh')}
                        className="sandbox-action-btn interactive"
                      >
                        Simulate SSH Brute Force
                      </button>
                      <button
                        onClick={() => handleAegisAttack('sqli')}
                        className="sandbox-action-btn interactive"
                      >
                        Simulate SQL Injection
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project 2: IntelScope-Pulse */}
          <div
            ref={(el) => (cardRefs.current[1] = el)}
            className="project-stack-card p-card-intelscope"
          >
            <div className="project-card-glass">
              <div className="project-sec-badge">[SEC] 🔴</div>
              <div className="project-grid-main">
                <div className="project-info-side">
                  <div className="project-header">
                    <span className="project-category project-category-sec">Threat Intelligence</span>
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
                    <span>CSS Variables</span>
                  </div>
                  <div className="project-links">
                    <a
                      href="https://github.com/goyalnish26/IntelScope-Pulse"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn interactive"
                    >
                      GitHub
                    </a>
                  </div>
                </div>

                {/* IntelScope-Pulse Watchdog Simulator */}
                <div className="project-preview-side">
                  <div className="preview-terminal intel-panel">
                    <div className="preview-terminal-header">
                      <span className="window-title">CVE watchlist monitor</span>
                    </div>
                    <div className="preview-terminal-body">
                      <div className="cve-watchlist-header">
                        <span>CVE ID</span>
                        <span>CVSS v3</span>
                        <span>STATUS</span>
                      </div>
                      <div className="cve-watchlist-feed">
                        {watchlist.map((item, idx) => (
                          <div key={idx} className="cve-item-row">
                            <span className="cve-id">{item.cve}</span>
                            <span className={`cve-score ${item.severity.toLowerCase()}`}>
                              {item.score} ({item.severity})
                            </span>
                            <span className="cve-status">{item.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <form onSubmit={handleAddCve} className="preview-terminal-actions flex-actions">
                      <input
                        type="text"
                        placeholder="e.g. CVE-2026-5830"
                        value={newCve}
                        onChange={(e) => setNewCve(e.target.value)}
                        className="sandbox-input interactive"
                      />
                      <button type="submit" className="sandbox-action-btn interactive">
                        Add CVE Alert
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project 3: WriteBlog */}
          <div
            ref={(el) => (cardRefs.current[2] = el)}
            className="project-stack-card p-card-writeblog"
          >
            <div className="project-card-glass">
              <div className="project-grid-main">
                <div className="project-info-side">
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
                    <span>Docker</span>
                    <span>Bootstrap 5</span>
                  </div>
                  <div className="project-links">
                    <a
                      href="https://github.com/goyalnish26/writeblog"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn interactive"
                    >
                      GitHub
                    </a>
                  </div>
                </div>

                {/* WriteBlog Docker Console Simulator */}
                <div className="project-preview-side">
                  <div className="preview-terminal docker-panel">
                    <div className="preview-terminal-header">
                      <span className="window-title">docker logs writeblog-web-1</span>
                    </div>
                    <div className="preview-terminal-body code-body">
                      {dockerLogs.map((log, idx) => (
                        <div key={idx} className="docker-log-row">
                          {log}
                        </div>
                      ))}
                    </div>
                    <div className="preview-terminal-actions">
                      <button
                        onClick={handleDockerRebuild}
                        className="sandbox-action-btn interactive"
                      >
                        Rebuild Container Sandbox
                      </button>
                    </div>
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
