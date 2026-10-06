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


const projectRoot =
  fileURLToPath(
    new URL(
      "../../",
      import.meta.url
    )
  );


function resolve(
  relativePath
) {
  return join(
    projectRoot,
    relativePath
  );
}


function read(
  relativePath
) {
  return readFileSync(
    resolve(
      relativePath
    ),
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

  "breadcrumb.css",
  "tabs.css",
  "pagination.css",
  "navbar.css",
  "sidebar.css",
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


const v04ComponentFiles = [
  "breadcrumb.css",
  "tabs.css",
  "pagination.css",
  "navbar.css",
  "sidebar.css",
];


const v03PublicClasses = [
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

  ".rm-status",
  ".rm-status--success",
  ".rm-status--warning",
  ".rm-status--danger",
  ".rm-status--info",
  ".rm-status__indicator",

  ".rm-card",
  ".rm-card--bordered",
  ".rm-card--elevated",
  ".rm-card__header",
  ".rm-card__title",
  ".rm-card__description",
  ".rm-card__body",
  ".rm-card__footer",
  ".rm-card__media",
  ".rm-card__actions",

  ".rm-alert",
  ".rm-alert--info",
  ".rm-alert--success",
  ".rm-alert--warning",
  ".rm-alert--danger",
  ".rm-alert__icon",
  ".rm-alert__content",
  ".rm-alert__title",
  ".rm-alert__message",
  ".rm-alert__actions",

  ".rm-spinner",
  ".rm-spinner--sm",
  ".rm-spinner--lg",

  ".rm-inline-loader",
  ".rm-inline-loader__label",

  ".rm-progress",
  ".rm-progress__header",
  ".rm-progress__label",
  ".rm-progress__value",
  ".rm-progress__track",
  ".rm-progress__bar",
  ".rm-progress__description",

  ".rm-skeleton",
  ".rm-skeleton--text",
  ".rm-skeleton--circle",

  ".rm-feedback-state",
  ".rm-feedback-state--empty",
  ".rm-feedback-state--no-result",
  ".rm-feedback-state--error",
  ".rm-feedback-state__visual",
  ".rm-feedback-state__content",
  ".rm-feedback-state__title",
  ".rm-feedback-state__description",
  ".rm-feedback-state__actions",
];


const v04PublicClasses = [
  ".rm-breadcrumb",
  ".rm-breadcrumb__list",
  ".rm-breadcrumb__item",
  ".rm-breadcrumb__link",
  ".rm-breadcrumb__separator",
  ".rm-breadcrumb__current",

  ".rm-tabs",
  ".rm-tabs__list",
  ".rm-tabs__tab",
  ".rm-tabs__panel",

  ".rm-pagination",
  ".rm-pagination__list",
  ".rm-pagination__item",
  ".rm-pagination__link",
  ".rm-pagination__previous",
  ".rm-pagination__next",
  ".rm-pagination__ellipsis",

  ".rm-navbar",
  ".rm-navbar__brand",
  ".rm-navbar__nav",
  ".rm-navbar__list",
  ".rm-navbar__item",
  ".rm-navbar__link",
  ".rm-navbar__actions",

  ".rm-sidebar",
  ".rm-sidebar__header",
  ".rm-sidebar__nav",
  ".rm-sidebar__section",
  ".rm-sidebar__section-title",
  ".rm-sidebar__list",
  ".rm-sidebar__item",
  ".rm-sidebar__link",
  ".rm-sidebar__footer",
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

  "docs/components/breadcrumb.md",
  "docs/components/tabs.md",
  "docs/components/pagination.md",
  "docs/components/navbar.md",
  "docs/components/sidebar.md",
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

  "examples/navigation/breadcrumb.html",
  "examples/navigation/tabs.html",
  "examples/navigation/pagination.html",
  "examples/navigation/navbar.html",
  "examples/navigation/sidebar.html",
];


function collectClasses(
  filenames
) {
  const classes =
    new Set();


  for (
    const filename
    of filenames
  ) {
    const source =
      read(
        `src/css/components/${filename}`
      );


    const matches =
      source.match(
        /\.rm-[a-z0-9_-]+(?:__[a-z0-9_-]+|--[a-z0-9_-]+)*/gi
      )
      ??
      [];


    for (
      const className
      of matches
    ) {
      classes.add(
        className
      );
    }
  }


  return [
    ...classes,
  ].sort();
}


describe(
  "Rahardianmif UI v0.4 release contract",
  () => {


    it(
      "contains every cumulative component stylesheet through v0.4",
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
      "imports every cumulative component stylesheet through v0.4",
      () => {
        const entry =
          read(
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
        const entry =
          read(
            "src/css/rahardianmif-ui.css"
          );


        const indexes =
          componentFiles.map(
            (
              filename
            ) =>
              entry.indexOf(
                `@import "./components/${filename}";`
              )
          );


        expect(
          indexes.every(
            (
              index
            ) =>
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
        const entry =
          read(
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
            (
              filename
            ) =>
              entry.indexOf(
                `./foundations/${filename}`
              )
          )
          .filter(
            (
              index
            ) =>
              index >= 0
          );


        const themeIndexes = [
          "light-colors.css",
          "dark-colors.css",
          "status-colors.css",
        ]
          .map(
            (
              filename
            ) =>
              entry.indexOf(
                `./themes/${filename}`
              )
          )
          .filter(
            (
              index
            ) =>
              index >= 0
          );


        const componentIndexes =
          componentFiles.map(
            (
              filename
            ) =>
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
            (
              index
            ) =>
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
          const css =
            read(
              `src/css/components/${filename}`
            );


          const classes = [
            ...css.matchAll(
              /\.([A-Za-z_][\w-]*)/g
            ),
          ].map(
            (
              match
            ) =>
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
        expect(
          collectClasses(
            v03ComponentFiles
          )
        ).toEqual(
          [
            ...v03PublicClasses,
          ].sort()
        );
      }
    );


    it(
      "keeps the exact locked v0.4 public class surface",
      () => {
        expect(
          collectClasses(
            v04ComponentFiles
          )
        ).toEqual(
          [
            ...v04PublicClasses,
          ].sort()
        );
      }
    );


    it(
      "contains no hard-coded component colors",
      () => {
        for (
          const filename
          of componentFiles
        ) {
          const css =
            read(
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
      "contains documentation for every cumulative component group",
      () => {
        for (
          const filepath
          of documentationFiles
        ) {
          expect(
            existsSync(
              resolve(
                filepath
              )
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
              resolve(
                filepath
              )
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
            (
              filepath
            ) =>
              filepath
              !==
              "examples/index.html"
          );


        for (
          const filepath
          of nestedDemos
        ) {
          const source =
            read(
              filepath
            );


          expect(
            source
          ).toContain(
            "src/css/rahardianmif-ui.css"
          );
        }
      }
    );


    it(
      "loads the public stylesheet and showcase stylesheet",
      () => {
        const showcase =
          read(
            "examples/index.html"
          );


        expect(
          showcase
        ).toContain(
          "../src/css/rahardianmif-ui.css"
        );


        expect(
          showcase
        ).toContain(
          "./showcase.css"
        );
      }
    );


    it(
      "represents every frozen v0.2 component family in the showcase",
      () => {
        const showcase =
          read(
            "examples/index.html"
          );


        const required = [
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
          const marker
          of required
        ) {
          expect(
            showcase
          ).toContain(
            marker
          );
        }
      }
    );


    it(
      "represents every frozen v0.3 component family in the showcase",
      () => {
        const showcase =
          read(
            "examples/index.html"
          );


        const required = [
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
          const marker
          of required
        ) {
          expect(
            showcase
          ).toContain(
            marker
          );
        }
      }
    );


    it(
      "represents every v0.4 component family in the unified showcase",
      () => {
        const showcase =
          read(
            "examples/index.html"
          );


        const required = [
          "rm-breadcrumb",
          "rm-tabs",
          "rm-pagination",
          "rm-navbar",
          "rm-sidebar",
          "data-rm-tabs",
        ];


        for (
          const marker
          of required
        ) {
          expect(
            showcase
          ).toContain(
            marker
          );
        }
      }
    );


    it(
      "contains Light and Dark showcase previews",
      () => {
        const showcase =
          read(
            "examples/index.html"
          );


        expect(
          showcase
        ).toContain(
          'data-rm-theme="light"'
        );


        expect(
          showcase
        ).toContain(
          'data-rm-theme="dark"'
        );
      }
    );


    it(
      "synchronizes v0.4 release metadata",
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
          "0.4.0"
        );


        expect(
          packageLock.version
        ).toBe(
          "0.4.0"
        );


        if (
          packageLock.packages
          &&
          packageLock.packages[""]
        ) {
          expect(
            packageLock.packages[""].version
          ).toBe(
            "0.4.0"
          );
        }


        expect(
          docsIndex
        ).toContain(
          "v0.4.0 — Navigation"
        );


        expect(
          changelog
        ).toContain(
          "0.4.0 — Navigation"
        );
      }
    );


    it(
      "keeps the public JavaScript API frozen",
      () => {
        const entry =
          read(
            "src/js/rahardianmif-ui.js"
          );


        expect(
          entry
        ).toContain(
          "initTheme"
        );


        expect(
          entry
        ).toContain(
          "initTabs"
        );


        const publicApiMatch =
          entry.match(
            /const\s+RahardianmifUI\s*=\s*\{([\s\S]*?)\};/
          );


        expect(
          publicApiMatch
        ).not.toBeNull();


        const publicApi =
          publicApiMatch[1];


        expect(
          publicApi
        ).toContain(
          "init"
        );


        expect(
          publicApi
        ).not.toContain(
          "initTabs"
        );


        expect(
          publicApi
        ).not.toContain(
          "tabs"
        );
      }
    );


    it(
      "keeps Tabs internal and declarative",
      () => {
        const tabs =
          read(
            "src/js/components/tabs.js"
          );


        expect(
          tabs
        ).toContain(
          "[data-rm-tabs]"
        );


        expect(
          tabs
        ).toContain(
          "initTabs"
        );


        expect(
          tabs
        ).toContain(
          "WeakSet"
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


        expect(
          packageJson.dependencies
          ??
          {}
        ).toEqual({});
      }
    );

  }
);