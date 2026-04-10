export function AIFlow() {
  // Abstract generative flow field — organic bezier curves suggesting
  // intelligence and process without being a literal neural network.
  // Varying stroke weights, staggered draw-in, some paths carry the
  // Apple gradient as a subtle accent.
  return (
    <svg
      viewBox="0 0 480 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        {/* Apple spectrum for accent strokes */}
        <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#42a5f5" />
          <stop offset="25%" stopColor="#e040fb" />
          <stop offset="50%" stopColor="#ff5252" />
          <stop offset="75%" stopColor="#ff9100" />
          <stop offset="100%" stopColor="#69f0ae" />
        </linearGradient>
      </defs>

      {/* Primary flow lines — thick, confident curves */}
      <path
        d="M40 380 C120 340, 160 200, 240 180 S380 220, 440 100"
        className="svg-draw stroke-foreground/[0.07]"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ animationDelay: "100ms", animationDuration: "1.8s" }}
      />
      <path
        d="M20 320 C100 280, 180 120, 280 140 S400 80, 460 40"
        className="svg-draw stroke-foreground/[0.05]"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ animationDelay: "300ms", animationDuration: "2s" }}
      />
      <path
        d="M60 440 C140 380, 200 260, 300 220 S420 160, 470 180"
        className="svg-draw stroke-foreground/[0.06]"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ animationDelay: "200ms", animationDuration: "1.9s" }}
      />

      {/* Accent flow line — carries the gradient */}
      <path
        d="M30 360 C110 300, 200 160, 320 160 S440 120, 460 60"
        className="svg-draw"
        stroke="url(#flow-grad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.35"
        style={{ animationDelay: "500ms", animationDuration: "2.2s" }}
      />

      {/* Secondary fine lines — texture and depth */}
      <path
        d="M80 460 C160 400, 220 320, 260 260 S340 180, 380 140"
        className="svg-draw stroke-foreground/[0.03]"
        strokeWidth="1"
        strokeLinecap="round"
        style={{ animationDelay: "600ms", animationDuration: "1.6s" }}
      />
      <path
        d="M100 400 C180 360, 240 240, 340 200 S440 260, 480 200"
        className="svg-draw stroke-foreground/[0.04]"
        strokeWidth="1"
        strokeLinecap="round"
        style={{ animationDelay: "700ms", animationDuration: "1.7s" }}
      />
      <path
        d="M10 280 C80 240, 140 160, 220 120 S340 60, 420 80"
        className="svg-draw stroke-foreground/[0.03]"
        strokeWidth="0.75"
        strokeLinecap="round"
        style={{ animationDelay: "800ms", animationDuration: "1.8s" }}
      />

      {/* Crossing paths — create intersections that suggest thinking */}
      <path
        d="M160 460 C200 360, 180 280, 240 200 S320 100, 340 20"
        className="svg-draw stroke-foreground/[0.05]"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ animationDelay: "400ms", animationDuration: "2s" }}
      />
      <path
        d="M320 460 C300 380, 260 300, 280 220 S300 120, 260 40"
        className="svg-draw stroke-foreground/[0.04]"
        strokeWidth="1"
        strokeLinecap="round"
        style={{ animationDelay: "550ms", animationDuration: "1.9s" }}
      />

      {/* Small accent dots at key intersections */}
      <circle cx="240" cy="180" r="3" className="svg-node fill-foreground/[0.08]" style={{ animationDelay: "1200ms" }} />
      <circle cx="320" cy="160" r="2" className="svg-node fill-foreground/[0.06]" style={{ animationDelay: "1400ms" }} />
      <circle cx="280" cy="220" r="2.5" className="svg-node fill-foreground/[0.07]" style={{ animationDelay: "1300ms" }} />

      {/* Single gradient dot — focal point */}
      <circle cx="240" cy="180" r="5" className="svg-node" fill="url(#flow-grad)" fillOpacity="0.2" style={{ animationDelay: "1500ms" }} />
    </svg>
  )
}
