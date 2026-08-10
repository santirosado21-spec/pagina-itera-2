// Horizon Glow gradient adapted for Itera's brand blue.
// Zero dependencies. Fill a positioned parent and keep it behind readable content.
export function GradientBackground({ className = '' }) {
  return (
    <div aria-hidden="true" className={`horizon-glow ${className}`}>
      <div className="horizon-glow__color" />
      <svg className="horizon-glow__grain" focusable="false">
        <filter id="itera-horizon-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#itera-horizon-grain)" />
      </svg>
    </div>
  )
}
