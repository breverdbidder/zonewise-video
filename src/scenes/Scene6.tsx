/**
 * Scene 6 — THE MOAT (4200–4799 frames = 20s)
 * Background: pyramid-data-layers.jpg — zoom-out-pan-right
 * Frosted pyramid layers + growth curve. Compounding intelligence.
 */
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {SceneBackground} from '../components/SceneBackground';
import {FrostedCard, headlineShadow} from '../components/FrostedCard';

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

  const titleOp = interpolate(frame, [0, 30], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});

  const layer1Spring = spring({frame: Math.max(0, frame - 40), fps, config: {stiffness: 90, damping: 18}});
  const layer2Spring = spring({frame: Math.max(0, frame - 100), fps, config: {stiffness: 90, damping: 18}});
  const layer3Spring = spring({frame: Math.max(0, frame - 160), fps, config: {stiffness: 90, damping: 18}});
  const springs = [layer1Spring, layer2Spring, layer3Spring];

  const curveProgress = interpolate(frame, [260, 380], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});
  const tagOp = interpolate(frame, [400, 450], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});

  const CURVE_W = 340;
  const CURVE_H = 180;
  const totalPoints = 60;
  const visiblePoints = Math.floor(totalPoints * curveProgress);

  const points: Array<[number, number]> = [];
  for (let i = 0; i < totalPoints; i++) {
    const x = (i / (totalPoints - 1)) * CURVE_W;
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
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
        padding: '0 72px',
      }}
    >
      <SceneBackground
        imageName="pyramid-data-layers"
        durationInFrames={600}
        kenBurns="zoom-out-pan-right"
        overlayOpacity={0.6}
      />

      {/* Title */}
      <FrostedCard
        style={{
          opacity: titleOp,
          textAlign: 'center',
          marginBottom: 40,
          padding: '20px 56px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{fontSize: 48, fontWeight: 800, color: NAVY, letterSpacing: '-0.5px', ...headlineShadow}}>
          The Moat.{' '}
          <span style={{color: ORANGE}}>Compounding Intelligence.</span>
        </div>
      </FrostedCard>

      <div style={{display: 'flex', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1}}>

        {/* Pyramid */}
        <div style={{display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', gap: 8}}>
          {LAYERS.map((layer, i) => {
            const sp = springs[i];
            const w = 300 + i * 120;
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
                  padding: '18px 24px',
                  textAlign: 'center',
                  transform: `scaleX(${scaleX}) translateY(${translateY}px)`,
                  opacity,
                  boxShadow: i === 2 ? `0 8px 32px ${ORANGE}40` : '0 4px 16px rgba(0,0,0,0.2)',
                }}
              >
                <div style={{fontSize: i === 2 ? 20 : 16, fontWeight: 800, color: layer.textColor, letterSpacing: 2}}>
                  {layer.label}
                </div>
                <div style={{fontSize: 12, color: i === 0 ? '#64748B' : `${layer.textColor}BB`, marginTop: 4, lineHeight: 1.4}}>
                  {layer.sublabel}
                </div>
              </div>
            );
          })}

          <svg width="24" height="40" viewBox="0 0 24 40" style={{opacity: springs[2]}}>
            <path d="M12 38 L12 4 M4 12 L12 4 L20 12" stroke={ORANGE} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>

        {/* Growth curve */}
        <FrostedCard style={{padding: '24px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>
          <div style={{fontSize: 13, fontWeight: 700, color: '#94A3B8', letterSpacing: 3, textTransform: 'uppercase', opacity: curveProgress > 0.05 ? 1 : 0}}>
            Your Edge Over Time
          </div>
          <svg width={CURVE_W + 40} height={CURVE_H + 40} viewBox={`-20 -20 ${CURVE_W + 40} ${CURVE_H + 40}`} style={{overflow: 'visible'}}>
            <line x1="0" y1={CURVE_H} x2={CURVE_W} y2={CURVE_H} stroke="#E2E8F0" strokeWidth="1.5" />
            <line x1="0" y1="0" x2="0" y2={CURVE_H} stroke="#E2E8F0" strokeWidth="1.5" />
            <text x={CURVE_W / 2} y={CURVE_H + 18} textAnchor="middle" fontSize="12" fill="#94A3B8" fontFamily="Inter">Time →</text>
            <text x="-15" y={CURVE_H / 2} textAnchor="middle" fontSize="12" fill="#94A3B8" fontFamily="Inter" transform={`rotate(-90, -15, ${CURVE_H / 2})`}>Edge ↑</text>

            {visiblePoints > 2 && (
              <path d={`${pathD} L ${points[Math.max(2, visiblePoints) - 1][0]} ${CURVE_H} L 0 ${CURVE_H} Z`} fill={`${ORANGE}18`} />
            )}
            <path d={pathD} stroke={ORANGE} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            {visiblePoints > 2 && (
              <circle cx={points[Math.max(2, visiblePoints) - 1][0]} cy={points[Math.max(2, visiblePoints) - 1][1]} r="6" fill={ORANGE} />
            )}
            <text x="4" y={CURVE_H - 8} fontSize="11" fill="#94A3B8" fontFamily="Inter">Day 1</text>
            {curveProgress > 0.8 && (
              <text x={CURVE_W - 40} y="18" fontSize="12" fill={ORANGE} fontFamily="Inter" fontWeight="700">YOU</text>
            )}
          </svg>
          <div style={{fontSize: 13, color: '#64748B', textAlign: 'center', maxWidth: 320, lineHeight: 1.5, opacity: interpolate(frame, [320, 370], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'})}}>
            Every deal feeds the model. Every county unlocks more value.
            <br />
            <strong style={{color: NAVY}}>Your moat compounds.</strong>
          </div>
        </FrostedCard>
      </div>

      {/* Tagline */}
      <FrostedCard
        style={{
          marginTop: 36,
          padding: '16px 56px',
          position: 'relative',
          zIndex: 1,
          opacity: tagOp,
        }}
      >
        <div style={{fontSize: 30, fontWeight: 800, color: NAVY, textAlign: 'center', ...headlineShadow}}>
          No one catches up to what you know.
        </div>
      </FrostedCard>
    </AbsoluteFill>
  );
};
