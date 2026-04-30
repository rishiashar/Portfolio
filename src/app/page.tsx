"use client"

import { MeshGradient } from "@paper-design/shaders-react"
import Image from "next/image"
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react"
import { HomeHero } from "@/components/home-hero"
import { IntroOverlay } from "@/components/intro-overlay"
import { PlusMark } from "@/components/plus-mark"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ToolBadge } from "@/components/tool-badge"
import { ScrollBlurFadeTop } from "@/components/scroll-blur-fade"
import { playCardHover } from "@/lib/sounds"
import {
  applyResolvedTheme as applyResolvedThemeValue,
  getStoredThemePreference as getStoredThemePreferenceValue,
  getThemeSnapshot as getThemeSnapshotValue,
  subscribeToThemeChange as subscribeToThemeChangeValue,
  THEME_MEDIA_QUERY,
  THEME_STORAGE_KEY,
} from "@/lib/theme"

function subscribeToThemeChange(callback: () => void) {
  return subscribeToThemeChangeValue(callback)
}

function getThemeSnapshot() {
  return getThemeSnapshotValue() === "dark"
}

function getStoredThemePreference() {
  return getStoredThemePreferenceValue()
}

function applyResolvedTheme() {
  return applyResolvedThemeValue() === "dark"
}

/* ════════════════════════════════════════════
   Shared utilities
   ════════════════════════════════════════════ */

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.opacity = "1"
          el.style.transform = "translate3d(0,0,0)"
          el.style.filter = "blur(0)"
          obs.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Fade({
  children,
  d = 0,
  className = "",
}: {
  children: React.ReactNode
  d?: number
  className?: string
}) {
  const ref = useFadeIn()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translate3d(0,14px,0)",
        filter: "blur(4px)",
        transition: `opacity 700ms cubic-bezier(0.32,0.72,0,1) ${d}ms, transform 700ms cubic-bezier(0.32,0.72,0,1) ${d}ms, filter 700ms cubic-bezier(0.32,0.72,0,1) ${d}ms`,
      }}
    >
      {children}
    </div>
  )
}

function Section({
  id,
  label,
  hideLabel = false,
  delay = 0,
  variant = "text",
  children,
}: {
  id?: string
  label: string
  hideLabel?: boolean
  delay?: number
  variant?: "text" | "visual"
  children: React.ReactNode
}) {
  const bottom = variant === "visual" ? "mb-0" : "mb-14"
  const labelSlug = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
  const headingId = `${id ?? labelSlug}-section-heading`

  return (
    <Fade d={delay}>
      <section
        id={id}
        aria-label={hideLabel ? label : undefined}
        aria-labelledby={hideLabel ? undefined : headingId}
        className={`${bottom} ${id ? "scroll-mt-24" : ""}`}
      >
        <Label id={hideLabel ? undefined : headingId} hideText={hideLabel}>
          {label}
        </Label>
        {children}
      </section>
    </Fade>
  )
}

function Label({
  id,
  children,
  hideText = false,
}: {
  id?: string
  children: React.ReactNode
  hideText?: boolean
}) {
  return (
    <div className={`relative ${hideText ? "mb-0 pt-0" : "mb-6 pt-8"}`}>
      {/* Full-bleed divider line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-screen -translate-x-1/2"
        style={{ backgroundColor: "var(--page-border)" }}
      />
      {/* Registration mark at left frame-border intersection */}
      <PlusMark
        edge="left"
        className="absolute -left-4 top-0 -translate-x-1/2 -translate-y-1/2 sm:-left-6"
        style={{ color: "var(--page-fg-faint)" }}
        size={10}
      />
      {/* Registration mark at right frame-border intersection */}
      <PlusMark
        edge="right"
        className="absolute -right-4 top-0 translate-x-1/2 -translate-y-1/2 sm:-right-6"
        style={{ color: "var(--page-fg-faint)" }}
        size={10}
      />
      {!hideText ? (
        <h2
          id={id}
          className="m-0 text-[12px] uppercase tracking-widest"
          style={{ color: "var(--page-fg-faint)" }}
        >
          {children}
        </h2>
      ) : null}
    </div>
  )
}

