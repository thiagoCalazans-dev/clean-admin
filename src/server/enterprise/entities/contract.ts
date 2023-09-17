import { randomUUID } from "node:crypto";
import { RequiredError } from "../../errors/RequiredError";
import { Currency } from "../value-object/currency";
import { InvalidContractPeriodError } from "@/server/errors/InvalidContractPeriodError";
import { InvalidSubscriptionDate } from "@/server/errors/InvalidSubscriptionDate";

export class Contract {
  readonly id?: string;
  readonly number: string;
  readonly processNumber: string;
  readonly biddingTypeId: string;
  readonly supplierId: string;
  readonly value: number;
  readonly fixture: string;
  readonly dueDate: Date;
  readonly subscriptionDate: Date;
  readonly billingDeadline: string;
  readonly endContract: boolean = false;

  private constructor({
    id,
    number,
    processNumber,
    biddingTypeId,
    supplierId,
    value,
    fixture,
    dueDate,
    subscriptionDate,
    billingDeadline,
    endContract,
  }: Contract) {
    this.id = id;
    this.number = number;
    this.processNumber = processNumber;
    this.biddingTypeId = biddingTypeId;
    this.supplierId = supplierId;
    this.value = value;
    this.fixture = fixture;
    this.dueDate = dueDate;
    this.subscriptionDate = subscriptionDate;
    this.billingDeadline = billingDeadline;
    this.endContract = endContract;
  }

  static create(contract: Contract) {
    const id = contract.id ?? randomUUID();

    if (!contract.number) throw new RequiredError("number");
    if (!contract.processNumber) throw new RequiredError("processNumber");
    if (!contract.biddingTypeId) throw new RequiredError("biddingTypeId");
    if (!contract.supplierId) throw new RequiredError("supplierId");
    if (!contract.value) throw new RequiredError("value");
    if (!contract.fixture) throw new RequiredError("fixture");
    if (!contract.subscriptionDate) throw new RequiredError("subscriptionDate");
    if (!contract.billingDeadline) throw new RequiredError("billingDeadline");
    if (!contract.dueDate) throw new RequiredError("dueDate");

    const value = Currency.validate(contract.value).value;

    if (contract.dueDate < contract.subscriptionDate) {
      throw new InvalidContractPeriodError();
    }

    if (contract.subscriptionDate > new Date()) {
      throw new InvalidSubscriptionDate();
    }

    const newContract: Contract = {
      ...contract,
      id,
      value: value,
    };

    return new Contract(newContract);
  }
}
