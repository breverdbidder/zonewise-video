/**
 * Scene 5 — FOR EVERYONE (3300–4199 frames = 30s)
 * 4 persona cards cycle (≈7.5s each). Multi-language text.
 * "17 channels. Phone. Email. Telegram."
 */
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

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
  },
];

const PERSONA_FRAMES = 225; // ~7.5s per persona

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const activePersona = Math.min(Math.floor(frame / PERSONA_FRAMES), PERSONAS.length - 1);
  const personaFrame = frame % PERSONA_FRAMES;

  const cardSpring = spring({
    frame: Math.max(0, personaFrame - 10),
    fps,
    config: {stiffness: 100, damping: 18},
  });
  const cardX = interpolate(cardSpring, [0, 1], [60, 0]);
  const cardOp = interpolate(cardSpring, [0, 0.3], [0, 1], {extrapolateRight: 'clamp'});

  const persona = PERSONAS[activePersona];

  // Channel badges fade in from frame 600
  const channelsOp = interpolate(frame, [600, 650], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});
  const taglineOp = interpolate(frame, [650, 710], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});

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
      {/* Header */}
      <div
        style={{
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: 4,
          color: '#94A3B8',
          textTransform: 'uppercase',
          marginBottom: 16,
          opacity: interpolate(frame, [0, 30], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'}),
        }}
      >
        Built For Everyone
      </div>
      <div
        style={{
          fontSize: 56,
          fontWeight: 800,
          color: NAVY,
          marginBottom: 48,
          letterSpacing: '-0.5px',
          opacity: interpolate(frame, [10, 40], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'}),
        }}
      >
        In your fingertips.{' '}
        <span style={{color: ORANGE}}>In your language.</span>
      </div>

      {/* Persona indicator dots */}
      <div style={{display: 'flex', gap: 10, marginBottom: 40}}>
        {PERSONAS.map((p, i) => (
          <div
            key={i}
            style={{
              width: i === activePersona ? 28 : 10,
              height: 10,
              borderRadius: 5,
              background: i === activePersona ? ORANGE : '#E2E8F0',
              transition: 'all 0.3s ease',
              opacity: interpolate(frame, [0, 30], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'}),
            }}
          />
        ))}
      </div>

      {/* Persona card */}
      <div
        style={{
          display: 'flex',
          gap: 48,
          alignItems: 'center',
          opacity: cardOp,
          transform: `translateX(${cardX}px)`,
          maxWidth: 1200,
          width: '100%',
        }}
      >
        {/* Left: persona info */}
        <div
          style={{
            flex: 1,
            background: persona.color,
            borderRadius: 24,
            padding: '48px',
            border: `2px solid ${persona.accent}20`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28}}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: NAVY,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
              }}
            >
              {persona.icon}
            </div>
            <div>
              <div style={{fontSize: 26, fontWeight: 800, color: NAVY}}>{persona.name}</div>
              <div style={{fontSize: 16, color: persona.accent, fontWeight: 600}}>{persona.role}</div>
              <div style={{fontSize: 14, color: '#64748B', marginTop: 2}}>{persona.location}</div>
            </div>
            <div
              style={{
                marginLeft: 'auto',
                background: persona.accent,
                color: 'white',
                padding: '4px 12px',
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 1.5,
              }}
            >
              {persona.langTag}
            </div>
          </div>

          <div
            style={{
              fontSize: 22,
              lineHeight: 1.6,
              color: '#334155',
              fontStyle: 'italic',
              whiteSpace: 'pre-line',
              direction: persona.langTag === 'AR' || persona.langTag === 'HE' ? 'rtl' : 'ltr',
            }}
          >
            "{persona.quote}"
          </div>

          <div
            style={{
              marginTop: 24,
              fontSize: 13,
              color: '#94A3B8',
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            Language: {persona.language}
          </div>
        </div>

        {/* Right: mockup phone/dashboard */}
        <div
          style={{
            width: 320,
            height: 400,
            background: NAVY,
            borderRadius: 28,
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            boxShadow: '0 24px 64px rgba(30,58,95,0.25)',
            flexShrink: 0,
          }}
        >
          {/* Phone top bar */}
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4}}>
            <div style={{fontSize: 12, color: '#94A3B8'}}>ZoneWise.AI</div>
            <div
              style={{
                background: `${ORANGE}20`,
                color: ORANGE,
                fontSize: 10,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 10,
                letterSpacing: 1,
              }}
            >
              LIVE
            </div>
          </div>

          {/* Property card mockup */}
          <div style={{background: '#FFFFFF10', borderRadius: 12, padding: '14px'}}>
            <div style={{fontSize: 11, color: '#94A3B8', marginBottom: 4}}>MATCH FOUND</div>
            <div style={{fontSize: 14, fontWeight: 700, color: '#FFFFFF'}}>4412 Sunset Dr</div>
            <div style={{fontSize: 12, color: '#94A3B8'}}>Hillsborough Co., FL</div>
            <div style={{display: 'flex', gap: 8, marginTop: 8}}>
              <div style={{background: `${ORANGE}30`, color: ORANGE, padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700}}>
                SCORE: 94
              </div>
              <div style={{background: '#22C55E20', color: '#22C55E', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700}}>
                GO
              </div>
            </div>
          </div>

          {/* Chat message */}
          <div style={{background: '#FFFFFF10', borderRadius: 12, padding: '12px'}}>
            <div style={{fontSize: 11, color: '#94A3B8', marginBottom: 6}}>AI ASSISTANT</div>
            <div
              style={{
                fontSize: 13,
                color: '#E2E8F0',
                lineHeight: 1.5,
                direction: persona.langTag === 'AR' || persona.langTag === 'HE' ? 'rtl' : 'ltr',
              }}
            >
              {persona.langTag === 'AR' && 'وجدنا 3 عقارات مطابقة في منطقتك.'}
              {persona.langTag === 'ES' && 'Encontramos 3 propiedades en tu área.'}
              {persona.langTag === 'HE' && 'מצאנו 3 נכסים מתאימים באזורך.'}
              {persona.langTag === 'EN' && '3 matching properties found in your area.'}
            </div>
          </div>

          {/* Bottom channels */}
          <div style={{marginTop: 'auto', display: 'flex', gap: 6, flexWrap: 'wrap'}}>
            {['📱 Phone', '✉️ Email', '✈️ Telegram', '💬 SMS', '🌐 Web'].map(ch => (
              <div
                key={ch}
                style={{
                  background: '#FFFFFF10',
                  color: '#CBD5E1',
                  padding: '3px 8px',
                  borderRadius: 8,
                  fontSize: 10,
                }}
              >
                {ch}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Channel count + tagline */}
      <div
        style={{
          marginTop: 40,
          textAlign: 'center',
          opacity: channelsOp,
        }}
      >
        <div style={{fontSize: 24, fontWeight: 700, color: NAVY}}>
          17 channels.{' '}
          <span style={{color: '#64748B'}}>Phone. Email. Telegram. SMS. Web. And more.</span>
        </div>
      </div>
      <div
        style={{
          marginTop: 12,
          fontSize: 32,
          fontWeight: 800,
          color: ORANGE,
          opacity: taglineOp,
        }}
      >
        With your voice. In your language.
      </div>
    </AbsoluteFill>
  );
};
