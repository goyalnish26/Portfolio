export default function GlitchTransition({ transitioning }) {
  if (!transitioning) return null;

  return (
    <div className="glitch-overlay">
      <div className="glitch-white-flash" />
      <div className="glitch-noise" />
      <div className="glitch-strips-container">
        <div className="glitch-strip glitch-strip-1">CANON_BREAK_SHUFFLE</div>
        <div className="glitch-strip glitch-strip-2">SEC_BREACH_DETECTED</div>
        <div className="glitch-strip glitch-strip-3">REALITY_TEAR_M1_M2</div>
        <div className="glitch-strip glitch-strip-4">NISHCHAL_GOYAL_OS</div>
      </div>
      <div className="glitch-text">CANON SHIFT</div>
    </div>
  );
}
