import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const url = process.env.PREVIEW_URL || "http://127.0.0.1:3001";
const executablePath = process.env.BROWSER_PATH || ["C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"].find(existsSync);
const scenarios = [
  { name: "desktop", viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" },
  { name: "mobile", viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true, reducedMotion: "no-preference" },
  { name: "tablet", viewport: { width: 768, height: 1024 }, isMobile: true, hasTouch: true, reducedMotion: "no-preference" },
  { name: "reduced-motion", viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" },
  { name: "compact-preview", viewport: { width: 685, height: 876 }, reducedMotion: "reduce" },
];
await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch({ executablePath, headless: true });
const results = [];
try {
  for (const { name, ...options } of scenarios.filter(scenario => !process.env.SCENARIO || scenario.name === process.env.SCENARIO)) {
    const context = await browser.newContext({ ...options, deviceScaleFactor: 1 });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    try {
      assert.equal((await page.goto(url, { waitUntil: "networkidle" })).status(), 200);
      await page.waitForFunction(() => document.documentElement.dataset.motion);
      await page.evaluate(() => document.fonts.ready);
      if (name === "desktop") await page.locator(".scene-art-ready canvas").waitFor({ timeout: 30000 });
      else assert.equal(await page.locator("canvas").count(), 0);
      assert.equal(await page.locator("h1").count(), 1);
      assert.equal(await page.locator("[data-thread-step]").count(), 7);
      assert.equal(await page.locator(".thread-chapter").count(), 5);
      assert.equal(await page.locator(".thread-chapter .thread-project").count(), 5);
      assert.equal(await page.locator(".thread-overview a").count(), 5);
      assert.match(await page.locator("#capitulo-labs").innerText(), /2023[\s\S]*Alura[\s\S]*WordPress[\s\S]*Wiltenburg Labs/i);
      assert.match(await page.locator("#capitulo-fiap .thread-copy").innerText(), /reta final do LockIN Fight/);
      assert.doesNotMatch(await page.locator("main").innerText(), /finalista/i, "O NEXT ainda não tem resultado");
      assert.match(await page.locator("#capitulo-atletas .school-dossier").textContent(), /Reinaldo[\s\S]*15\+[\s\S]*RANKING INDIVIDUAL/);
      assert.match(await page.locator("#capitulo-fiap .education-choice").innerText(), /2 FEDERAIS[\s\S]*distância[\s\S]*FIAP/i);
      assert.doesNotMatch(await page.locator("#inicio").innerText(), /ProRecipe|palha|14 mil/i);
      assert.doesNotMatch(await page.locator("main").innerText(), /Gutenberg|Meu Consultório|—/);
      assert.match(await page.locator("#capitulo-proreceita .receipt-paper").innerText(), /Vendas de palha italiana[\s\S]*dor[\s\S]*produto/);
      assert.equal(await page.locator('a[href="https://prorecipe.com.br"]').count(), 1);
      assert.equal(await page.locator('a[href^="https://wiltenburglabs.infinityfree.me/"]').count(), 1);
      assert.equal(await page.locator('a[href="https://github.com/TheFirstGomes/lockin-fight"]').count(), 1);
      assert.equal(await page.locator('a[href^="https://flamengo3x3.vercel.app"]').count(), 0);
      const broken = await page.locator('a[href^="#"]').evaluateAll(links => links.filter(link => !document.getElementById(decodeURIComponent(link.getAttribute("href").slice(1)))).map(link => link.getAttribute("href")));
      assert.deepEqual(broken, []);
      await page.screenshot({ path: `artifacts/thread-${name}-hero.png` });
      await page.keyboard.press("Tab");
      assert.ok(await page.locator(".skip-link").evaluate(element => element === document.activeElement));
      await page.locator(".thread-index summary").focus();
      await page.keyboard.press("Enter");
      assert.notEqual(await page.locator(".thread-index").getAttribute("open"), null);
      await page.keyboard.press("Escape");
      assert.equal(await page.locator(".thread-index").getAttribute("open"), null);
      const before = await page.locator(".thread-svg").getAttribute("viewBox");
      await page.mouse.wheel(0, 220);
      await page.waitForTimeout(1250);
      const after = await page.locator(".thread-svg").getAttribute("viewBox");
      if (options.reducedMotion === "reduce") assert.equal(after, before, "A preferência reduzida mantém a câmera estática");
      else assert.notEqual(after, before, "O percurso precisa responder continuamente ao scroll, antes da mudança de capítulo");
      for (const [index, id] of ["labs", "proreceita", "atletas", "fiap", "isla"].entries()) {
        await page.evaluate(id => document.getElementById(`capitulo-${id}`).scrollIntoView({ block: "start" }), id);
        await page.waitForFunction(index => document.querySelector(".thread-experience").dataset.activeChapter === String(index + 1), index);
        await page.waitForTimeout(1000);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), "Sem overflow horizontal");
        if (name === "desktop" || id === "proreceita") await page.screenshot({ path: `artifacts/thread-${name}-${id}.png` });
      }
      const flamengo = page.locator("#capitulo-atletas details:not(.school-dossier)");
      await flamengo.locator("summary").focus();
      await page.keyboard.press("Enter");
      assert.ok(await flamengo.getAttribute("open") !== null);
      assert.match(await flamengo.textContent(), /PROJETO PRIVADO[\s\S]*SISTEMA EM USO/);
      await page.locator("#capitulo-fiap summary").focus();
      await page.keyboard.press("Enter");
      assert.match(await page.locator("#capitulo-fiap details").textContent(), /Formulário[\s\S]*BPM[\s\S]*Force Score[\s\S]*Phaser\.js[\s\S]*Arduino/);
      assert.equal(await page.locator('a[href="https://isla.to"]').count(), 1);
      assert.match(await page.locator(".thread-overview .final-signal").textContent(), /PRÓXIMO CAPÍTULO[\s\S]*EM[\s\S]*CONSTRUÇÃO[\s\S]*SÓ O COMEÇO/);
      await page.getByRole("link", { name: "Vamos conversar", exact: false }).first().click();
      await page.waitForFunction(() => document.querySelector(".thread-experience").dataset.activeChapter === "6");
      await page.locator(".thread-stack summary").click();
      assert.match(await page.locator(".thread-stack").innerText(), /React[\s\S]*Python[\s\S]*WordPress/);
      assert.equal(await page.locator('a[href="mailto:wiltenburg.joao@gmail.com"]').count(), 1);
      assert.equal(await page.locator('a[href="https://github.com/jotaPwt"]').count(), 1);
      assert.equal(await page.locator('a[href="https://www.linkedin.com/in/joaowiltenburg/"]').count(), 1);
      await page.waitForTimeout(1200);
      await page.screenshot({ path: `artifacts/thread-${name}-finale.png` });
      const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      await writeFile(`artifacts/thread-${name}-axe.json`, JSON.stringify(audit, null, 2));
      assert.deepEqual(audit.violations.map(({ id, nodes }) => ({ id, targets: nodes.map(node => node.target) })), []);
      if (name === "compact-preview") {
        const other = await context.newPage();
        await other.goto(url, { waitUntil: "networkidle" });
        await page.getByRole("button", { name: "Ativar movimento" }).click();
        await other.waitForFunction(() => document.documentElement.dataset.motion === "full");
        await other.reload({ waitUntil: "networkidle" });
        await other.waitForFunction(() => document.documentElement.dataset.motion === "full");
        const view = await other.locator(".thread-svg").getAttribute("viewBox");
        await other.mouse.wheel(0, 250);
        await other.waitForTimeout(1200);
        assert.notEqual(await other.locator(".thread-svg").getAttribute("viewBox"), view);
        await page.getByRole("button", { name: "Pausar movimento" }).click();
        await other.waitForFunction(() => document.documentElement.dataset.motion === "reduced");
        await other.close();
      }
      if (name === "mobile") {
        await page.setViewportSize({ width: 812, height: 375 });
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      }
      assert.deepEqual(errors, []);
      results.push({ name, passed: true });
      console.log("OK: " + name);
    } catch (error) {
      results.push({ name, passed: false, error: error.message, errors });
      console.error("FALHOU: " + name + ": " + error.stack);
      await page.screenshot({ path: `artifacts/thread-${name}-failure.png`, fullPage: true }).catch(() => {});
    } finally { await context.close(); }
  }
} finally {
  await browser.close();
  await writeFile("artifacts/verification.json", JSON.stringify({ version: "fio-continuo", checkedAt: new Date().toISOString(), url, results }, null, 2));
}
assert.ok(results.every(result => result.passed), "Verificação falhou. Consulte artifacts/.");
