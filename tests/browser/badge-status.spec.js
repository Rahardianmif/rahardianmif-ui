import {
  expect,
  test,
} from "@playwright/test";


const fixture =
  "/examples/feedback/badge-status.html";


test.beforeEach(
  async ({ page }) => {
    await page.goto(fixture);
  }
);


test(
  "Badge sizes follow the locked size contract",
  async ({ page }) => {
    await expect(
      page.locator("#badge-sm")
    ).toHaveCSS(
      "min-height",
      "20px"
    );

    await expect(
      page.locator("#badge-md")
    ).toHaveCSS(
      "min-height",
      "24px"
    );

    await expect(
      page.locator("#badge-lg")
    ).toHaveCSS(
      "min-height",
      "32px"
    );
  }
);


test(
  "Light Primary Badge uses semantic theme tokens",
  async ({ page }) => {
    const badge =
      page.locator(
        "#badge-primary"
      );

    await expect(
      badge
    ).toHaveCSS(
      "border-color",
      "rgb(8, 145, 178)"
    );

    await expect(
      badge
    ).toHaveCSS(
      "background-color",
      "rgb(207, 250, 254)"
    );
  }
);


test(
  "Dark Primary Badge follows Dark semantic theme mapping",
  async ({ page }) => {
    const badge =
      page.locator(
        "#dark-badge-primary"
      );

    await expect(
      badge
    ).toHaveCSS(
      "border-color",
      "rgb(34, 211, 238)"
    );

    await expect(
      badge
    ).toHaveCSS(
      "background-color",
      "rgb(22, 78, 99)"
    );
  }
);


test(
  "semantic Badge variant uses the approved status color",
  async ({ page }) => {
    await expect(
      page.locator(
        "#badge-success"
      )
    ).toHaveCSS(
      "border-color",
      "rgb(22, 163, 74)"
    );
  }
);


test(
  "Status Indicator uses semantic state color",
  async ({ page }) => {
    await expect(
      page
        .locator(
          "#status-success"
        )
        .locator(
          ".rm-status__indicator"
        )
    ).toHaveCSS(
      "background-color",
      "rgb(22, 163, 74)"
    );

    await expect(
      page
        .locator(
          "#status-danger"
        )
        .locator(
          ".rm-status__indicator"
        )
    ).toHaveCSS(
      "background-color",
      "rgb(220, 38, 38)"
    );
  }
);


test(
  "Badge and Status remain non-focusable",
  async ({ page }) => {
    const badgeTabIndex =
      await page
        .locator(
          "#badge-default"
        )
        .evaluate(
          (element) =>
            element.tabIndex
        );

    const statusTabIndex =
      await page
        .locator(
          "#status-success"
        )
        .evaluate(
          (element) =>
            element.tabIndex
        );


    expect(
      badgeTabIndex
    ).toBe(-1);

    expect(
      statusTabIndex
    ).toBe(-1);
  }
);


test(
  "decorative indicators are hidden from assistive technology",
  async ({ page }) => {
    const indicators =
      page.locator(
        ".rm-badge__dot, .rm-status__indicator"
      );

    const count =
      await indicators.count();


    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      await expect(
        indicators.nth(index)
      ).toHaveAttribute(
        "aria-hidden",
        "true"
      );
    }
  }
);


test(
  "long Badge content remains inside its container",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 800,
    });


    const badgeBox =
      await page
        .locator(
          "#badge-long"
        )
        .boundingBox();

    const containerBox =
      await page
        .locator(
          "#badge-long-container"
        )
        .boundingBox();


    expect(
      badgeBox
    ).not.toBeNull();

    expect(
      containerBox
    ).not.toBeNull();


    expect(
      badgeBox.width
    ).toBeLessThanOrEqual(
      containerBox.width + 1
    );
  }
);


test(
  "v0.3.1 demo has no horizontal page overflow on narrow viewport",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 800,
    });


    const overflow =
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth
          >
          document.documentElement.clientWidth
      );


    expect(
      overflow
    ).toBe(false);
  }
);