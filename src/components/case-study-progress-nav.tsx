"use client"

import type { Route } from "next"
import { useRouter } from "next/navigation"
import type { MouseEvent } from "react"
import { useEffect, useState } from "react"
import { PlusMark } from "@/components/plus-mark"
import { PREVIOUS_PAGE_STORAGE_KEY } from "@/lib/route-memory"
import { playCaseStudyNavHoverSound } from "@/lib/ui-sounds"

type CaseStudySection = {
  id: string
  label: string
}

type BackTarget = {
  href: string
  label: string
}

type NavigationHistoryEntrySnapshot = {
  index?: number
  url?: string
}

type WindowWithNavigation = Window & {
  navigation?: {
    currentEntry?: NavigationHistoryEntrySnapshot | null
    entries?: () => NavigationHistoryEntrySnapshot[]
  }
}

function getSameOriginUrl(value?: string) {
  if (!value) return null

  try {
    const url = new URL(value, window.location.origin)
    return url.origin === window.location.origin ? url : null
  } catch {
    return null
  }
}

function getBackLabelFromUrl(url: URL) {
  if (url.pathname === "/") {
    return "home"
  }

  return url.pathname
    .split("/")
    .filter(Boolean)
    .pop()
    ?.replaceAll("-", " ") ?? "work"
}

function getHistoryBackUrl() {
  const navigation = (window as WindowWithNavigation).navigation
  const entries = navigation?.entries?.()

  if (!entries?.length) return null

  const currentIndex =
    typeof navigation?.currentEntry?.index === "number"
      ? navigation.currentEntry.index
      : entries.findIndex((entry) => entry.url === window.location.href)

  for (let index = currentIndex - 1; index >= 0; index -= 1) {
    const url = getSameOriginUrl(entries[index]?.url)

    if (url && url.pathname !== window.location.pathname) {
      return url
    }
  }

  return null
}

function getStoredBackUrl() {
  try {
    const storedPreviousPage = sessionStorage.getItem(PREVIOUS_PAGE_STORAGE_KEY)
    const url = getSameOriginUrl(storedPreviousPage ?? undefined)

    return url?.pathname !== window.location.pathname ? url : null
  } catch {
    return null
  }
}

function getBackTarget(fallbackHref: Route): BackTarget {
  const previousUrl = getHistoryBackUrl()
  const storedUrl = getStoredBackUrl()
  const referrerUrl = getSameOriginUrl(document.referrer)
  const targetUrl =
    previousUrl ??
    storedUrl ??
    (referrerUrl?.pathname !== window.location.pathname ? referrerUrl : null)

  if (!targetUrl) {
    return { href: fallbackHref, label: "work" }
  }

  return {
    href: `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`,
    label: getBackLabelFromUrl(targetUrl),
  }
}

type SwapPhase = "rest" | "exit" | "enter-start"

const TEXT_SWAP_FALLBACK_MS = 200

function getTextSwapDurationMs() {
  if (typeof window === "undefined") return TEXT_SWAP_FALLBACK_MS

  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--text-swap-dur")
    .trim()

  if (!raw) return TEXT_SWAP_FALLBACK_MS

  const parsed = parseFloat(raw)
  if (Number.isNaN(parsed)) return TEXT_SWAP_FALLBACK_MS

  // The CSS value can be "200ms" or "0.2s" — normalize to ms.
  return raw.endsWith("s") && !raw.endsWith("ms") ? parsed * 1000 : parsed
}

