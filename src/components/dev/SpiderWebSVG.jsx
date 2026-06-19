export default function SpiderWebSVG() {
  return (
    <svg className="spider-web-element" viewBox="0 0 100 100">
      <circle cx="100" cy="0" r="20" />
      <circle cx="100" cy="0" r="40" />
      <circle cx="100" cy="0" r="60" />
      <circle cx="100" cy="0" r="80" />
      <circle cx="100" cy="0" r="100" />
      <line x1="100" y1="0" x2="0" y2="0" />
      <line x1="100" y1="0" x2="0" y2="100" />
      <line x1="100" y1="0" x2="50" y2="100" />
      <line x1="100" y1="0" x2="100" y2="100" />
      <line x1="100" y1="0" x2="0" y2="50" />
    </svg>
  );
}
