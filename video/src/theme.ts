// Design tokens lifted from the portfolio's globals.css so the launch video
// stays in lockstep with the live site.

export const colors = {
  frameBg: "#f5f5f5",
  pageBg: "#ffffff",
  fg: "#111111",
  fgMuted: "#555555",
  fgFaint: "#999999",
  fgGhost: "#cccccc",
  border: "#e8e8e8",
  surface: "#f5f5f5",
  surfaceHover: "#eeeeee",
  accent: "#22c55e",
  selection: "rgba(34, 197, 94, 0.16)",
} as const;

export const rainbowGradient =
  "linear-gradient(90deg, #FF1F8F 0%, #FF4FA3 12%, #B54FD6 26%, #6C63FF 42%, #2FB8FF 58%, #3DD68C 74%, #F5B400 88%, #FF5A2E 100%)";

export const surfaceShadow =
  "0 0 0 1px rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04)";

export const surfaceShadowHover =
  "0 0 0 1px rgba(0, 0, 0, 0.08), 0 6px 16px -12px rgba(0, 0, 0, 0.14), 0 16px 32px -24px rgba(0, 0, 0, 0.18)";

// Easing curves used across the portfolio. Bezier matches CSS cubic-bezier.
export const ease = {
  // Hero opening reveal — the same curve used on the hero text.
  reveal: [0.22, 1, 0.36, 1] as const,
  // Standard UI easing used on theme toggles, fades, etc.
  ui: [0.32, 0.72, 0, 1] as const,
  // Drawing/draw-in curve.
  draw: [0.16, 1, 0.3, 1] as const,
};

export const FRAME_MAX_WIDTH = 1180; // wider than the site's 780 to suit a 1920 stage
