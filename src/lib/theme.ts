export const THEME_STORAGE_KEY = "theme"
export const THEME_SYNC_EVENT = "theme-sync"
export const THEME_MEDIA_QUERY = "(prefers-color-scheme: dark)"
export const THEME_MODES = ["light", "dark"] as const
export const THEME_PREFERENCES = ["system", "light", "dark"] as const

export type ThemeMode = (typeof THEME_MODES)[number]
export type ThemePreference = (typeof THEME_PREFERENCES)[number]

export function isThemeMode(value: string | null | undefined): value is ThemeMode {
  return value === "light" || value === "dark"
}

export function isThemePreference(
  value: string | null | undefined
): value is ThemePreference {
  return value === "system" || isThemeMode(value)
}

export function subscribeToThemeChange(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {}
  }

  window.addEventListener(THEME_SYNC_EVENT, callback)
  return () => window.removeEventListener(THEME_SYNC_EVENT, callback)
}

export function getStoredThemePreference(): ThemePreference | null {
  if (typeof window === "undefined") {
    return null
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  return isThemePreference(storedTheme) ? storedTheme : null
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

export function getThemePreferenceSnapshot(): ThemePreference {
  return getStoredThemePreference() ?? "system"
}

export function getThemeSnapshot(): ThemeMode {
  return getRootThemeMode()
}

function getSystemThemeMode(): ThemeMode {
  if (typeof window === "undefined") {
    return "light"
  }

  return window.matchMedia(THEME_MEDIA_QUERY).matches ? "dark" : "light"
}

export function resolveThemePreference(
  preference: ThemePreference = getThemePreferenceSnapshot()
): ThemeMode {
  return preference === "system" ? getSystemThemeMode() : preference
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

export function applyThemePreference(preference: ThemePreference) {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return preference
  }

  const root = document.documentElement

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, preference)
  } catch {}

  root.dataset.themePreference = preference
  applyThemeMode(resolveThemePreference(preference))

  return preference
}

export function applyResolvedTheme() {
  const preference = getThemePreferenceSnapshot()

  if (typeof document !== "undefined") {
    document.documentElement.dataset.themePreference = preference
  }

  return applyThemeMode(resolveThemePreference(preference))
}

export function getNextThemeMode(theme: ThemeMode): ThemeMode {
  return theme === "dark" ? "light" : "dark"
}
