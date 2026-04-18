"use client"

import Image from "next/image"
import { useEffect, useState, useSyncExternalStore } from "react"
import { getThemeSnapshot, subscribeToThemeChange } from "@/lib/theme"

const INTRO_DURATION_MS = 3000
const OUTRO_DURATION_MS = 360

// Mirrors the hero hand mask so the edges fade identically.
const HAND_MASK =
  "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.96) 16%, rgba(0,0,0,0.96) 84%, transparent 100%)"

export function IntroOverlay() {
  const [phase, setPhase] = useState<"playing" | "fading" | "done">("playing")
  const resolvedTheme = useSyncExternalStore(
    subscribeToThemeChange,
    getThemeSnapshot,
    () => "light"
  )

  useEffect(() => {
    const html = document.documentElement
    const previousOverflow = html.style.overflow
    html.style.overflow = "hidden"

    const fadeTimer = window.setTimeout(() => {
      setPhase("fading")
    }, INTRO_DURATION_MS)

    const doneTimer = window.setTimeout(() => {
      setPhase("done")
      html.style.overflow = previousOverflow
    }, INTRO_DURATION_MS + OUTRO_DURATION_MS)

    return () => {
      window.clearTimeout(fadeTimer)
      window.clearTimeout(doneTimer)
      html.style.overflow = previousOverflow
    }
  }, [])

  if (phase === "done") return null

  const isDark = resolvedTheme === "dark"
  // Match hero exactly.
  const handImageFilter = isDark
    ? "grayscale(1) invert(1) brightness(1.08) contrast(0.92)"
    : "grayscale(1) brightness(0.72) contrast(1.02)"
  const handBlendMode = isDark ? "screen" : "multiply"
  const handDropShadow = isDark
    ? "drop-shadow(0 16px 28px rgba(0, 0, 0, 0.28))"
    : "drop-shadow(0 18px 30px rgba(17, 17, 17, 0.08))"
  const handRestOpacity = isDark ? 0.32 : 0.38

  return (
    <>
      <style>{`
        @keyframes introHandLeft {
          0% {
            opacity: 0;
            transform: translate3d(-22%, 14%, 0) rotate(-34deg) scale(1.06);
          }
          14% {
            opacity: ${(handRestOpacity * 0.55).toFixed(3)};
          }
          100% {
            opacity: ${handRestOpacity};
            transform: translate3d(0, 0, 0) rotate(-34deg) scale(1);
          }
        }

        @keyframes introHandRight {
          0% {
            opacity: 0;
            transform: translate3d(22%, 14%, 0) rotate(34deg) scale(1.06);
          }
          14% {
            opacity: ${(handRestOpacity * 0.55).toFixed(3)};
          }
          100% {
            opacity: ${handRestOpacity};
            transform: translate3d(0, 0, 0) rotate(34deg) scale(1);
          }
        }

        @keyframes introWelcome {
          0% {
            opacity: 0;
            transform: translateY(14px) scale(0.985);
            filter: blur(10px);
          }
          14%, 100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .intro-hand-left {
          animation: introHandLeft ${INTRO_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1) both;
          will-change: transform, opacity;
          transform-origin: center;
        }

        .intro-hand-right {
          animation: introHandRight ${INTRO_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1) both;
          will-change: transform, opacity;
          transform-origin: center;
        }

        .intro-welcome {
          animation: introWelcome ${INTRO_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1) both;
          will-change: transform, opacity, filter;
        }
      `}</style>

      <div
        aria-hidden="true"
        className="fixed inset-0 z-[200] overflow-hidden"
        style={{
          backgroundColor: "var(--page-bg)",
          opacity: phase === "fading" ? 0 : 1,
          transition: `opacity ${OUTRO_DURATION_MS}ms ease-out`,
          pointerEvents: phase === "fading" ? "none" : "auto",
        }}
      >
        {/* ───────────────────────────────────────────────────────────
            Mirror of the page frame + hero section so every percentage
            position inside resolves to the exact same pixel as the real
            hero. main (px-4 sm:px-0) → frame (mx-auto max-w-[780px]) →
            content (px-4 sm:px-6) → hero (-mx-4 sm:-mx-6 overflow-hidden).
            ─────────────────────────────────────────────────────────── */}
        <div className="min-h-[100dvh] px-4 sm:px-0">
          <div className="relative mx-auto min-h-[100dvh] max-w-[780px]">
            <div className="px-4 sm:px-6">
              {/* Spacer matching the SiteHeader's rendered height so the
                  hero section below sits at the same vertical offset as
                  the real page. Values are the measured bounding heights
                  of the real SiteHeader at each breakpoint. */}
              <div
                aria-hidden="true"
                className="h-[59.5px] sm:h-[62px]"
              />

              {/* Hero-section mirror: identical classes to HomeHero's
                  outer <section>, so every hand percentage resolves to
                  the same pixel rect. */}
              <section className="relative -mx-4 overflow-hidden sm:-mx-6">
                {/* Left hand — EXACT hero classes, styles, and rotation */}
                <div
                  className="intro-hand-left absolute left-[-4%] top-[18%] w-[9.5rem] sm:left-[-8%] sm:top-[6%] sm:w-[14rem] md:left-[-10%] md:top-[3%] md:w-[17rem] lg:left-[-10%] lg:top-[2%] lg:w-[22rem]"
                  style={{
                    mixBlendMode: handBlendMode,
                    filter: handDropShadow,
                    WebkitMaskImage: HAND_MASK,
                    maskImage: HAND_MASK,
                  }}
                >
                  <Image
                    src="/hero/hero-hand-left.png"
                    alt=""
                    width={1792}
                    height={2400}
                    priority
                    className="h-auto w-full select-none"
                    style={{ filter: handImageFilter }}
                  />
                </div>

                {/* Right hand — EXACT hero classes, styles, and rotation */}
                <div
                  className="intro-hand-right absolute right-[-4%] top-[18%] w-[9.5rem] sm:right-[-8%] sm:top-[6%] sm:w-[14rem] md:right-[-10%] md:top-[3%] md:w-[17rem] lg:right-[-10%] lg:top-[2%] lg:w-[22rem]"
                  style={{
                    mixBlendMode: handBlendMode,
                    filter: handDropShadow,
                    WebkitMaskImage: HAND_MASK,
                    maskImage: HAND_MASK,
                  }}
                >
                  <Image
                    src="/hero/hero-hand-right.png"
                    alt=""
                    width={2048}
                    height={2048}
                    priority
                    className="h-auto w-full select-none"
                    style={{ filter: handImageFilter }}
                  />
                </div>

                {/* Invisible replica of the hero content to establish the
                    section's natural height. This makes top-[18%] /
                    top-[6%] etc. resolve to the same pixel rows as the
                    real hero, so the hands land exactly where they will
                    continue to sit after the overlay fades. */}
                <div
                  aria-hidden="true"
                  className="invisible relative flex flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-24"
                >
                  <h1
                    className="max-w-[620px] text-[24px] leading-[1.2] tracking-tight sm:text-[38px]"
                    style={{
                      fontFamily: "var(--font-dm-serif)",
                      fontWeight: 400,
                    }}
                  >
                    It&rsquo;s not every day
                    <br />
                    you find a Designer who
                    <br />
                    can turn ideas into
                    <br />
                    working prototypes
                  </h1>

                  <div className="relative mt-10 inline-flex max-w-[456px] flex-col items-center px-5 py-4 sm:px-7 sm:py-5">
                    <div className="flex items-center gap-2.5 text-[8px] uppercase tracking-[0.22em] sm:text-[9px]">
                      <span className="block h-px w-5" />
                      <span>But here I am</span>
                      <span className="block h-px w-5" />
                    </div>
                    <p className="mt-3 max-w-[360px] text-[14px] leading-[1.75] sm:text-[15px]">
                      An Experience Designer in Toronto, designing and
                      prototyping ideas using AI and emerging tools.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Welcome brand moment — vertically centered between the two
            hands, where the pointing fingertips reach toward each other.
            Values are tuned to the measured hand bounding-box centers at
            each breakpoint (mobile ≈ 29%, sm ≈ 25%, md+ ≈ 23%). */}
        <div className="pointer-events-none absolute inset-x-0 top-[29%] z-[6] flex -translate-y-1/2 justify-center px-6 sm:top-[25%] md:top-[23%]">
          <div className="intro-welcome text-center">
            <div
              className="text-[46px] leading-none tracking-[-0.06em] sm:text-[78px] md:text-[94px]"
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontWeight: 400,
                color: "var(--page-fg)",
              }}
            >
              Welcome
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
