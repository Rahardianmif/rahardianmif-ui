import {
  expect,
  test,
} from "@playwright/test";


const fixture =
  "/examples/loading/spinner-inline-loader.html";


test.beforeEach(
  async ({ page }) => {
    await page.goto(fixture);
  }
);


test(
  "Spinner sizes follow the locked size contract",
  async ({ page }) => {
    await expect(
      page.locator(
        "#spinner-sm"
      )
    ).toHaveCSS(
      "width",
      "16px"
    );

    await expect(
      page.locator(
        "#spinner-md"
      )
    ).toHaveCSS(
      "width",
      "20px"
    );

    await expect(
      page.locator(
        "#spinner-lg"
      )
    ).toHaveCSS(
      "width",
      "24px"
    );
  }
);


test(
  "Spinner remains circular",
  async ({ page }) => {
    const spinner =
      page.locator(
        "#spinner-md"
      );


    await expect(
      spinner
    ).toHaveCSS(
      "border-radius",
      "50%"
    );
  }
);


test(
  "Spinner uses the locked rotation animation",
  async ({ page }) => {
    await expect(
      page.locator(
        "#spinner-md"
      )
    ).toHaveCSS(
      "animation-name",
      "rm-spinner-rotate"
    );
  }
);


test(
  "Inline Loader exposes its visible loading label",
  async ({ page }) => {
    await expect(
      page.locator(
        "#inline-loading"
      )
    ).toContainText(
      "Loading..."
    );

    await expect(
      page.locator(
        "#inline-saving"
      )
    ).toContainText(
      "Saving changes..."
    );
  }
);


test(
  "Spinner follows Button foreground through currentColor",
  async ({ page }) => {
    const buttonColor =
      await page
        .locator(
          "#spinner-button"
        )
        .evaluate(
          (element) =>
            getComputedStyle(
              element
            ).color
        );


    const spinnerColor =
      await page
        .locator(
          "#spinner-button-icon"
        )
        .evaluate(
          (element) =>
            getComputedStyle(
              element
            ).borderTopColor
        );


    expect(
      spinnerColor
    ).toBe(
      buttonColor
    );
  }
);


test(
  "Dark Inline Loader follows Dark semantic text",
  async ({ page }) => {
    await expect(
      page.locator(
        "#inline-dark"
      )
    ).toHaveCSS(
      "color",
      "rgb(203, 213, 225)"
    );
  }
);


test(
  "Spinner remains non-focusable",
  async ({ page }) => {
    const tabIndex =
      await page
        .locator(
          "#spinner-md"
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
  "long Inline Loader content remains inside narrow container",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 900,
    });


    const loaderBox =
      await page
        .locator(
          "#inline-long"
        )
        .boundingBox();

    const containerBox =
      await page
        .locator(
          "#inline-narrow-container"
        )
        .boundingBox();


    expect(
      loaderBox
    ).not.toBeNull();

    expect(
      containerBox
    ).not.toBeNull();


    expect(
      loaderBox.width
    ).toBeLessThanOrEqual(
      containerBox.width + 1
    );
  }
);


test(
  "Reduced Motion substantially slows Spinner animation",
  async ({ page }) => {
    const normalDuration =
      await page
        .locator(
          "#spinner-md"
        )
        .evaluate(
          (element) =>
            getComputedStyle(
              element
            ).animationDuration
        );


    await page.emulateMedia({
      reducedMotion: "reduce",
    });


    const reducedDuration =
      await page
        .locator(
          "#spinner-md"
        )
        .evaluate(
          (element) =>
            getComputedStyle(
              element
            ).animationDuration
        );


    const toSeconds =
      (value) => {
        if (
          value.endsWith(
            "ms"
          )
        ) {
          return (
            Number.parseFloat(
              value
            )
            / 1000
          );
        }

        return Number.parseFloat(
          value
        );
      };


    expect(
      toSeconds(
        reducedDuration
      )
    ).toBeGreaterThan(
      toSeconds(
        normalDuration
      )
    );
  }
);


test(
  "v0.3.4 demo has no horizontal page overflow",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 900,
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