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


/* ========================================
 * Cumulative CSS Components
 * ======================================== */

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

  "modal.css",
  "drawer.css",
  "tooltip.css",
  "popover.css",
  "dropdown.css",
  "disclosure.css",
];


/* ========================================
 * Frozen v0.3
 * ======================================== */

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


/* ========================================
 * Frozen v0.4
 * ======================================== */

const v04ComponentFiles = [
  "breadcrumb.css",
  "tabs.css",
  "pagination.css",
  "navbar.css",
  "sidebar.css",
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


/* ========================================
 * v0.5 Modal + Overlays
 * ======================================== */

const v05ComponentFiles = [
  "modal.css",
  "drawer.css",
  "tooltip.css",
  "popover.css",
  "dropdown.css",
  "disclosure.css",
];


const v05RequiredClasses = {
  "modal.css": [
    ".rm-modal",
    ".rm-modal__header",
    ".rm-modal__title",
    ".rm-modal__body",
    ".rm-modal__footer",
    ".rm-modal__close",
    ".rm-modal--sm",
    ".rm-modal--lg",
    ".rm-modal--scrollable",
    ".rm-modal--fullscreen",
  ],

  "drawer.css": [
    ".rm-drawer",
    ".rm-drawer__header",
    ".rm-drawer__title",
    ".rm-drawer__body",
    ".rm-drawer__footer",
    ".rm-drawer__close",
    ".rm-drawer--start",
    ".rm-drawer--end",
  ],

  "tooltip.css": [
    ".rm-tooltip",
  ],

  "popover.css": [
    ".rm-popover",
    ".rm-popover__header",
    ".rm-popover__title",
    ".rm-popover__body",
    ".rm-popover__footer",
    ".rm-popover__close",
  ],

  "dropdown.css": [
    ".rm-dropdown",
    ".rm-dropdown__item",
    ".rm-dropdown__item--danger",
    ".rm-dropdown__separator",
  ],

  "disclosure.css": [
    ".rm-disclosure",
    ".rm-disclosure__trigger",
    ".rm-disclosure__label",
    ".rm-disclosure__indicator",
    ".rm-disclosure__panel",
    ".rm-accordion",
    ".rm-accordion__item",
  ],
};


/* ========================================
 * Documentation
 * ======================================== */

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

  "docs/components/modal.md",
  "docs/components/drawer.md",
  "docs/components/tooltip.md",
  "docs/components/popover.md",
  "docs/components/dropdown.md",
  "docs/components/disclosure.md",
];


/* ========================================
 * Examples
 * ======================================== */

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

  "examples/overlay/modal.html",
  "examples/overlay/drawer.html",
  "examples/overlay/tooltip.html",
  "examples/overlay/popover.html",
  "examples/overlay/dropdown.html",
  "examples/overlay/disclosure.html",
];


/* ========================================
 * JavaScript
 * ======================================== */

const v05JavaScriptFiles = [
  "src/js/components/modal.js",
  "src/js/components/drawer.js",
  "src/js/components/tooltip.js",
  "src/js/components/popover.js",
  "src/js/components/dropdown.js",
  "src/js/components/disclosure.js",

  "src/js/internal/focus.js",
  "src/js/internal/scroll-lock.js",
  "src/js/internal/overlay-stack.js",
  "src/js/internal/floating.js",
];


/* ========================================
 * Release Contract
 * ======================================== */

