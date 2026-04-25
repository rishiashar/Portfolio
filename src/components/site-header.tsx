"use client"

import { Moon, Sun } from "lucide-react"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { PlusMark } from "@/components/plus-mark"
import {
  applyThemeMode,
  getThemeSnapshot,
  subscribeToThemeChange,
  THEME_STORAGE_KEY,
  type ThemeMode,
} from "@/lib/theme"
import { playHeaderClickSound, playThemeToggleSound } from "@/lib/ui-sounds"

const THEME_SWITCH_DURATION_MS = 220

export function SiteHeader() {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [themeMode, setThemeMode] = useState<ThemeMode>("light")
  const transitionCleanupRef = useRef<number | null>(null)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true))
    const syncTheme = () => setThemeMode(getThemeSnapshot())
    syncTheme()

    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    const unsubscribeTheme = subscribeToThemeChange(syncTheme)
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.cancelAnimationFrame(frame)
      unsubscribeTheme()
      if (transitionCleanupRef.current !== null) {
        window.clearTimeout(transitionCleanupRef.current)
      }
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  const updateTheme = useCallback((next: ThemeMode) => {
    const root = document.documentElement

    if (transitionCleanupRef.current !== null) {
      window.clearTimeout(transitionCleanupRef.current)
    }

    root.classList.add("theme-transition")
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {}
    applyThemeMode(next)
    setThemeMode(next)
    void playThemeToggleSound(next)

    transitionCleanupRef.current = window.setTimeout(() => {
      root.classList.remove("theme-transition")
      transitionCleanupRef.current = null
    }, THEME_SWITCH_DURATION_MS)
  }, [])

  const toggleDark = useCallback(() => {
    const current = getThemeSnapshot()
    updateTheme(current === "dark" ? "light" : "dark")
  }, [updateTheme])

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
          className="inline-flex min-h-9 items-center font-medium tracking-tight transition-colors"
          style={{ color: "var(--page-fg)" }}
        >
          Rishi Ashar
        </Link>

        {/* Middle: theme toggle */}
        <button
          type="button"
          onClick={toggleDark}
          aria-label={themeMode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          title={themeMode === "dark" ? "Light mode" : "Dark mode"}
          className="theme-toggle-button absolute left-1/2 flex h-9 w-9 -translate-x-1/2 cursor-pointer items-center justify-center border-0 bg-transparent p-0 shadow-none outline-none transition-transform duration-200 active:scale-[0.96] focus:outline-none focus-visible:outline-none"
          data-scrolled={scrolled ? "true" : "false"}
          style={{
            backgroundColor: "transparent",
            border: 0,
            boxShadow: "none",
          }}
        >
          {mounted ? (
            <span className="theme-toggle-icon" aria-hidden="true">
              <Sun
                aria-hidden="true"
                className="theme-toggle-glyph theme-toggle-sun"
                strokeWidth={1.55}
              />
              <Moon
                aria-hidden="true"
                className="theme-toggle-glyph theme-toggle-moon"
                strokeWidth={1.55}
              />
            </span>
          ) : (
            <span className="h-[18px] w-[18px]" />
          )}
        </button>

        {/* Right: nav */}
        <nav className="flex items-center gap-5">
          <Link
            href="/about"
            onClick={playNavigationClick}
            className="inline-flex min-h-9 items-center transition-colors hover:text-[color:var(--page-fg)]"
          >
            about
          </Link>
          <Link
            href={{ pathname: "/", hash: "projects" }}
            onClick={playNavigationClick}
            className="inline-flex min-h-9 items-center transition-colors hover:text-[color:var(--page-fg)]"
          >
            play
          </Link>
        </nav>
      </div>
    </div>
  )
}
