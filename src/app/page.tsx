"use client"

import Image from "next/image"
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react"

const THEME_SWITCH_DURATION_MS = 220
const THEME_SYNC_EVENT = "theme-sync"
const THEME_STORAGE_KEY = "theme"
const THEME_MEDIA_QUERY = "(prefers-color-scheme: dark)"

type AudioContextWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext
  }

function subscribeToThemeChange(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {}
  }

  window.addEventListener(THEME_SYNC_EVENT, callback)
  return () => window.removeEventListener(THEME_SYNC_EVENT, callback)
}

function getThemeSnapshot() {
  if (typeof document === "undefined") {
    return false
  }

  return document.documentElement.classList.contains("dark")
}

function getStoredThemePreference() {
  if (typeof window === "undefined") {
    return null
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  return storedTheme === "dark" || storedTheme === "light" ? storedTheme : null
}

function resolveDarkThemePreference() {
  if (typeof window === "undefined") {
    return false
  }

  const storedTheme = getStoredThemePreference()
  if (storedTheme !== null) {
    return storedTheme === "dark"
  }

  return window.matchMedia(THEME_MEDIA_QUERY).matches
}

function applyResolvedTheme() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false
  }

  const dark = resolveDarkThemePreference()
  const root = document.documentElement

  root.classList.toggle("dark", dark)
  root.style.colorScheme = dark ? "dark" : "light"
  window.dispatchEvent(new Event(THEME_SYNC_EVENT))

  return dark
}

/* ════════════════════════════════════════════
   Micro-components (isolated client leaves)
   ════════════════════════════════════════════ */

function LiveClock() {
  const [time, setTime] = useState("")
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      )
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <span
      className="tabular-nums"
      style={{ color: "var(--page-fg-faint)", fontSize: 13, fontWeight: 500 }}
    >
      {time}
    </span>
  )
}

function DarkToggle() {
  const dark = useSyncExternalStore(
    subscribeToThemeChange,
    getThemeSnapshot,
    () => false
  )
  const transitionCleanupRef = useRef<number | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    return () => {
      if (transitionCleanupRef.current !== null) {
        window.clearTimeout(transitionCleanupRef.current)
      }

      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        void audioContextRef.current.close()
      }
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
    const next = !dark
    const root = document.documentElement

    const clearThemeTransition = (delay = THEME_SWITCH_DURATION_MS) => {
      if (transitionCleanupRef.current !== null) {
        window.clearTimeout(transitionCleanupRef.current)
      }
      transitionCleanupRef.current = window.setTimeout(() => {
        root.classList.remove("theme-transition")
        transitionCleanupRef.current = null
      }, delay)
    }

    const applyTheme = () => {
      localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light")
      applyResolvedTheme()
    }

    root.classList.add("theme-transition")
    void playToggleSound(next)
    applyTheme()
    clearThemeTransition()
  }, [dark, playToggleSound])

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="flex h-9 w-9 cursor-pointer appearance-none items-center justify-center border-0 bg-transparent p-0 shadow-none outline-none transition-transform duration-200 active:scale-[0.97] focus:outline-none focus-visible:outline-none"
      style={{
        color: "var(--page-fg-faint)",
        backgroundColor: "transparent",
        border: 0,
        boxShadow: "none",
      }}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="theme-toggle-glyph theme-toggle-sun"
        >
          <circle className="theme-toggle-sun-core" cx="12" cy="12" r="5" />
          <line className="theme-toggle-ray theme-toggle-ray-1" x1="12" y1="1" x2="12" y2="3" />
          <line className="theme-toggle-ray theme-toggle-ray-2" x1="12" y1="21" x2="12" y2="23" />
          <line className="theme-toggle-ray theme-toggle-ray-3" x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line className="theme-toggle-ray theme-toggle-ray-4" x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line className="theme-toggle-ray theme-toggle-ray-5" x1="1" y1="12" x2="3" y2="12" />
          <line className="theme-toggle-ray theme-toggle-ray-6" x1="21" y1="12" x2="23" y2="12" />
          <line className="theme-toggle-ray theme-toggle-ray-7" x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line className="theme-toggle-ray theme-toggle-ray-8" x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="theme-toggle-glyph theme-toggle-moon"
        >
          <path
            className="theme-toggle-moon-body"
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
          />
          <path
            className="theme-toggle-moon-spark"
            d="M17.5 4.6v2.2M16.4 5.7h2.2"
          />
        </svg>
      </span>
    </button>
  )
}

