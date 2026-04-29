import type { Metadata } from "next"
import { Bricolage_Grotesque, DM_Serif_Display, Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import { RouteMemory } from "@/components/route-memory"
import { ScrollBlurFade } from "@/components/scroll-blur-fade"
import { ThemePreferenceControl } from "@/components/theme-preference-control"
import { INTRO_SEEN_STORAGE_KEY } from "@/lib/intro"
import { cn } from "@/lib/utils"
import "@/styles/globals.css"
import "@/styles/dark-mode-overrides.css"

const themeInitScript = `
(() => {
  try {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const themePreference =
      savedTheme === "system" || savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : "system";
    const theme =
      themePreference === "dark"
        ? "dark"
        : themePreference === "light"
          ? "light"
          : prefersDark
            ? "dark"
            : "light";

    root.dataset.themePreference = themePreference;
    root.dataset.themeMode = theme;
    root.dataset.introSeen =
      localStorage.getItem("${INTRO_SEEN_STORAGE_KEY}") === "true"
        ? "true"
        : "false";
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme === "dark" ? "dark" : "light";
  } catch {}
})();
`

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
})

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["italic"],
  weight: ["400", "700"],
})

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  style: ["normal", "italic"],
  weight: ["400"],
})

export const metadata: Metadata = {
  applicationName: "Rishi Ashar",
  title: {
    default: "Rishi Ashar — AI-First Designer",
    template: "%s | Rishi Ashar",
  },
  description:
    "AI-first designer crafting interfaces where intelligence feels intuitive.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "font-sans antialiased",
        inter.variable,
        bricolage.variable,
        playfair.variable,
        dmSerif.variable
      )}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&display=swap"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="text-foreground antialiased" style={{ backgroundColor: "var(--page-frame-bg)" }}>
        {children}
        <div
          className="fixed z-50"
          style={{
            bottom: "max(1rem, env(safe-area-inset-bottom))",
            left: "max(1rem, calc(50vw - 390px + 1rem))",
            filter:
              "drop-shadow(0 10px 24px color-mix(in srgb, var(--page-fg) 10%, transparent))",
          }}
        >
          <ThemePreferenceControl />
        </div>
        <RouteMemory />
        <ScrollBlurFade />
        <Analytics />
      </body>
    </html>
  )
}
