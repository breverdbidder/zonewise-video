#!/usr/bin/env node
/**
 * Generate or download 10 photorealistic scene images for ZoneWise Summit Hollywood video.
 *
 * Priority order:
 *  1. Gemini Imagen 3 via GEMINI_API_KEY env var (GitHub secret)
 *  2. Gemini Imagen 3 via CLIProxy at 87.99.129.125:8317
 *  3. Unsplash CDN fallback (no key needed)
 *
 * Output: public/images/*.jpg at 1920×1080
 */

import { createWriteStream, mkdirSync, existsSync, writeFileSync } from 'fs';
import { pipeline } from 'stream/promises';
import https from 'https';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images');

if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ── Scene images config ────────────────────────────────────────────────────
const IMAGES = [
  {
    name: 'hero-property-golden-hour',
    prompt: 'Photorealistic luxury real estate property exterior at golden hour sunset, warm orange and amber light casting long shadows, manicured lawn, palm trees, Florida architecture, cinematic 8K photography, shallow depth of field',
    unsplashId: '1568605114967-8130f3a36994',
  },
  {
    name: 'messy-desk-spreadsheets',
    prompt: 'Overwhelmed real estate investor at cluttered office desk, multiple monitors showing Excel spreadsheets and tax lien documents, piles of paper, sticky notes, stressed professional, dim office lighting, cinematic photography',
    unsplashId: '1454165804606-c3d57bc86b40',
  },
  {
    name: 'ugly-zoning-website',
    prompt: 'Outdated government county website on old computer monitor, pixelated zoning code database, ugly 2003-era web design, fluorescent office lighting, bureaucratic government office environment, wide angle documentary photography',
    unsplashId: '1537432376769-00f5c2f4c8d2',
  },
  {
    name: 'us-map-florida-highlighted',
    prompt: 'Aerial view of United States map glowing at night, Florida highlighted in golden orange light, other states dim blue, data visualization, dramatic aerial cartography, 8K cinematic rendering',
    unsplashId: '1451187580459-43490279c0fa',
  },
  {
    name: 'data-command-center',
    prompt: 'Modern real estate data command center, multiple large screens showing property analytics dashboards, glowing data visualizations, dark room with blue and amber light, professional analyst at workstation, cinematic wide angle',
    unsplashId: '1551288049-bebda4e38f71',
  },
  {
    name: 'contractor-phone-jobsite',
    prompt: 'Confident construction contractor talking on smartphone at active job site, wearing hard hat and safety vest, unfinished building in background, golden hour light, photorealistic documentary style',
    unsplashId: '1504307651254-35680f356dfd',
  },
  {
    name: 'investor-car-tablet',
    prompt: 'Successful real estate investor in luxury car reviewing property data on tablet, city skyline visible through window, evening light, professional attire, shallow depth of field, cinematic photography',
    unsplashId: '1507003211169-0a1dd7228f2d',
  },
  {
    name: 'international-buyer-office',
    prompt: 'International business person reviewing real estate documents in modern glass office, city skyline background, professional attire, warm office lighting, photorealistic corporate photography',
    unsplashId: '1573164713714-d95e436ab8d6',
  },
  {
    name: 'pyramid-data-layers',
    prompt: 'Abstract data layers pyramid visualization, glowing translucent geometric layers stacked, deep navy to amber gradient, data flowing upward, futuristic technology concept art, 8K render',
    unsplashId: '1518186285589-2f7649de83e0',
  },
  {
    name: 'sold-home-palm-trees',
    prompt: 'Beautiful Florida home with sold sign in front yard, palm trees, blue sky, manicured tropical landscaping, warm afternoon light, photorealistic real estate photography, wide establishing shot',
    unsplashId: '1512917774080-9991f1c4c750',
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────
function fetchJson(url, options = {}) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.request(url, { ...options, timeout: 30000 }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => req.destroy(new Error('Request timed out')));
    if (options.body) req.write(options.body);
    req.end();
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const file = createWriteStream(destPath);
    const request = mod.get(url, { timeout: 60000 }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        file.close();
        reject(new Error(`HTTP ${response.statusCode} for ${url}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => file.close(resolve));
    });
    request.on('error', (err) => { file.close(); reject(err); });
    request.on('timeout', () => request.destroy(new Error('Download timed out')));
  });
}

// ── Gemini Imagen generation ───────────────────────────────────────────────
async function generateWithGemini(apiKey, baseUrl, image) {
  const endpoint = `${baseUrl}/v1beta/models/imagen-3.0-generate-001:predict?key=${apiKey}`;
  const body = JSON.stringify({
    instances: [{ prompt: image.prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio: '16:9',
      safetyFilterLevel: 'block_few',
      personGeneration: 'allow_adult',
    },
  });

  const res = await fetchJson(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  if (res.status !== 200 || !res.body?.predictions?.[0]?.bytesBase64Encoded) {
    throw new Error(`Gemini error ${res.status}: ${JSON.stringify(res.body).slice(0, 200)}`);
  }

  const b64 = res.body.predictions[0].bytesBase64Encoded;
  const buf = Buffer.from(b64, 'base64');
  const destPath = path.join(OUTPUT_DIR, `${image.name}.jpg`);
  writeFileSync(destPath, buf);
  console.log(`  ✓ Generated via Gemini: ${image.name}.jpg`);
  return true;
}

// ── CLIProxy key fetch ─────────────────────────────────────────────────────
async function fetchKeyFromProxy() {
  try {
    const res = await fetchJson('http://87.99.129.125:8317/api/key');
    if (res.status === 200 && res.body?.key) return res.body.key;
    // Try alternate endpoint
    const res2 = await fetchJson('http://87.99.129.125:8317/gemini/key');
    if (res2.status === 200 && res2.body?.key) return res2.body.key;
  } catch {
    // proxy unreachable
  }
  return null;
}

// ── Unsplash CDN fallback ──────────────────────────────────────────────────
async function downloadFromUnsplash(image) {
  const url = `https://images.unsplash.com/photo-${image.unsplashId}?w=1920&h=1080&fit=crop&auto=format&q=85`;
  const destPath = path.join(OUTPUT_DIR, `${image.name}.jpg`);
  await downloadFile(url, destPath);
  console.log(`  ✓ Downloaded from Unsplash: ${image.name}.jpg`);
  return true;
}

// ── Main ──────────────────────────────────────────────────────────────────
async function main() {
  console.log('🎬 ZoneWise Summit Hollywood — generating scene images...\n');

  // Determine Gemini API key
  let geminiKey = process.env.GEMINI_API_KEY || null;
  let geminiBase = 'https://generativelanguage.googleapis.com';

  if (!geminiKey) {
    console.log('  GEMINI_API_KEY not in env, trying CLIProxy at 87.99.129.125:8317...');
    geminiKey = await fetchKeyFromProxy();
    if (geminiKey) {
      console.log('  ✓ Got key from CLIProxy\n');
    } else {
      // Try using CLIProxy as a direct proxy endpoint
      console.log('  Key fetch failed — trying CLIProxy as direct Imagen endpoint...');
      try {
        const testImg = IMAGES[0];
        await generateWithGemini('', 'http://87.99.129.125:8317', testImg);
        geminiBase = 'http://87.99.129.125:8317';
        geminiKey = ''; // proxy handles auth
        console.log('  ✓ CLIProxy accepts direct Imagen requests\n');
      } catch {
        console.log('  CLIProxy not available — falling back to Unsplash CDN\n');
        geminiKey = null;
      }
    }
  } else {
    console.log(`  ✓ Using GEMINI_API_KEY from environment\n`);
  }

  let geminiSuccesses = 0;
  let unsplashSuccesses = 0;
  let failures = 0;

  for (const image of IMAGES) {
    const destPath = path.join(OUTPUT_DIR, `${image.name}.jpg`);
    if (existsSync(destPath)) {
      console.log(`  ⏭  Already exists: ${image.name}.jpg`);
      continue;
    }

    console.log(`  Generating: ${image.name}...`);

    // Try Gemini first
    if (geminiKey !== null) {
      try {
        await generateWithGemini(geminiKey, geminiBase, image);
        geminiSuccesses++;
        continue;
      } catch (err) {
        console.log(`  ⚠  Gemini failed (${err.message.slice(0, 80)}), falling back to Unsplash...`);
      }
    }

    // Unsplash CDN fallback
    try {
      await downloadFromUnsplash(image);
      unsplashSuccesses++;
    } catch (err) {
      console.error(`  ✗ Failed to download ${image.name}: ${err.message}`);
      failures++;
    }
  }

  console.log(`\n📊 Summary:`);
  if (geminiSuccesses) console.log(`  Gemini Imagen: ${geminiSuccesses} images`);
  if (unsplashSuccesses) console.log(`  Unsplash CDN:  ${unsplashSuccesses} images`);
  if (failures) console.log(`  Failed:        ${failures} images`);

  if (failures > 0) {
    process.exit(1);
  }

  console.log('\n✅ All scene images ready in public/images/\n');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
