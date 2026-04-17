export const THEME_STORAGE_KEY = "theme"
export const THEME_SYNC_EVENT = "theme-sync"
export const THEME_MEDIA_QUERY = "(prefers-color-scheme: dark)"
export const THEME_MODES = ["light", "dark"] as const

export type ThemeMode = (typeof THEME_MODES)[number]

export function isThemeMode(value: string | null | undefined): value is ThemeMode {
  return value === "light" || value === "dark"
}

export function subscribeToThemeChange(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {}
  }

  window.addEventListener(THEME_SYNC_EVENT, callback)
  return () => window.removeEventListener(THEME_SYNC_EVENT, callback)
}

export function getStoredThemePreference(): ThemeMode | null {
  if (typeof window === "undefined") {
    return null
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  return isThemeMode(storedTheme) ? storedTheme : null
}

export function getRootThemeMode(): ThemeMode {
  if (typeof document === "undefined") {
    return "light"
  }

  const root = document.documentElement
  const datasetTheme = root.dataset.themeMode

  if (isThemeMode(datasetTheme)) {
    return datasetTheme
  }

  return root.classList.contains("dark") ? "dark" : "light"
}

export function getThemeSnapshot(): ThemeMode {
  return getRootThemeMode()
}

export function resolveThemePreference(): ThemeMode {
  if (typeof window === "undefined") {
    return "light"
  }

  const storedTheme = getStoredThemePreference()
  if (storedTheme !== null) {
    return storedTheme
  }

  return window.matchMedia(THEME_MEDIA_QUERY).matches ? "dark" : "light"
}

export function applyThemeMode(theme: ThemeMode) {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return theme
  }

  const root = document.documentElement

  root.dataset.themeMode = theme
  root.classList.toggle("dark", theme === "dark")
  root.style.colorScheme = theme === "dark" ? "dark" : "light"
  window.dispatchEvent(new Event(THEME_SYNC_EVENT))

  return theme
}

export function applyResolvedTheme() {
  return applyThemeMode(resolveThemePreference())
}

export function getNextThemeMode(theme: ThemeMode): ThemeMode {
  return theme === "dark" ? "light" : "dark"
}
