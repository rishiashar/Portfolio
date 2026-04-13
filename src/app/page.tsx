"use client"

import { useEffect, useRef, useState, useCallback } from "react"

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
  const [dark, setDark] = useState(false)
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"))
  }, [])
  const toggle = useCallback(() => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }, [dark])
  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-300"
      style={{ color: "var(--page-fg-faint)" }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = "var(--page-surface)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "transparent")
      }
    >
      {dark ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
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
        borderRadius: 16,
        backgroundColor: "var(--page-surface)",
        height: 200,
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
          className="pointer-events-auto rounded-full px-5 py-2.5 text-[13px] font-medium text-white/90 backdrop-blur-xl"
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
            className="h-1.5 rounded-full transition-all duration-500"
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
    x: number
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
              className="w-full animate-pulse rounded-sm"
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
              className="w-full cursor-pointer rounded-sm transition-opacity duration-200"
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
                setHover({
                  idx: i,
                  x: rect.left - containerRect.left + rect.width / 2,
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
          className="pointer-events-none absolute z-10 rounded-lg px-3 py-2 shadow-lg"
          style={{
            left: Math.min(Math.max(hover.x, 60), (containerRef.current?.offsetWidth ?? 280) - 60),
            top: hover.y - 8,
            transform: "translate(-50%, -100%)",
            backgroundColor: "#1a1a1a",
            border: "1px solid #333",
            opacity: 1,
            transition: "opacity 150ms ease",
          }}
        >
          <p className="text-[13px] font-semibold text-white">
            {new Date(days[hover.idx].date + "T12:00:00").toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </p>
          <p className="text-[12px] font-medium" style={{ color: "#4ade80" }}>
            {days[hover.idx].count} commit{days[hover.idx].count !== 1 ? "s" : ""}
          </p>
          {Object.keys(days[hover.idx].repos).length > 0 && (
            <p className="text-[11px] text-[#888]">
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
    <div className="mb-5 flex items-center gap-3">
      <span
        className="shrink-0 text-[13px]"
        style={{ color: "var(--page-fg-faint)" }}
      >
        {children}
      </span>
      <div
        className="h-px w-full"
        style={{ backgroundColor: "var(--page-border)" }}
      />
    </div>
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

const selected = [
  { title: "Intelligent Activity Log Analyzer", desc: "AI-powered audit intelligence", icon: ic.activity },
  { title: "Restructuring Team Settings", desc: "Enterprise admin experience", icon: ic.settings },
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
const tools = ["Figma", "Cursor", "Claude Code", "Framer", "Miro", "ChatGPT", "MCP", "Lovable", "Gemini"]

/* ════════════════════════════════════════════
   Page
   ════════════════════════════════════════════ */

export default function Home() {
  // Hydrate dark mode from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "dark") document.documentElement.classList.add("dark")
  }, [])

  return (
    <main
      className="min-h-[100dvh] transition-colors duration-500"
      style={{ backgroundColor: "var(--page-bg)", color: "var(--page-fg)" }}
    >
      <div className="mx-auto max-w-[720px] px-6 pb-28 pt-10">
        {/* ── Header: two-column ── */}
        <Fade>
          <header className="mb-20 grid grid-cols-1 gap-10 md:grid-cols-[1fr_280px]">
            {/* Left: bio */}
            <div>
              <div className="mb-8">
                <h1 className="text-[16px] font-semibold leading-tight" style={{ color: "var(--page-fg)" }}>
                  Rishi Ashar
                </h1>
                <p className="mt-0.5 text-[14px]" style={{ color: "var(--page-fg-faint)" }}>
                  Experience Designer
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
                    className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-300"
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
          <section className="mb-14">
            <Label>Selected Work</Label>
            <div className="flex flex-col gap-1">
              {selected.map((p, i) => (
                <ListItem key={i} icon={p.icon} title={p.title} desc={p.desc} href="#" />
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
                <div key={i} className="flex items-center gap-4 px-1 py-3">
                  <IconBox>{e.icon}</IconBox>
                  <div className="flex-1">
                    <p className="text-[14px] font-medium" style={{ color: "var(--page-fg)" }}>{e.place}</p>
                    <p className="text-[13px]" style={{ color: "var(--page-fg-faint)" }}>{e.role}</p>
                  </div>
                  <span className="shrink-0 text-[12px]" style={{ color: "var(--page-fg-ghost)" }}>{e.time}</span>
                </div>
              ))}
            </div>
          </section>
        </Fade>

        {/* ── Tools ── */}
        <Fade d={240}>
          <section className="mb-14">
            <Label>Tools</Label>
            <div className="flex flex-wrap gap-2 px-1 pt-1">
              {tools.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300"
                  style={{
                    backgroundColor: "var(--page-surface)",
                    color: "var(--page-fg-muted)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--page-surface-hover)"
                    e.currentTarget.style.color = "var(--page-fg)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--page-surface)"
                    e.currentTarget.style.color = "var(--page-fg-muted)"
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </section>
        </Fade>

        {/* ── Connect ── */}
        <Fade d={300}>
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
        <Fade d={360}>
          <footer
            className="flex items-center gap-3 pt-6 text-[13px]"
            style={{ color: "var(--page-fg-ghost)" }}
          >
            <span>&copy; 2026 Rishi Ashar</span>
            <span>&middot;</span>
            <span>Toronto, ON</span>
          </footer>
        </Fade>
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
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
      style={{ backgroundColor: "var(--page-surface)", color: "var(--page-fg-faint)" }}
    >
      {children}
    </span>
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
      className="group flex items-center gap-4 rounded-lg px-1 py-3 transition-colors duration-300"
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = "var(--page-hover)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "transparent")
      }
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300"
        style={{ backgroundColor: "var(--page-surface)", color: "var(--page-fg-faint)" }}
      >
        {icon}
      </span>
      <div>
        <p className="text-[14px] font-medium" style={{ color: "var(--page-fg)" }}>
          {title}
        </p>
        <p className="text-[13px]" style={{ color: "var(--page-fg-faint)" }}>
          {desc}
        </p>
      </div>
    </a>
  )
}
