/**
 * Scene 7 — CTA (2:45–3:00, 15 s)
 * Clean white. Headline → buttons → tagline → logo → fade to white.
 */
import {makeScene2D, Rect, Txt, Layout} from '@revideo/2d';
import {all, createRef, waitFor, spring} from '@revideo/core';

const NAVY = '#1E3A5F';
const ORANGE = '#F59E0B';

export default makeScene2D(function* (view) {
  const bg = createRef<Rect>();
  view.add(<Rect ref={bg} width={'100%'} height={'100%'} fill={'#FFFFFF'} />);

  // Headline
  const headline = createRef<Txt>();
  view.add(
    <Txt
      ref={headline}
      text={'Start Free.  67 Counties.  Real-Time Data.'}
      fontSize={56}
      fill={NAVY}
      fontFamily={'Inter, sans-serif'}
      fontWeight={800}
      letterSpacing={-1}
      y={-240}
      opacity={0}
    />,
  );

  // Buttons
  const btnRow = createRef<Layout>();
  view.add(
    <Layout ref={btnRow} direction={'row'} gap={28} y={-100} opacity={0}>
      <Rect width={272} height={68} fill={'#FFFFFF'} stroke={NAVY} lineWidth={3} radius={34}>
        <Txt text={'Explore Free'} fontSize={21} fill={NAVY} fontFamily={'Inter'} fontWeight={700} />
      </Rect>
      <Rect
        width={308}
        height={68}
        fill={ORANGE}
        radius={34}
        shadowColor={'rgba(245,158,11,0.45)'}
        shadowBlur={22}
        shadowOffsetY={7}
      >
        <Txt text={'Start Pro — $99/mo'} fontSize={21} fill={'#FFFFFF'} fontFamily={'Inter'} fontWeight={800} />
      </Rect>
    </Layout>,
  );

  // Tagline
  const tagline = createRef<Txt>();
  view.add(
    <Txt
      ref={tagline}
      text={'Patent Pending.  Built in Florida.  For Florida investors.'}
      fontSize={19}
      fill={'#94A3B8'}
      fontFamily={'Inter'}
      fontWeight={400}
      y={50}
      opacity={0}
    />,
  );

  // Logo
  const logo = createRef<Layout>();
  view.add(
    <Layout ref={logo} direction={'row'} alignItems={'baseline'} y={180} scale={0.88} opacity={0}>
      <Txt text={'Zone'} fontSize={70} fill={NAVY} fontFamily={'Inter'} fontWeight={900} letterSpacing={-2} />
      <Txt text={'Wise'} fontSize={70} fill={NAVY} fontFamily={'Inter'} fontWeight={300} letterSpacing={-2} />
      <Txt text={'.AI'} fontSize={48} fill={ORANGE} fontFamily={'Inter'} fontWeight={700} paddingBottom={8} paddingLeft={4} />
    </Layout>,
  );

  // Fade overlay
  const fadeOut = createRef<Rect>();
  view.add(<Rect ref={fadeOut} width={'100%'} height={'100%'} fill={'#FFFFFF'} opacity={0} zIndex={10} />);

  // — Animate —
  yield* headline().opacity(1, 0.5);
  yield* btnRow().opacity(1, 0.45);
  yield* tagline().opacity(1, 0.45);

  yield* all(
    logo().opacity(1, 0.4),
    spring({stiffness: 160, damping: 18, mass: 1}, 0.88, 1, v => logo().scale(v)),
  );

  yield* waitFor(3.2);
  yield* fadeOut().opacity(1, 1.0);
  yield* waitFor(0.5);
});
