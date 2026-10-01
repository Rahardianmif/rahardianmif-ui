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
  "Rahardianmif UI Validation contract",
  () => {
    const css = read(
      "src/css/components/validation.css"
    );


    it(
      "provides required and optional indicators",
      () => {
        expect(css).toContain(
          ".rm-field__required"
        );

        expect(css).toContain(
          ".rm-field__optional"
        );
      }
    );


    it(
      "provides success and error messages",
      () => {
        expect(css).toContain(
          ".rm-field__message--success"
        );

        expect(css).toContain(
          ".rm-field__message--error"
        );
      }
    );


    it(
      "supports valid state",
      () => {
        expect(css).toContain(
          ".is-valid"
        );

        expect(css).toContain(
          "var(--rm-success)"
        );
      }
    );


    it(
      "supports invalid state",
      () => {
        expect(css).toContain(
          ".is-invalid"
        );

        expect(css).toContain(
          '[aria-invalid="true"]'
        );

        expect(css).toContain(
          "var(--rm-danger)"
        );
      }
    );


    it(
      "covers Input, Textarea and Select",
      () => {
        expect(css).toContain(
          ".rm-input"
        );

        expect(css).toContain(
          ".rm-textarea"
        );

        expect(css).toContain(
          ".rm-select"
        );
      }
    );


    it(
      "covers Choice and Switch",
      () => {
        expect(css).toContain(
          ".rm-choice"
        );

        expect(css).toContain(
          ".rm-switch-field"
        );
      }
    );


    it(
      "does not use status color for message text",
      () => {
        const messageBlock =
          css.slice(
            css.indexOf(
              ".rm-field__message--success"
            ),
            css.indexOf(
              "Valid — Text Controls"
            )
          );

        expect(
          messageBlock
        ).not.toContain(
          "var(--rm-success)"
        );

        expect(
          messageBlock
        ).not.toContain(
          "var(--rm-danger)"
        );
      }
    );


    it(
      "loads after Switch",
      () => {
        const entry = read(
          "src/css/rahardianmif-ui.css"
        );

        const switchIndex =
          entry.indexOf(
            '@import "./components/switch.css";'
          );

        const validationIndex =
          entry.indexOf(
            '@import "./components/validation.css";'
          );

        expect(
          validationIndex
        ).toBeGreaterThan(
          switchIndex
        );
      }
    );
  }
);