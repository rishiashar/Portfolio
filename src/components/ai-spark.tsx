export function AISpark() {
  // Small decorative SVG — an abstract "spark" / cursor that suggests AI generation
  // Thin geometric lines forming a precise, technical mark
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      aria-hidden="true"
    >
      {/* Four-point star / spark */}
      <path
        d="M16 4 L16 28 M4 16 L28 16"
        className="svg-draw stroke-foreground/25"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ animationDelay: "600ms" }}
      />
      <path
        d="M8 8 L24 24 M24 8 L8 24"
        className="svg-draw stroke-foreground/12"
        strokeWidth="1"
        strokeLinecap="round"
        style={{ animationDelay: "800ms" }}
      />
      {/* Center dot */}
      <circle
        cx="16"
        cy="16"
        r="2"
        className="svg-node fill-foreground/30"
        style={{ animationDelay: "1000ms" }}
      />
    </svg>
  )
}
