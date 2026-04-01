/**
 * Scene 6 — THE MOAT (2:25–2:45, 20 s)
 * White bg. Three pyramid layers expand left-to-right.
 * Exponential growth curve draws itself. Tagline appears.
 */
import {makeScene2D, Rect, Txt, Layout, Line} from '@revideo/2d';
import {all, createRef, sequence, waitFor, tween, easeOutCubic, easeInOutCubic} from '@revideo/core';
import {Vector2} from '@revideo/core';

const NAVY = '#1E3A5F';
const ORANGE = '#F59E0B';
const BODY = '#334155';

const LAYERS = [
  {label: 'DATA',             sub: 'Auction results, property records',  w: 840, fill: '#F1F5F9', border: '#CBD5E1', text: BODY},
  {label: 'INSIGHTS',         sub: 'Trends, patterns, anomalies',         w: 620, fill: '#DBEAFE', border: '#93C5FD', text: NAVY},
  {label: 'YOUR INTELLIGENCE',sub: 'Personalized to your strategy',       w: 400, fill: ORANGE,   border: '#D97706', text: '#FFFFFF'},
];

// Build exponential curve points (absolute world coords)
const CURVE: Vector2[] = [];
const CHART_X = 560;
const CHART_Y = -40;
for (let t = 0; t <= 52; t += 2) {
  const px = CHART_X - 240 + (t / 52) * 480;
  const py = CHART_Y + 150 - Math.pow(t / 52, 2.4) * 280;
  CURVE.push(new Vector2(px, py));
}

export default makeScene2D(function* (view) {
  view.add(<Rect width={'100%'} height={'100%'} fill={'#FFFFFF'} />);

  // Pyramid layers (left)
  const layerRefs = LAYERS.map(() => createRef<Rect>());
  LAYERS.forEach((layer, i) => {
    view.add(
      <Rect
        ref={layerRefs[i]}
        width={0}
        height={96}
        fill={layer.fill}
        stroke={layer.border}
        lineWidth={2}
        radius={8}
        x={-280}
        y={80 - i * 116}
        clip
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        gap={4}
      >
        <Txt text={layer.label} fontSize={20} fill={layer.text} fontFamily={'Inter'} fontWeight={800} letterSpacing={1.5} />
        <Txt text={layer.sub} fontSize={13} fill={layer.text} fontFamily={'Inter'} fontWeight={400} opacity={0.8} />
      </Rect>,
    );
  });

  // Chart background (right)
  const chartBg = createRef<Rect>();
  view.add(
    <Rect ref={chartBg} width={560} height={360} fill={'#F8FAFC'} stroke={'#E2E8F0'} lineWidth={1.5} radius={12} x={CHART_X} y={CHART_Y} opacity={0}>
      <Txt text={'Time →'} fontSize={12} fill={'#94A3B8'} fontFamily={'Inter'} x={200} y={155} />
      <Txt text={'Week 1'} fontSize={11} fill={'#94A3B8'} fontFamily={'Inter'} x={-220} y={155} />
      <Txt text={'Week 52'} fontSize={11} fill={'#94A3B8'} fontFamily={'Inter'} x={200} y={155} />
    </Rect>,
  );

  // Exponential curve
  const curve = createRef<Line>();
  view.add(
    <Line ref={curve} points={CURVE} stroke={ORANGE} lineWidth={4} radius={20} end={0} />,
  );

  // Switching label
  const switchLabel = createRef<Txt>();
  view.add(
    <Txt
      ref={switchLabel}
      text={'Switching means starting from zero'}
      fontSize={17}
      fill={ORANGE}
      fontFamily={'Inter'}
      fontWeight={700}
      x={CHART_X}
      y={220}
      opacity={0}
    />,
  );

  // Tagline
  const tagline = createRef<Txt>();
  view.add(
    <Txt
      ref={tagline}
      text={'The longer you use ZoneWise,\nthe smarter it gets.'}
      fontSize={36}
      fill={NAVY}
      fontFamily={'Inter'}
      fontWeight={700}
      textAlign={'center'}
      lineHeight={52}
      y={420}
      opacity={0}
    />,
  );

  // — Animate —
  // Layers expand
  yield* sequence(0.25,
    tween(0.6, v => layerRefs[0]().width(LAYERS[0].w * easeOutCubic(v))),
    tween(0.6, v => layerRefs[1]().width(LAYERS[1].w * easeOutCubic(v))),
    tween(0.6, v => layerRefs[2]().width(LAYERS[2].w * easeOutCubic(v))),
  );

  yield* waitFor(0.2);
  yield* chartBg().opacity(1, 0.4);
  yield* tween(2.0, v => curve().end(easeInOutCubic(v)));

  yield* waitFor(0.1);
  yield* switchLabel().opacity(1, 0.4);
  yield* waitFor(0.2);
  yield* tagline().opacity(1, 0.6);
  yield* waitFor(4.0);
});
