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


function escapeRegExp(value) {
    return value.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    );
}


function expectToken(
    css,
    name,
    value
) {
    const pattern = new RegExp(
        `${escapeRegExp(name)}\\s*:\\s*${escapeRegExp(value)}\\s*;`
    );

    expect(css).toMatch(pattern);
}


describe(
    "Rahardianmif UI v0.1 token contract",
    () => {
        it(
            "contains the complete Slate primitive scale",
            () => {
                const css = read(
                    "src/css/foundations/colors.css"
                );

                const values = {
                    50: "#F8FAFC",
                    100: "#F1F5F9",
                    200: "#E2E8F0",
                    300: "#CBD5E1",
                    400: "#94A3B8",
                    500: "#64748B",
                    600: "#475569",
                    700: "#334155",
                    800: "#1E293B",
                    900: "#0F172A",
                    950: "#020617",
                };

                for (
                    const [scale, value]
                    of Object.entries(values)
                ) {
                    expectToken(
                        css,
                        `--rm-color-slate-${scale}`,
                        value
                    );
                }
            }
        );


        it(
            "contains the complete Cyan primitive scale",
            () => {
                const css = read(
                    "src/css/foundations/colors.css"
                );

                const values = {
                    50: "#ECFEFF",
                    100: "#CFFAFE",
                    200: "#A5F3FC",
                    300: "#67E8F9",
                    400: "#22D3EE",
                    500: "#06B6D4",
                    600: "#0891B2",
                    700: "#0E7490",
                    800: "#155E75",
                    900: "#164E63",
                    950: "#083344",
                };

                for (
                    const [scale, value]
                    of Object.entries(values)
                ) {
                    expectToken(
                        css,
                        `--rm-color-cyan-${scale}`,
                        value
                    );
                }
            }
        );


        it(
            "contains the complete Navy primitive scale",
            () => {
                const css = read(
                    "src/css/foundations/colors.css"
                );

                const values = {
                    50: "#F2F7FB",
                    100: "#DFEBF5",
                    200: "#C5DCEC",
                    300: "#9CC5DF",
                    400: "#6AA9CE",
                    500: "#478CB7",
                    600: "#346F98",
                    700: "#2B597B",
                    800: "#274B66",
                    900: "#16324F",
                    950: "#0C1D2E",
                };

                for (
                    const [scale, value]
                    of Object.entries(values)
                ) {
                    expectToken(
                        css,
                        `--rm-color-navy-${scale}`,
                        value
                    );
                }
            }
        );


        it(
            "contains the Light semantic theme contract",
            () => {
                const css = read(
                    "src/css/themes/light-colors.css"
                );

                const tokens = {
                    "--rm-page-bg":
                        "var(--rm-color-slate-50)",

                    "--rm-surface":
                        "#FFFFFF",

                    "--rm-surface-secondary":
                        "var(--rm-color-slate-100)",

                    "--rm-surface-strong":
                        "var(--rm-color-slate-200)",

                    "--rm-surface-elevated":
                        "var(--rm-surface)",

                    "--rm-border":
                        "var(--rm-color-slate-300)",

                    "--rm-border-soft":
                        "var(--rm-color-slate-200)",

                    "--rm-text-primary":
                        "var(--rm-color-slate-900)",

                    "--rm-text-secondary":
                        "var(--rm-color-slate-600)",

                    "--rm-text-muted":
                        "var(--rm-color-slate-500)",

                    "--rm-text-disabled":
                        "var(--rm-color-slate-400)",

                    "--rm-supporting":
                        "var(--rm-color-navy-900)",

                    "--rm-primary":
                        "var(--rm-color-cyan-600)",

                    "--rm-primary-hover":
                        "var(--rm-color-cyan-700)",

                    "--rm-primary-active":
                        "var(--rm-color-cyan-800)",

                    "--rm-primary-soft":
                        "var(--rm-color-cyan-100)",
                };

                for (
                    const [name, value]
                    of Object.entries(tokens)
                ) {
                    expectToken(
                        css,
                        name,
                        value
                    );
                }
            }
        );


        it(
            "contains the Dark semantic theme contract",
            () => {
                const css = read(
                    "src/css/themes/dark-colors.css"
                );

                const tokens = {
                    "--rm-page-bg":
                        "#08111F",

                    "--rm-surface":
                        "#0F1B2D",

                    "--rm-surface-secondary":
                        "#162337",

                    "--rm-surface-elevated":
                        "#1C2B40",

                    "--rm-surface-strong":
                        "var(--rm-surface-elevated)",

                    "--rm-border":
                        "#2E4057",

                    "--rm-border-soft":
                        "#22334A",

                    "--rm-text-primary":
                        "var(--rm-color-slate-50)",

                    "--rm-text-secondary":
                        "var(--rm-color-slate-300)",

                    "--rm-text-muted":
                        "var(--rm-color-slate-400)",

                    "--rm-text-disabled":
                        "var(--rm-color-slate-500)",

                    "--rm-supporting":
                        "#29496B",

                    "--rm-primary":
                        "var(--rm-color-cyan-400)",

                    "--rm-primary-hover":
                        "var(--rm-color-cyan-300)",

                    "--rm-primary-active":
                        "var(--rm-color-cyan-500)",

                    "--rm-primary-soft":
                        "var(--rm-color-cyan-900)",
                };

                for (
                    const [name, value]
                    of Object.entries(tokens)
                ) {
                    expectToken(
                        css,
                        name,
                        value
                    );
                }
            }
        );


        it(
            "contains the approved semantic status tokens",
            () => {
                const css = read(
                    "src/css/themes/status-colors.css"
                );

                const tokens = {
                    "--rm-success": "#16A34A",
                    "--rm-success-hover": "#15803D",
                    "--rm-success-soft": "#DCFCE7",
                    "--rm-success-text-strong": "#166534",

                    "--rm-danger": "#DC2626",
                    "--rm-danger-hover": "#B91C1C",
                    "--rm-danger-soft": "#FEE2E2",
                    "--rm-danger-text-strong": "#991B1B",

                    "--rm-warning": "#D97706",
                    "--rm-warning-hover": "#B45309",
                    "--rm-warning-soft": "#FEF3C7",
                    "--rm-warning-text-strong": "#92400E",

                    "--rm-info": "#2563EB",
                    "--rm-info-hover": "#1D4ED8",
                    "--rm-info-soft": "#DBEAFE",
                    "--rm-info-text-strong": "#1E40AF",
                };

                for (
                    const [name, value]
                    of Object.entries(tokens)
                ) {
                    expectToken(
                        css,
                        name,
                        value
                    );
                }
            }
        );


        it(
            "contains the typography scale",
            () => {
                const css = read(
                    "src/css/foundations/typography.css"
                );

                const sizes = {
                    "--rm-font-size-xs": "0.75rem",
                    "--rm-font-size-sm": "0.875rem",
                    "--rm-font-size-base": "1rem",
                    "--rm-font-size-lg": "1.125rem",
                    "--rm-font-size-xl": "1.25rem",
                    "--rm-font-size-2xl": "1.5rem",
                    "--rm-font-size-3xl": "1.875rem",
                    "--rm-font-size-4xl": "2.25rem",
                    "--rm-font-size-5xl": "3rem",
                    "--rm-font-size-6xl": "3.75rem",
                };

                for (
                    const [name, value]
                    of Object.entries(sizes)
                ) {
                    expectToken(
                        css,
                        name,
                        value
                    );
                }

                expectToken(
                    css,
                    "--rm-font-weight-regular",
                    "400"
                );

                expectToken(
                    css,
                    "--rm-font-weight-medium",
                    "500"
                );

                expectToken(
                    css,
                    "--rm-font-weight-semibold",
                    "600"
                );

                expectToken(
                    css,
                    "--rm-font-weight-bold",
                    "700"
                );

                expectToken(
                    css,
                    "--rm-font-weight-extrabold",
                    "800"
                );

                expectToken(
                    css,
                    "--rm-line-height-tight",
                    "1.2"
                );

                expectToken(
                    css,
                    "--rm-line-height-snug",
                    "1.375"
                );

                expectToken(
                    css,
                    "--rm-line-height-normal",
                    "1.5"
                );

                expectToken(
                    css,
                    "--rm-line-height-relaxed",
                    "1.625"
                );

                expect(css).toContain(
                    '"Inter"'
                );

                expect(css).toContain(
                    "system-ui"
                );
            }
        );


        it(
            "contains the approved spacing scale",
            () => {
                const css = read(
                    "src/css/foundations/spacing.css"
                );

                const tokens = {
                    "--rm-space-0": "0",
                    "--rm-space-1": "4px",
                    "--rm-space-2": "8px",
                    "--rm-space-3": "12px",
                    "--rm-space-4": "16px",
                    "--rm-space-5": "20px",
                    "--rm-space-6": "24px",
                    "--rm-space-8": "32px",
                    "--rm-space-10": "40px",
                    "--rm-space-12": "48px",
                    "--rm-space-16": "64px",
                    "--rm-space-20": "80px",
                    "--rm-space-24": "96px",
                };

                for (
                    const [name, value]
                    of Object.entries(tokens)
                ) {
                    expectToken(
                        css,
                        name,
                        value
                    );
                }
            }
        );


        it(
            "contains the locked radius scale",
            () => {
                const css = read(
                    "src/css/foundations/radius.css"
                );

                const tokens = {
                    "--rm-radius-xs": "4px",
                    "--rm-radius-sm": "6px",
                    "--rm-radius-md": "8px",
                    "--rm-radius-lg": "12px",
                    "--rm-radius-xl": "16px",
                    "--rm-radius-pill": "9999px",
                    "--rm-radius-circle": "50%",
                };

                for (
                    const [name, value]
                    of Object.entries(tokens)
                ) {
                    expectToken(
                        css,
                        name,
                        value
                    );
                }
            }
        );


        it(
            "contains the locked z-index scale",
            () => {
                const css = read(
                    "src/css/foundations/z-index.css"
                );

                const tokens = {
                    "--rm-z-base": "0",
                    "--rm-z-sticky": "100",
                    "--rm-z-dropdown": "200",
                    "--rm-z-overlay": "300",
                    "--rm-z-drawer": "400",
                    "--rm-z-modal": "500",
                    "--rm-z-toast": "600",
                    "--rm-z-tooltip": "700",
                };

                for (
                    const [name, value]
                    of Object.entries(tokens)
                ) {
                    expectToken(
                        css,
                        name,
                        value
                    );
                }
            }
        );


        it(
            "contains the approved motion duration scale",
            () => {
                const css = read(
                    "src/css/foundations/motion.css"
                );

                expectToken(
                    css,
                    "--rm-motion-fast",
                    "120ms"
                );

                expectToken(
                    css,
                    "--rm-motion-normal",
                    "200ms"
                );

                expectToken(
                    css,
                    "--rm-motion-slow",
                    "320ms"
                );

                expectToken(
                    css,
                    "--rm-motion-extended",
                    "480ms"
                );

                expect(css).not.toContain(
                    "--rm-ease-"
                );
            }
        );


        it(
            "contains the locked breakpoint values",
            () => {
                const css = read(
                    "src/css/foundations/breakpoints.css"
                );

                expect(css).toMatch(
                    /SM\s+36rem/
                );

                expect(css).toMatch(
                    /MD\s+48rem/
                );

                expect(css).toMatch(
                    /LG\s+64rem/
                );

                expect(css).toMatch(
                    /XL\s+80rem/
                );

                expect(css).toMatch(
                    /2XL\s+96rem/
                );
            }
        );


        it(
            "contains Light and Dark shadow scales",
            () => {
                const light = read(
                    "src/css/themes/light-shadow.css"
                );

                const dark = read(
                    "src/css/themes/dark-shadow.css"
                );

                const tokens = [
                    "--rm-shadow-xs",
                    "--rm-shadow-sm",
                    "--rm-shadow-md",
                    "--rm-shadow-lg",
                    "--rm-shadow-xl",
                ];

                for (const token of tokens) {
                    expect(light).toContain(
                        `${token}:`
                    );

                    expect(dark).toContain(
                        `${token}:`
                    );
                }
            }
        );


        it(
            "loads Foundations before Themes",
            () => {
                const css = read(
                    "src/css/rahardianmif-ui.css"
                );

                const imports = [
                    ...css.matchAll(
                        /@import\s+(?:url\(\s*)?(?:"([^"]+)"|'([^']+)')\s*\)?\s*;/g
                    ),
                ].map(
                    (match) =>
                        match[1] ?? match[2]
                );

                expect(imports).toEqual([
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
                ]);
            }
        );


        it(
            "does not introduce a parallel theme attribute in source",
            () => {
                const source = [
                    read(
                        "src/js/core/theme-manager.js"
                    ),

                    read(
                        "src/js/rahardianmif-ui.js"
                    ),

                    read(
                        "src/css/themes/light-colors.css"
                    ),

                    read(
                        "src/css/themes/dark-colors.css"
                    ),
                ].join("\n");

                expect(source).not.toContain(
                    "data-rm-theme-effective"
                );
            }
        );
    }
);