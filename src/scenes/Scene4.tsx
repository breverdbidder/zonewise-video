/**
 * Scene 4 — 12-STEP PIPELINE (2100–3299 frames = 40s)
 * White bg. 12 Navy cards with Orange numbers spring in.
 * "PATENT PENDING — 12 CLAIMS" stamp at end.
 */
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const NAVY = '#1E3A5F';
const ORANGE = '#F59E0B';

const STEPS = [
  {num: '01', title: 'Discovery', desc: 'County auction calendar ingestion'},
  {num: '02', title: 'Data', desc: 'Tax records + deed history pull'},
  {num: '03', title: 'Title', desc: 'Chain-of-title automated search'},
  {num: '04', title: 'Lien', desc: 'Federal + state lien detection'},
  {num: '05', title: 'Tax', desc: 'Delinquency status + redemption window'},
  {num: '06', title: 'Demographics', desc: 'Neighborhood trend scoring'},
  {num: '07', title: 'ML', desc: 'Comparable sale + ARV prediction'},
  {num: '08', title: 'Max Bid', desc: 'Risk-adjusted bid ceiling calc'},
  {num: '09', title: 'Decision', desc: 'Go / No-go + confidence score'},
  {num: '10', title: 'Reports', desc: 'One-click investor package PDF'},
  {num: '11', title: 'Price Monitor', desc: 'Post-purchase value tracking'},
  {num: '12', title: 'Compounding', desc: 'Portfolio intelligence grows over time'},
];

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Title fades in
  const titleOp = interpolate(frame, [0, 30], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});

  // Each card springs in with stagger: card i starts at frame 40 + i*40
  const cardEntries = STEPS.map((_, i) => {
    const startFrame = 40 + i * 40;
    const sp = spring({
      frame: Math.max(0, frame - startFrame),
      fps,
      config: {stiffness: 120, damping: 20, mass: 0.8},
    });
    return sp;
  });

  // Patent stamp appears at frame 40 + 12*40 = 520, animates over 30 frames
  const stampFrame = 520;
  const stampSpring = spring({
    frame: Math.max(0, frame - stampFrame),
    fps,
    config: {stiffness: 200, damping: 15, mass: 0.5},
  });
  const stampScale = interpolate(stampSpring, [0, 1], [0, 1]);
  const stampRotate = interpolate(stampSpring, [0, 1], [-15, -8]);

  return (
    <AbsoluteFill
      style={{
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontFamily: 'Inter, system-ui, sans-serif',
        padding: '48px 80px',
      }}
    >
      {/* Title */}
      <div
        style={{
          opacity: titleOp,
          textAlign: 'center',
          marginBottom: 40,
        }}
      >
        <div style={{fontSize: 15, fontWeight: 700, letterSpacing: 4, color: '#94A3B8', textTransform: 'uppercase', marginBottom: 12}}>
          The Pipeline
        </div>
        <div style={{fontSize: 56, fontWeight: 800, color: NAVY, letterSpacing: '-0.5px'}}>
          12 Steps. Zero Guesswork.
        </div>
      </div>

      {/* Grid: 4 cols × 3 rows */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
          width: '100%',
          maxWidth: 1480,
          position: 'relative',
        }}
      >
        {STEPS.map((step, i) => {
          const sp = cardEntries[i];
          const translateY = interpolate(sp, [0, 1], [40, 0]);
          const opacity = interpolate(sp, [0, 0.3], [0, 1], {extrapolateRight: 'clamp'});

          return (
            <div
              key={i}
              style={{
                background: NAVY,
                borderRadius: 16,
                padding: '24px 24px',
                opacity,
                transform: `translateY(${translateY}px)`,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Corner accent */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 48,
                  height: 48,
                  background: `${ORANGE}15`,
                  borderBottomLeftRadius: 24,
                }}
              />
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: ORANGE,
                  lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {step.num}
              </div>
              <div style={{fontSize: 20, fontWeight: 700, color: '#FFFFFF', marginTop: 4}}>{step.title}</div>
              <div style={{fontSize: 13, color: '#94A3B8', lineHeight: 1.5}}>{step.desc}</div>
            </div>
          );
        })}

        {/* PATENT PENDING stamp — absolutely positioned */}
        <div
          style={{
            position: 'absolute',
            right: -20,
            bottom: -10,
            transform: `scale(${stampScale}) rotate(${stampRotate}deg)`,
            transformOrigin: 'center center',
            zIndex: 10,
          }}
        >
          <div
            style={{
              border: `4px solid ${ORANGE}`,
              borderRadius: 8,
              padding: '12px 24px',
              textAlign: 'center',
              background: 'white',
              boxShadow: `0 0 0 2px ${ORANGE}40`,
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: ORANGE,
                letterSpacing: 3,
                textTransform: 'uppercase',
              }}
            >
              PATENT PENDING
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: NAVY,
                letterSpacing: 2,
                marginTop: 4,
              }}
            >
              12 CLAIMS
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
