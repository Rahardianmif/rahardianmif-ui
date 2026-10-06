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
  "/examples/navigation/tabs.html";


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
  "Tabs demo has no detectable accessibility violations",
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
  "every Tabs component contains a Tab List",
  async ({ page }) => {
    await openFixture(
      page
    );


    const tabSets =
      page.locator(
        "[data-rm-tabs]"
      );


    const count =
      await tabSets.count();


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
        tabSets
          .nth(index)
          .locator(
            '[role="tablist"]'
          )
      ).toHaveCount(
        1
      );
    }
  }
);


test(
  "every Tab controls an existing Panel",
  async ({ page }) => {
    await openFixture(
      page
    );


    const tabs =
      page.locator(
        '[role="tab"]'
      );


    const count =
      await tabs.count();


    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      const tab =
        tabs.nth(
          index
        );


      const panelId =
        await tab.getAttribute(
          "aria-controls"
        );


      expect(
        panelId
      ).toBeTruthy();


      await expect(
        page.locator(
          `#${panelId}`
        )
      ).toHaveAttribute(
        "role",
        "tabpanel"
      );
    }
  }
);


test(
  "every Panel points back to its controlling Tab",
  async ({ page }) => {
    await openFixture(
      page
    );


    const panels =
      page.locator(
        '[role="tabpanel"]'
      );


    const count =
      await panels.count();


    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      const panel =
        panels.nth(
          index
        );


      const tabId =
        await panel.getAttribute(
          "aria-labelledby"
        );


      expect(
        tabId
      ).toBeTruthy();


      await expect(
        page.locator(
          `#${tabId}`
        )
      ).toHaveAttribute(
        "role",
        "tab"
      );
    }
  }
);


test(
  "each Tab set has exactly one selected Tab",
  async ({ page }) => {
    await openFixture(
      page
    );


    const tabSets =
      page.locator(
        "[data-rm-tabs]"
      );


    const count =
      await tabSets.count();


    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      await expect(
        tabSets
          .nth(index)
          .locator(
            '[role="tab"][aria-selected="true"]'
          )
      ).toHaveCount(
        1
      );
    }
  }
);


test(
  "selected Tab participates in normal Tab order",
  async ({ page }) => {
    await openFixture(
      page
    );


    const selectedTabs =
      page.locator(
        '[role="tab"][aria-selected="true"]'
      );


    const count =
      await selectedTabs.count();


    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      await expect(
        selectedTabs.nth(
          index
        )
      ).toHaveAttribute(
        "tabindex",
        "0"
      );
    }
  }
);


test(
  "inactive Tabs use negative tabindex",
  async ({ page }) => {
    await openFixture(
      page
    );


    const inactiveTabs =
      page.locator(
        '[role="tab"][aria-selected="false"]'
      );


    const count =
      await inactiveTabs.count();


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
        inactiveTabs.nth(
          index
        )
      ).toHaveAttribute(
        "tabindex",
        "-1"
      );
    }
  }
);


test(
  "inactive Tab Panels remain hidden",
  async ({ page }) => {
    await openFixture(
      page
    );


    const inactiveTabs =
      page.locator(
        '[role="tab"][aria-selected="false"]'
      );


    const count =
      await inactiveTabs.count();


    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      const panelId =
        await inactiveTabs
          .nth(index)
          .getAttribute(
            "aria-controls"
          );


      await expect(
        page.locator(
          `#${panelId}`
        )
      ).toBeHidden();
    }
  }
);