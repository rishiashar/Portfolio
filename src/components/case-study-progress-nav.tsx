"use client"

import { useEffect, useMemo, useState } from "react"

type CaseStudySection = {
  id: string
  label: string
}

export function CaseStudyProgressNav({
  sections,
}: {
  sections: readonly CaseStudySection[]
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "")

  useEffect(() => {
    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.3
      let currentId = sections[0]?.id ?? ""

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        if (rect.top <= marker) {
          currentId = section.id
        }
      }

      setActiveId(currentId)
    }

    updateActiveSection()
    const syncAfterPaint = window.setTimeout(updateActiveSection, 120)

    window.addEventListener("scroll", updateActiveSection, { passive: true })
    window.addEventListener("resize", updateActiveSection)

    return () => {
      window.clearTimeout(syncAfterPaint)
      window.removeEventListener("scroll", updateActiveSection)
      window.removeEventListener("resize", updateActiveSection)
    }
  }, [sections])

  const activeIndex = Math.max(
    0,
    sections.findIndex((section) => section.id === activeId)
  )
  const progress = useMemo(() => {
    if (sections.length <= 1) return 0
    return activeIndex / (sections.length - 1)
  }, [activeIndex, sections.length])

  if (sections.length === 0) {
    return null
  }

  return (
    <aside
      className="fixed top-28 z-30 hidden w-[194px] xl:block"
      style={{
        left: "max(22px, calc(50vw - 390px - 226px))",
      }}
    >
      <nav aria-label="On this page">
        <div
          className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: "var(--page-fg-faint)" }}
        >
          <svg
            aria-hidden="true"
            className="h-[18px] w-[18px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <path d="M6 3h8l4 4v14H6z" />
            <path d="M14 3v5h4" />
            <path d="M9 14h6" />
            <path d="M9 18h3" />
          </svg>
          <span>On this page</span>
        </div>

        <div className="relative mt-7 pl-11">
          <span
            aria-hidden="true"
            className="absolute left-[13px] top-5 bottom-5 w-px"
            style={{ backgroundColor: "var(--page-border)" }}
          />
          <span
            aria-hidden="true"
            className="absolute left-[13px] top-5 w-px origin-top transition-[height] duration-300 ease-out"
            style={{
              backgroundColor: "var(--page-fg-muted)",
              height: `calc((100% - 40px) * ${progress})`,
            }}
          />

          <div className="space-y-1">
            {sections.map((section, index) => {
              const active = section.id === activeId
              const complete = index < activeIndex

              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  aria-current={active ? "location" : undefined}
                  className="group relative block min-h-10 py-2 text-[13px] leading-[1.25] transition-[color,transform] duration-200 hover:translate-x-0.5"
                  style={{
                    color: active
                      ? "var(--page-fg)"
                      : complete
                        ? "var(--page-fg-muted)"
                        : "var(--page-fg-faint)",
                    fontWeight: active ? 650 : 450,
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 h-[9px] w-[9px] -translate-y-1/2 rounded-full transition-[background-color,box-shadow,transform] duration-200"
                    style={{
                      left: "-34px",
                      backgroundColor: active
                        ? "var(--page-fg)"
                        : complete
                          ? "var(--page-fg-muted)"
                          : "var(--page-border)",
                      boxShadow: active
                        ? "0 0 0 4px var(--page-bg), 0 0 0 5px var(--page-border)"
                        : "0 0 0 4px var(--page-bg)",
                      transform: active
                        ? "translateY(-50%) scale(1.18)"
                        : "translateY(-50%) scale(1)",
                    }}
                  />
                  {section.label}
                </a>
              )
            })}
          </div>
        </div>
      </nav>
    </aside>
  )
}