function WorkCarousel() {
  const [idx, setIdx] = useState(0)
  const slides = [
    { bg: "#1a1a1a", label: "Activity Log Analyzer" },
    { bg: "#2a2a2a", label: "Team Settings" },
    { bg: "#333333", label: "Event Discovery" },
    { bg: "#1f1f1f", label: "Pay Period Manager" },
  ]
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % slides.length), 3000)
    return () => clearInterval(id)
  }, [slides.length])
  return (
    <div
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--page-surface)",
        height: 200,
        border: "1px solid var(--page-border)",
      }}
    >
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700"
        style={{
          transform: `translate3d(-${idx * 100}%, 0, 0)`,
          transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {slides.map((s, i) => (
          <div
            key={i}
            className="flex h-full w-full flex-shrink-0 items-center justify-center"
            style={{ backgroundColor: s.bg }}
          >
            <span className="text-[13px] font-medium text-white/30">
              {s.label}
            </span>
          </div>
        ))}
      </div>
      {/* View work pill */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <a
          href="#"
          className="pointer-events-auto px-5 py-2.5 text-[13px] font-medium text-white/90 backdrop-blur-xl"
          style={{
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
            transition: "all 400ms cubic-bezier(0.32,0.72,0,1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.2)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.12)"
          }}
        >
          View work
        </a>
      </div>
      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="h-1.5 transition-all duration-500"
            style={{
              width: i === idx ? 16 : 6,
              backgroundColor:
                i === idx ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
              transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)",
            }}
          />
        ))}
      </div>
    </div>
  )
}

interface DayData {
  date: string
  count: number
  repos: Record<string, number>
}

function CommitGraph() {
  const [days, setDays] = useState<DayData[]>([])
  const [total, setTotal] = useState(0)
  const [hover, setHover] = useState<{
    idx: number
    left: number
    y: number
  } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((d: { days: DayData[]; total: number }) => {
        setDays(d.days)
        setTotal(d.total)
      })
      .catch(() => {})
  }, [])

  const max = Math.max(...days.map((d) => d.count), 1)

  // Fallback while loading
  if (days.length === 0) {
    return (
      <div>
        <div className="flex items-end gap-[3px]">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="w-full animate-pulse"
              style={{ height: 20, backgroundColor: "var(--page-border)", opacity: 0.3 }}
            />
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between text-[12px]" style={{ color: "var(--page-fg-faint)" }}>
          <span>Last 30 days</span>
          <span>Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex items-end gap-[3px]">
        {days.map((d, i) => {
          const intensity = d.count / max
          return (
            <div
              key={i}
              className="w-full cursor-pointer transition-opacity duration-200"
              style={{
                height: 20,
                backgroundColor:
                  d.count === 0
                    ? "var(--page-border)"
                    : `color-mix(in srgb, var(--page-accent) ${Math.round(intensity * 100)}%, var(--page-surface))`,
                opacity: hover && hover.idx !== i ? 0.4 : d.count === 0 ? 0.5 : 0.4 + intensity * 0.6,
              }}
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const containerRect = containerRef.current?.getBoundingClientRect()
                if (!containerRect) return
                const x = rect.left - containerRect.left + rect.width / 2
                setHover({
                  idx: i,
                  left: Math.min(Math.max(x, 60), containerRect.width - 60),
                  y: rect.top - containerRect.top,
                })
              }}
              onMouseLeave={() => setHover(null)}
            />
          )
        })}
      </div>

      {/* Tooltip */}
      {hover !== null && days[hover.idx] && (
        <div
          className="pointer-events-none absolute z-10 px-3 py-2 shadow-lg"
          style={{
            left: hover.left,
            top: hover.y - 8,
            transform: "translate(-50%, -100%)",
            backgroundColor: "var(--page-surface)",
            border: "1px solid var(--page-border)",
            opacity: 1,
            transition: "opacity 150ms ease",
          }}
        >
          <p className="text-[13px] font-semibold" style={{ color: "var(--page-fg)" }}>
            {new Date(days[hover.idx].date + "T12:00:00").toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </p>
          <p className="text-[12px] font-medium" style={{ color: "var(--page-accent)" }}>
            {days[hover.idx].count} commit{days[hover.idx].count !== 1 ? "s" : ""}
          </p>
          {Object.keys(days[hover.idx].repos).length > 0 && (
            <p className="text-[11px]" style={{ color: "var(--page-fg-faint)" }}>
              {Object.entries(days[hover.idx].repos)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 1)
                .map(([repo]) => repo)
                .join("")}
            </p>
          )}
        </div>
      )}

      <div
        className="mt-2 flex items-center justify-between text-[12px]"
        style={{ color: "var(--page-fg-faint)" }}
      >
        <span>Last 30 days</span>
        <span>{total} commits</span>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════
   Shared utilities
   ════════════════════════════════════════════ */

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.opacity = "1"
          el.style.transform = "translate3d(0,0,0)"
          el.style.filter = "blur(0)"
          obs.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Fade({
  children,
  d = 0,
  className = "",
}: {
  children: React.ReactNode
  d?: number
  className?: string
}) {
  const ref = useFadeIn()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translate3d(0,14px,0)",
        filter: "blur(4px)",
        transition: `all 700ms cubic-bezier(0.32,0.72,0,1) ${d}ms`,
      }}
    >
      {children}
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mb-6 pt-8">
      {/* Full-bleed divider line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-screen -translate-x-1/2"
        style={{ backgroundColor: "var(--page-border)" }}
      />
      {/* + at left frame-border intersection */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-6 top-0 -translate-x-1/2 -translate-y-1/2 select-none text-[22px] leading-none"
        style={{ color: "var(--page-fg-muted)" }}
      >
        +
      </span>
      {/* + at right frame-border intersection */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-0 -translate-y-1/2 translate-x-1/2 select-none text-[22px] leading-none"
        style={{ color: "var(--page-fg-muted)" }}
      >
        +
      </span>
      <span
        className="text-[12px] uppercase tracking-widest"
        style={{ color: "var(--page-fg-faint)" }}
      >
        {children}
      </span>
    </div>
  )
}

