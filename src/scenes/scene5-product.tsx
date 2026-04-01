/**
 * Scene 5 — THE PRODUCT (1:50–2:25, 35 s)
 * Browser frame. Florida county map (left). Chat + KPIs (right). Alert notification.
 */
import {makeScene2D, Rect, Txt, Layout} from '@revideo/2d';
import {all, createRef, sequence, waitFor, spring} from '@revideo/core';

const NAVY = '#1E3A5F';
const ORANGE = '#F59E0B';
const BODY = '#334155';

const COUNTIES = [
  {name: 'Brevard',  x:  280, y:  70, w: 76, h: 66, hot: true},
  {name: 'Orange',   x:  160, y:  10, w: 84, h: 74, hot: true},
  {name: 'Hillsb.',  x:   30, y:  50, w: 88, h: 74, hot: true},
  {name: 'Duval',    x:  170, y: -90, w: 84, h: 66},
  {name: 'Pinellas', x:  -18, y:  94, w: 60, h: 52},
  {name: 'Osceola',  x:  170, y:  94, w: 76, h: 66},
  {name: 'Polk',     x:   76, y:  76, w: 76, h: 66},
  {name: 'Volusia',  x:  230, y: -36, w: 76, h: 66},
];

const KPIS = [
  {label: 'Active Auctions', value: '247', color: ORANGE},
  {label: 'Avg Win Bid',     value: '$184K', color: '#3B82F6'},
  {label: 'Counties',        value: '67',   color: '#10B981'},
  {label: 'Live Alerts',     value: '31',   color: '#EF4444'},
];

const MESSAGES = [
  {user: true,  text: 'Show me auction trends in Brevard County'},
  {user: false, text: '📊 Brevard: 31 active auctions · Avg ARV $204k · Your win rate 34%'},
  {user: true,  text: "What's my max bid on case 24-CA-1823?"},
  {user: false, text: '🎯 Max Bid: $87,400  ·  Shapira Formula  ·  Confidence 91%  →  BID'},
];

