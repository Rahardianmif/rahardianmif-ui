import {
  expect,
  test,
} from "@playwright/test";


test.setTimeout(
  60_000
);


const fixture =
  "/examples/navigation/navbar.html";


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
  "Navbar renders as a navigation landmark",
  async ({ page }) => {
    await expect(
      page.getByRole(
        "navigation",
        {
          name:
            "Primary navigation — Light Theme",

          exact: true,
        }
      )
    ).toBeVisible();
  }
);


test(
  "Navbar exposes a brand link",
  async ({ page }) => {
    await expect(
      page.locator(
        "#navbar-brand"
      )
    ).toHaveAttribute(
      "href"
    );


    await expect(
      page.locator(
        "#navbar-brand"
      )
    ).toHaveAccessibleName(
      "Rahardianmif UI"
    );
  }
);


test(
  "Navbar navigation uses a native list",
  async ({ page }) => {
    await expect(
      page.locator(
        "#navbar-light .rm-navbar__nav ul"
      )
    ).toHaveClass(
      "rm-navbar__list"
    );
  }
);


test(
  "Navbar exposes the current destination",
  async ({ page }) => {
    await expect(
      page.locator(
        "#navbar-current"
      )
    ).toHaveAttribute(
      "aria-current",
      "page"
    );
  }
);


test(
  "Navbar current destination remains a native link",
  async ({ page }) => {
    await expect(
      page.locator(
        "#navbar-current"
      )
    ).toHaveAttribute(
      "href"
    );
  }
);


test(
  "Navbar current destination uses Primary Soft background",
  async ({ page }) => {
    const result =
      await getSemanticColor(
        page.locator(
          "#navbar-current"
        ),
        "background-color",
        "--rm-primary-soft"
      );


    expect(
      result.actual
    ).toBe(
      result.expected
    );
  }
);


test(
  "Dark Navbar current destination follows Dark Primary Soft token",
  async ({ page }) => {
    const result =
      await getSemanticColor(
        page.locator(
          "#navbar-dark-current"
        ),
        "background-color",
        "--rm-primary-soft"
      );


    expect(
      result.actual
    ).toBe(
      result.expected
    );
  }
);


test(
  "Navbar link exposes visible keyboard focus",
  async ({ page }) => {
    const link =
      page.locator(
        "#navbar-current"
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
  "Navbar brand exposes visible keyboard focus",
  async ({ page }) => {
    const brand =
      page.locator(
        "#navbar-brand"
      );


    await brand.focus();


    await expect(
      brand
    ).toBeFocused();


    await expect(
      brand
    ).toHaveCSS(
      "outline-width",
      "2px"
    );
  }
);


test(
  "Navbar actions can compose existing components",
  async ({ page }) => {
    await expect(
      page.locator(
        "#navbar-light .rm-navbar__actions .rm-badge"
      )
    ).toBeVisible();


    await expect(
      page.locator(
        "#navbar-light .rm-navbar__actions .rm-button"
      )
    ).toBeVisible();
  }
);


test(
  "Navbar uses wrapping layout",
  async ({ page }) => {
    const result =
      await page
        .locator(
          "#navbar-light"
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
  "narrow Navbar remains inside its container",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 1200,
    });


    const navbarBox =
      await page
        .locator(
          "#navbar-narrow"
        )
        .boundingBox();


    const containerBox =
      await page
        .locator(
          "#navbar-narrow-container"
        )
        .boundingBox();


    expect(
      navbarBox
    ).not.toBeNull();


    expect(
      containerBox
    ).not.toBeNull();


    expect(
      navbarBox.width
    ).toBeLessThanOrEqual(
      containerBox.width + 1
    );
  }
);


test(
  "narrow Navbar long labels remain visible",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 1200,
    });


    await expect(
      page.getByRole(
        "link",
        {
          name:
            "Administration Settings",

          exact: true,
        }
      )
    ).toBeVisible();


    await expect(
      page.getByRole(
        "link",
        {
          name:
            "Roles and Permissions",

          exact: true,
        }
      )
    ).toBeVisible();
  }
);


test(
  "Navbar does not expose a hamburger control",
  async ({ page }) => {
    await expect(
      page.locator(
        ".rm-navbar__toggle"
      )
    ).toHaveCount(
      0
    );


    await expect(
      page.locator(
        ".rm-navbar__hamburger"
      )
    ).toHaveCount(
      0
    );
  }
);


test(
  "Navbar demo has no horizontal page overflow",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 1200,
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