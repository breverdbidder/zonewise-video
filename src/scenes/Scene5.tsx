/**
 * Scene 5 — FOR EVERYONE (3300–4199 frames = 30s)
 * Background: cycles per persona — contractor / investor / intl-buyer
 * Frosted glass persona cards. Multi-language. 17 channels tagline.
 */
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {SceneBackground} from '../components/SceneBackground';
import {FrostedCard, headlineShadow} from '../components/FrostedCard';

const NAVY = '#1E3A5F';
const ORANGE = '#F59E0B';

const PERSONAS = [
  {
    icon: '🔨',
    role: 'Contractor',
    name: 'Mike T.',
    location: 'Tampa, FL',
    quote: 'I bid on 4 auctions this month.\nZoneWise flagged 2 with hidden liens.\nSaved me $80k.',
    language: 'English',
    langTag: 'EN',
    color: '#EFF6FF',
    accent: '#3B82F6',
    bg: 'contractor-phone-jobsite',
  },
  {
    icon: '💼',
    role: 'Investor',
    name: 'Sarah K.',
    location: 'Miami, FL',
    quote: 'خمسة صفقات. خمس مزادات ناجحة.\nZoneWise كشفت ما لم يره أحد.',
    language: 'Arabic',
    langTag: 'AR',
    color: '#FFF7ED',
    accent: ORANGE,
    bg: 'investor-car-tablet',
  },
  {
    icon: '🏠',
    role: 'Broker',
    name: 'Carlos M.',
    location: 'Orlando, FL',
    quote: 'Cinco propiedades encontradas esta semana.\nTodos los datos al instante.\nZoneWise en mi bolsillo.',
    language: 'Spanish',
    langTag: 'ES',
    color: '#F0FDF4',
    accent: '#22C55E',
    bg: 'international-buyer-office',
  },
  {
    icon: '🌍',
    role: 'International Buyer',
    name: 'Yael B.',
    location: 'Tel Aviv → Jacksonville',
    quote: 'נכס ראשון בארה"ב — ממרחק.\nZoneWise ניתחה את כל הנתונים בעברית.',
    language: 'Hebrew',
    langTag: 'HE',
    color: '#F5F3FF',
    accent: '#8B5CF6',
    bg: 'international-buyer-office',
  },
];

