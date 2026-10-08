import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const seriousOrCritical = (results) =>
  results.violations.filter((violation) =>
    violation.impact === "serious" || violation.impact === "critical"
  );

test.describe("v0.5 Dropdown accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/examples/overlay/dropdown.html");
  });

  test("page has no serious or critical Axe violations", async ({ page }) => {
    const results = await new AxeBuilder({ page }).analyze();
    expect(seriousOrCritical(results)).toEqual([]);
  });

  test("trigger controls a role=menu with menuitems", async ({ page }) => {
    const trigger = page.locator("[data-rm-dropdown-trigger]").first();
    const id = await trigger.getAttribute("data-rm-dropdown-trigger");
    await expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    await expect(trigger).toHaveAttribute("aria-controls", id);
    await trigger.click();
    const dropdown = page.locator(`#${id}`);
    await expect(dropdown).toHaveAttribute("role", "menu");
    expect(await dropdown.locator('[role="menuitem"]').count()).toBeGreaterThan(0);
    const results = await new AxeBuilder({ page }).analyze();
    expect(seriousOrCritical(results)).toEqual([]);
  });
});
