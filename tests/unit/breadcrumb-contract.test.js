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
  "Rahardianmif UI v0.4.1 Breadcrumb contract",
  () => {
    const breadcrumb = read(
      "src/css/components/breadcrumb.css"
    );


    it(
      "provides the locked Breadcrumb API",
      () => {
        const selectors = [
          ".rm-breadcrumb",
          ".rm-breadcrumb__list",
          ".rm-breadcrumb__item",
          ".rm-breadcrumb__link",
          ".rm-breadcrumb__separator",
          ".rm-breadcrumb__current",
        ];


        for (
          const selector
          of selectors
        ) {
          expect(
            breadcrumb
          ).toContain(
            selector
          );
        }
      }
    );


    it(
      "does not introduce Breadcrumb size modifiers",
      () => {
        const forbidden = [
          ".rm-breadcrumb--sm",
          ".rm-breadcrumb--md",
          ".rm-breadcrumb--lg",
        ];


        for (
          const selector
          of forbidden
        ) {
          expect(
            breadcrumb
          ).not.toContain(
            selector
          );
        }
      }
    );


    it(
      "does not introduce semantic Breadcrumb variants",
      () => {
        const forbidden = [
          ".rm-breadcrumb--primary",
          ".rm-breadcrumb--success",
          ".rm-breadcrumb--warning",
          ".rm-breadcrumb--danger",
          ".rm-breadcrumb--info",
        ];


        for (
          const selector
          of forbidden
        ) {
          expect(
            breadcrumb
          ).not.toContain(
            selector
          );
        }
      }
    );


    it(
      "supports wrapping for narrow layouts",
      () => {
        expect(
          breadcrumb
        ).toContain(
          "flex-wrap: wrap"
        );
      }
    );


    it(
      "supports long labels",
      () => {
        expect(
          breadcrumb
        ).toContain(
          "overflow-wrap: anywhere"
        );
      }
    );


    it(
      "resets native ordered-list presentation",
      () => {
        expect(
          breadcrumb
        ).toContain(
          "list-style: none"
        );

        expect(
          breadcrumb
        ).toContain(
          "margin: 0"
        );

        expect(
          breadcrumb
        ).toContain(
          "padding: 0"
        );
      }
    );


    it(
      "uses semantic text tokens",
      () => {
        expect(
          breadcrumb
        ).toContain(
          "var(--rm-text-primary)"
        );

        expect(
          breadcrumb
        ).toContain(
          "var(--rm-text-secondary)"
        );

        expect(
          breadcrumb
        ).toContain(
          "var(--rm-text-muted)"
        );
      }
    );


    it(
      "contains no hard-coded component colors",
      () => {
        const hardCodedColor =
          /#[0-9a-fA-F]{3,8}\b|\brgba?\s*\(|\bhsla?\s*\(/;


        expect(
          breadcrumb
        ).not.toMatch(
          hardCodedColor
        );
      }
    );


    it(
      "provides visible focus styling for Breadcrumb links",
      () => {
        expect(
          breadcrumb
        ).toContain(
          ".rm-breadcrumb__link:focus-visible"
        );

        expect(
          breadcrumb
        ).toContain(
          "var(--rm-primary)"
        );
      }
    );


    it(
      "remains theme-independent",
      () => {
        expect(
          breadcrumb
        ).not.toContain(
          '[data-rm-theme="light"]'
        );

        expect(
          breadcrumb
        ).not.toContain(
          '[data-rm-theme="dark"]'
        );
      }
    );


    it(
      "does not introduce component animation",
      () => {
        expect(
          breadcrumb
        ).not.toContain(
          "@keyframes"
        );

        expect(
          breadcrumb
        ).not.toContain(
          "animation:"
        );
      }
    );


    it(
      "loads Breadcrumb after the frozen v0.3 Feedback State",
      () => {
        const entry = read(
          "src/css/rahardianmif-ui.css"
        );


        const feedbackIndex =
          entry.indexOf(
            '@import "./components/feedback-state.css";'
          );


        const breadcrumbIndex =
          entry.indexOf(
            '@import "./components/breadcrumb.css";'
          );


        expect(
          breadcrumbIndex
        ).toBeGreaterThan(
          feedbackIndex
        );
      }
    );


    it(
      "contains Breadcrumb documentation",
      () => {
        expect(
          existsSync(
            resolve(
              "docs/components/breadcrumb.md"
            )
          )
        ).toBe(true);
      }
    );


    it(
      "contains the Breadcrumb example",
      () => {
        expect(
          existsSync(
            resolve(
              "examples/navigation/breadcrumb.html"
            )
          )
        ).toBe(true);
      }
    );


    it(
      "keeps the example connected to the public stylesheet",
      () => {
        const example = read(
          "examples/navigation/breadcrumb.html"
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