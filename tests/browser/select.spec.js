import {
  expect,
  test,
} from "@playwright/test";


const fixture =
  "/examples/form/select.html";


test.beforeEach(
  async ({ page }) => {
    await page.goto(fixture);
  }
);


test(
  "Select sizes follow the locked control size contract",
  async ({ page }) => {
    await expect(
      page.locator("#select-sm")
    ).toHaveCSS(
      "height",
      "36px"
    );

    await expect(
      page.locator("#select-md")
    ).toHaveCSS(
      "height",
      "44px"
    );

    await expect(
      page.locator("#select-lg")
    ).toHaveCSS(
      "height",
      "52px"
    );
  }
);


test(
  "MD is the default Select size",
  async ({ page }) => {
    await expect(
      page.locator("#select-default")
    ).toHaveCSS(
      "height",
      "44px"
    );
  }
);


test(
  "label is associated with Select",
  async ({ page }) => {
    const select =
      page
        .getByLabel("Country")
        .first();

    await expect(
      select
    ).toHaveAttribute(
      "id",
      "select-default"
    );
  }
);


test(
  "native Select can change value",
  async ({ page }) => {
    const select =
      page.locator(
        "#select-default"
      );

    await select.selectOption("id");

    await expect(
      select
    ).toHaveValue("id");
  }
);


test(
  "disabled Select cannot be used",
  async ({ page }) => {
    await expect(
      page.locator(
        "#select-disabled"
      )
    ).toBeDisabled();
  }
);


test(
  "invalid Select exposes semantic validation",
  async ({ page }) => {
    const select =
      page.locator(
        "#select-invalid"
      );

    await expect(
      select
    ).toHaveAttribute(
      "aria-invalid",
      "true"
    );

    await expect(
      select
    ).toHaveAttribute(
      "aria-describedby",
      "select-invalid-message"
    );

    await expect(
      select
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

    const select =
      page.locator(
        "#select-default"
      );

    await expect(
      select
    ).toBeFocused();

    await expect(
      select
    ).toHaveCSS(
      "outline-width",
      "2px"
    );

    await expect(
      select
    ).toHaveCSS(
      "outline-style",
      "solid"
    );

    await expect(
      select
    ).toHaveCSS(
      "outline-offset",
      "2px"
    );
  }
);


test(
  "Select transition is removed for reduced motion",
  async ({ page }) => {
    await page.emulateMedia({
      reducedMotion: "reduce",
    });

    await page.goto(fixture);

    await expect(
      page.locator(
        "#select-default"
      )
    ).toHaveCSS(
      "transition-duration",
      "0s"
    );
  }
);