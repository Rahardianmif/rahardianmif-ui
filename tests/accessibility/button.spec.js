import {
  expect,
  test,
} from "@playwright/test";

import AxeBuilder
  from "@axe-core/playwright";

test.setTimeout(60_000);

const fixture =
  "/examples/button/index.html";


test(
  "Button demo has no detectable accessibility violations",
  async ({ page }) => {
    await page.goto(fixture);

    const results =
      await new AxeBuilder({
        page,
      }).analyze();

    expect(
      results.violations
    ).toEqual([]);
  }
);