function PortraitGradient({ variant }: { variant: "aqua" | "ember" }) {
  const dark = useSyncExternalStore(
    subscribeToThemeChange,
    getThemeSnapshot,
    () => false
  )
  const gradientId = useId().replace(/:/g, "")

  if (!dark && variant === "ember") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 52 64"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`${gradientId}-base`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff8f3" />
            <stop offset="52%" stopColor="#fffaf8" />
            <stop offset="100%" stopColor="#fdfdfd" />
          </linearGradient>
          <radialGradient id={`${gradientId}-glow-a`} cx="24%" cy="18%" r="78%">
            <stop offset="0%" stopColor="#ffd8b0" stopOpacity="0.72" />
            <stop offset="55%" stopColor="#ffb98e" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#ffb98e" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${gradientId}-glow-b`} cx="84%" cy="76%" r="72%">
            <stop offset="0%" stopColor="#b8f0ff" stopOpacity="0.58" />
            <stop offset="54%" stopColor="#7fdcff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#7fdcff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${gradientId}-glow-c`} cx="58%" cy="38%" r="68%">
            <stop offset="0%" stopColor="#fff8ef" stopOpacity="0.34" />
            <stop offset="58%" stopColor="#fff8ef" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#fff8ef" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="52" height="64" fill={`url(#${gradientId}-base)`} />
        <rect width="52" height="64" fill={`url(#${gradientId}-glow-a)`} />
        <rect width="52" height="64" fill={`url(#${gradientId}-glow-b)`} />
        <rect width="52" height="64" fill={`url(#${gradientId}-glow-c)`} />
      </svg>
    )
  }

  if (!dark) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 52 64"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`${gradientId}-base`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f7fdff" />
            <stop offset="48%" stopColor="#f3fbff" />
            <stop offset="100%" stopColor="#f8fffc" />
          </linearGradient>
          <radialGradient id={`${gradientId}-glow-a`} cx="28%" cy="22%" r="82%">
            <stop offset="0%" stopColor="#b9f6ff" stopOpacity="0.72" />
            <stop offset="52%" stopColor="#8be7ff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#8be7ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${gradientId}-glow-b`} cx="84%" cy="82%" r="72%">
            <stop offset="0%" stopColor="#b7f7d2" stopOpacity="0.58" />
            <stop offset="54%" stopColor="#7beab4" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#7beab4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${gradientId}-glow-c`} cx="54%" cy="36%" r="68%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
            <stop offset="56%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="52" height="64" fill={`url(#${gradientId}-base)`} />
        <rect width="52" height="64" fill={`url(#${gradientId}-glow-a)`} />
        <rect width="52" height="64" fill={`url(#${gradientId}-glow-b)`} />
        <rect width="52" height="64" fill={`url(#${gradientId}-glow-c)`} />
      </svg>
    )
  }

  if (variant === "ember") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 52 64"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`${gradientId}-base`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#120f12" />
            <stop offset="45%" stopColor="#1f1420" />
            <stop offset="100%" stopColor="#0b1418" />
          </linearGradient>
          <radialGradient id={`${gradientId}-glow-a`} cx="24%" cy="18%" r="78%">
            <stop offset="0%" stopColor="#ffb36f" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#ff7a59" stopOpacity="0.36" />
            <stop offset="100%" stopColor="#ff7a59" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${gradientId}-glow-b`} cx="80%" cy="78%" r="70%">
            <stop offset="0%" stopColor="#7ce6ff" stopOpacity="0.7" />
            <stop offset="55%" stopColor="#2ac3ff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#2ac3ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${gradientId}-glow-c`} cx="56%" cy="42%" r="68%">
            <stop offset="0%" stopColor="#ffefcf" stopOpacity="0.22" />
            <stop offset="55%" stopColor="#ffefcf" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ffefcf" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${gradientId}-vignette`} cx="50%" cy="50%" r="82%">
            <stop offset="58%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.32" />
          </radialGradient>
        </defs>
        <rect width="52" height="64" fill={`url(#${gradientId}-base)`} />
        <rect width="52" height="64" fill={`url(#${gradientId}-glow-a)`} />
        <rect width="52" height="64" fill={`url(#${gradientId}-glow-b)`} />
        <rect width="52" height="64" fill={`url(#${gradientId}-glow-c)`} />
        <rect width="52" height="64" fill={`url(#${gradientId}-vignette)`} />
      </svg>
    )
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 52 64"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`${gradientId}-base`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#081318" />
          <stop offset="48%" stopColor="#0d1d22" />
          <stop offset="100%" stopColor="#091115" />
        </linearGradient>
        <radialGradient id={`${gradientId}-glow-a`} cx="26%" cy="20%" r="82%">
          <stop offset="0%" stopColor="#98f5ff" stopOpacity="0.95" />
          <stop offset="52%" stopColor="#42d4ff" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#42d4ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${gradientId}-glow-b`} cx="86%" cy="84%" r="72%">
          <stop offset="0%" stopColor="#7cf3b0" stopOpacity="0.8" />
          <stop offset="54%" stopColor="#18c88d" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#18c88d" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${gradientId}-glow-c`} cx="54%" cy="38%" r="68%">
          <stop offset="0%" stopColor="#f0ffff" stopOpacity="0.18" />
          <stop offset="56%" stopColor="#f0ffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#f0ffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${gradientId}-vignette`} cx="50%" cy="50%" r="82%">
          <stop offset="58%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
        </radialGradient>
      </defs>
      <rect width="52" height="64" fill={`url(#${gradientId}-base)`} />
      <rect width="52" height="64" fill={`url(#${gradientId}-glow-a)`} />
      <rect width="52" height="64" fill={`url(#${gradientId}-glow-b)`} />
      <rect width="52" height="64" fill={`url(#${gradientId}-glow-c)`} />
      <rect width="52" height="64" fill={`url(#${gradientId}-vignette)`} />
    </svg>
  )
}

