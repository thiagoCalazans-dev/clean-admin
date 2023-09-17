import { expect, it, describe } from "bun:test";

import { RequiredError } from "../../../errors/RequiredError";
import { Amendment } from "../amendment";

describe("test amendment entity rules", () => {
  it("should instance amendment", () => {
    const data: Amendment = {
      value: 12.85,
      contractId: "randomId",
      dueDate: new Date(),
      number: 1234,
      subscriptionDate: new Date(),
    };

    const amendment = Amendment.create(data);

    expect(amendment).toBeDefined();
  });

  it("should throw an error if contraId does not exists", async () => {
    const data: Amendment = {
      value: 12.85,
      contractId: "",
      dueDate: new Date(),
      number: 10,
      subscriptionDate: new Date(),
    };

    await expect(() => {
      Amendment.create(data);
    }).toThrow(new RequiredError("contractId"));
  });
});
