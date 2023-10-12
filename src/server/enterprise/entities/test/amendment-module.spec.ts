import { expect, it, describe } from "bun:test";

import { RequiredError } from "../../../errors/RequiredError";
import { AmendmentModule } from "../amendment-module";

describe("test amendment module entity rules", () => {
  it("should instance amendment", () => {
    const data: AmendmentModule = {
      value: 12.85,
      amendmentId: "randomId",
      moduleId: "randomId",
    };

    const amendment = AmendmentModule.create(data);

    expect(amendment).toBeDefined();
  });

  it("should throw an error if amendmentId does not exists", async () => {
    const data: AmendmentModule = {
      value: 12.85,
      amendmentId: "",
      moduleId: "randomId",
    };

    await expect(() => {
      AmendmentModule.create(data);
    }).toThrow(new RequiredError("amendmentId"));
  });
});