function TestimonialCard({
  name,
  role,
  company,
  quote,
  portrait,
  objectPosition,
  portraitScale = 1,
  portraitTranslateY = "0%",
  portraitTransformOrigin = "50% 50%",
  gradientVariant,
  noBorderRight,
}: {
  name: string
  role: string
  company: string
  quote: string
  portrait: string
  objectPosition: string
  portraitScale?: number
  portraitTranslateY?: string
  portraitTransformOrigin?: string
  gradientVariant: "aqua" | "ember"
  noBorderRight?: boolean
}) {
  const [showImage, setShowImage] = useState(true)
  return (
    <div
      className={`flex min-h-0 flex-col justify-between gap-8 p-4 sm:gap-10 sm:p-6 md:min-h-[280px] ${
        noBorderRight ? "" : "border-b md:border-r md:border-b-0"
      }`}
      style={{
        borderColor: "var(--page-border)",
      }}
    >
      {/* Top row: name/role left, small portrait right */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[13px] font-semibold" style={{ color: "var(--page-fg)" }}>
            {name}
          </p>
          <p className="mt-0.5 text-[12px] leading-snug" style={{ color: "var(--page-fg-faint)" }}>
            {role}
          </p>
          <p className="text-[12px]" style={{ color: "var(--page-fg-faint)" }}>
            {company}
          </p>
        </div>
        {showImage && (
          <div
            className="relative h-[64px] w-[52px] shrink-0 overflow-hidden"
            style={{ border: "1px solid var(--page-border)" }}
          >
            <PortraitGradient variant={gradientVariant} />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[1]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 42%, rgba(0,0,0,0.14) 100%)",
              }}
            />
            <Image
              src={portrait}
              alt=""
              aria-hidden="true"
              fill
              className="pointer-events-none absolute z-[2] object-cover opacity-80"
              style={{
                objectPosition,
                transform: `translateY(${portraitTranslateY}) scale(${(portraitScale * 1.04).toFixed(3)})`,
                transformOrigin: portraitTransformOrigin,
                filter: "grayscale(1) brightness(0.14) contrast(1.45) blur(1px)",
              }}
              unoptimized
            />
            <Image
              src={portrait}
              alt={name}
              fill
              className="relative z-[3] object-cover"
              style={{
                objectPosition,
                transform: `translateY(${portraitTranslateY}) scale(${portraitScale})`,
                transformOrigin: portraitTransformOrigin,
                filter: "contrast(1.03) brightness(0.98)",
              }}
              onError={() => setShowImage(false)}
              unoptimized
            />
          </div>
        )}
      </div>
      {/* Quote */}
      <p className="text-[13px] leading-[1.75]" style={{ color: "var(--page-fg-muted)" }}>
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  )
}

