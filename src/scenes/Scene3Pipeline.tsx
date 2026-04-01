/**
 * Scene 3: 12-STEP PIPELINE (0:45-1:30 = 1350 frames local)
 * - Animated pipeline — each step card slides in from bottom
 * - Cards stack vertically with StickyCards-like animation
 * - Each card: step number (Orange badge) + title + description + icon
 * - After all 12 shown: "Patent Pending" stamp
 */
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const STEPS = [
  { icon: "🔍", title: "Discovery", desc: "AI scans 67 county auction calendars" },
  { icon: "🕷️", title: "Scraping", desc: "Automated property data extraction" },
  { icon: "📋", title: "Title Search", desc: "Lien chain analysis in seconds" },
  { icon: "⚖️", title: "Lien Priority", desc: "Senior vs junior, automatically ranked" },
  { icon: "💰", title: "Tax Certificates", desc: "Delinquent tax exposure flagged" },
  { icon: "👥", title: "Demographics", desc: "Neighborhood intelligence overlay" },
  { icon: "🤖", title: "ML Score", desc: "XGBoost predicts auction outcomes" },
  { icon: "🎯", title: "Max Bid", desc: "Shapira Formula calculates your number" },
  { icon: "📊", title: "Decision Log", desc: "Every recommendation audited" },
  { icon: "📄", title: "Report", desc: "One-page investor reports, auto-generated" },
  { icon: "📈", title: "Price Monitor", desc: "Buy zone alerts in real-time" },
  { icon: "🧠", title: "Compounding", desc: "Gets smarter every week you use it" },
];

// Frames per card to animate in (stagger)
const CARD_STAGGER = 80; // each card starts 80 frames after previous
const CARD_DURATION = 60; // spring duration per card

interface PipelineCardProps {
  step: (typeof STEPS)[0];
  index: number;
  frame: number;
  fps: number;
  totalCards: number;
}

const PipelineCard: React.FC<PipelineCardProps> = ({ step, index, frame, fps, totalCards }) => {
  const startFrame = index * CARD_STAGGER;

  const cardProgress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 18, mass: 0.9, stiffness: 100 },
    durationInFrames: CARD_DURATION,
  });

  const translateY = interpolate(cardProgress, [0, 1], [60, 0]);
  const opacity = interpolate(cardProgress, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  if (frame < startFrame - 10) return null;

  // Two-column layout: 6 cards left, 6 cards right
  const col = index < 6 ? 0 : 1;
  const row = index < 6 ? index : index - 6;

  return (
    <div
      style={{
        position: "absolute",
        left: col === 0 ? 80 : "50%",
        top: 130 + row * 130,
        width: 780,
        opacity,
        transform: `translateY(${translateY}px)`,
        display: "flex",
        alignItems: "center",
        gap: 16,
        backgroundColor: "#0d1525",
        border: "1px solid #1E3A5F",
        borderLeft: "4px solid #F59E0B",
        borderRadius: 8,
        padding: "16px 20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
      }}
    >
      {/* Step number badge */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          backgroundColor: "#F59E0B",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, sans-serif",
          fontWeight: 900,
          fontSize: 16,
          color: "#020617",
          flexShrink: 0,
        }}
      >
        {index + 1}
      </div>

      {/* Icon */}
      <div style={{ fontSize: 24, flexShrink: 0 }}>{step.icon}</div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: 18,
            color: "white",
            marginBottom: 2,
          }}
        >
          {step.title}
        </div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: 13,
            color: "#6b7280",
          }}
        >
          {step.desc}
        </div>
      </div>

      {/* Connector dot */}
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#F59E0B",
          flexShrink: 0,
          opacity: 0.6,
        }}
      />
    </div>
  );
};

// Patent Pending stamp
const PatentStamp: React.FC<{ progress: number }> = ({ progress }) => {
  const scale = spring({
    frame: Math.round(progress * 30),
    fps: 30,
    config: { damping: 8, mass: 1.2, stiffness: 200 },
  });
  const rotate = interpolate(scale, [0, 1], [-15, -8]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: "8%",
        right: "8%",
        opacity: progress,
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        border: "4px solid #F59E0B",
        borderRadius: 8,
        padding: "12px 28px",
        fontFamily: "Inter, sans-serif",
        fontWeight: 900,
        fontSize: 28,
        color: "#F59E0B",
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        background: "rgba(245,158,11,0.08)",
        boxShadow: "0 0 30px rgba(245,158,11,0.3), inset 0 0 30px rgba(245,158,11,0.05)",
        whiteSpace: "nowrap",
      }}
    >
      Patent Pending ™
    </div>
  );
};

export const PipelineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene title (0-60)
  const titleOpacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 60], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // All 12 cards fully visible by frame 12*80=960
  // Patent stamp: frame 1020-1100
  const stampProgress = interpolate(frame, [1020, 1080], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617" }}>
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(30,58,95,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,95,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 900,
            fontSize: 48,
            color: "white",
          }}
        >
          The{" "}
          <span style={{ color: "#F59E0B" }}>12-Step</span> Intelligence Pipeline
        </div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: 20,
            color: "#6b7280",
            marginTop: 6,
          }}
        >
          Every deal analyzed end-to-end — automatically
        </div>
      </div>

      {/* Cards */}
      {STEPS.map((step, i) => (
        <PipelineCard
          key={i}
          step={step}
          index={i}
          frame={frame}
          fps={fps}
          totalCards={STEPS.length}
        />
      ))}

      {/* Patent stamp */}
      <PatentStamp progress={stampProgress} />
    </AbsoluteFill>
  );
};
