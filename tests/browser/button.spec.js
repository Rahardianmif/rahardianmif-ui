import {
  expect,
  test,
} from "@playwright/test";


const fixture =
  "/examples/button/index.html";


test.beforeEach(
  async ({ page }) => {
    await page.goto(fixture);
  }
);


test(
  "Button sizes follow the control size contract",
  async ({ page }) => {
    await expect(
      page.locator("#button-sm")
    ).toHaveCSS(
      "height",
      "36px"
    );

    await expect(
      page.locator("#button-md")
    ).toHaveCSS(
      "height",
      "44px"
    );

    await expect(
      page.locator("#button-lg")
    ).toHaveCSS(
      "height",
      "52px"
    );
  }
);


test(
  "Primary uses semantic foreground and background",
  async ({ page }) => {
    const button =
      page.locator("#keyboard-button");

    await expect(button).toHaveCSS(
      "background-color",
      "rgb(8, 145, 178)"
    );

    await expect(button).toHaveCSS(
      "color",
      "rgb(15, 23, 42)"
    );
  }
);


test(
  "Dark Primary uses Dark semantic Primary",
  async ({ page }) => {
    const button =
      page.locator("#dark-primary");

    await expect(button).toHaveCSS(
      "background-color",
      "rgb(34, 211, 238)"
    );

    await expect(button).toHaveCSS(
      "color",
      "rgb(15, 23, 42)"
    );
  }
);


test(
  "Danger uses the semantic danger foreground",
  async ({ page }) => {
    const button =
      page.locator("#danger-button");

    await expect(button).toHaveCSS(
      "background-color",
      "rgb(220, 38, 38)"
    );

    await expect(button).toHaveCSS(
      "color",
      "rgb(248, 250, 252)"
    );
  }
);


test(
  "keyboard activates a native Button",
  async ({ page }) => {
    const button =
      page.locator("#keyboard-button");

    await page.evaluate(
      () => {
        window.rmButtonClicks = 0;

        document
          .getElementById(
            "keyboard-button"
          )
          .addEventListener(
            "click",
            () => {
              window.rmButtonClicks += 1;
            }
          );
      }
    );

    await button.focus();

    await button.press("Enter");
    await button.press("Space");

    const clicks =
      await page.evaluate(
        () =>
          window.rmButtonClicks
      );

    expect(clicks).toBe(2);
  }
);


test(
  "native disabled Button cannot activate",
  async ({ page }) => {
    await page.evaluate(
      () => {
        window.rmDisabledClicks = 0;

        const button =
          document.getElementById(
            "disabled-button"
          );

        button.addEventListener(
          "click",
          () => {
            window.rmDisabledClicks += 1;
          }
        );

        button.click();
      }
    );

    const clicks =
      await page.evaluate(
        () =>
          window.rmDisabledClicks
      );

    expect(clicks).toBe(0);
  }
);


test(
  "icon-only Button has an accessible name",
  async ({ page }) => {
    const button =
      page.locator("#icon-button");

    await expect(
      button
    ).toBeVisible();

    await expect(
      button
    ).toHaveAccessibleName(
      "Add item"
    );
  }
);


test(
  "loading state exposes aria-busy",
  async ({ page }) => {
    await expect(
      page.locator(
        "#loading-button"
      )
    ).toHaveAttribute(
      "aria-busy",
      "true"
    );
  }
);


test(
  "full-width modifier fills its container",
  async ({ page }) => {
    const buttonWidth =
      await page
        .locator(
          "#full-width-button"
        )
        .evaluate(
          (element) =>
            element.getBoundingClientRect()
              .width
        );

    const containerWidth =
      await page
        .locator(
          "#full-width-container"
        )
        .evaluate(
          (element) =>
            element.getBoundingClientRect()
              .width
        );

    expect(
      Math.abs(
        buttonWidth -
        containerWidth
      )
    ).toBeLessThan(1);
  }
);


test(
  "focus-visible uses the Button focus contract",
  async ({ page }) => {
    const button =
      page.locator(
        "#keyboard-button"
      );

    await button.focus();

    await expect(button).toHaveCSS(
      "outline-width",
      "2px"
    );

    await expect(button).toHaveCSS(
      "outline-style",
      "solid"
    );

    await expect(button).toHaveCSS(
      "outline-offset",
      "2px"
    );
  }
);


test(
  "Button transition is removed for reduced motion",
  async ({ page }) => {
    await page.emulateMedia({
      reducedMotion: "reduce",
    });

    await page.goto(fixture);

    await expect(
      page.locator(
        "#keyboard-button"
      )
    ).toHaveCSS(
      "transition-duration",
      "0s"
    );
  }
);