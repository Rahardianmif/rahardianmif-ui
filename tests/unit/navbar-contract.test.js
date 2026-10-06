import {
  describe,
  expect,
  it,
} from "vitest";

import {
  existsSync,
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


function resolve(relativePath) {
  return join(
    projectRoot,
    relativePath
  );
}


function read(relativePath) {
  return readFileSync(
    resolve(relativePath),
    "utf8"
  );
}


describe(
  "Rahardianmif UI v0.4.4 Navbar contract",
  () => {
    const css = read(
      "src/css/components/navbar.css"
    );


    it(
      "provides the locked Navbar API",
      () => {
        const selectors = [
          ".rm-navbar",
          ".rm-navbar__brand",
          ".rm-navbar__nav",
          ".rm-navbar__list",
          ".rm-navbar__item",
          ".rm-navbar__link",
          ".rm-navbar__actions",
        ];


        for (
          const selector
          of selectors
        ) {
          expect(
            css
          ).toContain(
            selector
          );
        }
      }
    );


    it(
      "uses aria-current for the current destination",
      () => {
        expect(
          css
        ).toContain(
          '[aria-current="page"]'
        );
      }
    );


    it(
      "does not depend on an active state class",
      () => {
        expect(
          css
        ).not.toContain(
          ".is-active"
        );
      }
    );


    it(
      "does not introduce size modifiers",
      () => {
        const forbidden = [
          ".rm-navbar--sm",
          ".rm-navbar--md",
          ".rm-navbar--lg",
        ];


        for (
          const selector
          of forbidden
        ) {
          expect(
            css
          ).not.toContain(
            selector
          );
        }
      }
    );


    it(
      "does not introduce semantic variants",
      () => {
        const forbidden = [
          ".rm-navbar--primary",
          ".rm-navbar--success",
          ".rm-navbar--warning",
          ".rm-navbar--danger",
          ".rm-navbar--info",
        ];


        for (
          const selector
          of forbidden
        ) {
          expect(
            css
          ).not.toContain(
            selector
          );
        }
      }
    );


    it(
      "supports wrapping at the Navbar level",
      () => {
        expect(
          css
        ).toContain(
          "flex-wrap: wrap"
        );
      }
    );


    it(
      "resets native navigation-list presentation",
      () => {
        expect(
          css
        ).toContain(
          "list-style: none"
        );

        expect(
          css
        ).toContain(
          "margin: 0"
        );

        expect(
          css
        ).toContain(
          "padding: 0"
        );
      }
    );


    it(
      "uses semantic color tokens",
      () => {
        const tokens = [
          "var(--rm-surface)",
          "var(--rm-surface-secondary)",
          "var(--rm-border)",
          "var(--rm-text-primary)",
          "var(--rm-text-secondary)",
          "var(--rm-primary)",
          "var(--rm-primary-soft)",
        ];


        for (
          const token
          of tokens
        ) {
          expect(
            css
          ).toContain(
            token
          );
        }
      }
    );


    it(
      "contains no hard-coded component colors",
      () => {
        const hardCodedColor =
          /#[0-9a-fA-F]{3,8}\b|\brgba?\s*\(|\bhsla?\s*\(/;


        expect(
          css
        ).not.toMatch(
          hardCodedColor
        );
      }
    );


    it(
      "provides visible focus styling",
      () => {
        expect(
          css
        ).toContain(
          ".rm-navbar__brand:focus-visible"
        );

        expect(
          css
        ).toContain(
          ".rm-navbar__link:focus-visible"
        );
      }
    );


    it(
      "remains theme-independent",
      () => {
        expect(
          css
        ).not.toContain(
          '[data-rm-theme="light"]'
        );

        expect(
          css
        ).not.toContain(
          '[data-rm-theme="dark"]'
        );
      }
    );


    it(
      "does not introduce Navbar JavaScript",
      () => {
        expect(
          existsSync(
            resolve(
              "src/js/components/navbar.js"
            )
          )
        ).toBe(false);
      }
    );


    it(
      "does not introduce hamburger or drawer selectors",
      () => {
        const forbidden = [
          ".rm-navbar__toggle",
          ".rm-navbar__hamburger",
          ".rm-navbar__drawer",
          ".rm-navbar__menu-button",
        ];


        for (
          const selector
          of forbidden
        ) {
          expect(
            css
          ).not.toContain(
            selector
          );
        }
      }
    );


    it(
      "loads Navbar after Pagination",
      () => {
        const entry = read(
          "src/css/rahardianmif-ui.css"
        );


        const paginationIndex =
          entry.indexOf(
            '@import "./components/pagination.css";'
          );


        const navbarIndex =
          entry.indexOf(
            '@import "./components/navbar.css";'
          );


        expect(
          navbarIndex
        ).toBeGreaterThan(
          paginationIndex
        );
      }
    );


    it(
      "contains Navbar documentation",
      () => {
        expect(
          existsSync(
            resolve(
              "docs/components/navbar.md"
            )
          )
        ).toBe(true);
      }
    );


    it(
      "contains the Navbar example",
      () => {
        expect(
          existsSync(
            resolve(
              "examples/navigation/navbar.html"
            )
          )
        ).toBe(true);
      }
    );


    it(
      "keeps the example connected to the public stylesheet",
      () => {
        const example = read(
          "examples/navigation/navbar.html"
        );


        expect(
          example
        ).toContain(
          "../../src/css/rahardianmif-ui.css"
        );
      }
    );
  }
);