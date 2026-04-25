import React from "react";
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { ease } from "../theme";

// Re-creates the decorative hand pair from the portfolio's hero / intro overlay.
// Each hand pushes outward from the centre and fades to grayscale to match the
// site's `grayscale(1) brightness(0.72)` treatment.

const handMask =
  "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.96) 16%, rgba(0,0,0,0.96) 84%, transparent 100%)";

export const Hands: React.FC<{
  startFrame?: number;
  durationInFrames?: number;
  rest?: number; // resting opacity (0–1)
  size?: number; // width in px
  vertical?: number; // top px from frame
}> = ({
  startFrame = 0,
  durationInFrames = 90,
  rest = 0.34,
  size = 460,
  vertical = 80,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [startFrame, startFrame + durationInFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(...ease.reveal),
    }
  );

  const opacity = progress * rest;
  const offset = (1 - progress) * 18; // px slide-in
  const scale = 1.06 - 0.06 * progress;

  const sharedStyle: React.CSSProperties = {
    position: "absolute",
    top: vertical,
    width: size,
    pointerEvents: "none",
    mixBlendMode: "multiply",
    WebkitMaskImage: handMask,
    maskImage: handMask,
    filter:
      "grayscale(1) brightness(0.72) contrast(1.02) drop-shadow(0 18px 30px rgba(17, 17, 17, 0.10))",
    opacity,
  };

  // Frame is 1180px wide; let hands hang off the left/right edges so the
  // pointing fingers reach toward the centre, just like the portfolio.
  return (
    <>
      <div
        style={{
          ...sharedStyle,
          left: -120,
          transform: `translate3d(${-offset}px, ${0}px, 0) rotate(-34deg) scale(${scale})`,
          transformOrigin: "center",
        }}
      >
        <Img
          src={staticFile("hero/hero-hand-left.png")}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            userSelect: "none",
          }}
        />
      </div>
      <div
        style={{
          ...sharedStyle,
          right: -120,
          transform: `translate3d(${offset}px, ${0}px, 0) rotate(34deg) scale(${scale})`,
          transformOrigin: "center",
        }}
      >
        <Img
          src={staticFile("hero/hero-hand-right.png")}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            userSelect: "none",
          }}
        />
      </div>
    </>
  );
};
