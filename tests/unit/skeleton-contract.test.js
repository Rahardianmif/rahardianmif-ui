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
  "Rahardianmif UI v0.3.6 Skeleton contract",
  () => {
    const skeleton = read(
      "src/css/components/skeleton.css"
    );


    it(
      "provides the locked Skeleton API",
      () => {
        const selectors = [
          ".rm-skeleton",
          ".rm-skeleton--text",
          ".rm-skeleton--circle",
        ];


        for (
          const selector
          of selectors
        ) {
          expect(
            skeleton
          ).toContain(
            selector
          );
        }
      }
    );


    it(
      "does not introduce Skeleton size modifiers",
      () => {
        const forbidden = [
          ".rm-skeleton--sm",
          ".rm-skeleton--md",
          ".rm-skeleton--lg",
        ];


        for (
          const selector
          of forbidden
        ) {
          expect(
            skeleton
          ).not.toContain(
            selector
          );
        }
      }
    );


    it(
      "does not introduce semantic Skeleton variants",
      () => {
        const forbidden = [
          ".rm-skeleton--primary",
          ".rm-skeleton--success",
          ".rm-skeleton--warning",
          ".rm-skeleton--danger",
          ".rm-skeleton--info",
        ];


        for (
          const selector
          of forbidden
        ) {
          expect(
            skeleton
          ).not.toContain(
            selector
          );
        }
      }
    );


    it(
      "does not introduce specialized Skeleton templates",
      () => {
        const forbidden = [
          ".rm-skeleton--card",
          ".rm-skeleton--profile",
          ".rm-skeleton--article",
          ".rm-skeleton--table",
          ".rm-skeleton--list",
          ".rm-skeleton--product",
        ];


        for (
          const selector
          of forbidden
        ) {
          expect(
            skeleton
          ).not.toContain(
            selector
          );
        }
      }
    );


    it(
      "does not introduce width modifiers",
      () => {
        const forbidden = [
          ".rm-skeleton--full",
          ".rm-skeleton--w-25",
          ".rm-skeleton--w-50",
          ".rm-skeleton--w-75",
        ];


        for (
          const selector
          of forbidden
        ) {
          expect(
            skeleton
          ).not.toContain(
            selector
          );
        }
      }
    );


    it(
      "uses semantic surface tokens",
      () => {
        expect(
          skeleton
        ).toContain(
          "var(--rm-surface-secondary)"
        );

        expect(
          skeleton
        ).toContain(
          "var(--rm-surface-strong)"
        );
      }
    );


    it(
      "contains no hard-coded component colors",
      () => {
        const hardCodedColor =
          /#[0-9a-fA-F]{3,8}\b|\brgba?\s*\(|\bhsla?\s*\(/;


        expect(
          skeleton
        ).not.toMatch(
          hardCodedColor
        );
      }
    );


    it(
      "uses the approved shimmer animation",
      () => {
        expect(
          skeleton
        ).toContain(
          "@keyframes rm-skeleton-shimmer"
        );

        expect(
          skeleton
        ).toContain(
          "background-position"
        );
      }
    );


    it(
      "does not use interactive states",
      () => {
        expect(
          skeleton
        ).not.toContain(
          ":hover"
        );

        expect(
          skeleton
        ).not.toContain(
          ":focus"
        );

        expect(
          skeleton
        ).not.toContain(
          "cursor: pointer"
        );
      }
    );


    it(
      "respects Reduced Motion",
      () => {
        expect(
          skeleton
        ).toContain(
          "prefers-reduced-motion: reduce"
        );

        expect(
          skeleton
        ).toContain(
          "animation: none"
        );
      }
    );


    it(
      "keeps Circle shape based on aspect ratio",
      () => {
        expect(
          skeleton
        ).toContain(
          "aspect-ratio: 1"
        );

        expect(
          skeleton
        ).toContain(
          "var(--rm-radius-circle)"
        );
      }
    );


    it(
      "remains theme-independent",
      () => {
        expect(
          skeleton
        ).not.toContain(
          '[data-rm-theme="light"]'
        );

        expect(
          skeleton
        ).not.toContain(
          '[data-rm-theme="dark"]'
        );
      }
    );


    it(
      "loads Skeleton after Progress",
      () => {
        const entry = read(
          "src/css/rahardianmif-ui.css"
        );

        const progressIndex =
          entry.indexOf(
            '@import "./components/progress.css";'
          );

        const skeletonIndex =
          entry.indexOf(
            '@import "./components/skeleton.css";'
          );


        expect(
          skeletonIndex
        ).toBeGreaterThan(
          progressIndex
        );
      }
    );


    it(
      "contains Skeleton documentation and example",
      () => {
        expect(
          existsSync(
            resolve(
              "docs/components/skeleton.md"
            )
          )
        ).toBe(true);


        expect(
          existsSync(
            resolve(
              "examples/loading/skeleton.html"
            )
          )
        ).toBe(true);
      }
    );


    it(
      "keeps the example connected to the public stylesheet",
      () => {
        const example = read(
          "examples/loading/skeleton.html"
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