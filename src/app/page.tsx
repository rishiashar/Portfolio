import { Navigation } from "@/components/navigation"
import { ParticleField } from "@/components/particle-field"

const capabilities = [
  "Design Systems",
  "AI Interfaces",
  "Creative Engineering",
  "Generative UX",
]

export default function Home() {
  return (
    <main className="relative min-h-[100dvh] overflow-hidden px-6 lg:px-16">
      {/* Thin Apple gradient bar at very top */}
      <div className="gradient-bar absolute inset-x-0 top-0 h-[3px] animate-[slide_8s_linear_infinite]" />

      <div className="mx-auto max-w-[1400px]">
        <Navigation />

        {/* Hero */}
        <section className="grid min-h-[calc(100dvh-82px)] grid-cols-1 items-end gap-12 pb-24 pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-8 lg:pb-32 lg:pt-0">
          {/* Left: main content */}
          <div className="flex flex-col gap-10">
            {/* Oversized headline — Bricolage Grotesque */}
            <h1 className="animate-[rise_800ms_cubic-bezier(0.16,1,0.3,1)_100ms_both] font-heading text-[clamp(3.2rem,9vw,7.5rem)] font-extrabold leading-[0.92] tracking-[-0.035em]">
              I design
              <br />
              <span className="gradient-text">with AI</span>
            </h1>

            {/* Brief statement */}
            <p className="max-w-lg animate-[rise_800ms_cubic-bezier(0.16,1,0.3,1)_200ms_both] text-lg leading-relaxed text-muted-foreground lg:text-xl">
              Building the interface layer between people and machine
              intelligence. Systems that are useful first, novel second.
            </p>

            {/* Graphic pause */}
            <hr className="w-24 animate-[rise_800ms_cubic-bezier(0.16,1,0.3,1)_280ms_both] border-t-2 border-foreground/20" />

            {/* Capability tags */}
            <div className="animate-[rise_800ms_cubic-bezier(0.16,1,0.3,1)_340ms_both] flex flex-wrap gap-3">
              {capabilities.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-foreground/10 px-4 py-1.5 text-sm text-foreground/60 transition-colors duration-200 hover:border-foreground/25 hover:text-foreground/90"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* CTA */}
            <a
              href="mailto:rishi@example.com"
              className="animate-[rise_800ms_cubic-bezier(0.16,1,0.3,1)_400ms_both] group inline-flex w-fit items-center gap-2 border-b border-foreground/30 pb-1 text-sm font-medium tracking-wide text-foreground transition-all duration-200 hover:border-foreground hover:gap-3"
            >
              Start a conversation
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                &rarr;
              </span>
            </a>
          </div>

          {/* Right: interactive particle field + metadata */}
          <div className="flex flex-col gap-12 lg:gap-16">
            {/* Particle field — interactive, mouse-reactive */}
            <div className="hidden aspect-square w-full animate-[rise_1000ms_cubic-bezier(0.16,1,0.3,1)_300ms_both] lg:block">
              <ParticleField />
            </div>

            {/* Metadata */}
            <div className="flex flex-col gap-6 animate-[rise_800ms_cubic-bezier(0.16,1,0.3,1)_500ms_both]">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground/50">
                  Currently
                </span>
                <span className="text-sm text-foreground">
                  Independent — open to collaborations
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground/50">
                  Focus
                </span>
                <span className="text-sm text-foreground">
                  AI-native products, design engineering
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground/50">
                  Elsewhere
                </span>
                <div className="flex gap-4 text-sm">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground underline decoration-foreground/20 underline-offset-4 transition-colors duration-200 hover:decoration-foreground/60"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground underline decoration-foreground/20 underline-offset-4 transition-colors duration-200 hover:decoration-foreground/60"
                  >
                    Twitter
                  </a>
                  <a
                    href="https://read.cv"
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground underline decoration-foreground/20 underline-offset-4 transition-colors duration-200 hover:decoration-foreground/60"
                  >
                    Read.cv
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
