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
    "Rahardianmif UI v0.4.2 Tabs contract",
    () => {
        const css = read(
            "src/css/components/tabs.css"
        );

        const js = read(
            "src/js/components/tabs.js"
        );


        it(
            "provides the locked Tabs CSS API",
            () => {
                const selectors = [
                    ".rm-tabs",
                    ".rm-tabs__list",
                    ".rm-tabs__tab",
                    ".rm-tabs__panel",
                ];


                for (
                    const selector
                    of selectors
                ) {
                    expect(
                        css
                    ).toContain(
                        selector
                    );
                }
            }
        );


        it(
            "uses aria-selected as the selected visual state",
            () => {
                expect(
                    css
                ).toContain(
                    '[aria-selected="true"]'
                );
            }
        );


        it(
            "does not introduce an is-active dependency",
            () => {
                expect(
                    css
                ).not.toContain(
                    ".is-active"
                );

                expect(
                    js
                ).not.toContain(
                    "is-active"
                );
            }
        );


        it(
            "supports hidden Tab panels",
            () => {
                expect(
                    css
                ).toContain(
                    ".rm-tabs__panel[hidden]"
                );
            }
        );


        it(
            "contains no hard-coded component colors",
            () => {
                const hardCodedColor =
                    /#[0-9a-fA-F]{3,8}\b|\brgba?\s*\(|\bhsla?\s*\(/;


                expect(
                    css
                ).not.toMatch(
                    hardCodedColor
                );
            }
        );


        it(
            "remains theme-independent",
            () => {
                expect(
                    css
                ).not.toContain(
                    '[data-rm-theme="light"]'
                );

                expect(
                    css
                ).not.toContain(
                    '[data-rm-theme="dark"]'
                );
            }
        );


        it(
            "supports horizontal overflow without page-level sizing",
            () => {
                expect(
                    css
                ).toContain(
                    "overflow-x: auto"
                );

                expect(
                    css
                ).toContain(
                    "white-space: nowrap"
                );
            }
        );


        it(
            "provides visible Tab focus styling",
            () => {
                expect(
                    css
                ).toContain(
                    ".rm-tabs__tab:focus-visible"
                );

                expect(
                    css
                ).toContain(
                    "var(--rm-primary)"
                );
            }
        );


        it(
            "uses declarative data-rm-tabs discovery",
            () => {
                expect(
                    js
                ).toContain(
                    "[data-rm-tabs]"
                );
            }
        );


        it(
            "supports automatic Arrow navigation",
            () => {
                expect(
                    js
                ).toContain(
                    'case "ArrowRight"'
                );

                expect(
                    js
                ).toContain(
                    'case "ArrowLeft"'
                );
            }
        );


        it(
            "supports Home and End keyboard navigation",
            () => {
                expect(
                    js
                ).toContain(
                    'case "Home"'
                );

                expect(
                    js
                ).toContain(
                    'case "End"'
                );
            }
        );


        it(
            "synchronizes aria-selected",
            () => {
                expect(
                    js
                ).toContain(
                    '"aria-selected"'
                );
            }
        );


        it(
            "synchronizes inactive Panel hidden state",
            () => {
                expect(
                    js
                ).toContain(
                    "panel.hidden"
                );
            }
        );


        it(
            "implements roving tabindex",
            () => {
                expect(
                    js
                ).toContain(
                    "tab.tabIndex"
                );
            }
        );


        it(
            "keeps initialization idempotent",
            () => {
                expect(
                    js
                ).toContain(
                    "new WeakSet"
                );

                expect(
                    js
                ).toContain(
                    "initializedTabSets.has"
                );
            }
        );


        it(
            "loads Tabs after Breadcrumb",
            () => {
                const entry = read(
                    "src/css/rahardianmif-ui.css"
                );


                const breadcrumbIndex =
                    entry.indexOf(
                        '@import "./components/breadcrumb.css";'
                    );

                const tabsIndex =
                    entry.indexOf(
                        '@import "./components/tabs.css";'
                    );


                expect(
                    tabsIndex
                ).toBeGreaterThan(
                    breadcrumbIndex
                );
            }
        );


        it(
            "integrates Tabs through the existing public init entry",
            () => {
                const entry = read(
                    "src/js/rahardianmif-ui.js"
                );


                expect(
                    entry
                ).toContain(
                    "initTabs"
                );

                expect(
                    entry
                ).toContain(
                    "initTheme"
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
            }
        );


        it(
            "does not expose a new public Tabs method",
            () => {
                const entry = read(
                    "src/js/rahardianmif-ui.js"
                );


                expect(
                    entry
                ).not.toContain(
                    "tabs:"
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
            }
        );


        it(
            "contains Tabs documentation and example",
            () => {
                expect(
                    existsSync(
                        resolve(
                            "docs/components/tabs.md"
                        )
                    )
                ).toBe(true);


                expect(
                    existsSync(
                        resolve(
                            "examples/navigation/tabs.html"
                        )
                    )
                ).toBe(true);
            }
        );
    }
);