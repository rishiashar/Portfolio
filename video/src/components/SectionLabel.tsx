import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, ease } from "../theme";
import { fontFamilies } from "../fonts";
import { PlusMark } from "./PlusMark";

// Section header used across the portfolio: full-width hairline with plus marks
// at both ends and a 12px uppercase tracking-widest label below.
export const SectionLabel: React.FC<{
  text: string;
  delay?: number;
}> = ({ text, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineProgress = interpolate(
    frame,
    [delay, delay + 0.6 * fps],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(...ease.draw),
    }
  );

  const textOpacity = interpolate(
    frame,
    [delay + 0.4 * fps, delay + 1.0 * fps],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(...ease.reveal),
    }
  );

  const textY = interpolate(
    frame,
    [delay + 0.4 * fps, delay + 1.0 * fps],
    [10, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(...ease.reveal),
    }
  );

  return (
    <div style={{ position: "relative", paddingTop: 32, marginBottom: 28 }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: -32,
          right: -32,
          height: 1,
          background: colors.border,
          transform: `scaleX(${lineProgress})`,
          transformOrigin: "0 50%",
        }}
      />
      <PlusMark
        size={12}
        color={colors.fgFaint}
        style={{
          position: "absolute",
          top: -6,
          left: -38,
          opacity: lineProgress,
        }}
      />
      <PlusMark
        size={12}
        color={colors.fgFaint}
        style={{
          position: "absolute",
          top: -6,
          right: -38,
          opacity: lineProgress,
        }}
      />
      <h2
        style={{
          margin: 0,
          fontFamily: fontFamilies.body,
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: colors.fgFaint,
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
        }}
      >
        {text}
      </h2>
    </div>
  );
};
