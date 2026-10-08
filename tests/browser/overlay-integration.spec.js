import { expect, test } from "@playwright/test";

async function expectPopoverOpen(locator, open = true) {
  await expect.poll(() => locator.evaluate((el) => el.matches(":popover-open"))).toBe(open);
}

test.describe("v0.5 Overlay integration", () => {
  test("Dropdown inside Modal consumes first Escape", async ({ page }) => {
    await page.goto("/examples/overlay/dropdown.html");
    const modal = page.locator("#dropdown-demo-modal");
    await page.locator('[data-rm-modal-trigger="dropdown-demo-modal"]').click();
    await expect(modal).toHaveAttribute("open", "");
    const dropdown = page.locator("#modal-dropdown");
    await page.locator('[data-rm-dropdown-trigger="modal-dropdown"]').click();
    await expectPopoverOpen(dropdown);
    await page.keyboard.press("Escape");
    await expectPopoverOpen(dropdown, false);
    await expect(modal).toHaveAttribute("open", "");
    await page.keyboard.press("Escape");
    await expect(modal).not.toHaveAttribute("open", "");
  });

  test("Dropdown inside Drawer consumes first Escape", async ({ page }) => {
    await page.goto("/examples/overlay/dropdown.html");
    const drawer = page.locator("#dropdown-demo-drawer");
    await page.locator('[data-rm-drawer-trigger="dropdown-demo-drawer"]').click();
    await expect(drawer).toHaveAttribute("open", "");
    const dropdown = page.locator("#drawer-dropdown");
    await page.locator('[data-rm-dropdown-trigger="drawer-dropdown"]').click();
    await expectPopoverOpen(dropdown);
    await page.keyboard.press("Escape");
    await expectPopoverOpen(dropdown, false);
    await expect(drawer).toHaveAttribute("open", "");
    await page.keyboard.press("Escape");
    await expect(drawer).not.toHaveAttribute("open", "");
  });
});
