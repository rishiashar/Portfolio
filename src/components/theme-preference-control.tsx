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
      className="inline-flex h-[34px] items-center gap-0.5 rounded-full p-0.5"
      role="group"
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--page-bg) 88%, var(--page-fg) 7%)",
        boxShadow:
          "inset 0 0 0 1px color-mix(in srgb, var(--page-fg) 9%, transparent)",
      }}
    >
      {themeOptions.map(({ mode, label, Icon }) => {
        const active = themePreference === mode

        return (
          <button
            key={mode}
            type="button"
            aria-label={label}
            aria-pressed={active}
            title={label}
            className="flex h-[28px] w-[34px] cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 transition-[background-color,box-shadow,color,transform] duration-200 hover:text-[color:var(--page-fg-muted)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--page-fg-faint)] active:scale-[0.96]"
            style={{
              color: active ? "var(--page-fg)" : "var(--page-fg-faint)",
              backgroundColor: active
                ? "color-mix(in srgb, var(--page-bg) 92%, var(--page-fg) 4%)"
                : "transparent",
              boxShadow: active
                ? "inset 0 0 0 1px #86aef7"
                : "none",
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
