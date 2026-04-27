"use client"

import { ToolMark } from "@/components/tool-mark"
import { playToolHoverSound } from "@/lib/ui-sounds"

type Props = {
  name: string
  /**
   * Tailwind sizing classes for the outer box (e.g. `h-12 w-12`,
   * `h-14 w-14 sm:h-16 sm:w-16`). Caller decides the size; the shared
   * `.tool-mark` styling supplies the hover scale + tooltip layout.
   */
  className?: string
}

/**
 * A single tool/tech logo with the site's tasteful tooltip + hover scale +
 * minimal hover sound. Used by the home-page tools carousel and case-study
 * tools rows so the microinteraction reads consistently across the site.
 *
 * The visible glyph is delegated to `ToolMark`; this component is purely the
 * container, hover behaviour, accessible label, and tooltip surface.
 */
export function ToolBadge({ name, className }: Props) {
  const cls = ["tool-mark flex shrink-0 items-center justify-center", className]
    .filter(Boolean)
    .join(" ")

  return (
    <span
      className={cls}
      style={{ color: "var(--page-fg-muted)" }}
      onMouseEnter={() => void playToolHoverSound()}
      aria-label={name}
    >
      <ToolMark name={name} />
      <span className="tool-mark-tooltip" role="tooltip">
        {name}
      </span>
    </span>
  )
}
