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
    "Rahardianmif UI Switch contract",
    () => {
        const css = read(
            "src/css/components/switch.css"
        );


        it(
            "provides the approved Switch structure",
            () => {
                const selectors = [
                    ".rm-switch",
                    ".rm-switch-field",
                    ".rm-switch__track",
                    ".rm-switch__thumb",
                    ".rm-switch__label",
                    ".rm-switch__description",
                ];

                for (const selector of selectors) {
                    expect(css).toContain(
                        selector
                    );
                }
            }
        );


        it(
            "provides SM, MD and LG sizes",
            () => {
                expect(css).toContain(
                    ".rm-switch-field--sm"
                );

                expect(css).toContain(
                    ".rm-switch-field--md"
                );

                expect(css).toContain(
                    ".rm-switch-field--lg"
                );
            }
        );


        it(
            "implements the locked track dimensions",
            () => {
                expect(css).toContain(
                    "--rm-switch-width: 32px"
                );

                expect(css).toContain(
                    "--rm-switch-height: 18px"
                );

                expect(css).toContain(
                    "--rm-switch-width: 40px"
                );

                expect(css).toContain(
                    "--rm-switch-height: 22px"
                );

                expect(css).toContain(
                    "--rm-switch-width: 48px"
                );

                expect(css).toContain(
                    "--rm-switch-height: 26px"
                );
            }
        );


        it(
            "uses semantic Primary for checked state",
            () => {
                expect(css).toContain(
                    ".rm-switch:checked"
                );

                expect(css).toContain(
                    "var(--rm-primary)"
                );
            }
        );


        it(
            "implements disabled state",
            () => {
                expect(css).toContain(
                    ".rm-switch:disabled"
                );

                expect(css).toContain(
                    "cursor: not-allowed"
                );
            }
        );


        it(
            "implements invalid state",
            () => {
                expect(css).toContain(
                    ".rm-switch-field.is-invalid"
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
            "implements the locked focus contract",
            () => {
                expect(css).toContain(
                    ":focus-visible"
                );

                expect(css).toContain(
                    "outline: 2px solid var(--rm-primary)"
                );

                expect(css).toContain(
                    "outline-offset: 2px"
                );
            }
        );


        it(
            "does not depend on a role switch selector",
            () => {
                expect(css).not.toContain(
                    '[role="switch"]'
                );
            }
        );


        it(
            "supports reduced motion",
            () => {
                expect(css).toContain(
                    "@media (prefers-reduced-motion: reduce)"
                );

                expect(css).toContain(
                    "transition: none"
                );
            }
        );


        it(
            "loads after Choice",
            () => {
                const entry = read(
                    "src/css/rahardianmif-ui.css"
                );

                const choiceIndex =
                    entry.indexOf(
                        '@import "./components/choice.css";'
                    );

                const switchIndex =
                    entry.indexOf(
                        '@import "./components/switch.css";'
                    );

                expect(
                    switchIndex
                ).toBeGreaterThan(
                    choiceIndex
                );
            }
        );
    }
);