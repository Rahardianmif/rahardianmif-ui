import {
  expect,
  test,
} from "@playwright/test";


test.setTimeout(
  60_000
);


const fixture =
  "/examples/navigation/sidebar.html";


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
  "Sidebar exposes a navigation landmark",
  async ({ page }) => {
    await expect(
      page.getByRole(
        "navigation",
        {
          name:
            "Administration navigation — Light Theme",

          exact: true,
        }
      )
    ).toBeVisible();
  }
);


test(
  "Sidebar exposes a header",
  async ({ page }) => {
    await expect(
      page.locator(
        "#sidebar-light .rm-sidebar__header"
      )
    ).toHaveText(
      "Administration"
    );
  }
);


test(
  "Sidebar supports multiple sections",
  async ({ page }) => {
    await expect(
      page.locator(
        "#sidebar-light .rm-sidebar__section"
      )
    ).toHaveCount(
      2
    );
  }
);


test(
  "Sidebar sections use native lists",
  async ({ page }) => {
    const lists =
      page.locator(
        "#sidebar-light .rm-sidebar__list"
      );


    await expect(
      lists
    ).toHaveCount(
      2
    );


    await expect(
      lists.first()
    ).toHaveJSProperty(
      "tagName",
      "UL"
    );
  }
);


test(
  "Sidebar exposes the current destination",
  async ({ page }) => {
    await expect(
      page.locator(
        "#sidebar-current"
      )
    ).toHaveAttribute(
      "aria-current",
      "page"
    );
  }
);


test(
  "Sidebar current destination remains a native link",
  async ({ page }) => {
    await expect(
      page.locator(
        "#sidebar-current"
      )
    ).toHaveAttribute(
      "href"
    );
  }
);


test(
  "Sidebar current destination uses Primary Soft background",
  async ({ page }) => {
    const result =
      await getSemanticColor(
        page.locator(
          "#sidebar-current"
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
  "Dark Sidebar current destination follows Dark Primary Soft token",
  async ({ page }) => {
    const result =
      await getSemanticColor(
        page.locator(
          "#sidebar-dark-current"
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
  "Sidebar link exposes visible keyboard focus",
  async ({ page }) => {
    const link =
      page.locator(
        "#sidebar-current"
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
  "Sidebar link can compose an existing Badge",
  async ({ page }) => {
    await expect(
      page.locator(
        "#sidebar-users-link .rm-badge"
      )
    ).toBeVisible();
  }
);


test(
  "Sidebar footer can compose an existing Status Indicator",
  async ({ page }) => {
    await expect(
      page.locator(
        "#sidebar-light .rm-sidebar__footer .rm-status"
      )
    ).toBeVisible();
  }
);


test(
  "Sidebar uses vertical flex layout",
  async ({ page }) => {
    const result =
      await page
        .locator(
          "#sidebar-light"
        )
        .evaluate(
          (element) => {
            const style =
              getComputedStyle(
                element
              );


            return {
              display:
                style.display,

              direction:
                style.flexDirection,
            };
          }
        );


    expect(
      result.display
    ).toBe(
      "flex"
    );


    expect(
      result.direction
    ).toBe(
      "column"
    );
  }
);


test(
  "long Sidebar remains inside narrow container",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 1400,
    });


    const sidebarBox =
      await page
        .locator(
          "#sidebar-narrow"
        )
        .boundingBox();


    const containerBox =
      await page
        .locator(
          "#sidebar-narrow-container"
        )
        .boundingBox();


    expect(
      sidebarBox
    ).not.toBeNull();


    expect(
      containerBox
    ).not.toBeNull();


    expect(
      sidebarBox.width
    ).toBeLessThanOrEqual(
      containerBox.width + 1
    );
  }
);


test(
  "long Sidebar labels remain visible",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 1400,
    });


    await expect(
      page.locator(
        "#sidebar-long-link"
      )
    ).toBeVisible();


    await expect(
      page.locator(
        "#sidebar-long-link"
      )
    ).toContainText(
      "Security Roles"
    );
  }
);


test(
  "Sidebar does not expose collapse controls",
  async ({ page }) => {
    await expect(
      page.locator(
        ".rm-sidebar__toggle"
      )
    ).toHaveCount(
      0
    );


    await expect(
      page.locator(
        ".rm-sidebar--collapsed"
      )
    ).toHaveCount(
      0
    );
  }
);


test(
  "Sidebar demo has no horizontal page overflow",
  async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 1400,
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