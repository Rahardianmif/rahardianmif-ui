import {
  expect,
  test,
} from "@playwright/test";


test.setTimeout(
  60_000
);


const fixture =
  "/examples/navigation/tabs.html";


test.beforeEach(
  async ({ page }) => {
    await page.goto(
      fixture,
      {
        waitUntil:
          "domcontentloaded",
      }
    );
  }
);


test(
  "Tabs initialize with one selected Tab",
  async ({ page }) => {
    await expect(
      page.locator(
        "#tab-profile"
      )
    ).toHaveAttribute(
      "aria-selected",
      "true"
    );


    await expect(
      page.locator(
        "#tab-security"
      )
    ).toHaveAttribute(
      "aria-selected",
      "false"
    );
  }
);


test(
  "initial selected Panel is visible",
  async ({ page }) => {
    await expect(
      page.locator(
        "#panel-profile"
      )
    ).toBeVisible();


    await expect(
      page.locator(
        "#panel-security"
      )
    ).toBeHidden();
  }
);


test(
  "click activates another Tab",
  async ({ page }) => {
    await page
      .locator(
        "#tab-security"
      )
      .click();


    await expect(
      page.locator(
        "#tab-security"
      )
    ).toHaveAttribute(
      "aria-selected",
      "true"
    );


    await expect(
      page.locator(
        "#tab-profile"
      )
    ).toHaveAttribute(
      "aria-selected",
      "false"
    );
  }
);


test(
  "click switches visible Panel",
  async ({ page }) => {
    await page
      .locator(
        "#tab-security"
      )
      .click();


    await expect(
      page.locator(
        "#panel-security"
      )
    ).toBeVisible();


    await expect(
      page.locator(
        "#panel-profile"
      )
    ).toBeHidden();
  }
);


test(
  "Arrow Right automatically activates next Tab",
  async ({ page }) => {
    const profile =
      page.locator(
        "#tab-profile"
      );


    await profile.focus();


    await page.keyboard.press(
      "ArrowRight"
    );


    await expect(
      page.locator(
        "#tab-security"
      )
    ).toBeFocused();


    await expect(
      page.locator(
        "#tab-security"
      )
    ).toHaveAttribute(
      "aria-selected",
      "true"
    );


    await expect(
      page.locator(
        "#panel-security"
      )
    ).toBeVisible();
  }
);


test(
  "Arrow Left automatically activates previous Tab",
  async ({ page }) => {
    const security =
      page.locator(
        "#tab-security"
      );


    await security.click();

    await security.focus();


    await page.keyboard.press(
      "ArrowLeft"
    );


    await expect(
      page.locator(
        "#tab-profile"
      )
    ).toBeFocused();


    await expect(
      page.locator(
        "#tab-profile"
      )
    ).toHaveAttribute(
      "aria-selected",
      "true"
    );
  }
);


test(
  "Arrow Right wraps from last Tab to first",
  async ({ page }) => {
    const notifications =
      page.locator(
        "#tab-notifications"
      );


    await notifications.click();

    await notifications.focus();


    await page.keyboard.press(
      "ArrowRight"
    );


    await expect(
      page.locator(
        "#tab-profile"
      )
    ).toBeFocused();


    await expect(
      page.locator(
        "#tab-profile"
      )
    ).toHaveAttribute(
      "aria-selected",
      "true"
    );
  }
);


test(
  "Arrow Left wraps from first Tab to last",
  async ({ page }) => {
    const profile =
      page.locator(
        "#tab-profile"
      );


    await profile.focus();


    await page.keyboard.press(
      "ArrowLeft"
    );


    await expect(
      page.locator(
        "#tab-notifications"
      )
    ).toBeFocused();


    await expect(
      page.locator(
        "#tab-notifications"
      )
    ).toHaveAttribute(
      "aria-selected",
      "true"
    );
  }
);


test(
  "Home activates first Tab",
  async ({ page }) => {
    await page
      .locator(
        "#tab-notifications"
      )
      .click();


    await page
      .locator(
        "#tab-notifications"
      )
      .focus();


    await page.keyboard.press(
      "Home"
    );


    await expect(
      page.locator(
        "#tab-profile"
      )
    ).toBeFocused();


    await expect(
      page.locator(
        "#tab-profile"
      )
    ).toHaveAttribute(
      "aria-selected",
      "true"
    );
  }
);


