import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import lighthouse, { desktopConfig } from "lighthouse";
import { chromium } from "playwright";
import puppeteer from "puppeteer-core";

const url = process.env.PREVIEW_URL || "http://127.0.0.1:3001";
const executablePath = process.env.BROWSER_PATH || [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].find(existsSync);
assert.ok(executablePath, "Defina BROWSER_PATH com o caminho do Chrome ou Edge instalado.");

await mkdir("artifacts", { recursive: true });
let browser;
let auditBrowser;

try {
  const portProbe = createServer();
  await new Promise((resolve) => portProbe.listen(0, "127.0.0.1", resolve));
  const port = portProbe.address().port;
  await new Promise((resolve) => portProbe.close(resolve));
  browser = await chromium.launch({ executablePath, headless: true, args: [`--remote-debugging-port=${port}`] });
  auditBrowser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${port}` });
  const page = await auditBrowser.newPage();
  await page.bringToFront();
  await page.setViewport({ width: 1350, height: 940, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);

  const result = await lighthouse(url, {
    output: ["html", "json"],
    logLevel: "error",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  }, {
    ...desktopConfig,
    settings: {
      ...desktopConfig.settings,
      skipAudits: ["bf-cache"],
      pauseAfterFcpMs: 3000,
      pauseAfterLoadMs: 3000,
      networkQuietThresholdMs: 2000,
    },
  }, page);

  assert.ok(result?.lhr && Array.isArray(result.report), "O Lighthouse não produziu uma auditoria válida.");
  const scene = await page.evaluate(() => ({
    width: innerWidth,
    canvas: document.querySelectorAll("canvas").length,
    ready: Boolean(document.querySelector(".scene-art-ready canvas")),
    media: matchMedia("(prefers-reduced-motion: no-preference)").matches,
    paused: document.querySelector(".scene-art")?.getAttribute("data-paused"),
  }));

  await Promise.all([
    writeFile("artifacts/lighthouse-desktop.report.html", result.report[0]),
    writeFile("artifacts/lighthouse-desktop.report.json", JSON.stringify(result.lhr, null, 2)),
    writeFile("artifacts/lighthouse-scene-state.json", JSON.stringify(scene, null, 2)),
  ]);

  assert.ok(!result.lhr.runtimeError, `A auditoria falhou: ${result.lhr.runtimeError?.message}`);
  assert.ok(scene.canvas > 0 && scene.ready && scene.media && scene.paused === "false", "Auditoria descartada: a cena WebGL precisa estar pronta, ativa e sem movimento reduzido.");
  assert.notEqual(result.lhr.categories.performance.score, null, "A nota de performance não foi calculada.");

  const metrics = Object.fromEntries([
    "first-contentful-paint", "largest-contentful-paint", "total-blocking-time", "cumulative-layout-shift",
  ].map((name) => [name, result.lhr.audits[name].displayValue]));
  const scores = Object.fromEntries(Object.entries(result.lhr.categories).map(([name, category]) => [name, Math.round(category.score * 100)]));
  console.log(JSON.stringify({ url, checkedAt: result.lhr.fetchTime, scene, scores, metrics }, null, 2));
} finally {
  await auditBrowser?.disconnect();
  await browser?.close();
}
