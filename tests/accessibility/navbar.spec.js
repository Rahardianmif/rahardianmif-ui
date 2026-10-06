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
  "/examples/navigation/navbar.html";


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
  "Navbar demo has no detectable accessibility violations",
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
  "Navbar landmarks have accessible names",
  async ({ page }) => {
    await openFixture(
      page
    );


    await expect(
      page.getByRole(
        "navigation",
        {
          name:
            "Primary navigation — Light Theme",

          exact: true,
        }
      )
    ).toBeVisible();


    await expect(
      page.getByRole(
        "navigation",
        {
          name:
            "Primary navigation — Dark Theme",

          exact: true,
        }
      )
    ).toBeVisible();
  }
);


test(
  "each Navbar exposes exactly one current page",
  async ({ page }) => {
    await openFixture(
      page
    );


    const navbars =
      page.locator(
        ".rm-navbar"
      );


    const count =
      await navbars.count();


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
        navbars
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
  "current Navbar destinations are links",
  async ({ page }) => {
    await openFixture(
      page
    );


    const currentLinks =
      page.locator(
        '.rm-navbar [aria-current="page"]'
      );


    const count =
      await currentLinks.count();


    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      await expect(
        currentLinks.nth(
          index
        )
      ).toHaveAttribute(
        "href"
      );
    }
  }
);


test(
  "Navbar brand retains an accessible name",
  async ({ page }) => {
    await openFixture(
      page
    );


    await expect(
      page.locator(
        "#navbar-brand"
      )
    ).toHaveAccessibleName(
      "Rahardianmif UI"
    );


    await expect(
      page.locator(
        "#navbar-dark-brand"
      )
    ).toHaveAccessibleName(
      "Rahardianmif UI"
    );
  }
);


test(
  "Navbar navigation links retain accessible names",
  async ({ page }) => {
    await openFixture(
      page
    );


    await expect(
      page.locator(
        "#navbar-current"
      )
    ).toHaveAccessibleName(
      "Dashboard"
    );


    await expect(
      page.locator(
        "#navbar-dark-current"
      )
    ).toHaveAccessibleName(
      "Dashboard"
    );
  }
);