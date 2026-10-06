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
  "Rahardianmif UI v0.3.4 Spinner + Inline Loader contract",
  () => {
    const spinner = read(
      "src/css/components/spinner.css"
    );

    const inlineLoader = read(
      "src/css/components/inline-loader.css"
    );


    it(
      "provides the locked Spinner API",
      () => {
        const selectors = [
          ".rm-spinner",
          ".rm-spinner--sm",
          ".rm-spinner--lg",
        ];


        for (
          const selector
          of selectors
        ) {
          expect(
            spinner
          ).toContain(
            selector
          );
        }
      }
    );


    it(
      "keeps Medium as the implicit Spinner default",
      () => {
        expect(
          spinner
        ).not.toContain(
          ".rm-spinner--md"
        );
      }
    );


    it(
      "provides the locked Inline Loader API",
      () => {
        expect(
          inlineLoader
        ).toContain(
          ".rm-inline-loader"
        );

        expect(
          inlineLoader
        ).toContain(
          ".rm-inline-loader__label"
        );
      }
    );


    it(
      "does not introduce Inline Loader size modifiers",
      () => {
        expect(
          inlineLoader
        ).not.toContain(
          ".rm-inline-loader--sm"
        );

        expect(
          inlineLoader
        ).not.toContain(
          ".rm-inline-loader--lg"
        );
      }
    );


    it(
      "does not introduce semantic Spinner variants",
      () => {
        const forbidden = [
          ".rm-spinner--success",
          ".rm-spinner--warning",
          ".rm-spinner--danger",
          ".rm-spinner--info",
          ".rm-spinner--primary",
        ];


        for (
          const selector
          of forbidden
        ) {
          expect(
            spinner
          ).not.toContain(
            selector
          );
        }
      }
    );


    it(
      "uses currentColor for Spinner foreground",
      () => {
        expect(
          spinner
        ).toContain(
          "currentColor"
        );
      }
    );


    it(
      "uses transform-based Spinner motion",
      () => {
        expect(
          spinner
        ).toContain(
          "transform: rotate(360deg)"
        );
      }
    );


    it(
      "includes Reduced Motion handling",
      () => {
        expect(
          spinner
        ).toContain(
          "prefers-reduced-motion: reduce"
        );
      }
    );


    it(
      "contains no hard-coded component colors",
      () => {
        const hardCodedColor =
          /#[0-9a-fA-F]{3,8}\b|\brgba?\s*\(|\bhsla?\s*\(/;


        expect(
          spinner
        ).not.toMatch(
          hardCodedColor
        );

        expect(
          inlineLoader
        ).not.toMatch(
          hardCodedColor
        );
      }
    );


    it(
      "does not introduce interactive behavior",
      () => {
        expect(
          spinner
        ).not.toContain(
          ":hover"
        );

        expect(
          spinner
        ).not.toContain(
          ":focus"
        );

        expect(
          inlineLoader
        ).not.toContain(
          ":hover"
        );

        expect(
          inlineLoader
        ).not.toContain(
          ":focus"
        );
      }
    );


    it(
      "loads Spinner and Inline Loader after Alert",
      () => {
        const entry = read(
          "src/css/rahardianmif-ui.css"
        );

        const alertIndex =
          entry.indexOf(
            '@import "./components/alert.css";'
          );

        const spinnerIndex =
          entry.indexOf(
            '@import "./components/spinner.css";'
          );

        const inlineLoaderIndex =
          entry.indexOf(
            '@import "./components/inline-loader.css";'
          );


        expect(
          spinnerIndex
        ).toBeGreaterThan(
          alertIndex
        );

        expect(
          inlineLoaderIndex
        ).toBeGreaterThan(
          spinnerIndex
        );
      }
    );


    it(
      "contains Spinner and Inline Loader documentation",
      () => {
        expect(
          existsSync(
            resolve(
              "docs/components/spinner.md"
            )
          )
        ).toBe(true);

        expect(
          existsSync(
            resolve(
              "docs/components/inline-loader.md"
            )
          )
        ).toBe(true);
      }
    );


    it(
      "contains the v0.3.4 example",
      () => {
        expect(
          existsSync(
            resolve(
              "examples/loading/spinner-inline-loader.html"
            )
          )
        ).toBe(true);

        expect(
          existsSync(
            resolve(
              "examples/loading/loading-demo.css"
            )
          )
        ).toBe(true);
      }
    );


    it(
      "keeps the example connected to the public stylesheet",
      () => {
        const example = read(
          "examples/loading/spinner-inline-loader.html"
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