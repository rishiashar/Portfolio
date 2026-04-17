"use client"

import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"

const THEME_STORAGE_KEY = "theme"
const THEME_SYNC_EVENT = "theme-sync"
const THEME_SWITCH_DURATION_MS = 220

type AudioContextWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext
  }

export function SiteHeader() {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const transitionCleanupRef = useRef<number | null>(null)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true))

    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.cancelAnimationFrame(frame)
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

  const playToggleSound = useCallback(async (next: boolean) => {
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
    const filter = context.createBiquadFilter()
    filter.type = "lowpass"
    filter.frequency.setValueAtTime(next ? 2400 : 1800, start)
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
    bodyOscillator.frequency.setValueAtTime(next ? 540 : 720, start)
    bodyOscillator.frequency.exponentialRampToValueAtTime(
      next ? 760 : 430,
      start + 0.16
    )

    const accentOscillator = context.createOscillator()
    accentOscillator.type = "sine"
    accentOscillator.frequency.setValueAtTime(next ? 860 : 640, start + 0.014)
    accentOscillator.frequency.exponentialRampToValueAtTime(
      next ? 1140 : 480,
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

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark")
    const root = document.documentElement

    if (transitionCleanupRef.current !== null) {
      window.clearTimeout(transitionCleanupRef.current)
    }

    root.classList.add("theme-transition")
    root.classList.toggle("dark", next)
    root.style.colorScheme = next ? "dark" : "light"
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light")
    } catch {}
    window.dispatchEvent(new Event(THEME_SYNC_EVENT))
    void playToggleSound(next)

    transitionCleanupRef.current = window.setTimeout(() => {
      root.classList.remove("theme-transition")
      transitionCleanupRef.current = null
    }, THEME_SWITCH_DURATION_MS)
  }, [playToggleSound])

  const cornerStyle: React.CSSProperties = {
    color: "var(--page-fg-muted)",
  }

  return (
    <div
      className={`sticky top-0 z-50 transition-[padding] duration-300 ease-out ${
        scrolled ? "-mx-4 pt-3 sm:-mx-6 sm:pt-4" : ""
      }`}
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
          onClick={toggle}
          aria-label="Toggle theme"
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
                  d="M15.95 3.7a8.8 8.8 0 1 0 4.35 15.9 7.75 7.75 0 0 1-4.3 1.26 7.86 7.86 0 0 1-7.86-7.86 8.12 8.12 0 0 1 7.81-8.3Z"
                />
                <path
                  className="theme-toggle-moon-spark"
                  d="M6.75 5.55v1.8M5.85 6.45h1.8"
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
