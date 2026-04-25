import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, FRAME_MAX_WIDTH } from "../theme";
import { PlusMark } from "./PlusMark";

// Mirrors the centered max-width column used across the portfolio:
// frame bg outside, white page bg inside, vertical hairline borders, registration
// plus marks at the corners. Children render inside the page surface.
export const Frame: React.FC<{
  children: React.ReactNode;
  showCorners?: boolean;
  innerStyle?: React.CSSProperties;
}> = ({ children, showCorners = true, innerStyle }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.frameBg }}>
      <div
        style={{
          position: "relative",
          margin: "0 auto",
          width: FRAME_MAX_WIDTH,
          height: "100%",
          backgroundColor: colors.pageBg,
          borderLeft: `1px solid ${colors.border}`,
          borderRight: `1px solid ${colors.border}`,
          overflow: "hidden",
          ...innerStyle,
        }}
      >
        {children}
      </div>

      {showCorners ? (
        <>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              width: FRAME_MAX_WIDTH,
              transform: "translateX(-50%)",
              height: 1,
              backgroundColor: colors.border,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              width: FRAME_MAX_WIDTH,
              transform: "translateX(-50%)",
              height: 1,
              backgroundColor: colors.border,
            }}
          />
          <PlusMark
            size={12}
            color={colors.fgFaint}
            style={{
              position: "absolute",
              top: -6,
              left: `calc(50% - ${FRAME_MAX_WIDTH / 2}px - 6px)`,
            }}
          />
          <PlusMark
            size={12}
            color={colors.fgFaint}
            style={{
              position: "absolute",
              top: -6,
              left: `calc(50% + ${FRAME_MAX_WIDTH / 2}px - 6px)`,
            }}
          />
          <PlusMark
            size={12}
            color={colors.fgFaint}
            style={{
              position: "absolute",
              bottom: -6,
              left: `calc(50% - ${FRAME_MAX_WIDTH / 2}px - 6px)`,
            }}
          />
          <PlusMark
            size={12}
            color={colors.fgFaint}
            style={{
              position: "absolute",
              bottom: -6,
              left: `calc(50% + ${FRAME_MAX_WIDTH / 2}px - 6px)`,
            }}
          />
        </>
      ) : null}
    </AbsoluteFill>
  );
};
