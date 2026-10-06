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


test(
  "v0.3 cumulative showcase has no detectable accessibility violations",
  async ({ page }) => {
    await page.goto(
      fixture
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
  "showcase Progress components have accessible names",
  async ({ page }) => {
    await page.goto(
      fixture
    );


    await expect(
      page.locator(
        "#showcase-progress-light"
      )
    ).toHaveAccessibleName(
      "Uploading documents"
    );


    await expect(
      page.locator(
        "#showcase-progress-dark"
      )
    ).toHaveAccessibleName(
      "Processing dark theme data"
    );
  }
);


test(
  "showcase Progress components expose determinate values",
  async ({ page }) => {
    await page.goto(
      fixture
    );


    const progressBars =
      page.locator(
        ".rm-progress"
      );


    const count =
      await progressBars.count();


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
      const progress =
        progressBars.nth(
          index
        );


      await expect(
        progress
      ).toHaveAttribute(
        "role",
        "progressbar"
      );


      await expect(
        progress
      ).toHaveAttribute(
        "aria-valuemin"
      );


      await expect(
        progress
      ).toHaveAttribute(
        "aria-valuemax"
      );


      await expect(
        progress
      ).toHaveAttribute(
        "aria-valuenow"
      );
    }
  }
);


test(
  "showcase Skeleton primitives remain hidden from assistive technology",
  async ({ page }) => {
    await page.goto(
      fixture
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
        skeletons.nth(index)
      ).toHaveAttribute(
        "aria-hidden",
        "true"
      );
    }
  }
);


test(
  "showcase static Alerts do not receive automatic live-region roles",
  async ({ page }) => {
    await page.goto(
      fixture
    );


    const alerts =
      page.locator(
        ".rm-alert"
      );


    const count =
      await alerts.count();


    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      await expect(
        alerts.nth(index)
      ).not.toHaveAttribute(
        "role",
        "alert"
      );


      await expect(
        alerts.nth(index)
      ).not.toHaveAttribute(
        "role",
        "status"
      );
    }
  }
);


test(
  "showcase Feedback States do not receive automatic live-region roles",
  async ({ page }) => {
    await page.goto(
      fixture
    );


    const states =
      page.locator(
        ".rm-feedback-state"
      );


    const count =
      await states.count();


    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      await expect(
        states.nth(index)
      ).not.toHaveAttribute(
        "role",
        "alert"
      );


      await expect(
        states.nth(index)
      ).not.toHaveAttribute(
        "role",
        "status"
      );
    }
  }
);