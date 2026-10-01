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
  "Rahardianmif UI Native Select contract",
  () => {
    const select = read(
      "src/css/components/select.css"
    );


    it(
      "provides the Select base class",
      () => {
        expect(select).toContain(
          ".rm-select"
        );
      }
    );


    it(
      "provides SM, MD and LG sizes",
      () => {
        expect(select).toContain(
          ".rm-select--sm"
        );

        expect(select).toContain(
          ".rm-select--md"
        );

        expect(select).toContain(
          ".rm-select--lg"
        );
      }
    );


    it(
      "implements the locked control heights",
      () => {
        expect(select).toContain(
          "--rm-select-height: 36px"
        );

        expect(select).toContain(
          "--rm-select-height: 44px"
        );

        expect(select).toContain(
          "--rm-select-height: 52px"
        );
      }
    );


    it(
      "uses native Select with custom appearance",
      () => {
        expect(select).toContain(
          "appearance: none"
        );

        expect(select).toContain(
          "background-image:"
        );
      }
    );


    it(
      "implements disabled state",
      () => {
        expect(select).toContain(
          ".rm-select:disabled"
        );
      }
    );


    it(
      "implements invalid state",
      () => {
        expect(select).toContain(
          ".rm-select.is-invalid"
        );

        expect(select).toContain(
          '.rm-select[aria-invalid="true"]'
        );

        expect(select).toContain(
          "var(--rm-danger)"
        );
      }
    );


    it(
      "implements the locked focus contract",
      () => {
        expect(select).toContain(
          ":focus-visible"
        );

        expect(select).toContain(
          "outline: 2px solid var(--rm-primary)"
        );

        expect(select).toContain(
          "outline-offset: 2px"
        );
      }
    );


    it(
      "supports reduced motion",
      () => {
        expect(select).toContain(
          "@media (prefers-reduced-motion: reduce)"
        );

        expect(select).toContain(
          "transition: none"
        );
      }
    );


    it(
      "contains no hard-coded color literals",
      () => {
        expect(
          select
        ).not.toMatch(
          /#[0-9a-fA-F]{3,8}\b/
        );

        expect(
          select
        ).not.toMatch(
          /\brgb\s*\(/
        );
      }
    );


    it(
      "loads after Textarea",
      () => {
        const entry = read(
          "src/css/rahardianmif-ui.css"
        );

        const textareaIndex =
          entry.indexOf(
            '@import "./components/textarea.css";'
          );

        const selectIndex =
          entry.indexOf(
            '@import "./components/select.css";'
          );

        expect(
          selectIndex
        ).toBeGreaterThan(
          textareaIndex
        );
      }
    );
  }
);