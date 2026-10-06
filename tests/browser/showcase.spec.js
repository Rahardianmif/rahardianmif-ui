import {
  expect,
  test,
} from "@playwright/test";


const fixture =
  "/examples/index.html";


test.beforeEach(
  async ({ page }) => {
    await page.goto(
      fixture
    );
  }
);


test(
  "v0.3 cumulative showcase loads",
  async ({ page }) => {
    await expect(
      page.getByRole(
        "heading",
        {
          level: 1,
          name:
            "v0.3 — Cards + Feedback",
        }
      )
    ).toBeVisible();
  }
);


test(
  "showcase contains Light and Dark previews",
  async ({ page }) => {
    await expect(
      page.locator(
        '.rm-showcase__theme[data-rm-theme="light"]'
      )
    ).toBeVisible();


    await expect(
      page.locator(
        '.rm-showcase__theme[data-rm-theme="dark"]'
      )
    ).toBeVisible();
  }
);


test(
  "showcase represents frozen v0.2 component families",
  async ({ page }) => {
    const pageText =
      await page
        .locator(
          "main"
        )
        .innerText();


    const expected = [
      "Button",
      "Input",
      "Textarea",
      "Native Select",
      "Checkbox + Radio",
      "Switch",
      "Validation",
    ];


    for (
      const name
      of expected
    ) {
      expect(
        pageText
      ).toContain(
        name
      );
    }
  }
);


test(
  "showcase represents all v0.3 component families",
  async ({ page }) => {
    const selectors = [
      ".rm-badge",
      ".rm-status",
      ".rm-card",
      ".rm-alert",
      ".rm-spinner",
      ".rm-inline-loader",
      ".rm-progress",
      ".rm-skeleton",
      ".rm-feedback-state",
    ];


    for (
      const selector
      of selectors
    ) {
      await expect(
        page.locator(
          selector
        ).first()
      ).toBeVisible();
    }
  }
);


test(
  "showcase native controls remain interactive",
  async ({ page }) => {
    const checkbox =
      page.locator(
        "#showcase-checkbox"
      );


    await expect(
      checkbox
    ).toBeChecked();


    const label =
      checkbox.locator(
        "xpath=ancestor::label[1]"
      );


    await label.click();


    await expect(
      checkbox
    ).not.toBeChecked();


    await label.click();


    await expect(
      checkbox
    ).toBeChecked();
  }
);


test(
  "showcase keyboard focus remains visible",
  async ({ page }) => {
    const firstLink =
      page
        .locator(
          ".rm-showcase__nav a"
        )
        .first();


    /*
     * Establish keyboard modality before
     * programmatic focus.
     *
     * This keeps focus-visible behavior
     * consistent across browser engines.
     */
    await page.keyboard.press(
      "Tab"
    );


    await firstLink.focus();


    await expect(
      firstLink
    ).toBeFocused();


    await expect(
      firstLink
    ).toHaveCSS(
      "outline-width",
      "2px"
    );


    await expect(
      firstLink
    ).toHaveCSS(
      "outline-style",
      "solid"
    );


    await expect(
      firstLink
    ).toHaveCSS(
      "outline-offset",
      "2px"
    );
  }
);


test(
  "Light showcase Progress exposes determinate semantics",
  async ({ page }) => {
    const progress =
      page.locator(
        "#showcase-progress-light"
      );


    await expect(
      progress
    ).toHaveAttribute(
      "role",
      "progressbar"
    );


    await expect(
      progress
    ).toHaveAccessibleName(
      "Uploading documents"
    );


    await expect(
      progress
    ).toHaveAttribute(
      "aria-valuemin",
      "0"
    );


    await expect(
      progress
    ).toHaveAttribute(
      "aria-valuemax",
      "100"
    );


    await expect(
      progress
    ).toHaveAttribute(
      "aria-valuenow",
      "65"
    );
  }
);


test(
  "Dark showcase Progress exposes determinate semantics",
  async ({ page }) => {
    const progress =
      page.locator(
        "#showcase-progress-dark"
      );


    await expect(
      progress
    ).toHaveAccessibleName(
      "Processing dark theme data"
    );


    await expect(
      progress
    ).toHaveAttribute(
      "aria-valuenow",
      "50"
    );
  }
);


test(
  "Skeleton uses shimmer in normal motion mode",
  async ({ page }) => {
    const skeleton =
      page
        .locator(
          ".rm-skeleton"
        )
        .first();


    await expect(
      skeleton
    ).toHaveCSS(
      "animation-name",
      "rm-skeleton-shimmer"
    );
  }
);


test(
  "Skeleton stops motion when Reduced Motion is enabled",
  async ({ page }) => {
    await page.emulateMedia({
      reducedMotion: "reduce",
    });


    const skeleton =
      page
        .locator(
          ".rm-skeleton"
        )
        .first();


    await expect(
      skeleton
    ).toHaveCSS(
      "animation-name",
      "none"
    );
  }
);


test(
  "showcase remains free from horizontal overflow",
  async ({ page }) => {
    await page.setViewportSize({
      width: 360,
      height: 1200,
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