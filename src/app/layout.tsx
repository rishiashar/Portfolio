import type { Metadata } from "next"
import { Bricolage_Grotesque, Inter } from "next/font/google"

import { cn } from "@/lib/utils"
import "@/styles/globals.css"

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
      className={cn("font-sans", inter.variable, bricolage.variable)}
    >
      <body className="text-foreground antialiased" style={{ backgroundColor: "var(--page-frame-bg)" }}>
        {children}
      </body>
    </html>
  )
}
