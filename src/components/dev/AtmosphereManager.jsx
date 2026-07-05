import { useEffect, useRef, useState } from 'react';
export default function AtmosphereManager() {
  const [timeClass, setTimeClass] = useState('time-afternoon');
  const [isIdle, setIsIdle] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [lightningActive, setLightningActive] = useState(false);
  const [rainDroplets, setRainDroplets] = useState([]);
  const [shootingStar, setShootingStar] = useState(null); // null or { x, y }

  const idleTimer = useRef(null);
  const lightningInterval = useRef(null);
  const starInterval = useRef(null);
  const rainInterval = useRef(null);
  const promptShownThisCycle = useRef(false);

  // Time-of-day detector
  useEffect(() => {
    const updateTimeClass = () => {
      const hours = new Date().getHours();
      if (hours >= 6 && hours < 12) {
        setTimeClass('time-morning');
      } else if (hours >= 12 && hours < 17) {
        setTimeClass('time-afternoon');
      } else if (hours >= 17 && hours < 21) {
        setTimeClass('time-evening');
      } else {
        setTimeClass('time-night');
      }
    };

    updateTimeClass();
    const interval = setInterval(updateTimeClass, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  // Sync class name to root-wrapper element
  useEffect(() => {
    const wrapper = document.querySelector('.dev-portfolio');
    if (wrapper) {
      // Remove all time classes first
      wrapper.classList.remove('time-morning', 'time-afternoon', 'time-evening', 'time-night');
      wrapper.classList.add(timeClass);
    }
  }, [timeClass]);

  // Activity tracking and idle state manager
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resetIdleTimer = () => {
      if (isIdle) {
        setIsIdle(false);
        setRainDroplets([]);
        promptShownThisCycle.current = false;
        setShowPrompt(false);
      }

      if (idleTimer.current) clearTimeout(idleTimer.current);

      idleTimer.current = setTimeout(() => {
        setIsIdle(true);
        if (!prefersReducedMotion && !promptShownThisCycle.current) {
          setShowPrompt(true);
          promptShownThisCycle.current = true;
          // Hide alert prompt after 5 seconds
          setTimeout(() => setShowPrompt(false), 5000);
        }
      }, 120000); // 120 seconds of inactivity
    };

    // Listeners for user activity
    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('keydown', resetIdleTimer);
    window.addEventListener('scroll', resetIdleTimer);
    window.addEventListener('click', resetIdleTimer);

    resetIdleTimer();

    return () => {
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keydown', resetIdleTimer);
      window.removeEventListener('scroll', resetIdleTimer);
      window.removeEventListener('click', resetIdleTimer);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [isIdle]);

  // Sync idle class name to wrapper element
  useEffect(() => {
    const wrapper = document.querySelector('.dev-portfolio');
    if (wrapper) {
      if (isIdle) {
        wrapper.classList.add('atmosphere-idle');
      } else {
        wrapper.classList.remove('atmosphere-idle');
      }
    }
  }, [isIdle]);

  // Lightning, Shooting Stars, and Rain Events loops (Active only in Night + Idle)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const isNight = timeClass === 'time-night';

    // 1. Silent Lightning Flash loop
    if (isIdle) {
      const triggerLightning = () => {
        setLightningActive(true);
        setTimeout(() => setLightningActive(false), 300);

        // Schedule next flash: every 60s - 180s randomly
        const nextDelay = Math.random() * (180 - 60) + 60;
        lightningInterval.current = setTimeout(triggerLightning, nextDelay * 1000);
      };

      lightningInterval.current = setTimeout(triggerLightning, 30000); // start after 30s idle
    }

    // 2. Shooting Star Event (Night + Idle only, extremely rare)
    if (isIdle && isNight) {
      const triggerShootingStar = () => {
        setShootingStar({
          x: Math.random() * (window.innerWidth - 300) + 50,
          y: Math.random() * 200 + 50
        });

        setTimeout(() => setShootingStar(null), 1000);

        const nextDelay = Math.random() * (300 - 120) + 120; // 2-5 minutes
        starInterval.current = setTimeout(triggerShootingStar, nextDelay * 1000);
      };

      starInterval.current = setTimeout(triggerShootingStar, 15000); // start after 15s idle
    }

    // 3. Rare Rain Droplets Condensation (Night + Idle only, starts after 30s idle)
    if (isIdle && isNight) {
      const triggerRain = () => {
        // Add random droplets periodically
        rainInterval.current = setInterval(() => {
          setRainDroplets((prev) => {
            if (prev.length > 25) return prev; // Limit max droplets
            const newDrop = {
              id: Math.random(),
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              size: Math.random() * 3 + 1,
              opacity: Math.random() * 0.4 + 0.1
            };
            return [...prev, newDrop];
          });
        }, 15000);
      };

      setTimeout(triggerRain, 30000);
    }

    return () => {
      clearTimeout(lightningInterval.current);
      clearTimeout(starInterval.current);
      clearInterval(rainInterval.current);
    };
  }, [isIdle, timeClass]);

  // Global cursor coordination (Glass reflections + lights)
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      const xPercent = (e.clientX / window.innerWidth) * 100;
      const yPercent = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
      document.documentElement.style.setProperty('--reflection-x', `${xPercent}%`);
      document.documentElement.style.setProperty('--reflection-y', `${yPercent}%`);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  return (
    <div className="atmosphere-container" aria-hidden="true">
      {/* Distant Lightning Flash Overlay */}
      {lightningActive && <div className="lightning-flash-overlay" />}

      {/* Rare Shooting Star Event */}
      {shootingStar && (
        <div
          className="shooting-star"
          style={{
            left: `${shootingStar.x}px`,
            top: `${shootingStar.y}px`
          }}
        />
      )}

      {/* Rain Droplets Overlay */}
      {rainDroplets.length > 0 && (
        <div className="rain-droplets-pane">
          {rainDroplets.map((drop) => (
            <div
              key={drop.id}
              className="rain-drop"
              style={{
                left: `${drop.x}px`,
                top: `${drop.y}px`,
                width: `${drop.size}px`,
                height: `${drop.size * 2}px`,
                opacity: drop.opacity
              }}
            />
          ))}
        </div>
      )}

      {/* Bottom Right Corner Message alert prompt */}
      {showPrompt && (
        <div className="atmosphere-prompt">
          It gets interesting after dark.
        </div>
      )}
    </div>
  );
}
