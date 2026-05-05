import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CaseStudyProgressNav } from "@/components/case-study-progress-nav"
import { PlusMark } from "@/components/plus-mark"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ToolBadge } from "@/components/tool-badge"

export const metadata: Metadata = {
  title: "UniConnect",
  description:
    "A University of Toronto UX case study about helping new students make meaningful connections and feel at home.",
}

type SectionProps = {
  id: string
  label: string
  children: ReactNode
  className?: string
}

const overview = [
  {
    label: "Role",
    values: ["UI Designer", "UX Researcher"],
  },
  {
    label: "Skills",
    values: ["Experience Design", "User Research"],
  },
  {
    label: "Timeline",
    values: ["Sept - Nov 2024"],
  },
  {
    label: "Team",
    values: [
      "Rishi Ashar (Me)",
      "Harshita Verma (UXD Student)",
      "Landuo Wei (UXD Student)",
      "Elsie Dong (UXD Student)",
    ],
  },
]

const tools = ["Figma", "Miro"]

const caseStudySections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "approach", label: "Our Approach" },
  { id: "discover", label: "Discover" },
  { id: "define", label: "Define" },
  { id: "design", label: "Design" },
  { id: "deliver", label: "Deliver" },
] as const

const personalWins = [
  {
    title: "UI Design & Mentored Team mates",
    body: "Guided two teammates through Figma, helping them learn interface design and prototyping during the early design phase, while owning the UI direction.",
  },
  {
    title: "Conducted User Testing",
    body: "Designed and facilitated usability tests with students, translating their feedback into refined layouts and smoother interactions.",
  },
  {
    title: "Improved Team Coordination",
    body: "Resolved workflow and communication issues within the group, ensuring smooth collaboration and timely project delivery.",
  },
]

const researchFocus = [
  "Major challenges students face when trying to make friends",
  "What they look for when building new connections",
  "How they use social media to socialize",
]

const insights = [
  {
    title: "Forming new friendships can feel overwhelming.",
    body: "People relocating to new cities or joining UofT from outside Toronto often struggle to initiate conversations. This is not limited to introverts. Even extroverts find it difficult in unfamiliar environments.",
  },
  {
    title: "Finding people with similar interests makes connection easier.",
    body: "Students feel more confident and open when they meet others who share their passions or academic interests. Shared interests act as an easy bridge to start conversations.",
  },
  {
    title: "Events play a crucial role in building new connections.",
    body: "Events create natural settings for interaction, helping students meet people in a relaxed environment where conversations happen more organically.",
  },
]

const solutionCards = [
  {
    title: "Find",
    body: "Students can discover social events across campus and the city instead of relying only on official university listings.",
  },
  {
    title: "Meet",
    body: "Communities and event pages make it easier to see who is going, what the vibe is, and where shared interests exist.",
  },
  {
    title: "Belong",
    body: "The experience supports repeated participation so students can move from one-off interactions to real friendships.",
  },
]

const finalFeatures = [
  {
    title: "Effortless Event Participation and Social Connection",
    body: "Makes it easy to join events and connect with like-minded people.",
    points: [
      "Detailed event profiles help users decide which events to attend.",
      "Pre-event socializing shows who else is attending, making it easier to interact before the event.",
      "A streamlined signup process removes repeated form entry and keeps the experience hassle-free.",
    ],
    imageLabel: "Event confirmation UI placeholder",
  },
  {
    title: "Create Events",
    body: "Makes it easy to create events by giving students a simple way to bring people together.",
    points: [
      "Find on-campus venues and free locations, creating more opportunities to connect.",
      "Use an easy two-step event creation flow and quickly invite friends to join.",
    ],
    imageLabel: "Create events UI placeholder",
  },
]

function Label({ id, children }: { id: string; children: ReactNode }) {
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

function Section({ id, label, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`scroll-mt-24 ${className}`}
    >
      <Label id={`${id}-heading`}>{label}</Label>
      {children}
    </section>
  )
}

function BodyCopy({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`max-w-[700px] space-y-5 text-[15px] leading-[1.8] sm:text-[16px] ${className}`}
      style={{ color: "var(--page-fg-muted)" }}
    >
      {children}
    </div>
  )
}

function ImagePlaceholder({
  label,
  ratio = "16 / 10",
  minHeight = "220px",
  dark = false,
  className = "",
}: {
  label: string
  ratio?: string
  minHeight?: string
  dark?: boolean
  className?: string
}) {
  return (
    <div
      aria-label={label}
      role="img"
      className={`content-image-outline relative flex w-full items-center justify-center overflow-hidden border ${className}`}
      style={{
        aspectRatio: ratio,
        minHeight,
        borderColor: dark ? "rgba(255, 194, 45, 0.35)" : "var(--page-border)",
        background: dark
          ? "linear-gradient(135deg, #111111 0%, #18130a 52%, #211303 100%)"
          : "linear-gradient(135deg, color-mix(in srgb, #f6c232 18%, var(--page-bg)), color-mix(in srgb, var(--page-bg) 92%, var(--page-fg) 8%))",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: dark
            ? "linear-gradient(rgba(255, 194, 45, 0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 194, 45, 0.16) 1px, transparent 1px)"
            : "linear-gradient(color-mix(in srgb, var(--page-border) 80%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--page-border) 80%, transparent) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: dark ? 0.32 : 0.24,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 18%, rgba(246, 194, 50, 0.22), transparent 34%), radial-gradient(circle at 84% 78%, rgba(242, 144, 21, 0.2), transparent 38%)",
        }}
      />
      <span
        className="relative z-10 border px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.14em]"
        style={{
          borderColor: dark ? "rgba(255, 194, 45, 0.4)" : "var(--page-border)",
          backgroundColor: dark ? "rgba(0, 0, 0, 0.55)" : "var(--page-bg)",
          color: dark ? "#ffc22d" : "var(--page-fg-faint)",
        }}
      >
        {label}
      </span>
    </div>
  )
}

