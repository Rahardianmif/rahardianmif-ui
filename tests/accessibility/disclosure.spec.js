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
  "v0.5 Disclosure + Accordion accessibility",
  () => {
    test.setTimeout(
      60_000
    );


    test.beforeEach(
      async ({ page }) => {
        await page.goto(
          "/examples/overlay/disclosure.html",
          {
            waitUntil:
              "domcontentloaded",

            timeout:
              45_000,
          }
        );


        await expect(
          page.locator(
            "[data-rm-disclosure-trigger]"
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
      "Disclosure trigger exposes valid ARIA relationship",
      async ({ page }) => {
        const trigger =
          page
            .locator(
              "[data-rm-disclosure-trigger]"
            )
            .first();


        const panelId =
          await trigger.getAttribute(
            "data-rm-disclosure-trigger"
          );


        expect(
          panelId
        ).toBeTruthy();


        await expect(
          trigger
        ).toHaveAttribute(
          "aria-controls",
          panelId
        );


        await expect(
          trigger
        ).toHaveAttribute(
          "aria-expanded",
          /^(true|false)$/
        );


        await expect(
          page.locator(
            `#${panelId}`
          )
        ).toHaveCount(
          1
        );
      }
    );
  }
);