describe(
  "Rahardianmif UI v0.5 release contract",
  () => {

    /* ========================================
     * CSS Files
     * ======================================== */

    it(
      "contains every cumulative component stylesheet through v0.5",
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
          ).toBe(
            true
          );
        }
      }
    );


    it(
      "imports every cumulative component stylesheet through v0.5",
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
        ).toBe(
          true
        );


        for (
          let index = 1;
          index < indexes.length;
          index += 1
        ) {
          expect(
            indexes[index]
          ).toBeGreaterThan(
            indexes[
            index - 1
            ]
          );
        }
      }
    );


    /* ========================================
     * Foundation / Theme / Component Order
     * ======================================== */

    it(
      "keeps Foundations before Themes and Components",
      () => {
        const entry =
          read(
            "src/css/rahardianmif-ui.css"
          );


        const expectedCoreImports = [
          "./foundations/colors.css",
          "./foundations/typography.css",
          "./foundations/spacing.css",
          "./foundations/radius.css",
          "./foundations/z-index.css",
          "./foundations/motion.css",
          "./foundations/breakpoints.css",

          "./themes/light-colors.css",
          "./themes/dark-colors.css",
          "./themes/status-colors.css",
          "./themes/light-shadow.css",
          "./themes/dark-shadow.css",

          "./themes/overlay-colors.css",
        ];


        const importMatches = [
          ...entry.matchAll(
            /@import\s+["']([^"']+)["'];/g
          ),
        ];


        const imports =
          importMatches.map(
            (
              match
            ) =>
              match[1]
          );


        expect(
          imports.slice(
            0,
            expectedCoreImports.length
          )
        ).toEqual(
          expectedCoreImports
        );


        const firstComponentIndex =
          imports.findIndex(
            (
              filepath
            ) =>
              filepath.startsWith(
                "./components/"
              )
          );


        expect(
          firstComponentIndex
        ).toBeGreaterThanOrEqual(
          expectedCoreImports.length
        );
      }
    );


    /* ========================================
     * Namespace
     * ======================================== */

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
            ).toBe(
              true
            );
          }
        }
      }
    );


    /* ========================================
     * Frozen Public API
     * ======================================== */

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
      "contains the locked v0.5 public class families",
      () => {
        for (
          const [
            filename,
            requiredClasses,
          ]
          of Object.entries(
            v05RequiredClasses
          )
        ) {
          const classes =
            collectClasses(
              [
                filename,
              ]
            );


          for (
            const className
            of requiredClasses
          ) {
            expect(
              classes
            ).toContain(
              className
            );
          }
        }
      }
    );


    it(
      "does not add a public is-open overlay state",
      () => {
        for (
          const filename
          of v05ComponentFiles
        ) {
          const source =
            read(
              `src/css/components/${filename}`
            );


          expect(
            source
          ).not.toMatch(
            /\.is-open\b/
          );
        }
      }
    );


    /* ========================================
     * Semantic Color Contract
     * ======================================== */

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
      "contains the v0.5 overlay semantic theme file",
      () => {
        expect(
          existsSync(
            resolve(
              "src/css/themes/overlay-colors.css"
            )
          )
        ).toBe(
          true
        );


        expect(
          read(
            "src/css/rahardianmif-ui.css"
          )
        ).toContain(
          '@import "./themes/overlay-colors.css";'
        );
      }
    );


    /* ========================================
     * Documentation
     * ======================================== */

    it(
      "contains documentation for every cumulative component group",
      () => {
        const missingFiles =
          documentationFiles.filter(
            (
              filepath
            ) =>
              !existsSync(
                resolve(
                  filepath
                )
              )
          );


        expect(
          missingFiles,
          `Missing documentation files:\n${missingFiles.join("\n")}`
        ).toEqual(
          []
        );
      }
    );


    /* ========================================
     * Demo / Examples
     * ======================================== */

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
          ).toBe(
            true
          );
        }
      }
    );


    it(
      "keeps every v0.5 demo in examples/overlay",
      () => {
        const expected = [
          "modal.html",
          "drawer.html",
          "tooltip.html",
          "popover.html",
          "dropdown.html",
          "disclosure.html",
        ];


        for (
          const filename
          of expected
        ) {
          expect(
            existsSync(
              resolve(
                `examples/overlay/${filename}`
              )
            )
          ).toBe(
            true
          );
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


    /* ========================================
     * Unified Showcase
     * ======================================== */

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
      "represents every frozen v0.4 component family in the showcase",
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
      "represents every v0.5 component family in the unified showcase",
      () => {
        const showcase =
          read(
            "examples/index.html"
          );


        const required = [
          "rm-modal",
          "data-rm-modal",

          "rm-drawer",
          "data-rm-drawer",

          "rm-tooltip",
          "data-rm-tooltip",

          "rm-popover",
          "data-rm-popover",

          "rm-dropdown",
          "data-rm-dropdown",

          "rm-disclosure",
          "data-rm-disclosure",

          "rm-accordion",
          "data-rm-accordion",
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
      "contains Light and Dark showcase previews through v0.5",
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


        expect(
          showcase
        ).toContain(
          'id="showcase-dark-v05"'
        );
      }
    );


    /* ========================================
     * JavaScript Modules
     * ======================================== */

    it(
      "contains every required v0.5 JavaScript module",
      () => {
        for (
          const filepath
          of v05JavaScriptFiles
        ) {
          expect(
            existsSync(
              resolve(
                filepath
              )
            )
          ).toBe(
            true
          );
        }
      }
    );


    it(
      "keeps v0.5 component initialization wired through the public entry",
      () => {
        const entry =
          read(
            "src/js/rahardianmif-ui.js"
          );


        const requiredImports = [
          "./components/modal.js",
          "./components/drawer.js",
          "./components/tooltip.js",
          "./components/popover.js",
          "./components/dropdown.js",
          "./components/disclosure.js",
        ];


        for (
          const filepath
          of requiredImports
        ) {
          expect(
            entry
          ).toContain(
            filepath
          );
        }
      }
    );


    /* ========================================
     * Public JavaScript API
     * ======================================== */

    it(
      "keeps the public JavaScript API frozen to init",
      () => {
        const entry =
          read(
            "src/js/rahardianmif-ui.js"
          );


        const publicApiMatch =
          entry.match(
            /const\s+RahardianmifUI\s*=\s*\{([\s\S]*?)\};/
          );


        expect(
          publicApiMatch
        ).not.toBeNull();


        const publicApi =
          publicApiMatch[1]
            .replace(
              /\/\*[\s\S]*?\*\//g,
              ""
            )
            .replace(
              /\/\/.*$/gm,
              ""
            );


        expect(
          publicApi
        ).toMatch(
          /\binit\b/
        );


        const forbidden = [
          "initTabs",
          "initModals",
          "initDrawers",
          "initTooltips",
          "initPopovers",
          "initDropdowns",
          "initDisclosures",
        ];


        for (
          const name
          of forbidden
        ) {
          expect(
            publicApi
          ).not.toContain(
            name
          );
        }
      }
    );


    /* ========================================
     * Initialization Contract
     * ======================================== */

    it(
      "keeps v0.5 initialization idempotent without a global MutationObserver",
      () => {
        const componentModules = [
          "modal.js",
          "drawer.js",
          "tooltip.js",
          "popover.js",
          "dropdown.js",
          "disclosure.js",
        ];


        for (
          const filename
          of componentModules
        ) {
          const source =
            read(
              `src/js/components/${filename}`
            );


          expect(
            source
          ).not.toContain(
            "MutationObserver"
          );


          expect(
            source
          ).toContain(
            "WeakSet"
          );
        }
      }
    );


    /* ========================================
     * Release Metadata
     * ======================================== */

    it(
      "synchronizes v0.5 release metadata",
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


        const readme =
          read(
            "README.md"
          );


        const changelog =
          read(
            "CHANGELOG.md"
          );


        expect(
          packageJson.version
        ).toBe(
          "0.5.0"
        );


        expect(
          packageLock.version
        ).toBe(
          "0.5.0"
        );


        if (
          packageLock.packages
          &&
          packageLock.packages[""]
        ) {
          expect(
            packageLock
              .packages[""]
              .version
          ).toBe(
            "0.5.0"
          );
        }


        expect(
          docsIndex
        ).toContain(
          "v0.5.0 — Modal + Overlays"
        );


        expect(
          readme
        ).toContain(
          "v0.5.0 — Modal + Overlays"
        );


        expect(
          changelog
        ).toContain(
          "0.5.0 — Modal + Overlays"
        );
      }
    );


    /* ========================================
     * Syntax Release Gate
     * ======================================== */

    it(
      "keeps the JavaScript syntax release gate cumulative through v0.5",
      () => {
        const packageJson =
          JSON.parse(
            read(
              "package.json"
            )
          );


        const command =
          packageJson
            .scripts?.[
          "check:js"
          ]
          ??
          "";


        const required = [
          "src/js/core/theme-manager.js",

          "src/js/components/tabs.js",

          "src/js/components/modal.js",
          "src/js/components/drawer.js",
          "src/js/components/tooltip.js",
          "src/js/components/popover.js",
          "src/js/components/dropdown.js",
          "src/js/components/disclosure.js",

          "src/js/internal/focus.js",
          "src/js/internal/scroll-lock.js",
          "src/js/internal/overlay-stack.js",
          "src/js/internal/floating.js",

          "src/js/rahardianmif-ui.js",
        ];


        for (
          const filepath
          of required
        ) {
          expect(
            command
          ).toContain(
            filepath
          );
        }
      }
    );


    /* ========================================
     * Runtime Dependencies
     * ======================================== */

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
        ).toEqual(
          {}
        );
      }
    );
  }
);