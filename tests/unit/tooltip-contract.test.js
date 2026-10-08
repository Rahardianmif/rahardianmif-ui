import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (...segments) => readFileSync(join(root, ...segments), "utf8");

describe("v0.5 Tooltip contract", () => {
  const css = read("src", "css", "components", "tooltip.css");
  const js = read("src", "js", "components", "tooltip.js");
  const floating = read("src", "js", "internal", "floating.js");
  const entry = read("src", "js", "rahardianmif-ui.js");
  const example = read("examples", "overlay", "tooltip.html");

  it("keeps Tooltip public CSS intentionally small", () => {
    expect(css).toContain(".rm-tooltip");
    expect(css).not.toContain(".rm-tooltip__body");
    expect(css).not.toContain(".rm-tooltip__arrow");
  });

  it("uses native manual Popover as the display primitive", () => {
    expect(js).toContain("showPopover");
    expect(js).toContain("hidePopover");
    expect(example).toContain('popover="manual"');
    expect(example).toContain('role="tooltip"');
  });

  it("contains the locked declarative hooks and placements", () => {
    expect(js).toContain("data-rm-tooltip-trigger");
    expect(js).toContain("data-rm-tooltip-placement");
    for (const placement of ["top", "bottom", "start", "end"]) {
      expect(js).toContain(`"${placement}"`);
    }
  });

  it("keeps Tooltip noninteractive", () => {
    expect(css).toMatch(/pointer-events\s*:\s*none/);
    expect(example).toContain("aria-describedby");
  });

  it("uses the shared floating foundation", () => {
    expect(js).toMatch(/internal\/floating\.js/);
    expect(floating).toContain("positionFloating");
    expect(floating).toContain("setActiveTooltipFloating");
  });

  it("does not add MutationObserver or a public state class", () => {
    expect(js).not.toContain("MutationObserver");
    expect(css).not.toMatch(/\.is-open\b/);
  });

  it("is initialized by the public entry", () => {
    expect(entry).toContain("initTooltips");
    expect(entry).toContain("initTooltips();");
  });
});
