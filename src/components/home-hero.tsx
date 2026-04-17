"use client"

import { Dithering } from "@paper-design/shaders-react"
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

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-24">
        {/* Circular portrait placeholder */}
        <div
          className="mb-10 h-16 w-16 overflow-hidden rounded-full sm:h-20 sm:w-20"
          style={{
            backgroundColor: "var(--page-surface)",
            border: "1px solid var(--page-border)",
          }}
          aria-label="Portrait"
        />

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

        {/* Subtitle */}
        <p
          className="mt-8 max-w-[420px] text-[12px] leading-[1.7] sm:text-[13px]"
          style={{
            color: "var(--page-fg-muted)",
            fontFamily: "'Satoshi', var(--font-body), sans-serif",
            fontWeight: 400,
          }}
        >
          But here I am,
          <br />
          An Experience Designer in Toronto,
          <br />
          designing and prototyping ideas using
          <br />
          AI and emerging tools
        </p>
      </div>
    </section>
  )
}
