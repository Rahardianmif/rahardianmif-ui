import {
  expect,
  test,
} from "@playwright/test";


const fixture =
  "/examples/form/switch.html";


test.beforeEach(
  async ({ page }) => {
    await page.goto(fixture);
  }
);


test(
  "Switch sizes follow the locked track contract",
  async ({ page }) => {
    const sm =
      page.locator("#switch-sm")
        .locator(
          "xpath=following-sibling::*[contains(@class,'rm-switch__track')]"
        );

    const md =
      page.locator("#switch-md")
        .locator(
          "xpath=following-sibling::*[contains(@class,'rm-switch__track')]"
        );

    const lg =
      page.locator("#switch-lg")
        .locator(
          "xpath=following-sibling::*[contains(@class,'rm-switch__track')]"
        );

    await expect(sm).toHaveCSS(
      "width",
      "32px"
    );

    await expect(sm).toHaveCSS(
      "height",
      "18px"
    );

    await expect(md).toHaveCSS(
      "width",
      "40px"
    );

    await expect(md).toHaveCSS(
      "height",
      "22px"
    );

    await expect(lg).toHaveCSS(
      "width",
      "48px"
    );

    await expect(lg).toHaveCSS(
      "height",
      "26px"
    );
  }
);


test(
  "Space toggles native Switch checkbox",
  async ({ page }) => {
    const toggle =
      page.locator(
        "#switch-default"
      );

    await toggle.focus();

    await toggle.press("Space");

    await expect(
      toggle
    ).toBeChecked();

    await toggle.press("Space");

    await expect(
      toggle
    ).not.toBeChecked();
  }
);


test(
  "checked Switch uses Primary track",
  async ({ page }) => {
    const track =
      page.locator(
        "#switch-checked"
      ).locator(
        "xpath=following-sibling::*[contains(@class,'rm-switch__track')]"
      );

    await expect(
      track
    ).toHaveCSS(
      "background-color",
      "rgb(8, 145, 178)"
    );
  }
);


test(
  "disabled Switch cannot be activated",
  async ({ page }) => {
    await expect(
      page.locator(
        "#switch-disabled"
      )
    ).toBeDisabled();
  }
);


test(
  "invalid Switch exposes semantic validation",
  async ({ page }) => {
    const toggle =
      page.locator(
        "#switch-invalid"
      );

    await expect(
      toggle
    ).toHaveAttribute(
      "aria-invalid",
      "true"
    );

    await expect(
      toggle
    ).toHaveAttribute(
      "aria-describedby",
      "switch-invalid-message"
    );
  }
);


test(
  "keyboard focus uses the locked focus contract",
  async ({ page }) => {
    await page.keyboard.press("Tab");

    const toggle =
      page.locator(
        "#switch-default"
      );

    await expect(
      toggle
    ).toBeFocused();

    const track =
      toggle.locator(
        "xpath=following-sibling::*[contains(@class,'rm-switch__track')]"
      );

    await expect(
      track
    ).toHaveCSS(
      "outline-width",
      "2px"
    );

    await expect(
      track
    ).toHaveCSS(
      "outline-style",
      "solid"
    );

    await expect(
      track
    ).toHaveCSS(
      "outline-offset",
      "2px"
    );
  }
);


test(
  "Switch motion is removed for reduced motion",
  async ({ page }) => {
    await page.emulateMedia({
      reducedMotion: "reduce",
    });

    await page.goto(fixture);

    const track =
      page.locator(
        "#switch-default"
      ).locator(
        "xpath=following-sibling::*[contains(@class,'rm-switch__track')]"
      );

    const thumb =
      track.locator(
        ".rm-switch__thumb"
      );

    await expect(
      track
    ).toHaveCSS(
      "transition-duration",
      "0s"
    );

    await expect(
      thumb
    ).toHaveCSS(
      "transition-duration",
      "0s"
    );
  }
);

test(
  "Switch keeps native checkbox semantics",
  async ({ page }) => {
    const toggle =
      page.locator(
        "#switch-default"
      );

    await expect(
      toggle
    ).toHaveAttribute(
      "type",
      "checkbox"
    );

    await expect(
      toggle
    ).not.toHaveAttribute(
      "role",
      "switch"
    );
  }
);