import type { Metadata } from "next"
import Image from "next/image"
import { CaseStudyProgressNav } from "@/components/case-study-progress-nav"
import { PlusMark } from "@/components/plus-mark"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ToolBadge } from "@/components/tool-badge"
import { LivePrototypeFrame } from "@/components/live-prototype-frame"

export const metadata: Metadata = {
  title: "Intelligent Activity Log Analyzer",
  description:
    "A case study about turning Autodesk Account activity logs into an early warning system for admins.",
}

type SectionProps = {
  id?: string
  label: string
  children: React.ReactNode
  className?: string
}

const overview = [
  {
    label: "Role",
    values: ["UX Designer", "Vibe Coder"],
  },
  {
    label: "Skills",
    values: ["Prototyping", "AI Integrated Design"],
  },
  {
    label: "Team",
    values: [
      "Rishi Ashar (Me)",
      "Vardnan Sivarajah",
      "UX Engineer - Autodesk",
    ],
  },
  {
    label: "Timeline",
    values: ["2 weeks", "August 2025", "Design and Prototype"],
  },
]

const tools = ["Cursor", "Figma", "Figma Make"]

const activityLogPrototypeUrl =
  "https://responsive-account-dashboard-layout.vercel.app/"

const caseStudySections = [
  { id: "introduction", label: "Introduction" },
  { id: "context", label: "Context" },
  { id: "problem", label: "The problem" },
  { id: "insights", label: "Key insights" },
  { id: "solution", label: "Solution" },
  { id: "decision-logic", label: "Decision logic" },
  { id: "design-decisions", label: "Design decisions" },
  { id: "learnings", label: "Learnings" },
] as const

const coreProblems = [
  {
    title: "Buried in data",
    body: "Thousands of rows of events gave admins a record, but no story or summary.",
  },
  {
    title: "No early warning",
    body: "Risky behavior like sudden license revocations, admin role changes, or self-assignments could go unnoticed until work was already blocked.",
  },
]

const insightCards = [
  {
    title: "Unusual Activity",
    body: "Flags repeated access removals, suspicious self-assignments, and admin behavior that may require review.",
  },
  {
    title: "Projects",
    body: "Summarizes new, archived, deleted, and renamed projects so admins can understand structural changes quickly.",
  },
  {
    title: "Members",
    body: "Condenses additions, removals, reinstatements, and role updates into a readable team movement summary.",
  },
]

function Label({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div className="relative mb-6 pt-8">
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
      <h2
        id={id}
        className="m-0 text-[12px] uppercase tracking-widest"
        style={{ color: "var(--page-fg-faint)" }}
      >
        {children}
      </h2>
    </div>
  )
}

function AutodeskAccountHomepageVisual() {
  return (
    <div
      aria-label="Autodesk Account homepage screenshot on the project background"
      role="img"
      className="content-image-outline relative w-full max-w-full overflow-hidden border"
      style={{
        aspectRatio: "16 / 10",
        borderColor: "var(--page-border)",
        minHeight: "clamp(220px, 68vw, 320px)",
      }}
    >
      <Image
        src="/work/activity-log-paper-sunset.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes="(min-width: 780px) 720px, 100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.24))",
        }}
      />

      <Image
        src="/work/landing-page-insights.png"
        alt=""
        aria-hidden="true"
        width={4320}
        height={5712}
        sizes="(min-width: 780px) 680px, 92vw"
        className="absolute left-1/2 top-6 w-[92%] max-w-[670px] -translate-x-1/2 shadow-[0_24px_70px_rgba(20,12,44,0.34)] ring-1 ring-black/15 sm:top-8 sm:w-[88%]"
      />
    </div>
  )
}

