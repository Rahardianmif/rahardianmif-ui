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
  "/examples/loading/progress.html";


test(
  "Progress Bar demo has no detectable accessibility violations",
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
  "every Progress component exposes determinate semantics",
  async ({ page }) => {
    await page.goto(
      fixture
    );


    const progressBars =
      page.getByRole(
        "progressbar"
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
  "Progress components have accessible names",
  async ({ page }) => {
    await page.goto(
      fixture
    );


    const progressBars =
      page.getByRole(
        "progressbar"
      );

    const count =
      await progressBars.count();


    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      const accessibleName =
        await progressBars
          .nth(index)
          .getAttribute(
            "aria-labelledby"
          );


      expect(
        accessibleName
      ).toBeTruthy();
    }
  }
);


test(
  "Upload Progress exposes its visible label as accessible name",
  async ({ page }) => {
    await page.goto(
      fixture
    );


    const progress =
      page.locator(
        "#progress-upload"
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
      "Upload progress"
    );


    await expect(
      progress
    ).toBeVisible();
  }
);


test(
  "custom Progress range preserves application values",
  async ({ page }) => {
    await page.goto(
      fixture
    );


    const progress =
      page.locator(
        "#progress-custom-range"
      );


    await expect(
      progress
    ).toHaveAttribute(
      "aria-valuemin",
      "10"
    );

    await expect(
      progress
    ).toHaveAttribute(
      "aria-valuemax",
      "30"
    );

    await expect(
      progress
    ).toHaveAttribute(
      "aria-valuenow",
      "20"
    );
  }
);


test(
  "Progress Track is hidden from the accessibility tree",
  async ({ page }) => {
    await page.goto(
      fixture
    );


    const tracks =
      page.locator(
        ".rm-progress__track"
      );

    const count =
      await tracks.count();


    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      await expect(
        tracks.nth(index)
      ).toHaveAttribute(
        "aria-hidden",
        "true"
      );
    }
  }
);


test(
  "Progress remains non-focusable by default",
  async ({ page }) => {
    await page.goto(
      fixture
    );


    await expect(
      page.locator(
        "#progress-upload"
      )
    ).not.toHaveAttribute(
      "tabindex"
    );
  }
);