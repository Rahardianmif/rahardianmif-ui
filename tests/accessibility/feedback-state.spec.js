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
  "/examples/feedback-state/index.html";


test(
  "Feedback State demo has no detectable accessibility violations",
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
  "Feedback States do not receive an automatic alert role",
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
    }
  }
);


test(
  "Feedback States do not receive an automatic status role",
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
        "status"
      );
    }
  }
);


test(
  "Feedback States do not receive automatic tabindex",
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
        "tabindex"
      );
    }
  }
);


test(
  "decorative Feedback State visuals are hidden",
  async ({ page }) => {
    await page.goto(
      fixture
    );


    const visuals =
      page.locator(
        ".rm-feedback-state__visual"
      );

    const count =
      await visuals.count();


    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      await expect(
        visuals.nth(index)
      ).toHaveAttribute(
        "aria-hidden",
        "true"
      );
    }
  }
);


test(
  "Empty State meaning remains available as text",
  async ({ page }) => {
    await page.goto(
      fixture
    );


    await expect(
      page.locator(
        "#feedback-empty"
      )
    ).toContainText(
      "No projects yet"
    );
  }
);


test(
  "No Result meaning remains available as text",
  async ({ page }) => {
    await page.goto(
      fixture
    );


    await expect(
      page.locator(
        "#feedback-no-result"
      )
    ).toContainText(
      "No matching results"
    );
  }
);


test(
  "Error meaning remains available as text",
  async ({ page }) => {
    await page.goto(
      fixture
    );


    await expect(
      page.locator(
        "#feedback-error"
      )
    ).toContainText(
      "Unable to load data"
    );
  }
);


test(
  "Feedback State actions remain native Buttons",
  async ({ page }) => {
    await page.goto(
      fixture
    );


    await expect(
      page.locator(
        "#feedback-empty-action"
      )
    ).toHaveAccessibleName(
      "Create project"
    );


    await expect(
      page.locator(
        "#feedback-error-retry"
      )
    ).toHaveAccessibleName(
      "Try again"
    );
  }
);