function ActivityLogScreenVisual() {
  return (
    <div
      aria-label="Current Autodesk Activity Log screen"
      role="img"
      className="content-image-outline relative isolate w-full max-w-full overflow-hidden border p-3 sm:p-5"
      style={{ borderColor: "var(--page-border)" }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 dark:hidden"
        style={{
          background:
            "radial-gradient(circle at 12% 8%, rgba(248,184,78,0.42), transparent 42%), radial-gradient(circle at 88% 12%, rgba(239,111,159,0.36), transparent 44%), radial-gradient(circle at 82% 90%, rgba(111,128,255,0.38), transparent 48%), linear-gradient(135deg, #fff0d2 0%, #ffd7e5 50%, #dde2ff 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(circle at 12% 10%, rgba(248,184,78,0.38), transparent 42%), radial-gradient(circle at 88% 14%, rgba(239,111,159,0.40), transparent 46%), radial-gradient(circle at 84% 90%, rgba(111,128,255,0.44), transparent 50%), linear-gradient(135deg, #5b4227 0%, #553047 48%, #292c68 100%)",
        }}
      />
      <div className="relative z-10 w-full max-w-full overflow-x-auto overscroll-x-contain pb-1 sm:overflow-visible sm:pb-0">
        <Image
          src="/work/activity-log-existing-layout-new-button.png"
          alt=""
          aria-hidden="true"
          width={5768}
          height={4788}
          sizes="(min-width: 780px) 680px, 560px"
          className="block h-auto w-[560px] max-w-none shadow-[0_18px_60px_rgba(35,20,66,0.22)] ring-1 ring-black/10 sm:w-full sm:max-w-full"
        />
      </div>
    </div>
  )
}

function ActivityLogPrototypeHero() {
  return (
    <div
      aria-label="Interactive Activity Log Analyzer prototype on the project background"
      className="content-image-outline relative isolate mt-12 w-full max-w-full overflow-hidden border"
      style={{
        aspectRatio: "1868 / 1080",
        borderColor: "var(--page-border)",
      }}
    >
      <Image
        src="/work/activity-log-paper-sunset.webp"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="(min-width: 780px) 720px, 100vw"
        className="object-cover"
        style={{ objectPosition: "50% 70%" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 16% 18%, rgba(248,184,78,0.34), transparent 38%), radial-gradient(circle at 84% 76%, rgba(111,128,255,0.28), transparent 42%), linear-gradient(180deg, rgba(20,24,38,0.1), rgba(20,24,38,0.22))",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-8 bottom-5 h-9 blur-2xl sm:bottom-7"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(15,18,28,0.34), transparent)",
        }}
      />

      <div className="absolute left-1/2 top-[7.5%] h-[900px] w-[1280px] origin-top -translate-x-1/2 scale-[0.27] overflow-hidden bg-[#f9f9f9] shadow-[0_24px_70px_rgba(12,16,28,0.34)] ring-1 ring-black/20 min-[400px]:scale-[0.31] min-[540px]:scale-[0.39] sm:scale-[0.46] md:scale-[0.5]">
        <LivePrototypeFrame
          url={activityLogPrototypeUrl}
          title="Responsive Autodesk Account dashboard prototype"
          className="h-full w-full border-0 bg-white"
        />
      </div>
    </div>
  )
}

