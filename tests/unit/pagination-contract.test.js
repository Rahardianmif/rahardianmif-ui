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
  "Rahardianmif UI v0.4.3 Pagination contract",
  () => {
    const css = read(
      "src/css/components/pagination.css"
    );


    it(
      "provides the locked Pagination API",
      () => {
        const selectors = [
          ".rm-pagination",
          ".rm-pagination__list",
          ".rm-pagination__item",
          ".rm-pagination__link",
          ".rm-pagination__previous",
          ".rm-pagination__next",
          ".rm-pagination__ellipsis",
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
      "uses aria-current for the current page",
      () => {
        expect(
          css
        ).toContain(
          '[aria-current="page"]'
        );
      }
    );


    it(
      "does not introduce an active state class",
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
          ".rm-pagination--sm",
          ".rm-pagination--md",
          ".rm-pagination--lg",
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
          ".rm-pagination--primary",
          ".rm-pagination--success",
          ".rm-pagination--warning",
          ".rm-pagination--danger",
          ".rm-pagination--info",
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
      "supports wrapping on narrow layouts",
      () => {
        expect(
          css
        ).toContain(
          "flex-wrap: wrap"
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
      "uses semantic color tokens",
      () => {
        const tokens = [
          "var(--rm-surface)",
          "var(--rm-border)",
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
          ":focus-visible"
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
      "does not introduce component JavaScript behavior",
      () => {
        expect(
          existsSync(
            resolve(
              "src/js/components/pagination.js"
            )
          )
        ).toBe(false);
      }
    );


    it(
      "loads Pagination after Tabs",
      () => {
        const entry = read(
          "src/css/rahardianmif-ui.css"
        );


        const tabsIndex =
          entry.indexOf(
            '@import "./components/tabs.css";'
          );


        const paginationIndex =
          entry.indexOf(
            '@import "./components/pagination.css";'
          );


        expect(
          paginationIndex
        ).toBeGreaterThan(
          tabsIndex
        );
      }
    );


    it(
      "contains Pagination documentation",
      () => {
        expect(
          existsSync(
            resolve(
              "docs/components/pagination.md"
            )
          )
        ).toBe(true);
      }
    );


    it(
      "contains the Pagination example",
      () => {
        expect(
          existsSync(
            resolve(
              "examples/navigation/pagination.html"
            )
          )
        ).toBe(true);
      }
    );


    it(
      "keeps the example connected to the public stylesheet",
      () => {
        const example = read(
          "examples/navigation/pagination.html"
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