import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const seriousOrCritical = (results) =>
  results.violations.filter((violation) =>
    violation.impact === "serious" || violation.impact === "critical"
  );

test.describe("v0.5 Popover accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/examples/overlay/popover.html");
  });

  test("page has no serious or critical Axe violations", async ({ page }) => {
    const results = await new AxeBuilder({ page }).analyze();
    expect(seriousOrCritical(results)).toEqual([]);
  });

  test("trigger controls a named role=dialog Popover", async ({ page }) => {
    const trigger = page.locator("[data-rm-popover-trigger]").first();
    const id = await trigger.getAttribute("data-rm-popover-trigger");
    await expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    await expect(trigger).toHaveAttribute("aria-controls", id);
    await trigger.click();
    const popover = page.locator(`#${id}`);
    await expect(popover).toHaveAttribute("role", "dialog");
    const labelledby = await popover.getAttribute("aria-labelledby");
    const label = await popover.getAttribute("aria-label");
    expect(Boolean(labelledby || label)).toBe(true);
    const results = await new AxeBuilder({ page }).analyze();
    expect(seriousOrCritical(results)).toEqual([]);
  });
});
