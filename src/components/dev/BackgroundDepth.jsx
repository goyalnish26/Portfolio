import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function BackgroundDepth() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Parallax scrolling layer refs
  const layerGridRef = useRef(null);
  const layerGlowRef = useRef(null);

  useEffect(() => {
    // Parallax animation for grid and glow layers on scroll
    const gridEl = layerGridRef.current;
    const glowEl = layerGlowRef.current;

    if (gridEl && glowEl) {
      gsap.to(gridEl, {
        y: '-10vh',
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        }
      });

      gsap.to(glowEl, {
        y: '-18vh',
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
        }
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates tracker
    const mouse = { x: null, y: null, radius: 150 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Dynamic color resolution based on active theme variables
    const getThemeColor = () => {
      const el = document.querySelector('.hacker-portfolio-wrapper') || document.querySelector('.root-wrapper-theme');
      if (el) {
        const primary = getComputedStyle(el).getPropertyValue('--hacker-accent') || getComputedStyle(el).getPropertyValue('--accent');
        return primary.trim() || '#E9C46A';
      }
      return '#E9C46A';
    };

    // Helper to check if theme is light or dark
    const isLightTheme = () => {
      const isDev = document.querySelector('.dev-mode-active') !== null;
      if (isDev) {
        return document.querySelector('.night-mode') === null;
      }
      return document.querySelector('.theme-light') !== null;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce back from boundaries
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
      }

      draw(color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particle pool based on screen size
    const particleCount = Math.min(60, Math.floor((width * height) / 25000));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const themeColor = getThemeColor();
      const lightTheme = isLightTheme();

      // Slow particle update & connection drawing loop
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(themeColor);

        // Calculate proximity connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            // Adjust line opacity dynamically
            const alpha = (1 - dist / 110) * (lightTheme ? 0.08 : 0.15);
            ctx.strokeStyle = themeColor;
            ctx.lineWidth = 0.5;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }

        // Draw connections to cursor
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * (lightTheme ? 0.15 : 0.25);
            ctx.strokeStyle = themeColor;
            ctx.lineWidth = 0.8;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-depth-container" aria-hidden="true">
      {/* Layer 1: Glowing soft blur background blobs */}
      <div ref={layerGlowRef} className="parallax-layer bg-layer-glow">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
      </div>

      {/* Layer 2: Subtle SVG grid pattern */}
      <div ref={layerGridRef} className="parallax-layer bg-layer-grid">
        <svg width="100%" height="100%" className="grid-mesh-svg">
          <defs>
            <pattern id="gridPattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" className="grid-pattern-path" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />
        </svg>
      </div>

      {/* Layer 3: Particle connection network */}
      <canvas ref={canvasRef} className="bg-depth-canvas" />

      {/* Layer 4: Static editorial grain noise */}
      <div className="bg-layer-noise" />
    </div>
  );
}
