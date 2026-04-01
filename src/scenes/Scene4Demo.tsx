/**
 * Scene 4: PRODUCT DEMO (1:30-2:15 = 1200 frames local)
 * - Mockup of ZoneWise dashboard (built from HTML/CSS)
 * - Left: Florida choropleth with counties lighting up on hover-sim
 * - Right: Chat interface with messages appearing
 * - KPI cards slide in: 247 Auctions / $184K Avg / 67 Counties / 31 Alerts
 * - Split-screen resizable divider
 */
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// ─── KPI Cards ───────────────────────────────────────────────────────────────
const KPIS = [
  { label: "Active Auctions", value: "247", unit: "", color: "#F59E0B" },
  { label: "Avg Winning Bid", value: "$184K", unit: "", color: "#3b82f6" },
  { label: "Counties Covered", value: "67", unit: "", color: "#10b981" },
  { label: "Live Alerts", value: "31", unit: "", color: "#ef4444" },
];

const KPICard: React.FC<{
  kpi: (typeof KPIS)[0];
  index: number;
  frame: number;
  fps: number;
}> = ({ kpi, index, frame, fps }) => {
  const startFrame = 400 + index * 60;
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 15, mass: 0.8, stiffness: 100 },
  });
  const translateY = interpolate(progress, [0, 1], [30, 0]);
  const opacity = interpolate(progress, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        backgroundColor: "#0d1525",
        border: `1px solid ${kpi.color}33`,
        borderTop: `3px solid ${kpi.color}`,
        borderRadius: 8,
        padding: "14px 18px",
        flex: 1,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 900,
          fontSize: 32,
          color: kpi.color,
        }}
      >
        {kpi.value}
      </div>
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
          fontSize: 11,
          color: "#6b7280",
          marginTop: 2,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {kpi.label}
      </div>
    </div>
  );
};

// ─── Chat Messages ────────────────────────────────────────────────────────────
const CHAT_MESSAGES = [
  {
    role: "user",
    text: "Show me auction trends in Brevard County",
    frame: 80,
  },
  {
    role: "assistant",
    text: "Found 47 active auctions in Brevard County. Average bid is $142K with a 68% ML confidence score. Top opportunity: 412 Ocean Dr — ARV $285K, max bid $168K.",
    frame: 200,
  },
  {
    role: "user",
    text: "What's my max bid on case 24-CA-1823?",
    frame: 450,
  },
  {
    role: "assistant",
    text: "Case 24-CA-1823 — Shapira Formula result:\n• ARV: $215K × 70% = $150.5K\n• Repairs: -$28K\n• Cushion: -$25K\n✅ MAX BID: $97,500",
    frame: 580,
  },
];

