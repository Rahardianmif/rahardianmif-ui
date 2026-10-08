import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const seriousOrCritical = (results) =>
  results.violations.filter((violation) =>
    violation.impact === "serious" || violation.impact === "critical"
  );

test.describe("v0.5 Modal accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/examples/overlay/modal.html");
  });

  test("page has no serious or critical Axe violations", async ({ page }) => {
    const results = await new AxeBuilder({ page }).analyze();
    expect(seriousOrCritical(results)).toEqual([]);
  });

  test("open Modal has accessible naming and passes Axe", async ({ page }) => {
    const trigger = page.locator("[data-rm-modal-trigger]").first();
    const id = await trigger.getAttribute("data-rm-modal-trigger");
    const modal = page.locator(`#${id}`);
    await trigger.click();
    const labelledby = await modal.getAttribute("aria-labelledby");
    const label = await modal.getAttribute("aria-label");
    expect(Boolean(labelledby || label)).toBe(true);
    const results = await new AxeBuilder({ page }).analyze();
    expect(seriousOrCritical(results)).toEqual([]);
  });
});
