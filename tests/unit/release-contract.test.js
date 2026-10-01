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


const componentFiles = [
  "button.css",
  "form-field.css",
  "input.css",
  "textarea.css",
  "select.css",
  "choice.css",
  "switch.css",
  "validation.css",
];


const documentationFiles = [
  "docs/components/button.md",
  "docs/components/input.md",
  "docs/components/textarea.md",
  "docs/components/select.md",
  "docs/components/choice.md",
  "docs/components/switch.md",
  "docs/components/validation.md",
];


const demoFiles = [
  "examples/index.html",
  "examples/button/index.html",
  "examples/form/index.html",
  "examples/form/textarea.html",
  "examples/form/select.html",
  "examples/form/choice.html",
  "examples/form/switch.html",
  "examples/form/validation.html",
];


describe(
  "Rahardianmif UI v0.2 release contract",
  () => {
    it(
      "contains every v0.2 component stylesheet",
      () => {
        for (
          const filename
          of componentFiles
        ) {
          expect(
            existsSync(
              resolve(
                `src/css/components/${filename}`
              )
            )
          ).toBe(true);
        }
      }
    );


    it(
      "imports every v0.2 component stylesheet",
      () => {
        const entry = read(
          "src/css/rahardianmif-ui.css"
        );

        for (
          const filename
          of componentFiles
        ) {
          expect(entry).toContain(
            `@import "./components/${filename}";`
          );
        }
      }
    );


    it(
      "keeps Foundations before Themes and Components",
      () => {
        const entry = read(
          "src/css/rahardianmif-ui.css"
        );

        const foundationIndexes = [
          "colors.css",
          "typography.css",
          "spacing.css",
          "radius.css",
          "z-index.css",
          "motion.css",
        ]
          .map(
            (filename) =>
              entry.indexOf(
                `./foundations/${filename}`
              )
          )
          .filter(
            (index) =>
              index >= 0
          );

        const themeIndexes = [
          "light-colors.css",
          "dark-colors.css",
          "status-colors.css",
        ]
          .map(
            (filename) =>
              entry.indexOf(
                `./themes/${filename}`
              )
          )
          .filter(
            (index) =>
              index >= 0
          );

        const componentIndexes =
          componentFiles.map(
            (filename) =>
              entry.indexOf(
                `./components/${filename}`
              )
          );


        expect(
          foundationIndexes.length
        ).toBeGreaterThan(0);

        expect(
          themeIndexes.length
        ).toBeGreaterThan(0);

        expect(
          componentIndexes.every(
            (index) =>
              index >= 0
          )
        ).toBe(true);


        const lastFoundation =
          Math.max(
            ...foundationIndexes
          );

        const firstTheme =
          Math.min(
            ...themeIndexes
          );

        const lastTheme =
          Math.max(
            ...themeIndexes
          );

        const firstComponent =
          Math.min(
            ...componentIndexes
          );


        expect(
          firstTheme
        ).toBeGreaterThan(
          lastFoundation
        );

        expect(
          firstComponent
        ).toBeGreaterThan(
          lastTheme
        );
      }
    );


    it(
      "keeps component classes inside the locked namespace",
      () => {
        for (
          const filename
          of componentFiles
        ) {
          const css = read(
            `src/css/components/${filename}`
          );

          const classes = [
            ...css.matchAll(
              /\.([A-Za-z_][\w-]*)/g
            ),
          ].map(
            (match) =>
              match[1]
          );

          for (
            const className
            of classes
          ) {
            expect(
              className.startsWith("rm-")
              || className.startsWith("is-")
            ).toBe(true);
          }
        }
      }
    );


    it(
      "contains no hard-coded component colors",
      () => {
        for (
          const filename
          of componentFiles
        ) {
          const css = read(
            `src/css/components/${filename}`
          );

          expect(
            css
          ).not.toMatch(
            /#[0-9a-fA-F]{3,8}\b/
          );

          expect(
            css
          ).not.toMatch(
            /\brgba?\s*\(/
          );

          expect(
            css
          ).not.toMatch(
            /\bhsla?\s*\(/
          );
        }
      }
    );


    it(
      "contains documentation for every v0.2 component group",
      () => {
        for (
          const filepath
          of documentationFiles
        ) {
          expect(
            existsSync(
              resolve(filepath)
            )
          ).toBe(true);
        }
      }
    );


    it(
      "contains every required demo",
      () => {
        for (
          const filepath
          of demoFiles
        ) {
          expect(
            existsSync(
              resolve(filepath)
            )
          ).toBe(true);
        }
      }
    );


    it(
      "loads the library stylesheet in nested demos",
      () => {
        const nestedDemos =
          demoFiles.filter(
            (filepath) =>
              filepath
                !== "examples/index.html"
          );

        for (
          const filepath
          of nestedDemos
        ) {
          const html = read(
            filepath
          );

          expect(
            html
          ).toContain(
            "../../src/css/rahardianmif-ui.css"
          );
        }
      }
    );


    it(
      "loads the library stylesheet in the unified showcase",
      () => {
        const html = read(
          "examples/index.html"
        );

        expect(
          html
        ).toContain(
          "../src/css/rahardianmif-ui.css"
        );

        expect(
          html
        ).toContain(
          "./showcase.css"
        );
      }
    );


    it(
      "has no runtime package dependencies",
      () => {
        const packageJson =
          JSON.parse(
            read("package.json")
          );

        const runtimeDependencies =
          packageJson.dependencies
          ?? {};

        expect(
          Object.keys(
            runtimeDependencies
          )
        ).toHaveLength(0);
      }
    );
  }
);