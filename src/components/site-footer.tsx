"use client"

import Image from "next/image"
import { PlusMark } from "@/components/plus-mark"
import { ThemePreferenceControl } from "@/components/theme-preference-control"

type SiteFooterProps = {
  className?: string
}

export function SiteFooter({ className = "" }: SiteFooterProps) {
  return (
    <footer className={`relative pt-12 sm:pt-14 ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-screen -translate-x-1/2"
        style={{ backgroundColor: "var(--page-border)" }}
      />
      <PlusMark
        edge="left"
        className="absolute -left-4 top-0 -translate-x-1/2 -translate-y-1/2 sm:-left-6"
        style={{ color: "var(--page-fg-faint)" }}
        size={10}
      />
      <PlusMark
        edge="right"
        className="absolute -right-4 top-0 translate-x-1/2 -translate-y-1/2 sm:-right-6"
        style={{ color: "var(--page-fg-faint)" }}
        size={10}
      />

      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end sm:gap-10">
        <ThemePreferenceControl />
        <p
          className="text-[13px] leading-[1.6] sm:text-right"
          style={{ color: "var(--page-fg-ghost)" }}
        >
          &copy; 2026 Rishi Ashar. All rights reserved.
        </p>
      </div>

      <div
        aria-hidden="true"
        className="relative -mx-4 -mb-20 mt-16 overflow-hidden sm:-mx-6 sm:-mb-28 sm:mt-20"
      >
        <Image
          src="/footer-hand.svg"
          alt=""
          unoptimized
          loading="lazy"
          width={2806}
          height={1504}
          className="footer-hand pointer-events-none block h-auto w-full select-none"
        />
        <style>{`
          .footer-hand {
            filter: grayscale(1) contrast(1.02);
            opacity: 0.9;
            mix-blend-mode: multiply;
          }
          :root.dark .footer-hand {
            filter: grayscale(1) invert(1) brightness(1.05) contrast(0.95);
            opacity: 0.55;
            mix-blend-mode: screen;
          }
        `}</style>
      </div>
    </footer>
  )
}
