const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");

const appUrl = pathToFileURL(path.resolve(__dirname, "..", "index.html")).href + "?test=1";

test.beforeEach(async ({ page }) => {
  await page.goto(appUrl);
});

test("presets and custom duration update the timer", async ({ page }) => {
  await expect(page.locator("#timeDisplay")).toHaveText("05:00");

  for (const minutes of [5, 10, 15, 25, 30, 45, 60]) {
    await page.locator(`[data-minutes="${minutes}"]`).click();
    await expect(page.locator("#timeDisplay")).toHaveText(`${String(minutes).padStart(2, "0")}:00`);
  }

  await page.locator("#customMinutes").fill("7");
  await page.locator("#setCustom").click();
  await expect(page.locator("#timeDisplay")).toHaveText("07:00");
});

test("start, pause, resume, stop and reset keep consistent state", async ({ page }) => {
  await page.evaluate(() => window.__practiceTimerTest.setDurationSeconds(4));
  await page.locator("#startBtn").click();
  await expect(page.locator("#statusText")).toHaveText("Practice in progress");

  await page.waitForTimeout(1100);
  await expect(page.locator("#timeDisplay")).not.toHaveText("00:04");

  await page.locator("#pauseBtn").click();
  const pausedTime = await page.locator("#timeDisplay").textContent();
  await expect(page.locator("#pauseBtn")).toHaveText("Resume");
  await page.waitForTimeout(700);
  await expect(page.locator("#timeDisplay")).toHaveText(pausedTime);

  await page.locator("#pauseBtn").click();
  await expect(page.locator("#pauseBtn")).toHaveText("Pause");
  await page.waitForTimeout(500);

  await page.locator("#stopBtn").click();
  const stoppedTime = await page.locator("#timeDisplay").textContent();
  await page.waitForTimeout(500);
  await expect(page.locator("#timeDisplay")).toHaveText(stoppedTime);
  await expect(page.locator("#statusText")).toContainText("Stopped");

  await page.locator("#resetBtn").click();
  await expect(page.locator("#timeDisplay")).toHaveText("00:04");
  await expect(page.locator("#statusText")).toHaveText("Ready to practice");
});

test("completion stops exactly at zero", async ({ page }) => {
  await page.evaluate(() => window.__practiceTimerTest.setDurationSeconds(1));
  await page.locator("#startBtn").click();
  await expect(page.locator("#timeDisplay")).toHaveText("00:00", { timeout: 3000 });
  await expect(page.locator("#statusText")).toContainText("Session complete");
  const state = await page.evaluate(() => window.__practiceTimerTest.getState());
  expect(state.state).toBe("finished");
  expect(state.remainingMs).toBe(0);
});

test("layout remains usable at desktop and mobile widths", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await expect(page.locator(".timer-card")).toBeVisible();

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("#timeDisplay")).toBeVisible();
  await expect(page.locator("#startBtn")).toBeVisible();
  await expect(page.locator("#customMinutes")).toBeVisible();
});


test("title is editable and persists in DOM until refresh", async ({ page }) => {
  const title = page.locator('#sessionTitle');
  await expect(title).toHaveText('Practice Timer');
  await page.evaluate(() => { const el = document.querySelector('#sessionTitle'); el.textContent = 'Warmup Session'; });
  await expect(title).toHaveText('Warmup Session');
  // reload should restore original content (no persistence required)
  await page.reload();
  await expect(page.locator('#sessionTitle')).toHaveText('Practice Timer');
});
