/**
 * Scene 3 — BOTH CODES CRACKED (1650–2099 frames = 15s)
 * White bg. "USA Real Estate — Decoded." in Orange.
 * Simplified US map SVG. Florida highlights. States pulse.
 * "For everyone. Everywhere."
 */
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const NAVY = '#1E3A5F';
const ORANGE = '#F59E0B';

// Simplified US state dots — [cx, cy, label]
const STATE_DOTS: Array<[number, number, string]> = [
  [380, 180, 'WA'], [420, 180, 'OR'], [340, 220, 'CA'], [460, 220, 'ID'],
  [500, 210, 'MT'], [540, 200, 'ND'], [580, 200, 'MN'], [620, 190, 'WI'],
  [660, 185, 'MI'], [700, 200, 'NY'], [740, 195, 'MA'], [760, 210, 'CT'],
  [470, 260, 'NV'], [510, 255, 'UT'], [550, 245, 'WY'], [590, 245, 'SD'],
  [630, 240, 'IA'], [665, 235, 'IL'], [700, 240, 'IN'], [725, 235, 'OH'],
  [740, 230, 'PA'], [760, 250, 'NJ'], [755, 265, 'DE'],
  [430, 290, 'AZ'], [475, 285, 'NM'], [515, 280, 'CO'], [555, 275, 'KS'],
  [595, 270, 'MO'], [630, 268, 'KY'], [665, 265, 'WV'], [700, 265, 'VA'],
  [730, 275, 'MD'], [745, 280, 'DC'],
  [530, 310, 'OK'], [565, 305, 'AR'], [600, 300, 'TN'], [635, 295, 'NC'],
  [670, 305, 'SC'], [680, 330, 'GA'],
  [540, 335, 'TX'], [575, 325, 'LA'], [610, 318, 'MS'], [635, 315, 'AL'],
];