export default makeScene2D(function* (view) {
  view.add(<Rect width={'100%'} height={'100%'} fill={'#F1F5F9'} />);

  // Browser chrome
  const browser = createRef<Rect>();
  view.add(
    <Rect ref={browser} width={1760} height={980} fill={'#FFFFFF'} stroke={'#CBD5E1'} lineWidth={2} radius={14} y={10} opacity={0}>
      {/* Tab bar */}
      <Rect width={1760} height={42} fill={'#F8FAFC'} stroke={'#E2E8F0'} lineWidth={1} radius={[14,14,0,0]} y={-469}>
        <Layout direction={'row'} gap={8} x={-840} alignItems={'center'} paddingLeft={16}>
          <Rect width={12} height={12} fill={'#EF4444'} radius={6} />
          <Rect width={12} height={12} fill={'#F59E0B'} radius={6} />
          <Rect width={12} height={12} fill={'#10B981'} radius={6} />
        </Layout>
        <Rect width={420} height={24} fill={'#FFFFFF'} stroke={'#E2E8F0'} lineWidth={1} radius={12}>
          <Txt text={'zonewise.ai/dashboard'} fontSize={12} fill={'#94A3B8'} fontFamily={'Inter, monospace'} />
        </Rect>
      </Rect>
      {/* Nav */}
      <Rect width={1760} height={48} fill={NAVY} y={-427}>
        <Layout direction={'row'} alignItems={'center'} gap={36}>
          <Layout direction={'row'} alignItems={'baseline'}>
            <Txt text={'Zone'} fontSize={20} fill={'#FFF'} fontFamily={'Inter'} fontWeight={800} />
            <Txt text={'Wise'} fontSize={20} fill={'#FFF'} fontFamily={'Inter'} fontWeight={300} />
            <Txt text={'.AI'} fontSize={15} fill={ORANGE} fontFamily={'Inter'} fontWeight={700} paddingBottom={4} />
          </Layout>
          {['Dashboard','Auctions','Analytics','Reports'].map((tab, i) => (
            <Txt
              text={tab}
              fontSize={13}
              fill={i === 0 ? ORANGE : 'rgba(255,255,255,0.65)'}
              fontFamily={'Inter'}
              fontWeight={i === 0 ? 700 : 400}
            />
          ))}
        </Layout>
      </Rect>
    </Rect>,
  );

  // Map panel (left)
  const mapPanel = createRef<Rect>();
  view.add(
    <Rect ref={mapPanel} width={820} height={800} fill={'#FFFFFF'} stroke={'#E2E8F0'} lineWidth={1} radius={10} x={-460} y={90} opacity={0}>
      <Txt text={'Florida Intelligence Map'} fontSize={17} fill={NAVY} fontFamily={'Inter'} fontWeight={700} y={-352} x={-190} />
      <Rect width={54} height={20} fill={'#DCFCE7'} radius={10} x={260} y={-352}>
        <Txt text={'● LIVE'} fontSize={10} fill={'#16A34A'} fontFamily={'Inter'} fontWeight={700} />
      </Rect>
    </Rect>,
  );

  // Counties (offset relative to map panel center)
  const countyRefs = COUNTIES.map(() => createRef<Rect>());
  COUNTIES.forEach((c, i) => {
    view.add(
      <Rect
        ref={countyRefs[i]}
        width={c.w}
        height={c.h}
        fill={c.hot ? ORANGE : '#DBEAFE'}
        stroke={'#FFFFFF'}
        lineWidth={2}
        radius={3}
        x={-460 + c.x}
        y={90 + c.y}
        opacity={0}
      >
        <Txt text={c.name} fontSize={9} fill={c.hot ? '#FFFFFF' : NAVY} fontFamily={'Inter'} fontWeight={700} />
      </Rect>,
    );
  });

  // KPI strip across bottom of map panel
  const kpiRefs = KPIS.map(() => createRef<Rect>());
  KPIS.forEach((kpi, i) => {
    view.add(
      <Rect
        ref={kpiRefs[i]}
        width={168}
        height={72}
        fill={'#F8FAFC'}
        stroke={'#E2E8F0'}
        lineWidth={1}
        radius={8}
        x={-800 + i * 185}
        y={430}
        opacity={0}
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        gap={3}
      >
        <Txt text={kpi.value} fontSize={28} fill={kpi.color} fontFamily={'Inter'} fontWeight={800} />
        <Txt text={kpi.label} fontSize={10} fill={'#94A3B8'} fontFamily={'Inter'} fontWeight={600} letterSpacing={0.3} />
      </Rect>,
    );
  });

  // Chat panel (right)
  const chatPanel = createRef<Rect>();
  view.add(
    <Rect ref={chatPanel} width={820} height={800} fill={'#FFFFFF'} stroke={'#E2E8F0'} lineWidth={1} radius={10} x={440} y={90} opacity={0}>
      <Txt text={'AI Assistant'} fontSize={17} fill={NAVY} fontFamily={'Inter'} fontWeight={700} y={-352} x={-280} />
      <Rect width={760} height={42} fill={'#F8FAFC'} stroke={'#E2E8F0'} lineWidth={1} radius={21} y={358}>
        <Txt text={'Ask about any property or county...'} fontSize={12} fill={'#94A3B8'} fontFamily={'Inter'} x={-150} />
        <Rect width={34} height={34} fill={ORANGE} radius={17} x={355}>
          <Txt text={'→'} fontSize={15} fill={'#FFF'} />
        </Rect>
      </Rect>
    </Rect>,
  );

  // Chat messages
  const msgRefs = MESSAGES.map(() => createRef<Rect>());
  MESSAGES.forEach((msg, i) => {
    view.add(
      <Rect
        ref={msgRefs[i]}
        width={660}
        height={msg.text.length > 55 ? 80 : 54}
        fill={msg.user ? '#EFF6FF' : '#F8FAFC'}
        stroke={msg.user ? '#BFDBFE' : '#E2E8F0'}
        lineWidth={1.5}
        radius={msg.user ? [16, 4, 16, 16] : [4, 16, 16, 16]}
        x={440 + (msg.user ? 40 : -40)}
        y={-230 + i * 140}
        opacity={0}
        paddingLeft={16}
        paddingRight={16}
      >
        <Txt
          text={msg.text}
          fontSize={12}
          fill={BODY}
          fontFamily={'Inter'}
          fontWeight={msg.user ? 500 : 400}
          lineHeight={18}
          width={620}
        />
      </Rect>,
    );
  });

  // Alert
  const alert = createRef<Rect>();
  view.add(
    <Rect ref={alert} width={460} height={52} fill={ORANGE} radius={26} x={440} y={370} opacity={0} scale={0.85}>
      <Txt text={'🔔  3 properties entered your buy zone'} fontSize={15} fill={'#FFF'} fontFamily={'Inter'} fontWeight={700} />
    </Rect>,
  );

  // — Animate —
  yield* browser().opacity(1, 0.4);
  yield* all(mapPanel().opacity(1, 0.3), chatPanel().opacity(1, 0.3));

  yield* sequence(0.07, ...countyRefs.map(r => r().opacity(1, 0.25)));
  yield* sequence(0.65, ...msgRefs.map(r => r().opacity(1, 0.3)));
  yield* sequence(0.1, ...kpiRefs.map(r => r().opacity(1, 0.25)));

  yield* waitFor(0.3);
  yield* all(
    alert().opacity(1, 0.3),
    spring({stiffness: 240, damping: 18, mass: 0.9}, 0.85, 1, v => alert().scale(v)),
  );
  yield* waitFor(3.5);
});
