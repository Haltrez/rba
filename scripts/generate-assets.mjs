/*
  Ģenerē public/og.png (1200x630) no scripts/og.html.

  Palaišana (vajag playwright-core un Chromium):
    node scripts/generate-assets.mjs [ceļš-uz-chromium]
*/
import { chromium } from "playwright-core";
import { fileURLToPath } from "node:url";
import path from "node:path";

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

await browser.close();
