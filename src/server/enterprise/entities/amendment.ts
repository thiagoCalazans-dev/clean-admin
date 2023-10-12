import { randomUUID } from "node:crypto";
import { RequiredError } from "../../errors/RequiredError";
import { Currency } from "../value-object/currency";
import { InvalidContractPeriodError } from "@/server/errors/InvalidContractPeriodError";
import { InvalidSubscriptionDate } from "@/server/errors/InvalidSubscriptionDate";
import { PositiveError } from "@/server/errors/PositiveError";

export class Amendment {
  readonly id?: string;
  readonly number: number;

  readonly contractId: string;

  readonly value: number;

  readonly dueDate: Date;
  readonly subscriptionDate: Date;

  private constructor({
    id,
    number,
    contractId,
    value,
    dueDate,
    subscriptionDate,
  }: Amendment) {
    this.id = id;
    this.number = number;
    this.value = value;
    this.contractId = contractId;
    this.dueDate = dueDate;
    this.subscriptionDate = subscriptionDate;
  }

  static create(amendment: Amendment) {
    const id = amendment.id ?? randomUUID();

    if (!amendment.contractId) throw new RequiredError("contractId");
    if (!amendment.value) throw new RequiredError("value");
    if (!amendment.subscriptionDate)
      throw new RequiredError("subscriptionDate");
    if (!amendment.dueDate) throw new RequiredError("dueDate");

    const value = Currency.validate(amendment.value).value;

    if (amendment.number < 0) throw new PositiveError();

    if (amendment.dueDate < amendment.subscriptionDate) {
      throw new InvalidContractPeriodError();
    }

    if (amendment.subscriptionDate > new Date()) {
      throw new InvalidSubscriptionDate();
    }

    const newAmendment: Amendment = {
      ...amendment,
      id,
      value: value,
    };

    return new Amendment(newAmendment);
  }
}
