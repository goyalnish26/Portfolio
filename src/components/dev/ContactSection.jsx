export default function ContactSection({ devPostCreditsSentinelRef, devPostCreditsState }) {
  return (
    <div className="dev-ending-wrapper bg-dark-immersive">
      {/* Immersive radial glows */}
      <div className="ending-radial-glow" aria-hidden="true">
        <div className="radial-orb ending-orb-1"></div>
        <div className="radial-orb ending-orb-2"></div>
      </div>

      <section id="contact" className="dev-contact-section">
        <div className="contact-box-glass interactive">
          <h2 className="contact-headline">Let&apos;s work together.</h2>
          <p className="contact-subtext">
            Open to backend roles, cybersecurity internships, SOC positions, and freelance.
            Remote or Jaipur-based.
          </p>

          <div className="contact-buttons-group">
            <a href="mailto:goyalnishchal71@gmail.com" className="contact-btn email-btn interactive">
              Send Email
            </a>
            <a
              href="https://linkedin.com/in/nishchal-goyal-6409a5289"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn secondary-btn interactive"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/goyalnish26"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn secondary-btn interactive"
            >
              GitHub
            </a>
          </div>

          <div className="contact-vuln-note">
            Or find a vulnerability in this site. I&apos;ll be impressed.
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="dev-footer">
        <div className="footer-content">
          <div>nishchal goyal · jaipur · 2026</div>
          <div className="footer-quote">
            &quot;Everyone keeps telling me how my story is supposed to go.
            <br />
            Nah… I&apos;m-a do my own thing.&quot; — Miles Morales
          </div>
        </div>
      </footer>

      {/* Post-credits sentinel — hidden below footer */}
      <div ref={devPostCreditsSentinelRef} style={{ height: '1px', width: '100%' }} />

      {/* Dev Mode Post-Credits Timeline */}
      {devPostCreditsState !== null && (
        <div className="dev-post-credits-timeline">
          {devPostCreditsState === 'wait' && <span>wait</span>}
          {devPostCreditsState === 'rejected' && <span>Canon rejected</span>}
          {devPostCreditsState === 'loading' && <span>Story still loading</span>}
          {devPostCreditsState === 'cursor' && <span className="blinking-cursor">_</span>}
        </div>
      )}
    </div>
  );
}
