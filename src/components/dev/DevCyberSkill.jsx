import { useState, useEffect, useRef } from 'react';

export default function DevCyberSkill({ name, percentage }) {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRevealed(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ marginBottom: '18px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontFamily: '"DM Sans", sans-serif', fontSize: '0.95rem' }}>
        <span style={{ color: '#FAFAFA' }}>{name}</span>
        <span style={{ color: '#E9C46A', fontFamily: '"DM Mono", monospace' }}>{percentage}%</span>
      </div>
      <div style={{ height: '2.5px', background: '#222', width: '100%', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          background: '#E9C46A',
          width: revealed ? `${percentage}%` : '0%',
          transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }} />
      </div>
    </div>
  );
}
