import {
  expect,
  test,
} from "@playwright/test";


const fixture =
  "/examples/feedback-state/index.html";


test.beforeEach(
  async ({ page }) => {
    await page.goto(fixture);
  }
);


test(
  "Feedback State uses the locked LG radius",
  async ({ page }) => {
    await expect(
      page.locator(
        "#feedback-empty"
      )
    ).toHaveCSS(
      "border-radius",
      "12px"
    );
  }
);


test(
  "Empty State uses the semantic surface",
  async ({ page }) => {
    await expect(
      page.locator(
        "#feedback-empty"
      )
    ).toHaveCSS(
      "background-color",
      "rgb(255, 255, 255)"
    );
  }
);


test(
  "No Result visual uses Info semantic color",
  async ({ page }) => {
    await expect(
      page.locator(
        "#feedback-no-result .rm-feedback-state__visual"
      )
    ).toHaveCSS(
      "color",
      "rgb(37, 99, 235)"
    );
  }
);


test(
  "Error State uses Danger semantic border",
  async ({ page }) => {
    await expect(
      page.locator(
        "#feedback-error"
      )
    ).toHaveCSS(
      "border-color",
      "rgb(220, 38, 38)"
    );
  }
);


test(
  "Error visual uses Danger semantic color",
  async ({ page }) => {
    await expect(
      page.locator(
        "#feedback-error .rm-feedback-state__visual"
      )
    ).toHaveCSS(
      "color",
      "rgb(220, 38, 38)"
    );
  }
);


test(
  "Dark Feedback State follows Dark semantic surface",
  async ({ page }) => {
    await expect(
      page.locator(
        "#feedback-dark-empty"
      )
    ).toHaveCSS(
      "background-color",
      "rgb(15, 27, 45)"
    );
  }
);


test(
  "Empty State action remains keyboard focusable",
  async ({ page }) => {
    const button =
      page.locator(
        "#feedback-empty-action"
      );


    await button.focus();


    await expect(
      button
    ).toBeFocused();
  }
);


test(
  "Feedback State container is not focusable",
  async ({ page }) => {
    const tabIndex =
      await page
        .locator(
          "#feedback-empty"
        )
        .evaluate(
          (element) =>
            element.tabIndex
        );


    expect(
      tabIndex
    ).toBe(-1);
  }
);


test(
  "Empty State can omit actions",
  async ({ page }) => {
    await expect(
      page.locator(
        "#feedback-empty-no-action .rm-feedback-state__actions"
      )
    ).toHaveCount(
      0
    );
  }
);


test(
  "No Result action remains available",
  async ({ page }) => {
    await expect(
      page.locator(
        "#feedback-clear-filter"
      )
    ).toHaveAccessibleName(
      "Clear filters"
    );
  }
);


test(
  "Error action remains available",
  async ({ page }) => {
    await expect(
      page.locator(
        "#feedback-error-retry"
      )
    ).toHaveAccessibleName(
      "Try again"
    );
  }
);


test(
  "long Feedback State remains inside narrow container",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 1100,
    });


    const feedbackBox =
      await page
        .locator(
          "#feedback-long"
        )
        .boundingBox();

    const containerBox =
      await page
        .locator(
          "#feedback-narrow-container"
        )
        .boundingBox();


    expect(
      feedbackBox
    ).not.toBeNull();

    expect(
      containerBox
    ).not.toBeNull();


    expect(
      feedbackBox.width
    ).toBeLessThanOrEqual(
      containerBox.width + 1
    );
  }
);


test(
  "Feedback actions wrap without overflow",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 1100,
    });


    const actions =
      page.locator(
        "#feedback-long .rm-feedback-state__actions"
      );


    const overflow =
      await actions.evaluate(
        (element) =>
          element.scrollWidth
          >
          element.clientWidth
      );


    expect(
      overflow
    ).toBe(false);
  }
);


test(
  "Feedback State demo has no horizontal overflow",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 1100,
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