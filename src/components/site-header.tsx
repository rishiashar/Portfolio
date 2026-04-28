"use client"

import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { PlusMark } from "@/components/plus-mark"
import { playHeaderClickSound } from "@/lib/ui-sounds"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  const playNavigationClick = useCallback(() => {
    void playHeaderClickSound()
  }, [])

  return (
    <div
      className={`sticky top-0 z-50 -mx-4 transition-[padding] duration-300 ease-out sm:-mx-6 ${
        scrolled ? "pt-2 sm:pt-3" : ""
      }`}
      style={{ overflow: "visible" }}
    >
      <div
        className={`relative flex items-center justify-between transition-[background-color,box-shadow,padding,backdrop-filter] duration-300 ease-out ${
          scrolled
            ? "px-4 py-2 sm:px-6 sm:py-2.5"
            : "px-4 py-2.5 sm:px-6 sm:py-3"
        }`}
        style={{
          color: "var(--page-fg-muted)",
          fontSize: 13,
          backgroundColor: scrolled ? "var(--page-bg)" : "transparent",
          backdropFilter: scrolled ? "saturate(1.2) blur(8px)" : "none",
          boxShadow: scrolled ? "var(--surface-shadow-strong)" : "none",
        }}
      >
        {/* Full-bleed divider at the header's bottom edge — mirrors the
            Label divider on every section below (w-screen so it extends
            past the page frame borders to the viewport edges). Fades out
            when the header detaches and floats. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute left-1/2 bottom-0 h-px w-screen -translate-x-1/2 translate-y-px transition-opacity duration-300 ${
            scrolled ? "opacity-0" : "opacity-100"
          }`}
          style={{ backgroundColor: "var(--page-border)" }}
        />
        {/* Corner bracket marks — only when floating */}
        {scrolled && (
          <>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-px -top-px block h-[8px] w-[8px]"
              style={{
                borderLeft: "1.5px solid var(--page-fg-faint)",
                borderTop: "1.5px solid var(--page-fg-faint)",
              }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-px -top-px block h-[8px] w-[8px]"
              style={{
                borderRight: "1.5px solid var(--page-fg-faint)",
                borderTop: "1.5px solid var(--page-fg-faint)",
              }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-px -left-px block h-[8px] w-[8px]"
              style={{
                borderLeft: "1.5px solid var(--page-fg-faint)",
                borderBottom: "1.5px solid var(--page-fg-faint)",
              }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-px -right-px block h-[8px] w-[8px]"
              style={{
                borderRight: "1.5px solid var(--page-fg-faint)",
                borderBottom: "1.5px solid var(--page-fg-faint)",
              }}
            />
          </>
        )}

        {/* Registration marks at the header bottom edge — visible only when
            the header is flush with the page frame (not floating/scrolled).
            These straddle the border-b at exactly the same intersection
            points as the Label PlusMarks on every other section. */}
        <PlusMark
          edge="left"
          size={10}
          className={`absolute left-0 bottom-0 -translate-x-1/2 translate-y-1/2 transition-opacity duration-300 ${
            scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{ color: "var(--page-fg-faint)" }}
        />
        <PlusMark
          edge="right"
          size={10}
          className={`absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 transition-opacity duration-300 ${
            scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{ color: "var(--page-fg-faint)" }}
        />

        {/* Left: name */}
        <Link
          href="/"
          className="inline-flex min-h-10 items-center font-medium tracking-tight transition-colors"
          style={{ color: "var(--page-fg)" }}
        >
          Rishi Ashar
        </Link>

        {/* Right: nav */}
        <nav className="flex items-center gap-5">
          <Link
            href="/about"
            onClick={playNavigationClick}
            className="inline-flex min-h-10 items-center transition-colors hover:text-[color:var(--page-fg)]"
          >
            about
          </Link>
          <Link
            href={{ pathname: "/", hash: "projects" }}
            onClick={playNavigationClick}
            className="inline-flex min-h-10 items-center transition-colors hover:text-[color:var(--page-fg)]"
          >
            play
          </Link>
        </nav>
      </div>
    </div>
  )
}
