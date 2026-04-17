"use client"

import { Dithering } from "@paper-design/shaders-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import {
  getThemeSnapshot,
  subscribeToThemeChange,
  type ThemeMode,
} from "@/lib/theme"

export function HomeHero() {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light")

  useEffect(() => {
    const sync = () => setThemeMode(getThemeSnapshot())
    sync()
    return subscribeToThemeChange(sync)
  }, [])

  const isDark = themeMode === "dark"
  const handImageFilter = isDark
    ? "grayscale(1) invert(1) brightness(1.08) contrast(0.92)"
    : "grayscale(1) brightness(0.72) contrast(1.02)"
  const handBlendMode = isDark ? "screen" : "multiply"
  const handDropShadow = isDark
    ? "drop-shadow(0 16px 28px rgba(0, 0, 0, 0.28))"
    : "drop-shadow(0 18px 30px rgba(17, 17, 17, 0.08))"
  const handMask =
    "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.96) 16%, rgba(0,0,0,0.96) 84%, transparent 100%)"

  return (
    <section className="relative -mx-4 overflow-hidden sm:-mx-6">
      {/* Shader background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {isDark ? (
          <Dithering
            speed={1}
            shape="swirl"
            type="8x8"
            size={1.2}
            scale={1.15}
            frame={22562}
            colorBack="#00000000"
            colorFront="#373737"
            style={{ height: "100%", width: "100%" }}
          />
        ) : (
          <Dithering
            speed={1}
            shape="swirl"
            type="8x8"
            size={1.2}
            scale={1}
            frame={22562}
            colorBack="#00000000"
            colorFront="#CECECE"
            style={{ height: "100%", width: "100%" }}
          />
        )}
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        aria-hidden="true"
      >
        <div
          className="absolute left-[-16%] top-[8%] w-[8rem] sm:left-[-14%] sm:top-[4%] sm:w-[13rem] md:left-[-12%] md:top-[3%] md:w-[17rem] lg:left-[-10%] lg:top-[2%] lg:w-[22rem]"
          style={{
            opacity: isDark ? 0.32 : 0.38,
            mixBlendMode: handBlendMode,
            filter: handDropShadow,
            WebkitMaskImage: handMask,
            maskImage: handMask,
            transform: "rotate(-34deg)",
            transformOrigin: "center",
          }}
        >
          <Image
            src="/hero/hero-hand-left.png"
            alt=""
            width={1792}
            height={2400}
            className="h-auto w-full select-none"
            style={{ filter: handImageFilter }}
          />
        </div>

        <div
          className="absolute right-[-16%] top-[8%] w-[8rem] sm:right-[-14%] sm:top-[4%] sm:w-[13rem] md:right-[-12%] md:top-[3%] md:w-[17rem] lg:right-[-10%] lg:top-[2%] lg:w-[22rem]"
          style={{
            opacity: isDark ? 0.32 : 0.38,
            mixBlendMode: handBlendMode,
            filter: handDropShadow,
            WebkitMaskImage: handMask,
            maskImage: handMask,
            transform: "rotate(34deg)",
            transformOrigin: "center",
          }}
        >
          <Image
            src="/hero/hero-hand-right.png"
            alt=""
            width={2048}
            height={2048}
            className="h-auto w-full select-none"
            style={{ filter: handImageFilter }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-24">
        {/* Headline */}
        <h1
          className="max-w-[620px] text-[24px] leading-[1.2] tracking-tight sm:text-[38px]"
          style={{
            color: "var(--page-fg)",
            fontFamily: "var(--font-dm-serif)",
            fontWeight: 400,
          }}
        >
          It&rsquo;s not every day
          <br />
          you find a{" "}
          <span
            style={{
              backgroundImage:
                "linear-gradient(90deg, #FF1F8F 0%, #FF4FA3 12%, #B54FD6 26%, #6C63FF 42%, #2FB8FF 58%, #3DD68C 74%, #F5B400 88%, #FF5A2E 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              fontStyle: "italic",
            }}
          >
            Designer
          </span>{" "}
          who
          <br />
          can turn ideas into
          <br />
          working <em style={{ fontStyle: "italic" }}>prototypes</em>
        </h1>

        {/* Supporting copy */}
        <div
          className="relative mt-10 inline-flex max-w-[456px] flex-col items-center px-5 py-4 sm:px-7 sm:py-5"
          style={{
            backgroundColor: isDark
              ? "rgba(17, 18, 21, 0.72)"
              : "rgba(255, 255, 255, 0.68)",
            border: isDark
              ? "1px solid rgba(255, 255, 255, 0.08)"
              : "1px solid rgba(17, 17, 17, 0.07)",
            boxShadow: isDark
              ? "0 24px 56px -38px rgba(0, 0, 0, 0.72)"
              : "0 24px 56px -38px rgba(17, 17, 17, 0.18)",
            backdropFilter: "blur(16px)",
          }}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-px -top-px block h-[18px] w-[18px]"
            style={{
              borderLeft: "1.5px solid var(--page-fg-faint)",
              borderTop: "1.5px solid var(--page-fg-faint)",
            }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-px -top-px block h-[18px] w-[18px]"
            style={{
              borderRight: "1.5px solid var(--page-fg-faint)",
              borderTop: "1.5px solid var(--page-fg-faint)",
            }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-px -left-px block h-[18px] w-[18px]"
            style={{
              borderLeft: "1.5px solid var(--page-fg-faint)",
              borderBottom: "1.5px solid var(--page-fg-faint)",
            }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-px -right-px block h-[18px] w-[18px]"
            style={{
              borderRight: "1.5px solid var(--page-fg-faint)",
              borderBottom: "1.5px solid var(--page-fg-faint)",
            }}
          />

          <div
            className="flex items-center gap-2.5 text-[8px] uppercase tracking-[0.22em] sm:text-[9px]"
            style={{
              color: "var(--page-fg-faint)",
              fontFamily: "'Satoshi', var(--font-body), sans-serif",
              fontWeight: 500,
            }}
          >
            <span
              className="block h-px w-5"
              style={{ backgroundColor: "var(--page-border)" }}
            />
            <span>But here I am</span>
            <span
              className="block h-px w-5"
              style={{ backgroundColor: "var(--page-border)" }}
            />
          </div>

          <p
            className="mt-3 max-w-[360px] text-[14px] leading-[1.75] sm:text-[15px]"
            style={{
              color: "var(--page-fg-muted)",
              fontFamily: "'Satoshi', var(--font-body), sans-serif",
              fontWeight: 400,
            }}
          >
            An Experience Designer in{" "}
            <span style={{ color: "var(--page-fg)", fontWeight: 500 }}>
              Toronto
            </span>
            , designing and prototyping ideas using AI and emerging tools.
          </p>
        </div>
      </div>
    </section>
  )
}
