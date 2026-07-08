import { useState, useRef, useCallback } from 'react';

/**
 * use3dTilt — tracks mouse position over an element and returns
 * rotateX / rotateY values for a CSS perspective tilt effect.
 *
 * @param {number} maxTilt - Maximum tilt in degrees (default 10)
 * @returns {{ tilt: {x: number, y: number}, handleMouseMove, handleMouseLeave, elementRef }}
 */
export function use3dTilt(maxTilt = 10) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = elementRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalize mouse position relative to center (-1 to 1)
    const normalX = (e.clientX - centerX) / (rect.width / 2);
    const normalY = (e.clientY - centerY) / (rect.height / 2);

    // Clamp and flip Y axis so moving up tilts top toward viewer
    const rotateY = Math.max(-1, Math.min(1, normalX)) * maxTilt;
    const rotateX = Math.max(-1, Math.min(1, -normalY)) * maxTilt;

    setTilt({ x: rotateX, y: rotateY });
  }, [maxTilt]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return { tilt, handleMouseMove, handleMouseLeave, elementRef };
}
