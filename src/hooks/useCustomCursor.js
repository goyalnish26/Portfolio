import { useEffect, useRef, useState } from 'react';

export function useCustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  // Lazy state initialization to avoid synchronous state setter inside useEffect
  const [isTouchDevice] = useState(() => {
    return typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  });

  useEffect(() => {
    if (isTouchDevice) return;

    // Track mouse coordinates
    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${e.clientX}px`;
        cursorDotRef.current.style.top = `${e.clientY}px`;
      }
    };

    // Track clickables hover state to scale cursor ring
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, select, input, textarea, [role="button"], .interactive');
      if (target) {
        cursorRingRef.current?.classList.add('cursor-hover');
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, select, input, textarea, [role="button"], .interactive');
      if (target) {
        cursorRingRef.current?.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    // Lerping loop for the cursor ring
    let rAF;
    const updateRing = () => {
      const lerpFactor = 0.12;

      // Calculate next lerped step
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = `${ringPos.current.x}px`;
        cursorRingRef.current.style.top = `${ringPos.current.y}px`;
      }
      rAF = requestAnimationFrame(updateRing);
    };

    rAF = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(rAF);
    };
  }, [isTouchDevice]);

  return { cursorDotRef, cursorRingRef, isTouchDevice };
}
