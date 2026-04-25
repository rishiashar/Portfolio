import React from "react";

// Registration plus mark — mirrors src/components/plus-mark.tsx in the portfolio.
type Edge = "left" | "right";

export const PlusMark: React.FC<{
  edge?: Edge;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ size = 12, color, style }) => {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: size,
        height: size,
        position: "relative",
        color,
        ...style,
      }}
    >
      <span
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          height: 1.25,
          background: "currentColor",
          transform: "translateY(-50%)",
        }}
      />
      <span
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          width: 1.25,
          background: "currentColor",
          transform: "translateX(-50%)",
        }}
      />
    </span>
  );
};
