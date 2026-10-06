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
  "/examples/alert/index.html";


test(
  "Alert demo has no detectable accessibility violations",
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
  "Static Alert does not receive an automatic alert role",
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
    }
  }
);


test(
  "Static Alert does not receive an automatic status role",
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
        "status"
      );
    }
  }
);


test(
  "decorative Alert icons are hidden from assistive technology",
  async ({ page }) => {
    await page.goto(
      fixture
    );


    const icons =
      page.locator(
        ".rm-alert__icon"
      );

    const count =
      await icons.count();


    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      await expect(
        icons.nth(index)
      ).toHaveAttribute(
        "aria-hidden",
        "true"
      );
    }
  }
);


test(
  "Alert meaning remains available through text",
  async ({ page }) => {
    await page.goto(
      fixture
    );


    await expect(
      page.locator(
        "#alert-success"
      )
    ).toContainText(
      "Changes saved"
    );


    await expect(
      page.locator(
        "#alert-danger"
      )
    ).toContainText(
      "Unable to save"
    );
  }
);


test(
  "Alert action remains a native Button",
  async ({ page }) => {
    await page.goto(
      fixture
    );


    await expect(
      page.locator(
        "#alert-retry"
      )
    ).toHaveAccessibleName(
      "Try again"
    );
  }
);