function WorkCard({
  title,
  desc,
  image,
  imageClassName,
  imageFrameClassName,
  imageWidth = 280,
  imageHeight = 580,
  href = "#",
  noBorderRight,
}: {
  title: string
  desc: string
  image?: string
  imageClassName?: string
  imageFrameClassName?: string
  imageWidth?: number
  imageHeight?: number
  href?: string
  noBorderRight?: boolean
}) {
  const [imgError, setImgError] = useState(false)
  const showImage = image && !imgError

  return (
    <a
      href={href}
      className={`group flex flex-col gap-4 overflow-hidden px-4 pt-4 pb-0 transition-colors duration-300 sm:gap-5 sm:px-6 sm:pt-5 ${
        showImage ? "md:h-[410px]" : ""
      } ${noBorderRight ? "" : "border-b md:border-r md:border-b-0"}`}
      style={{
        borderColor: "var(--page-border)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--page-surface)")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
    >
      {/* Text + arrow */}
      <div className="flex flex-col gap-1.5">
        <h3
          className="text-[18px] font-semibold leading-snug"
          style={{ color: "var(--page-fg)" }}
        >
          {title}
        </h3>
        <p className="text-[13px] leading-relaxed" style={{ color: "var(--page-fg-faint)" }}>
          {desc}
        </p>
        <div className="mt-3">
          <span
            className="flex h-9 w-9 items-center justify-center border text-[15px] transition-colors duration-300"
            style={{ borderColor: "var(--page-border)", color: "var(--page-fg-muted)" }}
          >
            <span className="inline-flex transform-gpu transition-transform duration-200 ease-out will-change-transform group-hover:-rotate-45 motion-reduce:transform-none motion-reduce:transition-none">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M5 12h12" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </span>
        </div>
      </div>

      {/* Preview image — rendered larger than card so bottom is clipped by overflow-hidden */}
      {showImage && (
        <div className="mt-auto flex shrink-0 justify-start">
          <div
            className={imageFrameClassName}
            style={{ boxShadow: "0 0 0 2px var(--page-border)" }}
          >
            <Image
              src={image}
              alt={title}
              width={imageWidth}
              height={imageHeight}
              className={`block w-full ${
                imageClassName ?? "max-w-[220px] sm:max-w-[240px] md:max-w-[260px]"
              }`}
              style={{ height: "auto" }}
              onError={() => setImgError(true)}
              unoptimized
            />
          </div>
        </div>
      )}
    </a>
  )
}

/* ════════════════════════════════════════════
   Icons
   ════════════════════════════════════════════ */

const ic = {
  activity: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
  ),
  wallet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
  ),
  readcv: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block h-3.5 w-3.5 align-[-2px]" style={{ color: "var(--page-fg-ghost)" }}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
  ),
}

/* ════════════════════════════════════════════
   Data
   ════════════════════════════════════════════ */

type SelectedWorkItem = {
  title: string
  desc: string
  image: string
  imageClassName?: string
  imageFrameClassName?: string
  imageWidth?: number
  imageHeight?: number
}

const selected: SelectedWorkItem[] = [
  {
    title: "Intelligent Activity Log Analyzer",
    desc: "AI-powered audit intelligence",
    image: "/work/activity-log-analyzer-dashboard-v2.png",
    imageClassName: "max-w-none",
    imageFrameClassName:
      "w-full overflow-hidden h-[220px] sm:h-[290px] md:h-[275px]",
    imageWidth: 2278,
    imageHeight: 3121,
  },
  {
    title: "Restructuring Team Settings",
    desc: "Enterprise admin experience",
    image: "/work/team-settings-user-management.png",
    imageClassName: "max-w-none",
    imageFrameClassName:
      "w-full overflow-hidden h-[220px] sm:h-[290px] md:h-[275px]",
    imageWidth: 1442,
    imageHeight: 2033,
  },
]
const projects = [
  { title: "Student Event Discovery", desc: "Campus connection platform", icon: ic.users },
  { title: "Pay Period Manager", desc: "Personal finance tool", icon: ic.wallet },
]
const experience = [
  { place: "Innovation Hub, UofT", role: "UX Designer", time: "Jan -- Apr 2026", icon: ic.briefcase },
  { place: "Autodesk", role: "Experience Design Intern", time: "May -- Aug 2025", icon: ic.briefcase },
  { place: "WeHear", role: "UX Design Intern", time: "Jan -- Apr 2024", icon: ic.briefcase },
]
const connect = [
  { handle: "rishiasharv@gmail.com", platform: "Email", href: "mailto:rishiasharv@gmail.com", icon: ic.mail },
  { handle: "rishiashar", platform: "GitHub", href: "https://github.com/rishiashar", icon: ic.github },
  { handle: "Rishi Ashar", platform: "LinkedIn", href: "https://linkedin.com", icon: ic.linkedin },
  { handle: "rishiashar", platform: "X.com", href: "https://x.com", icon: ic.x },
  { handle: "rishiashar", platform: "Read.cv", href: "https://read.cv", icon: ic.readcv },
]

type ToolItem = {
  name: string
  kind: "tool" | "stack"
}

const tools: ToolItem[] = [
  { name: "Figma", kind: "tool" },
  { name: "Cursor", kind: "tool" },
  { name: "Claude Code", kind: "tool" },
  { name: "Framer", kind: "tool" },
  { name: "Miro", kind: "tool" },
  { name: "ChatGPT", kind: "tool" },
  { name: "MCP", kind: "tool" },
  { name: "Lovable", kind: "tool" },
  { name: "Gemini", kind: "tool" },
]

const techStack: ToolItem[] = [
  { name: "Codex", kind: "stack" },
  { name: "Next.js", kind: "stack" },
]

