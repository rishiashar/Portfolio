"use client"

type Props = {
  className?: string
}

/**
 * Theme toggle glyph. The visible icon reflects the *action* the click will
 * perform — moon in light mode (click → go dark), sun in dark mode (click →
 * go light). Two SVGs are stacked and crossfade with a coordinated
 * scale + rotate, driven entirely by `html[data-theme-mode]`. No JS state.
 *
 * Animation grammar:
 *  - Outgoing icon shrinks + rotates "out" while fading.
 *  - Incoming icon enters from the mirrored rotation, scaling up to 1.
 *  - Opacity finishes slightly ahead of the transform so the swap reads as
 *    crisp without the silhouettes muddying each other mid-flight.
 */
export function ThemeToggleIcon({ className }: Props) {
  const stackClass = ["theme-toggle-icon-stack", className]
    .filter(Boolean)
    .join(" ")

  return (
    <span className={stackClass} aria-hidden="true">
      {/* Sun — visible in dark mode (click → light) */}
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="theme-icon theme-icon--sun"
      >
        <circle cx="12" cy="12" r="4" />
        <g className="theme-icon__rays">
          <line x1="12" y1="2.4" x2="12" y2="4.6" />
          <line x1="12" y1="19.4" x2="12" y2="21.6" />
          <line x1="2.4" y1="12" x2="4.6" y2="12" />
          <line x1="19.4" y1="12" x2="21.6" y2="12" />
          <line x1="5.05" y1="5.05" x2="6.62" y2="6.62" />
          <line x1="17.38" y1="17.38" x2="18.95" y2="18.95" />
          <line x1="5.05" y1="18.95" x2="6.62" y2="17.38" />
          <line x1="17.38" y1="6.62" x2="18.95" y2="5.05" />
        </g>
      </svg>

      {/* Moon — visible in light mode (click → dark) */}
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="theme-icon theme-icon--moon"
      >
        <path d="M20.5 14.05A8.5 8.5 0 1 1 9.95 3.5a6.6 6.6 0 0 0 10.55 10.55Z" />
      </svg>
    </span>
  )
}