function BuriedTableVisual() {
  return (
    <div
      aria-label="Activity Log table rows buried in a dense record"
      role="img"
      className="content-image-outline relative flex aspect-[16/4.6] w-full max-w-full items-center justify-center overflow-hidden border p-3 sm:aspect-[16/3.8] sm:p-4"
      style={{
        borderColor: "var(--page-border)",
        minHeight: "clamp(118px, 36vw, 150px)",
      }}
    >
      <Image
        src="/work/activity-log-paper-sunset.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes="(min-width: 780px) 720px, 100vw"
        className="scale-[1.32] object-cover"
        style={{ objectPosition: "50% 88%" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(68,44,58,0.34), rgba(211,112,142,0.16) 46%, rgba(42,49,116,0.32))",
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-full overflow-x-auto overscroll-x-contain shadow-[0_12px_32px_rgba(35,20,66,0.18)] sm:max-w-[680px] sm:overflow-hidden">
        <Image
          src="/work/activity-log-table-preview.png"
          alt=""
          aria-hidden="true"
          width={5184}
          height={704}
          sizes="(min-width: 780px) 680px, 560px"
          className="block h-auto w-[560px] max-w-none sm:w-[calc(100%+2px)] sm:-translate-x-px sm:-translate-y-px"
        />
      </div>
    </div>
  )
}

function SupportForumScreenshotVisual() {
  return (
    <div
      aria-label="Support forum post about active licenses revoked at random"
      role="img"
      className="content-image-outline w-full max-w-full overflow-hidden border"
      style={{ borderColor: "var(--page-border)" }}
    >
      <div className="w-full max-w-full overflow-x-auto overscroll-x-contain">
        <Image
          src="/work/support-forum-license-revoked.png"
          alt=""
          aria-hidden="true"
          width={3376}
          height={2550}
          sizes="(min-width: 780px) 720px, 560px"
          className="block h-auto w-[560px] max-w-none sm:w-full sm:max-w-full"
        />
      </div>
    </div>
  )
}

function AdminOwnershipIssueVisual() {
  return (
    <figure
      aria-label="Admin ownership issue evidence"
      role="img"
      className="content-image-outline w-full max-w-full border p-3 sm:p-5"
      style={{
        borderColor: "var(--page-border)",
        backgroundColor: "var(--page-bg)",
      }}
    >
      <figcaption
        className="mb-3 font-heading text-[18px] font-medium leading-tight tracking-[-0.02em]"
        style={{ color: "var(--page-fg)" }}
      >
        Admin ownership Issue
      </figcaption>
      <div
        className="w-full max-w-full overflow-x-auto overscroll-x-contain border"
        style={{ borderColor: "var(--page-border)" }}
      >
        <Image
          src="/work/admin-ownership-issue.png"
          alt=""
          aria-hidden="true"
          width={3376}
          height={872}
          sizes="(min-width: 780px) 680px, 560px"
          className="block h-auto w-[560px] max-w-none sm:w-full sm:max-w-full"
        />
      </div>
      <p
        className="mt-3 text-center text-[14px] italic leading-snug sm:text-[15px]"
        style={{ color: "var(--page-fg-muted)" }}
      >
        Lack of visibility into who changed account ownership or access
      </p>
    </figure>
  )
}

function Section({ id, label, children, className = "" }: SectionProps) {
  const headingId =
    id ??
    label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

  return (
    <section
      id={id}
      aria-labelledby={`${headingId}-heading`}
      className={`scroll-mt-24 ${className}`}
    >
      <Label id={`${headingId}-heading`}>{label}</Label>
      {children}
    </section>
  )
}

function EmptyVisual({
  label,
  ratio = "16 / 10",
  minHeight = "220px",
  className = "",
}: {
  label: string
  ratio?: string
  minHeight?: string
  className?: string
}) {
  return (
    <div
      aria-label={label}
      role="img"
      className={`content-image-outline relative overflow-hidden ${className}`}
      style={{
        aspectRatio: ratio,
        minHeight: `clamp(140px, 58vw, ${minHeight})`,
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--page-surface) 94%, var(--page-bg) 6%), color-mix(in srgb, var(--page-bg) 92%, var(--page-fg) 8%))",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--page-border) 1px, transparent 1px), linear-gradient(90deg, var(--page-border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.22,
        }}
      />
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-3 w-3"
        style={{
          borderLeft: "1px solid var(--page-fg-faint)",
          borderTop: "1px solid var(--page-fg-faint)",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute bottom-0 right-0 h-3 w-3"
        style={{
          borderBottom: "1px solid var(--page-fg-faint)",
          borderRight: "1px solid var(--page-fg-faint)",
        }}
      />
    </div>
  )
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mx-auto my-10 max-w-[18ch] text-center font-heading text-[28px] font-semibold leading-[1.18] tracking-[-0.035em] sm:my-12 sm:text-[34px]"
      style={{ color: "var(--page-fg)" }}
    >
      {children}
    </p>
  )
}

