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
  "/examples/card/index.html";


test(
  "Card Core demo has no detectable accessibility violations",
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
  "Card Core does not receive an automatic role",
  async ({ page }) => {
    await page.goto(
      fixture
    );


    await expect(
      page.locator(
        "#card-basic"
      )
    ).not.toHaveAttribute(
      "role"
    );
  }
);


test(
  "Card Core does not receive an automatic tabindex",
  async ({ page }) => {
    await page.goto(
      fixture
    );


    await expect(
      page.locator(
        "#card-basic"
      )
    ).not.toHaveAttribute(
      "tabindex"
    );
  }
);


test(
  "Card action remains exposed as a native Button",
  async ({ page }) => {
    await page.goto(
      fixture
    );


    const button =
      page.locator(
        "#card-primary-action"
      );


    await expect(
      button
    ).toHaveJSProperty(
      "tagName",
      "BUTTON"
    );


    await expect(
      button
    ).toHaveAccessibleName(
      "View detail"
    );
  }
);