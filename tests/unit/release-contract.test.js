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

  "badge.css",
  "status.css",
  "card.css",
  "alert.css",
  "spinner.css",
  "inline-loader.css",
  "progress.css",
  "skeleton.css",
  "feedback-state.css",
];


const v03ComponentFiles = [
  "badge.css",
  "status.css",
  "card.css",
  "alert.css",
  "spinner.css",
  "inline-loader.css",
  "progress.css",
  "skeleton.css",
  "feedback-state.css",
];


const v03PublicClasses = [
  "rm-badge",
  "rm-badge--sm",
  "rm-badge--lg",
  "rm-badge--primary",
  "rm-badge--success",
  "rm-badge--warning",
  "rm-badge--danger",
  "rm-badge--info",
  "rm-badge__dot",
  "rm-badge__icon",

  "rm-status",
  "rm-status--success",
  "rm-status--warning",
  "rm-status--danger",
  "rm-status--info",
  "rm-status__indicator",

  "rm-card",
  "rm-card--bordered",
  "rm-card--elevated",
  "rm-card__header",
  "rm-card__title",
  "rm-card__description",
  "rm-card__body",
  "rm-card__footer",
  "rm-card__media",
  "rm-card__actions",

  "rm-alert",
  "rm-alert--info",
  "rm-alert--success",
  "rm-alert--warning",
  "rm-alert--danger",
  "rm-alert__icon",
  "rm-alert__content",
  "rm-alert__title",
  "rm-alert__message",
  "rm-alert__actions",

  "rm-spinner",
  "rm-spinner--sm",
  "rm-spinner--lg",

  "rm-inline-loader",
  "rm-inline-loader__label",

  "rm-progress",
  "rm-progress__header",
  "rm-progress__label",
  "rm-progress__value",
  "rm-progress__track",
  "rm-progress__bar",
  "rm-progress__description",

  "rm-skeleton",
  "rm-skeleton--text",
  "rm-skeleton--circle",

  "rm-feedback-state",
  "rm-feedback-state--empty",
  "rm-feedback-state--no-result",
  "rm-feedback-state--error",
  "rm-feedback-state__visual",
  "rm-feedback-state__content",
  "rm-feedback-state__title",
  "rm-feedback-state__description",
  "rm-feedback-state__actions",
];


const documentationFiles = [
  "docs/components/button.md",
  "docs/components/input.md",
  "docs/components/textarea.md",
  "docs/components/select.md",
  "docs/components/choice.md",
  "docs/components/switch.md",
  "docs/components/validation.md",

  "docs/components/badge.md",
  "docs/components/status.md",
  "docs/components/card.md",
  "docs/components/alert.md",
  "docs/components/spinner.md",
  "docs/components/inline-loader.md",
  "docs/components/progress.md",
  "docs/components/skeleton.md",
  "docs/components/feedback-state.md",
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

  "examples/feedback/badge-status.html",
  "examples/card/index.html",
  "examples/alert/index.html",
  "examples/loading/spinner-inline-loader.html",
  "examples/loading/progress.html",
  "examples/loading/skeleton.html",
  "examples/feedback-state/index.html",
];


