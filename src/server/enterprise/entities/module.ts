import { randomUUID } from "node:crypto";
import { RequiredError } from "../../errors/RequiredError";

export class Module {
  readonly id?: string;
  readonly name: string;

  private constructor(id: string, name: string) {
    this.name = name;
    this.id = id;
  }

  static create(module: Module) {
    const id = module.id ?? randomUUID();

    if (!module.name) throw new RequiredError("name");

    const name = module.name;

    return new Module(id, name);
  }
}
