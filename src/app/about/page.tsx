import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"

export const metadata: Metadata = {
  title: "About",
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mb-6 pt-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-screen -translate-x-1/2"
        style={{ backgroundColor: "var(--page-border)" }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-6 top-0 -translate-x-1/2 -translate-y-1/2 select-none text-[22px] leading-none"
        style={{ color: "var(--page-fg-muted)" }}
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-0 -translate-y-1/2 translate-x-1/2 select-none text-[22px] leading-none"
        style={{ color: "var(--page-fg-muted)" }}
      >
        +
      </span>
      <span
        className="text-[12px] uppercase tracking-widest"
        style={{ color: "var(--page-fg-faint)" }}
      >
        {children}
      </span>
    </div>
  )
}

export default function AboutPage() {
  return (
    <main
      className="min-h-[100dvh] transition-colors duration-500"
      style={{ backgroundColor: "var(--page-frame-bg)", color: "var(--page-fg)", overflowX: "clip" }}
    >
      <div
        className="mx-auto min-h-[100dvh] max-w-[780px] border-x transition-colors duration-500"
        style={{
          backgroundColor: "var(--page-bg)",
          borderColor: "var(--page-border)",
        }}
      >
        <div className="px-4 pb-20 pt-8 sm:px-6 sm:pb-28 sm:pt-10">
          <Navigation />

          <Label>About</Label>

          {/* Hero */}
          <section className="mb-14 mt-6 grid grid-cols-1 items-start gap-8 md:grid-cols-[1fr_auto]">
            <h1
              className="font-heading text-[36px] font-bold leading-[1.2] sm:text-[44px]"
              style={{ color: "var(--page-fg)" }}
            >
              I was going to write an{" "}
              <em
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  color: "#f59e0b",
                }}
              >
                intro
              </em>
              <br />
              then{" "}
              <em
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  color: "#6366f1",
                }}
              >
                Life
              </em>{" "}
              wrote this instead
            </h1>

            {/* Portrait placeholder */}
            <div
              className="h-[260px] w-[180px] rounded-sm sm:h-[300px] sm:w-[210px]"
              style={{ backgroundColor: "var(--page-surface)" }}
            />
          </section>

          <Label>Story</Label>

          {/* Bio */}
          <div
            className="max-w-[680px] space-y-6 text-[15px] leading-[1.8]"
            style={{ color: "var(--page-fg-muted)" }}
          >
            <p>
              My love for{" "}
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #61BB46 0%, #FDB827 22%, #F5821F 45%, #E03A3E 68%, #963D97 85%, #009DDC 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  fontWeight: 600,
                }}
              >
                design
              </span>
              {" "}began
              long before I knew it had a name. As a kid, I could spend hours
              sketching, painting, folding paper into random origami shapes, or
              experimenting with calligraphy. My handwriting wasn&apos;t great, so
              reading it was more like a puzzle.
            </p>
            <p>
              Everything shifted when I got my first computer at ten. I opened MS
              Paint and felt like I had entered another world. I taught myself
              Photoshop through random YouTube tutorials and made silly little
              animations in Adobe Flash. That&apos;s when I realised how technology
              could take imagination and turn it into something that actually
              exists.
            </p>
            <p>
              While studying computer science, I came across UX design. It just
              made sense. It was the one place where creativity, logic, and
              problem-solving finally met. Since then, I&apos;ve been hooked on
              designing things that look good and work even better. When I&apos;m not
              designing, I&apos;m either behind my camera or listening to rap.
              Photography helps me slow down and notice the small things, while
              rap reminds me how rhythm and storytelling can move people. Both
              shape the way I see and create.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
