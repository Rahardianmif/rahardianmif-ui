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
    join(
      projectRoot,
      relativePath
    ),
    "utf8"
  );
}


describe(
  "Rahardianmif UI v0.3.1 Badge + Status Indicator contract",
  () => {
    const badge = read(
      "src/css/components/badge.css"
    );

    const status = read(
      "src/css/components/status.css"
    );


    it(
      "provides the locked Badge API",
      () => {
        const selectors = [
          ".rm-badge",
          ".rm-badge--sm",
          ".rm-badge--lg",
          ".rm-badge--primary",
          ".rm-badge--success",
          ".rm-badge--warning",
          ".rm-badge--danger",
          ".rm-badge--info",
          ".rm-badge__dot",
          ".rm-badge__icon",
        ];


        for (
          const selector
          of selectors
        ) {
          expect(
            badge
          ).toContain(
            selector
          );
        }
      }
    );


    it(
      "keeps Medium as the implicit default Badge size",
      () => {
        expect(
          badge
        ).not.toContain(
          ".rm-badge--md"
        );
      }
    );


    it(
      "provides the locked Status Indicator API",
      () => {
        const selectors = [
          ".rm-status",
          ".rm-status--success",
          ".rm-status--warning",
          ".rm-status--danger",
          ".rm-status--info",
          ".rm-status__indicator",
        ];


        for (
          const selector
          of selectors
        ) {
          expect(
            status
          ).toContain(
            selector
          );
        }
      }
    );


    it(
      "uses semantic or foundation tokens",
      () => {
        expect(
          badge
        ).toContain(
          "var(--rm-"
        );

        expect(
          status
        ).toContain(
          "var(--rm-"
        );
      }
    );


    it(
      "contains no hard-coded component colors",
      () => {
        const hardCodedColor =
          /#[0-9a-fA-F]{3,8}\b|\brgba?\s*\(|\bhsla?\s*\(/;


        expect(
          badge
        ).not.toMatch(
          hardCodedColor
        );

        expect(
          status
        ).not.toMatch(
          hardCodedColor
        );
      }
    );


    it(
      "keeps Badge non-interactive",
      () => {
        expect(
          badge
        ).not.toContain(
          ":hover"
        );

        expect(
          badge
        ).not.toContain(
          ":focus"
        );

        expect(
          badge
        ).not.toContain(
          "cursor: pointer"
        );
      }
    );


    it(
      "keeps Status Indicator non-interactive",
      () => {
        expect(
          status
        ).not.toContain(
          ":hover"
        );

        expect(
          status
        ).not.toContain(
          ":focus"
        );

        expect(
          status
        ).not.toContain(
          "cursor: pointer"
        );
      }
    );


    it(
      "loads Badge and Status after frozen v0.2 components",
      () => {
        const entry = read(
          "src/css/rahardianmif-ui.css"
        );

        const validationIndex =
          entry.indexOf(
            '@import "./components/validation.css";'
          );

        const badgeIndex =
          entry.indexOf(
            '@import "./components/badge.css";'
          );

        const statusIndex =
          entry.indexOf(
            '@import "./components/status.css";'
          );


        expect(
          badgeIndex
        ).toBeGreaterThan(
          validationIndex
        );

        expect(
          statusIndex
        ).toBeGreaterThan(
          badgeIndex
        );
      }
    );
  }
);