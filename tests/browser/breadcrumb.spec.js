import {
  expect,
  test,
} from "@playwright/test";


test.setTimeout(
  60_000
);


const fixture =
  "/examples/navigation/breadcrumb.html";


test.beforeEach(
  async ({ page }) => {
    await page.goto(
      fixture,
      {
        waitUntil: "domcontentloaded",
      }
    );
  }
);


/*
 * Resolve a semantic color token into the
 * same computed format returned by CSSOM.
 *
 * Example:
 *
 * #475569
 * becomes
 * rgb(71, 85, 105)
 *
 * This keeps the assertion semantic-token
 * based without hard-coding RGB values.
 */
async function getSemanticColor(
  locator,
  tokenName
) {
  return locator.evaluate(
    (
      element,
      token
    ) => {
      const style =
        getComputedStyle(
          element
        );


      const actual =
        style.color;


      const tokenValue =
        style
          .getPropertyValue(
            token
          )
          .trim();


      const probe =
        document.createElement(
          "span"
        );


      probe.style.color =
        tokenValue;


      document.body.appendChild(
        probe
      );


      const expected =
        getComputedStyle(
          probe
        ).color;


      probe.remove();


      return {
        actual,
        expected,
      };
    },
    tokenName
  );
}


test(
  "Breadcrumb renders as a navigation landmark",
  async ({ page }) => {
    await expect(
      page.getByRole(
        "navigation",
        {
          name:
            "Breadcrumb — Light Theme",

          exact: true,
        }
      )
    ).toBeVisible();
  }
);


test(
  "Breadcrumb uses an ordered list",
  async ({ page }) => {
    await expect(
      page.locator(
        "#breadcrumb-light > ol"
      )
    ).toHaveClass(
      "rm-breadcrumb__list"
    );
  }
);


test(
  "Breadcrumb exposes the current page",
  async ({ page }) => {
    await expect(
      page.locator(
        "#breadcrumb-current"
      )
    ).toHaveAttribute(
      "aria-current",
      "page"
    );


    await expect(
      page.locator(
        "#breadcrumb-current"
      )
    ).toHaveText(
      "Student Detail"
    );
  }
);


test(
  "Breadcrumb separators are decorative",
  async ({ page }) => {
    const separators =
      page.locator(
        "#breadcrumb-light .rm-breadcrumb__separator"
      );


    const count =
      await separators.count();


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
        separators.nth(
          index
        )
      ).toHaveAttribute(
        "aria-hidden",
        "true"
      );
    }
  }
);


test(
  "previous Breadcrumb levels remain native links",
  async ({ page }) => {
    const links =
      page.locator(
        "#breadcrumb-light .rm-breadcrumb__link"
      );


    await expect(
      links
    ).toHaveCount(
      2
    );


    await expect(
      links.first()
    ).toHaveAttribute(
      "href"
    );
  }
);


test(
  "Breadcrumb link uses semantic secondary text color",
  async ({ page }) => {
    const result =
      await getSemanticColor(
        page.locator(
          "#breadcrumb-home-link"
        ),
        "--rm-text-secondary"
      );


    expect(
      result.actual
    ).toBe(
      result.expected
    );
  }
);


test(
  "current Breadcrumb uses semantic primary text color",
  async ({ page }) => {
    const result =
      await getSemanticColor(
        page.locator(
          "#breadcrumb-current"
        ),
        "--rm-text-primary"
      );


    expect(
      result.actual
    ).toBe(
      result.expected
    );
  }
);


test(
  "Dark Breadcrumb follows Dark semantic text tokens",
  async ({ page }) => {
    const result =
      await getSemanticColor(
        page.locator(
          "#breadcrumb-dark-home"
        ),
        "--rm-text-secondary"
      );


    expect(
      result.actual
    ).toBe(
      result.expected
    );
  }
);


test(
  "Breadcrumb link exposes visible keyboard focus",
  async ({ page }) => {
    const link =
      page.locator(
        "#breadcrumb-home-link"
      );


    await page.keyboard.press(
      "Tab"
    );


    await link.focus();


    await expect(
      link
    ).toBeFocused();


    await expect(
      link
    ).toHaveCSS(
      "outline-width",
      "2px"
    );


    await expect(
      link
    ).toHaveCSS(
      "outline-style",
      "solid"
    );
  }
);


test(
  "long Breadcrumb remains inside narrow container",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 1000,
    });


    const breadcrumbBox =
      await page
        .locator(
          "#breadcrumb-long"
        )
        .boundingBox();


    const containerBox =
      await page
        .locator(
          "#breadcrumb-narrow-container"
        )
        .boundingBox();


    expect(
      breadcrumbBox
    ).not.toBeNull();


    expect(
      containerBox
    ).not.toBeNull();


    expect(
      breadcrumbBox.width
    ).toBeLessThanOrEqual(
      containerBox.width + 1
    );
  }
);


test(
  "long current Breadcrumb label remains visible",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 1000,
    });


    await expect(
      page.locator(
        "#breadcrumb-long-current"
      )
    ).toBeVisible();


    await expect(
      page.locator(
        "#breadcrumb-long-current"
      )
    ).toContainText(
      "Pengaturan Administrasi"
    );
  }
);


test(
  "Breadcrumb demo has no horizontal page overflow",
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