function TextCard({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <article
      className="border p-4 sm:p-5"
      style={{
        borderColor: "var(--page-border)",
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

function StatCard({
  value,
  children,
}: {
  value: string
  children: ReactNode
}) {
  return (
    <article
      className="border p-5"
      style={{
        borderColor: "var(--page-border)",
        backgroundColor: "var(--page-bg)",
      }}
    >
      <div
        aria-hidden="true"
        className="mb-5 grid grid-cols-10 gap-2"
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <span
            key={index}
            className="h-12 border"
            style={{
              borderColor: index < Number(value) ? "#111111" : "var(--page-border)",
              backgroundColor: index < Number(value) ? "#f6c232" : "transparent",
            }}
          />
        ))}
      </div>
      <p className="text-[15px] leading-[1.7]" style={{ color: "var(--page-fg-muted)" }}>
        <strong style={{ color: "var(--page-fg)" }}>{value} out of 10</strong>{" "}
        {children}
      </p>
    </article>
  )
}

function InsightBox({
  number,
  title,
  children,
}: {
  number: number
  title: string
  children: ReactNode
}) {
  return (
    <article
      className="border p-4 sm:p-5"
      style={{
        borderColor: "#f6c232",
        backgroundColor: "var(--page-bg)",
      }}
    >
      <h3
        className="font-heading text-[18px] font-semibold leading-tight tracking-[-0.02em]"
        style={{ color: "var(--page-fg)" }}
      >
        <span className="mr-2 tabular-nums">{number}.</span>
        {title}
      </h3>
      <p className="mt-3 text-[15px] leading-[1.75]" style={{ color: "var(--page-fg-muted)" }}>
        {children}
      </p>
    </article>
  )
}

function MetadataBlock() {
  return (
    <div className="relative mt-10 -mx-4 sm:-mx-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-screen -translate-x-1/2"
        style={{ backgroundColor: "var(--page-border)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 bottom-0 h-px w-screen -translate-x-1/2"
        style={{ backgroundColor: "var(--page-border)" }}
      />
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
  )
}

function QuoteCard({
  participant,
  quotes,
}: {
  participant: string
  quotes: string[]
}) {
  return (
    <article
      className="grid gap-5 border p-4 sm:grid-cols-[160px_minmax(0,1fr)] sm:p-5"
      style={{
        borderColor: "var(--page-border)",
        backgroundColor: "var(--page-bg)",
      }}
    >
      <div>
        <p
          className="mb-4 text-[13px] font-semibold leading-tight"
          style={{ color: "var(--page-fg)" }}
        >
          Some quotes from {participant}
        </p>
        <ImagePlaceholder label="Portrait placeholder" ratio="1 / 1" minHeight="130px" />
      </div>
      <div className="flex flex-col justify-center gap-5">
        {quotes.map((quote) => (
          <p
            key={quote}
            className="font-heading text-[18px] font-medium italic leading-[1.45] tracking-[-0.02em]"
            style={{ color: "var(--page-fg)" }}
          >
            &ldquo;{quote}&rdquo;
          </p>
        ))}
      </div>
    </article>
  )
}

function JourneyTable() {
  const columns = [
    {
      stage: "Arriving on Campus",
      action: "Moves to university residence",
      painpoint: "Feels isolated and overwhelmed",
      emotion: "Hopeful",
    },
    {
      stage: "First Few Days",
      action: "Attends orientation but does not form strong connections",
      painpoint: "Hard to find like-minded people in groups",
      emotion: "Uncertain",
    },
    {
      stage: "Social Struggles",
      action: "Attempts to meet people through classes or social spaces",
      painpoint: "Fear of rejection and social anxiety",
      emotion: "Anxious",
    },
    {
      stage: "Feeling Disconnect",
      action: "Starts spending more time alone, avoiding social events",
      painpoint: "Feels discouraged and might give up socialising",
      emotion: "Disconnected",
    },
  ]

  return (
    <div className="w-full overflow-x-auto overscroll-x-contain">
      <table
        className="min-w-[720px] border-collapse text-center text-[14px]"
        style={{ color: "var(--page-fg)" }}
      >
        <tbody>
          <tr>
            <th className="border p-4 font-heading text-[18px]" style={{ borderColor: "var(--page-border)" }}>
              Stages
            </th>
            {columns.map((column) => (
              <th
                key={column.stage}
                className="border p-4 font-heading text-[18px] font-semibold"
                style={{ borderColor: "var(--page-border)", backgroundColor: "#f6c232" }}
              >
                {column.stage}
              </th>
            ))}
          </tr>
          {(["action", "painpoint", "emotion"] as const).map((row) => (
            <tr key={row}>
              <th
                className="border p-4 font-heading text-[18px] capitalize"
                style={{ borderColor: "var(--page-border)", backgroundColor: "#f6c232" }}
              >
                {row === "painpoint" ? "Painpoints" : row}
              </th>
              {columns.map((column) => (
                <td
                  key={`${column.stage}-${row}`}
                  className="border p-4 leading-[1.45]"
                  style={{ borderColor: "var(--page-border)" }}
                >
                  {column[row]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function FeasibilityImpactGrid() {
  const ideas = [
    { label: "Community Feature", x: "55%", y: "30%", color: "#d7c7ff" },
    { label: "Announcement Feature", x: "71%", y: "30%", color: "#82d982" },
    { label: "User-Created Events", x: "55%", y: "46%", color: "#ffd967" },
    { label: "Events", x: "71%", y: "46%", color: "#f6a24d" },
    { label: "Group Text", x: "27%", y: "46%", color: "#82d982" },
    { label: "Job Finding", x: "41%", y: "46%", color: "#5aa9ee" },
    { label: "Email List", x: "27%", y: "68%", color: "#d7c7ff" },
    { label: "Online Gaming", x: "41%", y: "68%", color: "#82d982" },
    { label: "MBTI matching", x: "55%", y: "68%", color: "#d7c7ff" },
    { label: "Photo Sharing Platform", x: "71%", y: "68%", color: "#d7c7ff" },
  ]

  return (
    <div
      aria-label="Feasibility impact grid placeholder"
      role="img"
      className="content-image-outline relative min-h-[420px] overflow-hidden border bg-white p-4 sm:min-h-[560px]"
      style={{ borderColor: "var(--page-border)" }}
    >
      <div
        aria-hidden="true"
        className="absolute left-[12%] right-[12%] top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-neutral-300"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[10%] left-1/2 top-[10%] w-[4px] -translate-x-1/2 rounded-full bg-neutral-300"
      />
      <div
        className="absolute left-1/2 top-[6%] -translate-x-1/2 border border-black bg-[#f6c232] px-2 py-1 text-[11px] font-semibold text-black"
      >
        High priority
      </div>
      <div
        className="absolute bottom-[4%] left-1/2 -translate-x-1/2 border border-black bg-[#f6c232] px-2 py-1 text-[11px] font-semibold text-black"
      >
        Low priority
      </div>
      <div
        className="absolute left-[3%] top-1/2 -translate-y-1/2 border border-black bg-[#f6c232] px-2 py-1 text-[11px] font-semibold text-black"
      >
        Low feasibility
      </div>
      <div
        className="absolute right-[3%] top-1/2 -translate-y-1/2 border border-black bg-[#f6c232] px-2 py-1 text-[11px] font-semibold text-black"
      >
        High feasibility
      </div>
      {ideas.map((idea) => (
        <div
          key={idea.label}
          className="absolute flex h-[70px] w-[86px] items-center justify-center rounded-[4px] px-2 text-center text-[11px] font-semibold leading-tight text-neutral-800 shadow-[0_4px_12px_rgba(0,0,0,0.08)] sm:h-[88px] sm:w-[112px]"
          style={{
            backgroundColor: idea.color,
            left: idea.x,
            top: idea.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {idea.label}
        </div>
      ))}
    </div>
  )
}

function TestingPlanPlaceholder() {
  return (
    <div
      aria-label="Usability testing plan placeholder"
      role="img"
      className="content-image-outline border p-5 sm:p-8"
      style={{
        borderColor: "#f6c232",
        backgroundColor: "#fff6d6",
      }}
    >
      <div className="inline-flex border border-[#d7ad25] bg-[#f6d46b] px-3 py-1 text-[14px] font-semibold text-black">
        Usability Test
      </div>
      <h3 className="mt-4 max-w-[680px] font-heading text-[24px] font-semibold leading-tight tracking-[-0.025em] text-black sm:text-[32px]">
        Explain them first what are we doing and give them the context
      </h3>
      <ul className="mt-6 max-w-[720px] list-disc space-y-3 pl-6 text-[16px] leading-[1.7] text-black/82 sm:text-[18px]">
        <li>Ask them to think aloud as they perform each task.</li>
        <li>
          Let them know they can ask questions, but encourage them to attempt
          each task independently first.
        </li>
        <li>
          Observe their interactions, note any points of confusion, and gather
          feedback.
        </li>
      </ul>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <div>
          <p className="font-serif text-[14px] font-semibold text-black/75">
            Task 1: Join an Event
          </p>
          <p className="mt-3 font-serif text-[24px] leading-tight text-black sm:text-[30px]">
            &ldquo;Imagine you are looking for an event to attend. Please find an
            event that interests you and join it.&rdquo;
          </p>
        </div>
        <div>
          <p className="font-serif text-[14px] font-semibold text-black/75">
            Task 2: Create an Event
          </p>
          <p className="mt-3 font-serif text-[24px] leading-tight text-black sm:text-[30px]">
            &ldquo;Now, let&apos;s say you want to organize a casual meetup. Please
            create a new event and set it up.&rdquo;
          </p>
        </div>
      </div>
    </div>
  )
}

function RefinementPlaceholder() {
  return (
    <div
      aria-label="Wireframe refinement comparison placeholder"
      role="img"
      className="content-image-outline border bg-white p-5 sm:p-8"
      style={{ borderColor: "var(--page-border)" }}
    >
      <div className="grid gap-6 md:grid-cols-[1fr_0.7fr_1fr] md:items-center">
        <ImagePlaceholder
          label="Before wireframe placeholder"
          ratio="9 / 16"
          minHeight="420px"
        />
        <p className="text-center font-heading text-[24px] font-medium leading-tight tracking-[-0.03em] text-neutral-600 sm:text-[30px]">
          &ldquo;I am not sure who I will be contacting, is it the event organiser?
          Or you guys?&rdquo;
        </p>
        <ImagePlaceholder
          label="After wireframe placeholder"
          ratio="9 / 16"
          minHeight="420px"
        />
      </div>
      <div
        aria-hidden="true"
        className="mx-auto mt-7 h-1 max-w-[280px] rounded-full"
        style={{ backgroundColor: "#f6c232" }}
      />
    </div>
  )
}

function PalettePanel() {
  const swatches = [
    { hex: "#FFC100", color: "#ffc100", text: "text-black" },
    { hex: "#272727", color: "#272727", text: "text-[#ffc100]" },
    { hex: "#0E0E0E", color: "#0e0e0e", text: "text-white" },
    { hex: "#FEFEFE", color: "#fefefe", text: "text-black" },
  ]

  return (
    <div
      className="grid gap-7 border p-4 sm:p-5 md:grid-cols-[260px_minmax(0,1fr)] md:items-center"
      style={{ borderColor: "rgba(255,255,255,0.72)" }}
    >
      <div className="grid grid-cols-2">
        {swatches.map((swatch) => (
          <div
            key={swatch.hex}
            className={`flex aspect-square items-end p-4 font-heading text-[19px] font-semibold ${swatch.text}`}
            style={{ backgroundColor: swatch.color }}
          >
            {swatch.hex}
          </div>
        ))}
      </div>
      <div className="font-heading">
        <p className="text-[30px] font-semibold leading-tight tracking-[-0.04em] text-white sm:text-[44px]">
          This palette represents
        </p>
        <div className="mt-8 space-y-4 text-[28px] font-semibold leading-none tracking-[-0.04em] text-[#ffc100] sm:text-[44px]">
          <p>Happiness</p>
          <p>Warmth</p>
          <p>Confidence</p>
          <p>Belonging</p>
        </div>
      </div>
    </div>
  )
}

function TypographyPanel() {
  return (
    <div
      className="grid gap-7 border p-4 sm:p-5 md:grid-cols-[1.2fr_1fr] md:items-center"
      style={{ borderColor: "rgba(255,255,255,0.72)" }}
    >
      <p className="font-heading text-[44px] leading-none tracking-[-0.04em] text-white sm:text-[72px]">
        AaBbCcDd123!@#
      </p>
      <div className="space-y-2 text-white">
        <p className="font-heading text-[20px] font-bold">Nunito Bold 24 Px</p>
        <p className="text-[18px] font-semibold">Nunito Semibold 20 Px</p>
        <p className="text-[16px] font-medium">Nunito Medium 16 Px</p>
        <p className="text-[14px]">Nunito Regular 14 Px</p>
        <p className="text-[12px]">Nunito Regular 12 Px</p>
      </div>
    </div>
  )
}

function DarkFeatureShowcase({
  feature,
  reverse = false,
}: {
  feature: (typeof finalFeatures)[number]
  reverse?: boolean
}) {
  return (
    <article
      className={`grid gap-7 border p-5 sm:p-7 md:grid-cols-[0.7fr_1fr] md:items-center ${
        reverse ? "md:grid-flow-col" : ""
      }`}
      style={{ borderColor: "rgba(255,255,255,0.72)" }}
    >
      <div className={reverse ? "md:col-start-2" : ""}>
        <ImagePlaceholder
          label={feature.imageLabel}
          ratio="9 / 16"
          minHeight="420px"
          dark
          className="mx-auto max-w-[240px]"
        />
      </div>
      <div className={reverse ? "md:col-start-1 md:row-start-1" : ""}>
        <h3 className="font-heading text-[28px] font-semibold leading-tight tracking-[-0.035em] text-white sm:text-[38px]">
          {feature.title}
        </h3>
        <p className="mt-7 text-[16px] leading-[1.75] text-white/68 sm:text-[18px]">
          {feature.body}
        </p>
        <ol className="mt-7 list-decimal space-y-3 pl-6 text-[15px] leading-[1.75] text-white/68 sm:text-[17px]">
          {feature.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ol>
      </div>
    </article>
  )
}

export default function UniConnectPage() {
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
            <header className="pt-6 sm:pt-8">
              <p
                className="text-[12px] font-semibold uppercase tracking-[0.16em]"
                style={{ color: "var(--page-fg-faint)" }}
              >
                University of Toronto
              </p>
              <h1
                className="mt-4 max-w-[735px] font-heading text-[38px] font-bold leading-[1.02] tracking-[-0.055em] sm:text-[58px]"
                style={{ color: "var(--page-fg)" }}
              >
                Helping New University Students in Toronto Make{" "}
                <em
                  className="font-serif italic"
                  style={{ color: "#f29015" }}
                >
                  real
                </em>{" "}
                Friends & Feel at Home
              </h1>

              <div className="mt-8">
                <ImagePlaceholder
                  label="Hero image placeholder"
                  ratio="16 / 9"
                  minHeight="350px"
                />
              </div>

              <MetadataBlock />
            </header>

            <section
              id="overview"
              aria-labelledby="overview-heading"
              className="-mx-4 scroll-mt-24 px-4 py-8 sm:-mx-6 sm:px-6 sm:py-10"
              style={{ backgroundColor: "#000000" }}
            >
              <h2
                id="overview-heading"
                className="text-[12px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: "#ffc22d" }}
              >
                Overview
              </h2>
              <h3 className="mt-5 font-heading text-[26px] font-semibold leading-tight tracking-[-0.035em] text-white sm:text-[32px]">
                A University Project Focused on Building Belonging Through
                Design
              </h3>
              <p className="mt-4 max-w-[700px] text-[15px] leading-[1.8] text-white/70 sm:text-[16px]">
                This project was part of my master&apos;s-level Fundamentals of
                UX course at the University of Toronto. Students were grouped
                based on chosen topics, which led to the formation of our
                four-member team focused on helping new and international
                students form meaningful connections. The goal was to design a
                digital platform that lets students find events, meet
                like-minded peers, and feel more included on campus.
              </p>
              <div className="mt-7">
                <ImagePlaceholder
                  label="Product mockup placeholder"
                  ratio="16 / 9"
                  minHeight="340px"
                  dark
                />
              </div>

              <h3
                className="mt-10 text-[12px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: "#ffc22d" }}
              >
                Personal Wins
              </h3>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                {personalWins.map((win) => (
                  <article key={win.title}>
                    <ImagePlaceholder
                      label="Icon placeholder"
                      ratio="1 / 1"
                      minHeight="86px"
                      dark
                      className="mb-4 max-w-[104px]"
                    />
                    <h4 className="font-heading text-[17px] font-semibold leading-tight tracking-[-0.02em] text-white">
                      {win.title}
                    </h4>
                    <p className="mt-3 text-[14px] leading-[1.75] text-white/62">
                      {win.body}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <Section id="problem" label="The Problem(s)" className="mb-14">
              <BodyCopy>
                <h3
                  className="font-heading text-[30px] font-semibold leading-tight tracking-[-0.04em] sm:text-[38px]"
                  style={{ color: "var(--page-fg)" }}
                >
                  Students Are Lonelier Than Ever
                </h3>
                <p>
                  Nearly 70% of university students report feeling isolated on
                  campus, with many struggling to find spaces where social
                  interaction happens naturally. The absence of a dedicated
                  social platform leaves new and international students
                  disconnected from their peers.
                </p>
                <h3
                  className="font-heading text-[28px] font-semibold leading-tight tracking-[-0.035em] sm:text-[34px]"
                  style={{ color: "var(--page-fg)" }}
                >
                  Cultural and Social Barriers Limit Interaction
                </h3>
                <p>
                  Students from diverse backgrounds often hesitate to initiate
                  conversations, unsure of shared interests or social norms.
                  This barrier prevents potential friendships from turning into
                  real connections.
                </p>
              </BodyCopy>
              <div className="mt-8">
                <ImagePlaceholder
                  label="Secondary desk research placeholder"
                  ratio="16 / 7"
                  minHeight="250px"
                />
                <p
                  className="mt-3 text-center text-[14px] italic"
                  style={{ color: "var(--page-fg-muted)" }}
                >
                  My Secondary (Desk Research)
                </p>
              </div>
            </Section>

            <Section id="approach" label="Our Approach" className="mb-14">
              <BodyCopy>
                <h3
                  className="font-heading text-[30px] font-semibold leading-tight tracking-[-0.04em] sm:text-[38px]"
                  style={{ color: "var(--page-fg)" }}
                >
                  5 Step design Process
                </h3>
                <p>
                  The traditional Double Diamond gave us a structure for
                  diverging and converging. We adapted it into a 5-step process
                  that fit our course workflow and team maturity. We spent more
                  time understanding students and testing early ideas, because
                  connection-forming is a behavior problem, not just a UI
                  problem.
                </p>
              </BodyCopy>
              <div className="mt-8">
                <ImagePlaceholder
                  label="Design process diagram placeholder"
                  ratio="16 / 5"
                  minHeight="210px"
                />
              </div>
            </Section>

            <Section id="discover" label="Discovery" className="mb-14">
              <BodyCopy>
                <h3
                  className="font-heading text-[30px] font-semibold leading-tight tracking-[-0.04em] sm:text-[38px]"
                  style={{ color: "var(--page-fg)" }}
                >
                  Understanding How Students Try to Make Friends Today
                </h3>
                <p>
                  As a team, we created a research plan focusing on three areas:
                </p>
              </BodyCopy>

              <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
                {researchFocus.map((focus) => (
                  <article
                    key={focus}
                    className="border p-3"
                    style={{ borderColor: "var(--page-border)" }}
                  >
                    <ImagePlaceholder
                      label="Research image placeholder"
                      ratio="1 / 1"
                      minHeight="150px"
                    />
                    <h3
                      className="mt-4 font-heading text-[16px] font-semibold leading-tight tracking-[-0.02em]"
                      style={{ color: "var(--page-fg)" }}
                    >
                      {focus}
                    </h3>
                  </article>
                ))}
              </div>

              <BodyCopy className="mt-7">
                <p>
                  I proposed starting with the struggle itself to understand why
                  forming friendships is difficult in the first place. I also
                  suggested exploring the role social media currently plays in
                  helping students meet people, so we could identify where it
                  falls short.
                </p>

                <h3
                  className="font-heading text-[28px] font-semibold leading-tight tracking-[-0.035em] sm:text-[34px]"
                  style={{ color: "var(--page-fg)" }}
                >
                  We Spoke to Students About Their Real Experiences
                </h3>
                <p>
                  We conducted <strong>10 semi-structured interviews</strong>{" "}
                  with international students aged between 18 - 26 who had
                  recently moved to Canada and were studying at universities in
                  Toronto.
                </p>
              </BodyCopy>

              <div
                className="mt-5 border px-4 py-4"
                style={{
                  borderColor: "var(--page-border)",
                  backgroundColor: "color-mix(in srgb, #f6c232 30%, var(--page-bg))",
                }}
              >
                <p
                  className="font-serif text-[15px] font-semibold italic"
                  style={{ color: "var(--page-fg)" }}
                >
                  My Contribution
                </p>
                <p className="mt-2 text-[15px] leading-[1.7]" style={{ color: "var(--page-fg-muted)" }}>
                  Conducted <strong>2 interviews</strong> with first-year
                  international students to understand their early social
                  challenges.
                </p>
              </div>

              <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
                <QuoteCard
                  participant="Participant 1"
                  quotes={[
                    "How do I make friends in class when everyone is in hurry to get to the subway to avoid rush hour",
                    "I am really comfortable with someone who has same interests like me",
                  ]}
                />
                <QuoteCard
                  participant="Participant 2"
                  quotes={[
                    "I cannot find any events other than the ones hosted by the university",
                    "I want to make meaningful connections not just small talk",
                  ]}
                />
              </div>

              <h3
                className="mt-10 font-heading text-[22px] font-semibold leading-tight tracking-[-0.025em]"
                style={{ color: "var(--page-fg)" }}
              >
                What We Learned from Talking to Students
              </h3>
              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <StatCard value="7">
                  participants struggled to break the ice during face to face
                  interactions
                </StatCard>
                <StatCard value="8">
                  participants made friends and meaningful connections through
                  past events
                </StatCard>
              </div>

              <BodyCopy className="mt-10">
                <h3
                  className="font-heading text-[28px] font-semibold leading-tight tracking-[-0.035em] sm:text-[34px]"
                  style={{ color: "var(--page-fg)" }}
                >
                  Connected What Students Said to What They Needed
                </h3>
                <p>
                  After completing secondary research, user interviews, and
                  platform analysis, we gathered every insight and observation on
                  one board. Using affinity mapping, we grouped similar
                  thoughts, quotes, and challenges to uncover the bigger
                  picture. This helped us see how scattered experiences
                  connected and revealed the key themes that guided our design
                  direction.
                </p>
              </BodyCopy>
              <div className="mt-7">
                <ImagePlaceholder
                  label="Affinity mapping placeholder"
                  ratio="16 / 7"
                  minHeight="270px"
                />
                <p
                  className="mt-3 text-center text-[14px] italic"
                  style={{ color: "var(--page-fg-muted)" }}
                >
                  Affinity Mapping
                </p>
              </div>

              <h3
                className="mt-10 font-heading text-[28px] font-semibold leading-tight tracking-[-0.035em] sm:text-[34px]"
                style={{ color: "var(--page-fg)" }}
              >
                Three Truths That Shaped Our Design Direction
              </h3>
              <p className="mt-3 text-[15px] leading-[1.8] sm:text-[16px]" style={{ color: "var(--page-fg-muted)" }}>
                From the affinity mapping, three major insights emerged that
                shaped how we approached the design:
              </p>
              <div className="mt-6 space-y-4">
                {insights.map((insight, index) => (
                  <InsightBox key={insight.title} number={index + 1} title={insight.title}>
                    {insight.body}
                  </InsightBox>
                ))}
              </div>
            </Section>

            <Section id="define" label="Define" className="mb-14">
              <BodyCopy>
                <h3
                  className="font-heading text-[30px] font-semibold leading-tight tracking-[-0.04em] sm:text-[38px]"
                  style={{ color: "var(--page-fg)" }}
                >
                  Who We Designed For, meet Emily!!
                </h3>
                <p>
                  After identifying the key insights, we wanted to see the
                  research through a real person&apos;s story. We pictured what
                  it feels like to arrive in a new city, surrounded by people
                  but unsure how to start a conversation. That became Emily, a
                  first-year international student who reflects what many go
                  through at UofT. She is curious, hopeful, and trying to find
                  her place. Her goals and frustrations helped us design with
                  empathy and stay focused on what students genuinely need.
                </p>
              </BodyCopy>

              <div
                className="mt-8 grid gap-6 border p-5 md:grid-cols-[0.8fr_1fr] md:items-center"
                style={{ borderColor: "var(--page-border)" }}
              >
                <ImagePlaceholder
                  label="Persona portrait placeholder"
                  ratio="3 / 4"
                  minHeight="360px"
                />
                <div>
                  <h3
                    className="font-heading text-[30px] font-semibold leading-tight tracking-[-0.035em]"
                    style={{ color: "var(--page-fg)" }}
                  >
                    Emily Chen
                  </h3>
                  <p className="mt-2 text-[15px] font-semibold" style={{ color: "var(--page-fg)" }}>
                    23 Year old 1st Year PhD Scholar
                  </p>
                  <h4 className="mt-7 font-heading text-[18px] font-semibold" style={{ color: "var(--page-fg)" }}>
                    Goals
                  </h4>
                  <p className="mt-3 text-[15px] leading-[1.75]" style={{ color: "var(--page-fg-muted)" }}>
                    Make new friends and build meaningful connections. Find
                    structured ways to meet people instead of relying on small
                    talk. Explore social events and city hotspots to feel more
                    connected.
                  </p>
                  <h4 className="mt-6 font-heading text-[18px] font-semibold" style={{ color: "var(--page-fg)" }}>
                    Barriers
                  </h4>
                  <p className="mt-3 text-[15px] leading-[1.75]" style={{ color: "var(--page-fg-muted)" }}>
                    Feels uncertain about initiating conversations due to a
                    different cultural background. Struggles to navigate
                    scattered event listings. Notices other students already
                    forming groups, making it harder to break in.
                  </p>
                </div>
              </div>

              <BodyCopy className="mt-10">
                <h3
                  className="font-heading text-[28px] font-semibold leading-tight tracking-[-0.035em] sm:text-[34px]"
                  style={{ color: "var(--page-fg)" }}
                >
                  What Emily&apos;s Experience Revealed
                </h3>
                <p>
                  We mapped Emily&apos;s experience to understand how her
                  feelings and challenges changed from the moment she arrived on
                  campus to when she started feeling disconnected. Each stage
                  showed what students like her go through while trying to find
                  friends and settle into a new place.
                </p>
              </BodyCopy>
              <div className="mt-7 border p-4" style={{ borderColor: "var(--page-border)" }}>
                <JourneyTable />
              </div>
              <p className="mt-6 max-w-[720px] text-[15px] leading-[1.8] sm:text-[16px]" style={{ color: "var(--page-fg-muted)" }}>
                The journey moved from excitement during orientation to
                frustration when connections did not come easily. It helped us
                see where design could support her better by reducing social
                anxiety, creating easier ways to meet people, and encouraging
                her to keep engaging with her community.
              </p>

              <BodyCopy className="mt-10">
                <h3
                  className="font-heading text-[28px] font-semibold leading-tight tracking-[-0.035em] sm:text-[34px]"
                  style={{ color: "var(--page-fg)" }}
                >
                  Framing the Challenge
                </h3>
                <p>
                  After uncovering what students were struggling with, we framed
                  the core problem our design aimed to solve.
                </p>
              </BodyCopy>
              <div
                className="mt-7 border p-6 sm:p-8"
                style={{
                  borderColor: "var(--page-border)",
                  backgroundColor: "var(--page-bg)",
                }}
              >
                <p
                  className="font-heading text-[30px] font-bold leading-[1.18] tracking-[-0.045em] sm:text-[44px]"
                  style={{ color: "var(--page-fg)" }}
                >
                  <em className="font-serif italic" style={{ color: "#f29015" }}>
                    How
                  </em>{" "}
                  might we create a digital platform that empowers new
                  university students to make new connections with like-minded
                  people within the university?
                </p>
              </div>
            </Section>

            <Section id="design" label="Design" className="mb-14">
              <BodyCopy>
                <h3
                  className="font-heading text-[30px] font-semibold leading-tight tracking-[-0.04em] sm:text-[38px]"
                  style={{ color: "var(--page-fg)" }}
                >
                  Explored Ideas Through Crazy 8s
                </h3>
                <p>
                  After defining the problem, we moved into ideation. Each team
                  member took part in a Crazy 8s exercise to quickly sketch
                  different ways students could discover events and connect with
                  others. This rapid process helped us generate diverse ideas
                  before deciding which ones to take forward into prototyping.
                </p>
              </BodyCopy>
              <div className="mt-8">
                <ImagePlaceholder
                  label="Crazy 8s sketch placeholder"
                  ratio="16 / 8"
                  minHeight="280px"
                />
              </div>

              <BodyCopy className="mt-10">
                <h3
                  className="font-heading text-[28px] font-semibold leading-tight tracking-[-0.035em] sm:text-[34px]"
                  style={{ color: "var(--page-fg)" }}
                >
                  Prioritized Ideas Using a Feasibility-Impact Grid
                </h3>
                <p>
                  After generating multiple ideas from the Crazy 8s session, we
                  plotted them on a priority grid to evaluate each concept&apos;s
                  impact and feasibility. This helped us focus on ideas that
                  balanced value for students with realistic implementation.
                </p>
              </BodyCopy>
              <div className="mt-7">
                <FeasibilityImpactGrid />
              </div>

              <BodyCopy className="mt-10">
                <h3
                  className="font-heading text-[28px] font-semibold leading-tight tracking-[-0.035em] sm:text-[34px]"
                  style={{ color: "var(--page-fg)" }}
                >
                  Created Wireframes to Visualize the Experience
                </h3>
                <p>
                  Once we finalized our ideas, we sketched low and mid-fidelity
                  wireframes to see how the app would actually look and work.
                  This helped us map out the main screens, test the flow, and
                  fix any confusing parts before moving to detailed design.
                </p>
              </BodyCopy>
              <div className="mt-7">
                <ImagePlaceholder
                  label="Wireframes overview placeholder"
                  ratio="16 / 8"
                  minHeight="310px"
                />
              </div>

              <BodyCopy className="mt-10">
                <h3
                  className="font-heading text-[28px] font-semibold leading-tight tracking-[-0.035em] sm:text-[34px]"
                  style={{ color: "var(--page-fg)" }}
                >
                  I Planned User Testing to Validate the Ideas
                </h3>
                <p>
                  After creating the wireframes, I wanted to see how real
                  students would interact with them. I designed a user testing
                  plan to observe how easily they could navigate the flow,
                  whether the features felt helpful, and where they faced
                  confusion while using the app.
                </p>
              </BodyCopy>
              <div className="mt-7">
                <TestingPlanPlaceholder />
              </div>

              <BodyCopy className="mt-10">
                <h3
                  className="font-heading text-[28px] font-semibold leading-tight tracking-[-0.035em] sm:text-[34px]"
                  style={{ color: "var(--page-fg)" }}
                >
                  Refined the Design Through User Feedback
                </h3>
              </BodyCopy>
              <div className="mt-7">
                <RefinementPlaceholder />
              </div>

              <BodyCopy className="mt-10">
                <h3
                  className="font-heading text-[28px] font-semibold leading-tight tracking-[-0.035em] sm:text-[34px]"
                  style={{ color: "var(--page-fg)" }}
                >
                  Turning Research Into Product Flows
                </h3>
                <p>
                  We prioritized flows that lowered the effort of joining
                  something new: searching for events, reading event context,
                  seeing communities, and saving a spot before showing up in
                  person.
                </p>
              </BodyCopy>
              <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
                {solutionCards.map((card) => (
                  <TextCard key={card.title} title={card.title}>
                    {card.body}
                  </TextCard>
                ))}
              </div>
              <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
                <ImagePlaceholder
                  label="User flow placeholder"
                  ratio="4 / 3"
                  minHeight="240px"
                />
                <ImagePlaceholder
                  label="Prototype flow placeholder"
                  ratio="4 / 3"
                  minHeight="240px"
                />
              </div>
            </Section>

            <Section id="deliver" label="Deliver" className="mb-0">
              <div
                className="-mx-4 px-4 py-8 sm:-mx-6 sm:px-6 sm:py-10"
                style={{ backgroundColor: "#000000" }}
              >
                <h3
                  className="text-[12px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: "#ffc22d" }}
                >
                  Deliver
                </h3>
                <h4 className="mt-5 font-heading text-[28px] font-semibold leading-tight tracking-[-0.04em] text-white sm:text-[38px]">
                  We Designed a Moodboard to Define the Visual Direction
                </h4>
                <p className="mt-4 max-w-[720px] text-[15px] leading-[1.8] text-white/68 sm:text-[16px]">
                  After finalizing our wireframes, we created a moodboard to
                  establish the visual tone of the product. I led this phase by
                  defining key vision words that captured the feel we wanted to
                  evoke. Each teammate contributed images reflecting those
                  themes, and together we refined them into a unified visual
                  direction that guided our final UI design.
                </p>

                <div className="mt-8">
                  <ImagePlaceholder
                    label="Moodboard placeholder"
                    ratio="16 / 11"
                    minHeight="470px"
                    dark
                  />
                </div>

                <h4 className="mt-12 font-heading text-[28px] font-semibold leading-tight tracking-[-0.04em] text-[#ffc22d] sm:text-[38px]">
                  I Defined the Color Palette to Capture the Right Energy
                </h4>
                <p className="mt-4 max-w-[720px] text-[15px] leading-[1.8] text-white/68 sm:text-[16px]">
                  I took the lead in developing the color palette for our
                  design. I used a simple technique where I squinted at the
                  moodboard to spot which colors stood out the most. That helped
                  me identify yellow as the primary color on a dark background.
                  This choice reflected the bright and energetic vibe of campus
                  events while keeping the design clean and modern.
                </p>

                <div className="mt-8 space-y-7">
                  <PalettePanel />
                  <TypographyPanel />
                  {finalFeatures.map((feature, index) => (
                    <DarkFeatureShowcase
                      key={feature.title}
                      feature={feature}
                      reverse={index % 2 === 1}
                    />
                  ))}
                </div>

                <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
                  <article
                    className="border p-5"
                    style={{ borderColor: "rgba(255,255,255,0.72)" }}
                  >
                    <h4 className="font-heading text-[18px] font-semibold text-white">
                      Event Discovery
                    </h4>
                    <p className="mt-3 text-[14px] leading-[1.7] text-white/62">
                      A searchable home feed helps students find campus events,
                      hosted parties, and local activities in one place.
                    </p>
                  </article>
                  <article
                    className="border p-5"
                    style={{ borderColor: "rgba(255,255,255,0.72)" }}
                  >
                    <h4 className="font-heading text-[18px] font-semibold text-white">
                      Communities
                    </h4>
                    <p className="mt-3 text-[14px] leading-[1.7] text-white/62">
                      Community hubs give students repeated spaces to
                      participate, making it easier to move beyond one-time
                      interactions.
                    </p>
                  </article>
                  <article
                    className="border p-5"
                    style={{ borderColor: "rgba(255,255,255,0.72)" }}
                  >
                    <h4 className="font-heading text-[18px] font-semibold text-white">
                      Confidence to Join
                    </h4>
                    <p className="mt-3 text-[14px] leading-[1.7] text-white/62">
                      Event details, tags, hosts, and attendance cues reduce
                      uncertainty before a student decides to show up.
                    </p>
                  </article>
                </div>

                <h4 className="mt-12 font-heading text-[28px] font-semibold leading-tight tracking-[-0.035em] text-white sm:text-[34px]">
                  What I Took Away
                </h4>
                <p className="mt-4 max-w-[720px] text-[15px] leading-[1.8] text-white/68 sm:text-[16px]">
                  UniConnect taught me that social products are not only about
                  adding more places to meet people. They have to reduce the
                  emotional effort of starting. The strongest design choices
                  were the ones that made taking the first step feel less
                  awkward, more contextual, and more human.
                </p>
              </div>
            </Section>
          </article>

          <SiteFooter />
        </div>
      </div>
    </main>
  )
}
