import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (...segments) => readFileSync(join(root, ...segments), "utf8");

describe("v0.5 Popover contract", () => {
  const css = read("src", "css", "components", "popover.css");
  const js = read("src", "js", "components", "popover.js");
  const entry = read("src", "js", "rahardianmif-ui.js");
  const example = read("examples", "overlay", "popover.html");

  it("exposes the locked Popover anatomy", () => {
    for (const className of [
      ".rm-popover",
      ".rm-popover__header",
      ".rm-popover__title",
      ".rm-popover__body",
      ".rm-popover__footer",
      ".rm-popover__close",
    ]) {
      expect(css).toContain(className);
    }
  });

  it("uses manual native Popover and the locked hooks", () => {
    expect(js).toContain("showPopover");
    expect(js).toContain("hidePopover");
    expect(js).toContain("data-rm-popover");
    expect(js).toContain("data-rm-popover-trigger");
    expect(js).toContain("data-rm-popover-close");
    expect(js).toContain("data-rm-popover-placement");
    expect(example).toContain('popover="manual"');
  });

  it("uses dialog semantics in the official example", () => {
    expect(example).toContain('role="dialog"');
    expect(example).toContain('aria-haspopup="dialog"');
    expect(example).toContain("aria-expanded");
    expect(example).toContain("aria-controls");
  });

  it("uses shared focus and floating internals", () => {
    expect(js).toMatch(/internal\/focus\.js/);
    expect(js).toMatch(/internal\/floating\.js/);
    expect(js).toContain("setActiveInteractiveFloating");
  });

  it("does not expose arrows, size variants or a public state class", () => {
    expect(css).not.toContain(".rm-popover__arrow");
    expect(css).not.toContain(".rm-popover--sm");
    expect(css).not.toContain(".rm-popover--lg");
    expect(css).not.toMatch(/\.is-open\b/);
  });

  it("is initialized by the public entry", () => {
    expect(entry).toContain("initPopovers");
    expect(entry).toContain("initPopovers();");
  });
});
