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
  "v0.5 Tooltip accessibility",
  () => {
    /*
     * Firefox may need more time for
     * page startup and Axe execution.
     */
    test.setTimeout(
      60_000
    );


    test.beforeEach(
      async ({ page }) => {
        await page.goto(
          "/examples/overlay/tooltip.html",
          {
            waitUntil:
              "domcontentloaded",

            timeout:
              45_000,
          }
        );


        await expect(
          page.locator(
            "[data-rm-tooltip-trigger]"
          ).first()
        ).toBeVisible();
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
      "trigger references role=tooltip",
      async ({ page }) => {
        const trigger =
          page
            .locator(
              "[data-rm-tooltip-trigger]"
            )
            .first();


        const tooltipId =
          await trigger.getAttribute(
            "aria-describedby"
          );


        expect(
          tooltipId
        ).toBeTruthy();


        const tooltip =
          page.locator(
            `#${tooltipId}`
          );


        await expect(
          tooltip
        ).toHaveCount(
          1
        );


        await expect(
          tooltip
        ).toHaveAttribute(
          "role",
          "tooltip"
        );


        /*
         * Verify the interactive trigger
         * references the same Tooltip
         * controlled by the library hook.
         */
        await expect(
          trigger
        ).toHaveAttribute(
          "data-rm-tooltip-trigger",
          tooltipId
        );
      }
    );
  }
);