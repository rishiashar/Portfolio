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

const THEME_SWITCH_DURATION_MS = 220

type AudioContextWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext
  }

export function SiteHeader() {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [themeMode, setThemeMode] = useState<ThemeMode>("light")
  const audioContextRef = useRef<AudioContext | null>(null)
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
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        void audioContextRef.current.close()
      }
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  const playToggleSound = useCallback(async (next: ThemeMode) => {
    const AudioContextClass =
      window.AudioContext ??
      (window as AudioContextWindow).webkitAudioContext

    if (!AudioContextClass) return

    const context = audioContextRef.current ?? new AudioContextClass()
    audioContextRef.current = context

    if (context.state === "suspended") {
      await context.resume()
    }

    const start = context.currentTime + 0.006
    const preset =
      next === "dark"
        ? {
            filter: 1800,
            bodyFrom: 720,
            bodyTo: 430,
            accentFrom: 640,
            accentTo: 480,
          }
        : {
            filter: 2300,
            bodyFrom: 520,
            bodyTo: 760,
            accentFrom: 820,
            accentTo: 1180,
          }

    const filter = context.createBiquadFilter()
    filter.type = "lowpass"
    filter.frequency.setValueAtTime(preset.filter, start)
    filter.Q.value = 0.65

    const master = context.createGain()
    master.gain.setValueAtTime(0.0001, start)
    master.gain.exponentialRampToValueAtTime(0.46, start + 0.012)
    master.gain.exponentialRampToValueAtTime(0.0001, start + 0.18)

    filter.connect(master)
    master.connect(context.destination)

    const bodyGain = context.createGain()
    bodyGain.gain.setValueAtTime(0.0001, start)
    bodyGain.gain.exponentialRampToValueAtTime(0.14, start + 0.014)
    bodyGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.16)

    const accentGain = context.createGain()
    accentGain.gain.setValueAtTime(0.0001, start + 0.012)
    accentGain.gain.exponentialRampToValueAtTime(0.075, start + 0.03)
    accentGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.1)

    const bodyOscillator = context.createOscillator()
    bodyOscillator.type = "triangle"
    bodyOscillator.frequency.setValueAtTime(preset.bodyFrom, start)
    bodyOscillator.frequency.exponentialRampToValueAtTime(
      preset.bodyTo,
      start + 0.16
    )

    const accentOscillator = context.createOscillator()
    accentOscillator.type = "sine"
    accentOscillator.frequency.setValueAtTime(preset.accentFrom, start + 0.014)
    accentOscillator.frequency.exponentialRampToValueAtTime(
      preset.accentTo,
      start + 0.1
    )

    bodyOscillator.connect(bodyGain)
    accentOscillator.connect(accentGain)
    bodyGain.connect(filter)
    accentGain.connect(filter)

    bodyOscillator.start(start)
    accentOscillator.start(start + 0.012)
    bodyOscillator.stop(start + 0.17)
    accentOscillator.stop(start + 0.11)
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
    void playToggleSound(next)

    transitionCleanupRef.current = window.setTimeout(() => {
      root.classList.remove("theme-transition")
      transitionCleanupRef.current = null
    }, THEME_SWITCH_DURATION_MS)
  }, [playToggleSound])

  const toggleDark = useCallback(() => {
    const current = getThemeSnapshot()
    updateTheme(current === "dark" ? "light" : "dark")
  }, [updateTheme])

  return (
    <div
      className={`sticky top-0 z-50 -mx-4 transition-[padding] duration-300 ease-out sm:-mx-6 ${
        scrolled ? "pt-4 sm:pt-5" : ""
      }`}
      style={{ overflow: "visible" }}
    >
      <div
        className={`relative flex items-center justify-between transition-all duration-300 ease-out ${
          scrolled
            ? "border px-4 py-3 shadow-[0_6px_24px_-10px_rgba(0,0,0,0.18)] sm:px-6 sm:py-3.5"
            : "px-4 py-5 sm:px-6 sm:py-6"
        }`}
        style={{
          color: "var(--page-fg-muted)",
          fontSize: 13,
          backgroundColor: scrolled ? "var(--page-bg)" : "transparent",
          borderColor: "var(--page-border)",
          backdropFilter: scrolled ? "saturate(1.2) blur(8px)" : "none",
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
          className="font-medium tracking-tight transition-colors"
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
          className="theme-toggle-button absolute left-1/2 flex h-8 w-8 -translate-x-1/2 cursor-pointer items-center justify-center border-0 bg-transparent p-0 shadow-none outline-none transition-transform duration-200 active:scale-[0.96] focus:outline-none focus-visible:outline-none"
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
            className="transition-colors hover:text-[color:var(--page-fg)]"
          >
            about
          </Link>
          <Link
            href={{ pathname: "/", hash: "projects" }}
            className="transition-colors hover:text-[color:var(--page-fg)]"
          >
            play
          </Link>
        </nav>
      </div>
    </div>
  )
}
