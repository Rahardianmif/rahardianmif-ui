import {
  expect,
  test,
} from "@playwright/test";


const url =
  "/examples/overlay/disclosure.html";


async function panelFor(
  page,
  trigger
) {
  const id =
    await trigger.getAttribute(
      "data-rm-disclosure-trigger"
    );


  expect(
    id
  ).toBeTruthy();


  return page.locator(
    `#${id}`
  );
}


test.describe(
  "v0.5 Disclosure + Accordion",
  () => {
    test.setTimeout(
      60_000
    );


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
            "[data-rm-disclosure-trigger]"
          ).first()
        ).toBeVisible();
      }
    );


    test(
      "standalone Disclosure toggles hidden and aria-expanded",
      async ({ page }) => {
        const trigger =
          page
            .locator(
              "[data-rm-disclosure-trigger]"
            )
            .first();


        const panel =
          await panelFor(
            page,
            trigger
          );


        await expect(
          panel
        ).toBeHidden();


        await expect(
          trigger
        ).toHaveAttribute(
          "aria-expanded",
          "false"
        );


        await trigger.click();


        await expect(
          panel
        ).toBeVisible();


        await expect(
          trigger
        ).toHaveAttribute(
          "aria-expanded",
          "true"
        );


        await trigger.click();


        await expect(
          panel
        ).toBeHidden();


        await expect(
          trigger
        ).toHaveAttribute(
          "aria-expanded",
          "false"
        );
      }
    );


    test(
      "initially open Disclosure syncs aria-expanded",
      async ({ page }) => {
        const panel =
          page.locator(
            "#initial-open-panel"
          );


        const trigger =
          page.locator(
            '[data-rm-disclosure-trigger="initial-open-panel"]'
          );


        await expect(
          panel
        ).toBeVisible();


        await expect(
          trigger
        ).toHaveAttribute(
          "aria-expanded",
          "true"
        );
      }
    );


    test(
      "disabled Disclosure does not toggle",
      async ({ page }) => {
        const trigger =
          page.locator(
            '[data-rm-disclosure-trigger="disabled-panel"]'
          );


        const panel =
          page.locator(
            "#disabled-panel"
          );


        await expect(
          trigger
        ).toBeDisabled();


        await trigger.evaluate(
          (element) =>
            element.click()
        );


        await expect(
          panel
        ).toBeHidden();


        await expect(
          trigger
        ).toHaveAttribute(
          "aria-expanded",
          "false"
        );
      }
    );


    test(
      "single Accordion closes previous item",
      async ({ page }) => {
        const account =
          page.locator(
            '[data-rm-disclosure-trigger="accordion-account"]'
          );


        const billing =
          page.locator(
            '[data-rm-disclosure-trigger="accordion-billing"]'
          );


        await expect(
          page.locator(
            "#accordion-account"
          )
        ).toBeVisible();


        await expect(
          account
        ).toHaveAttribute(
          "aria-expanded",
          "true"
        );


        await billing.click();


        await expect(
          page.locator(
            "#accordion-billing"
          )
        ).toBeVisible();


        await expect(
          page.locator(
            "#accordion-account"
          )
        ).toBeHidden();


        await expect(
          billing
        ).toHaveAttribute(
          "aria-expanded",
          "true"
        );


        await expect(
          account
        ).toHaveAttribute(
          "aria-expanded",
          "false"
        );
      }
    );


    test(
      "single Accordion is collapsible",
      async ({ page }) => {
        const account =
          page.locator(
            '[data-rm-disclosure-trigger="accordion-account"]'
          );


        await expect(
          page.locator(
            "#accordion-account"
          )
        ).toBeVisible();


        await account.click();


        await expect(
          page.locator(
            "#accordion-account"
          )
        ).toBeHidden();


        await expect(
          account
        ).toHaveAttribute(
          "aria-expanded",
          "false"
        );
      }
    );


    test(
      "multiple Accordion keeps multiple panels open",
      async ({ page }) => {
        const one =
          page.locator(
            "#multiple-one"
          );


        const two =
          page.locator(
            "#multiple-two"
          );


        const three =
          page.locator(
            "#multiple-three"
          );


        await expect(
          one
        ).toBeVisible();


        await expect(
          two
        ).toBeVisible();


        await page
          .locator(
            '[data-rm-disclosure-trigger="multiple-three"]'
          )
          .click();


        await expect(
          one
        ).toBeVisible();


        await expect(
          two
        ).toBeVisible();


        await expect(
          three
        ).toBeVisible();
      }
    );


    test(
      "Arrow navigation wraps",
      async ({ page }) => {
        const accordion =
          page
            .locator(
              '[data-rm-accordion-mode="single"]'
            )
            .first();


        const triggers =
          accordion.locator(
            "[data-rm-disclosure-trigger]:not(:disabled)"
          );


        await triggers
          .first()
          .focus();


        await page.keyboard.press(
          "ArrowUp"
        );


        await expect(
          triggers.last()
        ).toBeFocused();


        await page.keyboard.press(
          "ArrowDown"
        );


        await expect(
          triggers.first()
        ).toBeFocused();
      }
    );


    test(
      "Home and End move focus without toggling",
      async ({ page }) => {
        const accordion =
          page
            .locator(
              '[data-rm-accordion-mode="single"]'
            )
            .first();


        const triggers =
          accordion.locator(
            "[data-rm-disclosure-trigger]:not(:disabled)"
          );


        const second =
          triggers.nth(
            1
          );


        const secondPanel =
          await panelFor(
            page,
            second
          );


        const initialState =
          await second.getAttribute(
            "aria-expanded"
          );


        const initiallyHidden =
          await secondPanel.getAttribute(
            "hidden"
          );


        await second.focus();


        await page.keyboard.press(
          "End"
        );


        await expect(
          triggers.last()
        ).toBeFocused();


        await page.keyboard.press(
          "Home"
        );


        await expect(
          triggers.first()
        ).toBeFocused();


        /*
         * Navigation must not toggle any
         * Disclosure panel.
         */
        await expect(
          second
        ).toHaveAttribute(
          "aria-expanded",
          initialState
        );


        if (
          initiallyHidden !== null
        ) {
          await expect(
            secondPanel
          ).toBeHidden();
        } else {
          await expect(
            secondPanel
          ).toBeVisible();
        }
      }
    );
  }
);