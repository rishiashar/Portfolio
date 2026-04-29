"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react"
import {
  applyThemePreference,
  getThemePreferenceSnapshot,
  getThemeSnapshot,
  subscribeToThemeChange,
  type ThemePreference,
} from "@/lib/theme"
import { playThemeToggleSound } from "@/lib/ui-sounds"

const THEME_SWITCH_DURATION_MS = 220

const themeOptions: Array<{
  mode: ThemePreference
  label: string
  Icon: typeof Monitor
}> = [
  { mode: "system", label: "Use system theme", Icon: Monitor },
  { mode: "light", label: "Use light theme", Icon: Sun },
  { mode: "dark", label: "Use dark theme", Icon: Moon },
]

export function ThemePreferenceControl() {
  const themePreference = useSyncExternalStore(
    subscribeToThemeChange,
    getThemePreferenceSnapshot,
    () => "system"
  )
  const transitionCleanupRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (transitionCleanupRef.current !== null) {
        window.clearTimeout(transitionCleanupRef.current)
      }
    }
  }, [])

  const updateThemePreference = useCallback((next: ThemePreference) => {
    const root = document.documentElement

    if (transitionCleanupRef.current !== null) {
      window.clearTimeout(transitionCleanupRef.current)
    }

    root.classList.add("theme-transition")
    applyThemePreference(next)
    void playThemeToggleSound(getThemeSnapshot())

    transitionCleanupRef.current = window.setTimeout(() => {
      root.classList.remove("theme-transition")
      transitionCleanupRef.current = null
    }, THEME_SWITCH_DURATION_MS)
  }, [])

  return (
    <div
      aria-label="Theme preference"
      className="inline-grid h-9 grid-cols-3 overflow-hidden border"
      role="group"
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--page-bg) 94%, var(--page-fg) 3%)",
        borderColor: "var(--page-border)",
        boxShadow: "var(--surface-shadow)",
      }}
    >
      {themeOptions.map(({ mode, label, Icon }, index) => {
        const active = themePreference === mode

        return (
          <button
            key={mode}
            type="button"
            aria-label={label}
            aria-pressed={active}
            title={label}
            className="flex h-9 w-9 cursor-pointer items-center justify-center border-0 bg-transparent p-0 transition-[background-color,color,transform] duration-200 hover:bg-[color:var(--page-hover)] focus-visible:relative focus-visible:z-10 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[-1px] focus-visible:outline-[color:var(--page-fg)] active:scale-[0.96]"
            style={{
              color: active ? "var(--page-bg)" : "var(--page-fg-faint)",
              backgroundColor: active ? "var(--page-fg)" : "transparent",
              borderLeft:
                index === 0 ? "0" : "1px solid var(--page-border)",
            }}
            onClick={() => updateThemePreference(mode)}
          >
            <Icon aria-hidden="true" size={15} strokeWidth={1.75} />
          </button>
        )
      })}
    </div>
  )
}