// Animated bar chart for Brevard trends
const BrevardChart: React.FC<{ progress: number }> = ({ progress }) => {
  const BARS = [
    { month: "Oct", count: 32, avg: 128 },
    { month: "Nov", count: 41, avg: 135 },
    { month: "Dec", count: 28, avg: 122 },
    { month: "Jan", count: 47, avg: 142 },
    { month: "Feb", count: 39, avg: 138 },
  ];
  const MAX = 50;

  return (
    <div
      style={{
        backgroundColor: "#060d1a",
        border: "1px solid #1E3A5F",
        borderRadius: 8,
        padding: "12px 16px",
        marginTop: 8,
        opacity: progress,
      }}
    >
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 11,
          color: "#F59E0B",
          fontWeight: 600,
          marginBottom: 8,
        }}
      >
        Brevard County — 5-Month Auction Volume
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 60 }}>
        {BARS.map((bar, i) => {
          const barProgress = interpolate(
            progress,
            [i * 0.15, i * 0.15 + 0.35],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const height = (bar.count / MAX) * 60 * barProgress;
          return (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                style={{
                  width: "100%",
                  height,
                  backgroundColor: i === 3 ? "#F59E0B" : "#1E3A5F",
                  borderRadius: "2px 2px 0 0",
                  transition: "height 0.1s",
                }}
              />
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 8,
                  color: "#4b5563",
                  marginTop: 3,
                }}
              >
                {bar.month}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ChatPanel: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  // Determine which messages to show
  const chartProgress = interpolate(frame, [220, 380], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "16px 20px",
        gap: 12,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          fontSize: 16,
          color: "white",
          borderBottom: "1px solid #1E3A5F",
          paddingBottom: 10,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "#10b981",
          }}
        />
        ZoneWise AI Assistant
      </div>

      {/* Messages */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        {CHAT_MESSAGES.map((msg, i) => {
          const msgOpacity = interpolate(frame, [msg.frame, msg.frame + 40], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const msgY = interpolate(frame, [msg.frame, msg.frame + 50], [15, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          if (frame < msg.frame - 10) return null;

          return (
            <div
              key={i}
              style={{
                opacity: msgOpacity,
                transform: `translateY(${msgY}px)`,
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "85%",
                  backgroundColor: msg.role === "user" ? "#1E3A5F" : "#0d1525",
                  border: `1px solid ${msg.role === "user" ? "#2d4f7a" : "#1E3A5F"}`,
                  borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  padding: "10px 14px",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  color: msg.role === "user" ? "#e2e8f0" : "#cbd5e1",
                  lineHeight: 1.5,
                  whiteSpace: "pre-line",
                }}
              >
                {msg.text}
              </div>
            </div>
          );
        })}

        {/* Chart appears after first assistant message */}
        {frame > 210 && (
          <div style={{ opacity: chartProgress }}>
            <BrevardChart progress={chartProgress} />
          </div>
        )}
      </div>

      {/* Input bar */}
      <div
        style={{
          backgroundColor: "#0d1525",
          border: "1px solid #1E3A5F",
          borderRadius: 20,
          padding: "10px 16px",
          fontFamily: "Inter, sans-serif",
          fontSize: 13,
          color: "#374151",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ flex: 1 }}>Ask about any property or county...</span>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            backgroundColor: "#F59E0B",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
          }}
        >
          ↑
        </div>
      </div>
    </div>
  );
};

// ─── Florida Mini-Map (animated counties) ────────────────────────────────────
const HIGHLIGHT_COUNTIES = [
  { name: "Brevard", x: 75, y: 52, w: 50, h: 40, highlighted: true },
  { name: "Orange", x: 40, y: 40, w: 45, h: 40, highlighted: false },
  { name: "Duval", x: 65, y: 5, w: 50, h: 35, highlighted: false },
  { name: "Miami-Dade", x: 60, y: 88, w: 40, h: 35, highlighted: false },
  { name: "Hillsborough", x: 18, y: 55, w: 45, h: 38, highlighted: false },
  { name: "Palm Beach", x: 70, y: 72, w: 40, h: 35, highlighted: false },
  { name: "Pinellas", x: 12, y: 60, w: 30, h: 30, highlighted: false },
  { name: "Sarasota", x: 18, y: 70, w: 35, h: 30, highlighted: false },
];

const MapPanel: React.FC<{ frame: number }> = ({ frame }) => {
  // Pulse animation for Brevard
  const pulse = Math.sin(frame * 0.1) * 0.3 + 0.7;

  // Counties light up sequentially
  const countyProgress = interpolate(frame, [50, 300], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ height: "100%", padding: "16px 20px", position: "relative" }}>
      {/* Header */}
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          fontSize: 16,
          color: "white",
          borderBottom: "1px solid #1E3A5F",
          paddingBottom: 10,
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>Florida Intelligence Map</span>
        <span
          style={{
            fontWeight: 400,
            fontSize: 11,
            color: "#F59E0B",
            backgroundColor: "rgba(245,158,11,0.12)",
            padding: "2px 8px",
            borderRadius: 12,
          }}
        >
          LIVE
        </span>
      </div>

      {/* SVG Map */}
      <svg viewBox="0 0 130 130" style={{ width: "100%", maxHeight: 380 }}>
        {/* State outline */}
        <rect x={8} y={2} width={115} height={126} rx={4}
          fill="#0a0f1a" stroke="#1E3A5F" strokeWidth={1} />

        {/* Counties */}
        {HIGHLIGHT_COUNTIES.map((county, i) => {
          const progress = interpolate(
            countyProgress,
            [i * 0.1, i * 0.1 + 0.3],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const isHighlighted = county.highlighted;
          const fillOpacity = isHighlighted ? pulse * progress : progress * 0.4;
          const fillColor = isHighlighted ? "#F59E0B" : "#1E3A5F";

          return (
            <g key={i}>
              <rect
                x={county.x}
                y={county.y}
                width={county.w}
                height={county.h}
                fill={fillColor}
                fillOpacity={fillOpacity}
                stroke="#020617"
                strokeWidth={0.5}
                rx={1}
              />
              {progress > 0.5 && (
                <text
                  x={county.x + county.w / 2}
                  y={county.y + county.h / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontSize: 5,
                    fill: `rgba(255,255,255,${progress * 0.8})`,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {county.name}
                </text>
              )}
            </g>
          );
        })}

        {/* Brevard active indicator */}
        <circle
          cx={100}
          cy={72}
          r={4 * pulse}
          fill="none"
          stroke="#F59E0B"
          strokeWidth={1}
          opacity={0.6}
        />
      </svg>

      {/* KPI row */}
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        {KPIS.slice(0, 2).map((kpi, i) => (
          <KPICard key={i} kpi={kpi} index={i} frame={frame} fps={30} />
        ))}
      </div>
    </div>
  );
};

// ─── Main Scene ──────────────────────────────────────────────────────────────
export const ProductDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide in from right (0-60)
  const slideProgress = spring({
    frame,
    fps,
    config: { damping: 20, mass: 1, stiffness: 80 },
    durationInFrames: 60,
  });
  const dashboardOpacity = interpolate(slideProgress, [0, 1], [0, 1]);
  const dashboardX = interpolate(slideProgress, [0, 1], [80, 0]);

  // Scene title
  const titleOpacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // KPI row (full set)
  const kpiRowOpacity = interpolate(frame, [380, 440], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617" }}>
      {/* Scene label */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 900,
            fontSize: 36,
            color: "white",
          }}
        >
          See It In <span style={{ color: "#F59E0B" }}>Action</span>
        </div>
      </div>

      {/* Dashboard mockup */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 60,
          right: 60,
          bottom: 20,
          opacity: dashboardOpacity,
          transform: `translateX(${dashboardX}px)`,
          backgroundColor: "#0a0f1a",
          border: "1px solid #1E3A5F",
          borderRadius: 12,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 20px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* Nav bar */}
        <div
          style={{
            height: 44,
            backgroundColor: "#1E3A5F",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            gap: 12,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 900,
              fontSize: 18,
              color: "white",
            }}
          >
            ZoneWise.AI
          </div>
          <div style={{ flex: 1 }} />
          {["Dashboard", "Auctions", "Analytics", "Reports"].map((tab) => (
            <div
              key={tab}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                color: tab === "Dashboard" ? "#F59E0B" : "#94a3b8",
                fontWeight: tab === "Dashboard" ? 600 : 400,
                padding: "4px 12px",
                borderBottom: tab === "Dashboard" ? "2px solid #F59E0B" : "none",
              }}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Main content area */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {/* Left: Map panel */}
          <div
            style={{
              width: "44%",
              borderRight: "1px solid #1E3A5F",
              overflow: "hidden",
            }}
          >
            <MapPanel frame={frame} />
          </div>

          {/* Divider handle */}
          <div
            style={{
              width: 3,
              backgroundColor: "#1E3A5F",
              cursor: "col-resize",
              flexShrink: 0,
            }}
          />

          {/* Right: Chat panel */}
          <div style={{ flex: 1, overflow: "hidden" }}>
            <ChatPanel frame={frame} fps={fps} />
          </div>
        </div>

        {/* KPI row at bottom */}
        <div
          style={{
            height: 72,
            borderTop: "1px solid #1E3A5F",
            display: "flex",
            gap: 12,
            padding: "12px 20px",
            backgroundColor: "#060d1a",
            opacity: kpiRowOpacity,
          }}
        >
          {KPIS.map((kpi, i) => (
            <KPICard key={i} kpi={kpi} index={i} frame={frame} fps={fps} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
