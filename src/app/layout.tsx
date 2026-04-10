import type { Metadata } from "next";
import "@/styles/globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  applicationName: "Portfolio",
  title: {
    default: "Portfolio",
    template: "%s | Portfolio",
  },
  description: "A personal portfolio project built with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
