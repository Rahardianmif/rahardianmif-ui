import {
  expect,
  test,
} from "@playwright/test";


const fixture =
  "/tests/browser/fixtures/theme.html";


async function waitForThemeManager(
  page
) {
  await page.waitForFunction(
    () =>
      window.rmTestThemeReady === true
  );
}


test(
  "restores Light preference",
  async ({ page }) => {
    await page.addInitScript(
      () => {
        localStorage.setItem(
          "rm-theme",
          "light"
        );
      }
    );

    await page.goto(fixture);

    await waitForThemeManager(page);

    await expect(
      page.locator("html")
    ).toHaveAttribute(
      "data-rm-theme",
      "light"
    );

    const preference =
      await page.evaluate(
        () =>
          window.rmTestTheme
            .getThemePreference()
      );

    expect(
      preference
    ).toBe("light");
  }
);


test(
  "restores Dark preference",
  async ({ page }) => {
    await page.addInitScript(
      () => {
        localStorage.setItem(
          "rm-theme",
          "dark"
        );
      }
    );

    await page.goto(fixture);

    await waitForThemeManager(page);

    await expect(
      page.locator("html")
    ).toHaveAttribute(
      "data-rm-theme",
      "dark"
    );

    const preference =
      await page.evaluate(
        () =>
          window.rmTestTheme
            .getThemePreference()
      );

    expect(
      preference
    ).toBe("dark");
  }
);


test(
  "System preference resolves to Dark",
  async ({ page }) => {
    await page.emulateMedia({
      colorScheme: "dark",
    });

    await page.addInitScript(
      () => {
        localStorage.setItem(
          "rm-theme",
          "system"
        );
      }
    );

    await page.goto(fixture);

    await waitForThemeManager(page);

    await expect(
      page.locator("html")
    ).toHaveAttribute(
      "data-rm-theme",
      "dark"
    );

    const preference =
      await page.evaluate(
        () =>
          window.rmTestTheme
            .getThemePreference()
      );

    expect(
      preference
    ).toBe("system");
  }
);


test(
  "System preference follows OS changes",
  async ({ page }) => {
    await page.emulateMedia({
      colorScheme: "dark",
    });

    await page.addInitScript(
      () => {
        localStorage.setItem(
          "rm-theme",
          "system"
        );
      }
    );

    await page.goto(fixture);

    await waitForThemeManager(page);

    await expect(
      page.locator("html")
    ).toHaveAttribute(
      "data-rm-theme",
      "dark"
    );

    await page.emulateMedia({
      colorScheme: "light",
    });

    await expect(
      page.locator("html")
    ).toHaveAttribute(
      "data-rm-theme",
      "light"
    );

    const stored =
      await page.evaluate(
        () =>
          localStorage.getItem(
            "rm-theme"
          )
      );

    expect(
      stored
    ).toBe("system");
  }
);


test(
  "manual preference is not overridden by OS changes",
  async ({ page }) => {
    await page.emulateMedia({
      colorScheme: "light",
    });

    await page.goto(fixture);

    await waitForThemeManager(page);

    await page.evaluate(
      () => {
        window.rmTestTheme
          .setThemePreference(
            "dark"
          );
      }
    );

    await expect(
      page.locator("html")
    ).toHaveAttribute(
      "data-rm-theme",
      "dark"
    );

    await page.emulateMedia({
      colorScheme: "light",
    });

    await expect(
      page.locator("html")
    ).toHaveAttribute(
      "data-rm-theme",
      "dark"
    );

    const stored =
      await page.evaluate(
        () =>
          localStorage.getItem(
            "rm-theme"
          )
      );

    expect(
      stored
    ).toBe("dark");
  }
);


test(
  "invalid stored theme falls back safely",
  async ({ page }) => {
    await page.emulateMedia({
      colorScheme: "dark",
    });

    await page.addInitScript(
      () => {
        localStorage.setItem(
          "rm-theme",
          "purple"
        );
      }
    );

    await page.goto(fixture);

    await waitForThemeManager(page);

    await expect(
      page.locator("html")
    ).toHaveAttribute(
      "data-rm-theme",
      "dark"
    );

    const preference =
      await page.evaluate(
        () =>
          window.rmTestTheme
            .getThemePreference()
      );

    expect(
      preference
    ).toBe("system");
  }
);


test(
  "semantic Primary changes between Light and Dark",
  async ({ page }) => {
    await page.addInitScript(
      () => {
        localStorage.setItem(
          "rm-theme",
          "light"
        );
      }
    );

    await page.goto(fixture);

    await waitForThemeManager(page);

    const lightPrimary =
      await page.evaluate(
        () => {
          const element =
            document.getElementById(
              "primary-probe"
            );

          return getComputedStyle(
            element
          ).color;
        }
      );

    expect(
      lightPrimary
    ).toBe(
      "rgb(8, 145, 178)"
    );

    await page.evaluate(
      () => {
        window.rmTestTheme
          .setThemePreference(
            "dark"
          );
      }
    );

    const darkPrimary =
      await page.evaluate(
        () => {
          const element =
            document.getElementById(
              "primary-probe"
            );

          return getComputedStyle(
            element
          ).color;
        }
      );

    expect(
      darkPrimary
    ).toBe(
      "rgb(34, 211, 238)"
    );
  }
);