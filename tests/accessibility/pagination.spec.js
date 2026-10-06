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
  "/examples/navigation/pagination.html";


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
  "Pagination demo has no detectable accessibility violations",
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
  "Pagination landmarks have accessible names",
  async ({ page }) => {
    await openFixture(
      page
    );


    await expect(
      page.getByRole(
        "navigation",
        {
          name:
            "Results pages — Light Theme",

          exact: true,
        }
      )
    ).toBeVisible();


    await expect(
      page.getByRole(
        "navigation",
        {
          name:
            "Results pages — Dark Theme",

          exact: true,
        }
      )
    ).toBeVisible();
  }
);


test(
  "each Pagination exposes exactly one current page",
  async ({ page }) => {
    await openFixture(
      page
    );


    const paginations =
      page.locator(
        ".rm-pagination"
      );


    const count =
      await paginations.count();


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
        paginations
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
  "current Pagination pages are links",
  async ({ page }) => {
    await openFixture(
      page
    );


    const currentPages =
      page.locator(
        '.rm-pagination [aria-current="page"]'
      );


    const count =
      await currentPages.count();


    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      await expect(
        currentPages.nth(
          index
        )
      ).toHaveAttribute(
        "href"
      );
    }
  }
);


test(
  "Pagination ellipsis is hidden from assistive technology",
  async ({ page }) => {
    await openFixture(
      page
    );


    const ellipses =
      page.locator(
        ".rm-pagination__ellipsis"
      );


    const count =
      await ellipses.count();


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
        ellipses.nth(
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
  "Pagination links retain accessible names",
  async ({ page }) => {
    await openFixture(
      page
    );


    await expect(
      page.locator(
        "#pagination-previous"
      )
    ).toHaveAccessibleName(
      "Previous"
    );


    await expect(
      page.locator(
        "#pagination-next"
      )
    ).toHaveAccessibleName(
      "Next"
    );


    await expect(
      page.locator(
        "#pagination-current"
      )
    ).toHaveAccessibleName(
      "4"
    );
  }
);