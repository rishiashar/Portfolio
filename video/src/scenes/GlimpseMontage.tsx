import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { fontFamilies } from "../fonts";
import { colors, ease, rainbowGradient } from "../theme";

// One quick cut, ~14 frames long. Each glimpse snaps in (overshoot pop) and
// is followed by a tick sound + a frame of white flash to feel like a strobe.
const CUT_FRAMES = 14;
const GLIMPSE_COUNT = 6;
export const GLIMPSE_TOTAL = CUT_FRAMES * GLIMPSE_COUNT; // 84 frames

const Glimpse: React.FC<{
  children: React.ReactNode;
  rotate?: number;
  bg?: string;
}> = ({ children, rotate = 0, bg = colors.pageBg }) => {
  const frame = useCurrentFrame();
  // Snappy entrance with overshoot, then a flash-out at the tail.
  const enter = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });
  const exit = interpolate(frame, [CUT_FRAMES - 3, CUT_FRAMES], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.55, 0, 1, 0.45),
  });
  const opacity = enter * exit;
  const scale = 0.92 + 0.08 * enter;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bg,
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transform: `scale(${scale}) rotate(${rotate}deg)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

const SectionFlash: React.FC<{ label: string }> = ({ label }) => {
  return (
    <div
      style={{
        position: "relative",
        width: 900,
        textAlign: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -8,
          left: 0,
          right: 0,
          height: 1,
          background: colors.border,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -14,
          left: -6,
          width: 12,
          height: 12,
          color: colors.fgFaint,
        }}
      >
        <span
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(currentColor, currentColor) 50% 50% / 1.25px 100% no-repeat, linear-gradient(currentColor, currentColor) 50% 50% / 100% 1.25px no-repeat",
          }}
        />
      </div>
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -14,
          right: -6,
          width: 12,
          height: 12,
          color: colors.fgFaint,
        }}
      >
        <span
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(currentColor, currentColor) 50% 50% / 1.25px 100% no-repeat, linear-gradient(currentColor, currentColor) 50% 50% / 100% 1.25px no-repeat",
          }}
        />
      </div>
      <span
        style={{
          fontFamily: fontFamilies.body,
          fontSize: 18,
          fontWeight: 500,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: colors.fgFaint,
        }}
      >
        {label}
      </span>
    </div>
  );
};

const MetricFlash: React.FC<{ value: string; suffix: string }> = ({
  value,
  suffix,
}) => (
  <div
    style={{
      textAlign: "center",
      fontFamily: fontFamilies.heading,
    }}
  >
    <div
      style={{
        fontSize: 220,
        lineHeight: 1,
        fontWeight: 600,
        letterSpacing: "-0.04em",
        color: colors.fg,
      }}
    >
      {value}
    </div>
    <div
      style={{
        marginTop: 18,
        fontFamily: fontFamilies.body,
        fontSize: 18,
        fontWeight: 500,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: colors.fgMuted,
      }}
    >
      {suffix}
    </div>
  </div>
);

const WorkPeek: React.FC<{ src: string; title: string; tag: string }> = ({
  src,
  title,
  tag,
}) => (
  <div
    style={{
      width: 760,
      backgroundColor: colors.pageBg,
      padding: 24,
      boxShadow: "0 0 0 1px rgba(0,0,0,0.06), 0 24px 56px -28px rgba(17,17,17,0.18)",
    }}
  >
    <div
      style={{
        width: "100%",
        height: 360,
        overflow: "hidden",
        outline: "1px solid rgba(0,0,0,0.1)",
        outlineOffset: -1,
        backgroundColor: colors.surface,
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          objectFit: "cover",
        }}
      />
    </div>
    <div
      style={{
        marginTop: 18,
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
      }}
    >
      <span
        style={{
          fontFamily: fontFamilies.heading,
          fontSize: 28,
          fontWeight: 500,
          letterSpacing: "-0.02em",
          color: colors.fg,
        }}
      >
        {title}
      </span>
      <span
        style={{
          fontFamily: fontFamilies.body,
          fontSize: 13,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: colors.fgFaint,
        }}
      >
        {tag}
      </span>
    </div>
  </div>
);

const ToolFlash: React.FC<{ logo: string; name: string }> = ({
  logo,
  name,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 22,
    }}
  >
    <div
      style={{
        width: 220,
        height: 220,
        backgroundColor: colors.surface,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow:
          "0 0 0 1px rgba(0,0,0,0.06), 0 30px 60px -30px rgba(17,17,17,0.18)",
      }}
    >
      <Img
        src={staticFile(logo)}
        style={{ width: 132, height: 132, objectFit: "contain" }}
      />
    </div>
    <span
      style={{
        fontFamily: fontFamilies.heading,
        fontSize: 32,
        fontWeight: 500,
        letterSpacing: "-0.02em",
        color: colors.fg,
      }}
    >
      {name}
    </span>
  </div>
);

const GradientFlash: React.FC = () => (
  <div
    style={{
      fontFamily: fontFamilies.displayItalic,
      fontStyle: "italic",
      fontSize: 280,
      lineHeight: 1,
      letterSpacing: "-0.02em",
      backgroundImage: rainbowGradient,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
    }}
  >
    Designer
  </div>
);

const HatchFlash: React.FC = () => (
  <div
    style={{
      width: "100%",
      height: 320,
      backgroundImage:
        "repeating-linear-gradient(-60deg, transparent 0 24px, rgba(17,17,17,0.18) 24px 28px)",
    }}
  />
);

export const GlimpseMontage: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.pageBg }}>
      {/* Six glimpses, each followed by a tick sound */}
      <Sequence from={0} durationInFrames={CUT_FRAMES}>
        <Glimpse rotate={-1.5}>
          <SectionFlash label="Selected Work" />
        </Glimpse>
        <Audio src={staticFile("sounds/tick.wav")} volume={0.7} />
      </Sequence>

      <Sequence from={CUT_FRAMES} durationInFrames={CUT_FRAMES}>
        <Glimpse rotate={1}>
          <MetricFlash value="1.5M" suffix="users · monthly" />
        </Glimpse>
        <Audio src={staticFile("sounds/tick.wav")} volume={0.7} />
      </Sequence>

      <Sequence from={CUT_FRAMES * 2} durationInFrames={CUT_FRAMES}>
        <Glimpse rotate={-0.8}>
          <WorkPeek
            src="work/activity-log-analyzer-dashboard-v2.png"
            title="Activity Log Analyzer"
            tag="Autodesk"
          />
        </Glimpse>
        <Audio src={staticFile("sounds/tick.wav")} volume={0.7} />
      </Sequence>

      <Sequence from={CUT_FRAMES * 3} durationInFrames={CUT_FRAMES}>
        <Glimpse rotate={2}>
          <ToolFlash logo="logos/figma.png" name="Figma + Cursor + Claude" />
        </Glimpse>
        <Audio src={staticFile("sounds/tick.wav")} volume={0.7} />
      </Sequence>

      <Sequence from={CUT_FRAMES * 4} durationInFrames={CUT_FRAMES}>
        <Glimpse rotate={-1.2}>
          <GradientFlash />
        </Glimpse>
        <Audio src={staticFile("sounds/tick.wav")} volume={0.8} />
      </Sequence>

      <Sequence from={CUT_FRAMES * 5} durationInFrames={CUT_FRAMES}>
        <Glimpse>
          <HatchFlash />
        </Glimpse>
        <Audio src={staticFile("sounds/tick.wav")} volume={0.7} />
      </Sequence>
    </AbsoluteFill>
  );
};
