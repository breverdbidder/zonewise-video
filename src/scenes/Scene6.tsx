/**
 * Scene 6 — THE MOAT (4200–4799 frames = 20s)
 * White bg. 3 pyramid layers build up.
 * DATA → INSIGHTS → YOUR INTELLIGENCE
 * Compounding growth curve in Orange.
 */
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const NAVY = '#1E3A5F';
const ORANGE = '#F59E0B';

const LAYERS = [
  {label: 'DATA', sublabel: '3,100+ counties · Auction records · Zoning codes', color: '#E2E8F0', textColor: '#334155'},
  {label: 'INSIGHTS', sublabel: 'ML predictions · Risk scores · Bid ceilings · Comps', color: `${NAVY}CC`, textColor: '#FFFFFF'},
  {label: 'YOUR INTELLIGENCE', sublabel: 'Compounding edge · Every deal makes the next one smarter', color: ORANGE, textColor: '#FFFFFF'},
];

export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Title
  const titleOp = interpolate(frame, [0, 30], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});

  // Pyramid layers appear with spring
  const layer1Spring = spring({frame: Math.max(0, frame - 40), fps, config: {stiffness: 90, damping: 18}});
  const layer2Spring = spring({frame: Math.max(0, frame - 100), fps, config: {stiffness: 90, damping: 18}});
  const layer3Spring = spring({frame: Math.max(0, frame - 160), fps, config: {stiffness: 90, damping: 18}});
  const springs = [layer1Spring, layer2Spring, layer3Spring];

  // Growth curve — drawn from frame 260 over 120 frames
  const curveProgress = interpolate(frame, [260, 380], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});

  // Tagline
  const tagOp = interpolate(frame, [400, 450], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});

  const CURVE_W = 380;
  const CURVE_H = 200;
  const totalPoints = 60;
  const visiblePoints = Math.floor(totalPoints * curveProgress);

  const points: Array<[number, number]> = [];
  for (let i = 0; i < totalPoints; i++) {
    const x = (i / (totalPoints - 1)) * CURVE_W;
    // Exponential: y grows as e^(3t) - 1
    const t = i / (totalPoints - 1);
    const y = CURVE_H - (Math.exp(3 * t) - 1) / (Math.exp(3) - 1) * CURVE_H;
    points.push([x, y]);
  }

  const pathD = points
    .slice(0, Math.max(2, visiblePoints))
    .map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`))
    .join(' ');

  return (
    <AbsoluteFill
      style={{
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
        padding: '0 80px',
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: 56,
          fontWeight: 800,
          color: NAVY,
          opacity: titleOp,
          textAlign: 'center',
          marginBottom: 60,
          letterSpacing: '-0.5px',
        }}
      >
        The Moat.{' '}
        <span style={{color: ORANGE}}>Compounding Intelligence.</span>
      </div>

      <div style={{display: 'flex', gap: 80, alignItems: 'center'}}>

        {/* Pyramid */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column-reverse',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {LAYERS.map((layer, i) => {
            const sp = springs[i];
            const w = 320 + i * 140; // base is widest
            const scaleX = interpolate(sp, [0, 1], [0, 1]);
            const opacity = interpolate(sp, [0, 0.4], [0, 1], {extrapolateRight: 'clamp'});
            const translateY = interpolate(sp, [0, 1], [20, 0]);

            return (
              <div
                key={i}
                style={{
                  width: w,
                  background: layer.color,
                  borderRadius: 12,
                  padding: '20px 28px',
                  textAlign: 'center',
                  transform: `scaleX(${scaleX}) translateY(${translateY}px)`,
                  opacity,
                  boxShadow: i === 2 ? `0 8px 32px ${ORANGE}40` : 'none',
                }}
              >
                <div
                  style={{
                    fontSize: i === 2 ? 22 : 18,
                    fontWeight: 800,
                    color: layer.textColor,
                    letterSpacing: 2,
                  }}
                >
                  {layer.label}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: i === 0 ? '#64748B' : `${layer.textColor}BB`,
                    marginTop: 4,
                    lineHeight: 1.4,
                  }}
                >
                  {layer.sublabel}
                </div>
              </div>
            );
          })}

          {/* Arrow up */}
          <svg width="24" height="40" viewBox="0 0 24 40" style={{opacity: springs[2]}}>
            <path d="M12 38 L12 4 M4 12 L12 4 L20 12" stroke={ORANGE} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>

        {/* Growth curve */}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: '#94A3B8',
              letterSpacing: 3,
              textTransform: 'uppercase',
              opacity: curveProgress > 0.05 ? 1 : 0,
            }}
          >
            Your Edge Over Time
          </div>
          <svg
            width={CURVE_W + 40}
            height={CURVE_H + 40}
            viewBox={`-20 -20 ${CURVE_W + 40} ${CURVE_H + 40}`}
            style={{overflow: 'visible'}}
          >
            {/* Axes */}
            <line x1="0" y1={CURVE_H} x2={CURVE_W} y2={CURVE_H} stroke="#E2E8F0" strokeWidth="1.5" />
            <line x1="0" y1="0" x2="0" y2={CURVE_H} stroke="#E2E8F0" strokeWidth="1.5" />
            <text x={CURVE_W / 2} y={CURVE_H + 18} textAnchor="middle" fontSize="12" fill="#94A3B8" fontFamily="Inter">Time →</text>
            <text x="-15" y={CURVE_H / 2} textAnchor="middle" fontSize="12" fill="#94A3B8" fontFamily="Inter" transform={`rotate(-90, -15, ${CURVE_H / 2})`}>Edge ↑</text>

            {/* Shaded area under curve */}
            {visiblePoints > 2 && (
              <path
                d={`${pathD} L ${points[Math.max(2, visiblePoints) - 1][0]} ${CURVE_H} L 0 ${CURVE_H} Z`}
                fill={`${ORANGE}18`}
              />
            )}

            {/* Main curve */}
            <path d={pathD} stroke={ORANGE} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />

            {/* Dot at tip */}
            {visiblePoints > 2 && (
              <circle
                cx={points[Math.max(2, visiblePoints) - 1][0]}
                cy={points[Math.max(2, visiblePoints) - 1][1]}
                r="6"
                fill={ORANGE}
              />
            )}

            {/* Labels */}
            <text x="4" y={CURVE_H - 8} fontSize="11" fill="#94A3B8" fontFamily="Inter">Day 1</text>
            {curveProgress > 0.8 && (
              <text x={CURVE_W - 40} y="18" fontSize="12" fill={ORANGE} fontFamily="Inter" fontWeight="700">
                YOU
              </text>
            )}
          </svg>
          <div
            style={{
              fontSize: 14,
              color: '#64748B',
              textAlign: 'center',
              maxWidth: 360,
              lineHeight: 1.5,
              opacity: interpolate(frame, [320, 370], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'}),
            }}
          >
            Every deal feeds the model. Every county unlocks more value.
            <br />
            <strong style={{color: NAVY}}>Your moat compounds.</strong>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          marginTop: 48,
          fontSize: 36,
          fontWeight: 800,
          color: NAVY,
          textAlign: 'center',
          opacity: tagOp,
        }}
      >
        No one catches up to what you know.
      </div>
    </AbsoluteFill>
  );
};