export function CaseStudyProgressNav({
  sections,
  backHref = "/#projects",
}: {
  sections: readonly CaseStudySection[]
  backHref?: Route
}) {
  const router = useRouter()
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "")
  const [backTarget, setBackTarget] = useState<BackTarget>({
    href: backHref,
    label: "work",
  })
  const [displayedBackLabel, setDisplayedBackLabel] = useState("work")
  const [swapPhase, setSwapPhase] = useState<SwapPhase>("rest")

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setBackTarget(getBackTarget(backHref))
    })

    return () => window.cancelAnimationFrame(frame)
  }, [backHref])

  // Three-phase text-states-swap from transitions-dev:
  //   1. Add .is-exit         — old text exits up with blur.
  //   2. After --text-swap-dur, swap textContent and add .is-enter-start
  //      (jumps to "below, no transition").
  //   3. After paint, drop .is-enter-start — new text animates back to rest.
  useEffect(() => {
    if (backTarget.label === displayedBackLabel) return

    setSwapPhase("exit")
    const duration = getTextSwapDurationMs()
    const swapTimer = window.setTimeout(() => {
      setDisplayedBackLabel(backTarget.label)
      setSwapPhase("enter-start")
    }, duration)

    return () => window.clearTimeout(swapTimer)
  }, [backTarget.label, displayedBackLabel])

  useEffect(() => {
    if (swapPhase !== "enter-start") return

    // Two RAFs guarantee the browser has painted the .is-enter-start state
    // before we remove the class, so the transition back to rest replays.
    let inner = 0
    const outer = window.requestAnimationFrame(() => {
      inner = window.requestAnimationFrame(() => {
        setSwapPhase("rest")
      })
    })

    return () => {
      window.cancelAnimationFrame(outer)
      window.cancelAnimationFrame(inner)
    }
  }, [swapPhase])

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

  const playHoverSound = () => {
    void playCaseStudyNavHoverSound()
  }

  const handleBackClick = () => {
    router.push(backTarget.href as Route)
  }

  const handleSectionClick = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    const section = document.getElementById(sectionId)
    if (!section) return

    event.preventDefault()
    setActiveId(sectionId)
    window.history.replaceState(null, "", `#${sectionId}`)
    section.scrollIntoView({
      block: "start",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    })
  }

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
      <button
        type="button"
        className="inline-flex cursor-pointer items-center gap-[0.32em] border-0 bg-transparent p-0 text-[12px] font-medium transition-colors hover:text-[color:var(--page-fg)]"
        style={{ color: "var(--page-fg-faint)" }}
        onClick={handleBackClick}
        onFocus={playHoverSound}
        onMouseEnter={playHoverSound}
      >
        <span>Back to</span>
        <span
          className={`t-text-swap ${
            swapPhase === "exit"
              ? "is-exit"
              : swapPhase === "enter-start"
                ? "is-enter-start"
                : ""
          }`}
        >
          {displayedBackLabel}
        </span>
      </button>

      <div
        aria-hidden="true"
        className="my-7 h-px w-full"
        style={{ backgroundColor: "var(--page-border)" }}
      />

      <nav aria-label="Case study sections">
        <ol className="space-y-[3px]">
          {sections.map((section, index) => {
            const active = section.id === activeId
            const past = index < activeIndex

            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={active ? "location" : undefined}
                  className="group relative block py-[6px] pl-[28px] transition-transform duration-200 hover:translate-x-[2px]"
                  onClick={(event) => handleSectionClick(event, section.id)}
                  onFocus={playHoverSound}
                  onMouseEnter={playHoverSound}
                >
                  <PlusMark
                    edge="full"
                    size={9}
                    stroke={1.25}
                    className="pointer-events-none absolute left-0 top-1/2 transition-[opacity,transform] duration-[420ms] ease-[cubic-bezier(0.65,0,0.2,1)]"
                    style={{
                      color: "var(--page-fg)",
                      opacity: active ? 1 : 0,
                      transform: `translateY(-50%) scale(${active ? 1 : 0.6}) rotate(${active ? 0 : -90}deg)`,
                    }}
                  />

                  <span
                    className="block text-[13px] leading-[1.3] transition-colors duration-300"
                    style={{
                      color: active
                        ? "var(--page-fg)"
                        : past
                          ? "var(--page-fg-muted)"
                          : "var(--page-fg-faint)",
                      fontWeight: active ? 600 : 450,
                    }}
                  >
                    {section.label}
                  </span>
                </a>
              </li>
            )
          })}
        </ol>
      </nav>
    </aside>
  )
}
