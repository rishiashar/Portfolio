"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

const navItems = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export function Navigation() {
  const [open, setOpen] = useState(false)

  // Lock scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // Close on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  return (
    <>
      {/* Top bar */}
      <div className="relative flex items-center justify-between py-6 animate-[rise_600ms_cubic-bezier(0.16,1,0.3,1)_both]">
        <a
          href="/"
          className="text-sm font-medium tracking-tight text-foreground"
        >
          Rishi Ashar
        </a>

        {/* Trigger — minimal, always visible */}
        <button
          onClick={() => setOpen(true)}
          className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
          aria-label="Open navigation"
        >
          <span className="hidden sm:inline">Menu</span>
          <span className="flex flex-col items-end gap-[5px]">
            <span className="block h-[1.5px] w-5 bg-current transition-all duration-300 group-hover:w-4" />
            <span className="block h-[1.5px] w-3.5 bg-current transition-all duration-300 group-hover:w-5" />
          </span>
        </button>
      </div>

      {/* Full-screen overlay nav */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-foreground/5 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Panel — slides in from right */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-background sm:w-[420px] sm:border-l sm:border-foreground/6"
            >
              {/* Gradient bar top */}
              <div className="gradient-bar h-[3px] w-full animate-[slide_8s_linear_infinite]" />

              {/* Close row */}
              <div className="flex items-center justify-between px-8 py-6">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
                  Navigation
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/8 text-muted-foreground transition-colors duration-200 hover:border-foreground/20 hover:text-foreground active:scale-[0.96]"
                  aria-label="Close navigation"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M11 3L3 11M3 3l8 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Nav links — large typography, staggered */}
              <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.1 + i * 0.06,
                    }}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline justify-between border-b border-foreground/5 py-5"
                  >
                    <span className="font-heading text-4xl font-bold tracking-tight text-foreground transition-colors duration-200 group-hover:text-muted-foreground sm:text-5xl">
                      {item.label}
                    </span>
                    <span className="text-sm text-muted-foreground/40 transition-transform duration-200 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </motion.a>
                ))}
              </nav>

              {/* Footer info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="flex flex-col gap-4 border-t border-foreground/5 px-8 py-8"
              >
                <a
                  href="mailto:rishi@example.com"
                  className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  rishi@example.com
                </a>
                <div className="flex gap-5 text-sm">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground/50 transition-colors duration-200 hover:text-foreground"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground/50 transition-colors duration-200 hover:text-foreground"
                  >
                    Twitter
                  </a>
                  <a
                    href="https://read.cv"
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground/50 transition-colors duration-200 hover:text-foreground"
                  >
                    Read.cv
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
