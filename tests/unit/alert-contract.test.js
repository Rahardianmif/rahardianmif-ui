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
  "Rahardianmif UI v0.3.3 Alert contract",
  () => {
    const alert = read(
      "src/css/components/alert.css"
    );


    it(
      "provides the locked Alert anatomy",
      () => {
        const selectors = [
          ".rm-alert",
          ".rm-alert__icon",
          ".rm-alert__content",
          ".rm-alert__title",
          ".rm-alert__message",
          ".rm-alert__actions",
        ];


        for (
          const selector
          of selectors
        ) {
          expect(
            alert
          ).toContain(
            selector
          );
        }
      }
    );


    it(
      "provides the locked Alert variants",
      () => {
        const selectors = [
          ".rm-alert--info",
          ".rm-alert--success",
          ".rm-alert--warning",
          ".rm-alert--danger",
        ];


        for (
          const selector
          of selectors
        ) {
          expect(
            alert
          ).toContain(
            selector
          );
        }
      }
    );


    it(
      "does not introduce a Primary Alert variant",
      () => {
        expect(
          alert
        ).not.toContain(
          ".rm-alert--primary"
        );
      }
    );


    it(
      "does not introduce size variants",
      () => {
        expect(
          alert
        ).not.toContain(
          ".rm-alert--sm"
        );

        expect(
          alert
        ).not.toContain(
          ".rm-alert--lg"
        );
      }
    );


    it(
      "does not introduce density variants",
      () => {
        expect(
          alert
        ).not.toContain(
          ".rm-alert--compact"
        );

        expect(
          alert
        ).not.toContain(
          ".rm-alert--comfortable"
        );
      }
    );


    it(
      "contains no hard-coded component colors",
      () => {
        const hardCodedColor =
          /#[0-9a-fA-F]{3,8}\b|\brgba?\s*\(|\bhsla?\s*\(/;


        expect(
          alert
        ).not.toMatch(
          hardCodedColor
        );
      }
    );


    it(
      "remains theme-independent",
      () => {
        expect(
          alert
        ).not.toContain(
          '[data-rm-theme="light"]'
        );

        expect(
          alert
        ).not.toContain(
          '[data-rm-theme="dark"]'
        );
      }
    );


    it(
      "keeps Alert non-interactive",
      () => {
        expect(
          alert
        ).not.toContain(
          ".rm-alert:hover"
        );

        expect(
          alert
        ).not.toContain(
          ".rm-alert:focus"
        );

        expect(
          alert
        ).not.toContain(
          "cursor: pointer"
        );
      }
    );


    it(
      "does not contain dismiss or close behavior",
      () => {
        expect(
          alert
        ).not.toContain(
          ".rm-alert__close"
        );

        expect(
          alert
        ).not.toContain(
          ".rm-alert--dismissible"
        );
      }
    );


    it(
      "loads Alert after Card",
      () => {
        const entry = read(
          "src/css/rahardianmif-ui.css"
        );

        const cardIndex =
          entry.indexOf(
            '@import "./components/card.css";'
          );

        const alertIndex =
          entry.indexOf(
            '@import "./components/alert.css";'
          );


        expect(
          alertIndex
        ).toBeGreaterThan(
          cardIndex
        );
      }
    );


    it(
      "contains Alert documentation",
      () => {
        expect(
          existsSync(
            resolve(
              "docs/components/alert.md"
            )
          )
        ).toBe(true);
      }
    );


    it(
      "contains Alert examples",
      () => {
        expect(
          existsSync(
            resolve(
              "examples/alert/index.html"
            )
          )
        ).toBe(true);

        expect(
          existsSync(
            resolve(
              "examples/alert/alert-demo.css"
            )
          )
        ).toBe(true);
      }
    );


    it(
      "keeps the Alert example connected to the public stylesheet",
      () => {
        const example = read(
          "examples/alert/index.html"
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