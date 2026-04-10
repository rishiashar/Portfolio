import type { Metadata } from "next"
import { Cormorant_Garamond, Outfit } from "next/font/google"

import { cn } from "@/lib/utils"
import "@/styles/globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
})

export const metadata: Metadata = {
  applicationName: "Rishi Ashar",
  title: {
    default: "Rishi Ashar — AI-First Designer",
    template: "%s | Rishi Ashar",
  },
  description: "AI-first designer crafting interfaces where intelligence feels intuitive.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", outfit.variable, cormorant.variable)}
    >
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
