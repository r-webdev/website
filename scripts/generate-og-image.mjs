import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const logoPath = join(root, 'public/logo.png');
const svgPath = join(root, 'public/og-image.svg');
const outPath = join(root, 'public/og-image.png');

const CANVAS_WIDTH = 1200;
const LOGO_SIZE = 160;
const LOGO_TOP = 120;
const LOGO_LEFT = Math.floor((CANVAS_WIDTH - LOGO_SIZE) / 2);

const svg = readFileSync(svgPath);
const logo = await sharp(logoPath).resize(LOGO_SIZE, LOGO_SIZE).png().toBuffer();

await sharp(svg)
  .composite([{ input: logo, top: LOGO_TOP, left: LOGO_LEFT }])
  .png()
  .toFile(outPath);
