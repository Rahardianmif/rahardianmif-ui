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
  "/examples/loading/spinner-inline-loader.html";


test(
  "Spinner + Inline Loader demo has no detectable accessibility violations",
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
  "visual Spinner elements are hidden from assistive technology",
  async ({ page }) => {
    await page.goto(
      fixture
    );


    const spinners =
      page.locator(
        ".rm-spinner"
      );

    const count =
      await spinners.count();


    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      await expect(
        spinners.nth(index)
      ).toHaveAttribute(
        "aria-hidden",
        "true"
      );
    }
  }
);


test(
  "Inline Loader meaning remains available through visible text",
  async ({ page }) => {
    await page.goto(
      fixture
    );


    await expect(
      page.locator(
        "#inline-loading"
      )
    ).toContainText(
      "Loading..."
    );


    await expect(
      page.locator(
        "#inline-saving"
      )
    ).toContainText(
      "Saving changes..."
    );
  }
);


test(
  "Inline Loader does not receive an automatic status role",
  async ({ page }) => {
    await page.goto(
      fixture
    );


    const loaders =
      page.locator(
        ".rm-inline-loader"
      );

    const count =
      await loaders.count();


    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      await expect(
        loaders.nth(index)
      ).not.toHaveAttribute(
        "role",
        "status"
      );
    }
  }
);


test(
  "Button loading composition exposes busy state",
  async ({ page }) => {
    await page.goto(
      fixture
    );


    await expect(
      page.locator(
        "#spinner-button"
      )
    ).toHaveAttribute(
      "aria-busy",
      "true"
    );


    await expect(
      page.locator(
        "#spinner-button"
      )
    ).toContainText(
      "Saving..."
    );
  }
);