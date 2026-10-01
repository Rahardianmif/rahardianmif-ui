import {
  expect,
  test,
} from "@playwright/test";


const fixture =
  "/examples/form/textarea.html";


test.beforeEach(
  async ({ page }) => {
    await page.goto(fixture);
  }
);


test(
  "Textarea sizes follow the locked minimum heights",
  async ({ page }) => {
    await expect(
      page.locator("#textarea-sm")
    ).toHaveCSS(
      "min-height",
      "96px"
    );

    await expect(
      page.locator("#textarea-md")
    ).toHaveCSS(
      "min-height",
      "120px"
    );

    await expect(
      page.locator("#textarea-lg")
    ).toHaveCSS(
      "min-height",
      "144px"
    );
  }
);


test(
  "MD is the default Textarea size",
  async ({ page }) => {
    await expect(
      page.locator("#textarea-default")
    ).toHaveCSS(
      "min-height",
      "120px"
    );
  }
);


test(
  "Textarea allows vertical resize only",
  async ({ page }) => {
    await expect(
      page.locator("#textarea-default")
    ).toHaveCSS(
      "resize",
      "vertical"
    );
  }
);


test(
  "readonly Textarea remains focusable",
  async ({ page }) => {
    const textarea =
      page.locator("#textarea-readonly");

    await textarea.focus();

    await expect(
      textarea
    ).toBeFocused();
  }
);


test(
  "disabled Textarea cannot receive focus",
  async ({ page }) => {
    const textarea =
      page.locator("#textarea-disabled");

    await expect(
      textarea
    ).toBeDisabled();

    await textarea.focus();

    await expect(
      textarea
    ).not.toBeFocused();
  }
);


test(
  "invalid Textarea exposes semantic validation",
  async ({ page }) => {
    const textarea =
      page.locator("#textarea-invalid");

    await expect(
      textarea
    ).toHaveAttribute(
      "aria-invalid",
      "true"
    );

    await expect(
      textarea
    ).toHaveAttribute(
      "aria-describedby",
      "textarea-invalid-message"
    );

    await expect(
      textarea
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

    const textarea =
      page.locator("#textarea-default");

    await expect(
      textarea
    ).toBeFocused();

    await expect(
      textarea
    ).toHaveCSS(
      "outline-width",
      "2px"
    );

    await expect(
      textarea
    ).toHaveCSS(
      "outline-style",
      "solid"
    );

    await expect(
      textarea
    ).toHaveCSS(
      "outline-offset",
      "2px"
    );
  }
);


test(
  "Textarea transition is removed for reduced motion",
  async ({ page }) => {
    await page.emulateMedia({
      reducedMotion: "reduce",
    });

    await page.goto(fixture);

    await expect(
      page.locator(
        "#textarea-default"
      )
    ).toHaveCSS(
      "transition-duration",
      "0s"
    );
  }
);