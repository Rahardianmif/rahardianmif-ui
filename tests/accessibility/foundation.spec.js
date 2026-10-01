import {
  expect,
  test,
} from "@playwright/test";

import AxeBuilder
  from "@axe-core/playwright";

test.setTimeout(60_000);

const fixture =
  "/tests/browser/fixtures/theme.html";


async function openTheme(
  page,
  preference
) {
  await page.addInitScript(
    (theme) => {
      localStorage.setItem(
        "rm-theme",
        theme
      );
    },
    preference
  );

  await page.goto(fixture);

  await page.waitForFunction(
    () =>
      window.rmTestThemeReady === true
  );
}


for (
  const theme
  of ["light", "dark"]
) {
  test(
    `${theme} foundation fixture has no detectable accessibility violations`,
    async ({ page }) => {
      await openTheme(
        page,
        theme
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
}