function PortraitGradient({ variant }: { variant: "aqua" | "ember" }) {
  const dark = useSyncExternalStore(
    subscribeToThemeChange,
    getThemeSnapshot,
    () => false
  )
  const gradientId = useId().replace(/:/g, "")

  if (!dark && variant === "ember") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 52 64"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`${gradientId}-base`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff8f3" />
            <stop offset="52%" stopColor="#fffaf8" />
            <stop offset="100%" stopColor="#fdfdfd" />
          </linearGradient>
          <radialGradient id={`${gradientId}-glow-a`} cx="24%" cy="18%" r="78%">
            <stop offset="0%" stopColor="#ffd8b0" stopOpacity="0.72" />
            <stop offset="55%" stopColor="#ffb98e" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#ffb98e" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${gradientId}-glow-b`} cx="84%" cy="76%" r="72%">
            <stop offset="0%" stopColor="#b8f0ff" stopOpacity="0.58" />
            <stop offset="54%" stopColor="#7fdcff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#7fdcff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${gradientId}-glow-c`} cx="58%" cy="38%" r="68%">
            <stop offset="0%" stopColor="#fff8ef" stopOpacity="0.34" />
            <stop offset="58%" stopColor="#fff8ef" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#fff8ef" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="52" height="64" fill={`url(#${gradientId}-base)`} />
        <rect width="52" height="64" fill={`url(#${gradientId}-glow-a)`} />
        <rect width="52" height="64" fill={`url(#${gradientId}-glow-b)`} />
        <rect width="52" height="64" fill={`url(#${gradientId}-glow-c)`} />
      </svg>
    )
  }

  if (!dark) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 52 64"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`${gradientId}-base`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f7fdff" />
            <stop offset="48%" stopColor="#f3fbff" />
            <stop offset="100%" stopColor="#f8fffc" />
          </linearGradient>
          <radialGradient id={`${gradientId}-glow-a`} cx="28%" cy="22%" r="82%">
            <stop offset="0%" stopColor="#b9f6ff" stopOpacity="0.72" />
            <stop offset="52%" stopColor="#8be7ff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#8be7ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${gradientId}-glow-b`} cx="84%" cy="82%" r="72%">
            <stop offset="0%" stopColor="#b7f7d2" stopOpacity="0.58" />
            <stop offset="54%" stopColor="#7beab4" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#7beab4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${gradientId}-glow-c`} cx="54%" cy="36%" r="68%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
            <stop offset="56%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="52" height="64" fill={`url(#${gradientId}-base)`} />
        <rect width="52" height="64" fill={`url(#${gradientId}-glow-a)`} />
        <rect width="52" height="64" fill={`url(#${gradientId}-glow-b)`} />
        <rect width="52" height="64" fill={`url(#${gradientId}-glow-c)`} />
      </svg>
    )
  }

  if (variant === "ember") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 52 64"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`${gradientId}-base`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#120f12" />
            <stop offset="45%" stopColor="#1f1420" />
            <stop offset="100%" stopColor="#0b1418" />
          </linearGradient>
          <radialGradient id={`${gradientId}-glow-a`} cx="24%" cy="18%" r="78%">
            <stop offset="0%" stopColor="#ffb36f" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#ff7a59" stopOpacity="0.36" />
            <stop offset="100%" stopColor="#ff7a59" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${gradientId}-glow-b`} cx="80%" cy="78%" r="70%">
            <stop offset="0%" stopColor="#7ce6ff" stopOpacity="0.7" />
            <stop offset="55%" stopColor="#2ac3ff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#2ac3ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${gradientId}-glow-c`} cx="56%" cy="42%" r="68%">
            <stop offset="0%" stopColor="#ffefcf" stopOpacity="0.22" />
            <stop offset="55%" stopColor="#ffefcf" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ffefcf" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${gradientId}-vignette`} cx="50%" cy="50%" r="82%">
            <stop offset="58%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.32" />
          </radialGradient>
        </defs>
        <rect width="52" height="64" fill={`url(#${gradientId}-base)`} />
        <rect width="52" height="64" fill={`url(#${gradientId}-glow-a)`} />
        <rect width="52" height="64" fill={`url(#${gradientId}-glow-b)`} />
        <rect width="52" height="64" fill={`url(#${gradientId}-glow-c)`} />
        <rect width="52" height="64" fill={`url(#${gradientId}-vignette)`} />
      </svg>
    )
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 52 64"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`${gradientId}-base`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#081318" />
          <stop offset="48%" stopColor="#0d1d22" />
          <stop offset="100%" stopColor="#091115" />
        </linearGradient>
        <radialGradient id={`${gradientId}-glow-a`} cx="26%" cy="20%" r="82%">
          <stop offset="0%" stopColor="#98f5ff" stopOpacity="0.95" />
          <stop offset="52%" stopColor="#42d4ff" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#42d4ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${gradientId}-glow-b`} cx="86%" cy="84%" r="72%">
          <stop offset="0%" stopColor="#7cf3b0" stopOpacity="0.8" />
          <stop offset="54%" stopColor="#18c88d" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#18c88d" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${gradientId}-glow-c`} cx="54%" cy="38%" r="68%">
          <stop offset="0%" stopColor="#f0ffff" stopOpacity="0.18" />
          <stop offset="56%" stopColor="#f0ffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#f0ffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${gradientId}-vignette`} cx="50%" cy="50%" r="82%">
          <stop offset="58%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
        </radialGradient>
      </defs>
      <rect width="52" height="64" fill={`url(#${gradientId}-base)`} />
      <rect width="52" height="64" fill={`url(#${gradientId}-glow-a)`} />
      <rect width="52" height="64" fill={`url(#${gradientId}-glow-b)`} />
      <rect width="52" height="64" fill={`url(#${gradientId}-glow-c)`} />
      <rect width="52" height="64" fill={`url(#${gradientId}-vignette)`} />
    </svg>
  )
}

