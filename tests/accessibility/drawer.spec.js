import AxeBuilder from "@axe-core/playwright";

import {
  expect,
  test,
} from "@playwright/test";


const seriousOrCritical = (
  results
) =>
  results.violations.filter(
    (violation) =>
      violation.impact === "serious"
      ||
      violation.impact === "critical"
  );


test.describe(
  "v0.5 Drawer accessibility",
  () => {
    /*
     * Axe may take longer on Firefox/WebKit.
     * This only extends execution time;
     * accessibility assertions remain unchanged.
     */
    test.setTimeout(
      60_000
    );


    test.beforeEach(
      async ({ page }) => {
        await page.goto(
          "/examples/overlay/drawer.html",
          {
            waitUntil:
              "domcontentloaded",

            timeout:
              45_000,
          }
        );
      }
    );


    test(
      "page has no serious or critical Axe violations",
      async ({ page }) => {
        const results =
          await new AxeBuilder({
            page,
          }).analyze();


        expect(
          seriousOrCritical(
            results
          )
        ).toEqual(
          []
        );
      }
    );


    test(
      "open Drawer has accessible naming and passes Axe",
      async ({ page }) => {
        const drawer =
          page
            .locator(
              "[data-rm-drawer]"
            )
            .first();


        const id =
          await drawer.getAttribute(
            "id"
          );


        expect(
          id
        ).toBeTruthy();


        const trigger =
          page.locator(
            `[data-rm-drawer-trigger="${id}"]`
          );


        await expect(
          trigger
        ).toBeVisible();


        await trigger.click();


        await expect(
          drawer
        ).toHaveAttribute(
          "open",
          ""
        );


        const labelledby =
          await drawer.getAttribute(
            "aria-labelledby"
          );


        const label =
          await drawer.getAttribute(
            "aria-label"
          );


        expect(
          Boolean(
            labelledby
            ||
            label
          )
        ).toBe(
          true
        );


        const results =
          await new AxeBuilder({
            page,
          }).analyze();


        expect(
          seriousOrCritical(
            results
          )
        ).toEqual(
          []
        );
      }
    );
  }
);