const PERSONA_FRAMES = 225;

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const activePersona = Math.min(Math.floor(frame / PERSONA_FRAMES), PERSONAS.length - 1);
  const personaFrame = frame % PERSONA_FRAMES;

  const cardSpring = spring({frame: Math.max(0, personaFrame - 10), fps, config: {stiffness: 100, damping: 18}});
  const cardX = interpolate(cardSpring, [0, 1], [60, 0]);
  const cardOp = interpolate(cardSpring, [0, 0.3], [0, 1], {extrapolateRight: 'clamp'});

  const persona = PERSONAS[activePersona];

  const channelsOp = interpolate(frame, [600, 650], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});
  const taglineOp = interpolate(frame, [650, 710], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});

  const headerOp = interpolate(frame, [0, 30], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});

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
      {/* Persona-specific background — re-renders as persona changes */}
      <SceneBackground
        imageName={persona.bg}
        durationInFrames={PERSONA_FRAMES}
        kenBurns="zoom-in"
        overlayOpacity={0.58}
        key={activePersona}
      />

      {/* Header */}
      <div style={{position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: 12, opacity: headerOp}}>
        <div style={{fontSize: 13, fontWeight: 700, letterSpacing: 4, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: 8}}>
          Built For Everyone
        </div>
      </div>
      <FrostedCard
        style={{
          textAlign: 'center',
          marginBottom: 28,
          padding: '16px 48px',
          position: 'relative',
          zIndex: 1,
          opacity: headerOp,
        }}
      >
        <div style={{fontSize: 46, fontWeight: 800, color: NAVY, letterSpacing: '-0.5px', ...headlineShadow}}>
          In your fingertips.{' '}
          <span style={{color: ORANGE}}>In your language.</span>
        </div>
      </FrostedCard>

      {/* Persona indicator dots */}
      <div style={{display: 'flex', gap: 10, marginBottom: 24, position: 'relative', zIndex: 1, opacity: headerOp}}>
        {PERSONAS.map((p, i) => (
          <div
            key={i}
            style={{
              width: i === activePersona ? 28 : 10,
              height: 10,
              borderRadius: 5,
              background: i === activePersona ? ORANGE : 'rgba(255,255,255,0.35)',
            }}
          />
        ))}
      </div>

      {/* Persona card */}
      <div
        style={{
          display: 'flex',
          gap: 40,
          alignItems: 'center',
          opacity: cardOp,
          transform: `translateX(${cardX}px)`,
          maxWidth: 1200,
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left: persona info */}
        <FrostedCard
          style={{
            flex: 1,
            padding: '40px',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 18, marginBottom: 24}}>
            <div style={{width: 64, height: 64, borderRadius: '50%', background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0}}>
              {persona.icon}
            </div>
            <div>
              <div style={{fontSize: 24, fontWeight: 800, color: NAVY, ...headlineShadow}}>{persona.name}</div>
              <div style={{fontSize: 14, color: persona.accent, fontWeight: 600}}>{persona.role}</div>
              <div style={{fontSize: 12, color: '#64748B', marginTop: 2}}>{persona.location}</div>
            </div>
            <div style={{marginLeft: 'auto', background: persona.accent, color: 'white', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, letterSpacing: 1.5}}>
              {persona.langTag}
            </div>
          </div>

          <div style={{fontSize: 20, lineHeight: 1.6, color: '#334155', fontStyle: 'italic', whiteSpace: 'pre-line', direction: persona.langTag === 'AR' || persona.langTag === 'HE' ? 'rtl' : 'ltr'}}>
            "{persona.quote}"
          </div>

          <div style={{marginTop: 20, fontSize: 12, color: '#94A3B8', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase'}}>
            Language: {persona.language}
          </div>
        </FrostedCard>

        {/* Right: mockup phone */}
        <FrostedCard
          dark
          style={{
            width: 300,
            flexShrink: 0,
            padding: '20px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
          }}
        >
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4}}>
            <div style={{fontSize: 11, color: '#94A3B8'}}>ZoneWise.AI</div>
            <div style={{background: `${ORANGE}20`, color: ORANGE, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10, letterSpacing: 1}}>LIVE</div>
          </div>

          <div style={{background: '#FFFFFF10', borderRadius: 10, padding: '12px'}}>
            <div style={{fontSize: 10, color: '#94A3B8', marginBottom: 4}}>MATCH FOUND</div>
            <div style={{fontSize: 13, fontWeight: 700, color: '#FFFFFF'}}>4412 Sunset Dr</div>
            <div style={{fontSize: 11, color: '#94A3B8'}}>Hillsborough Co., FL</div>
            <div style={{display: 'flex', gap: 8, marginTop: 8}}>
              <div style={{background: `${ORANGE}30`, color: ORANGE, padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700}}>SCORE: 94</div>
              <div style={{background: '#22C55E20', color: '#22C55E', padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700}}>GO</div>
            </div>
          </div>

          <div style={{background: '#FFFFFF10', borderRadius: 10, padding: '10px'}}>
            <div style={{fontSize: 10, color: '#94A3B8', marginBottom: 6}}>AI ASSISTANT</div>
            <div style={{fontSize: 12, color: '#E2E8F0', lineHeight: 1.5, direction: persona.langTag === 'AR' || persona.langTag === 'HE' ? 'rtl' : 'ltr'}}>
              {persona.langTag === 'AR' && 'وجدنا 3 عقارات مطابقة في منطقتك.'}
              {persona.langTag === 'ES' && 'Encontramos 3 propiedades en tu área.'}
              {persona.langTag === 'HE' && 'מצאנו 3 נכסים מתאימים באזורך.'}
              {persona.langTag === 'EN' && '3 matching properties found in your area.'}
            </div>
          </div>

          <div style={{marginTop: 'auto', display: 'flex', gap: 6, flexWrap: 'wrap'}}>
            {['📱 Phone', '✉️ Email', '✈️ Telegram', '💬 SMS', '🌐 Web'].map(ch => (
              <div key={ch} style={{background: '#FFFFFF10', color: '#CBD5E1', padding: '3px 8px', borderRadius: 8, fontSize: 9}}>{ch}</div>
            ))}
          </div>
        </FrostedCard>
      </div>

      {/* Channel count + tagline */}
      <FrostedCard
        style={{
          marginTop: 24,
          padding: '16px 40px',
          textAlign: 'center',
          opacity: channelsOp,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{fontSize: 20, fontWeight: 700, color: NAVY}}>
          17 channels.{' '}
          <span style={{color: '#64748B'}}>Phone. Email. Telegram. SMS. Web. And more.</span>
        </div>
        <div style={{marginTop: 8, fontSize: 26, fontWeight: 800, color: ORANGE, opacity: taglineOp}}>
          With your voice. In your language.
        </div>
      </FrostedCard>
    </AbsoluteFill>
  );
};
