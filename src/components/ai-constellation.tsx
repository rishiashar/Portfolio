export function AIConstellation() {
  // Abstract neural network / constellation — nodes connected by thin lines
  // Each path draws itself via CSS stroke-dashoffset animation
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      {/* Connection lines — draw themselves in */}
      <g className="stroke-foreground/[0.08]" strokeWidth="1">
        <path d="M80 60 L200 120" className="svg-draw" style={{ animationDelay: "200ms" }} />
        <path d="M200 120 L320 80" className="svg-draw" style={{ animationDelay: "350ms" }} />
        <path d="M200 120 L160 220" className="svg-draw" style={{ animationDelay: "500ms" }} />
        <path d="M160 220 L280 200" className="svg-draw" style={{ animationDelay: "600ms" }} />
        <path d="M280 200 L320 80" className="svg-draw" style={{ animationDelay: "700ms" }} />
        <path d="M160 220 L100 320" className="svg-draw" style={{ animationDelay: "800ms" }} />
        <path d="M100 320 L240 340" className="svg-draw" style={{ animationDelay: "900ms" }} />
        <path d="M240 340 L280 200" className="svg-draw" style={{ animationDelay: "1000ms" }} />
        <path d="M240 340 L340 300" className="svg-draw" style={{ animationDelay: "1050ms" }} />
        <path d="M340 300 L280 200" className="svg-draw" style={{ animationDelay: "1100ms" }} />
        <path d="M80 60 L40 160" className="svg-draw" style={{ animationDelay: "400ms" }} />
        <path d="M40 160 L160 220" className="svg-draw" style={{ animationDelay: "650ms" }} />
        <path d="M40 160 L100 320" className="svg-draw" style={{ animationDelay: "750ms" }} />
      </g>

      {/* Secondary faint connections — creates depth */}
      <g className="stroke-foreground/[0.04]" strokeWidth="0.75">
        <path d="M80 60 L280 200" className="svg-draw" style={{ animationDelay: "1200ms" }} />
        <path d="M320 80 L240 340" className="svg-draw" style={{ animationDelay: "1300ms" }} />
        <path d="M40 160 L280 200" className="svg-draw" style={{ animationDelay: "1400ms" }} />
        <path d="M200 120 L240 340" className="svg-draw" style={{ animationDelay: "1500ms" }} />
      </g>

      {/* Nodes — fade in after lines draw */}
      <g className="fill-foreground">
        <circle cx="80" cy="60" r="3" className="svg-node" style={{ animationDelay: "300ms" }} />
        <circle cx="200" cy="120" r="4.5" className="svg-node" style={{ animationDelay: "450ms" }} />
        <circle cx="320" cy="80" r="3" className="svg-node" style={{ animationDelay: "550ms" }} />
        <circle cx="160" cy="220" r="4" className="svg-node" style={{ animationDelay: "700ms" }} />
        <circle cx="280" cy="200" r="3.5" className="svg-node" style={{ animationDelay: "850ms" }} />
        <circle cx="100" cy="320" r="3" className="svg-node" style={{ animationDelay: "1000ms" }} />
        <circle cx="240" cy="340" r="4" className="svg-node" style={{ animationDelay: "1100ms" }} />
        <circle cx="40" cy="160" r="2.5" className="svg-node" style={{ animationDelay: "600ms" }} />
        <circle cx="340" cy="300" r="2.5" className="svg-node" style={{ animationDelay: "1150ms" }} />
      </g>

      {/* Accent nodes — the "active" ones with gradient color */}
      <circle cx="200" cy="120" r="6" className="svg-node fill-none stroke-foreground/10" strokeWidth="1" style={{ animationDelay: "500ms" }} />
      <circle cx="160" cy="220" r="5.5" className="svg-node fill-none stroke-foreground/10" strokeWidth="1" style={{ animationDelay: "750ms" }} />
      <circle cx="240" cy="340" r="5.5" className="svg-node fill-none stroke-foreground/10" strokeWidth="1" style={{ animationDelay: "1150ms" }} />

      {/* Pulse rings on key nodes */}
      <circle cx="200" cy="120" r="12" className="svg-pulse fill-none stroke-foreground/[0.06]" strokeWidth="0.75" style={{ animationDelay: "1600ms" }} />
      <circle cx="240" cy="340" r="10" className="svg-pulse fill-none stroke-foreground/[0.06]" strokeWidth="0.75" style={{ animationDelay: "1800ms" }} />
    </svg>
  )
}
