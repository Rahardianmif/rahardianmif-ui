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
  "Rahardianmif UI Choice contract",
  () => {
    const choice = read(
      "src/css/components/choice.css"
    );


    it(
      "provides Checkbox and Radio native classes",
      () => {
        expect(choice).toContain(
          ".rm-checkbox"
        );

        expect(choice).toContain(
          ".rm-radio"
        );
      }
    );


    it(
      "provides the approved Choice structure",
      () => {
        expect(choice).toContain(
          ".rm-choice"
        );

        expect(choice).toContain(
          ".rm-choice__control"
        );

        expect(choice).toContain(
          ".rm-choice__label"
        );

        expect(choice).toContain(
          ".rm-choice__description"
        );
      }
    );


    it(
      "provides SM, MD and LG sizes",
      () => {
        expect(choice).toContain(
          ".rm-choice--sm"
        );

        expect(choice).toContain(
          ".rm-choice--md"
        );

        expect(choice).toContain(
          ".rm-choice--lg"
        );
      }
    );


    it(
      "implements the locked control sizes",
      () => {
        expect(choice).toContain(
          "--rm-choice-size: 16px"
        );

        expect(choice).toContain(
          "--rm-choice-size: 20px"
        );

        expect(choice).toContain(
          "--rm-choice-size: 24px"
        );
      }
    );


    it(
      "uses semantic checked color",
      () => {
        expect(choice).toContain(
          "var(--rm-primary)"
        );
      }
    );


    it(
      "implements disabled state",
      () => {
        expect(choice).toContain(
          ".rm-checkbox:disabled"
        );

        expect(choice).toContain(
          ".rm-radio:disabled"
        );

        expect(choice).toContain(
          "cursor: not-allowed"
        );
      }
    );


    it(
      "implements invalid state",
      () => {
        expect(choice).toContain(
          ".rm-choice.is-invalid"
        );

        expect(choice).toContain(
          '[aria-invalid="true"]'
        );

        expect(choice).toContain(
          "var(--rm-danger)"
        );
      }
    );


    it(
      "implements the locked focus contract",
      () => {
        expect(choice).toContain(
          ":focus-visible"
        );

        expect(choice).toContain(
          "outline: 2px solid var(--rm-primary)"
        );

        expect(choice).toContain(
          "outline-offset: 2px"
        );
      }
    );


    it(
      "supports reduced motion",
      () => {
        expect(choice).toContain(
          "@media (prefers-reduced-motion: reduce)"
        );

        expect(choice).toContain(
          "transition: none"
        );
      }
    );


    it(
      "loads after Native Select",
      () => {
        const entry = read(
          "src/css/rahardianmif-ui.css"
        );

        const selectIndex =
          entry.indexOf(
            '@import "./components/select.css";'
          );

        const choiceIndex =
          entry.indexOf(
            '@import "./components/choice.css";'
          );

        expect(
          choiceIndex
        ).toBeGreaterThan(
          selectIndex
        );
      }
    );
  }
);