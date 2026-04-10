"use client"

import { useEffect, useState } from "react"

const navItems = [
  { label: "Work", href: "/work", index: "01" },
  { label: "About", href: "/about", index: "02" },
  { label: "Contact", href: "/contact", index: "03" },
]

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  return (
    <>
      {/* Top bar */}
      <nav className="relative flex items-center justify-between py-6 animate-[rise_600ms_cubic-bezier(0.16,1,0.3,1)_both]">
        {/* Name / logo */}
        <a href="/" className="text-sm font-medium tracking-tight text-foreground">
          Rishi Ashar
        </a>

        {/* Desktop links — indexed editorial style */}
        <div className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-link group relative flex items-baseline gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              <span className="text-[10px] font-medium tabular-nums tracking-wider text-muted-foreground/40 transition-colors duration-200 group-hover:text-foreground/40">
                {item.index}
              </span>
              <span className="relative">
                {item.label}
                {/* Underline that draws in from left on hover */}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-foreground transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </span>
            </a>
          ))}

          {/* Email — separated by a thin vertical line */}
          <span className="h-3 w-px bg-foreground/10" />
          <a
            href="mailto:rishi@example.com"
            className="text-sm text-muted-foreground/60 transition-colors duration-200 hover:text-foreground"
          >
            rishi@example.com
          </a>
        </div>

        {/* Mobile menu trigger — text button, not hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground md:hidden"
          aria-label="Open menu"
        >
          <span>Menu</span>
          {/* Minimal 2-line icon */}
          <span className="flex flex-col gap-[5px]">
            <span className="block h-px w-4 bg-current" />
            <span className="block h-px w-3 bg-current" />
          </span>
        </button>
      </nav>

      {/* Full-screen mobile overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-background transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Gradient bar at top — matches main page */}
        <div className="gradient-bar h-[3px] w-full animate-[slide_8s_linear_infinite]" />

        {/* Close row */}
        <div className="flex items-center justify-between px-6 py-6">
          <span className="text-sm font-medium tracking-tight text-foreground">
            Rishi Ashar
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            aria-label="Close menu"
          >
            Close
          </button>
        </div>

        {/* Large typographic links */}
        <div className="flex flex-1 flex-col justify-center gap-2 px-6">
          {navItems.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`group flex items-baseline gap-4 border-b border-foreground/6 py-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                menuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{
                transitionDelay: menuOpen ? `${150 + i * 80}ms` : "0ms",
              }}
            >
              <span className="text-xs font-medium tabular-nums tracking-wider text-muted-foreground/40">
                {item.index}
              </span>
              <span className="font-heading text-5xl tracking-[-0.03em] text-foreground transition-colors duration-200 group-hover:text-muted-foreground">
                {item.label}
              </span>
            </a>
          ))}
        </div>

        {/* Bottom info */}
        <div className="flex items-center justify-between border-t border-foreground/6 px-6 py-6">
          <a
            href="mailto:rishi@example.com"
            className="text-sm text-muted-foreground"
          >
            rishi@example.com
          </a>
          <div className="flex gap-4 text-sm text-muted-foreground/60">
            <a href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
