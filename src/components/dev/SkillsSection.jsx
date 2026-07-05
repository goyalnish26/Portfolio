import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { devSkills } from '../../config/portfolioData';
import DevCyberSkill from './DevCyberSkill';

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const containerRef = useRef(null);
  const cardsWrapRef = useRef(null);
  const consoleLogRef = useRef(null);

  // Mock SIEM log feed state
  const [logs, setLogs] = useState([
    { id: 1, type: 'info', text: '[INFO] Initializing AegisGuard Threat Engine...' },
    { id: 2, type: 'success', text: '[OK] Bound network sockets to interfaces' },
    { id: 3, type: 'info', text: '[INFO] Syncing Watchlist database from CVE feed' }
  ]);

  // Handle mock log updates
  useEffect(() => {
    const alerts = [
      { type: 'info', text: '[INFO] Inspecting headers for incoming request' },
      { type: 'success', text: '[OK] Sanitized request parameter "id" cleanly' },
      { type: 'warn', text: '[WARN] Attempted SQL injection blocked: \'" OR 1=1 --\'' },
      { type: 'info', text: '[INFO] Dispatched threat payload to analysis queue' },
      { type: 'danger', text: '[ALERT] Brute force detected on port 22 (SSH)' },
      { type: 'success', text: '[OK] Dynamic blocklist rule deployed for IP 192.168.1.105' }
    ];

    const interval = setInterval(() => {
      const nextAlert = alerts[Math.floor(Math.random() * alerts.length)];
      setLogs((prev) => {
        const updated = [...prev, { id: Date.now(), ...nextAlert }].slice(-6); // Keep last 6 logs
        return updated;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll logs terminal window
  useEffect(() => {
    if (consoleLogRef.current) {
      consoleLogRef.current.scrollTop = consoleLogRef.current.scrollHeight;
    }
  }, [logs]);

  // 3D Card Hover Effect for dev tags
  const handleCardMouseMove = (e, index) => {
    const card = cardsWrapRef.current?.children[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (centerY - y) / 4;
    const rotateY = (x - centerX) / 4;

    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    card.style.boxShadow = `0 15px 35px rgba(233, 196, 106, 0.15)`;
  };

  const handleCardMouseLeave = (index) => {
    const card = cardsWrapRef.current?.children[index];
    if (!card) return;

    card.style.transform = 'none';
    card.style.boxShadow = 'none';
  };

  return (
    <section ref={containerRef} id="skills" className="dev-section bg-deep-section">
      <div className="dev-section-inner">
        <div className="section-label">02 / SKILLS</div>
        <h2 className="section-headline">What I work with</h2>

        <div className="skills-layout">
          {/* Zone A: Development Skills */}
          <div className="skills-zone-a">
            <h3 className="skills-subtitle">Development Competency</h3>
            <div className="skills-tags-wrap" ref={cardsWrapRef}>
              {devSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="skill-tag interactive"
                  style={{
                    fontSize: skill.size,
                    transition: 'transform 0.1s ease, box-shadow 0.3s ease'
                  }}
                  onMouseMove={(e) => handleCardMouseMove(e, idx)}
                  onMouseLeave={() => handleCardMouseLeave(idx)}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* Zone B: Premium Cybersecurity Dashboard (No stereotypical matrix rain) */}
          <div className="skills-zone-b-dark-panel">
            <div className="dark-panel-scanline"></div>
            <h3 className="dark-panel-title">Cybersecurity Core</h3>

            {/* Interactive SVG Network Topology and Packet Flow */}
            <div className="network-topology-container" aria-hidden="true">
              <svg viewBox="0 0 400 180" className="topology-svg">
                {/* Connection lines */}
                <line x1="50" y1="90" x2="160" y2="40" className="topology-line" />
                <line x1="50" y1="90" x2="160" y2="140" className="topology-line" />
                <line x1="160" y1="40" x2="280" y2="90" className="topology-line" />
                <line x1="160" y1="140" x2="280" y2="90" className="topology-line" />
                <line x1="280" y1="90" x2="360" y2="90" className="topology-line security-gate" />

                {/* Secure flowing packet bubbles */}
                <circle r="3" className="packet-bubble bubble-top">
                  <animateMotion
                    path="M 50,90 L 160,40 L 280,90"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle r="3" className="packet-bubble bubble-bottom">
                  <animateMotion
                    path="M 50,90 L 160,140 L 280,90"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Nodes */}
                <g className="topology-node-group">
                  <circle cx="50" cy="90" r="12" className="topology-node gateway" />
                  <text x="50" y="94" textAnchor="middle" className="node-label">GW</text>
                </g>
                <g className="topology-node-group">
                  <circle cx="160" cy="40" r="10" className="topology-node" />
                  <text x="160" y="43" textAnchor="middle" className="node-label">A</text>
                </g>
                <g className="topology-node-group">
                  <circle cx="160" cy="140" r="10" className="topology-node" />
                  <text x="160" y="143" textAnchor="middle" className="node-label">B</text>
                </g>
                <g className="topology-node-group">
                  <circle cx="280" cy="90" r="12" className="topology-node SIEM" />
                  <text x="280" y="94" textAnchor="middle" className="node-label">SIEM</text>
                </g>
                <g className="topology-node-group">
                  <circle cx="360" cy="90" r="8" className="topology-node blocklist" />
                  <text x="360" y="93" textAnchor="middle" className="node-label">FW</text>
                </g>
              </svg>
            </div>

            {/* Live Command & Logs Console */}
            <div className="terminal-logs-window">
              <div className="terminal-logs-header">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
                <span className="window-title">aegisguard@monitor:~</span>
              </div>
              <div className="terminal-logs-feed" ref={consoleLogRef}>
                {logs.map((log) => (
                  <div key={log.id} className={`log-line ${log.type}`}>
                    {log.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Skills Bar Grid */}
            <div className="dark-panel-grid" style={{ marginTop: '2rem' }}>
              <DevCyberSkill name="Network Analysis (Wireshark/NMAP)" percentage={75} />
              <DevCyberSkill name="SIEM log rules development" percentage={65} />
              <DevCyberSkill name="OWASP Top 10 Web Assessment" percentage={55} />
              <DevCyberSkill name="Docker Container Virtualization" percentage={60} />
            </div>

            <div className="dark-panel-pathway">
              Strategic Pathway: OverTheWire (Bandit 12+) → THM Jr Pentester → HackTheBox → eJPT → OSCP
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
