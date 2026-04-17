"use client"

import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
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

  const cornerStyle: React.CSSProperties = {
    color: "var(--page-fg-muted)",
  }

  return (
    <div
      className={`sticky top-0 z-50 transition-[padding] duration-300 ease-out ${
        scrolled ? "-mx-4 pt-4 sm:-mx-6 sm:pt-5" : ""
      }`}
      style={{ overflow: "visible" }}
    >
      <div
        className={`relative flex items-center justify-between transition-all duration-300 ease-out ${
          scrolled
            ? "border px-4 py-3 shadow-[0_6px_24px_-10px_rgba(0,0,0,0.18)] sm:px-6 sm:py-3.5"
            : "border border-transparent py-3 sm:py-3.5"
        }`}
        style={{
          color: "var(--page-fg-muted)",
          fontSize: 13,
          backgroundColor: scrolled ? "var(--page-bg)" : "transparent",
          borderColor: scrolled ? "var(--page-border)" : "transparent",
          backdropFilter: scrolled ? "saturate(1.2) blur(8px)" : "none",
        }}
      >
        {/* Corner + marks — only when floating */}
        {scrolled && (
          <>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-2 -top-2 select-none text-[18px] font-light leading-none"
              style={cornerStyle}
            >
              +
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 -top-2 select-none text-[18px] font-light leading-none"
              style={cornerStyle}
            >
              +
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-2 -left-2 select-none text-[18px] font-light leading-none"
              style={cornerStyle}
            >
              +
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-2 -right-2 select-none text-[18px] font-light leading-none"
              style={cornerStyle}
            >
              +
            </span>
          </>
        )}

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
          className="absolute left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center border-0 bg-transparent p-0 shadow-none outline-none transition-transform duration-200 active:scale-[0.96] focus:outline-none focus-visible:outline-none"
          style={{
            color: "var(--page-fg)",
            backgroundColor: "transparent",
            border: 0,
            boxShadow: "none",
          }}
        >
          {mounted ? (
            <span className="theme-toggle-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="theme-toggle-glyph theme-toggle-sun"
              >
                <circle className="theme-toggle-sun-core" cx="12" cy="12" r="4.25" />
                <line className="theme-toggle-ray theme-toggle-ray-1" x1="12" y1="2" x2="12" y2="4.1" />
                <line className="theme-toggle-ray theme-toggle-ray-2" x1="12" y1="19.9" x2="12" y2="22" />
                <line className="theme-toggle-ray theme-toggle-ray-3" x1="4.35" y1="4.35" x2="5.85" y2="5.85" />
                <line className="theme-toggle-ray theme-toggle-ray-4" x1="18.15" y1="18.15" x2="19.65" y2="19.65" />
                <line className="theme-toggle-ray theme-toggle-ray-5" x1="2" y1="12" x2="4.1" y2="12" />
                <line className="theme-toggle-ray theme-toggle-ray-6" x1="19.9" y1="12" x2="22" y2="12" />
                <line className="theme-toggle-ray theme-toggle-ray-7" x1="4.35" y1="19.65" x2="5.85" y2="18.15" />
                <line className="theme-toggle-ray theme-toggle-ray-8" x1="18.15" y1="5.85" x2="19.65" y2="4.35" />
              </svg>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="theme-toggle-glyph theme-toggle-moon"
              >
                <path
                  className="theme-toggle-moon-body"
                  d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
                />
              </svg>
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
