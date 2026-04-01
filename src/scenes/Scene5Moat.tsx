/**
 * Scene 5: THE MOAT (2:15-2:45 = 1050 frames local)
 * - TextScramble: random chars cycling then settling on "PATENT PENDING"
 * - Three-layer pyramid animating: DATA → INSIGHTS → BEHAVIOR
 * - Compounding curve: flat line → exponential growth
 * - "Switching means starting from zero"
 */
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// ─── TextScramble ────────────────────────────────────────────────────────────
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
const TARGET = "PATENT PENDING";

function scrambledChar(targetChar: string, progress: number, seed: number): string {
  if (progress >= 1) return targetChar;
  if (targetChar === " ") return " ";
  const idx = Math.floor((seed * 17 + progress * 31) % CHARS.length);
  if (progress > 0.7) return targetChar;
  return CHARS[idx];
}

const TextScramble: React.FC<{ progress: number }> = ({ progress }) => {
  const chars = TARGET.split("").map((char, i) => {
    const charProgress = interpolate(
      progress,
      [i * 0.05, i * 0.05 + 0.4],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    return {
      target: char,
      display: scrambledChar(char, charProgress, i * 13 + 7),
      isSettled: charProgress >= 1,
    };
  });

  return (
    <div
      style={{
        fontFamily: "Inter, monospace",
        fontWeight: 900,
        fontSize: 72,
        letterSpacing: "0.12em",
        color: "white",
        textAlign: "center",
        userSelect: "none",
      }}
    >
      {chars.map((c, i) => (
        <span
          key={i}
          style={{
            color: c.isSettled ? "#F59E0B" : "#4b5563",
            transition: "color 0.1s",
          }}
        >
          {c.display}
        </span>
      ))}
    </div>
  );
};

// ─── Pyramid ─────────────────────────────────────────────────────────────────
const PYRAMID_LAYERS = [
  {
    label: "DATA",
    sublabel: "Portable, commoditized",
    width: 700,
    color: "#1E3A5F",
    textColor: "#6b7280",
    frame: 250,
  },
  {
    label: "INSIGHTS",
    sublabel: "Hard to replicate",
    width: 500,
    color: "#2d5f8a",
    textColor: "#94a3b8",
    frame: 360,
  },
  {
    label: "BEHAVIOR",
    sublabel: "Impossible to export",
    width: 300,
    color: "#F59E0B",
    textColor: "#020617",
    frame: 470,
  },
];

const Pyramid: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "center",
        gap: 4,
      }}
    >
      {PYRAMID_LAYERS.map((layer, i) => {
        const progress = spring({
          frame: frame - layer.frame,
          fps,
          config: { damping: 18, mass: 0.9, stiffness: 80 },
        });
        const scaleX = interpolate(progress, [0, 1], [0, 1]);
        const opacity = interpolate(progress, [0, 0.4], [0, 1], {
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={i}
            style={{
              width: layer.width,
              height: 72,
              backgroundColor: layer.color,
              borderRadius: i === PYRAMID_LAYERS.length - 1 ? "6px 6px 0 0" : 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              opacity,
              transform: `scaleX(${scaleX})`,
              transformOrigin: "center",
              boxShadow: i === 2 ? "0 0 30px rgba(245,158,11,0.4)" : "none",
            }}
          >
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 900,
                fontSize: 20,
                color: layer.textColor,
                letterSpacing: "0.1em",
              }}
            >
              {layer.label}
            </div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: 12,
                color: layer.textColor,
                opacity: 0.7,
              }}
            >
              {layer.sublabel}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─── Compounding Curve ────────────────────────────────────────────────────────
const CompoundingCurve: React.FC<{ progress: number }> = ({ progress }) => {
  const W = 400;
  const H = 120;

  // Generate exponential curve points
  const POINTS = 60;
  const points: string[] = [];
  for (let i = 0; i <= POINTS; i++) {
    const t = i / POINTS;
    const drawn = progress;
    if (t > drawn) break;
    const x = (t / drawn) * W * drawn;
    // Exponential: flat then steep
    const y = H - (Math.pow(t, 2.5) * H * 0.9 + t * H * 0.1);
    points.push(`${x},${y}`);
  }

  const pathD =
    points.length > 1
      ? `M ${points[0]} L ${points.slice(1).join(" L ")}`
      : "";

  const labelOpacity = interpolate(progress, [0.8, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        textAlign: "center",
        opacity: interpolate(progress, [0, 0.1], [0, 1], {
          extrapolateRight: "clamp",
        }),
      }}
    >
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 13,
          color: "#6b7280",
          marginBottom: 8,
        }}
      >
        ZoneWise Intelligence Over Time
      </div>
      <svg
        width={W}
        height={H + 20}
        viewBox={`0 0 ${W} ${H + 20}`}
        style={{ overflow: "visible" }}
      >
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={0}
            y1={H - t * H * 0.9}
            x2={W}
            y2={H - t * H * 0.9}
            stroke="#1E3A5F"
            strokeWidth={0.5}
            strokeDasharray="4,4"
          />
        ))}

        {/* Axis */}
        <line x1={0} y1={H} x2={W} y2={H} stroke="#374151" strokeWidth={1} />
        <line x1={0} y1={0} x2={0} y2={H} stroke="#374151" strokeWidth={1} />

        {/* Curve */}
        {pathD && (
          <path
            d={pathD}
            fill="none"
            stroke="#F59E0B"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Labels */}
        <text x={0} y={H + 16} style={{ fontSize: 10, fill: "#4b5563", fontFamily: "Inter" }}>
          Week 1
        </text>
        <text
          x={W}
          y={H + 16}
          textAnchor="end"
          style={{ fontSize: 10, fill: "#4b5563", fontFamily: "Inter" }}
        >
          Week 52
        </text>
      </svg>
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
          fontSize: 14,
          color: "#F59E0B",
          marginTop: 4,
          opacity: labelOpacity,
        }}
      >
        Switching means starting from zero
      </div>
    </div>
  );
};

// ─── Main Scene ──────────────────────────────────────────────────────────────
export const TheMoat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // TextScramble: frames 0-200
  const scrambleProgress = interpolate(frame, [0, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scrambleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle after scramble (180-260)
  const subtitleOpacity = interpolate(frame, [180, 240], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pyramid (250-600)
  // Individual layers stagger inside Pyramid component

  // Curve (650-950)
  const curveProgress = interpolate(frame, [650, 950], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617" }}>
      {/* Background hex pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(30,58,95,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(245,158,11,0.1) 0%, transparent 50%)",
        }}
      />

      {/* Layout: left = scramble + pyramid, right = curve */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          padding: "60px 80px",
        }}
      >
        {/* TextScramble */}
        <div style={{ opacity: scrambleOpacity }}>
          <TextScramble progress={scrambleProgress} />
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: subtitleOpacity,
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: 24,
            color: "#94a3b8",
            textAlign: "center",
          }}
        >
          The longer you use ZoneWise, the smarter it gets
        </div>

        {/* Two-column: pyramid + curve */}
        <div style={{ display: "flex", gap: 80, alignItems: "flex-end" }}>
          {/* Pyramid */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: 16,
                color: "#6b7280",
                marginBottom: 16,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Your Defensible Moat
            </div>
            <Pyramid frame={frame} fps={fps} />
          </div>

          {/* Compounding curve */}
          <CompoundingCurve progress={curveProgress} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
