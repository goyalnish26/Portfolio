export default function CustomCursor({ cursorDotRef, cursorRingRef, mode, isTouchDevice }) {
  if (isTouchDevice) return null;

  return (
    <>
      <div ref={cursorDotRef} className={`cursor-dot ${mode}`} />
      <div ref={cursorRingRef} className={`cursor-ring ${mode}`} />
    </>
  );
}
