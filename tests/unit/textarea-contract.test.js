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
  "Rahardianmif UI Textarea contract",
  () => {
    const textarea = read(
      "src/css/components/textarea.css"
    );


    it(
      "provides the Textarea base class",
      () => {
        expect(textarea).toContain(
          ".rm-textarea"
        );
      }
    );


    it(
      "provides the approved size modifiers",
      () => {
        expect(textarea).toContain(
          ".rm-textarea--sm"
        );

        expect(textarea).toContain(
          ".rm-textarea--md"
        );

        expect(textarea).toContain(
          ".rm-textarea--lg"
        );
      }
    );


    it(
      "implements the locked minimum heights",
      () => {
        expect(textarea).toContain(
          "--rm-textarea-min-height: 96px"
        );

        expect(textarea).toContain(
          "--rm-textarea-min-height: 120px"
        );

        expect(textarea).toContain(
          "--rm-textarea-min-height: 144px"
        );
      }
    );


    it(
      "allows vertical resize only",
      () => {
        expect(textarea).toContain(
          "resize: vertical"
        );
      }
    );


    it(
      "implements readonly and disabled states",
      () => {
        expect(textarea).toContain(
          ".rm-textarea[readonly]"
        );

        expect(textarea).toContain(
          ".rm-textarea:disabled"
        );
      }
    );


    it(
      "implements invalid state",
      () => {
        expect(textarea).toContain(
          ".rm-textarea.is-invalid"
        );

        expect(textarea).toContain(
          '.rm-textarea[aria-invalid="true"]'
        );

        expect(textarea).toContain(
          "var(--rm-danger)"
        );
      }
    );


    it(
      "implements the locked focus contract",
      () => {
        expect(textarea).toContain(
          ":focus-visible"
        );

        expect(textarea).toContain(
          "outline: 2px solid var(--rm-primary)"
        );

        expect(textarea).toContain(
          "outline-offset: 2px"
        );
      }
    );


    it(
      "supports reduced motion",
      () => {
        expect(textarea).toContain(
          "@media (prefers-reduced-motion: reduce)"
        );

        expect(textarea).toContain(
          "transition: none"
        );
      }
    );


    it(
      "contains no hard-coded colors",
      () => {
        expect(
          textarea
        ).not.toMatch(
          /#[0-9a-fA-F]{3,8}\b/
        );
      }
    );


    it(
      "loads after Input",
      () => {
        const entry = read(
          "src/css/rahardianmif-ui.css"
        );

        const inputIndex =
          entry.indexOf(
            '@import "./components/input.css";'
          );

        const textareaIndex =
          entry.indexOf(
            '@import "./components/textarea.css";'
          );

        expect(
          textareaIndex
        ).toBeGreaterThan(
          inputIndex
        );
      }
    );
  }
);