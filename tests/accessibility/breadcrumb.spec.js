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
  "/examples/navigation/breadcrumb.html";


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
  "Breadcrumb demo has no detectable accessibility violations",
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
  "Breadcrumb landmarks have accessible names",
  async ({ page }) => {
    await openFixture(
      page
    );


    await expect(
      page.getByRole(
        "navigation",
        {
          name:
            "Breadcrumb — Light Theme",

          exact: true,
        }
      )
    ).toBeVisible();


    await expect(
      page.getByRole(
        "navigation",
        {
          name:
            "Breadcrumb — Dark Theme",

          exact: true,
        }
      )
    ).toBeVisible();
  }
);


test(
  "each Breadcrumb exposes one current page",
  async ({ page }) => {
    await openFixture(
      page
    );


    const breadcrumbs =
      page.locator(
        ".rm-breadcrumb"
      );


    const count =
      await breadcrumbs.count();


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
        breadcrumbs
          .nth(index)
          .locator(
            '[aria-current="page"]'
          )
      ).toHaveCount(
        1
      );
    }
  }
);


test(
  "Breadcrumb separators are hidden from assistive technology",
  async ({ page }) => {
    await openFixture(
      page
    );


    const separators =
      page.locator(
        ".rm-breadcrumb__separator"
      );


    const count =
      await separators.count();


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
        separators.nth(
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
  "Breadcrumb links retain accessible names",
  async ({ page }) => {
    await openFixture(
      page
    );


    await expect(
      page.locator(
        "#breadcrumb-home-link"
      )
    ).toHaveAccessibleName(
      "Home"
    );


    await expect(
      page.locator(
        "#breadcrumb-dark-home"
      )
    ).toHaveAccessibleName(
      "Home"
    );
  }
);


test(
  "current Breadcrumb location is not keyboard focusable",
  async ({ page }) => {
    await openFixture(
      page
    );


    const current =
      page.locator(
        "#breadcrumb-current"
      );


    const tabIndex =
      await current.evaluate(
        (element) =>
          element.tabIndex
      );


    expect(
      tabIndex
    ).toBe(-1);
  }
);