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
  "/examples/loading/skeleton.html";


test(
  "Skeleton demo has no detectable accessibility violations",
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
  "Skeleton primitives are hidden from assistive technology",
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
  "Skeleton does not receive an automatic role",
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


    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      await expect(
        skeletons.nth(index)
      ).not.toHaveAttribute(
        "role"
      );
    }
  }
);


test(
  "Skeleton does not receive an automatic live region",
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


    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      await expect(
        skeletons.nth(index)
      ).not.toHaveAttribute(
        "aria-live"
      );
    }
  }
);


test(
  "loading state belongs to the surrounding region",
  async ({ page }) => {
    await page.goto(
      fixture
    );


    await expect(
      page.locator(
        "#skeleton-loading-region"
      )
    ).toHaveAttribute(
      "aria-busy",
      "true"
    );


    await expect(
      page.locator(
        "#skeleton-loading-region"
      )
    ).toHaveAccessibleName(
      "Loading account summary"
    );
  }
);