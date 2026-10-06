import {
  expect,
  test,
} from "@playwright/test";


const fixture =
  "/examples/loading/skeleton.html";


test.beforeEach(
  async ({ page }) => {
    await page.goto(fixture);
  }
);


test(
  "Rectangle Skeleton uses the default radius",
  async ({ page }) => {
    await expect(
      page.locator(
        "#skeleton-rectangle"
      )
    ).toHaveCSS(
      "border-radius",
      "8px"
    );
  }
);


test(
  "Text Skeleton uses the approved text radius",
  async ({ page }) => {
    await expect(
      page.locator(
        "#skeleton-text-full"
      )
    ).toHaveCSS(
      "border-radius",
      "6px"
    );
  }
);


test(
  "Circle Skeleton remains circular",
  async ({ page }) => {
    const skeleton =
      page.locator(
        "#skeleton-circle"
      );


    await expect(
      skeleton
    ).toHaveCSS(
      "border-radius",
      "50%"
    );


    const box =
      await skeleton.boundingBox();


    expect(
      box
    ).not.toBeNull();


    expect(
      Math.abs(
        box.width
        -
        box.height
      )
    ).toBeLessThanOrEqual(
      1
    );
  }
);


test(
  "Skeleton uses shimmer animation in normal motion mode",
  async ({ page }) => {
    await expect(
      page.locator(
        "#skeleton-rectangle"
      )
    ).toHaveCSS(
      "animation-name",
      "rm-skeleton-shimmer"
    );
  }
);


test(
  "Skeleton uses a semantic gradient",
  async ({ page }) => {
    const background =
      await page
        .locator(
          "#skeleton-rectangle"
        )
        .evaluate(
          (element) =>
            getComputedStyle(
              element
            ).backgroundImage
        );


    expect(
      background
    ).toContain(
      "linear-gradient"
    );
  }
);


test(
  "Dark Skeleton receives Dark semantic surface values",
  async ({ page }) => {
    const lightBackground =
      await page
        .locator(
          "#skeleton-rectangle"
        )
        .evaluate(
          (element) =>
            getComputedStyle(
              element
            ).backgroundImage
        );


    const darkBackground =
      await page
        .locator(
          "#skeleton-dark-rectangle"
        )
        .evaluate(
          (element) =>
            getComputedStyle(
              element
            ).backgroundImage
        );


    expect(
      darkBackground
    ).toContain(
      "linear-gradient"
    );


    expect(
      darkBackground
    ).not.toBe(
      lightBackground
    );
  }
);


test(
  "Loading region exposes application-owned busy state",
  async ({ page }) => {
    await expect(
      page.locator(
        "#skeleton-loading-region"
      )
    ).toHaveAttribute(
      "aria-busy",
      "true"
    );
  }
);


test(
  "Skeleton remains non-focusable",
  async ({ page }) => {
    const tabIndex =
      await page
        .locator(
          "#skeleton-rectangle"
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
  "Skeleton fits inside a narrow container",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 1000,
    });


    const skeletonBox =
      await page
        .locator(
          "#skeleton-responsive"
        )
        .boundingBox();

    const containerBox =
      await page
        .locator(
          "#skeleton-narrow-container"
        )
        .boundingBox();


    expect(
      skeletonBox
    ).not.toBeNull();

    expect(
      containerBox
    ).not.toBeNull();


    expect(
      skeletonBox.width
    ).toBeLessThanOrEqual(
      containerBox.width + 1
    );
  }
);


test(
  "Reduced Motion disables Skeleton animation",
  async ({ page }) => {
    await page.emulateMedia({
      reducedMotion: "reduce",
    });


    await expect(
      page.locator(
        "#skeleton-rectangle"
      )
    ).toHaveCSS(
      "animation-name",
      "none"
    );
  }
);


test(
  "Skeleton demo has no horizontal page overflow",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 1000,
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