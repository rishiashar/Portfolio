import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { ease } from "../theme";

// Hero-style mask reveal — every line is wrapped in an overflow-hidden box and
// rises with a blur. Mirrors `.hero-opening-line` in src/styles/globals.css.
export const RevealText: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  rise?: number;
  blur?: number;
  className?: string;
  style?: React.CSSProperties;
  inline?: boolean;
}> = ({
  children,
  delay = 0,
  duration = 22,
  rise = 32,
  blur = 6,
  style,
  inline = false,
}) => {
  const frame = useCurrentFrame();
  useVideoConfig();

  const progress = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...ease.reveal),
  });

  const opacity = progress;
  const y = (1 - progress) * rise;
  const filter = `blur(${(1 - progress) * blur}px)`;

  return (
    <span
      style={{
        display: inline ? "inline-block" : "block",
        overflow: "hidden",
        ...style,
      }}
    >
      <span
        style={{
          display: inline ? "inline-block" : "block",
          opacity,
          transform: `translate3d(0, ${y}px, 0)`,
          filter,
          willChange: "opacity, transform, filter",
        }}
      >
        {children}
      </span>
    </span>
  );
};
