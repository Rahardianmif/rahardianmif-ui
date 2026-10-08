import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (...segments) => readFileSync(join(root, ...segments), "utf8");

describe("v0.5 Modal contract", () => {
  const css = read("src", "css", "components", "modal.css");
  const js = read("src", "js", "components", "modal.js");
  const entry = read("src", "js", "rahardianmif-ui.js");
  const example = read("examples", "overlay", "modal.html");

  it("exposes the locked Modal anatomy", () => {
    for (const className of [
      ".rm-modal",
      ".rm-modal__header",
      ".rm-modal__title",
      ".rm-modal__body",
      ".rm-modal__footer",
      ".rm-modal__close",
    ]) {
      expect(css).toContain(className);
    }
  });

  it("contains the locked Modal variants", () => {
    expect(css).toContain(".rm-modal--sm");
    expect(css).toContain(".rm-modal--lg");
    expect(css).toContain(".rm-modal--scrollable");
    expect(css).toContain(".rm-modal--fullscreen");
  });

  it("uses native dialog and declarative hooks", () => {
    expect(js).toContain("showModal");
    expect(js).toContain("data-rm-modal");
    expect(js).toContain("data-rm-modal-trigger");
    expect(js).toContain("data-rm-modal-close");
    expect(example).toContain("<dialog");
  });

  it("supports the locked static backdrop pattern", () => {
    expect(js).toContain("data-rm-modal-static");
    expect(example).toContain("data-rm-modal-static");
  });

  it("uses shared focus, scroll lock and overlay stack internals", () => {
    expect(js).toMatch(/internal\/focus\.js/);
    expect(js).toMatch(/internal\/scroll-lock\.js/);
    expect(js).toMatch(/internal\/overlay-stack\.js/);
  });

  it("does not expose a public open-state class", () => {
    expect(css).not.toMatch(/\.is-open\b/);
    expect(js).not.toContain("MutationObserver");
  });

  it("is initialized only through the public entry", () => {
    expect(entry).toContain("initModals");
    expect(entry).toContain("initModals();");
  });
});
