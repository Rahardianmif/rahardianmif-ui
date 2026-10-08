import { expect, test } from "@playwright/test";

const url = "/examples/overlay/tooltip.html";

async function pair(page, index = 0) {
  const trigger = page.locator("[data-rm-tooltip-trigger]").nth(index);
  const id = await trigger.getAttribute("data-rm-tooltip-trigger");
  return { trigger, tooltip: page.locator(`#${id}`) };
}

async function expectOpen(locator, open = true) {
  await expect.poll(() => locator.evaluate((el) => el.matches(":popover-open"))).toBe(open);
}

test.describe("v0.5 Tooltip", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test("focus opens immediately", async ({ page }) => {
    const { trigger, tooltip } = await pair(page);
    await trigger.focus();
    await expectOpen(tooltip);
  });

  test("blur closes", async ({ page }) => {
    const { trigger, tooltip } = await pair(page);
    await trigger.focus();
    await expectOpen(tooltip);
    await page.keyboard.press("Tab");
    await expectOpen(tooltip, false);
  });

  test("hover opens after delay", async ({ page }) => {
    const { trigger, tooltip } = await pair(page);
    await trigger.hover();
    await expectOpen(tooltip);
  });

  test("Escape closes active Tooltip", async ({ page }) => {
    const { trigger, tooltip } = await pair(page);
    await trigger.focus();
    await expectOpen(tooltip);
    await page.keyboard.press("Escape");
    await expectOpen(tooltip, false);
  });

  test("only one Tooltip remains open", async ({ page }) => {
    const first = await pair(page, 0);
    const second = await pair(page, 1);
    await first.trigger.focus();
    await expectOpen(first.tooltip);
    await second.trigger.focus();
    await expectOpen(second.tooltip);
    await expectOpen(first.tooltip, false);
  });

  test("writes fixed floating coordinates and stays noninteractive", async ({ page }) => {
    const { trigger, tooltip } = await pair(page);
    await trigger.focus();
    await expectOpen(tooltip);
    const state = await tooltip.evaluate((el) => ({
      position: getComputedStyle(el).position,
      pointerEvents: getComputedStyle(el).pointerEvents,
      left: el.style.left,
      top: el.style.top,
    }));
    expect(state.position).toBe("fixed");
    expect(state.pointerEvents).toBe("none");
    expect(state.left).not.toBe("");
    expect(state.top).not.toBe("");
  });
});
