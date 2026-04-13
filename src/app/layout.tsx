import type { Metadata } from "next"
import { DM_Serif_Display, DM_Sans } from "next/font/google"

import { cn } from "@/lib/utils"
import "@/styles/globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
})

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
  style: ["normal", "italic"],
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
      className={cn("font-sans", dmSans.variable, dmSerif.variable)}
    >
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
