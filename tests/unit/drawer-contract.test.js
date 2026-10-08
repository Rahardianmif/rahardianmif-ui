import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (...segments) => readFileSync(join(root, ...segments), "utf8");

describe("v0.5 Drawer contract", () => {
  const css = read("src", "css", "components", "drawer.css");
  const js = read("src", "js", "components", "drawer.js");
  const entry = read("src", "js", "rahardianmif-ui.js");
  const example = read("examples", "overlay", "drawer.html");

  it("exposes the locked Drawer anatomy", () => {
    for (const className of [
      ".rm-drawer",
      ".rm-drawer__header",
      ".rm-drawer__title",
      ".rm-drawer__body",
      ".rm-drawer__footer",
      ".rm-drawer__close",
    ]) {
      expect(css).toContain(className);
    }
  });

  it("supports start and end placement only", () => {
    expect(css).toContain(".rm-drawer--start");
    expect(css).toContain(".rm-drawer--end");
    expect(css).not.toContain(".rm-drawer--top");
    expect(css).not.toContain(".rm-drawer--bottom");
  });

  it("uses native dialog and the locked hooks", () => {
    expect(js).toContain("showModal");
    expect(js).toContain("data-rm-drawer");
    expect(js).toContain("data-rm-drawer-trigger");
    expect(js).toContain("data-rm-drawer-close");
    expect(example).toContain("<dialog");
  });

  it("shares focus, scroll lock and overlay stack infrastructure", () => {
    expect(js).toMatch(/internal\/focus\.js/);
    expect(js).toMatch(/internal\/scroll-lock\.js/);
    expect(js).toMatch(/internal\/overlay-stack\.js/);
  });

  it("does not implement Sidebar or static-dialog semantics", () => {
    expect(js).not.toContain("data-rm-modal-static");
    expect(css).not.toContain(".rm-sidebar");
    expect(js).not.toContain("MutationObserver");
  });

  it("is initialized by the public entry", () => {
    expect(entry).toContain("initDrawers");
    expect(entry).toContain("initDrawers();");
  });
});
