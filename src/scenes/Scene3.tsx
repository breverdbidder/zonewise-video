/**
 * Scene 3 — BOTH CODES CRACKED (1650–2099 frames = 15s)
 * Background: us-map-florida-highlighted.jpg — zoom-out Ken Burns
 * Orange title on frosted glass. US map SVG. Florida highlights.
 */
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {SceneBackground} from '../components/SceneBackground';
import {FrostedCard, headlineShadow} from '../components/FrostedCard';

const NAVY = '#1E3A5F';
const ORANGE = '#F59E0B';

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

const FL_X = 695;
const FL_Y = 360;

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleSpring = spring({frame, fps, config: {stiffness: 80, damping: 18}});
  const titleScale = interpolate(titleSpring, [0, 1], [0.7, 1]);

  const mapOp = interpolate(frame, [30, 80], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});
  const flProgress = interpolate(frame, [80, 160], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});
  const tagOp = interpolate(frame, [280, 330], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});
  const tagY = interpolate(frame, [280, 330], [20, 0], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});
  const badgeOp = interpolate(frame, [340, 390], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});
  const statesLit = Math.floor(interpolate(frame, [100, 350], [0, STATE_DOTS.length], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'}));

  const cardOp = interpolate(frame, [5, 35], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});

  return (
    <AbsoluteFill
      style={{
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <SceneBackground
        imageName="us-map-florida-highlighted"
        durationInFrames={450}
        kenBurns="zoom-out"
        overlayOpacity={0.55}
      />

      {/* Title card */}
      <FrostedCard
        style={{
          transform: `scale(${titleScale})`,
          padding: '28px 56px',
          textAlign: 'center',
          marginBottom: 12,
          position: 'relative',
          zIndex: 1,
          opacity: cardOp,
        }}
      >
        <div style={{fontSize: 68, fontWeight: 800, color: ORANGE, letterSpacing: '-1px', ...headlineShadow}}>
          USA Real Estate — Decoded.
        </div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 400,
            color: '#64748B',
            marginTop: 8,
            opacity: interpolate(frame, [20, 50], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'}),
          }}
        >
          Auction data + Zoning intelligence. Unified. Actionable.
        </div>
      </FrostedCard>

      {/* US Map — sits on top of background */}
      <div style={{opacity: mapOp, position: 'relative', zIndex: 1}}>
        <FrostedCard style={{padding: '20px 24px'}}>
          <svg width="820" height="420" viewBox="280 160 560 270" style={{overflow: 'visible'}}>
            <rect x="290" y="170" width="530" height="250" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
            {[0, 1, 2, 3].map(i => (
              <line key={`h${i}`} x1="290" y1={220 + i * 50} x2="820" y2={220 + i * 50} stroke="#E2E8F0" strokeWidth="0.5" />
            ))}
            {[0, 1, 2, 3, 4, 5].map(i => (
              <line key={`v${i}`} x1={380 + i * 72} y1="170" x2={380 + i * 72} y2="420" stroke="#E2E8F0" strokeWidth="0.5" />
            ))}

            {STATE_DOTS.map(([cx, cy, label], i) => {
              const lit = i < statesLit;
              return (
                <g key={label}>
                  <circle cx={cx} cy={cy} r={9} fill={lit ? `${NAVY}20` : '#F1F5F9'} stroke={lit ? NAVY : '#CBD5E1'} strokeWidth={lit ? 1.5 : 1} />
                  <text x={cx} y={cy + 4} textAnchor="middle" fontSize="7" fontFamily="Inter, sans-serif" fontWeight="600" fill={lit ? NAVY : '#94A3B8'}>{label}</text>
                </g>
              );
            })}

            {/* Florida special highlight */}
            <g>
              <ellipse cx={FL_X} cy={FL_Y} rx={18} ry={28} fill={flProgress > 0.1 ? ORANGE : '#F1F5F9'} stroke={ORANGE} strokeWidth="2" opacity={0.9} />
              <text x={FL_X} y={FL_Y + 4} textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif" fontWeight="800" fill="#FFFFFF">FL</text>
              <ellipse cx={FL_X} cy={FL_Y} rx={28} ry={38} fill="none" stroke={ORANGE} strokeWidth="1.5" opacity={0.3 * flProgress} />
              <g opacity={badgeOp}>
                <rect x={FL_X + 30} y={FL_Y - 24} width={100} height={28} rx="6" fill={ORANGE} />
                <text x={FL_X + 80} y={FL_Y - 5} textAnchor="middle" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="700" fill="#FFFFFF" letterSpacing="1">67 COUNTIES LIVE</text>
              </g>
            </g>

            {/* AK + HI */}
            <g opacity={mapOp}>
              <rect x="295" y="385" width="55" height="30" rx="4" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
              <text x="322" y="405" textAnchor="middle" fontSize="8" fontFamily="Inter" fill="#94A3B8" fontWeight="600">AK</text>
              <rect x="360" y="385" width="48" height="30" rx="4" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
              <text x="384" y="405" textAnchor="middle" fontSize="8" fontFamily="Inter" fill="#94A3B8" fontWeight="600">HI</text>
            </g>

            <g opacity={interpolate(frame, [360, 410], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'})}>
              <rect x="560" y="173" width="180" height="26" rx="6" fill={`${NAVY}10`} />
              <text x="650" y="191" textAnchor="middle" fontSize="11" fontFamily="Inter" fontWeight="700" fill={NAVY} letterSpacing="1">ALL 50 STATES PLANNED</text>
            </g>
          </svg>
        </FrostedCard>
      </div>

      {/* Tagline */}
      <FrostedCard
        style={{
          marginTop: 20,
          padding: '20px 56px',
          position: 'relative',
          zIndex: 1,
          opacity: tagOp,
          transform: `translateY(${tagY}px)`,
        }}
      >
        <div style={{fontSize: 48, fontWeight: 800, color: NAVY, textAlign: 'center', letterSpacing: '-0.5px', ...headlineShadow}}>
          For everyone.{' '}
          <span style={{color: ORANGE}}>Everywhere.</span>
        </div>
      </FrostedCard>
    </AbsoluteFill>
  );
};
