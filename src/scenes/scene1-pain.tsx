/**
 * Scene 1 — THE PAIN (0:00–0:25, 25 s)
 * White bg. House SVG. $47k/$189k prices fade in.
 * $142,000 gap in Orange with scramble decode.
 * Tagline closes the scene.
 */
import {makeScene2D, Rect, Txt, Layout} from '@revideo/2d';
import {all, createRef, sequence, waitFor, tween, easeInOutCubic} from '@revideo/core';

const NAVY = '#1E3A5F';
const ORANGE = '#F59E0B';
const BODY = '#334155';

const CHARS = '!@#$%&?0123456789ABCDEFGHIJKLMNOP';
function scramble(target: string, progress: number): string {
  const settled = Math.floor(target.length * progress);
  let out = '';
  for (let i = 0; i < target.length; i++) {
    if (target[i] === ' ' || target[i] === ',') out += target[i];
    else if (i < settled) out += target[i];
    else out += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return out;
}

export default makeScene2D(function* (view) {
  view.add(<Rect width={'100%'} height={'100%'} fill={'#FFFFFF'} />);

  // House placeholder (left side)
  const house = createRef<Layout>();
  view.add(
    <Layout ref={house} direction={'column'} alignItems={'center'} x={-440} y={-30} opacity={0}>
      {/* Roof triangle via overlapping rects */}
      <Rect width={220} height={90} fill={'#CBD5E1'} radius={[4, 4, 0, 0]} />
      {/* Body */}
      <Rect width={200} height={150} fill={'#E2E8F0'} radius={[0, 0, 4, 4]}>
        {/* Door */}
        <Rect width={40} height={60} fill={'#94A3B8'} radius={[3, 3, 0, 0]} y={46} />
        {/* Left window */}
        <Rect width={38} height={32} fill={'#BFDBFE'} radius={3} x={-58} y={-15} />
        {/* Right window */}
        <Rect width={38} height={32} fill={'#BFDBFE'} radius={3} x={58} y={-15} />
      </Rect>
      <Txt
        text={'FOR AUCTION'}
        fontSize={14}
        fill={'#FFFFFF'}
        fontFamily={'Inter, sans-serif'}
        fontWeight={800}
        letterSpacing={2}
        paddingTop={10}
        paddingBottom={10}
        paddingLeft={16}
        paddingRight={16}
      />
    </Layout>,
  );

  // Auction sign badge
  view.add(
    <Rect width={160} height={36} fill={ORANGE} radius={4} x={-440} y={120} opacity={0} ref={createRef<Rect>()}>
      <Txt text={'FOR AUCTION'} fontSize={13} fill={'#FFFFFF'} fontFamily={'Inter'} fontWeight={800} letterSpacing={2} />
    </Rect>,
  );

  // Price block (right side)
  const label1 = createRef<Txt>();
  const price1 = createRef<Txt>();
  const label2 = createRef<Txt>();
  const price2 = createRef<Txt>();
  const gapWrap = createRef<Layout>();
  const gapValue = createRef<Txt>();
  const tagline = createRef<Txt>();

  view.add(
    <Layout direction={'column'} x={200} y={-160} gap={6} alignItems={'flex-start'}>
      <Txt ref={label1} text={'ASSESSED VALUE'} fontSize={16} fill={'#94A3B8'} fontFamily={'Inter'} fontWeight={700} letterSpacing={3} opacity={0} />
      <Txt ref={price1} text={'$47,000'} fontSize={88} fill={NAVY} fontFamily={'Inter'} fontWeight={800} opacity={0} />
      <Txt ref={label2} text={'ACTUAL MARKET VALUE'} fontSize={16} fill={'#94A3B8'} fontFamily={'Inter'} fontWeight={700} letterSpacing={3} opacity={0} paddingTop={12} />
      <Txt ref={price2} text={'$189,000'} fontSize={88} fill={NAVY} fontFamily={'Inter'} fontWeight={800} opacity={0} />
    </Layout>,
  );

  view.add(
    <Layout ref={gapWrap} direction={'column'} alignItems={'center'} x={200} y={340} gap={6} opacity={0}>
      <Rect width={520} height={2} fill={'#E2E8F0'} />
      <Txt text={'HIDDEN EQUITY GAP'} fontSize={15} fill={'#94A3B8'} fontFamily={'Inter'} fontWeight={700} letterSpacing={3} paddingTop={8} />
      <Txt ref={gapValue} text={'????????'} fontSize={68} fill={ORANGE} fontFamily={'Inter'} fontWeight={800} />
    </Layout>,
  );

  view.add(
    <Txt
      ref={tagline}
      text={"The investors who find these deals\ndon't work harder.  They see what others can't."}
      fontSize={24}
      fill={BODY}
      fontFamily={'Inter, sans-serif'}
      fontWeight={400}
      textAlign={'center'}
      lineHeight={38}
      y={470}
      opacity={0}
    />,
  );

  // — Animate —
  yield* house().opacity(1, 0.5);
  yield* waitFor(0.3);

  yield* all(label1().opacity(1, 0.3), price1().opacity(1, 0.5));
  yield* waitFor(0.5);
  yield* all(label2().opacity(1, 0.3), price2().opacity(1, 0.5));
  yield* waitFor(0.5);

  yield* gapWrap().opacity(1, 0.4);
  yield* tween(1.6, t => {
    gapValue().text(scramble('$142,000', easeInOutCubic(t)));
  });
  yield* waitFor(0.3);

  yield* tagline().opacity(1, 0.7);
  yield* waitFor(3.8);
});
