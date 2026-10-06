import {
  expect,
  test,
} from "@playwright/test";


const fixture =
  "/examples/card/index.html";


test.beforeEach(
  async ({ page }) => {
    await page.goto(fixture);
  }
);


test(
  "Default Card uses the semantic surface",
  async ({ page }) => {
    await expect(
      page.locator(
        "#card-default"
      )
    ).toHaveCSS(
      "background-color",
      "rgb(255, 255, 255)"
    );
  }
);


test(
  "Default Card uses the locked LG radius",
  async ({ page }) => {
    await expect(
      page.locator(
        "#card-default"
      )
    ).toHaveCSS(
      "border-radius",
      "12px"
    );
  }
);


test(
  "Bordered Card uses the stronger semantic border",
  async ({ page }) => {
    await expect(
      page.locator(
        "#card-bordered"
      )
    ).toHaveCSS(
      "border-color",
      "rgb(203, 213, 225)"
    );
  }
);


test(
  "Elevated Card receives Card-level elevation",
  async ({ page }) => {
    const shadow =
      await page
        .locator(
          "#card-elevated"
        )
        .evaluate(
          (element) =>
            getComputedStyle(
              element
            ).boxShadow
        );


    expect(
      shadow
    ).not.toBe("none");
  }
);


test(
  "Dark Card follows Dark semantic surface",
  async ({ page }) => {
    await expect(
      page.locator(
        "#card-dark-default"
      )
    ).toHaveCSS(
      "background-color",
      "rgb(15, 27, 45)"
    );
  }
);


test(
  "Dark Bordered Card follows Dark semantic border",
  async ({ page }) => {
    await expect(
      page.locator(
        "#card-dark-bordered"
      )
    ).toHaveCSS(
      "border-color",
      "rgb(46, 64, 87)"
    );
  }
);


test(
  "Card Core is not focusable by default",
  async ({ page }) => {
    const tabIndex =
      await page
        .locator(
          "#card-basic"
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
  "interactive descendants retain their native keyboard behavior",
  async ({ page }) => {
    const button =
      page.locator(
        "#card-primary-action"
      );


    await button.focus();


    await expect(
      button
    ).toBeFocused();


    await expect(
      button
    ).toHaveCSS(
      "outline-width",
      "2px"
    );
  }
);


test(
  "long Card content remains inside its narrow container",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 900,
    });


    const cardBox =
      await page
        .locator(
          "#card-long"
        )
        .boundingBox();

    const containerBox =
      await page
        .locator(
          "#card-narrow-container"
        )
        .boundingBox();


    expect(
      cardBox
    ).not.toBeNull();

    expect(
      containerBox
    ).not.toBeNull();


    expect(
      cardBox.width
    ).toBeLessThanOrEqual(
      containerBox.width + 1
    );
  }
);


test(
  "Card actions wrap safely on narrow viewport",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 900,
    });


    const actions =
      page
        .locator(
          "#card-long .rm-card__actions"
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
  "Card demo has no horizontal page overflow",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 900,
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