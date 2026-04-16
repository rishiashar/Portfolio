export function DecorativeLines() {
  // Elegant flowing thin lines — editorial accent, ARCUS-inspired.
  // Multiple bezier curves at varying opacities creating depth and movement.
  return (
    <svg
      viewBox="0 0 560 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      {/* Primary flowing lines — confident, sweeping curves */}
      <path
        d="M0 200 C80 180, 140 60, 240 80 S400 160, 560 100"
        className="svg-draw stroke-foreground/[0.08]"
        strokeWidth="1"
        strokeLinecap="round"
        style={{ animationDelay: "200ms", animationDuration: "2s" }}
      />
      <path
        d="M0 160 C100 120, 180 40, 300 60 S460 120, 560 60"
        className="svg-draw stroke-foreground/[0.06]"
        strokeWidth="0.75"
        strokeLinecap="round"
        style={{ animationDelay: "400ms", animationDuration: "2.2s" }}
      />
      <path
        d="M0 240 C120 200, 200 100, 320 120 S480 180, 560 140"
        className="svg-draw stroke-foreground/[0.05]"
        strokeWidth="0.75"
        strokeLinecap="round"
        style={{ animationDelay: "300ms", animationDuration: "1.8s" }}
      />

      {/* Fine texture lines — add depth */}
      <path
        d="M0 120 C60 100, 120 30, 200 50 S340 100, 460 40 S520 20, 560 30"
        className="svg-draw stroke-foreground/[0.04]"
        strokeWidth="0.5"
        strokeLinecap="round"
        style={{ animationDelay: "600ms", animationDuration: "2.4s" }}
      />
      <path
        d="M0 260 C140 220, 220 140, 360 160 S500 200, 560 180"
        className="svg-draw stroke-foreground/[0.04]"
        strokeWidth="0.5"
        strokeLinecap="round"
        style={{ animationDelay: "500ms", animationDuration: "2s" }}
      />

      {/* Gradient accent line */}
      <defs>
        <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#42a5f5" stopOpacity="0.3" />
          <stop offset="30%" stopColor="#e040fb" stopOpacity="0.2" />
          <stop offset="60%" stopColor="#ff9100" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#69f0ae" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path
        d="M0 180 C100 140, 180 50, 280 70 S440 140, 560 80"
        className="svg-draw"
        stroke="url(#line-grad)"
        strokeWidth="1"
        strokeLinecap="round"
        style={{ animationDelay: "700ms", animationDuration: "2.6s" }}
      />

      {/* Small accent dots at intersections */}
      <circle
        cx="240"
        cy="80"
        r="2"
        className="svg-node fill-foreground/[0.06]"
        style={{ animationDelay: "1800ms" }}
      />
      <circle
        cx="320"
        cy="120"
        r="1.5"
        className="svg-node fill-foreground/[0.05]"
        style={{ animationDelay: "2000ms" }}
      />
      <circle
        cx="280"
        cy="70"
        r="2.5"
        className="svg-node"
        fill="url(#line-grad)"
        fillOpacity="0.3"
        style={{ animationDelay: "2200ms" }}
      />
    </svg>
  )
}
