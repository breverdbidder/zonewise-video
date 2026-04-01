/**
 * Scene 2: THE PROBLEM (0:15-0:45 = frames 450-1350 relative to full video)
 * Local frame 0-900
 * - Left: Messy spreadsheet mockup (CSS grid of gray cells with random numbers)
 * - Right: Clean ZoneWise choropleth (SVG map of Florida with colored counties)
 * - TextMaskReveal on "The Old Way vs The Smart Way"
 * - Transition: CurtainReveal — left panel splits apart revealing right panel
 * - Text: "Manual research costs you deals. AI finds them."
 */
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// ─── Fake Spreadsheet ────────────────────────────────────────────────────────
const SHEET_ROWS = 12;
const SHEET_COLS = 8;
const HEADERS = ["Case #", "Address", "County", "Bid", "ARV", "Liens", "Notes", "Status"];
const STATUS_COLORS: Record<string, string> = {
  "?????": "#6b7280",
  "Review": "#d97706",
  "Pass": "#dc2626",
  "Maybe": "#6b7280",
};

const seedData = [
  ["24-CA-1823", "412 Oak Dr", "Brevard", "$85K", "???", "$12K", "needs work", "?????"],
  ["24-CA-0991", "8801 US-1", "Orange", "$212K", "$310K", "$0", "clean title?", "Review"],
  ["24-CA-2241", "113 Citrus Ln", "Duval", "$44K", "$95K", "TBD", "tax cert", "Pass"],
  ["24-CA-3310", "77 Pelican Rd", "Brevard", "$180K", "$225K", "$35K", "HOA lien", "?????"],
  ["24-CA-4120", "290 Beach Blvd", "Orange", "$320K", "???", "???", "research", "Maybe"],
  ["24-CA-0412", "56 Maple St", "Duval", "$67K", "$140K", "$22K", "2nd mtg", "Pass"],
  ["24-CA-5501", "1002 Palm Ave", "Brevard", "$115K", "$175K", "$8K", "", "Review"],
  ["24-CA-6689", "444 Grove Rd", "Orange", "$240K", "$340K", "$15K", "permit?", "?????"],
  ["24-CA-7721", "83 Sunset Dr", "Duval", "$55K", "$120K", "$0", "vacant", "Maybe"],
  ["24-CA-8830", "601 Harbor Ln", "Brevard", "$190K", "???", "???", "flood zone", "Pass"],
  ["24-CA-9001", "29 Mango Ct", "Orange", "$78K", "$155K", "$5K", "ok", "Review"],
  ["24-CA-1055", "312 Birch St", "Duval", "$142K", "$220K", "$18K", "check IRS", "?????"],
];

