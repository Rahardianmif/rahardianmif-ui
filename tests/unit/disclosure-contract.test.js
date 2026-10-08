import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (...segments) => readFileSync(join(root, ...segments), "utf8");

describe("v0.5 Disclosure + Accordion contract", () => {
  const css = read("src", "css", "components", "disclosure.css");
  const js = read("src", "js", "components", "disclosure.js");
  const entry = read("src", "js", "rahardianmif-ui.js");
  const example = read("examples", "overlay", "disclosure.html");

  it("exposes the locked Disclosure anatomy", () => {
    for (const className of [
      ".rm-disclosure",
      ".rm-disclosure__trigger",
      ".rm-disclosure__label",
      ".rm-disclosure__indicator",
      ".rm-disclosure__panel",
    ]) {
      expect(css).toContain(className);
    }
  });

  it("exposes Accordion only as a composition layer", () => {
    expect(css).toContain(".rm-accordion");
    expect(css).toContain(".rm-accordion__item");
    expect(css).not.toContain(".rm-accordion__trigger");
    expect(css).not.toContain(".rm-accordion__panel");
  });

  it("uses hidden as the panel state source", () => {
    expect(js).toContain(".hidden");
    expect(css).toContain("[hidden]");
    expect(example).toContain("hidden");
  });

  it("uses the locked data and ARIA contract", () => {
    expect(js).toContain("data-rm-disclosure-trigger");
    expect(js).toContain("data-rm-disclosure");
    expect(js).toContain("data-rm-accordion");
    expect(js).toContain("data-rm-accordion-mode");
    expect(example).toContain("aria-expanded");
    expect(example).toContain("aria-controls");
  });

  it("supports single and multiple Accordion modes", () => {
    expect(js).toContain('"multiple"');
    expect(js).toContain('"single"');
    expect(example).toContain('data-rm-accordion-mode="single"');
    expect(example).toContain('data-rm-accordion-mode="multiple"');
  });

  it("implements Accordion arrow and boundary navigation without roving tabindex", () => {
    for (const key of ["ArrowDown", "ArrowUp", "Home", "End"]) {
      expect(js).toContain(`"${key}"`);
    }
    expect(js).not.toContain("tabIndex = -1");
  });

  it("does not use details, MutationObserver or measured-height animation", () => {
    expect(example).not.toContain("<details");
    expect(js).not.toContain("MutationObserver");
    expect(js).not.toContain("ResizeObserver");
    expect(js).not.toContain("scrollHeight");
  });

  it("is initialized by the public entry", () => {
    expect(entry).toContain("initDisclosures");
    expect(entry).toContain("initDisclosures();");
  });
});
