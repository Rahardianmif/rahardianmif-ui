import {
  expect,
  test,
} from "@playwright/test";


const showcaseUrl =
  "/examples/index.html";


test.setTimeout(
  60_000
);


test.beforeEach(
  async ({
    page,
  }) => {
    await page.goto(
      showcaseUrl,
      {
        waitUntil:
          "domcontentloaded",

        timeout:
          45_000,
      }
    );

    await expect(
      page.locator(
        ".rm-showcase"
      )
    ).toBeVisible();
  }
);


test(
  "v0.5 cumulative showcase loads",
  async ({
    page,
  }) => {

    /* ========================================
     * Release Identity
     * ======================================== */

    await expect(
      page
    ).toHaveTitle(
      /Rahardianmif UI.*v0\.5.*Modal \+ Overlays/i
    );


    await expect(
      page.locator(
        ".rm-showcase__title"
      )
    ).toContainText(
      "v0.5"
    );


    await expect(
      page.locator(
        ".rm-showcase__title"
      )
    ).toContainText(
      "Modal + Overlays"
    );


    /* ========================================
     * Theme Sections
     * ======================================== */

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


    /* ========================================
     * Frozen v0.2
     * ======================================== */

    await expect(
      page.locator(
        ".rm-button"
      ).first()
    ).toBeVisible();


    await expect(
      page.locator(
        ".rm-input"
      ).first()
    ).toBeVisible();


    await expect(
      page.locator(
        ".rm-textarea"
      ).first()
    ).toBeVisible();


    await expect(
      page.locator(
        ".rm-select"
      ).first()
    ).toBeVisible();


    await expect(
      page.locator(
        ".rm-choice"
      ).first()
    ).toBeVisible();


    await expect(
      page.locator(
        ".rm-switch"
      ).first()
    ).toBeAttached();


    /* ========================================
     * Frozen v0.3
     * ======================================== */

    await expect(
      page.locator(
        ".rm-badge"
      ).first()
    ).toBeVisible();


    await expect(
      page.locator(
        ".rm-card"
      ).first()
    ).toBeVisible();


    await expect(
      page.locator(
        ".rm-alert"
      ).first()
    ).toBeVisible();


    await expect(
      page.locator(
        ".rm-spinner"
      ).first()
    ).toBeVisible();


    await expect(
      page.locator(
        ".rm-progress"
      ).first()
    ).toBeVisible();


    await expect(
      page.locator(
        ".rm-skeleton"
      ).first()
    ).toBeVisible();


    await expect(
      page.locator(
        ".rm-feedback-state"
      ).first()
    ).toBeVisible();


    /* ========================================
     * Frozen v0.4 Navigation
     * ======================================== */

    await expect(
      page.locator(
        "#v04"
      )
    ).toBeVisible();


    await expect(
      page.locator(
        "#showcase-navbar"
      )
    ).toBeVisible();


    await expect(
      page.locator(
        "#showcase-breadcrumb"
      )
    ).toBeVisible();


    await expect(
      page.locator(
        "#showcase-pagination"
      )
    ).toBeVisible();


    await expect(
      page.locator(
        "#showcase-tabs"
      )
    ).toBeVisible();


    await expect(
      page.locator(
        "#showcase-sidebar"
      )
    ).toBeVisible();


    await expect(
      page.locator(
        "#showcase-navbar-current"
      )
    ).toHaveAttribute(
      "aria-current",
      "page"
    );


    await expect(
      page.locator(
        "#showcase-pagination-current"
      )
    ).toHaveAttribute(
      "aria-current",
      "page"
    );


    /* ========================================
     * v0.5 Modal + Overlays
     * ======================================== */

    await expect(
      page.locator(
        "#v05"
      )
    ).toBeVisible();


    await expect(
      page.locator(
        "#showcase-modal"
      )
    ).toBeAttached();


    await expect(
      page.locator(
        "#showcase-drawer"
      )
    ).toBeAttached();


    await expect(
      page.locator(
        "#showcase-tooltip"
      )
    ).toBeAttached();


    await expect(
      page.locator(
        "#showcase-popover"
      )
    ).toBeAttached();


    await expect(
      page.locator(
        "#showcase-dropdown"
      )
    ).toBeAttached();


    await expect(
      page.locator(
        "#showcase-disclosure-panel"
      )
    ).toBeAttached();


    await expect(
      page.locator(
        ".rm-accordion"
      ).first()
    ).toBeVisible();


    /* ========================================
     * Dark v0.5 Preview
     * ======================================== */

    await expect(
      page.locator(
        "#showcase-dark-v05"
      )
    ).toBeVisible();


    await expect(
      page.locator(
        "#showcase-dark-modal"
      )
    ).toBeAttached();


    await expect(
      page.locator(
        "#showcase-dark-drawer"
      )
    ).toBeAttached();


    await expect(
      page.locator(
        "#showcase-dark-tooltip"
      )
    ).toBeAttached();


    await expect(
      page.locator(
        "#showcase-dark-popover"
      )
    ).toBeAttached();


    await expect(
      page.locator(
        "#showcase-dark-dropdown"
      )
    ).toBeAttached();


    /* ========================================
     * Public JS Initialization
     * ======================================== */

    const initialized =
      await page.evaluate(
        () => {
          return Boolean(
            document.querySelector(
              "[data-rm-tabs]"
            )
          );
        }
      );


    expect(
      initialized
    ).toBe(
      true
    );
  }
);