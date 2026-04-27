"use client"

import {
  ClaudeCode,
  Cursor,
  Figma,
  Gemini,
  Lovable,
  OpenAI,
} from "@lobehub/icons"
import { NextMark } from "geist/logos"
import Image from "next/image"

/**
 * Shared tool/tech logo renderer. Used by both the home-page tools carousel
 * and case-study tools rows so the visual treatment stays consistent.
 *
 * The element is rendered at intrinsic size — wrap it in a sized container
 * (e.g. `h-12 w-12`) and let `h-full w-full` (on the Image variants) or
 * lobehub's `size` prop scale it appropriately.
 */
export function ToolMark({ name }: { name: string }) {
  const imgClass =
    "h-full w-full border-0 object-contain outline-none shadow-none"
  const svgClass = "block border-0 outline-none shadow-none"
  const themeColor = "var(--page-fg-muted)"

  switch (name) {
    case "Figma":
      return <Figma.Color aria-hidden="true" className={svgClass} size={42} />
    case "Figma Make":
      return (
        <Image
          src="/logos/figmamake.png"
          alt="Figma Make"
          width={64}
          height={64}
          className={imgClass}
        />
      )
    case "Cursor":
      return (
        <Cursor
          aria-hidden="true"
          className={svgClass}
          color={themeColor}
          size={44}
        />
      )
    case "Claude Code":
      return (
        <ClaudeCode.Text
          aria-hidden="true"
          className={svgClass}
          color={themeColor}
          height={22}
          width={52}
        />
      )
    case "Framer":
      return (
        <Image
          src="/logos/borderless/framer-clean.png"
          alt="Framer"
          width={64}
          height={64}
          className={imgClass}
        />
      )
    case "Miro":
      return (
        <Image
          src="/logos/borderless/miro.png"
          alt="Miro"
          width={64}
          height={64}
          className={imgClass}
        />
      )
    case "ChatGPT":
      return (
        <OpenAI
          aria-hidden="true"
          className={svgClass}
          color={themeColor}
          size={44}
        />
      )
    case "Lovable":
      return <Lovable.Color aria-hidden="true" className={svgClass} size={42} />
    case "Gemini":
      return <Gemini.Color aria-hidden="true" className={svgClass} size={42} />
    case "Codex":
      return (
        <Image
          src="/logos/borderless/codex.png"
          alt="Codex"
          width={64}
          height={64}
          className={imgClass}
        />
      )
    case "Next.js":
      return <NextMark size={40} />
    default:
      return (
        <span className="font-mono text-[14px] font-semibold tracking-tight">
          {name.slice(0, 2)}
        </span>
      )
  }
}
