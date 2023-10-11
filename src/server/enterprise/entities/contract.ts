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

  readonly fixture: string;

  readonly billingDeadline: string;
  readonly endContract: boolean = false;

  private constructor({
    id,
    number,
    processNumber,
    biddingTypeId,
    supplierId,
    fixture,
    billingDeadline,
    endContract,
  }: Contract) {
    this.id = id;
    this.number = number;
    this.processNumber = processNumber;
    this.biddingTypeId = biddingTypeId;
    this.supplierId = supplierId;
    this.fixture = fixture;
    this.billingDeadline = billingDeadline;
    this.endContract = endContract;
  }

  static create(contract: Contract) {
    const id = contract.id ?? randomUUID();

    if (!contract.number) throw new RequiredError("number");
    if (!contract.processNumber) throw new RequiredError("processNumber");
    if (!contract.biddingTypeId) throw new RequiredError("biddingTypeId");
    if (!contract.supplierId) throw new RequiredError("supplierId");

    if (!contract.fixture) throw new RequiredError("fixture");

    if (!contract.billingDeadline) throw new RequiredError("billingDeadline");

    const newContract: Contract = {
      ...contract,
      id,
    };

    return new Contract(newContract);
  }
}
