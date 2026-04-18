import type { CSSProperties } from "react"

type PlusMarkProps = {
  className?: string
  style?: CSSProperties
  size?: number
  stroke?: number
  /**
   * Which edge of the frame this mark sits on.
   * - "left"  → vertical full, horizontal arm extends to the right (⊢)
   * - "right" → vertical full, horizontal arm extends to the left  (⊣)
   * - "full"  → full 4-arm plus (default)
   */
  edge?: "left" | "right" | "full"
}

/**
 * Small registration-style crosshair rendered with crisp SVG strokes.
 * Colour follows `currentColor`.
 *
 * Use `edge="left"` or `edge="right"` for marks that sit on the page
 * frame — one arm of the horizontal bar is omitted so the mark reads
 * as three lines instead of a full +.
 */
export function PlusMark({
  className,
  style,
  size = 12,
  stroke = 1.25,
  edge = "full",
}: PlusMarkProps) {
  const mid = size / 2

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none block ${className ?? ""}`}
      style={style}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="square"
    >
      {/* Vertical stroke — always full height */}
      <line x1={mid} y1={0} x2={mid} y2={size} />

      {/* Horizontal stroke — shape depends on edge */}
      {edge === "full" && <line x1={0} y1={mid} x2={size} y2={mid} />}
      {edge === "left" && <line x1={mid} y1={mid} x2={size} y2={mid} />}
      {edge === "right" && <line x1={0} y1={mid} x2={mid} y2={mid} />}
    </svg>
  )
}