function BodyCopy({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`max-w-[680px] space-y-5 text-[15px] leading-[1.8] sm:text-[16px] ${className}`}
      style={{ color: "var(--page-fg-muted)" }}
    >
      {children}
    </div>
  )
}

function NumberedInsight({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <article className="space-y-3">
      <h3
        className="font-heading text-[22px] font-semibold leading-tight tracking-[-0.025em]"
        style={{ color: "var(--page-fg)" }}
      >
        <span className="mr-2 tabular-nums">{number}.</span>
        {title}
      </h3>
      <p className="max-w-[690px] text-[15px] leading-[1.8] sm:text-[16px]" style={{ color: "var(--page-fg-muted)" }}>
        {children}
      </p>
    </article>
  )
}

function TextCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <article
      className="p-4 sm:p-5"
      style={{
        border: "1px solid var(--page-border)",
        backgroundColor: "var(--page-bg)",
      }}
    >
      <h3
        className="font-heading text-[18px] font-semibold leading-tight tracking-[-0.02em]"
        style={{ color: "var(--page-fg)" }}
      >
        {title}
      </h3>
      <p className="mt-3 text-[14px] leading-[1.7]" style={{ color: "var(--page-fg-muted)" }}>
        {children}
      </p>
    </article>
  )
}

export default function IntelligentActivityLogAnalyzerPage() {
  return (
    <main
      className="min-h-[100dvh] px-4 transition-colors duration-500 sm:px-0"
      style={{
        backgroundColor: "var(--page-frame-bg)",
        color: "var(--page-fg)",
        overflowX: "clip",
      }}
    >
      <div
        className="relative mx-auto min-h-[100dvh] max-w-[780px] border-x transition-colors duration-500"
        style={{
          backgroundColor: "var(--page-bg)",
          borderColor: "var(--page-border)",
        }}
      >
        <CaseStudyProgressNav sections={caseStudySections} />
        <div className="px-4 pb-20 pt-0 sm:px-6 sm:pb-28 sm:pt-0">
          <SiteHeader />

          <article className="min-w-0">
            <header
              id="introduction"
              className="scroll-mt-24 pt-6 sm:pt-8"
            >
              <p
                className="text-[12px] font-semibold uppercase tracking-[0.16em]"
                style={{ color: "var(--page-fg-faint)" }}
              >
                Autodesk
              </p>
              <h1
                className="mt-4 max-w-[720px] font-heading text-[42px] font-bold leading-[0.96] tracking-[-0.055em] sm:text-[64px]"
                style={{ color: "var(--page-fg)" }}
              >
                <span
                  style={{
                    backgroundImage:
                      "linear-gradient(95deg, #f8b84e 0%, #ef6f9f 44%, #6f80ff 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Intelligent
                </span>{" "}
                Activity Log Analyzer
              </h1>
              <p
                className="mt-6 max-w-[650px] text-[17px] leading-[1.7] sm:text-[18px]"
                style={{ color: "var(--page-fg-muted)" }}
              >
                An AI-powered layer that turns raw Autodesk Account activity
                logs into structured, human-readable insights and proactive
                alerts for admins.
              </p>

              <ActivityLogPrototypeHero />

              {/* Metadata row + tools — bracketed by full-bleed page-frame
                  lines with PlusMark registration glyphs at the four
                  intersections, matching the section divider pattern from
                  the home page. The grid extends to the page-frame edges
                  via -mx-4 / sm:-mx-6 (cancels the parent's px-4 / sm:px-6),
                  with cells re-padded internally. */}
              <div className="relative mt-10 -mx-4 sm:-mx-6">
                {/* Top full-bleed divider line */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-0 h-px w-screen -translate-x-1/2"
                  style={{ backgroundColor: "var(--page-border)" }}
                />
                {/* Bottom full-bleed divider line */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 bottom-0 h-px w-screen -translate-x-1/2"
                  style={{ backgroundColor: "var(--page-border)" }}
                />
                {/* Registration marks at each frame-border intersection */}
                <PlusMark
                  edge="left"
                  size={10}
                  className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
                  style={{ color: "var(--page-fg-faint)" }}
                />
                <PlusMark
                  edge="right"
                  size={10}
                  className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2"
                  style={{ color: "var(--page-fg-faint)" }}
                />
                <PlusMark
                  edge="left"
                  size={10}
                  className="absolute left-0 bottom-0 -translate-x-1/2 translate-y-1/2"
                  style={{ color: "var(--page-fg-faint)" }}
                />
                <PlusMark
                  edge="right"
                  size={10}
                  className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2"
                  style={{ color: "var(--page-fg-faint)" }}
                />

                {/* Metadata: Role / Skills / Team / Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  {overview.map((item, index) => (
                    <div
                      key={item.label}
                      className={`px-4 py-5 sm:px-6 ${index !== overview.length - 1 ? "border-b sm:border-r lg:border-b-0" : ""} ${index === 1 ? "sm:border-r-0 lg:border-r" : ""}`}
                      style={{ borderColor: "var(--page-border)" }}
                    >
                      <p
                        className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: "var(--page-fg)" }}
                      >
                        {item.label}
                      </p>
                      <div className="mt-3 space-y-1">
                        {item.values.map((value) => (
                          <p
                            key={value}
                            className="text-[14px] leading-[1.5]"
                            style={{ color: "var(--page-fg-muted)" }}
                          >
                            {value}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tools — label + logo marks (no name chips), divider above
                    keeps it visually attached to the metadata block. */}
                <div
                  className="px-4 py-5 sm:px-6"
                  style={{ borderTop: "1px solid var(--page-border)" }}
                >
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: "var(--page-fg)" }}
                  >
                    Tools
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-8">
                    {tools.map((tool) => (
                      <ToolBadge
                        key={tool}
                        name={tool}
                        className="h-10 w-10 sm:h-12 sm:w-12"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </header>

            <div
              aria-hidden="true"
              className="-mx-4 h-12 sm:-mx-6 sm:h-16"
              style={{
                backgroundColor: "color-mix(in srgb, var(--page-bg) 96%, var(--page-fg) 4%)",
                backgroundImage:
                  "repeating-linear-gradient(-60deg, transparent 0 11px, color-mix(in srgb, var(--page-border) 72%, transparent) 11px 13px)",
              }}
            />

            <Section id="context" label="Context" className="mb-14">
              <BodyCopy>
                <h3
                  className="font-heading text-[28px] font-semibold leading-tight tracking-[-0.035em] sm:text-[34px]"
                  style={{ color: "var(--page-fg)" }}
                >
                  What is Autodesk Account?
                </h3>
                <p>
                  Autodesk Account is where organizations control everything
                  related to Autodesk software: users, teams, admin roles,
                  licenses, product access, billing, and activity. It is used by
                  IT administrators and program managers who manage access for
                  engineers, architects, designers, consultants, and contractors
                  across projects.
                </p>
                <p>Admins use it to:</p>
                <ul className="list-disc space-y-1 pl-6">
                  <li>Assign and revoke licenses</li>
                  <li>Manage who has access to what</li>
                  <li>Control who can make changes</li>
                  <li>Track activity across teams</li>
                </ul>
              </BodyCopy>
              <div className="mt-8">
                <AutodeskAccountHomepageVisual />
              </div>
            </Section>

            <Section id="problem" label="The Problem" className="mb-14">
              <BodyCopy>
                <h3
                  className="font-heading text-[30px] font-semibold leading-tight tracking-[-0.04em] sm:text-[38px]"
                  style={{ color: "var(--page-fg)" }}
                >
                  What admins see today
                </h3>
                <p>
                  The Activity Log records every action, but it was never
                  designed to help admins interpret behavior.
                </p>
              </BodyCopy>

              <div className="mt-8 border p-4 sm:p-5" style={{ borderColor: "var(--page-border)" }}>
                <h3
                  className="font-heading text-[24px] font-semibold tracking-[-0.025em]"
                  style={{ color: "var(--page-fg)" }}
                >
                  What is Activity Log?
                </h3>
                <p
                  className="mt-3 text-[15px] leading-[1.8] sm:text-[16px]"
                  style={{ color: "var(--page-fg-muted)" }}
                >
                  The Activity Log is the place where every action inside
                  Autodesk Account is recorded. It tracks events like user
                  additions and removals, license assignments, project creation,
                  admin role changes, and access updates.
                </p>
                <div className="mt-5">
                  <ActivityLogScreenVisual />
                </div>
              </div>

              <h3
                className="mt-10 font-heading text-[24px] font-semibold leading-tight tracking-[-0.025em]"
                style={{ color: "var(--page-fg)" }}
              >
                Admins face these core problems
              </h3>
              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                {coreProblems.map((problem) => (
                  <TextCard key={problem.title} title={problem.title}>
                    {problem.body}
                  </TextCard>
                ))}
              </div>
              <div className="mt-6">
                <BuriedTableVisual />
              </div>

              <PullQuote>
                The system stores information. It does not create{" "}
                <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
                  &quot;Understanding&quot;
                </em>
              </PullQuote>
            </Section>

            <Section id="insights" label="Key Insights" className="mb-14">
              <BodyCopy>
                <h3
                  className="font-heading text-[30px] font-semibold leading-tight tracking-[-0.04em] sm:text-[38px]"
                  style={{ color: "var(--page-fg)" }}
                >
                  The biggest friction isn&apos;t action. It&apos;s awareness.
                </h3>
                <p>
                  Admins can make changes easily, but they struggle to
                  understand what actually happened after something goes wrong,
                  who caused it, and whether it was a normal action or a risky
                  one.
                </p>
              </BodyCopy>

              <div className="mt-8 space-y-10">
                <NumberedInsight
                  number="1"
                  title="When things break, admins find out too late"
                >
                  Admins only realize something is wrong after real work is
                  already blocked. By the time they reach the Activity Log or
                  support forums, users are locked out and productivity is
                  already damaged. The system does not help prevent problems. It
                  only records them after they happen.
                </NumberedInsight>
                <SupportForumScreenshotVisual />

                <NumberedInsight
                  number="2"
                  title="No clear accountability for critical actions"
                >
                  There is no clear way to understand who changed what and why.
                  Admins are left guessing whether an action was intentional,
                  accidental, or malicious because the Activity Log shows events
                  without context or accountability.
                </NumberedInsight>
                <AdminOwnershipIssueVisual />
              </div>
            </Section>

            <Section id="solution" label="Solution" className="mb-14">
              <BodyCopy>
                <h3
                  className="font-heading text-[30px] font-semibold leading-tight tracking-[-0.04em] sm:text-[38px]"
                  style={{ color: "var(--page-fg)" }}
                >
                  Turning the admin homepage into an early warning system
                </h3>
                <p>
                  The solution adds an AI-powered layer that transforms raw
                  activity logs into structured, human-readable insights and
                  proactive alerts.
                </p>
              </BodyCopy>
              <div className="mt-8">
                <EmptyVisual
                  label="Reserved image slot for the Activity Log Analyzer solution"
                  ratio="16 / 10"
                  minHeight="280px"
                />
              </div>

              <h3
                className="mt-12 font-heading text-[28px] font-semibold tracking-[-0.035em] sm:text-[34px]"
                style={{ color: "var(--page-fg)" }}
              >
                The solution works in two layers
              </h3>

              <div className="mt-7 space-y-9">
                <article>
                  <h4
                    className="font-heading text-[22px] font-semibold leading-tight tracking-[-0.025em]"
                    style={{ color: "var(--page-fg)" }}
                  >
                    1. The Early Signal (Awareness Layer)
                  </h4>
                  <p className="mt-3 text-[15px] leading-[1.8] sm:text-[16px]" style={{ color: "var(--page-fg-muted)" }}>
                    A small, focused message tells admins something important
                    has changed and their attention may be needed. It appears on
                    the homepage, where decisions already happen, instead of
                    hiding inside reports.
                  </p>
                  <div className="mt-5">
                    <EmptyVisual
                      label="Reserved image slot for the early signal on the homepage"
                      ratio="16 / 10"
                      minHeight="250px"
                    />
                  </div>
                </article>

                <article>
                  <h4
                    className="font-heading text-[22px] font-semibold leading-tight tracking-[-0.025em]"
                    style={{ color: "var(--page-fg)" }}
                  >
                    2. Actionable Insights (Where Decisions Happen)
                  </h4>
                  <p className="mt-3 text-[15px] leading-[1.8] sm:text-[16px]" style={{ color: "var(--page-fg-muted)" }}>
                    This is where the Activity Log stops being a record and
                    starts being a guide. The system no longer just shows what
                    happened. It explains what it means.
                  </p>
                  <div className="mt-5">
                    <EmptyVisual
                      label="Reserved image slot for structured insight cards in Activity Log"
                      ratio="16 / 10"
                      minHeight="250px"
                    />
                  </div>
                </article>
              </div>

              <BodyCopy className="mt-9">
                <p>
                  These insight cards are not fixed. What shows up depends on
                  what is happening inside the account.
                </p>
                <p>
                  Some weeks, there is no unusual behavior at all. The page
                  stays quiet and focuses on structural changes like projects or
                  member updates. Other weeks, patterns emerge that deserve
                  attention, and those insights naturally move to the top.
                </p>
              </BodyCopy>
            </Section>

            <Section id="decision-logic" label="Decision Logic" className="mb-14">
              <BodyCopy>
                <h3
                  className="font-heading text-[30px] font-semibold leading-tight tracking-[-0.04em] sm:text-[38px]"
                  style={{ color: "var(--page-fg)" }}
                >
                  How does the system decide what deserves attention?
                </h3>
                <p>
                  In the existing experience, patterns were buried inside the
                  activity log as individual rows. Admins could technically find
                  them, but only if they already knew what they were looking for.
                  Most of the time, they discovered something was wrong only
                  after someone could not log in or a project came to a halt.
                </p>
              </BodyCopy>

              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] md:items-center">
                <EmptyVisual
                  label="Reserved image slot for an unusual activity insight card"
                  ratio="4 / 3"
                  minHeight="230px"
                />
                <div>
                  <h3
                    className="font-heading text-[24px] font-semibold leading-tight tracking-[-0.025em]"
                    style={{ color: "var(--page-fg)" }}
                  >
                    Unusual Activity brings those patterns to the surface.
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.8] sm:text-[16px]" style={{ color: "var(--page-fg-muted)" }}>
                    For example, when an admin repeatedly removes people&apos;s
                    access from a particular product or self-assigns a role, the
                    system can flag the pattern as unusual and show it before it
                    becomes a support issue.
                  </p>
                </div>
              </div>
            </Section>

            <Section id="design-decisions" label="Design Decisions" className="mb-14">
              <BodyCopy>
                <h3
                  className="font-heading text-[30px] font-semibold leading-tight tracking-[-0.04em] sm:text-[38px]"
                  style={{ color: "var(--page-fg)" }}
                >
                  Clicking revealed more information, but not understanding
                </h3>
                <p>
                  In an early version, clicking the message expanded a summary
                  inside the Activity Log. It grouped recent changes into a
                  readable block instead of forcing admins to scan every row.
                  That helped, but only partially.
                </p>
              </BodyCopy>
              <div className="mt-7">
                <EmptyVisual
                  label="Reserved image slot for Version 1 prototype"
                  ratio="16 / 10"
                  minHeight="270px"
                />
              </div>
              <BodyCopy className="mt-7">
                <p>
                  In reality, that is not how problems show up. Admins do not
                  open logs proactively. They open them after something breaks.
                  When users lose access, licenses disappear, or projects stop
                  working, the question is not &quot;what happened this
                  week?&quot; It is &quot;what just went wrong?&quot;
                </p>
                <p>
                  That gap made the limitation clear. Surfacing a better summary
                  inside the Activity Log was useful, but it still relied on
                  admins to notice problems on their own.
                </p>
                <p>
                  Instead of waiting for admins to come to the log, the system
                  needed to speak up first, directly on the homepage where
                  decisions already happen.
                </p>
              </BodyCopy>

              <h3
                className="mt-11 font-heading text-[28px] font-semibold tracking-[-0.035em] sm:text-[34px]"
                style={{ color: "var(--page-fg)" }}
              >
                Reducing text and increasing structure
              </h3>
              <div className="mt-6">
                <EmptyVisual
                  label="Reserved image slot for Version 2 prototype"
                  ratio="16 / 8"
                  minHeight="210px"
                />
              </div>
              <BodyCopy className="mt-7">
                <p>
                  The first version of the Activity Log tried to answer every
                  question at once. All the information was technically correct,
                  but it came through as a dense block of text.
                </p>
                <p>
                  Critical signals were buried alongside routine updates, and
                  everything looked equally important. To make sense of it,
                  admins had to slow down, read carefully, and already know what
                  they were looking for.
                </p>
                <p>
                  Feedback from my mentors pushed me to rethink how information
                  was being presented.
                </p>
              </BodyCopy>
              <div className="mt-7">
                <EmptyVisual
                  label="Reserved image slot for Version 3 structured insight cards"
                  ratio="16 / 8"
                  minHeight="220px"
                />
              </div>
              <BodyCopy className="mt-7">
                <p>
                  Instead of asking admins to read paragraphs, I focused on
                  structure. Modern LLMs are naturally good at producing
                  structured outputs like JSON, so I leaned into that strength.
                  Rather than generating prose, the system outputs clearly
                  defined chunks: categories, counts, and short statements that
                  can be mapped directly to UI components.
                </p>
              </BodyCopy>

              <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
                {insightCards.map((card) => (
                  <TextCard key={card.title} title={card.title}>
                    {card.body}
                  </TextCard>
                ))}
              </div>
            </Section>

            <Section id="learnings" label="Learnings" className="mb-0">
              <div className="space-y-8">
                <NumberedInsight number="1" title="An insight should lead somewhere">
                  An insight without a clear next step still adds mental effort.
                  The moments that worked best were when the insight quietly
                  pointed to what to do next, like viewing users, checking
                  affected projects, or reviewing a suspicious admin action.
                </NumberedInsight>

                <NumberedInsight number="2" title="AI output needs product structure">
                  The design became stronger when the AI was treated less like a
                  paragraph writer and more like a system that could sort,
                  classify, and prioritize account activity into stable interface
                  patterns.
                </NumberedInsight>

                <NumberedInsight number="3" title="Enterprise tools should stay calm">
                  The experience could not feel dramatic or noisy. The strongest
                  version was quiet: a small signal on the homepage, structured
                  cards inside the log, and enough context for admins to act
                  without reading through every row.
                </NumberedInsight>
              </div>
            </Section>
          </article>

          <SiteFooter />
        </div>
      </div>
    </main>
  )
}
