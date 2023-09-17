import { expect, it, describe } from "bun:test";
import { Contract } from "../contract";
import { RequiredError } from "../../../errors/RequiredError";
import { InvalidContractPeriodError } from "@/server/errors/InvalidContractPeriodError";
import { InvalidSubscriptionDate } from "@/server/errors/InvalidSubscriptionDate";

describe("test contract entity rules", () => {
  it("should instance contract", () => {
    const data: Contract = {
      value: 12.85,
      biddingTypeId: "randomId",
      billingDeadline: "30 days",
      dueDate: new Date(),
      fixture: "fixtuire demo",
      number: "1234",
      processNumber: "1234",
      subscriptionDate: new Date(),
      supplierId: "randomId",
      endContract: false,
    };

    const supplier = Contract.create(data);

    expect(supplier).toBeDefined();
  });

  it("should throw an error if number does not exists", async () => {
    const data: Contract = {
      value: 12.85,
      biddingTypeId: "randomId",
      billingDeadline: "30 days",
      dueDate: new Date(),
      fixture: "fixture demo",
      number: "",
      processNumber: "1234",
      subscriptionDate: new Date(),
      supplierId: "randomId",
      endContract: false,
    };

    await expect(() => {
      Contract.create(data);
    }).toThrow(new RequiredError("number"));
  });

  it("should throw an InvalidContractPeriodError if due date < subscription date", async () => {
    const data: Contract = {
      value: 12.85,
      biddingTypeId: "randomId",
      billingDeadline: "30 days",
      dueDate: new Date("2023-10-10"),
      fixture: "fixture demo",
      number: "1234",
      processNumber: "1234",
      subscriptionDate: new Date("2023-11-11"),
      supplierId: "randomId",
      endContract: false,
    };

    await expect(() => {
      Contract.create(data);
    }).toThrow(new InvalidContractPeriodError());
  });

    it("should throw an InvalidSubscriptionDate  subscription date > today", async () => {

         const date = new Date();
         const futureDate = new Date().setDate(date.getDate() + 1);

      const data: Contract = {
        value: 12.85,
        biddingTypeId: "randomId",
        billingDeadline: "30 days",
        dueDate: new Date(futureDate),
        fixture: "fixture demo",
        number: "1234",
        processNumber: "1234",
        subscriptionDate: new Date(futureDate),
        supplierId: "randomId",
        endContract: false,
      };

      await expect(() => {
        Contract.create(data);
      }).toThrow(new InvalidSubscriptionDate());
    });
});