describe(
  "Rahardianmif UI v0.3 release contract",
  () => {

    it(
      "contains every cumulative component stylesheet through v0.3",
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
      "imports every cumulative component stylesheet through v0.3",
      () => {
        const entry = read(
          "src/css/rahardianmif-ui.css"
        );


        for (
          const filename
          of componentFiles
        ) {
          expect(
            entry
          ).toContain(
            `@import "./components/${filename}";`
          );
        }
      }
    );


    it(
      "keeps cumulative component import order stable",
      () => {
        const entry = read(
          "src/css/rahardianmif-ui.css"
        );


        const indexes =
          componentFiles.map(
            (filename) =>
              entry.indexOf(
                `@import "./components/${filename}";`
              )
          );


        expect(
          indexes.every(
            (index) =>
              index >= 0
          )
        ).toBe(true);


        for (
          let index = 1;
          index < indexes.length;
          index += 1
        ) {
          expect(
            indexes[index]
          ).toBeGreaterThan(
            indexes[index - 1]
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
          "breakpoints.css",
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
          "light-shadow.css",
          "dark-shadow.css",
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
        ).toBeGreaterThan(
          0
        );


        expect(
          themeIndexes.length
        ).toBeGreaterThan(
          0
        );


        expect(
          componentIndexes.every(
            (index) =>
              index >= 0
          )
        ).toBe(true);


        expect(
          Math.min(
            ...themeIndexes
          )
        ).toBeGreaterThan(
          Math.max(
            ...foundationIndexes
          )
        );


        expect(
          Math.min(
            ...componentIndexes
          )
        ).toBeGreaterThan(
          Math.max(
            ...themeIndexes
          )
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
              className.startsWith(
                "rm-"
              )
              ||
              className.startsWith(
                "is-"
              )
            ).toBe(true);
          }
        }
      }
    );


    it(
      "keeps the exact locked v0.3 public class surface",
      () => {
        const actualClasses =
          new Set();


        for (
          const filename
          of v03ComponentFiles
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
            actualClasses.add(
              className
            );
          }
        }


        expect(
          [
            ...actualClasses,
          ].sort()
        ).toEqual(
          [
            ...v03PublicClasses,
          ].sort()
        );
      }
    );


    it(
      "contains no hard-coded component colors",
      () => {
        const hardCodedColor =
          /#[0-9a-fA-F]{3,8}\b|\brgba?\s*\(|\bhsla?\s*\(/;


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
            hardCodedColor
          );
        }
      }
    );


    it(
      "contains documentation for every cumulative component group",
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
      "contains every required cumulative demo",
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
      "loads the library stylesheet in every nested demo",
      () => {
        const nestedDemos =
          demoFiles.filter(
            (filepath) =>
              filepath
              !==
              "examples/index.html"
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
      "loads the public stylesheet and showcase stylesheet",
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
      "represents every frozen v0.2 component family in the showcase",
      () => {
        const html = read(
          "examples/index.html"
        );


        const requiredClasses = [
          "rm-button",
          "rm-input",
          "rm-textarea",
          "rm-select",
          "rm-checkbox",
          "rm-radio",
          "rm-switch",
          "is-invalid",
        ];


        for (
          const className
          of requiredClasses
        ) {
          expect(
            html
          ).toContain(
            className
          );
        }
      }
    );


    it(
      "represents every v0.3 component family in the unified showcase",
      () => {
        const html = read(
          "examples/index.html"
        );


        const requiredClasses = [
          "rm-badge",
          "rm-status",
          "rm-card",
          "rm-alert",
          "rm-spinner",
          "rm-inline-loader",
          "rm-progress",
          "rm-skeleton",
          "rm-feedback-state",
        ];


        for (
          const className
          of requiredClasses
        ) {
          expect(
            html
          ).toContain(
            className
          );
        }
      }
    );


    it(
      "contains Light and Dark showcase previews",
      () => {
        const html = read(
          "examples/index.html"
        );


        expect(
          html
        ).toContain(
          'data-rm-theme="light"'
        );


        expect(
          html
        ).toContain(
          'data-rm-theme="dark"'
        );
      }
    );


    it(
      "synchronizes v0.3 release metadata",
      () => {
        const packageJson =
          JSON.parse(
            read(
              "package.json"
            )
          );


        const packageLock =
          JSON.parse(
            read(
              "package-lock.json"
            )
          );


        const docsIndex =
          read(
            "docs/index.md"
          );


        const changelog =
          read(
            "CHANGELOG.md"
          );


        expect(
          packageJson.version
        ).toBe(
          "0.3.0"
        );


        expect(
          packageLock.version
        ).toBe(
          "0.3.0"
        );


        expect(
          packageLock
            .packages?.[""]
            ?.version
        ).toBe(
          "0.3.0"
        );


        expect(
          docsIndex
        ).toContain(
          "v0.3.0 — Cards + Feedback"
        );


        expect(
          changelog
        ).toContain(
          "0.3.0 — Cards + Feedback"
        );
      }
    );


    it(
      "keeps the public JavaScript API frozen",
      () => {
        const entry = read(
          "src/js/rahardianmif-ui.js"
        );


        expect(
          entry
        ).toContain(
          "const RahardianmifUI"
        );


        expect(
          entry
        ).toContain(
          "init,"
        );


        expect(
          entry
        ).not.toMatch(
          /(?:badge|card|alert|spinner|progress|skeleton|feedback)\s*[:,]/
        );
      }
    );


    it(
      "has no runtime package dependencies",
      () => {
        const packageJson =
          JSON.parse(
            read(
              "package.json"
            )
          );


        const runtimeDependencies =
          packageJson.dependencies
          ??
          {};


        expect(
          Object.keys(
            runtimeDependencies
          )
        ).toHaveLength(
          0
        );
      }
    );

  }
);