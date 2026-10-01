import {
    expect,
    test,
} from "@playwright/test";


const fixture =
    "/examples/index.html";


test.beforeEach(
    async ({ page }) => {
        await page.goto(fixture);
    }
);


test(
    "v0.2 showcase loads",
    async ({ page }) => {
        await expect(
            page.getByRole(
                "heading",
                {
                    level: 1,
                    name:
                        "v0.2 — Buttons + Basic Forms",
                }
            )
        ).toBeVisible();
    }
);


test(
    "showcase contains Light and Dark themes",
    async ({ page }) => {
        await expect(
            page.locator(
                '[data-rm-theme="light"]'
            ).last()
        ).toBeVisible();

        await expect(
            page.locator(
                '[data-rm-theme="dark"]'
            )
        ).toBeVisible();
    }
);


test(
    "showcase exposes the v0.2 component families",
    async ({ page }) => {
        const pageText =
            await page
                .locator("main")
                .innerText();

        const expected = [
            "Button",
            "Input",
            "Textarea",
            "Native Select",
            "Checkbox + Radio",
            "Switch",
            "Validation",
        ];

        for (
            const name
            of expected
        ) {
            expect(
                pageText
            ).toContain(name);
        }
    }
);


test(
    "showcase native controls remain interactive",
    async ({ page }) => {
        const checkbox =
            page
                .locator(".rm-checkbox")
                .first();

        const label =
            checkbox.locator(
                "xpath=ancestor::label[1]"
            );

        await expect(
            checkbox
        ).toBeChecked();

        await label.click();

        await expect(
            checkbox
        ).not.toBeChecked();

        await label.click();

        await expect(
            checkbox
        ).toBeChecked();
    }
);


test(
  "showcase keyboard focus remains visible",
  async ({ page }) => {
    const firstLink =
      page
        .locator(
          ".rm-showcase__nav a"
        )
        .first();

    /*
     * Establish keyboard modality first.
     *
     * WebKit may not move the first Tab directly
     * to links depending on its native focus model.
     */
    await page.keyboard.press("Tab");

    await firstLink.focus();

    await expect(
      firstLink
    ).toBeFocused();

    await expect(
      firstLink
    ).toHaveCSS(
      "outline-width",
      "2px"
    );

    await expect(
      firstLink
    ).toHaveCSS(
      "outline-style",
      "solid"
    );

    await expect(
      firstLink
    ).toHaveCSS(
      "outline-offset",
      "2px"
    );
  }
);