const testimonials = [
  {
    name: "Renata Lewis",
    role: "Principal Experience Designer",
    company: "Autodesk",
    quote:
      "I was so impressed by his talent and initiative. He quickly ramped up on a complex project and delivered high-quality design work. He also went above and beyond to find creative ways to experiment with AI and proposed thoughtful new solutions.",
    portrait: "/portraits/renata.png",
    objectPosition: "50% 18%",
    gradientVariant: "aqua" as const,
  },
  {
    name: "Kanishka Patel",
    role: "CEO & Co-Founder",
    company: "WeHear Innovations",
    quote:
      "Rishi was an exceptional UX Designer intern at WeHear. His dedication and innovative user testing techniques significantly improved our product. His creativity and teamwork made a big impact on our projects.",
    portrait: "/portraits/kanishka.png",
    objectPosition: "50% 8%",
    portraitScale: 2.28,
    portraitTranslateY: "8%",
    portraitTransformOrigin: "50% 18%",
    gradientVariant: "ember" as const,
  },
]

/* ════════════════════════════════════════════
   Page
   ════════════════════════════════════════════ */

export default function Home() {
  useEffect(() => {
    const syncTheme = () => {
      applyResolvedTheme()
    }

    const mediaQuery = window.matchMedia(THEME_MEDIA_QUERY)
    const handleSystemThemeChange = () => {
      if (getStoredThemePreference() !== null) {
        return
      }

      syncTheme()
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key && event.key !== THEME_STORAGE_KEY) {
        return
      }

      syncTheme()
    }

    syncTheme()
    mediaQuery.addEventListener("change", handleSystemThemeChange)
    window.addEventListener("storage", handleStorage)

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange)
      window.removeEventListener("storage", handleStorage)
    }
  }, [])

  return (
    <main
      className="min-h-[100dvh] transition-colors duration-500"
      style={{ backgroundColor: "var(--page-frame-bg)", color: "var(--page-fg)", overflowX: "clip" }}
    >
      <div
        className="mx-auto min-h-[100dvh] max-w-[780px] border-x transition-colors duration-500"
        style={{
          backgroundColor: "var(--page-bg)",
          borderColor: "var(--page-border)",
        }}
      >
        <div className="px-4 pb-20 pt-8 sm:px-6 sm:pb-28 sm:pt-10">
        {/* ── Header: two-column ── */}
        <Fade>
          <header className="mb-0 grid grid-cols-1 gap-10 pb-10 md:grid-cols-[1fr_280px]">
            {/* Left: bio */}
            <div>
              <div className="mb-8">
                <h1 className="font-heading text-[20px] font-bold leading-tight" style={{ color: "var(--page-fg)" }}>
                  Rishi Ashar
                </h1>
                <p className="mt-0.5 text-[14px]" style={{ color: "var(--page-fg-faint)" }}>
                  Design Engineer
                </p>
              </div>

              <div className="max-w-[440px] space-y-5 text-[14px] leading-[1.75]" style={{ color: "var(--page-fg-muted)" }}>
                <p>
                  Currently an Experience Designer in Toronto, designing and
                  prototyping ideas using AI and emerging tools.
                </p>
                <p>
                  Previously at{" "}
                  <strong className="font-semibold" style={{ color: "var(--page-fg)" }}>Autodesk</strong>,{" "}
                  <strong className="font-semibold" style={{ color: "var(--page-fg)" }}>WeHear</strong>, and{" "}
                  <strong className="font-semibold" style={{ color: "var(--page-fg)" }}>Innovation Hub, UofT</strong>.
                </p>
                <p>
                  Building interfaces where intelligence feels native, not
                  bolted on. Exploring what design becomes when AI is a
                  first-class material.
                </p>
              </div>

              <p className="mt-6 text-[13px] leading-relaxed" style={{ color: "var(--page-fg-faint)" }}>
                Reach me at{" "}
                <a
                  href="mailto:rishiasharv@gmail.com"
                  className="font-medium underline underline-offset-[3px] transition-colors duration-500"
                  style={{ color: "var(--page-fg)", textDecorationColor: "var(--page-border)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecorationColor = "var(--page-fg)")}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecorationColor = "var(--page-border)")}
                >
                  rishiasharv@gmail.com
                </a>{" "}
                {ic.link}{" "}
                or dm on{" "}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-[3px] transition-colors duration-500"
                  style={{ color: "var(--page-fg)", textDecorationColor: "var(--page-border)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecorationColor = "var(--page-fg)")}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecorationColor = "var(--page-border)")}
                >
                  x.com
                </a>
              </p>
            </div>

            {/* Right: widgets */}
            <div className="flex flex-col gap-4">
              {/* Icon row + clock */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <a
                    href="/about"
                    className="flex h-9 w-9 items-center justify-center transition-colors duration-300"
                    style={{ color: "var(--page-fg-faint)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--page-surface)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    aria-label="About me"
                  >
                    {ic.user}
                  </a>
                  <DarkToggle />
                </div>
                <LiveClock />
              </div>

              {/* Work carousel */}
              <WorkCarousel />

              {/* Commit graph */}
              <CommitGraph />
            </div>
          </header>
        </Fade>

        {/* ── Selected Work ── */}
        <Fade d={60}>
          <section className="mb-0">
            <Label>Selected Work</Label>
            <div
              className="-mx-4 grid grid-cols-1 items-start sm:-mx-6 md:grid-cols-2"
              style={{ borderTop: "1px solid var(--page-border)" }}
            >
              {selected.map((p, i) => (
                <WorkCard
                  key={i}
                  title={p.title}
                  desc={p.desc}
                  image={p.image}
                  imageClassName={p.imageClassName}
                  imageFrameClassName={p.imageFrameClassName}
                  imageWidth={p.imageWidth}
                  imageHeight={p.imageHeight}
                  noBorderRight={i === selected.length - 1}
                />
              ))}
            </div>
          </section>
        </Fade>

        {/* ── Projects ── */}
        <Fade d={120}>
          <section className="mb-14">
            <Label>Projects</Label>
            <div className="flex flex-col gap-1">
              {projects.map((p, i) => (
                <ListItem key={i} icon={p.icon} title={p.title} desc={p.desc} href="#" />
              ))}
            </div>
          </section>
        </Fade>

        {/* ── Experience ── */}
        <Fade d={180}>
          <section className="mb-14">
            <Label>Experience</Label>
            <div className="flex flex-col gap-1">
              {experience.map((e, i) => (
                <div key={i} className="flex flex-col gap-2 px-1 py-3 sm:flex-row sm:items-center sm:gap-4">
                  <div className="flex min-w-0 flex-1 items-center gap-4">
                    <IconBox>{e.icon}</IconBox>
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-medium" style={{ color: "var(--page-fg)" }}>{e.place}</p>
                      <p className="text-[13px]" style={{ color: "var(--page-fg-faint)" }}>{e.role}</p>
                    </div>
                  </div>
                  <span className="shrink-0 pl-14 text-[12px] sm:pl-0" style={{ color: "var(--page-fg-ghost)" }}>{e.time}</span>
                </div>
              ))}
            </div>
          </section>
        </Fade>

        {/* ── Testimonials ── */}
        <Fade d={240}>
          <section className="mb-0">
            <Label>Testimonials</Label>
            <div
              className="-mx-4 mt-2 grid grid-cols-1 sm:-mx-6 md:grid-cols-2"
              style={{ borderTop: "1px solid var(--page-border)" }}
            >
              {testimonials.map((t, i) => (
                <TestimonialCard
                  key={t.name}
                  {...t}
                  noBorderRight={i === testimonials.length - 1}
                />
              ))}
            </div>
          </section>
        </Fade>

        {/* ── Tools + Tech Stack ── */}
        <Fade d={300}>
          <section className="mb-14">
            <Label>Tools and Tech Stack</Label>
            <ToolsCarousel />
          </section>
        </Fade>

        {/* ── Connect ── */}
        <Fade d={360}>
          <section className="mb-14">
            <Label>Connect</Label>
            <div className="flex flex-col gap-1">
              {connect.map((c, i) => (
                <ListItem key={i} icon={c.icon} title={c.handle} desc={c.platform} href={c.href} external={!c.href.startsWith("mailto")} />
              ))}
            </div>
          </section>
        </Fade>

        {/* ── Footer ── */}
        <Fade d={420}>
          <footer className="relative pt-8">
            {/* Full-bleed divider line */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 h-px w-screen -translate-x-1/2"
              style={{ backgroundColor: "var(--page-border)" }}
            />
            {/* + at left frame-border intersection */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-6 top-0 -translate-x-1/2 -translate-y-1/2 select-none text-[22px] leading-none"
              style={{ color: "var(--page-fg-muted)" }}
            >
              +
            </span>
            {/* + at right frame-border intersection */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-6 top-0 -translate-y-1/2 translate-x-1/2 select-none text-[22px] leading-none"
              style={{ color: "var(--page-fg-muted)" }}
            >
              +
            </span>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]" style={{ color: "var(--page-fg-ghost)" }}>
              <span>&copy; 2026 Rishi Ashar</span>
              <span>&middot;</span>
              <span>Toronto, ON</span>
            </div>
          </footer>
        </Fade>
        </div>
      </div>
    </main>
  )
}

/* ════════════════════════════════════════════
   Shared sub-components
   ════════════════════════════════════════════ */

function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center border"
      style={{ borderColor: "var(--page-border)", color: "var(--page-fg-faint)" }}
    >
      {children}
    </span>
  )
}

function ToolMark({ name }: { name: string }) {
  switch (name) {
    case "Figma":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
          <path d="M8 2a4 4 0 0 0 0 8h4V2H8Zm0 10a4 4 0 1 0 4 4v-4H8Zm4-10h4a4 4 0 1 1 0 8h-4V2Zm0 10h4a4 4 0 1 1-4 4v-4Z" />
        </svg>
      )
    case "Cursor":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
          <path d="M4 3.5v14.2l4.48-4.22 3.02 6.5 2.08-.96-3.03-6.48 6.45-.96L4 3.5Z" />
        </svg>
      )
    case "Claude Code":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
          <path d="M8 8 4.5 12 8 16" />
          <path d="M16 8 19.5 12 16 16" />
          <path d="M12 6.25 12.75 8l1.75.75-1.75.75L12 11.25 11.25 9.5 9.5 8.75 11.25 8 12 6.25Z" fill="currentColor" stroke="none" />
        </svg>
      )
    case "Framer":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
          <path d="M7 3h10v4h-6v3h6v4h-6v7H7v-7h4v-4H7V3Z" />
        </svg>
      )
    case "Miro":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
          <path d="M5 4h3L6.6 20H3.6L5 4Zm4 0h4L11.6 20H7.6L9 4Zm5 0h3L15.6 20h-3L14 4Zm4 0h2l-1 10h-2l1-10Z" />
        </svg>
      )
    case "ChatGPT":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
          <circle cx="12" cy="12" r="2.25" />
          <path d="M12 4.25 14.1 6" />
          <path d="M19.75 12 18 14.1" />
          <path d="M12 19.75 9.9 18" />
          <path d="M4.25 12 6 9.9" />
          <path d="M6.65 6.65 9.1 7.55" />
          <path d="M17.35 6.65 14.9 7.55" />
          <path d="M17.35 17.35 14.9 16.45" />
          <path d="M6.65 17.35 9.1 16.45" />
        </svg>
      )
    case "MCP":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
          <circle cx="6" cy="8" r="2" />
          <circle cx="18" cy="6" r="2" />
          <circle cx="18" cy="18" r="2" />
          <circle cx="8" cy="18" r="2" />
          <path d="M7.7 9.2 10.3 16.8" />
          <path d="M8 8.5 16 6.5" />
          <path d="M10 18h6" />
        </svg>
      )
    case "Lovable":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
          <path d="m12 21.2-1.45-1.32C5.4 15.2 2 12.1 2 8.3 2 5.2 4.42 3 7.3 3c1.63 0 3.19.78 4.2 2.01C12.51 3.78 14.07 3 15.7 3 18.58 3 21 5.2 21 8.3c0 3.8-3.4 6.9-8.55 11.58L12 21.2Z" />
        </svg>
      )
    case "Gemini":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
          <path d="m8.25 2.5 1.45 3.8 3.8 1.45-3.8 1.45-1.45 3.8L6.8 9.2 3 7.75 6.8 6.3l1.45-3.8Z" />
          <path d="m16.75 10.5 1.15 2.9 2.9 1.15-2.9 1.15-1.15 2.9-1.15-2.9-2.9-1.15 2.9-1.15 1.15-2.9Z" />
        </svg>
      )
    case "Codex":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
          <path d="M8 8 4 12l4 4" />
          <path d="M16 8 20 12l-4 4" />
          <path d="M14 5 10 19" />
        </svg>
      )
    case "Next.js":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
          <circle cx="12" cy="12" r="9" />
          <path d="M8.5 16V8l7 8V8" />
        </svg>
      )
    default:
      return (
        <span className="font-mono text-[10px] font-semibold tracking-tight">
          {name.slice(0, 2)}
        </span>
      )
  }
}

