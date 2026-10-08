import { expect, test } from "@playwright/test";

const url = "/examples/overlay/modal.html";

async function firstPair(page) {
  const trigger = page.locator("[data-rm-modal-trigger]").first();
  const id = await trigger.getAttribute("data-rm-modal-trigger");
  return { trigger, modal: page.locator(`#${id}`) };
}

test.describe("v0.5 Modal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test("opens and closes with Escape", async ({ page }) => {
    const { trigger, modal } = await firstPair(page);
    await trigger.click();
    await expect(modal).toHaveAttribute("open", "");
    await page.keyboard.press("Escape");
    await expect(modal).not.toHaveAttribute("open", "");
  });

  test("restores focus to the opener", async ({ page }) => {
    const { trigger, modal } = await firstPair(page);
    await trigger.focus();
    await trigger.click();
    await page.keyboard.press("Escape");
    await expect(modal).not.toHaveAttribute("open", "");
    await expect(trigger).toBeFocused();
  });

  test("normal backdrop closes", async ({ page }) => {
    const { trigger, modal } = await firstPair(page);
    await trigger.click();
    await modal.evaluate((element) => {
      element.dispatchEvent(new MouseEvent("click", {
        bubbles: true,
        clientX: 0,
        clientY: 0,
      }));
    });
    await expect(modal).not.toHaveAttribute("open", "");
  });

  test("static backdrop stays open but Escape closes", async ({ page }) => {
    const modal = page.locator("[data-rm-modal][data-rm-modal-static]").first();
    const id = await modal.getAttribute("id");
    await page.locator(`[data-rm-modal-trigger="${id}"]`).click();
    await modal.evaluate((element) => {
      element.dispatchEvent(new MouseEvent("click", {
        bubbles: true,
        clientX: 0,
        clientY: 0,
      }));
    });
    await expect(modal).toHaveAttribute("open", "");
    await page.keyboard.press("Escape");
    await expect(modal).not.toHaveAttribute("open", "");
  });

  test("explicit close control closes", async ({ page }) => {
    const { trigger, modal } = await firstPair(page);
    await trigger.click();
    await modal.locator("[data-rm-modal-close]").first().click();
    await expect(modal).not.toHaveAttribute("open", "");
  });

  test("locks and restores document scrolling", async ({ page }) => {
    const { trigger } = await firstPair(page);
    await trigger.click();
    const locked = await page.evaluate(() => ({
      html: getComputedStyle(document.documentElement).overflow,
      body: getComputedStyle(document.body).overflow,
    }));
    expect([locked.html, locked.body]).toContain("hidden");
    await page.keyboard.press("Escape");
    const unlocked = await page.evaluate(() => ({
      html: getComputedStyle(document.documentElement).overflow,
      body: getComputedStyle(document.body).overflow,
    }));
    expect(unlocked.html).not.toBe("hidden");
    expect(unlocked.body).not.toBe("hidden");
  });

  test("fullscreen stays inside viewport", async ({ page }) => {
    const modal = page.locator(".rm-modal--fullscreen").first();
    const id = await modal.getAttribute("id");
    await page.locator(`[data-rm-modal-trigger="${id}"]`).click();
    const box = await modal.boundingBox();
    const viewport = page.viewportSize();
    expect(box.width).toBeLessThanOrEqual(viewport.width);
    expect(box.height).toBeLessThanOrEqual(viewport.height);
  });
});

test.beforeEach(
  async ({ page }) => {
    await page.goto(
      url,
      {
        waitUntil:
          "domcontentloaded",

        timeout:
          45_000,
      }
    );

    await expect(
      page.locator(
        "[data-rm-modal-trigger]"
      ).first()
    ).toBeVisible();
  }
);