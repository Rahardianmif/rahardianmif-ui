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
  "Rahardianmif UI v0.3.5 Progress Bar contract",
  () => {
    const progress = read(
      "src/css/components/progress.css"
    );


    it(
      "provides the locked Progress Bar API",
      () => {
        const selectors = [
          ".rm-progress",
          ".rm-progress__header",
          ".rm-progress__label",
          ".rm-progress__value",
          ".rm-progress__track",
          ".rm-progress__bar",
          ".rm-progress__description",
        ];


        for (
          const selector
          of selectors
        ) {
          expect(
            progress
          ).toContain(
            selector
          );
        }
      }
    );


    it(
      "uses Primary semantic color for the Bar",
      () => {
        expect(
          progress
        ).toContain(
          "background: var(--rm-primary)"
        );
      }
    );


    it(
      "does not introduce Progress semantic variants",
      () => {
        const forbidden = [
          ".rm-progress--primary",
          ".rm-progress--success",
          ".rm-progress--warning",
          ".rm-progress--danger",
          ".rm-progress--info",
        ];


        for (
          const selector
          of forbidden
        ) {
          expect(
            progress
          ).not.toContain(
            selector
          );
        }
      }
    );


    it(
      "does not introduce Progress size modifiers",
      () => {
        const forbidden = [
          ".rm-progress--sm",
          ".rm-progress--md",
          ".rm-progress--lg",
        ];


        for (
          const selector
          of forbidden
        ) {
          expect(
            progress
          ).not.toContain(
            selector
          );
        }
      }
    );


    it(
      "does not introduce indeterminate Progress",
      () => {
        expect(
          progress
        ).not.toContain(
          ".rm-progress--indeterminate"
        );
      }
    );


    it(
      "does not introduce striped Progress",
      () => {
        expect(
          progress
        ).not.toContain(
          ".rm-progress--striped"
        );
      }
    );


    it(
      "does not introduce circular Progress",
      () => {
        expect(
          progress
        ).not.toContain(
          ".rm-progress--circular"
        );
      }
    );


    it(
      "defaults visual Bar width to zero",
      () => {
        expect(
          progress
        ).toContain(
          "inline-size: 0%"
        );
      }
    );


    it(
      "supports value transition",
      () => {
        expect(
          progress
        ).toContain(
          "var(--rm-motion-normal)"
        );

        expect(
          progress
        ).toContain(
          "transition:"
        );
      }
    );


    it(
      "respects Reduced Motion",
      () => {
        expect(
          progress
        ).toContain(
          "prefers-reduced-motion: reduce"
        );

        expect(
          progress
        ).toContain(
          "transition: none"
        );
      }
    );


    it(
      "contains no hard-coded component colors",
      () => {
        const hardCodedColor =
          /#[0-9a-fA-F]{3,8}\b|\brgba?\s*\(|\bhsla?\s*\(/;


        expect(
          progress
        ).not.toMatch(
          hardCodedColor
        );
      }
    );


    it(
      "remains theme-independent",
      () => {
        expect(
          progress
        ).not.toContain(
          '[data-rm-theme="light"]'
        );

        expect(
          progress
        ).not.toContain(
          '[data-rm-theme="dark"]'
        );
      }
    );


    it(
      "does not introduce interactive behavior",
      () => {
        expect(
          progress
        ).not.toContain(
          ":hover"
        );

        expect(
          progress
        ).not.toContain(
          ":focus"
        );

        expect(
          progress
        ).not.toContain(
          "cursor: pointer"
        );
      }
    );


    it(
      "loads Progress after Inline Loader",
      () => {
        const entry = read(
          "src/css/rahardianmif-ui.css"
        );

        const loaderIndex =
          entry.indexOf(
            '@import "./components/inline-loader.css";'
          );

        const progressIndex =
          entry.indexOf(
            '@import "./components/progress.css";'
          );


        expect(
          progressIndex
        ).toBeGreaterThan(
          loaderIndex
        );
      }
    );


    it(
      "contains Progress documentation",
      () => {
        expect(
          existsSync(
            resolve(
              "docs/components/progress.md"
            )
          )
        ).toBe(true);
      }
    );


    it(
      "contains the Progress example",
      () => {
        expect(
          existsSync(
            resolve(
              "examples/loading/progress.html"
            )
          )
        ).toBe(true);
      }
    );


    it(
      "keeps the example connected to the public stylesheet",
      () => {
        const example = read(
          "examples/loading/progress.html"
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