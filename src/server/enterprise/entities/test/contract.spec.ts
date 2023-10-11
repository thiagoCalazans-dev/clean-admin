import { expect, it, describe } from "bun:test";
import { Contract } from "../contract";
import { RequiredError } from "../../../errors/RequiredError";
import { InvalidContractPeriodError } from "@/server/errors/InvalidContractPeriodError";
import { InvalidSubscriptionDate } from "@/server/errors/InvalidSubscriptionDate";

describe("test contract entity rules", () => {
  it("should instance contract", () => {
    const data: Contract = {
      biddingTypeId: "randomId",
      billingDeadline: "30 days",
      fixture: "fixtuire demo",
      number: "1234",
      processNumber: "1234",
      supplierId: "randomId",
      endContract: false,
    };

    const supplier = Contract.create(data);

    expect(supplier).toBeDefined();
  });

  it("should throw an error if number does not exists", async () => {
    const data: Contract = {
      biddingTypeId: "randomId",
      billingDeadline: "30 days",
      fixture: "fixture demo",
      number: "",
      processNumber: "1234",
      supplierId: "randomId",
      endContract: false,
    };

    await expect(() => {
      Contract.create(data);
    }).toThrow(new RequiredError("number"));
  });
});
