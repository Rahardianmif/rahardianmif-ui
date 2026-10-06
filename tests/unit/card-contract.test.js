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
  "Rahardianmif UI v0.3.2 Card Core contract",
  () => {
    const card = read(
      "src/css/components/card.css"
    );


    it(
      "provides the locked Card Core anatomy",
      () => {
        const selectors = [
          ".rm-card",
          ".rm-card__header",
          ".rm-card__title",
          ".rm-card__description",
          ".rm-card__body",
          ".rm-card__footer",
          ".rm-card__media",
          ".rm-card__actions",
        ];


        for (
          const selector
          of selectors
        ) {
          expect(
            card
          ).toContain(
            selector
          );
        }
      }
    );


    it(
      "provides only the approved presentation modifiers",
      () => {
        expect(
          card
        ).toContain(
          ".rm-card--bordered"
        );

        expect(
          card
        ).toContain(
          ".rm-card--elevated"
        );
      }
    );


    it(
      "does not introduce Card density modifiers",
      () => {
        expect(
          card
        ).not.toContain(
          ".rm-card--compact"
        );

        expect(
          card
        ).not.toContain(
          ".rm-card--comfortable"
        );

        expect(
          card
        ).not.toContain(
          ".rm-card--spacious"
        );
      }
    );


    it(
      "does not introduce Card size modifiers",
      () => {
        expect(
          card
        ).not.toContain(
          ".rm-card--sm"
        );

        expect(
          card
        ).not.toContain(
          ".rm-card--md"
        );

        expect(
          card
        ).not.toContain(
          ".rm-card--lg"
        );
      }
    );


    it(
      "uses the locked Card radius token",
      () => {
        expect(
          card
        ).toContain(
          "border-radius: var(--rm-radius-lg)"
        );
      }
    );


    it(
      "uses the locked Card elevation token",
      () => {
        expect(
          card
        ).toContain(
          "box-shadow: var(--rm-shadow-sm)"
        );
      }
    );


    it(
      "contains no hard-coded component colors",
      () => {
        const hardCodedColor =
          /#[0-9a-fA-F]{3,8}\b|\brgba?\s*\(|\bhsla?\s*\(/;


        expect(
          card
        ).not.toMatch(
          hardCodedColor
        );
      }
    );


    it(
      "remains theme-independent",
      () => {
        expect(
          card
        ).not.toContain(
          '[data-rm-theme="light"]'
        );

        expect(
          card
        ).not.toContain(
          '[data-rm-theme="dark"]'
        );
      }
    );


    it(
      "keeps Card Core non-interactive",
      () => {
        expect(
          card
        ).not.toContain(
          ".rm-card:hover"
        );

        expect(
          card
        ).not.toContain(
          ".rm-card:focus"
        );

        expect(
          card
        ).not.toContain(
          "cursor: pointer"
        );
      }
    );


    it(
      "does not apply arbitrary clipping to Card Core",
      () => {
        expect(
          card
        ).not.toMatch(
          /\.rm-card\s*{[^}]*overflow\s*:\s*hidden/s
        );
      }
    );


    it(
      "loads Card after v0.3.1 components",
      () => {
        const entry = read(
          "src/css/rahardianmif-ui.css"
        );

        const statusIndex =
          entry.indexOf(
            '@import "./components/status.css";'
          );

        const cardIndex =
          entry.indexOf(
            '@import "./components/card.css";'
          );


        expect(
          cardIndex
        ).toBeGreaterThan(
          statusIndex
        );
      }
    );


    it(
      "contains Card documentation",
      () => {
        expect(
          existsSync(
            resolve(
              "docs/components/card.md"
            )
          )
        ).toBe(true);
      }
    );


    it(
      "contains the Card example",
      () => {
        expect(
          existsSync(
            resolve(
              "examples/card/index.html"
            )
          )
        ).toBe(true);

        expect(
          existsSync(
            resolve(
              "examples/card/card-demo.css"
            )
          )
        ).toBe(true);
      }
    );


    it(
      "keeps the Card example connected to the public stylesheet",
      () => {
        const example = read(
          "examples/card/index.html"
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