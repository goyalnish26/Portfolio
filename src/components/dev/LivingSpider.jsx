import { useEffect, useRef, useState } from 'react';
export default function LivingSpider() {
  const [active, setActive] = useState(false);
  const containerRef = useRef(null);
  const spiderRef = useRef(null);
  const threadRef = useRef(null);

  // Position & rotation state
  const posRef = useRef({ x: 0, y: 0 });
  const targetPosRef = useRef({ x: 0, y: 0 });
  const angleRef = useRef(0);
  const lastSpawnPos = useRef('');

  // Proximity & Easter egg trackers
  const mousePos = useRef({ x: 0, y: 0 });
  const followStartTime = useRef(null);
  const isAvoiding = useRef(false);

  useEffect(() => {
    // Check user preference for motion reduction
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Track mouse coordinates globally
    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Random Spawn Interval loop: 45-120 seconds
    const scheduleNextSpawn = () => {
      const delay = Math.floor(Math.random() * (120 - 45 + 1) + 45) * 1000;
      return setTimeout(() => {
        if (!active) {
          spawnSpider();
        }
        spawnTimeout = scheduleNextSpawn();
      }, delay);
    };

    let spawnTimeout = scheduleNextSpawn();

    // Spawns the spider at a random location
    const spawnSpider = () => {
      const spawnPoints = [
        { name: 'top-nav', getPos: () => ({ x: window.innerWidth / 2, y: 80 }) },
        { name: 'top-left', getPos: () => ({ x: 60, y: 120 }) },
        { name: 'top-right', getPos: () => ({ x: window.innerWidth - 60, y: 120 }) },
        { name: 'screen-left', getPos: () => ({ x: 40, y: window.innerHeight / 2 }) },
        { name: 'screen-right', getPos: () => ({ x: window.innerWidth - 40, y: window.innerHeight / 2 }) },
        { name: 'browser-frame', getPos: () => ({ x: window.innerWidth / 3, y: 40 }) }
      ];

      // Exclude last position to avoid repetition
      const validPoints = spawnPoints.filter((pt) => pt.name !== lastSpawnPos.current);
      const chosen = validPoints[Math.floor(Math.random() * validPoints.length)];

      lastSpawnPos.current = chosen.name;
      const initialPos = chosen.getPos();

      posRef.current = { x: initialPos.x, y: -50 }; // start just offscreen for silk entry
      targetPosRef.current = { ...initialPos };
      angleRef.current = 180; // Facing downwards on descent

      setActive(true);
    };

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(spawnTimeout);
    };
  }, [active]);

  // Handles animation and coordinate tracking while the spider is active
  useEffect(() => {
    if (!active) return;

    let rAF;
    let behaviorTimer = 0;
    let state = 'descent'; // 'descent', 'lookAround', 'crawl', 'escape'

    const updateSpider = () => {
      const spider = spiderRef.current;
      const thread = threadRef.current;
      if (!spider || !thread) return;

      const px = posRef.current.x;
      const py = posRef.current.y;
      const tx = targetPosRef.current.x;
      const ty = targetPosRef.current.y;

      const dx = tx - px;
      const dy = ty - py;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // 1. Proximity checks for cursor avoidance
      const mdx = px - mousePos.current.x;
      const mdy = py - mousePos.current.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

      // Handle Easter egg tracking
      if (mdist < 50 && state !== 'escape') {
        if (!followStartTime.current) {
          followStartTime.current = Date.now();
        } else if (Date.now() - followStartTime.current > 3000) {
          // Trigger Easter egg
          state = 'escape';
          console.log('You scared him away.');
          targetPosRef.current = { x: px + (px > window.innerWidth / 2 ? 300 : -300), y: -100 };
        }
      } else if (mdist >= 80) {
        followStartTime.current = null;
      }

      // Avoidance behavior: crawl away gently if cursor is within 80px
      if (mdist < 80 && state !== 'escape' && !isAvoiding.current) {
        isAvoiding.current = true;
        state = 'crawl';
        // Compute direction away from mouse
        const angleAway = Math.atan2(mdy, mdx);
        targetPosRef.current = {
          x: Math.max(20, Math.min(window.innerWidth - 20, px + Math.cos(angleAway) * 40)),
          y: Math.max(20, Math.min(window.innerHeight - 20, py + Math.sin(angleAway) * 40))
        };
      }

      // 2. State Machine updates
      if (state === 'descent') {
        // Drop down on silk thread
        posRef.current.y += (ty - py) * 0.08;
        if (Math.abs(ty - py) < 2) {
          posRef.current.y = ty;
          state = 'lookAround';
          behaviorTimer = Date.now();
        }
      } else if (state === 'lookAround') {
        // Pause and look around
        if (Date.now() - behaviorTimer > 2000) {
          // Crawl to a nearby random spot
          state = 'crawl';
          targetPosRef.current = {
            x: Math.max(30, Math.min(window.innerWidth - 30, px + (Math.random() * 80 - 40))),
            y: Math.max(30, Math.min(window.innerHeight - 30, py + (Math.random() * 80 - 40)))
          };
          isAvoiding.current = false;
        }
      } else if (state === 'crawl' || state === 'escape') {
        const speed = state === 'escape' ? 0.15 : 0.06;
        posRef.current.x += dx * speed;
        posRef.current.y += dy * speed;

        // Update crawl rotation angle smoothly
        if (dist > 5) {
          const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
          let diff = targetAngle - angleRef.current;
          // Normalize angle difference to [-180, 180]
          diff = ((((diff + 180) % 360) + 360) % 360) - 180;
          angleRef.current += diff * 0.15;
        }

        // Arrived at target
        if (dist < 4) {
          posRef.current.x = tx;
          posRef.current.y = ty;

          if (state === 'escape') {
            setActive(false);
            return;
          }

          // Random decision: crawl again, ascend back, or climb offscreen
          const roll = Math.random();
          if (roll < 0.4) {
            state = 'lookAround';
            behaviorTimer = Date.now();
          } else if (roll < 0.7) {
            // Crawl offscreen
            state = 'escape';
            targetPosRef.current = { x: px, y: -60 };
          } else {
            // Crawl to a new spot
            targetPosRef.current = {
              x: Math.max(30, Math.min(window.innerWidth - 30, px + (Math.random() * 100 - 50))),
              y: Math.max(30, Math.min(window.innerHeight - 30, py + (Math.random() * 100 - 50)))
            };
          }
        }
      }

      // 3. Render position, rotation, and silk line coordinates
      spider.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) rotate(${angleRef.current}deg)`;

      // Draw silk line extending from top window frame
      thread.setAttribute('x1', posRef.current.x);
      thread.setAttribute('y1', 0);
      thread.setAttribute('x2', posRef.current.x);
      thread.setAttribute('y2', posRef.current.y);

      rAF = requestAnimationFrame(updateSpider);
    };

    rAF = requestAnimationFrame(updateSpider);

    return () => {
      cancelAnimationFrame(rAF);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div ref={containerRef} className="living-spider-container" aria-hidden="true">
      {/* Silk entry thread */}
      <svg className="spider-thread-svg">
        <line ref={threadRef} x1="0" y1="0" x2="0" y2="0" className="spider-silk-line" />
      </svg>

      {/* Spider body layout with animated crawler legs */}
      <div ref={spiderRef} className="spider-creature interactive">
        <svg viewBox="0 0 100 100" className="spider-svg">
          {/* Left Legs */}
          <path d="M 40,40 C 20,30 10,40 5,60" fill="none" className="spider-leg leg-l1" />
          <path d="M 40,48 C 20,45 10,55 5,75" fill="none" className="spider-leg leg-l2" />
          <path d="M 40,56 C 20,60 12,75 8,90" fill="none" className="spider-leg leg-l3" />
          <path d="M 40,64 C 20,75 15,85 10,100" fill="none" className="spider-leg leg-l4" />

          {/* Right Legs */}
          <path d="M 60,40 C 80,30 90,40 95,60" fill="none" className="spider-leg leg-r1" />
          <path d="M 60,48 C 80,45 90,55 95,75" fill="none" className="spider-leg leg-r2" />
          <path d="M 60,56 C 80,60 88,75 92,90" fill="none" className="spider-leg leg-r3" />
          <path d="M 60,64 C 80,75 85,85 90,100" fill="none" className="spider-leg leg-r4" />

          {/* Spider Head & Body */}
          <circle cx="50" cy="62" r="14" className="spider-body-segment" />
          <ellipse cx="50" cy="42" rx="9" ry="8" className="spider-head-segment" />

          {/* Interactive Spider Eyes */}
          <circle cx="46" cy="38" r="1.5" fill="#FFF" />
          <circle cx="54" cy="38" r="1.5" fill="#FFF" />
        </svg>
      </div>
    </div>
  );
}
