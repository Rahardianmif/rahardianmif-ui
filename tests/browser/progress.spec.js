import {
  expect,
  test,
} from "@playwright/test";


const fixture =
  "/examples/loading/progress.html";


test.beforeEach(
  async ({ page }) => {
    await page.goto(fixture);
  }
);


test(
  "Progress track uses the locked default thickness",
  async ({ page }) => {
    const track =
      page.locator(
        "#progress-upload .rm-progress__track"
      );


    await expect(
      track
    ).toHaveCSS(
      "height",
      "8px"
    );
  }
);


test(
  "Light Progress Bar uses Primary semantic color",
  async ({ page }) => {
    await expect(
      page.locator(
        "#progress-upload-bar"
      )
    ).toHaveCSS(
      "background-color",
      "rgb(8, 145, 178)"
    );
  }
);


test(
  "Dark Progress Bar follows Dark Primary semantic color",
  async ({ page }) => {
    await expect(
      page.locator(
        "#progress-dark-bar"
      )
    ).toHaveCSS(
      "background-color",
      "rgb(34, 211, 238)"
    );
  }
);


test(
  "Dark Progress track follows Dark semantic surface",
  async ({ page }) => {
    await expect(
      page.locator(
        "#progress-dark-track"
      )
    ).toHaveCSS(
      "background-color",
      "rgb(28, 43, 64)"
    );
  }
);


test(
  "65 percent visual Bar occupies approximately 65 percent of Track",
  async ({ page }) => {
    const trackBox =
      await page
        .locator(
          "#progress-upload .rm-progress__track"
        )
        .boundingBox();

    const barBox =
      await page
        .locator(
          "#progress-upload-bar"
        )
        .boundingBox();


    expect(
      trackBox
    ).not.toBeNull();

    expect(
      barBox
    ).not.toBeNull();


    const ratio =
      barBox.width
      /
      trackBox.width;


    expect(
      ratio
    ).toBeGreaterThan(
      0.64
    );

    expect(
      ratio
    ).toBeLessThan(
      0.66
    );
  }
);


test(
  "custom semantic range is not restricted to zero through one hundred",
  async ({ page }) => {
    const progress =
      page.locator(
        "#progress-custom-range"
      );


    await expect(
      progress
    ).toHaveAttribute(
      "aria-valuemin",
      "10"
    );

    await expect(
      progress
    ).toHaveAttribute(
      "aria-valuemax",
      "30"
    );

    await expect(
      progress
    ).toHaveAttribute(
      "aria-valuenow",
      "20"
    );
  }
);


test(
  "custom range visual Bar can represent calculated ratio",
  async ({ page }) => {
    const trackBox =
      await page
        .locator(
          "#progress-custom-range .rm-progress__track"
        )
        .boundingBox();

    const barBox =
      await page
        .locator(
          "#progress-custom-range-bar"
        )
        .boundingBox();


    expect(
      trackBox
    ).not.toBeNull();

    expect(
      barBox
    ).not.toBeNull();


    const ratio =
      barBox.width
      /
      trackBox.width;


    expect(
      ratio
    ).toBeGreaterThan(
      0.49
    );

    expect(
      ratio
    ).toBeLessThan(
      0.51
    );
  }
);


test(
  "visible Progress value is optional",
  async ({ page }) => {
    await expect(
      page.locator(
        "#progress-no-visible-value .rm-progress__value"
      )
    ).toHaveCount(
      0
    );


    await expect(
      page.locator(
        "#progress-no-visible-value"
      )
    ).toHaveAttribute(
      "aria-valuenow",
      "40"
    );
  }
);


test(
  "completed Progress remains Primary instead of becoming Success",
  async ({ page }) => {
    await expect(
      page.locator(
        "#progress-complete-bar"
      )
    ).toHaveCSS(
      "background-color",
      "rgb(8, 145, 178)"
    );
  }
);


test(
  "Progress exposes the expected accessible name",
  async ({ page }) => {
    const progress =
      page.locator(
        "#progress-upload"
      );


    await expect(
      progress
    ).toHaveAttribute(
      "role",
      "progressbar"
    );


    await expect(
      progress
    ).toHaveAccessibleName(
      "Upload progress"
    );


    await expect(
      progress
    ).toHaveAttribute(
      "aria-valuenow",
      "65"
    );
  }
);

test(
  "Progress is not focusable by default",
  async ({ page }) => {
    const tabIndex =
      await page
        .locator(
          "#progress-upload"
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
  "long Progress content remains inside narrow container",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 1000,
    });


    const progressBox =
      await page
        .locator(
          "#progress-long"
        )
        .boundingBox();

    const containerBox =
      await page
        .locator(
          "#progress-narrow-container"
        )
        .boundingBox();


    expect(
      progressBox
    ).not.toBeNull();

    expect(
      containerBox
    ).not.toBeNull();


    expect(
      progressBox.width
    ).toBeLessThanOrEqual(
      containerBox.width + 1
    );
  }
);


test(
  "Reduced Motion removes Progress Bar transition",
  async ({ page }) => {
    const normalTransition =
      await page
        .locator(
          "#progress-upload-bar"
        )
        .evaluate(
          (element) =>
            getComputedStyle(
              element
            ).transitionDuration
        );


    expect(
      normalTransition
    ).not.toBe(
      "0s"
    );


    await page.emulateMedia({
      reducedMotion: "reduce",
    });


    const reducedTransition =
      await page
        .locator(
          "#progress-upload-bar"
        )
        .evaluate(
          (element) =>
            getComputedStyle(
              element
            ).transitionDuration
        );


    expect(
      reducedTransition
    ).toBe(
      "0s"
    );
  }
);


test(
  "Progress demo has no horizontal page overflow",
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