function TestimonialCard({
  name,
  role,
  company,
  quote,
  portrait,
  objectPosition,
  portraitScale = 1,
  portraitTranslateY = "0%",
  portraitTransformOrigin = "50% 50%",
  gradientVariant,
  noBorderRight,
}: {
  name: string
  role: string
  company: string
  quote: string
  portrait: string
  objectPosition: string
  portraitScale?: number
  portraitTranslateY?: string
  portraitTransformOrigin?: string
  gradientVariant: "aqua" | "ember"
  noBorderRight?: boolean
}) {
  const [showImage, setShowImage] = useState(true)
  return (
    <div
      className={`flex flex-col gap-6 p-4 sm:p-6 ${
        noBorderRight ? "" : "border-b md:border-r md:border-b-0"
      }`}
      style={{
        borderColor: "var(--page-border)",
      }}
    >
      {/* Top row: name/role left, small portrait right */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[13px] font-semibold" style={{ color: "var(--page-fg)" }}>
            {name}
          </p>
          <p className="mt-0.5 text-[12px] leading-snug" style={{ color: "var(--page-fg-faint)" }}>
            {role}
          </p>
          <p className="text-[12px]" style={{ color: "var(--page-fg-faint)" }}>
            {company}
          </p>
        </div>
        {showImage && (
          <div
            className="shrink-0 p-1"
            style={{ backgroundColor: "var(--page-bg)", boxShadow: "var(--surface-shadow)" }}
          >
            <div className="relative h-[64px] w-[52px] overflow-hidden">
              <PortraitGradient variant={gradientVariant} />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[1]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 42%, rgba(0,0,0,0.14) 100%)",
                }}
              />
              <Image
                src={portrait}
                alt=""
                aria-hidden="true"
                fill
                className="pointer-events-none absolute z-[2] object-cover opacity-80"
                style={{
                  objectPosition,
                  transform: `translateY(${portraitTranslateY}) scale(${(portraitScale * 1.04).toFixed(3)})`,
                  transformOrigin: portraitTransformOrigin,
                  filter: "grayscale(1) brightness(0.14) contrast(1.45) blur(1px)",
                }}
                unoptimized
              />
              <Image
                src={portrait}
                alt={name}
                fill
                className="content-image-outline relative z-[3] object-cover"
                style={{
                  objectPosition,
                  transform: `translateY(${portraitTranslateY}) scale(${portraitScale})`,
                  transformOrigin: portraitTransformOrigin,
                  filter: "contrast(1.03) brightness(0.98)",
                }}
                onError={() => setShowImage(false)}
                unoptimized
              />
            </div>
          </div>
        )}
      </div>
      {/* Quote */}
      <p className="text-[13px] leading-[1.75]" style={{ color: "var(--page-fg-muted)" }}>
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  )
}