// Florida — highlighted specially
const FL_X = 695;
const FL_Y = 360;

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Title springs in
  const titleSpring = spring({frame, fps, config: {stiffness: 80, damping: 18}});
  const titleScale = interpolate(titleSpring, [0, 1], [0.7, 1]);

  // Map fade in
  const mapOp = interpolate(frame, [30, 80], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});

  // Florida highlight pulse
  const flProgress = interpolate(frame, [80, 160], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});

  // "For everyone. Everywhere." fades in at frame 280
  const tagOp = interpolate(frame, [280, 330], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});
  const tagY = interpolate(frame, [280, 330], [20, 0], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});

  // "67 counties live" badge
  const badgeOp = interpolate(frame, [340, 390], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});

  // Wave: states light up one by one
  const statesLit = Math.floor(interpolate(frame, [100, 350], [0, STATE_DOTS.length], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'}));

  return (
    <AbsoluteFill
      style={{
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: 80,
          fontWeight: 800,
          color: ORANGE,
          textAlign: 'center',
          transform: `scale(${titleScale})`,
          letterSpacing: '-1px',
          marginBottom: 8,
        }}
      >
        USA Real Estate — Decoded.
      </div>

      <div
        style={{
          fontSize: 24,
          fontWeight: 400,
          color: '#64748B',
          marginBottom: 48,
          opacity: interpolate(frame, [20, 50], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'}),
        }}
      >
        Auction data + Zoning intelligence. Unified. Actionable.
      </div>

      {/* US Map */}
      <div style={{opacity: mapOp, position: 'relative'}}>
        <svg
          width="900"
          height="480"
          viewBox="280 160 560 280"
          style={{overflow: 'visible'}}
        >
          {/* US mainland outline — simplified bounding box */}
          <rect
            x="290" y="170" width="530" height="260"
            rx="8"
            fill="#F8FAFC"
            stroke="#E2E8F0"
            strokeWidth="2"
          />

          {/* Grid lines */}
          {[0, 1, 2, 3].map(i => (
            <line
              key={`h${i}`}
              x1="290" y1={220 + i * 52}
              x2="820" y2={220 + i * 52}
              stroke="#E2E8F0" strokeWidth="0.5"
            />
          ))}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <line
              key={`v${i}`}
              x1={380 + i * 74} y1="170"
              x2={380 + i * 74} y2="430"
              stroke="#E2E8F0" strokeWidth="0.5"
            />
          ))}

          {/* State dots */}
          {STATE_DOTS.map(([cx, cy, label], i) => {
            const lit = i < statesLit;
            return (
              <g key={label}>
                <circle
                  cx={cx} cy={cy} r={9}
                  fill={lit ? `${NAVY}20` : '#F1F5F9'}
                  stroke={lit ? NAVY : '#CBD5E1'}
                  strokeWidth={lit ? 1.5 : 1}
                />
                <text
                  x={cx} y={cy + 4}
                  textAnchor="middle"
                  fontSize="7"
                  fontFamily="Inter, sans-serif"
                  fontWeight="600"
                  fill={lit ? NAVY : '#94A3B8'}
                >
                  {label}
                </text>
              </g>
            );
          })}

          {/* Florida — special highlight */}
          <g>
            {/* FL body */}
            <ellipse
              cx={FL_X} cy={FL_Y}
              rx={18} ry={28}
              fill={interpolate(flProgress, [0, 1], [0, 1]) > 0.1 ? ORANGE : '#F1F5F9'}
              stroke={ORANGE}
              strokeWidth="2"
              opacity={0.9}
            />
            <text
              x={FL_X} y={FL_Y + 4}
              textAnchor="middle"
              fontSize="9"
              fontFamily="Inter, sans-serif"
              fontWeight="800"
              fill="#FFFFFF"
            >
              FL
            </text>
            {/* Glow ring */}
            <ellipse
              cx={FL_X} cy={FL_Y}
              rx={28} ry={38}
              fill="none"
              stroke={ORANGE}
              strokeWidth="1.5"
              opacity={0.3 * flProgress}
            />

            {/* Florida "live" badge */}
            <g opacity={badgeOp}>
              <rect
                x={FL_X + 30} y={FL_Y - 24}
                width={100} height={28}
                rx="6"
                fill={ORANGE}
              />
              <text
                x={FL_X + 80} y={FL_Y - 5}
                textAnchor="middle"
                fontSize="10"
                fontFamily="Inter, sans-serif"
                fontWeight="700"
                fill="#FFFFFF"
                letterSpacing="1"
              >
                67 COUNTIES LIVE
              </text>
            </g>
          </g>

          {/* Alaska + Hawaii indicators */}
          <g opacity={mapOp}>
            <rect x="295" y="390" width="60" height="35" rx="4" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
            <text x="325" y="412" textAnchor="middle" fontSize="8" fontFamily="Inter" fill="#94A3B8" fontWeight="600">AK</text>
            <rect x="365" y="390" width="50" height="35" rx="4" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
            <text x="390" y="412" textAnchor="middle" fontSize="8" fontFamily="Inter" fill="#94A3B8" fontWeight="600">HI</text>
          </g>

          {/* "All 50 states" sweep label */}
          <g opacity={interpolate(frame, [360, 410], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'})}>
            <rect x="555" y="172" width="190" height="28" rx="6" fill={`${NAVY}10`} />
            <text x="650" y="191" textAnchor="middle" fontSize="11" fontFamily="Inter" fontWeight="700" fill={NAVY} letterSpacing="1">
              ALL 50 STATES PLANNED
            </text>
          </g>
        </svg>
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: 56,
          fontWeight: 800,
          color: NAVY,
          textAlign: 'center',
          opacity: tagOp,
          transform: `translateY(${tagY}px)`,
          marginTop: 32,
          letterSpacing: '-0.5px',
        }}
      >
        For everyone.{' '}
        <span style={{color: ORANGE}}>Everywhere.</span>
      </div>
    </AbsoluteFill>
  );
};
