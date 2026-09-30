import {
  describe,
  expect,
  it,
} from "vitest";

import RahardianmifUI from
  "../../src/js/rahardianmif-ui.js";


describe(
  "Rahardianmif UI public entry",
  () => {
    it(
      "exports the RahardianmifUI API",
      () => {
        expect(
          RahardianmifUI
        ).toBeDefined();

        expect(
          typeof RahardianmifUI
        ).toBe("object");
      }
    );


    it(
      "exposes init as the v0.1 public initializer",
      () => {
        expect(
          typeof RahardianmifUI.init
        ).toBe("function");
      }
    );


    it(
      "does not expose unapproved public APIs",
      () => {
        expect(
          Object.keys(
            RahardianmifUI
          )
        ).toEqual([
          "init",
        ]);
      }
    );
  }
);