'use client';

import { useEffect, useRef, type CSSProperties } from 'react';

export interface AetherRibbonMeshProps {
  className?: string;
}

const ribbons = [
  'M-120 210 C 80 80, 250 330, 470 190 S 820 40, 1080 220 S 1370 350, 1580 160',
  'M-120 250 C 90 120, 270 350, 500 220 S 850 70, 1110 250 S 1380 380, 1580 205',
  'M-120 290 C 110 170, 300 380, 530 250 S 880 110, 1140 280 S 1410 400, 1580 245',
  'M-120 330 C 130 220, 330 405, 560 285 S 910 150, 1170 310 S 1440 420, 1580 285',
  'M-120 370 C 150 265, 360 430, 590 320 S 940 195, 1200 340 S 1470 440, 1580 325',
  'M-120 410 C 170 310, 390 455, 620 355 S 970 240, 1230 370 S 1500 460, 1580 365',
];

export default function AetherRibbonMesh({ className = '' }: AetherRibbonMeshProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      root.toggleAttribute('data-active', entry.isIntersecting);
    }, { rootMargin: '80px' });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className={`aether-ribbon-mesh relative h-full w-full overflow-hidden bg-white ${className}`} aria-hidden="true">
      <svg className="aether-ribbon-svg" viewBox="0 0 1440 620" preserveAspectRatio="xMidYMid slice" focusable="false">
        <defs>
          <linearGradient id="aether-ribbon-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2563eb" stopOpacity="0" />
            <stop offset=".22" stopColor="#2563eb" stopOpacity=".22" />
            <stop offset=".5" stopColor="#1d4ed8" stopOpacity=".82" />
            <stop offset=".78" stopColor="#4f46e5" stopOpacity=".22" />
            <stop offset="1" stopColor="#6d28d9" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="aether-ribbon-layer">
          {ribbons.map((path, index) => (
            <path
              className="aether-ribbon-path"
              key={path}
              d={path}
              pathLength="1"
              style={{
                '--ribbon-width': `${1 + index * 0.12}px`,
                '--ribbon-opacity': 0.88 - index * 0.1,
                '--ribbon-duration': `${5.2 + index * 0.55}s`,
                '--ribbon-mobile-duration': `${((5.2 + index * 0.55) * 1.12).toFixed(2)}s`,
                '--ribbon-delay': `${index * -0.8}s`,
                '--ribbon-start-shift': `${(index % 2 === 0 ? 18 + index * 2 : -18 - index * 2) * -0.45}px`,
                '--ribbon-shift': `${index % 2 === 0 ? 18 + index * 2 : -18 - index * 2}px`,
              } as CSSProperties}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
