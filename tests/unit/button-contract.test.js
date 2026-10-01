import {
  describe,
  expect,
  it,
} from "vitest";

import {
  readFileSync,
} from "node:fs";

import {
  join,
} from "node:path";

import {
  fileURLToPath,
} from "node:url";


const projectRoot = fileURLToPath(
  new URL("../../", import.meta.url)
);


function read(relativePath) {
  return readFileSync(
    join(projectRoot, relativePath),
    "utf8"
  );
}


describe(
  "Rahardianmif UI Button contract",
  () => {
    const button = read(
      "src/css/components/button.css"
    );


    it(
      "provides the approved Button variants",
      () => {
        const variants = [
          ".rm-button--primary",
          ".rm-button--secondary",
          ".rm-button--outline",
          ".rm-button--ghost",
          ".rm-button--danger",
        ];

        for (const variant of variants) {
          expect(
            button
          ).toContain(variant);
        }
      }
    );


    it(
      "provides SM, MD and LG sizes",
      () => {
        expect(button).toContain(
          ".rm-button--sm"
        );

        expect(button).toContain(
          "--rm-button-height: 36px"
        );

        expect(button).toContain(
          ".rm-button--md"
        );

        expect(button).toContain(
          "--rm-button-height: 44px"
        );

        expect(button).toContain(
          ".rm-button--lg"
        );

        expect(button).toContain(
          "--rm-button-height: 52px"
        );
      }
    );


    it(
      "provides full-width and icon modifiers",
      () => {
        expect(button).toContain(
          ".rm-button--full-width"
        );

        expect(button).toContain(
          ".rm-button--icon"
        );
      }
    );


    it(
      "provides loading and disabled states",
      () => {
        expect(button).toContain(
          ".is-loading"
        );

        expect(button).toContain(
          '[aria-busy="true"]'
        );

        expect(button).toContain(
          ":disabled"
        );

        expect(button).toContain(
          ".is-disabled"
        );
      }
    );


    it(
      "implements the locked focus contract",
      () => {
        expect(button).toContain(
          ":focus-visible"
        );

        expect(button).toContain(
          "outline: 2px solid var(--rm-primary)"
        );

        expect(button).toContain(
          "outline-offset: 2px"
        );
      }
    );


    it(
      "handles reduced motion",
      () => {
        expect(button).toContain(
          "@media (prefers-reduced-motion: reduce)"
        );

        expect(button).toContain(
          "transition: none"
        );
      }
    );


    it(
      "contains no hard-coded color literals",
      () => {
        expect(
          button
        ).not.toMatch(
          /#[0-9a-fA-F]{3,8}\b/
        );

        expect(
          button
        ).not.toMatch(
          /\brgb\s*\(/
        );
      }
    );


    it(
      "remains theme-independent",
      () => {
        expect(button).not.toContain(
          '[data-rm-theme="light"]'
        );

        expect(button).not.toContain(
          '[data-rm-theme="dark"]'
        );
      }
    );


    it(
      "loads after Foundations and Themes",
      () => {
        const entry = read(
          "src/css/rahardianmif-ui.css"
        );

        const componentIndex =
          entry.indexOf(
            '@import "./components/button.css";'
          );

        const themeIndex =
          entry.indexOf(
            '@import "./themes/dark-shadow.css";'
          );

        expect(componentIndex).toBeGreaterThan(
          themeIndex
        );
      }
    );


    it(
      "provides semantic foreground tokens in both themes",
      () => {
        const light = read(
          "src/css/themes/light-colors.css"
        );

        const dark = read(
          "src/css/themes/dark-colors.css"
        );

        for (
          const css
          of [light, dark]
        ) {
          expect(css).toContain(
            "--rm-text-on-primary:"
          );

          expect(css).toContain(
            "--rm-text-on-danger:"
          );
        }
      }
    );
  }
);