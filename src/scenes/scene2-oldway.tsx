/**
 * Scene 2 — THE OLD WAY (0:25–0:50, 25 s)
 * Light gray bg. Spreadsheet mockup (left). Stats build line-by-line (right).
 * Punchline: "By the time you finish research, the auction is over."
 */
import {makeScene2D, Rect, Txt, Layout} from '@revideo/2d';
import {all, createRef, sequence, waitFor} from '@revideo/core';

const NAVY = '#1E3A5F';
const ORANGE = '#F59E0B';
const BODY = '#334155';

const COLS = ['CASE #', 'COUNTY', 'ADDRESS', 'ASSESSED', 'ARV', 'STATUS'];
const ROWS = [
  ['24-CA-0182', 'Brevard', '412 Oak St', '$52k', '$187k', '?????'],
  ['24-CA-0183', 'Orange', '88 Pine Ave', '$71k', '$230k', 'Review'],
  ['24-CA-0184', 'Duval', '310 Elm Rd', '$38k', '$142k', '?????'],
  ['24-CA-0185', 'Brevard', '71 Maple Ln', '$44k', '$165k', 'Pass'],
  ['24-CA-0186', 'Orange', '209 Cedar Blvd', '$59k', '$201k', '?????'],
  ['24-CA-0187', 'Hillsborough', '500 Birch Ct', '$83k', '$278k', 'Maybe'],
  ['24-CA-0188', 'Duval', '14 Willow Way', '$47k', '$189k', '?????'],
];

function statusColor(s: string) {
  if (s === '?????') return '#EF4444';
  if (s === 'Review') return '#F59E0B';
  if (s === 'Pass') return '#94A3B8';
  return '#3B82F6';
}

export default makeScene2D(function* (view) {
  view.add(<Rect width={'100%'} height={'100%'} fill={'#F8FAFC'} />);

  // Spreadsheet (left)
  const sheet = createRef<Layout>();
  view.add(
    <Layout ref={sheet} direction={'column'} x={-380} y={-40} gap={0} opacity={0}>
      {/* Header */}
      <Layout direction={'row'} gap={0}>
        {COLS.map((col, ci) => (
          <Rect width={ci === 2 ? 200 : 120} height={34} fill={NAVY} stroke={'#0f2a47'} lineWidth={1}>
            <Txt text={col} fontSize={11} fill={'#FFFFFF'} fontFamily={'Inter, monospace'} fontWeight={700} letterSpacing={0.8} />
          </Rect>
        ))}
      </Layout>
      {/* Data rows */}
      {ROWS.map((row, ri) =>
        <Layout direction={'row'} gap={0}>
          {row.map((cell, ci) => (
            <Rect
              width={ci === 2 ? 200 : 120}
              height={32}
              fill={ri % 2 === 0 ? '#FFFFFF' : '#F1F5F9'}
              stroke={'#E2E8F0'}
              lineWidth={1}
            >
              <Txt
                text={cell}
                fontSize={11}
                fill={ci === 5 ? statusColor(cell) : BODY}
                fontFamily={'Inter, monospace'}
                fontWeight={ci === 5 ? 700 : 400}
              />
            </Rect>
          ))}
        </Layout>
      )}
      {/* Warning footer */}
      <Rect width={800} height={30} fill={'#FEF3C7'} stroke={'#FCD34D'} lineWidth={1}>
        <Txt
          text={'⚠  43 items not reviewed · Last updated: 3 days ago · 12 duplicates found'}
          fontSize={11}
          fill={'#92400E'}
          fontFamily={'Inter, sans-serif'}
        />
      </Rect>
    </Layout>,
  );

  // Stats (right)
  const statTexts = ['67 counties.', 'Thousands of auctions.', 'All done manually.'];
  const statRefs = statTexts.map(() => createRef<Txt>());

  view.add(
    <Layout direction={'column'} x={520} y={-120} gap={28} alignItems={'flex-start'}>
      {statTexts.map((t, i) => (
        <Txt
          ref={statRefs[i]}
          text={t}
          fontSize={46}
          fill={NAVY}
          fontFamily={'Inter, sans-serif'}
          fontWeight={700}
          opacity={0}
        />
      ))}
    </Layout>,
  );

  // Punchline
  const punch = createRef<Txt>();
  view.add(
    <Txt
      ref={punch}
      text={'By the time you finish research,\nthe auction is over.'}
      fontSize={32}
      fill={ORANGE}
      fontFamily={'Inter, sans-serif'}
      fontWeight={800}
      textAlign={'center'}
      lineHeight={48}
      x={520}
      y={220}
      opacity={0}
    />,
  );

  // — Animate —
  yield* sheet().opacity(1, 0.5);
  yield* waitFor(0.4);

  yield* sequence(0.5,
    statRefs[0]().opacity(1, 0.4),
    statRefs[1]().opacity(1, 0.4),
    statRefs[2]().opacity(1, 0.4),
  );

  yield* waitFor(0.5);
  yield* punch().opacity(1, 0.6);
  yield* waitFor(4.0);
});
