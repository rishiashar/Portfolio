import type { Metadata } from "next"
import { Bricolage_Grotesque, Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import { cn } from "@/lib/utils"
import "@/styles/globals.css"
import "@/styles/dark-mode-overrides.css"

const themeInitScript = `
(() => {
  try {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = savedTheme === "dark" || (savedTheme !== "light" && prefersDark);

    root.classList.toggle("dark", dark);
    root.style.colorScheme = dark ? "dark" : "light";
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
      className={cn("font-sans", inter.variable, bricolage.variable, playfair.variable)}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="text-foreground antialiased" style={{ backgroundColor: "var(--page-frame-bg)" }}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
