/*
  Ģenerē public/og.png (1200x630) no scripts/og.html un
  public/cv/roberts-buda-cv.pdf no scripts/cv-placeholder.html.

  Palaišana (vajag playwright-core un Chromium):
    node scripts/generate-assets.mjs [ceļš-uz-chromium]
*/
import { chromium } from "playwright-core";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const executablePath = process.argv[2] || undefined;

const browser = await chromium.launch(
  executablePath ? { executablePath } : {},
);
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});

await page.goto("file://" + path.join(root, "scripts", "og.html"), {
  waitUntil: "networkidle",
});
await page.screenshot({ path: path.join(root, "public", "og.png") });
console.log("public/og.png gatavs");

fs.mkdirSync(path.join(root, "public", "cv"), { recursive: true });
await page.goto("file://" + path.join(root, "scripts", "cv-placeholder.html"));
await page.pdf({
  path: path.join(root, "public", "cv", "roberts-buda-cv.pdf"),
  format: "A4",
});
console.log("public/cv/roberts-buda-cv.pdf gatavs");

await browser.close();
