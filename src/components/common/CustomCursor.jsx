export default function CustomCursor({ cursorDotRef, cursorRingRef, mode, isTouchDevice, spiderSenseNear }) {
  if (isTouchDevice) return null;

  return (
    <>
      <div ref={cursorDotRef} className={`cursor-dot ${mode}`} />
      <div ref={cursorRingRef} className={`cursor-ring ${mode}`}>
        {mode === 'dev' && spiderSenseNear && (
          <div className="spider-sense-bolts">
            <svg viewBox="0 0 100 100" className="spider-sense-svg">
              <path d="M 28,48 C 22,46 18,52 10,48" className="bolt-path" />
              <path d="M 34,34 C 28,28 26,34 18,26" className="bolt-path" />
              <path d="M 50,28 C 47,20 53,16 50,6" className="bolt-path" />
              <path d="M 66,34 C 72,28 74,34 82,26" className="bolt-path" />
              <path d="M 72,48 C 78,46 82,52 90,48" className="bolt-path" />
            </svg>
          </div>
        )}
      </div>
    </>
  );
}
