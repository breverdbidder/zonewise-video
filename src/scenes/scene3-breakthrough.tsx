/**
 * Scene 3 — THE BREAKTHROUGH (0:50–1:05, 15 s)
 * White bg. ZoneWise.AI logo springs in. Divider extends. Question reveals.
 */
import {makeScene2D, Rect, Txt, Layout} from '@revideo/2d';
import {all, createRef, waitFor, tween, spring, easeOutCubic} from '@revideo/core';

const NAVY = '#1E3A5F';
const ORANGE = '#F59E0B';
const BODY = '#334155';

export default makeScene2D(function* (view) {
  view.add(<Rect width={'100%'} height={'100%'} fill={'#FFFFFF'} />);

  // Logo
  const logo = createRef<Layout>();
  view.add(
    <Layout
      ref={logo}
      direction={'row'}
      alignItems={'baseline'}
      y={-110}
      scale={0.6}
      opacity={0}
    >
      <Txt text={'Zone'} fontSize={112} fill={NAVY} fontFamily={'Inter'} fontWeight={900} letterSpacing={-3} />
      <Txt text={'Wise'} fontSize={112} fill={NAVY} fontFamily={'Inter'} fontWeight={300} letterSpacing={-3} />
      <Txt text={'.AI'} fontSize={76} fill={ORANGE} fontFamily={'Inter'} fontWeight={700} paddingBottom={14} paddingLeft={6} />
    </Layout>,
  );

  // Patent pill
  const patent = createRef<Layout>();
  view.add(
    <Layout ref={patent} direction={'row'} alignItems={'center'} gap={10} y={80} opacity={0}>
      <Rect width={10} height={10} fill={ORANGE} radius={5} />
      <Txt text={'PATENT PENDING — 12 CLAIMS'} fontSize={15} fill={ORANGE} fontFamily={'Inter'} fontWeight={700} letterSpacing={3} />
      <Rect width={10} height={10} fill={ORANGE} radius={5} />
    </Layout>,
  );

  // Divider
  const divider = createRef<Rect>();
  view.add(<Rect ref={divider} width={0} height={3} fill={ORANGE} y={130} />);

  // Question
  const question = createRef<Txt>();
  view.add(
    <Txt
      ref={question}
      text={'What if AI did the\nresearch for you?'}
      fontSize={54}
      fill={BODY}
      fontFamily={'Inter, sans-serif'}
      fontWeight={300}
      textAlign={'center'}
      lineHeight={74}
      y={320}
      opacity={0}
    />,
  );

  // — Animate —
  yield* all(
    logo().opacity(1, 0.3),
    spring({stiffness: 160, damping: 18, mass: 1}, 0.6, 1, v => logo().scale(v)),
  );
  yield* patent().opacity(1, 0.4);
  yield* waitFor(0.2);
  yield* tween(0.6, v => divider().width(640 * easeOutCubic(v)));
  yield* waitFor(0.1);
  yield* question().opacity(1, 0.7);
  yield* waitFor(4.5);
});
