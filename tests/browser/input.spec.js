import {
  expect,
  test,
} from "@playwright/test";


const fixture =
  "/examples/form/index.html";


test.beforeEach(
  async ({ page }) => {
    await page.goto(fixture);
  }
);


test(
  "Input sizes follow the locked control size contract",
  async ({ page }) => {
    await expect(
      page.locator("#input-sm")
    ).toHaveCSS(
      "height",
      "36px"
    );

    await expect(
      page.locator("#input-md")
    ).toHaveCSS(
      "height",
      "44px"
    );

    await expect(
      page.locator("#input-lg")
    ).toHaveCSS(
      "height",
      "52px"
    );
  }
);


test(
  "MD is the default Input size",
  async ({ page }) => {
    await expect(
      page.locator("#input-text")
    ).toHaveCSS(
      "height",
      "44px"
    );
  }
);


test(
  "label is associated with its Input",
  async ({ page }) => {
    const input =
      page.getByLabel("Full name").first();

    await expect(
      input
    ).toHaveAttribute(
      "id",
      "input-text"
    );
  }
);


test(
  "readonly Input remains focusable",
  async ({ page }) => {
    const input =
      page.locator("#input-readonly");

    await input.focus();

    await expect(
      input
    ).toBeFocused();
  }
);


test(
  "disabled Input cannot receive focus",
  async ({ page }) => {
    const input =
      page.locator("#input-disabled");

    await expect(
      input
    ).toBeDisabled();

    await input.focus();

    await expect(
      input
    ).not.toBeFocused();
  }
);


test(
  "invalid Input exposes semantic validation state",
  async ({ page }) => {
    const input =
      page.locator("#input-invalid");

    await expect(input).toHaveAttribute(
      "aria-invalid",
      "true"
    );

    await expect(input).toHaveAttribute(
      "aria-describedby",
      "input-invalid-message"
    );
  }
);


test(
  "invalid Input uses Danger border",
  async ({ page }) => {
    await expect(
      page.locator("#input-invalid")
    ).toHaveCSS(
      "border-color",
      "rgb(220, 38, 38)"
    );
  }
);


test(
  "keyboard focus uses the locked focus contract",
  async ({ page }) => {
    await page.keyboard.press("Tab");

    const input =
      page.locator("#input-text");

    await expect(
      input
    ).toBeFocused();

    await expect(input).toHaveCSS(
      "outline-width",
      "2px"
    );

    await expect(input).toHaveCSS(
      "outline-style",
      "solid"
    );

    await expect(input).toHaveCSS(
      "outline-offset",
      "2px"
    );
  }
);


test(
  "Input transition is removed for reduced motion",
  async ({ page }) => {
    await page.emulateMedia({
      reducedMotion: "reduce",
    });

    await page.goto(fixture);

    await expect(
      page.locator("#input-text")
    ).toHaveCSS(
      "transition-duration",
      "0s"
    );
  }
);