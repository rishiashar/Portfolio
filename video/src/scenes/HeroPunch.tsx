import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Frame } from "../components/Frame";
import { Hands } from "../components/Hands";
import { fontFamilies } from "../fonts";
import { colors, ease, rainbowGradient } from "../theme";

// Snappy entrance with overshoot — feels like text being "thrown" onto screen.
const overshoot = (frame: number, start: number, dur = 18) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

const PunchLine: React.FC<{
  delay: number;
  children: React.ReactNode;
  fromY?: number;
  scaleFrom?: number;
  rotate?: number;
}> = ({ delay, children, fromY = 28, scaleFrom = 0.94, rotate = 0 }) => {
  const frame = useCurrentFrame();
  const p = overshoot(frame, delay, 16);
  return (
    <span
      style={{
        display: "block",
        overflow: "hidden",
      }}
    >
      <span
        style={{
          display: "block",
          opacity: p,
          transform: `translate3d(0, ${(1 - p) * fromY}px, 0) scale(${
            scaleFrom + (1 - scaleFrom) * p
          }) rotate(${rotate}deg)`,
          filter: `blur(${(1 - p) * 6}px)`,
        }}
      >
        {children}
      </span>
    </span>
  );
};

export const HeroPunch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Whoosh covers the very first beat — frames 0–10
  // Pop accents the rainbow "Designer" snap-in — around frame 14
  const exit = interpolate(
    frame,
    [durationInFrames - 0.4 * fps, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(...ease.ui),
    }
  );

  // Slight rainbow drift on "Designer" so the gradient shimmers across the word
  const gradientShift = interpolate(frame, [14, 90], [-12, 12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });

  // Tiny camera shake on the punch
  const shakeAmp = interpolate(frame, [12, 24], [6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const shakeX = Math.sin(frame * 1.6) * shakeAmp;
  const shakeY = Math.cos(frame * 1.9) * shakeAmp * 0.5;

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <Frame>
        {/* Soft radial wash — stand-in for the Dithering shader */}
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(206,206,206,0.45), rgba(255,255,255,0) 70%)",
          }}
        />

        <Hands
          startFrame={0}
          durationInFrames={28}
          rest={0.34}
          size={520}
          vertical={120}
        />

        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: "0 80px",
            textAlign: "center",
            transform: `translate(${shakeX}px, ${shakeY}px)`,
          }}
        >
          <h1
            style={{
              fontFamily: fontFamilies.display,
              fontSize: 96,
              lineHeight: 1.16,
              letterSpacing: "-0.01em",
              color: colors.fg,
              margin: 0,
              maxWidth: 1100,
              fontWeight: 400,
            }}
          >
            <PunchLine delay={0} fromY={36}>
              It&rsquo;s not every day
            </PunchLine>
            <PunchLine delay={4} fromY={36}>
              you find a{" "}
              <span
                style={{
                  fontFamily: fontFamilies.displayItalic,
                  fontStyle: "italic",
                  backgroundImage: rainbowGradient,
                  backgroundSize: "120% 100%",
                  backgroundPosition: `${50 + gradientShift}% 50%`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  display: "inline-block",
                }}
              >
                Designer
              </span>{" "}
              who
            </PunchLine>
            <PunchLine delay={10} fromY={36}>
              can turn ideas into
            </PunchLine>
            <PunchLine delay={16} fromY={36}>
              working{" "}
              <span
                style={{
                  fontFamily: fontFamilies.displayItalic,
                  fontStyle: "italic",
                }}
              >
                prototypes
              </span>
            </PunchLine>
          </h1>

          {/* Toronto card */}
          <div
            style={{
              position: "relative",
              marginTop: 48,
              padding: "20px 32px",
              backgroundColor: "rgba(255,255,255,0.78)",
              boxShadow:
                "0 0 0 1px rgba(0, 0, 0, 0.06), 0 24px 56px -38px rgba(17, 17, 17, 0.18)",
              backdropFilter: "blur(16px)",
              opacity: overshoot(frame, 26, 14),
              transform: `translateY(${(1 - overshoot(frame, 26, 14)) * 14}px)`,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                fontFamily: fontFamilies.body,
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: colors.fgFaint,
              }}
            >
              <span
                style={{
                  width: 24,
                  height: 1,
                  background: colors.border,
                }}
              />
              <span>But here I am</span>
              <span
                style={{
                  width: 24,
                  height: 1,
                  background: colors.border,
                }}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Frame>

      {/* Sound layer */}
      <Sequence from={0} durationInFrames={20} layout="none">
        <Audio src={staticFile("sounds/whoosh.wav")} volume={0.65} />
      </Sequence>
      <Sequence from={4} durationInFrames={16} layout="none">
        <Audio src={staticFile("sounds/pop.wav")} volume={0.55} />
      </Sequence>
    </AbsoluteFill>
  );
};
