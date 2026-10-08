import {
  expect,
  test,
} from "@playwright/test";


const url =
  "/examples/overlay/popover.html";


async function pair(
  page,
  index = 0
) {
  const trigger =
    page
      .locator(
        "[data-rm-popover-trigger]"
      )
      .nth(
        index
      );


  const id =
    await trigger.getAttribute(
      "data-rm-popover-trigger"
    );


  expect(
    id
  ).toBeTruthy();


  return {
    trigger,

    popover:
      page.locator(
        `#${id}`
      ),
  };
}


async function expectOpen(
  locator,
  open = true
) {
  await expect
    .poll(
      () =>
        locator.evaluate(
          (element) =>
            element.matches(
              ":popover-open"
            )
        ),
      {
        timeout:
          10_000,
      }
    )
    .toBe(
      open
    );
}


async function expectFocused(
  locator
) {
  await expect
    .poll(
      () =>
        locator.evaluate(
          (element) =>
            document.activeElement
            ===
            element
        ),
      {
        timeout:
          10_000,
      }
    )
    .toBe(
      true
    );
}


test.describe(
  "v0.5 Popover",
  () => {
    /*
     * Firefox cold-start and native
     * Popover processing can take longer
     * than Chromium/WebKit.
     */
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
            "[data-rm-popover-trigger]"
          ).first()
        ).toBeVisible();
      }
    );


    test(
      "trigger toggles and syncs aria-expanded",
      async ({ page }) => {
        const {
          trigger,
          popover,
        } =
          await pair(
            page
          );


        await expect(
          trigger
        ).toHaveAttribute(
          "aria-expanded",
          "false"
        );


        await trigger.click();


        await expectOpen(
          popover
        );


        await expect(
          trigger
        ).toHaveAttribute(
          "aria-expanded",
          "true"
        );


        await trigger.click();


        await expectOpen(
          popover,
          false
        );


        await expect(
          trigger
        ).toHaveAttribute(
          "aria-expanded",
          "false"
        );
      }
    );


    test(
      "explicit close restores focus when focus was inside",
      async ({ page }) => {
        const {
          trigger,
          popover,
        } =
          await pair(
            page
          );


        await trigger.click();


        await expectOpen(
          popover
        );


        const close =
          popover
            .locator(
              "[data-rm-popover-close]"
            )
            .first();


        await expect(
          close
        ).toBeVisible();


        await close.focus();


        await expect(
          close
        ).toBeFocused();


        await close.click();


        await expectOpen(
          popover,
          false
        );


        /*
         * Focus restoration can complete
         * asynchronously after the native
         * Popover close lifecycle,
         * particularly in WebKit.
         */
        await expectFocused(
          trigger
        );
      }
    );


    test(
      "Escape closes active Popover",
      async ({ page }) => {
        const {
          trigger,
          popover,
        } =
          await pair(
            page
          );


        await trigger.click();


        await expectOpen(
          popover
        );


        await page.keyboard.press(
          "Escape"
        );


        await expectOpen(
          popover,
          false
        );
      }
    );


    test(
      "outside pointer closes",
      async ({ page }) => {
        const {
          trigger,
          popover,
        } =
          await pair(
            page
          );


        await trigger.click();


        await expectOpen(
          popover
        );


        await page.mouse.click(
          2,
          2
        );


        await expectOpen(
          popover,
          false
        );
      }
    );


    test(
      "only one root Popover remains open",
      async ({ page }) => {
        const first =
          await pair(
            page,
            0
          );


        const second =
          await pair(
            page,
            1
          );


        await first.trigger.click();


        await expectOpen(
          first.popover
        );


        await second.trigger.click();


        await expectOpen(
          second.popover
        );


        await expectOpen(
          first.popover,
          false
        );
      }
    );


    test(
      "writes floating coordinates",
      async ({ page }) => {
        const {
          trigger,
          popover,
        } =
          await pair(
            page
          );


        await trigger.click();


        await expectOpen(
          popover
        );


        const state =
          await popover.evaluate(
            (element) => ({
              left:
                element.style.left,

              top:
                element.style.top,
            })
          );


        expect(
          state.left
        ).not.toBe(
          ""
        );


        expect(
          state.top
        ).not.toBe(
          ""
        );
      }
    );
  }
);