test(
  "End activates last Tab",
  async ({ page }) => {
    await page
      .locator(
        "#tab-profile"
      )
      .focus();


    await page.keyboard.press(
      "End"
    );


    await expect(
      page.locator(
        "#tab-notifications"
      )
    ).toBeFocused();


    await expect(
      page.locator(
        "#tab-notifications"
      )
    ).toHaveAttribute(
      "aria-selected",
      "true"
    );
  }
);


test(
  "Tabs maintain roving tabindex",
  async ({ page }) => {
    await page
      .locator(
        "#tab-security"
      )
      .click();


    await expect(
      page.locator(
        "#tab-security"
      )
    ).toHaveAttribute(
      "tabindex",
      "0"
    );


    await expect(
      page.locator(
        "#tab-profile"
      )
    ).toHaveAttribute(
      "tabindex",
      "-1"
    );


    await expect(
      page.locator(
        "#tab-notifications"
      )
    ).toHaveAttribute(
      "tabindex",
      "-1"
    );
  }
);


test(
  "selected Tab uses Primary semantic indicator",
  async ({ page }) => {
    const result =
      await page
        .locator(
          "#tab-profile"
        )
        .evaluate(
          (element) => {
            const style =
              getComputedStyle(
                element
              );


            const token =
              style
                .getPropertyValue(
                  "--rm-primary"
                )
                .trim();


            const probe =
              document.createElement(
                "span"
              );


            probe.style.color =
              token;


            document.body.appendChild(
              probe
            );


            const expected =
              getComputedStyle(
                probe
              ).color;


            probe.remove();


            return {
              actual:
                style.borderBottomColor,

              expected,
            };
          }
        );


    expect(
      result.actual
    ).toBe(
      result.expected
    );
  }
);


test(
  "Dark selected Tab follows Dark Primary token",
  async ({ page }) => {
    const result =
      await page
        .locator(
          "#tab-dark-overview"
        )
        .evaluate(
          (element) => {
            const style =
              getComputedStyle(
                element
              );


            const token =
              style
                .getPropertyValue(
                  "--rm-primary"
                )
                .trim();


            const probe =
              document.createElement(
                "span"
              );


            probe.style.color =
              token;


            document.body.appendChild(
              probe
            );


            const expected =
              getComputedStyle(
                probe
              ).color;


            probe.remove();


            return {
              actual:
                style.borderBottomColor,

              expected,
            };
          }
        );


    expect(
      result.actual
    ).toBe(
      result.expected
    );
  }
);


test(
  "long Tabs remain inside narrow container",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 1000,
    });


    const container =
      page.locator(
        "#tabs-narrow-container"
      );


    const tabSet =
      page.locator(
        "#tabs-long"
      );


    const containerBox =
      await container.boundingBox();


    const tabSetBox =
      await tabSet.boundingBox();


    expect(
      containerBox
    ).not.toBeNull();


    expect(
      tabSetBox
    ).not.toBeNull();


    expect(
      tabSetBox.width
    ).toBeLessThanOrEqual(
      containerBox.width + 1
    );
  }
);


test(
  "long Tab list uses internal horizontal overflow",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 1000,
    });


    const result =
      await page
        .locator(
          "#tabs-long-list"
        )
        .evaluate(
          (element) => ({
            overflowX:
              getComputedStyle(
                element
              ).overflowX,

            scrollWidth:
              element.scrollWidth,

            clientWidth:
              element.clientWidth,
          })
        );


    expect(
      result.overflowX
    ).toBe(
      "auto"
    );


    expect(
      result.scrollWidth
    ).toBeGreaterThanOrEqual(
      result.clientWidth
    );
  }
);


test(
  "Tabs demo has no horizontal page overflow",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 1000,
    });


    const overflow =
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth
          >
          document.documentElement.clientWidth
      );


    expect(
      overflow
    ).toBe(false);
  }
);