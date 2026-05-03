import PrototypeApp from "@/components/activity-log-prototype/App"

const prototypeCss = `
  :root,
  html.dark {
    --motion-ease-out: cubic-bezier(0.32, 0.72, 0, 1);
    --motion-duration-fast: 150ms;
    --motion-duration: 220ms;
    --motion-duration-large: 280ms;
    --background: #ffffff;
    --foreground: #111111;
    --card: #ffffff;
    --card-foreground: #111111;
    --popover: #ffffff;
    --popover-foreground: #111111;
    --primary: #111111;
    --primary-foreground: #ffffff;
    --secondary: #f5f5f5;
    --secondary-foreground: #111111;
    --muted: #f5f5f5;
    --muted-foreground: #666666;
    --accent: #5c4aff;
    --accent-foreground: #ffffff;
    --destructive: #dc2626;
    --border: #dedede;
    --input: #dedede;
    --ring: rgba(17, 17, 17, 0.2);
    --page-frame-bg: #f9f9f9;
  }

  html,
  body {
    color: #111111;
    color-scheme: light;
    margin: 0;
    min-height: 100%;
    overflow: hidden;
    background: #f9f9f9;
  }

  body > div.fixed.z-50,
  body > div[aria-hidden="true"].pointer-events-none.fixed {
    display: none !important;
  }

  .motion-press {
    transform: translateZ(0);
    transform-origin: center;
    transition:
      transform var(--motion-duration-fast) var(--motion-ease-out),
      opacity var(--motion-duration-fast) var(--motion-ease-out),
      background-color var(--motion-duration-fast) ease,
      border-color var(--motion-duration-fast) ease,
      color var(--motion-duration-fast) ease;
    will-change: transform;
  }

  .motion-press:active {
    transform: scale(0.97) translateZ(0);
  }

  .motion-surface {
    transform: translateZ(0);
    transition:
      transform var(--motion-duration) var(--motion-ease-out),
      box-shadow var(--motion-duration) ease,
      border-color var(--motion-duration) ease,
      background-color var(--motion-duration-fast) ease;
    will-change: transform;
  }

  .motion-surface:hover {
    transform: translate3d(0, -1px, 0);
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.06);
  }

  .motion-reveal {
    display: grid;
    grid-template-rows: 0fr;
    opacity: 0;
    pointer-events: none;
    transform: translate3d(0, -8px, 0);
    transition:
      grid-template-rows var(--motion-duration-large) var(--motion-ease-out),
      opacity var(--motion-duration) var(--motion-ease-out),
      transform var(--motion-duration-large) var(--motion-ease-out);
    will-change: opacity, transform;
  }

  .motion-reveal[data-state="open"] {
    grid-template-rows: 1fr;
    opacity: 1;
    pointer-events: auto;
    transform: translate3d(0, 0, 0);
  }

  .motion-reveal__inner {
    min-height: 0;
    overflow: hidden;
    clip-path: inset(0 0 100% 0);
    transition: clip-path var(--motion-duration-large) var(--motion-ease-out);
    will-change: clip-path;
  }

  .motion-reveal[data-state="open"] > .motion-reveal__inner {
    clip-path: inset(0 0 0 0);
    overflow: visible;
  }

  .motion-summary-card {
    opacity: 0;
    transform: translate3d(0, 10px, 0) scale(0.98);
    transform-origin: top center;
    transition:
      opacity var(--motion-duration) var(--motion-ease-out),
      transform var(--motion-duration) var(--motion-ease-out),
      box-shadow var(--motion-duration) ease,
      border-color var(--motion-duration) ease;
    will-change: opacity, transform;
  }

  .motion-summary-card[data-state="open"] {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }

  .motion-summary-card:hover {
    border-color: #d4d4d4;
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.06);
  }

  .motion-table-row,
  .motion-table-row td {
    transition:
      background-color var(--motion-duration) ease,
      border-color var(--motion-duration) ease,
      color var(--motion-duration) ease;
  }
`

export default function ResponsiveAccountDashboardPrototypePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: prototypeCss }} />
      <div className="h-screen w-screen overflow-hidden bg-[#f9f9f9]">
        <PrototypeApp />
      </div>
    </>
  )
}
