import {
  expect,
  test,
} from "@playwright/test";


const fixture =
  "/examples/form/validation.html";


test.beforeEach(
  async ({ page }) => {
    await page.goto(fixture);
  }
);


test(
  "required Input exposes native required state",
  async ({ page }) => {
    await expect(
      page.locator(
        "#validation-required"
      )
    ).toHaveAttribute(
      "required",
      ""
    );
  }
);


test(
  "valid Input uses Success border",
  async ({ page }) => {
    await expect(
      page.locator(
        "#validation-valid"
      )
    ).toHaveCSS(
      "border-color",
      "rgb(22, 163, 74)"
    );
  }
);


test(
  "invalid Input uses Danger border",
  async ({ page }) => {
    await expect(
      page.locator(
        "#validation-invalid"
      )
    ).toHaveCSS(
      "border-color",
      "rgb(220, 38, 38)"
    );
  }
);


test(
  "invalid Input exposes semantic error relationship",
  async ({ page }) => {
    const input =
      page.locator(
        "#validation-invalid"
      );

    await expect(
      input
    ).toHaveAttribute(
      "aria-invalid",
      "true"
    );

    await expect(
      input
    ).toHaveAttribute(
      "aria-describedby",
      "validation-invalid-message"
    );
  }
);


test(
  "valid Choice uses Success border",
  async ({ page }) => {
    const control =
      page.locator(
        "#validation-choice"
      ).locator(
        "xpath=following-sibling::*[contains(@class,'rm-choice__control')]"
      );

    await expect(
      control
    ).toHaveCSS(
      "border-color",
      "rgb(22, 163, 74)"
    );
  }
);


test(
  "invalid Switch uses Danger border",
  async ({ page }) => {
    const track =
      page.locator(
        "#validation-switch-invalid"
      ).locator(
        "xpath=following-sibling::*[contains(@class,'rm-switch__track')]"
      );

    await expect(
      track
    ).toHaveCSS(
      "border-color",
      "rgb(220, 38, 38)"
    );
  }
);