function ToolsCarousel() {
  const allItems = [...tools, ...techStack]
  // Duplicate so the scroll loops seamlessly (animate -50% = exactly one full set)
  const doubled = [...allItems, ...allItems]

  return (
    <>
      <style>{`
        @keyframes carousel-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .carousel-track {
          animation: carousel-scroll 28s linear infinite;
          will-change: transform;
        }
        .carousel-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .carousel-track { animation: none; }
        }
      `}</style>
      {/* Full-bleed overflow container with edge fades */}
      <div
        className="-mx-4 overflow-hidden sm:-mx-6"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div className="carousel-track flex w-max items-center gap-3 px-4 py-5 sm:px-6">
          {doubled.map((item, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center gap-3 border px-4 py-2.5 transition-colors duration-300"
              style={{ borderColor: "var(--page-border)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--page-surface)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <span
                className="flex h-[20px] w-[20px] shrink-0 items-center justify-center"
                style={{ color: "var(--page-fg-muted)" }}
              >
                <ToolMark name={item.name} />
              </span>
              <span
                className="whitespace-nowrap text-[13px]"
                style={{ color: "var(--page-fg)" }}
              >
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function ListItem({
  icon,
  title,
  desc,
  href,
  external,
}: {
  icon: React.ReactNode
  title: string
  desc: string
  href: string
  external?: boolean
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex items-start gap-4 px-1 py-3 transition-colors duration-300 sm:items-center"
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = "var(--page-hover)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "transparent")
      }
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center border transition-colors duration-300"
        style={{ borderColor: "var(--page-border)", color: "var(--page-fg-faint)" }}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="break-words text-[14px] font-medium" style={{ color: "var(--page-fg)" }}>
          {title}
        </p>
        <p className="text-[13px]" style={{ color: "var(--page-fg-faint)" }}>
          {desc}
        </p>
      </div>
    </a>
  )
}
