import { randomUUID } from "node:crypto";
import { RequiredError } from "../../errors/RequiredError";
import { Currency } from "../value-object/currency";

export class AmendmentModule {
  readonly id?: string;
  readonly amendmentId: string;
  readonly moduleId: string;
  readonly value: number;

  private constructor({ id, amendmentId, moduleId, value }: AmendmentModule) {
    this.id = id;

    this.value = value;
    this.amendmentId = amendmentId;
    this.moduleId = moduleId;
  }

  static create(amendmentModule: AmendmentModule) {
    const id = amendmentModule.id ?? randomUUID();

    if (!amendmentModule.amendmentId) throw new RequiredError("amendmentId");
    if (!amendmentModule.moduleId) throw new RequiredError("moduleId");
    if (!amendmentModule.value) throw new RequiredError("value");

    const value = Currency.validate(amendmentModule.value).value;

    const newAmendmentModule: AmendmentModule = {
      ...amendmentModule,
      id,
      value: value,
    };

    return new AmendmentModule(newAmendmentModule);
  }
}
