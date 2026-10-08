import { expect, test } from "@playwright/test";

const url = "/examples/overlay/dropdown.html";

async function pair(page, index = 0) {
  const trigger = page.locator("[data-rm-dropdown-trigger]").nth(index);
  const id = await trigger.getAttribute("data-rm-dropdown-trigger");
  return { trigger, dropdown: page.locator(`#${id}`) };
}

async function expectOpen(locator, open = true) {
  await expect.poll(() => locator.evaluate((el) => el.matches(":popover-open"))).toBe(open);
}

function enabledItems(dropdown) {
  return dropdown.locator('[role="menuitem"]:not([aria-disabled="true"]):not(:disabled)');
}

test.describe("v0.5 Dropdown", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test("click opens and focuses first enabled item", async ({ page }) => {
    const { trigger, dropdown } = await pair(page);
    await trigger.click();
    await expectOpen(dropdown);
    await expect(enabledItems(dropdown).first()).toBeFocused();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  test("ArrowDown opens and focuses first item", async ({ page }) => {
    const { trigger, dropdown } = await pair(page);
    await trigger.focus();
    await page.keyboard.press("ArrowDown");
    await expectOpen(dropdown);
    await expect(enabledItems(dropdown).first()).toBeFocused();
  });

  test("ArrowUp opens and focuses last item", async ({ page }) => {
    const { trigger, dropdown } = await pair(page);
    await trigger.focus();
    await page.keyboard.press("ArrowUp");
    await expectOpen(dropdown);
    await expect(enabledItems(dropdown).last()).toBeFocused();
  });

  test("Arrow navigation wraps", async ({ page }) => {
    const { trigger, dropdown } = await pair(page);
    await trigger.click();
    const items = enabledItems(dropdown);
    await items.last().focus();
    await page.keyboard.press("ArrowDown");
    await expect(items.first()).toBeFocused();
    await page.keyboard.press("ArrowUp");
    await expect(items.last()).toBeFocused();
  });

  test("Home and End move to boundaries", async ({ page }) => {
    const { trigger, dropdown } = await pair(page);
    await trigger.click();
    const items = enabledItems(dropdown);
    await page.keyboard.press("End");
    await expect(items.last()).toBeFocused();
    await page.keyboard.press("Home");
    await expect(items.first()).toBeFocused();
  });

  test("Escape closes and restores trigger focus", async ({ page }) => {
    const { trigger, dropdown } = await pair(page);
    await trigger.click();
    await page.keyboard.press("Escape");
    await expectOpen(dropdown, false);
    await expect(trigger).toBeFocused();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("disabled item is skipped", async ({ page }) => {
    const dropdown = page.locator("#states-menu");
    const trigger = page.locator('[data-rm-dropdown-trigger="states-menu"]');
    await trigger.click();
    const enabled = enabledItems(dropdown);
    const disabled = dropdown.locator('[role="menuitem"][aria-disabled="true"]');
    await expect(enabled.first()).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(enabled.nth(1)).toBeFocused();
    await expect(disabled).not.toBeFocused();
  });

  test("typeahead moves to matching item", async ({ page }) => {
    const trigger = page.locator('[data-rm-dropdown-trigger="keyboard-menu"]');
    const dropdown = page.locator("#keyboard-menu");
    await trigger.click();
    await page.keyboard.press("r");
    await expect(dropdown.getByRole("menuitem", { name: "Rename" })).toBeFocused();
  });

  test("button activation closes menu", async ({ page }) => {
    const { trigger, dropdown } = await pair(page);
    await trigger.click();
    await enabledItems(dropdown).first().press("Enter");
    await expectOpen(dropdown, false);
  });

  test("outside click closes menu", async ({ page }) => {
    const { trigger, dropdown } = await pair(page);
    await trigger.click();
    await expectOpen(dropdown);
    await page.mouse.click(2, 2);
    await expectOpen(dropdown, false);
  });

  test("floating alignment writes coordinates", async ({ page }) => {
    const trigger = page.locator('[data-rm-dropdown-trigger="dropdown-align-end"]');
    const dropdown = page.locator("#dropdown-align-end");
    await trigger.click();
    await expectOpen(dropdown);
    const state = await dropdown.evaluate((el) => ({ left: el.style.left, top: el.style.top }));
    expect(state.left).not.toBe("");
    expect(state.top).not.toBe("");
  });
});
