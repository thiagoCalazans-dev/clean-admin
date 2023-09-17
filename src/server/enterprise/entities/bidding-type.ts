import { randomUUID } from "node:crypto";
import { RequiredError } from "../../errors/RequiredError";

export class BiddingType {
  readonly id?: string;
  readonly name: string;

  private constructor(id: string, name: string) {
    this.name = name;
    this.id = id;
  }

  static create(biddingtype: BiddingType) {
    const id = biddingtype.id ?? randomUUID();

    if (!biddingtype.name) throw new RequiredError("name");

    const name = biddingtype.name;

    return new BiddingType(id, name);
  }
}
