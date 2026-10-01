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
  "Rahardianmif UI Form Field and Input contract",
  () => {
    const field = read(
      "src/css/components/form-field.css"
    );

    const input = read(
      "src/css/components/input.css"
    );


    it(
      "provides the approved Form Field structure",
      () => {
        const selectors = [
          ".rm-field",
          ".rm-field__label",
          ".rm-field__control",
          ".rm-field__description",
          ".rm-field__message",
        ];

        for (const selector of selectors) {
          expect(field).toContain(
            selector
          );
        }
      }
    );


    it(
      "provides the Input base class",
      () => {
        expect(input).toContain(
          ".rm-input"
        );
      }
    );


    it(
      "implements the locked control heights",
      () => {
        expect(input).toContain(
          "--rm-input-height: 36px"
        );

        expect(input).toContain(
          "--rm-input-height: 44px"
        );

        expect(input).toContain(
          "--rm-input-height: 52px"
        );
      }
    );


    it(
      "provides SM, MD and LG modifiers",
      () => {
        expect(input).toContain(
          ".rm-input--sm"
        );

        expect(input).toContain(
          ".rm-input--md"
        );

        expect(input).toContain(
          ".rm-input--lg"
        );
      }
    );


    it(
      "implements disabled and readonly states",
      () => {
        expect(input).toContain(
          ".rm-input:disabled"
        );

        expect(input).toContain(
          ".rm-input[readonly]"
        );
      }
    );


    it(
      "implements the invalid contract",
      () => {
        expect(input).toContain(
          ".rm-input.is-invalid"
        );

        expect(input).toContain(
          '.rm-input[aria-invalid="true"]'
        );

        expect(input).toContain(
          "var(--rm-danger)"
        );
      }
    );


    it(
      "implements the locked focus contract",
      () => {
        expect(input).toContain(
          ":focus-visible"
        );

        expect(input).toContain(
          "outline: 2px solid var(--rm-primary)"
        );

        expect(input).toContain(
          "outline-offset: 2px"
        );
      }
    );


    it(
      "handles reduced motion",
      () => {
        expect(input).toContain(
          "@media (prefers-reduced-motion: reduce)"
        );

        expect(input).toContain(
          "transition: none"
        );
      }
    );


    it(
      "contains no hard-coded colors",
      () => {
        expect(input).not.toMatch(
          /#[0-9a-fA-F]{3,8}\b/
        );

        expect(field).not.toMatch(
          /#[0-9a-fA-F]{3,8}\b/
        );
      }
    );


    it(
      "loads Form Field and Input after Button",
      () => {
        const entry = read(
          "src/css/rahardianmif-ui.css"
        );

        const buttonIndex =
          entry.indexOf(
            '@import "./components/button.css";'
          );

        const fieldIndex =
          entry.indexOf(
            '@import "./components/form-field.css";'
          );

        const inputIndex =
          entry.indexOf(
            '@import "./components/input.css";'
          );

        expect(fieldIndex).toBeGreaterThan(
          buttonIndex
        );

        expect(inputIndex).toBeGreaterThan(
          fieldIndex
        );
      }
    );
  }
);