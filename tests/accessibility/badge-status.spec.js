import {
  expect,
  test,
} from "@playwright/test";

import AxeBuilder
  from "@axe-core/playwright";


test.setTimeout(
  60_000
);


test(
  "Badge + Status Indicator demo has no detectable accessibility violations",
  async ({ page }) => {
    await page.goto(
      "/examples/feedback/badge-status.html"
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
  "Badge and Status meaning remains available as text",
  async ({ page }) => {
    await page.goto(
      "/examples/feedback/badge-status.html"
    );


    await expect(
      page.locator(
        "#badge-success"
      )
    ).toContainText(
      "Success"
    );


    await expect(
      page.locator(
        "#status-success"
      )
    ).toContainText(
      "Operational"
    );


    await expect(
      page.locator(
        "#status-danger"
      )
    ).toContainText(
      "Offline"
    );
  }
);


test(
  "Status Indicator does not receive an automatic live-region role",
  async ({ page }) => {
    await page.goto(
      "/examples/feedback/badge-status.html"
    );


    const statuses =
      page.locator(
        ".rm-status"
      );

    const count =
      await statuses.count();


    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      await expect(
        statuses.nth(index)
      ).not.toHaveAttribute(
        "role",
        "status"
      );
    }
  }
);