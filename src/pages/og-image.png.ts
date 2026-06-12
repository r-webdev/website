import type { APIRoute } from "astro";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const logoPath = join(process.cwd(), "public/logo.png");
const svgPath = join(process.cwd(), "public/og-image.svg");

const CANVAS_WIDTH = 1200;
const LOGO_SIZE = 160;
const LOGO_TOP = 120;
const LOGO_LEFT = Math.floor((CANVAS_WIDTH - LOGO_SIZE) / 2);

export const GET = (async () => {
  const svg = readFileSync(svgPath);
  const logo = await sharp(logoPath)
    .resize(LOGO_SIZE, LOGO_SIZE)
    .png()
    .toBuffer();

  const buffer = await sharp(svg)
    .composite([{ input: logo, top: LOGO_TOP, left: LOGO_LEFT }])
    .png()
    .toBuffer();

  return new Response(new Uint8Array(buffer), {
    headers: { "Content-Type": "image/png" },
  });
}) satisfies APIRoute;