const Spreadsheet: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div
    style={{
      opacity,
      width: "100%",
      height: "100%",
      padding: 20,
      fontFamily: "monospace",
      fontSize: 11,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        color: "#9ca3af",
        marginBottom: 8,
        fontSize: 13,
        fontWeight: 700,
        fontFamily: "Inter, sans-serif",
      }}
    >
      auction_deals_v14_FINAL_final2.xlsx
    </div>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {HEADERS.map((h) => (
            <th
              key={h}
              style={{
                backgroundColor: "#1f2937",
                color: "#9ca3af",
                padding: "4px 6px",
                border: "1px solid #374151",
                textAlign: "left",
                fontWeight: 600,
                fontSize: 10,
                whiteSpace: "nowrap",
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {seedData.map((row, ri) => (
          <tr key={ri} style={{ backgroundColor: ri % 2 === 0 ? "#111827" : "#0d1117" }}>
            {row.map((cell, ci) => (
              <td
                key={ci}
                style={{
                  padding: "3px 6px",
                  border: "1px solid #1f2937",
                  color:
                    cell === "?????" || cell === "???" || cell === "TBD"
                      ? "#4b5563"
                      : "#d1d5db",
                  fontSize: 10,
                  whiteSpace: "nowrap",
                }}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    <div style={{ marginTop: 10, color: "#374151", fontSize: 10, fontFamily: "Inter" }}>
      ⚠ 43 items not reviewed · Last updated: 3 days ago · 12 duplicates found
    </div>
  </div>
);

// ─── Florida Choropleth SVG ──────────────────────────────────────────────────
// Simplified county blocks representing FL — not geographically accurate,
// but visually communicates "map with county intelligence"
const COUNTY_BLOCKS = [
  // [x, y, w, h, name, color_intensity]
  [20, 10, 80, 50, "Nassau", 0.3],
  [100, 10, 90, 50, "Duval", 0.9],
  [190, 10, 70, 50, "St. Johns", 0.5],
  [20, 60, 80, 60, "Alachua", 0.4],
  [100, 60, 90, 60, "Clay", 0.6],
  [190, 60, 70, 60, "Putnam", 0.2],
  [20, 120, 80, 55, "Marion", 0.5],
  [100, 120, 90, 55, "Lake", 0.7],
  [190, 120, 70, 55, "Volusia", 0.4],
  [20, 175, 80, 55, "Citrus", 0.3],
  [100, 175, 90, 55, "Orange", 0.95],
  [190, 175, 70, 55, "Brevard", 1.0],
  [20, 230, 80, 60, "Hernando", 0.4],
  [100, 230, 90, 60, "Osceola", 0.6],
  [190, 230, 70, 60, "Indian River", 0.5],
  [20, 290, 80, 60, "Hillsborough", 0.8],
  [100, 290, 90, 60, "Polk", 0.7],
  [190, 290, 70, 60, "Okeechobee", 0.2],
  [20, 350, 80, 55, "Pinellas", 0.6],
  [100, 350, 90, 55, "Highlands", 0.3],
  [190, 350, 70, 55, "Martin", 0.5],
  [20, 405, 80, 55, "Manatee", 0.5],
  [100, 405, 90, 55, "Charlotte", 0.4],
  [190, 405, 70, 55, "Palm Beach", 0.8],
  [20, 460, 80, 55, "Sarasota", 0.6],
  [100, 460, 90, 55, "Lee", 0.7],
  [190, 460, 70, 55, "Broward", 0.85],
  [55, 515, 100, 55, "Collier", 0.4],
  [155, 515, 105, 55, "Miami-Dade", 0.9],
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const FloridaMap: React.FC<{ progress: number }> = ({ progress }) => (
  <div style={{ width: "100%", height: "100%", padding: 20, position: "relative" }}>
    <div
      style={{
        color: "#F59E0B",
        marginBottom: 12,
        fontSize: 13,
        fontWeight: 700,
        fontFamily: "Inter, sans-serif",
      }}
    >
      ZoneWise Intelligence Map — 67 Counties
    </div>
    <svg viewBox="0 0 280 580" style={{ width: "100%", maxHeight: 460 }}>
      {COUNTY_BLOCKS.map(([x, y, w, h, name, intensity], i) => {
        const itemProgress = interpolate(
          progress,
          [i * 0.012, i * 0.012 + 0.25],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const r = Math.round(lerp(2, 245, (intensity as number) * itemProgress));
        const g = Math.round(lerp(6, 158, (intensity as number) * 0.3 * itemProgress));
        const b = Math.round(lerp(23, 11, itemProgress));
        const fillColor = `rgb(${r},${g},${b})`;

        return (
          <g key={i}>
            <rect
              x={x as number}
              y={y as number}
              width={w as number}
              height={h as number}
              fill={fillColor}
              stroke="#020617"
              strokeWidth={1}
              opacity={0.2 + (intensity as number) * itemProgress * 0.8}
            />
            <text
              x={(x as number) + (w as number) / 2}
              y={(y as number) + (h as number) / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: 7,
                fill: `rgba(255,255,255,${itemProgress * 0.85})`,
                fontFamily: "Inter, monospace",
                fontWeight: 500,
              }}
            >
              {name as string}
            </text>
          </g>
        );
      })}
    </svg>

    {/* Legend */}
    <div
      style={{
        position: "absolute",
        bottom: 30,
        right: 30,
        fontFamily: "Inter, sans-serif",
        fontSize: 9,
        color: "#6b7280",
        opacity: progress,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <div
          style={{ width: 12, height: 12, backgroundColor: "#F59E0B", borderRadius: 2 }}
        />
        High Opportunity
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <div
          style={{ width: 12, height: 12, backgroundColor: "#d97706", borderRadius: 2 }}
        />
        Medium
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div
          style={{ width: 12, height: 12, backgroundColor: "#1E3A5F", borderRadius: 2 }}
        />
        Low / Monitored
      </div>
    </div>
  </div>
);

// ─── Main Scene ──────────────────────────────────────────────────────────────
export const TheProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Show spreadsheet (0-120)
  const spreadsheetOpacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: Title "The Old Way" (60-150)
  const titleOpacity = interpolate(frame, [60, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: Curtain reveal — divider moves right to expose map (200-500)
  const curtainProgress = spring({
    frame: frame - 200,
    fps,
    config: { damping: 20, mass: 1.2, stiffness: 60 },
    durationInFrames: 300,
  });
  const dividerX = interpolate(curtainProgress, [0, 1], [100, 50]);

  // Map builds up (200-700)
  const mapProgress = interpolate(frame, [200, 700], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bottom text (600-750)
  const bottomOpacity = interpolate(frame, [600, 700], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "The Smart Way" label (350-450)
  const smartLabelOpacity = interpolate(frame, [350, 430], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617" }}>
      {/* Split panels */}
      <div style={{ display: "flex", width: "100%", height: "100%", position: "relative" }}>
        {/* Left panel: spreadsheet */}
        <div
          style={{
            width: `${dividerX}%`,
            height: "100%",
            backgroundColor: "#0a0f1a",
            overflow: "hidden",
            borderRight: "2px solid #F59E0B",
            position: "relative",
            transition: "width 0s",
          }}
        >
          <Spreadsheet opacity={spreadsheetOpacity} />
          {/* "The Old Way" badge */}
          <div
            style={{
              position: "absolute",
              bottom: 80,
              left: "50%",
              transform: "translateX(-50%)",
              opacity: titleOpacity,
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              padding: "8px 20px",
              borderRadius: 6,
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: 20,
              color: "#9ca3af",
              whiteSpace: "nowrap",
            }}
          >
            😩 The Old Way
          </div>
        </div>

        {/* Right panel: map */}
        <div
          style={{
            width: `${100 - dividerX}%`,
            height: "100%",
            backgroundColor: "#060d1a",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <FloridaMap progress={mapProgress} />
          {/* "The Smart Way" badge */}
          <div
            style={{
              position: "absolute",
              bottom: 80,
              left: "50%",
              transform: "translateX(-50%)",
              opacity: smartLabelOpacity,
              backgroundColor: "#F59E0B",
              padding: "8px 20px",
              borderRadius: 6,
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: 20,
              color: "#020617",
              whiteSpace: "nowrap",
            }}
          >
            🤖 The Smart Way
          </div>
        </div>

        {/* Divider handle */}
        <div
          style={{
            position: "absolute",
            left: `${dividerX}%`,
            top: 0,
            bottom: 0,
            width: 4,
            backgroundColor: "#F59E0B",
            transform: "translateX(-50%)",
            zIndex: 20,
          }}
        />
      </div>

      {/* Bottom caption */}
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: bottomOpacity,
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          fontSize: 32,
          color: "white",
          textAlign: "center",
          textShadow: "0 2px 20px rgba(0,0,0,0.8)",
          zIndex: 30,
          whiteSpace: "nowrap",
        }}
      >
        Manual research costs you deals.{" "}
        <span style={{ color: "#F59E0B" }}>AI finds them.</span>
      </div>
    </AbsoluteFill>
  );
};
