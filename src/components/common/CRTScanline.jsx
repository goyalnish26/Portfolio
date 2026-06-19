export default function CRTScanline({ active }) {
  if (!active) return null;
  return <div className="crt-scanline" />;
}
