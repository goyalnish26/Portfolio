export default function EntryScreen({ entryExpandingSide, entryTransition }) {
  return (
    <div className={`entry-container ${entryExpandingSide ? 'entry-expanding' : ''}`}>
      <div
        className={`entry-side dev-side ${entryExpandingSide === 'dev' ? 'entry-side-chosen' : ''} ${entryExpandingSide === 'hacker' ? 'entry-side-dismissed' : ''}`}
        onClick={() => entryTransition('dev')}
      >
        <div className="entry-side-content">
          <div className="side-label">MODE 01</div>
          <div className="side-title">THE DEVELOPER</div>
          <div className="side-desc">
            Maximalist magazine aesthetic. Asymmetric grids. High-end typography.
            Focused on shipping backend REST APIs, DB schemes, and robust code.
          </div>
          <button className="entry-btn dev-btn">[ D ] SELECT</button>
        </div>
      </div>
      <div className={`entry-split-line ${entryExpandingSide ? 'entry-split-hidden' : ''}`}></div>
      <div
        className={`entry-side hacker-side ${entryExpandingSide === 'hacker' ? 'entry-side-chosen' : ''} ${entryExpandingSide === 'dev' ? 'entry-side-dismissed' : ''}`}
        onClick={() => entryTransition('hacker')}
      >
        <div className="entry-side-content">
          <div className="side-label">MODE 02</div>
          <div className="side-title">SECURITY RESEARCHER</div>
          <div className="side-desc">
            Kernel terminal session. Monospace phosphor. Intrusive threat logs.
            Focused on ethical hacking, CVE research, and building SIEM modules.
          </div>
          <button className="entry-btn hacker-btn">[ H ] SELECT</button>
        </div>
      </div>
      <div className={`entry-center-box ${entryExpandingSide ? 'entry-center-hidden' : ''}`}>
        <div className="entry-question">Who are you looking for?</div>
        <div className="entry-subtext">"I am both. Always have been."</div>
      </div>
    </div>
  );
}
