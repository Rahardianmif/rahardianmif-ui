import {
  expect,
  test,
} from "@playwright/test";

import AxeBuilder
  from "@axe-core/playwright";


test.setTimeout(
  60_000
);


const fixture =
  "/examples/index.html";


async function openFixture(
  page
) {
  await page.goto(
    fixture,
    {
      waitUntil:
        "domcontentloaded",
    }
  );
}


test(
  "v0.4 cumulative showcase has no detectable accessibility violations",
  async ({ page }) => {
    await openFixture(
      page
    );


    const results =
      await new AxeBuilder({
        page,
      }).analyze();


    expect(
      results.violations
    ).toEqual([]);
  }
);


test(
  "showcase Progress Bars retain accessible names",
  async ({ page }) => {
    await openFixture(
      page
    );


    await expect(
      page.locator(
        "#showcase-progress-light [role='progressbar']"
      )
    ).toHaveAccessibleName(
      "Uploading documents"
    );


    await expect(
      page.locator(
        "#showcase-progress-dark [role='progressbar']"
      )
    ).toHaveAccessibleName(
      "Processing dark theme data"
    );
  }
);


test(
  "showcase Progress Bars retain determinate ARIA values",
  async ({ page }) => {
    await openFixture(
      page
    );


    const light =
      page.locator(
        "#showcase-progress-light [role='progressbar']"
      );


    await expect(
      light
    ).toHaveAttribute(
      "aria-valuemin",
      "0"
    );


    await expect(
      light
    ).toHaveAttribute(
      "aria-valuemax",
      "100"
    );


    await expect(
      light
    ).toHaveAttribute(
      "aria-valuenow",
      "65"
    );


    const dark =
      page.locator(
        "#showcase-progress-dark [role='progressbar']"
      );


    await expect(
      dark
    ).toHaveAttribute(
      "aria-valuenow",
      "50"
    );
  }
);


test(
  "showcase Skeleton visuals remain hidden from assistive technology",
  async ({ page }) => {
    await openFixture(
      page
    );


    const skeletons =
      page.locator(
        ".rm-skeleton"
      );


    const count =
      await skeletons.count();


    expect(
      count
    ).toBeGreaterThan(
      0
    );


    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      await expect(
        skeletons.nth(
          index
        )
      ).toHaveAttribute(
        "aria-hidden",
        "true"
      );
    }
  }
);


test(
  "showcase Alerts do not automatically expose alert or status roles",
  async ({ page }) => {
    await openFixture(
      page
    );


    const alerts =
      page.locator(
        ".rm-alert"
      );


    const count =
      await alerts.count();


    expect(
      count
    ).toBeGreaterThan(
      0
    );


    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      const role =
        await alerts
          .nth(index)
          .getAttribute(
            "role"
          );


      expect(
        role
      ).not.toBe(
        "alert"
      );


      expect(
        role
      ).not.toBe(
        "status"
      );
    }
  }
);


test(
  "showcase Feedback States do not automatically expose alert or status roles",
  async ({ page }) => {
    await openFixture(
      page
    );


    const states =
      page.locator(
        ".rm-feedback-state"
      );


    const count =
      await states.count();


    expect(
      count
    ).toBeGreaterThan(
      0
    );


    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      const role =
        await states
          .nth(index)
          .getAttribute(
            "role"
          );


      expect(
        role
      ).not.toBe(
        "alert"
      );


      expect(
        role
      ).not.toBe(
        "status"
      );
    }
  }
);


test(
  "v0.4 Navigation landmarks have accessible names",
  async ({ page }) => {
    await openFixture(
      page
    );


    await expect(
      page.getByRole(
        "navigation",
        {
          name:
            "Showcase Breadcrumb",
          exact: true,
        }
      )
    ).toBeVisible();


    await expect(
      page.getByRole(
        "navigation",
        {
          name:
            "Showcase pagination",
          exact: true,
        }
      )
    ).toBeVisible();


    await expect(
      page.getByRole(
        "navigation",
        {
          name:
            "Showcase primary navigation",
          exact: true,
        }
      )
    ).toBeVisible();


    await expect(
      page.getByRole(
        "navigation",
        {
          name:
            "Showcase Sidebar navigation",
          exact: true,
        }
      )
    ).toBeVisible();
  }
);


test(
  "v0.4 current destinations expose aria-current",
  async ({ page }) => {
    await openFixture(
      page
    );


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
  "showcase Tabs expose valid Tab to Panel relationships",
  async ({ page }) => {
    await openFixture(
      page
    );


    const tabs =
      page.locator(
        "#showcase-tabs [role='tab']"
      );


    const count =
      await tabs.count();


    expect(
      count
    ).toBe(
      3
    );


    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      const tab =
        tabs.nth(
          index
        );


      const panelId =
        await tab.getAttribute(
          "aria-controls"
        );


      expect(
        panelId
      ).toBeTruthy();


      await expect(
        page.locator(
          `#${panelId}`
        )
      ).toHaveAttribute(
        "role",
        "tabpanel"
      );
    }
  }
);


test(
  "showcase Tab Panels point back to their controlling Tabs",
  async ({ page }) => {
    await openFixture(
      page
    );


    const panels =
      page.locator(
        "#showcase-tabs [role='tabpanel']"
      );


    const count =
      await panels.count();


    expect(
      count
    ).toBe(
      3
    );


    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      const panel =
        panels.nth(
          index
        );


      const tabId =
        await panel.getAttribute(
          "aria-labelledby"
        );


      expect(
        tabId
      ).toBeTruthy();


      await expect(
        page.locator(
          `#${tabId}`
        )
      ).toHaveAttribute(
        "role",
        "tab"
      );
    }
  }
);


test(
  "showcase Tabs expose exactly one selected Tab",
  async ({ page }) => {
    await openFixture(
      page
    );


    await expect(
      page.locator(
        "#showcase-tabs [role='tab'][aria-selected='true']"
      )
    ).toHaveCount(
      1
    );


    await expect(
      page.locator(
        "#showcase-dark-tabs [role='tab'][aria-selected='true']"
      )
    ).toHaveCount(
      1
    );
  }
);


test(
  "showcase selected Tabs participate in the normal Tab sequence",
  async ({ page }) => {
    await openFixture(
      page
    );


    const selectedTabs =
      page.locator(
        "[data-rm-tabs] [role='tab'][aria-selected='true']"
      );


    const count =
      await selectedTabs.count();


    expect(
      count
    ).toBeGreaterThan(
      0
    );


    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      await expect(
        selectedTabs.nth(
          index
        )
      ).toHaveAttribute(
        "tabindex",
        "0"
      );
    }
  }
);