function WorkCard({
  title,
  desc,
  image,
  imageClassName,
  imageFrameClassName,
  imageWidth = 280,
  imageHeight = 580,
  href = "#",
  noBorderRight,
  variant = "default",
  paperBackgroundImage,
  paperBackgroundStyle,
  paperMockupStyle,
  paperAccentColor = "#D753FF",
}: {
  title: string
  desc: string
  image?: string
  imageClassName?: string
  imageFrameClassName?: string
  imageWidth?: number
  imageHeight?: number
  href?: string
  noBorderRight?: boolean
  variant?: "default" | "paper"
  paperBackgroundImage?: string
  paperBackgroundStyle?: {
    height: string
    left: string
    top: string
    width: string
  }
  paperMockupStyle?: {
    height: string
    left: string
    top: string
    width: string
  }
  paperAccentColor?: string
}) {
  const [imgError, setImgError] = useState(false)
  const showImage = image && !imgError
  const isPaperCard = variant === "paper" && showImage && paperBackgroundImage
  const backgroundLayer = paperBackgroundStyle ?? {
    height: "178.467%",
    left: "-67.081%",
    top: "-49.635%",
    width: "227.95%",
  }
  const mockupLayer = paperMockupStyle ?? {
    height: "129.197%",
    left: "8.075%",
    top: "8.029%",
    width: "159.006%",
  }

  if (isPaperCard) {
    return (
      <a
        href={href}
        className={`group block ${
          noBorderRight ? "" : "border-b md:border-r md:border-b-0"
        }`}
        style={{
          borderColor: "var(--page-border)",
          textDecoration: "none",
        }}
        onMouseEnter={() => {
          playCardHover()
        }}
      >
        <div
          style={{
            backgroundColor: "var(--page-bg)",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            overflow: "clip",
            padding: "24px",
            width: "100%",
            maxWidth: "100%",
          }}
        >
          <div
            style={{
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <h3
              style={{
                boxSizing: "border-box",
                color: "var(--page-fg)",
                fontFamily: '"Inter", var(--font-body), system-ui, sans-serif',
                fontSize: "18px",
                fontWeight: 600,
                lineHeight: "25px",
                margin: 0,
              }}
            >
              {title}
            </h3>
            <p
              style={{
                boxSizing: "border-box",
                color: paperAccentColor,
                fontFamily: '"Inter", var(--font-body), system-ui, sans-serif',
                fontSize: "13px",
                lineHeight: "21px",
                margin: 0,
              }}
            >
              {desc}
            </p>
          </div>

          <div
            aria-hidden="true"
            className="content-image-outline"
            style={{
              boxSizing: "border-box",
              flexShrink: 0,
              aspectRatio: "322 / 274",
              overflow: "clip",
              position: "relative",
              width: "100%",
            }}
          >
            <div
              style={{
                backgroundImage: `url(${paperBackgroundImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                boxSizing: "border-box",
                height: backgroundLayer.height,
                left: backgroundLayer.left,
                position: "absolute",
                top: backgroundLayer.top,
                width: backgroundLayer.width,
              }}
            />
            <div
              style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                boxSizing: "border-box",
                height: mockupLayer.height,
                left: mockupLayer.left,
                position: "absolute",
                top: mockupLayer.top,
                width: mockupLayer.width,
              }}
            />
          </div>

          <div
            style={{
              alignItems: "center",
              boxSizing: "border-box",
              display: "flex",
              gap: "24px",
              justifyContent: "flex-end",
              width: "fit-content",
            }}
          >
            <span
              style={{
                boxSizing: "border-box",
                color: "var(--page-fg-muted)",
                flex: 1,
                fontFamily: '"Inter", var(--font-body), system-ui, sans-serif',
                fontSize: "13px",
                fontWeight: 500,
                lineHeight: "21px",
              }}
            >
              View
            </span>
            <span
              className="inline-flex transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
              style={{
                boxSizing: "border-box",
                color: "var(--page-fg-muted)",
                flexShrink: 0,
              }}
            >
              <svg
                aria-hidden="true"
                color="currentColor"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.7"
                style={{
                  flexShrink: 0,
                  height: "16px",
                  overflow: "clip",
                  verticalAlign: "middle",
                  width: "16px",
                }}
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 12h12" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </a>
    )
  }

  return (
    <a
      href={href}
      className={`group flex flex-col gap-4 overflow-hidden px-4 pt-4 ${showImage ? "pb-0" : "pb-4"} transition-colors duration-300 hover:bg-[color:var(--page-surface)] focus-visible:bg-[color:var(--page-surface)] sm:gap-5 sm:px-6 sm:pt-5 ${showImage ? "sm:pb-0" : "sm:pb-5"} ${
        noBorderRight ? "" : "border-b md:border-r md:border-b-0"
      }`}
      style={{
        borderColor: "var(--page-border)",
      }}
      onMouseEnter={() => {
        playCardHover()
      }}
    >
      {/* Text + arrow */}
      <div className="flex flex-col gap-1.5">
        <h3
          className="text-[18px] font-semibold leading-snug"
          style={{ color: "var(--page-fg)" }}
        >
          {title}
        </h3>
        <p className="text-[13px] leading-relaxed" style={{ color: "var(--page-fg-faint)" }}>
          {desc}
        </p>
        <div className="mt-3">
          <span
            className="surface-shadow flex h-10 w-10 items-center justify-center text-[15px] transition-colors duration-300"
            style={{ color: "var(--page-fg-muted)" }}
          >
            <span className="inline-flex transform-gpu transition-transform duration-200 ease-out group-hover:-rotate-45 motion-reduce:transform-none motion-reduce:transition-none">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M5 12h12" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </span>
        </div>
      </div>

      {/* Preview image — rendered larger than card so bottom is clipped by overflow-hidden */}
      {showImage && (
        <div className="flex shrink-0 justify-start">
          <div
            className={imageFrameClassName}
            style={{ boxShadow: "var(--surface-shadow)" }}
          >
            <Image
              src={image}
              alt={title}
              width={imageWidth}
              height={imageHeight}
              className={`content-image-outline block w-full ${
                imageClassName ?? "max-w-[220px] sm:max-w-[240px] md:max-w-[260px]"
              }`}
              style={{ height: "auto" }}
              onError={() => setImgError(true)}
              unoptimized
            />
          </div>
        </div>
      )}
    </a>
  )
}

const STUDENT_EVENT_DISCOVERY_LOGO_URL =
  "https://app.paper.design/file-assets/01K616GPQD0HQAS4KVBCW879PZ/01KQD0HSJB2T2J23B4NCKXFAZS.png"

function ProjectPreview({
  visual,
  icon,
  accent,
}: {
  visual: "student-event-discovery" | "pay-period-manager"
  icon: React.ReactNode
  accent: string
}) {
  if (visual === "student-event-discovery") {
    return (
      <div
        aria-hidden="true"
        className="relative aspect-[16/10] overflow-hidden"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <MeshGradient
          speed={1.5}
          scale={1.67}
          distortion={0.58}
          swirl={0.19}
          frame={312711.3930000042}
          colors={["#FFDA59", "#F29015", "#F2D812"]}
          style={{
            height: "150%",
            left: "-18%",
            position: "absolute",
            top: "-24%",
            width: "168%",
          }}
        />
        <div
          style={{
            backgroundImage: `url(${STUDENT_EVENT_DISCOVERY_LOGO_URL})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            boxSizing: "border-box",
            height: "clamp(74px, 11vw, 104px)",
            left: "50%",
            position: "absolute",
            top: "50%",
            translate: "-50% -50%",
            width: "clamp(51px, 7.6vw, 72px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(255,255,255,0.18), transparent 32%, rgba(0,0,0,0.1))",
          }}
        />
      </div>
    )
  }

  return (
    <div
      aria-hidden="true"
      className="relative aspect-[16/10] overflow-hidden"
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--page-bg) 92%, var(--page-fg) 4%)",
        backgroundImage:
          "linear-gradient(90deg, color-mix(in srgb, var(--page-border) 78%, transparent) 1px, transparent 1px), linear-gradient(180deg, color-mix(in srgb, var(--page-border) 78%, transparent) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div
        className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center border"
        style={{
          borderColor: "var(--page-border)",
          color: accent,
          backgroundColor: "var(--page-bg)",
          boxShadow: "var(--surface-shadow)",
        }}
      >
        {icon}
      </div>
      <div className="absolute bottom-4 left-4 right-4 top-[72px] grid grid-cols-[0.92fr_1.08fr] gap-3">
        <div
          className="border p-3"
          style={{
            borderColor: "var(--page-border)",
            backgroundColor:
              "color-mix(in srgb, var(--page-bg) 94%, transparent)",
          }}
        >
          <div className="mb-4 h-8 w-12 border" style={{ borderColor: accent }} />
          {[68, 46, 82].map((width) => (
            <div
              key={width}
              className="mb-2 h-1.5"
              style={{
                width: `${width}%`,
                backgroundColor:
                  "color-mix(in srgb, var(--page-fg-muted) 24%, transparent)",
              }}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {[0, 1, 2].map((row) => (
            <div
              key={row}
              className="flex flex-1 items-center gap-2 border px-2"
              style={{
                borderColor: "var(--page-border)",
                backgroundColor:
                  row === 1
                    ? "color-mix(in srgb, #22c55e 10%, var(--page-bg))"
                    : "color-mix(in srgb, var(--page-bg) 94%, transparent)",
              }}
            >
              <span
                className="h-2.5 w-2.5"
                style={{
                  backgroundColor:
                    row === 1
                      ? "#22c55e"
                      : "color-mix(in srgb, var(--page-fg-faint) 42%, transparent)",
                }}
              />
              <span
                className="h-1.5 flex-1"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--page-fg-muted) 18%, transparent)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectCard({
  project,
  index,
  noBorderRight,
}: {
  project: ProjectItem
  index: number
  noBorderRight?: boolean
}) {
  return (
    <a
      href={project.href ?? "#"}
      className={`group block overflow-hidden transition-colors duration-300 hover:bg-[color:var(--page-hover)] focus-visible:bg-[color:var(--page-hover)] ${
        noBorderRight ? "" : "border-b md:border-r md:border-b-0"
      }`}
      style={{
        borderColor: "var(--page-border)",
        textDecoration: "none",
      }}
      onMouseEnter={() => {
        playCardHover()
      }}
    >
      <ProjectPreview
        visual={project.visual}
        icon={project.icon}
        accent={project.accent}
      />
      <div
        className="border-t px-4 py-4 sm:px-5 sm:py-5"
        style={{ borderColor: "var(--page-border)" }}
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <span
            className="text-[10px] font-medium uppercase tracking-[0.18em]"
            style={{ color: project.accent }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="h-px flex-1"
            style={{ backgroundColor: "var(--page-border)" }}
          />
        </div>
        <div className="flex items-start justify-between gap-5">
          <div className="min-w-0">
            <h3
              className="text-[17px] font-semibold leading-tight tracking-[-0.02em] sm:text-[18px]"
              style={{ color: "var(--page-fg)" }}
            >
              {project.title}
            </h3>
            <p
              className="mt-1.5 text-[13px] leading-relaxed"
              style={{ color: "var(--page-fg-faint)" }}
            >
              {project.desc}
            </p>
          </div>
          <span
            className="surface-shadow flex h-9 w-9 shrink-0 items-center justify-center transition-colors duration-300"
            style={{ color: "var(--page-fg-muted)" }}
          >
            <span className="inline-flex transform-gpu transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M5 12h12" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </span>
        </div>
      </div>
    </a>
  )
}

/* ════════════════════════════════════════════
   Icons
   ════════════════════════════════════════════ */

const ic = {
  activity: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
  ),
  wallet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
  ),
  readcv: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block h-3.5 w-3.5 align-[-2px]" style={{ color: "var(--page-fg-ghost)" }}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
  ),
}

/* ════════════════════════════════════════════
   Data
   ════════════════════════════════════════════ */

type SelectedWorkItem = {
  title: string
  desc: string
  href?: string
  image: string
  imageClassName?: string
  imageFrameClassName?: string
  imageWidth?: number
  imageHeight?: number
  variant?: "default" | "paper"
  paperBackgroundImage?: string
  paperAccentColor?: string
  paperBackgroundStyle?: {
    height: string
    left: string
    top: string
    width: string
  }
  paperMockupStyle?: {
    height: string
    left: string
    top: string
    width: string
  }
}

type ProjectItem = {
  title: string
  desc: string
  href?: string
  icon: React.ReactNode
  visual: "student-event-discovery" | "pay-period-manager"
  accent: string
}

const selected: SelectedWorkItem[] = [
  {
    title: "Intelligent Activity Log Analyzer",
    desc: "AI-powered audit intelligence",
    href: "/work/intelligent-activity-log-analyzer",
    image: "/work/activity-log-paper-dashboard.webp",
    paperBackgroundImage: "/work/activity-log-paper-sunset.webp",
    imageClassName: "max-w-none",
    imageFrameClassName:
      "w-full overflow-hidden h-[220px] sm:h-[290px] md:h-[275px]",
    imageWidth: 1024,
    imageHeight: 708,
    variant: "paper",
  },
  {
    title: "Restructuring Team Settings",
    desc: "Enterprise admin experience",
    image: "/work/team-settings-paper-dashboard.webp",
    paperBackgroundImage: "/work/team-settings-paper-lake.webp",
    paperBackgroundStyle: {
      height: "100%",
      left: "0%",
      top: "0%",
      width: "100%",
    },
    paperMockupStyle: {
      height: "128.36%",
      left: "8.25%",
      top: "9.27%",
      width: "149.85%",
    },
    paperAccentColor: "var(--page-fg-faint)",
    imageClassName: "max-w-none",
    imageFrameClassName:
      "w-full overflow-hidden h-[220px] sm:h-[290px] md:h-[275px]",
    imageWidth: 968,
    imageHeight: 706,
    variant: "paper",
  },
]
const projects: ProjectItem[] = [
  {
    title: "Student Event Discovery",
    desc: "Campus connection platform",
    icon: ic.users,
    visual: "student-event-discovery",
    accent: "#F29015",
  },
  {
    title: "Pay Period Manager",
    desc: "Personal finance tool",
    icon: ic.wallet,
    visual: "pay-period-manager",
    accent: "#22c55e",
  },
]

const impactMetric = (text: string) => (
  <span className="font-semibold tracking-[-0.015em]" style={{ color: "var(--page-fg)" }}>
    {text}
  </span>
)

const impactEmphasis = (text: string) => (
  <span className="font-medium tracking-[-0.01em]" style={{ color: "var(--page-fg)" }}>
    {text}
  </span>
)

const experience = [
  {
    company: "AUTODESK",
    accent: "var(--page-fg)",
    summary: (
      <>
        Owned and redesigned the admin settings experience used by{" "}
        {impactMetric("1.5 million users every month")} and built a working
        prototype for {impactEmphasis("AU Activity Log")}.
      </>
    ),
  },
  {
    company: "INNOVATION HUB, UOFT",
    accent: "#0054a6",
    summary: (
      <>
        Designed a functional prototype for finding accessible spaces for
        people with invisible disabilities by scanning{" "}
        {impactMetric("125 places in 22 hours")}.
      </>
    ),
  },
  {
    company: "WEHEAR",
    accent: "#d14a49",
    summary: (
      <>
        Introduced {impactEmphasis("user testing methods")} and redesigned both
        the {impactEmphasis("WeHear")} and {impactEmphasis("We Converse")} apps.
      </>
    ),
  },
]
const connect = [
  { handle: "rishiasharv@gmail.com", platform: "Email", href: "mailto:rishiasharv@gmail.com", icon: ic.mail },
  { handle: "rishiashar", platform: "GitHub", href: "https://github.com/rishiashar", icon: ic.github },
  { handle: "Rishi Ashar", platform: "LinkedIn", href: "https://linkedin.com", icon: ic.linkedin },
  { handle: "rishiashar", platform: "X.com", href: "https://x.com", icon: ic.x },
  { handle: "rishiashar", platform: "Read.cv", href: "https://read.cv", icon: ic.readcv },
]

type ToolItem = {
  name: string
  kind: "tool" | "stack"
}

const tools: ToolItem[] = [
  { name: "Figma", kind: "tool" },
  { name: "Cursor", kind: "tool" },
  { name: "Claude Code", kind: "tool" },
  { name: "Framer", kind: "tool" },
  { name: "Miro", kind: "tool" },
  { name: "ChatGPT", kind: "tool" },
  { name: "Lovable", kind: "tool" },
  { name: "Gemini", kind: "tool" },
]

const techStack: ToolItem[] = [
  { name: "Codex", kind: "stack" },
  { name: "Next.js", kind: "stack" },
]

const testimonials = [
  {
    name: "Renata Lewis",
    role: "Principal Experience Designer",
    company: "Autodesk",
    quote:
      "I was so impressed by his talent and initiative. He quickly ramped up on a complex project and delivered high-quality design work. He also went above and beyond to find creative ways to experiment with AI and proposed thoughtful new solutions.",
    portrait: "/portraits/renata.png",
    objectPosition: "50% 18%",
    gradientVariant: "aqua" as const,
  },
  {
    name: "Kanishka Patel",
    role: "CEO & Co-Founder",
    company: "WeHear Innovations",
    quote:
      "Rishi was an exceptional UX Designer intern at WeHear. His dedication and innovative user testing techniques significantly improved our product. His creativity and teamwork made a big impact on our projects.",
    portrait: "/portraits/kanishka.png",
    objectPosition: "50% 8%",
    portraitScale: 2.28,
    portraitTranslateY: "8%",
    portraitTransformOrigin: "50% 18%",
    gradientVariant: "ember" as const,
  },
]

/* ════════════════════════════════════════════
   Page
   ════════════════════════════════════════════ */

export default function Home() {
  useEffect(() => {
    const syncTheme = () => {
      applyResolvedTheme()
    }

    const mediaQuery = window.matchMedia(THEME_MEDIA_QUERY)
    const handleSystemThemeChange = () => {
      const themePreference = getStoredThemePreference()

      if (themePreference !== null && themePreference !== "system") {
        return
      }

      syncTheme()
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key && event.key !== THEME_STORAGE_KEY) {
        return
      }

      syncTheme()
    }

    syncTheme()
    mediaQuery.addEventListener("change", handleSystemThemeChange)
    window.addEventListener("storage", handleStorage)

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange)
      window.removeEventListener("storage", handleStorage)
    }
  }, [])

  return (
    <main
      className="min-h-[100dvh] px-4 transition-colors duration-500 sm:px-0"
      style={{ backgroundColor: "var(--page-frame-bg)", color: "var(--page-fg)", overflowX: "clip" }}
    >
      <IntroOverlay />
      <div
        className="relative isolate mx-auto min-h-[100dvh] max-w-[780px] border-x transition-colors duration-500"
        style={{
          backgroundColor: "var(--page-bg)",
          borderColor: "var(--page-border)",
          overflow: "visible",
        }}
      >
        <div className="relative z-[1] px-4 pb-20 pt-0 sm:px-6 sm:pb-28 sm:pt-0">
          <ScrollBlurFadeTop />
          <SiteHeader />
          {/* ── Hero ── */}
          <Fade>
            <HomeHero />
          </Fade>

        <Section label="Experience" hideLabel delay={60} variant="visual">
          <div
            className="relative -mx-4 border-t sm:-mx-6"
            style={{
              borderColor: "var(--page-border)",
              fontFamily: "'Satoshi', var(--font-body), sans-serif",
            }}
          >
            <div
              className="px-4 py-3 sm:px-6 sm:py-5 md:py-6"
              style={{ borderBottom: "1px solid var(--page-border)" }}
            >
              <h3
                className="max-w-[13ch] text-[18px] font-medium tracking-[-0.03em] sm:text-[24px] md:text-[28px]"
                style={{ color: "var(--page-fg)", lineHeight: 1.02 }}
              >
                Impact at a Glance
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3">
              {experience.map((e, i) => (
                <article
                  key={e.company}
                  className={`px-4 py-4 sm:px-6 sm:py-6 md:px-5 md:py-7 lg:px-6 lg:py-8 ${
                    i !== experience.length - 1 ? "border-b md:border-b-0 md:border-r" : ""
                  }`}
                  style={{ borderColor: "var(--page-border)" }}
                >
                  <p
                    className="text-[10px] font-semibold tracking-[0.12em] sm:text-[12px]"
                    style={{ color: e.accent }}
                  >
                    {e.company}
                  </p>
                  <p
                    className="mt-2.5 max-w-none text-[14px] font-normal leading-[1.46] tracking-[-0.015em] sm:mt-4 sm:max-w-none sm:text-[16px] sm:leading-[1.58] md:max-w-[17ch] md:text-[15px] md:leading-[1.52] lg:max-w-[20ch] lg:text-[16px] lg:leading-[1.58]"
                    style={{ color: "var(--page-fg-muted)", textWrap: "pretty" }}
                  >
                    {e.summary}
                  </p>
                </article>
              ))}
            </div>

            <div className="relative h-6 overflow-visible sm:h-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 z-10 h-px w-screen -translate-x-1/2"
                style={{ backgroundColor: "var(--page-border)" }}
              />
              <PlusMark
                edge="left"
                className="absolute left-0 top-0 z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ color: "var(--page-fg-faint)" }}
                size={10}
              />
              <PlusMark
                edge="right"
                className="absolute right-0 top-0 z-10 translate-x-1/2 -translate-y-1/2"
                style={{ color: "var(--page-fg-faint)" }}
                size={10}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 z-0"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--page-bg) 96%, var(--page-fg) 4%)",
                  backgroundImage:
                    "repeating-linear-gradient(-60deg, transparent 0 11px, color-mix(in srgb, var(--page-border) 72%, transparent) 11px 13px)",
                }}
              />
            </div>
          </div>
        </Section>

        <Section label="Selected Professional Work" delay={120} variant="visual">
          <div
            className="-mx-4 grid grid-cols-1 sm:-mx-6 md:grid-cols-2"
            style={{ borderTop: "1px solid var(--page-border)" }}
          >
            {selected.map((p, i) => (
              <WorkCard
                key={i}
                title={p.title}
                desc={p.desc}
                image={p.image}
                imageClassName={p.imageClassName}
                imageFrameClassName={p.imageFrameClassName}
                imageWidth={p.imageWidth}
                imageHeight={p.imageHeight}
                href={p.href}
                variant={p.variant}
                paperBackgroundImage={p.paperBackgroundImage}
                paperAccentColor={p.paperAccentColor}
                paperBackgroundStyle={p.paperBackgroundStyle}
                paperMockupStyle={p.paperMockupStyle}
                noBorderRight={i === selected.length - 1}
              />
            ))}
          </div>
        </Section>

        <Section id="projects" label="Projects" delay={180} variant="visual">
          <div
            className="-mx-4 grid grid-cols-1 sm:-mx-6 md:grid-cols-2"
            style={{ borderTop: "1px solid var(--page-border)" }}
          >
            {projects.map((p, i) => (
              <ProjectCard
                key={p.title}
                project={p}
                index={i}
                noBorderRight={i === projects.length - 1}
              />
            ))}
          </div>
        </Section>

        <Section label="Testimonials" delay={240} variant="visual">
          <div
            className="-mx-4 grid grid-cols-1 sm:-mx-6 md:grid-cols-2"
            style={{ borderTop: "1px solid var(--page-border)" }}
          >
            {testimonials.map((t, i) => (
              <TestimonialCard
                key={t.name}
                {...t}
                noBorderRight={i === testimonials.length - 1}
              />
            ))}
          </div>
        </Section>

        <Section label="Tools and Tech Stack" delay={300} variant="visual">
          <ToolsCarousel />
        </Section>

        <Section label="Connect" delay={360}>
          <div className="flex flex-col gap-1">
            {connect.map((c, i) => (
              <ListItem key={i} icon={c.icon} title={c.handle} desc={c.platform} href={c.href} external={!c.href.startsWith("mailto")} />
            ))}
          </div>
        </Section>

        <Fade d={420}>
          <SiteFooter />
        </Fade>
        </div>
      </div>
    </main>
  )
}

