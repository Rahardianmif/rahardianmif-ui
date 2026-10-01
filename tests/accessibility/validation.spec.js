import {
  expect,
  test,
} from "@playwright/test";

import AxeBuilder
  from "@axe-core/playwright";


test.setTimeout(60_000);


test(
  "Validation demo has no detectable accessibility violations",
  async ({ page }) => {
    await page.goto(
      "/examples/form/validation.html"
    );

    const results =
      await new AxeBuilder({
        page,
      }).analyze();

    expect(
      results.violations
    ).toEqual([]);
  }
);