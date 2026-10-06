import {
  expect,
  test,
} from "@playwright/test";


test.setTimeout(
  60_000
);


const fixture =
  "/examples/index.html";


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
  "v0.4 cumulative showcase loads",
  async ({ page }) => {
    await expect(
      page.getByRole(
        "heading",
        {
          level: 1,
          name:
            "v0.4 — Navigation",
          exact: true,
        }
      )
    ).toBeVisible();
  }
);


test(
  "showcase contains Light and Dark themes",
  async ({ page }) => {
    await expect(
      page.locator(
        "#showcase-light"
      )
    ).toBeVisible();


    await expect(
      page.locator(
        "#showcase-dark"
      )
    ).toBeVisible();
  }
);


test(
  "showcase exposes cumulative v0.2 v0.3 and v0.4 component families",
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

      "Badge + Status Indicator",
      "Card Core",
      "Alert",
      "Spinner + Inline Loader",
      "Progress Bar",
      "Skeleton",
      "Feedback States",

      "Breadcrumb",
      "Tabs",
      "Pagination",
      "Navbar",
      "Sidebar",
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
  "showcase native v0.2 controls remain interactive",
  async ({ page }) => {
    /*
     * Keep the frozen v0.2 interaction contract.
     *
     * Choice uses a native checkbox wrapped by
     * its label. Clicking the label is the
     * intended pointer interaction.
     */
    const checkbox =
      page
        .locator(
          ".rm-checkbox"
        )
        .first();


    const label =
      checkbox.locator(
        "xpath=ancestor::label[1]"
      );


    await expect(
      checkbox
    ).toBeChecked();


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
     * Establish keyboard modality.
     *
     * WebKit does not always move the first
     * native Tab directly to a link.
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
  "Light progress remains determinate",
  async ({ page }) => {
    const progress =
      page.locator(
        "#showcase-progress-light [role='progressbar']"
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
  "Dark progress remains determinate",
  async ({ page }) => {
    const progress =
      page.locator(
        "#showcase-progress-dark [role='progressbar']"
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
  "showcase Skeleton remains available when reduced motion is not requested",
  async ({ page }) => {
    await page.emulateMedia({
      reducedMotion:
        "no-preference",
    });


    await page.reload({
      waitUntil:
        "domcontentloaded",
    });


    const skeleton =
      page.locator(
        "#showcase-skeleton-animation"
      );


    await expect(
      skeleton
    ).toBeVisible();


    await expect(
      skeleton
    ).toHaveClass(
      /rm-skeleton/
    );


    await expect(
      skeleton
    ).toHaveClass(
      /rm-skeleton--text/
    );


    const container =
      page.locator(
        "#showcase-skeleton-light"
      );


    await expect(
      container
    ).toHaveAttribute(
      "aria-busy",
      "true"
    );
  }
);


test(
  "Skeleton shimmer stops when reduced motion is requested",
  async ({ page }) => {
    /*
     * This follows the frozen v0.3 Skeleton
     * contract:
     *
     * prefers-reduced-motion: reduce
     * removes the pseudo shimmer layer.
     */

    await page.emulateMedia({
      reducedMotion:
        "reduce",
    });


    await page.reload({
      waitUntil:
        "domcontentloaded",
    });


    const result =
      await page
        .locator(
          "#showcase-skeleton-animation"
        )
        .evaluate(
          (
            element
          ) => {
            const style =
              getComputedStyle(
                element,
                "::after"
              );


            return {
              content:
                style.content,

              animationName:
                style.animationName,
            };
          }
        );


    expect(
      result.content
    ).toBe(
      "none"
    );


    expect(
      result.animationName
    ).toBe(
      "none"
    );
  }
);


test(
  "unified showcase represents every v0.4 Navigation component",
  async ({ page }) => {
    await expect(
      page.locator(
        "#showcase-breadcrumb"
      )
    ).toBeVisible();


    await expect(
      page.locator(
        "#showcase-tabs"
      )
    ).toBeVisible();


    await expect(
      page.locator(
        "#showcase-pagination"
      )
    ).toBeVisible();


    await expect(
      page.locator(
        "#showcase-navbar"
      )
    ).toBeVisible();


    await expect(
      page.locator(
        "#showcase-sidebar"
      )
    ).toBeVisible();
  }
);


test(
  "v0.4 current navigation semantics remain explicit",
  async ({ page }) => {
    const selectors = [
      "#showcase-breadcrumb-current",
      "#showcase-pagination-current",
      "#showcase-navbar-current",
      "#showcase-sidebar-current",
    ];


    for (
      const selector
      of selectors
    ) {
      await expect(
        page.locator(
          selector
        )
      ).toHaveAttribute(
        "aria-current",
        "page"
      );
    }
  }
);


test(
  "showcase Tabs initialize with one selected Tab",
  async ({ page }) => {
    await expect(
      page.locator(
        "#showcase-tab-overview"
      )
    ).toHaveAttribute(
      "aria-selected",
      "true"
    );


    await expect(
      page.locator(
        "#showcase-tab-overview"
      )
    ).toHaveAttribute(
      "tabindex",
      "0"
    );


    await expect(
      page.locator(
        "#showcase-panel-overview"
      )
    ).toBeVisible();


    await expect(
      page.locator(
        "#showcase-panel-details"
      )
    ).toBeHidden();
  }
);


test(
  "showcase Tabs support automatic Arrow navigation",
  async ({ page }) => {
    const overview =
      page.locator(
        "#showcase-tab-overview"
      );


    await overview.focus();


    await page.keyboard.press(
      "ArrowRight"
    );


    await expect(
      page.locator(
        "#showcase-tab-details"
      )
    ).toBeFocused();


    await expect(
      page.locator(
        "#showcase-tab-details"
      )
    ).toHaveAttribute(
      "aria-selected",
      "true"
    );


    await expect(
      page.locator(
        "#showcase-panel-details"
      )
    ).toBeVisible();


    await expect(
      page.locator(
        "#showcase-panel-overview"
      )
    ).toBeHidden();
  }
);


test(
  "showcase includes Dark Navigation preview",
  async ({ page }) => {
    await expect(
      page.locator(
        "#showcase-dark-breadcrumb"
      )
    ).toBeVisible();


    await expect(
      page.locator(
        "#showcase-dark-tabs"
      )
    ).toBeVisible();
  }
);


test(
  "showcase has no horizontal page overflow",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 1600,
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