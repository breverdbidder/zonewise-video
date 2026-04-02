/**
 * Scene 2 — TWO CODES LOCKED (900–1649 frames = 25s)
 * Background: messy-desk-spreadsheets.jpg — pan-left Ken Burns
 * Split frosted glass panels. Stats build up. "Two codes. Both locked. Until now."
 */
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {SceneBackground} from '../components/SceneBackground';
import {FrostedCard, headlineShadow} from '../components/FrostedCard';

const NAVY = '#1E3A5F';
const ORANGE = '#F59E0B';

function fadeIn(frame: number, start: number, duration = 30): number {
  return interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
}

function slideUp(frame: number, start: number, duration = 30): number {
  return interpolate(frame, [start, start + duration], [24, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
}

const DocumentIcon: React.FC<{color: string}> = ({color}) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="8" y="4" width="28" height="36" rx="3" fill={color} opacity={0.15} />
    <rect x="8" y="4" width="28" height="36" rx="3" stroke={color} strokeWidth="2" />
    <line x1="14" y1="14" x2="30" y2="14" stroke={color} strokeWidth="2" />
    <line x1="14" y1="20" x2="30" y2="20" stroke={color} strokeWidth="2" />
    <line x1="14" y1="26" x2="24" y2="26" stroke={color} strokeWidth="2" />
    <rect x="30" y="28" width="12" height="14" rx="2" fill={ORANGE} opacity={0.9} />
    <path d="M34 33 L36 35 L40 31" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

const LockIcon: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="6" y="14" width="20" height="14" rx="3" fill="#94A3B8" />
    <path d="M10 14V10C10 6.686 12.686 4 16 4C19.314 4 22 6.686 22 10V14" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <circle cx="16" cy="21" r="2" fill="white" />
  </svg>
);

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();

  const leftPanelOp = fadeIn(frame, 20);
  const rightPanelOp = fadeIn(frame, 50);
  const stat1Op = fadeIn(frame, 90);
  const stat1Y = slideUp(frame, 90);
  const stat2Op = fadeIn(frame, 140);
  const stat2Y = slideUp(frame, 140);
  const stat3Op = fadeIn(frame, 190);
  const stat3Y = slideUp(frame, 190);
  const dividerScale = interpolate(frame, [80, 130], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});
  const punchlineOp = fadeIn(frame, 420, 40);
  const punchlineY = slideUp(frame, 420, 40);

  return (
    <AbsoluteFill
      style={{
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
        padding: '0 60px',
      }}
    >
      {/* Cinematic background */}
      <SceneBackground
        imageName="messy-desk-spreadsheets"
        durationInFrames={750}
        kenBurns="pan-left"
        overlayOpacity={0.6}
      />

      {/* Top label */}
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: 4,
          color: 'rgba(255,255,255,0.7)',
          textTransform: 'uppercase',
          marginBottom: 32,
          opacity: fadeIn(frame, 10),
          position: 'relative',
          zIndex: 1,
          textShadow: '0 1px 6px rgba(0,0,0,0.6)',
        }}
      >
        The Problem
      </div>

      {/* Two-column split */}
      <div style={{display: 'flex', gap: 40, alignItems: 'stretch', width: '100%', maxWidth: 1400, position: 'relative', zIndex: 1}}>

        {/* LEFT — Courthouse records */}
        <FrostedCard
          style={{
            flex: 1,
            padding: '40px 40px',
            opacity: leftPanelOp,
            transform: `translateX(${interpolate(frame, [20, 50], [-30, 0], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'})}px)`,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <DocumentIcon color={NAVY} />
            <div>
              <div style={{fontSize: 20, fontWeight: 800, color: NAVY, ...headlineShadow}}>Courthouse Records</div>
              <div style={{fontSize: 13, color: '#64748B', marginTop: 2}}>Auction & Distressed Assets</div>
            </div>
          </div>

          {[
            {label: 'Case #2024-TAX-00441', status: 'BURIED'},
            {label: 'Lis Pendens — 3 of 847', status: 'HIDDEN'},
            {label: 'Delinquent Tax Roll Q3', status: 'LOCKED'},
            {label: 'Sheriff Sale Schedule', status: 'FRAGMENTED'},
          ].map((row, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '9px 12px',
                background: '#F8FAFC',
                borderRadius: 8,
                opacity: interpolate(frame, [30 + i * 15, 60 + i * 15], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'}),
              }}
            >
              <span style={{fontSize: 12, color: '#334155', fontWeight: 500}}>{row.label}</span>
              <span style={{fontSize: 10, fontWeight: 700, color: '#94A3B8', letterSpacing: 1.5, background: '#E2E8F0', padding: '3px 8px', borderRadius: 4}}>
                {row.status}
              </span>
            </div>
          ))}

          <div style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: 4}}>
            <LockIcon />
            <span style={{fontSize: 14, fontWeight: 700, color: '#94A3B8'}}>3,100+ county portals. No standard.</span>
          </div>
        </FrostedCard>

        {/* Divider */}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, position: 'relative', zIndex: 1}}>
          <div style={{width: 2, height: 260, background: 'rgba(255,255,255,0.4)', transformOrigin: 'top center', transform: `scaleY(${dividerScale})`}} />
          <div style={{fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: 2, opacity: dividerScale}}>+</div>
        </div>

        {/* RIGHT — Zoning website */}
        <FrostedCard
          style={{
            flex: 1,
            padding: '40px 40px',
            opacity: rightPanelOp,
            transform: `translateX(${interpolate(frame, [50, 80], [30, 0], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'})}px)`,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="4" y="8" width="40" height="32" rx="4" fill={NAVY} opacity={0.1} />
              <rect x="4" y="8" width="40" height="32" rx="4" stroke={NAVY} strokeWidth="2" />
              <rect x="4" y="8" width="40" height="8" rx="4" fill={NAVY} opacity={0.15} />
              <circle cx="10" cy="12" r="2" fill={NAVY} opacity={0.4} />
              <circle cx="16" cy="12" r="2" fill={NAVY} opacity={0.4} />
              <circle cx="22" cy="12" r="2" fill={NAVY} opacity={0.4} />
              <rect x="10" y="22" width="16" height="2" rx="1" fill="#94A3B8" />
              <rect x="10" y="27" width="12" height="2" rx="1" fill="#94A3B8" />
              <rect x="10" y="32" width="14" height="2" rx="1" fill="#94A3B8" />
            </svg>
            <div>
              <div style={{fontSize: 20, fontWeight: 800, color: NAVY, ...headlineShadow}}>Zoning Ordinances</div>
              <div style={{fontSize: 13, color: '#64748B', marginTop: 2}}>Municipal Code Databases</div>
            </div>
          </div>

          {[
            {label: 'R-1 Single Family — page 847 of 2,400', badge: 'PDF'},
            {label: 'Overlay District Z-44 Amendment', badge: 'DOC'},
            {label: 'Variance Exception Table 9-C', badge: 'HTM'},
            {label: 'Commercial Mixed-Use Code 2023', badge: 'ZIP'},
          ].map((row, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '9px 12px',
                background: '#F8FAFC',
                borderRadius: 8,
                opacity: interpolate(frame, [60 + i * 15, 90 + i * 15], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'}),
              }}
            >
              <span style={{fontSize: 12, color: '#334155', fontWeight: 500}}>{row.label}</span>
              <span style={{fontSize: 10, fontWeight: 700, color: ORANGE, background: '#FEF3C7', padding: '3px 8px', borderRadius: 4}}>
                {row.badge}
              </span>
            </div>
          ))}

          <div style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: 4}}>
            <LockIcon />
            <span style={{fontSize: 14, fontWeight: 700, color: '#94A3B8'}}>No API. No standard. Just PDFs.</span>
          </div>
        </FrostedCard>
      </div>

      {/* Stats row */}
      <div style={{display: 'flex', gap: 48, marginTop: 40, alignItems: 'center', position: 'relative', zIndex: 1}}>
        {[
          {value: '3,100+', label: 'counties in America', op: stat1Op, y: stat1Y},
          {value: 'Auction records', label: 'buried in PDFs', op: stat2Op, y: stat2Y},
          {value: 'Zoning ordinances', label: 'hidden in siloed portals', op: stat3Op, y: stat3Y},
        ].map((stat, i) => (
          <FrostedCard
            key={i}
            style={{
              textAlign: 'center',
              opacity: stat.op,
              transform: `translateY(${stat.y}px)`,
              padding: '16px 28px',
            }}
          >
            <div style={{fontSize: 30, fontWeight: 800, color: NAVY, ...headlineShadow}}>{stat.value}</div>
            <div style={{fontSize: 13, color: '#64748B', marginTop: 4}}>{stat.label}</div>
          </FrostedCard>
        ))}
      </div>

      {/* Punchline */}
      <FrostedCard
        style={{
          marginTop: 36,
          padding: '20px 48px',
          position: 'relative',
          zIndex: 1,
          opacity: punchlineOp,
          transform: `translateY(${punchlineY}px)`,
        }}
      >
        <div style={{fontSize: 46, fontWeight: 800, color: NAVY, textAlign: 'center', ...headlineShadow}}>
          Two codes.{' '}
          <span style={{color: '#94A3B8'}}>Both locked.</span>
          {'  '}
          <span style={{color: ORANGE}}>Until now.</span>
        </div>
      </FrostedCard>
    </AbsoluteFill>
  );
};
