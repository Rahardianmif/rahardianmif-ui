import {
    expect,
    test,
} from "@playwright/test";


const fixture =
    "/examples/form/choice.html";


test.beforeEach(
    async ({ page }) => {
        await page.goto(fixture);
    }
);


test(
    "Choice sizes follow the locked contract",
    async ({ page }) => {
        const sm =
            page.locator("#checkbox-sm")
                .locator(
                    "xpath=following-sibling::*[contains(@class,'rm-choice__control')]"
                );

        const md =
            page.locator("#checkbox-md")
                .locator(
                    "xpath=following-sibling::*[contains(@class,'rm-choice__control')]"
                );

        const lg =
            page.locator("#checkbox-lg")
                .locator(
                    "xpath=following-sibling::*[contains(@class,'rm-choice__control')]"
                );

        await expect(sm).toHaveCSS(
            "width",
            "16px"
        );

        await expect(md).toHaveCSS(
            "width",
            "20px"
        );

        await expect(lg).toHaveCSS(
            "width",
            "24px"
        );
    }
);


test(
    "Space toggles native Checkbox",
    async ({ page }) => {
        const checkbox =
            page.locator(
                "#checkbox-default"
            );

        await checkbox.focus();

        await checkbox.press("Space");

        await expect(
            checkbox
        ).toBeChecked();

        await checkbox.press("Space");

        await expect(
            checkbox
        ).not.toBeChecked();
    }
);


test(
    "Radio group preserves native selection behavior",
    async ({ page }) => {
        const card =
            page.locator("#radio-card");

        const transfer =
            page.locator(
                "#radio-transfer"
            );

        const transferLabel =
            transfer.locator(
                "xpath=ancestor::label[1]"
            );

        await expect(
            card
        ).toBeChecked();

        await transferLabel.click();

        await expect(
            transfer
        ).toBeChecked();

        await expect(
            card
        ).not.toBeChecked();
    }
);


test(
    "disabled Choice cannot be activated",
    async ({ page }) => {
        await expect(
            page.locator(
                "#checkbox-disabled"
            )
        ).toBeDisabled();

        await expect(
            page.locator(
                "#radio-disabled"
            )
        ).toBeDisabled();
    }
);


test(
    "invalid Checkbox exposes semantic validation",
    async ({ page }) => {
        const checkbox =
            page.locator(
                "#checkbox-invalid"
            );

        await expect(
            checkbox
        ).toHaveAttribute(
            "aria-invalid",
            "true"
        );

        await expect(
            checkbox
        ).toHaveAttribute(
            "aria-describedby",
            "checkbox-invalid-message"
        );
    }
);


test(
    "keyboard focus uses the locked focus contract",
    async ({ page }) => {
        await page.keyboard.press("Tab");

        const checkbox =
            page.locator(
                "#checkbox-default"
            );

        await expect(
            checkbox
        ).toBeFocused();

        const visualControl =
            checkbox.locator(
                "xpath=following-sibling::*[contains(@class,'rm-choice__control')]"
            );

        await expect(
            visualControl
        ).toHaveCSS(
            "outline-width",
            "2px"
        );

        await expect(
            visualControl
        ).toHaveCSS(
            "outline-style",
            "solid"
        );

        await expect(
            visualControl
        ).toHaveCSS(
            "outline-offset",
            "2px"
        );
    }
);


test(
    "Choice motion is removed for reduced motion",
    async ({ page }) => {
        await page.emulateMedia({
            reducedMotion: "reduce",
        });

        await page.goto(fixture);

        const visualControl =
            page.locator(
                "#checkbox-default"
            ).locator(
                "xpath=following-sibling::*[contains(@class,'rm-choice__control')]"
            );

        await expect(
            visualControl
        ).toHaveCSS(
            "transition-duration",
            "0s"
        );
    }
);