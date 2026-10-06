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
  "Rahardianmif UI v0.3.7 Feedback States contract",
  () => {
    const feedback = read(
      "src/css/components/feedback-state.css"
    );


    it(
      "provides the locked Feedback State anatomy",
      () => {
        const selectors = [
          ".rm-feedback-state",
          ".rm-feedback-state__visual",
          ".rm-feedback-state__content",
          ".rm-feedback-state__title",
          ".rm-feedback-state__description",
          ".rm-feedback-state__actions",
        ];


        for (
          const selector
          of selectors
        ) {
          expect(
            feedback
          ).toContain(
            selector
          );
        }
      }
    );


    it(
      "provides only the approved state modifiers",
      () => {
        const selectors = [
          ".rm-feedback-state--empty",
          ".rm-feedback-state--no-result",
          ".rm-feedback-state--error",
        ];


        for (
          const selector
          of selectors
        ) {
          expect(
            feedback
          ).toContain(
            selector
          );
        }
      }
    );


    it(
      "does not introduce Success or Warning states",
      () => {
        expect(
          feedback
        ).not.toContain(
          ".rm-feedback-state--success"
        );

        expect(
          feedback
        ).not.toContain(
          ".rm-feedback-state--warning"
        );
      }
    );


    it(
      "does not introduce Offline or Maintenance states",
      () => {
        expect(
          feedback
        ).not.toContain(
          ".rm-feedback-state--offline"
        );

        expect(
          feedback
        ).not.toContain(
          ".rm-feedback-state--maintenance"
        );
      }
    );


    it(
      "does not introduce size modifiers",
      () => {
        const forbidden = [
          ".rm-feedback-state--sm",
          ".rm-feedback-state--md",
          ".rm-feedback-state--lg",
        ];


        for (
          const selector
          of forbidden
        ) {
          expect(
            feedback
          ).not.toContain(
            selector
          );
        }
      }
    );


    it(
      "uses semantic tokens",
      () => {
        expect(
          feedback
        ).toContain(
          "var(--rm-surface)"
        );

        expect(
          feedback
        ).toContain(
          "var(--rm-danger)"
        );

        expect(
          feedback
        ).toContain(
          "var(--rm-info)"
        );
      }
    );


    it(
      "contains no hard-coded component colors",
      () => {
        const hardCodedColor =
          /#[0-9a-fA-F]{3,8}\b|\brgba?\s*\(|\bhsla?\s*\(/;


        expect(
          feedback
        ).not.toMatch(
          hardCodedColor
        );
      }
    );


    it(
      "remains theme-independent",
      () => {
        expect(
          feedback
        ).not.toContain(
          '[data-rm-theme="light"]'
        );

        expect(
          feedback
        ).not.toContain(
          '[data-rm-theme="dark"]'
        );
      }
    );


    it(
      "does not introduce interactive container behavior",
      () => {
        expect(
          feedback
        ).not.toContain(
          ".rm-feedback-state:hover"
        );

        expect(
          feedback
        ).not.toContain(
          ".rm-feedback-state:focus"
        );

        expect(
          feedback
        ).not.toContain(
          "cursor: pointer"
        );
      }
    );


    it(
      "does not introduce fullscreen behavior",
      () => {
        expect(
          feedback
        ).not.toContain(
          ".rm-feedback-state--fullscreen"
        );
      }
    );


    it(
      "loads Feedback State after Skeleton",
      () => {
        const entry = read(
          "src/css/rahardianmif-ui.css"
        );

        const skeletonIndex =
          entry.indexOf(
            '@import "./components/skeleton.css";'
          );

        const feedbackIndex =
          entry.indexOf(
            '@import "./components/feedback-state.css";'
          );


        expect(
          feedbackIndex
        ).toBeGreaterThan(
          skeletonIndex
        );
      }
    );


    it(
      "contains documentation and example",
      () => {
        expect(
          existsSync(
            resolve(
              "docs/components/feedback-state.md"
            )
          )
        ).toBe(true);


        expect(
          existsSync(
            resolve(
              "examples/feedback-state/index.html"
            )
          )
        ).toBe(true);
      }
    );


    it(
      "keeps the example connected to the public stylesheet",
      () => {
        const example = read(
          "examples/feedback-state/index.html"
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