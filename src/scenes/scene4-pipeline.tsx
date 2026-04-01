/**
 * Scene 4 — 12-STEP PIPELINE (1:05–1:50, 45 s)
 * White bg. 12 cards, 2 columns, spring-slide from right.
 * PATENT PENDING stamp bounces in after all 12.
 */
import {makeScene2D, Rect, Txt, Layout} from '@revideo/2d';
import {all, createRef, waitFor, tween, spring, easeOutCubic} from '@revideo/core';

const NAVY = '#1E3A5F';
const ORANGE = '#F59E0B';
const BODY = '#334155';

const STEPS = [
  {n:  1, title: 'Discovery',         desc: 'AI scans 67 county auction calendars daily'},
  {n:  2, title: 'Data Extraction',   desc: 'Automated property & ownership data pull'},
  {n:  3, title: 'Title Search',      desc: 'Lien chain analysis in seconds, not days'},
  {n:  4, title: 'Lien Priority',     desc: 'Senior vs junior liens auto-ranked'},
  {n:  5, title: 'Tax Certs',         desc: 'Delinquent tax exposure flagged instantly'},
  {n:  6, title: 'Demographics',      desc: 'Neighborhood intelligence overlay'},
  {n:  7, title: 'ML Prediction',     desc: 'XGBoost predicts auction outcome & range'},
  {n:  8, title: 'Max Bid',           desc: 'Shapira Formula calculates your number'},
  {n:  9, title: 'Decision Log',      desc: 'Every AI recommendation fully audited'},
  {n: 10, title: 'Reports',           desc: 'One-page investor reports, auto-generated'},
  {n: 11, title: 'Price Monitor',     desc: 'Buy-zone alerts in real time'},
  {n: 12, title: 'Compounding Intel', desc: 'Gets smarter every week you use it'},
];

export default makeScene2D(function* (view) {
  view.add(<Rect width={'100%'} height={'100%'} fill={'#FFFFFF'} />);

  // Title
  const titleWrap = createRef<Layout>();
  view.add(
    <Layout ref={titleWrap} direction={'column'} alignItems={'center'} y={-460} gap={8} opacity={0}>
      <Txt
        text={'The 12-Step Intelligence Pipeline'}
        fontSize={50}
        fill={NAVY}
        fontFamily={'Inter, sans-serif'}
        fontWeight={800}
        letterSpacing={-1}
      />
      <Txt
        text={'Every deal analyzed end-to-end — automatically'}
        fontSize={21}
        fill={BODY}
        fontFamily={'Inter, sans-serif'}
        fontWeight={300}
      />
    </Layout>,
  );

  // Grid layout: left column = steps 1-6, right = 7-12
  const COL_X = [-560, 220];
  const ROW_Y_START = -320;
  const ROW_H = 124;

  const cardRefs = STEPS.map(() => createRef<Layout>());

  STEPS.forEach((step, i) => {
    const col = i < 6 ? 0 : 1;
    const row = i % 6;
    const baseX = COL_X[col];
    const y = ROW_Y_START + row * ROW_H;

    view.add(
      <Layout
        ref={cardRefs[i]}
        direction={'row'}
        alignItems={'center'}
        gap={14}
        x={baseX + 1500}  // off-screen right initially
        y={y}
        opacity={0}
      >
        {/* Step badge */}
        <Rect width={46} height={46} fill={ORANGE} radius={23} shrink={0}>
          <Txt text={String(step.n)} fontSize={17} fill={'#FFFFFF'} fontFamily={'Inter'} fontWeight={800} />
        </Rect>
        {/* Card */}
        <Rect
          width={590}
          height={96}
          fill={'#F8FAFC'}
          stroke={'#E2E8F0'}
          lineWidth={1.5}
          radius={10}
          paddingLeft={18}
          paddingRight={18}
          direction={'column'}
          alignItems={'flex-start'}
          justifyContent={'center'}
          gap={4}
        >
          <Txt text={step.title} fontSize={17} fill={NAVY} fontFamily={'Inter'} fontWeight={700} />
          <Txt text={step.desc} fontSize={12} fill={'#64748B'} fontFamily={'Inter'} fontWeight={400} />
        </Rect>
      </Layout>,
    );
  });

  // Patent stamp
  const stamp = createRef<Layout>();
  view.add(
    <Layout ref={stamp} direction={'column'} alignItems={'center'} scale={0} opacity={0} y={20}>
      <Rect
        width={370}
        height={96}
        stroke={ORANGE}
        lineWidth={5}
        radius={8}
        fill={'rgba(245,158,11,0.07)'}
        rotation={-5}
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        gap={4}
      >
        <Txt text={'PATENT PENDING ™'} fontSize={30} fill={ORANGE} fontFamily={'Inter'} fontWeight={900} letterSpacing={3} />
        <Txt text={'12 CLAIMS — FILED 2024'} fontSize={13} fill={ORANGE} fontFamily={'Inter'} fontWeight={600} letterSpacing={2} />
      </Rect>
    </Layout>,
  );

  // — Animate —
  yield* titleWrap().opacity(1, 0.5);
  yield* waitFor(0.2);

  for (let i = 0; i < STEPS.length; i++) {
    const col = i < 6 ? 0 : 1;
    const targetX = COL_X[col];
    const ref = cardRefs[i];
    ref().opacity(1, 0.2);
    yield* spring(
      {stiffness: 200, damping: 22, mass: 1},
      targetX + 1500,
      targetX,
      v => ref().x(v),
    );
    if (i < STEPS.length - 1) yield* waitFor(0.04);
  }

  yield* waitFor(0.3);

  yield* all(
    stamp().opacity(1, 0.25),
    spring({stiffness: 280, damping: 15, mass: 0.8}, 0, 1, v => stamp().scale(v)),
  );

  yield* waitFor(3.0);
});
