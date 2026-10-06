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
  "Rahardianmif UI v0.4.5 Sidebar contract",
  () => {
    const css = read(
      "src/css/components/sidebar.css"
    );


    it(
      "provides the locked Sidebar API",
      () => {
        const selectors = [
          ".rm-sidebar",
          ".rm-sidebar__header",
          ".rm-sidebar__nav",
          ".rm-sidebar__section",
          ".rm-sidebar__section-title",
          ".rm-sidebar__list",
          ".rm-sidebar__item",
          ".rm-sidebar__link",
          ".rm-sidebar__footer",
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
      "does not depend on is-active",
      () => {
        expect(
          css
        ).not.toContain(
          ".is-active"
        );
      }
    );


    it(
      "uses vertical layout",
      () => {
        expect(
          css
        ).toContain(
          "flex-direction: column"
        );
      }
    );


    it(
      "resets native list presentation",
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
      "supports long navigation labels",
      () => {
        expect(
          css
        ).toContain(
          "overflow-wrap: anywhere"
        );

        expect(
          css
        ).toContain(
          "min-inline-size: 0"
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
          "var(--rm-border-soft)",
          "var(--rm-text-primary)",
          "var(--rm-text-secondary)",
          "var(--rm-text-muted)",
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
          ".rm-sidebar__link:focus-visible"
        );

        expect(
          css
        ).toContain(
          "var(--rm-primary)"
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
      "does not introduce size modifiers",
      () => {
        const forbidden = [
          ".rm-sidebar--sm",
          ".rm-sidebar--md",
          ".rm-sidebar--lg",
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
      "does not introduce collapsed or drawer APIs",
      () => {
        const forbidden = [
          ".rm-sidebar--collapsed",
          ".rm-sidebar--mini",
          ".rm-sidebar--drawer",
          ".rm-sidebar__toggle",
          ".rm-sidebar__resize",
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
      "does not introduce Sidebar JavaScript",
      () => {
        expect(
          existsSync(
            resolve(
              "src/js/components/sidebar.js"
            )
          )
        ).toBe(false);
      }
    );


    it(
      "loads Sidebar after Navbar",
      () => {
        const entry = read(
          "src/css/rahardianmif-ui.css"
        );


        const navbarIndex =
          entry.indexOf(
            '@import "./components/navbar.css";'
          );


        const sidebarIndex =
          entry.indexOf(
            '@import "./components/sidebar.css";'
          );


        expect(
          sidebarIndex
        ).toBeGreaterThan(
          navbarIndex
        );
      }
    );


    it(
      "contains Sidebar documentation",
      () => {
        expect(
          existsSync(
            resolve(
              "docs/components/sidebar.md"
            )
          )
        ).toBe(true);
      }
    );


    it(
      "contains the Sidebar example",
      () => {
        expect(
          existsSync(
            resolve(
              "examples/navigation/sidebar.html"
            )
          )
        ).toBe(true);
      }
    );


    it(
      "keeps the example connected to the public stylesheet",
      () => {
        const example = read(
          "examples/navigation/sidebar.html"
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