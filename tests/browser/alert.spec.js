import {
  expect,
  test,
} from "@playwright/test";


const fixture =
  "/examples/alert/index.html";


test.beforeEach(
  async ({ page }) => {
    await page.goto(fixture);
  }
);


test(
  "Neutral Alert uses the semantic surface",
  async ({ page }) => {
    await expect(
      page.locator(
        "#alert-neutral"
      )
    ).toHaveCSS(
      "background-color",
      "rgb(255, 255, 255)"
    );
  }
);


test(
  "Info Alert uses the Info semantic border",
  async ({ page }) => {
    await expect(
      page.locator(
        "#alert-info"
      )
    ).toHaveCSS(
      "border-color",
      "rgb(37, 99, 235)"
    );
  }
);


test(
  "Success Alert uses the Success semantic border",
  async ({ page }) => {
    await expect(
      page.locator(
        "#alert-success"
      )
    ).toHaveCSS(
      "border-color",
      "rgb(22, 163, 74)"
    );
  }
);


test(
  "Warning Alert uses the Warning semantic border",
  async ({ page }) => {
    await expect(
      page.locator(
        "#alert-warning"
      )
    ).toHaveCSS(
      "border-color",
      "rgb(217, 119, 6)"
    );
  }
);


test(
  "Danger Alert uses the Danger semantic border",
  async ({ page }) => {
    await expect(
      page.locator(
        "#alert-danger"
      )
    ).toHaveCSS(
      "border-color",
      "rgb(220, 38, 38)"
    );
  }
);


test(
  "Dark Alert follows Dark semantic surface",
  async ({ page }) => {
    await expect(
      page.locator(
        "#alert-dark-neutral"
      )
    ).toHaveCSS(
      "background-color",
      "rgb(15, 27, 45)"
    );
  }
);


test(
  "Dark Info Alert keeps Info semantic identity",
  async ({ page }) => {
    await expect(
      page.locator(
        "#alert-dark-info"
      )
    ).toHaveCSS(
      "border-color",
      "rgb(37, 99, 235)"
    );
  }
);


test(
  "Alert container is not focusable",
  async ({ page }) => {
    const tabIndex =
      await page
        .locator(
          "#alert-neutral"
        )
        .evaluate(
          (element) =>
            element.tabIndex
        );


    expect(
      tabIndex
    ).toBe(-1);
  }
);


test(
  "Alert action retains native keyboard focus",
  async ({ page }) => {
    const button =
      page.locator(
        "#alert-retry"
      );


    await button.focus();


    await expect(
      button
    ).toBeFocused();
  }
);


test(
  "long Alert content remains inside narrow container",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 1000,
    });


    const alertBox =
      await page
        .locator(
          "#alert-long"
        )
        .boundingBox();

    const containerBox =
      await page
        .locator(
          "#alert-narrow-container"
        )
        .boundingBox();


    expect(
      alertBox
    ).not.toBeNull();

    expect(
      containerBox
    ).not.toBeNull();


    expect(
      alertBox.width
    ).toBeLessThanOrEqual(
      containerBox.width + 1
    );
  }
);


test(
  "Alert actions do not overflow on narrow viewport",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 1000,
    });


    const actions =
      page.locator(
        "#alert-long .rm-alert__actions"
      );


    const overflow =
      await actions.evaluate(
        (element) =>
          element.scrollWidth
          >
          element.clientWidth
      );


    expect(
      overflow
    ).toBe(false);
  }
);


test(
  "Alert demo has no horizontal page overflow",
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