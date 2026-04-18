import type { CSSProperties } from "react"

/**
 * Progressive scroll blur pinned to the bottom of the viewport.
 *
 * The effect is built from four stacked layers, each applying a stronger
 * `backdrop-filter: blur()` and masked so it only engages lower down the
 * strip. Stacked together they produce a smooth, perceptually-linear
 * gradient of blur intensity — content is crisp near the top of the strip
 * and progressively melts into the page edge.
 *
 * A fifth layer adds a soft colour wash (page-bg → transparent) so content
 * fully dissolves into the page frame colour at the very bottom.
 */
export function ScrollBlurFade() {
  const base: CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  }

  // Each layer engages progressively lower using a linear-gradient alpha mask.
  const layer = (blurPx: number, start: number, end: number): CSSProperties => {
    const mask = `linear-gradient(to bottom, transparent 0%, transparent ${start}%, #000 ${end}%, #000 100%)`
    return {
      ...base,
      backdropFilter: `blur(${blurPx}px)`,
      WebkitBackdropFilter: `blur(${blurPx}px)`,
      maskImage: mask,
      WebkitMaskImage: mask,
    }
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-[72px] sm:h-[88px]"
    >
      <div style={layer(1, 0, 40)} />
      <div style={layer(2.5, 25, 65)} />
      <div style={layer(5, 50, 85)} />
      <div style={layer(9, 70, 100)} />

      {/* Soft colour wash into the page frame colour at the very bottom */}
      <div
        style={{
          ...base,
          backgroundImage:
            "linear-gradient(to bottom, transparent 0%, transparent 45%, var(--page-frame-bg) 100%)",
        }}
      />
    </div>
  )
}
