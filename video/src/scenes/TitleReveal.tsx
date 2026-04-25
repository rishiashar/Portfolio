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

const overshoot = (frame: number, start: number, dur = 22) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

// Confetti dots that fly from the centre when the surname snaps in.
const ConfettiBurst: React.FC<{ trigger: number }> = ({ trigger }) => {
  const frame = useCurrentFrame();
  const dots = React.useMemo(() => {
    const colors = [
      "#FF1F8F",
      "#FF4FA3",
      "#B54FD6",
      "#6C63FF",
      "#2FB8FF",
      "#3DD68C",
      "#F5B400",
      "#FF5A2E",
    ];
    return Array.from({ length: 28 }, (_, i) => {
      const angle = (i / 28) * Math.PI * 2 + Math.random() * 0.6;
      const distance = 280 + Math.random() * 320;
      return {
        angle,
        distance,
        size: 6 + Math.random() * 10,
        color: colors[i % colors.length],
        delay: Math.random() * 4,
      };
    });
  }, []);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 0,
          height: 0,
        }}
      >
        {dots.map((d, i) => {
          const start = trigger + d.delay;
          const p = interpolate(frame, [start, start + 36], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });
          const opacity = interpolate(frame, [start, start + 8, start + 60], [0, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const x = Math.cos(d.angle) * d.distance * p;
          const y = Math.sin(d.angle) * d.distance * p + p * p * 60; // gravity drop
          return (
            <span
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: d.size,
                height: d.size,
                backgroundColor: d.color,
                opacity,
                borderRadius: i % 3 === 0 ? d.size / 2 : 0,
                transform: `rotate(${p * 360}deg)`,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const TitleReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Quick white-flash on entry (frames 0–5)
  const flash = interpolate(frame, [0, 4, 8], [0.85, 0.4, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tagP = overshoot(frame, 4, 16);
  const namePartA = overshoot(frame, 8, 18);
  const namePartB = overshoot(frame, 14, 20);
  const taglineP = overshoot(frame, 22, 20);

  // Subtle continuous breathing on the title
  const breathe = Math.sin(frame * 0.08) * 0.005 + 1;

  // Final exit fade — short, since CTA continues
  const exit = interpolate(
    frame,
    [durationInFrames - 0.3 * fps, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(...ease.ui),
    }
  );

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <Frame>
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(206,206,206,0.4), rgba(255,255,255,0) 70%)",
          }}
        />

        <Hands
          startFrame={0}
          durationInFrames={26}
          rest={0.36}
          size={500}
          vertical={150}
        />

        <ConfettiBurst trigger={14} />

        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: "0 80px",
            textAlign: "center",
            transform: `scale(${breathe})`,
          }}
        >
          <div
            style={{
              fontFamily: fontFamilies.body,
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: colors.fgFaint,
              opacity: tagP,
              transform: `translateY(${(1 - tagP) * 12}px)`,
              display: "flex",
              gap: 16,
              alignItems: "center",
            }}
          >
            <span
              style={{ width: 36, height: 1, background: colors.border }}
            />
            <span>Now Live</span>
            <span
              style={{ width: 36, height: 1, background: colors.border }}
            />
          </div>

          <h1
            style={{
              margin: "32px 0 0",
              fontFamily: fontFamilies.display,
              fontSize: 220,
              lineHeight: 0.95,
              letterSpacing: "-0.025em",
              color: colors.fg,
              fontWeight: 400,
              display: "flex",
              gap: 24,
            }}
          >
            <span
              style={{
                display: "inline-block",
                opacity: namePartA,
                transform: `translate3d(${(1 - namePartA) * -40}px, 0, 0) scale(${
                  0.9 + 0.1 * namePartA
                })`,
                filter: `blur(${(1 - namePartA) * 8}px)`,
              }}
            >
              Rishi
            </span>
            <span
              style={{
                fontFamily: fontFamilies.displayItalic,
                fontStyle: "italic",
                backgroundImage: rainbowGradient,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                display: "inline-block",
                opacity: namePartB,
                transform: `translate3d(${(1 - namePartB) * 40}px, 0, 0) scale(${
                  0.85 + 0.15 * namePartB
                })`,
                filter: `blur(${(1 - namePartB) * 8}px)`,
              }}
            >
              Ashar
            </span>
          </h1>

          <p
            style={{
              margin: "30px 0 0",
              fontFamily: fontFamilies.body,
              fontSize: 22,
              lineHeight: 1.5,
              color: colors.fgMuted,
              maxWidth: 720,
              opacity: taglineP,
              transform: `translateY(${(1 - taglineP) * 14}px)`,
            }}
          >
            AI-First Designer crafting interfaces where intelligence feels
            intuitive.
          </p>
        </AbsoluteFill>

        {/* white flash on entry */}
        <AbsoluteFill
          style={{
            backgroundColor: "white",
            opacity: flash,
            pointerEvents: "none",
          }}
        />
      </Frame>

      {/* Sound layer */}
      <Sequence from={0} durationInFrames={30} layout="none">
        <Audio src={staticFile("sounds/impact.wav")} volume={0.85} />
      </Sequence>
      <Sequence from={6} durationInFrames={50} layout="none">
        <Audio src={staticFile("sounds/chime.wav")} volume={0.55} />
      </Sequence>
    </AbsoluteFill>
  );
};
