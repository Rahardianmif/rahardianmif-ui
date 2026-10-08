import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (...segments) => readFileSync(join(root, ...segments), "utf8");

describe("v0.5 Dropdown contract", () => {
  const css = read("src", "css", "components", "dropdown.css");
  const js = read("src", "js", "components", "dropdown.js");
  const floating = read("src", "js", "internal", "floating.js");
  const entry = read("src", "js", "rahardianmif-ui.js");
  const example = read("examples", "overlay", "dropdown.html");

  it("exposes the locked Dropdown CSS API", () => {
    expect(css).toContain(".rm-dropdown");
    expect(css).toContain(".rm-dropdown__item");
    expect(css).toContain(".rm-dropdown__item--danger");
    expect(css).toContain(".rm-dropdown__separator");
  });

  it("uses the locked declarative hooks", () => {
    expect(js).toContain("data-rm-dropdown");
    expect(js).toContain("data-rm-dropdown-trigger");
    expect(js).toContain("data-rm-dropdown-placement");
    expect(js).toContain("data-rm-dropdown-align");
  });

  it("uses menu semantics", () => {
    expect(example).toContain('role="menu"');
    expect(example).toContain('role="menuitem"');
    expect(example).toContain('role="separator"');
    expect(example).toContain('aria-haspopup="menu"');
  });

  it("implements the locked keyboard contract", () => {
    for (const key of ["ArrowDown", "ArrowUp", "Home", "End", "Enter", "Tab", "Escape"]) {
      expect(js).toContain(`"${key}"`);
    }
    expect(js).toContain('case " "');
  });

  it("contains typeahead and disabled-item handling", () => {
    expect(js).toContain("TYPEAHEAD_TIMEOUT");
    expect(js).toContain("aria-disabled");
    expect(js).toContain("isItemDisabled");
  });

  it("uses shared interactive floating ownership and alignment", () => {
    expect(js).toContain("setActiveInteractiveFloating");
    expect(floating).toContain("alignment");
    expect(floating).toContain("normalizeAlignment");
  });

  it("does not implement submenu or MutationObserver behavior", () => {
    expect(js).not.toContain("MutationObserver");
    expect(css).not.toContain(".rm-dropdown__submenu");
    expect(css).not.toMatch(/\.is-open\b/);
  });

  it("is initialized by the public entry", () => {
    expect(entry).toContain("initDropdowns");
    expect(entry).toContain("initDropdowns();");
  });
});
