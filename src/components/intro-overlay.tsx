"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

const INTRO_DURATION_MS = 4000
const OUTRO_DURATION_MS = 360

export function IntroOverlay() {
  const [phase, setPhase] = useState<"playing" | "fading" | "done">("playing")

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

  const handImageFilter = "grayscale(1) brightness(0.74) contrast(1.02)"

  return (
    <>
      <style>{`
        @keyframes introHandLeft {
          from {
            opacity: 0;
            transform: translate3d(-12%, 8%, 0) rotate(0deg) scale(1.02);
          }
          12% {
            opacity: 0.26;
          }
          to {
            opacity: 0.38;
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
        }

        @keyframes introHandRight {
          from {
            opacity: 0;
            transform: translate3d(12%, 8%, 0) rotate(0deg) scale(1.02);
          }
          12% {
            opacity: 0.26;
          }
          to {
            opacity: 0.38;
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
        }

        @keyframes introWelcome {
          0% {
            opacity: 0;
            transform: translateY(14px) scale(0.985);
            filter: blur(10px);
          }
          14%, 62% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-14px) scale(0.985);
            filter: blur(8px);
          }
        }

        .intro-hand-left {
          animation: introHandLeft ${INTRO_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1) both;
          will-change: transform, opacity;
        }

        .intro-hand-right {
          animation: introHandRight ${INTRO_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1) both;
          will-change: transform, opacity;
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
          backgroundColor: "#FFFFFF",
          opacity: phase === "fading" ? 0 : 1,
          transition: `opacity ${OUTRO_DURATION_MS}ms ease-out`,
          pointerEvents: phase === "fading" ? "none" : "auto",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          aria-hidden="true"
        >
          <div
            className="intro-hand-left absolute top-[16%] w-[26rem] sm:top-[15%] sm:w-[36rem] md:top-[15%] md:w-[48rem] lg:top-[15%] lg:w-[62rem]"
            style={{
              left: "-18vw",
              mixBlendMode: "multiply",
              filter: "drop-shadow(0 18px 30px rgba(17, 17, 17, 0.08))",
              transformOrigin: "center",
            }}
          >
            <Image
              src="/intro/intro-hand-left.webp"
              alt=""
              width={2496}
              height={1550}
              className="h-auto w-full select-none"
              style={{ filter: handImageFilter }}
              priority
            />
          </div>

          <div
            className="intro-hand-right absolute top-[16%] w-[26rem] sm:top-[15%] sm:w-[36rem] md:top-[15%] md:w-[48rem] lg:top-[15%] lg:w-[62rem]"
            style={{
              right: "-18vw",
              mixBlendMode: "multiply",
              filter: "drop-shadow(0 18px 30px rgba(17, 17, 17, 0.08))",
              transformOrigin: "center",
            }}
          >
            <Image
              src="/intro/intro-hand-right.webp"
              alt=""
              width={2496}
              height={1550}
              className="h-auto w-full select-none"
              style={{ filter: handImageFilter }}
              priority
            />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-[34%] z-[6] flex -translate-y-1/2 justify-center px-6 sm:top-[34%] md:top-[36%]">
          <div className="intro-welcome text-center">
            <div
              className="text-[46px] leading-none tracking-[-0.06em] text-[#111111] sm:text-[78px] md:text-[94px]"
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontWeight: 400,
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