/* ════════════════════════════════════════════
   Shared sub-components
   ════════════════════════════════════════════ */

// `ToolMark` lives in `@/components/tool-mark` so case-study pages can reuse
// the same logo treatment. Imported at the top of this file.

function ToolsCarousel() {
  const allItems = [...tools, ...techStack]
  // Duplicate so the scroll loops seamlessly (animate -50% = exactly one full set)
  const doubled = [...allItems, ...allItems]

  return (
    <>
      <style>{`
        @keyframes carousel-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .carousel-track {
          position: relative;
          z-index: 1;
          animation: carousel-scroll 36s linear infinite;
          will-change: transform;
        }
        .carousel-track:hover {
          animation-play-state: paused;
        }
        .carousel-window {
          position: relative;
          overflow-x: clip;
          overflow-y: visible;
        }
        .carousel-window::before,
        .carousel-window::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          z-index: 2;
          width: clamp(56px, 10vw, 120px);
          pointer-events: none;
        }
        .carousel-window::before {
          left: 0;
          background: linear-gradient(to right, var(--page-bg), transparent);
        }
        .carousel-window::after {
          right: 0;
          background: linear-gradient(to left, var(--page-bg), transparent);
        }
        @media (prefers-reduced-motion: reduce) {
          .carousel-track { animation: none; }
        }
      `}</style>
      <div className="carousel-window -mx-4 sm:-mx-6">
        <div className="carousel-track flex w-max items-center gap-10 px-4 py-9 sm:gap-12 sm:px-6 sm:py-10">
          {doubled.map((item, i) => (
            <ToolBadge
              key={i}
              name={item.name}
              className="h-12 w-12 sm:h-14 sm:w-14"
            />
          ))}
        </div>
      </div>
    </>
  )
}

function ListItem({
  icon,
  title,
  desc,
  href,
  external,
}: {
  icon: React.ReactNode
  title: string
  desc: string
  href: string
  external?: boolean
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex min-h-12 items-start gap-4 px-1 py-3 transition-colors duration-300 hover:bg-[color:var(--page-hover)] focus-visible:bg-[color:var(--page-hover)] sm:items-center"
    >
      <span
        className="surface-shadow flex h-10 w-10 shrink-0 items-center justify-center transition-colors duration-300"
        style={{ color: "var(--page-fg-faint)" }}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="break-words text-[14px] font-medium" style={{ color: "var(--page-fg)" }}>
          {title}
        </p>
        <p className="text-[13px]" style={{ color: "var(--page-fg-faint)" }}>
          {desc}
        </p>
      </div>
    </a>
  )
}
