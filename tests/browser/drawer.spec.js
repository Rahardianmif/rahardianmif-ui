import { expect, test } from "@playwright/test";

const url = "/examples/overlay/drawer.html";

async function pair(page, selector = "[data-rm-drawer]") {
  const drawer = page.locator(selector).first();
  const id = await drawer.getAttribute("id");
  return {
    drawer,
    trigger: page.locator(`[data-rm-drawer-trigger="${id}"]`),
  };
}

test.describe("v0.5 Drawer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test("opens end Drawer", async ({ page }) => {
    const { drawer, trigger } = await pair(page, ".rm-drawer--end");
    await trigger.click();
    await expect(drawer).toHaveAttribute("open", "");
  });

  test("opens start Drawer", async ({ page }) => {
    const { drawer, trigger } = await pair(page, ".rm-drawer--start");
    await trigger.click();
    await expect(drawer).toHaveAttribute("open", "");
  });

  test("Escape closes and restores focus", async ({ page }) => {
    const { drawer, trigger } = await pair(page);
    await trigger.click();
    await page.keyboard.press("Escape");
    await expect(drawer).not.toHaveAttribute("open", "");
    await expect(trigger).toBeFocused();
  });

  test("backdrop closes", async ({ page }) => {
    const { drawer, trigger } = await pair(page);
    await trigger.click();
    await drawer.evaluate((element) => {
      element.dispatchEvent(new MouseEvent("click", {
        bubbles: true,
        clientX: 0,
        clientY: 0,
      }));
    });
    await expect(drawer).not.toHaveAttribute("open", "");
  });

  test("explicit close closes", async ({ page }) => {
    const { drawer, trigger } = await pair(page);
    await trigger.click();
    await drawer.locator("[data-rm-drawer-close]").first().click();
    await expect(drawer).not.toHaveAttribute("open", "");
  });

  test("locks page scroll while open", async ({ page }) => {
    const { trigger } = await pair(page);
    await trigger.click();
    const state = await page.evaluate(() => ({
      html: getComputedStyle(document.documentElement).overflow,
      body: getComputedStyle(document.body).overflow,
    }));
    expect([state.html, state.body]).toContain("hidden");
  });

  test("fits mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 720 });
    const { drawer, trigger } = await pair(page);
    await trigger.click();
    const box = await drawer.boundingBox();
    expect(box.width).toBeLessThanOrEqual(375);
    expect(box.height).toBeLessThanOrEqual(720);
  });
});
