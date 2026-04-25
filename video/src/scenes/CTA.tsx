import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { Frame } from "../components/Frame";
import { fontFamilies } from "../fonts";
import { colors } from "../theme";

export const CTA: React.FC = () => {
  const frame = useCurrentFrame();

  const enter = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  // Subtle pulsing glow under the button
  const pulse = (Math.sin(frame * 0.18) + 1) * 0.5;

  return (
    <AbsoluteFill>
      <Frame>
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 80px",
          }}
        >
          <div
            style={{
              opacity: enter,
              transform: `translateY(${(1 - enter) * 16}px)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 28,
            }}
          >
            <div
              style={{
                fontFamily: fontFamilies.body,
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: colors.fgFaint,
              }}
            >
              Visit the portfolio
            </div>

            <div
              style={{
                position: "relative",
                padding: "24px 56px",
                backgroundColor: colors.fg,
                color: colors.pageBg,
                fontFamily: fontFamilies.heading,
                fontSize: 40,
                fontWeight: 500,
                letterSpacing: "-0.01em",
                boxShadow: `0 ${20 + pulse * 10}px ${
                  60 + pulse * 30
                }px -32px rgba(17,17,17,${0.3 + pulse * 0.15})`,
              }}
            >
              rishiashar.com
            </div>

            <div
              style={{
                display: "flex",
                gap: 24,
                fontFamily: fontFamilies.body,
                fontSize: 18,
                color: colors.fgFaint,
                letterSpacing: "-0.005em",
              }}
            >
              <span>rishiasharv@gmail.com</span>
              <span style={{ color: colors.fgGhost }}>·</span>
              <span>github.com/rishiashar</span>
            </div>
          </div>
        </AbsoluteFill>
      </Frame>
    </AbsoluteFill>
  );
};
