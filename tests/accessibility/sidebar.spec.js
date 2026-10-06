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
  "/examples/navigation/sidebar.html";


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
  "Sidebar demo has no detectable accessibility violations",
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
  "Sidebar navigation landmarks have accessible names",
  async ({ page }) => {
    await openFixture(
      page
    );


    await expect(
      page.getByRole(
        "navigation",
        {
          name:
            "Administration navigation — Light Theme",

          exact: true,
        }
      )
    ).toBeVisible();


    await expect(
      page.getByRole(
        "navigation",
        {
          name:
            "Workspace navigation — Dark Theme",

          exact: true,
        }
      )
    ).toBeVisible();
  }
);


test(
  "each Sidebar exposes exactly one current page",
  async ({ page }) => {
    await openFixture(
      page
    );


    const sidebars =
      page.locator(
        ".rm-sidebar"
      );


    const count =
      await sidebars.count();


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
        sidebars
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
  "Sidebar current destinations remain links",
  async ({ page }) => {
    await openFixture(
      page
    );


    const links =
      page.locator(
        '.rm-sidebar [aria-current="page"]'
      );


    const count =
      await links.count();


    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      await expect(
        links.nth(
          index
        )
      ).toHaveAttribute(
        "href"
      );
    }
  }
);


test(
  "Sidebar section titles provide visible context",
  async ({ page }) => {
    await openFixture(
      page
    );


    await expect(
      page.getByRole(
        "heading",
        {
          name:
            "Management",

          exact: true,
        }
      )
    ).toBeVisible();


    await expect(
      page.getByRole(
        "heading",
        {
          name:
            "Workspace",

          exact: true,
        }
      )
    ).toBeVisible();
  }
);


test(
  "Sidebar links retain accessible names",
  async ({ page }) => {
    await openFixture(
      page
    );


    await expect(
      page.locator(
        "#sidebar-current"
      )
    ).toHaveAccessibleName(
      "Dashboard"
    );


    await expect(
      page.locator(
        "#sidebar-dark-current"
      )
    ).toHaveAccessibleName(
      "Overview"
    );
  }
);