import {
  expect,
  test,
} from "@playwright/test";


test.setTimeout(
  60_000
);


const fixture =
  "/examples/navigation/pagination.html";


test.beforeEach(
  async ({ page }) => {
    await page.goto(
      fixture,
      {
        waitUntil:
          "domcontentloaded",
      }
    );
  }
);


async function getSemanticColor(
  locator,
  property,
  tokenName
) {
  return locator.evaluate(
    (
      element,
      {
        cssProperty,
        token,
      }
    ) => {
      const style =
        getComputedStyle(
          element
        );


      const actual =
        style.getPropertyValue(
          cssProperty
        );


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
    {
      cssProperty:
        property,

      token:
        tokenName,
    }
  );
}


test(
  "Pagination renders as a navigation landmark",
  async ({ page }) => {
    await expect(
      page.getByRole(
        "navigation",
        {
          name:
            "Results pages — Light Theme",

          exact: true,
        }
      )
    ).toBeVisible();
  }
);


test(
  "Pagination uses a native list",
  async ({ page }) => {
    await expect(
      page.locator(
        "#pagination-light > ul"
      )
    ).toHaveClass(
      "rm-pagination__list"
    );
  }
);


test(
  "Pagination exposes one current page",
  async ({ page }) => {
    await expect(
      page.locator(
        "#pagination-current"
      )
    ).toHaveAttribute(
      "aria-current",
      "page"
    );
  }
);


test(
  "current Pagination page remains a native link",
  async ({ page }) => {
    await expect(
      page.locator(
        "#pagination-current"
      )
    ).toHaveAttribute(
      "href"
    );
  }
);


test(
  "Previous remains a native link",
  async ({ page }) => {
    await expect(
      page.locator(
        "#pagination-previous"
      )
    ).toHaveAttribute(
      "href"
    );
  }
);


test(
  "Next remains a native link",
  async ({ page }) => {
    await expect(
      page.locator(
        "#pagination-next"
      )
    ).toHaveAttribute(
      "href"
    );
  }
);


test(
  "Pagination ellipsis is decorative",
  async ({ page }) => {
    await expect(
      page.locator(
        "#pagination-ellipsis"
      )
    ).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  }
);


test(
  "current page uses Primary semantic border",
  async ({ page }) => {
    const result =
      await getSemanticColor(
        page.locator(
          "#pagination-current"
        ),
        "border-top-color",
        "--rm-primary"
      );


    expect(
      result.actual
    ).toBe(
      result.expected
    );
  }
);


test(
  "Dark current page follows Dark Primary token",
  async ({ page }) => {
    const result =
      await getSemanticColor(
        page.locator(
          "#pagination-dark-current"
        ),
        "border-top-color",
        "--rm-primary"
      );


    expect(
      result.actual
    ).toBe(
      result.expected
    );
  }
);


test(
  "Pagination link exposes visible keyboard focus",
  async ({ page }) => {
    const link =
      page.locator(
        "#pagination-current"
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
  "narrow Pagination remains inside its container",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 1000,
    });


    const paginationBox =
      await page
        .locator(
          "#pagination-narrow"
        )
        .boundingBox();


    const containerBox =
      await page
        .locator(
          "#pagination-narrow-container"
        )
        .boundingBox();


    expect(
      paginationBox
    ).not.toBeNull();


    expect(
      containerBox
    ).not.toBeNull();


    expect(
      paginationBox.width
    ).toBeLessThanOrEqual(
      containerBox.width + 1
    );
  }
);


test(
  "Pagination items wrap on narrow layouts",
  async ({ page }) => {
    const result =
      await page
        .locator(
          "#pagination-narrow .rm-pagination__list"
        )
        .evaluate(
          (element) =>
            getComputedStyle(
              element
            ).flexWrap
        );


    expect(
      result
    ).toBe(
      "wrap"
    );
  }
);


test(
  "Pagination demo has no horizontal page overflow",
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