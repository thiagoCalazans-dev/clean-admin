import { randomUUID } from "node:crypto";
import { Amendment, AmendmentCreate } from "../data-model/amendment-data-model";
import { AmendmentRepository } from "../amendment";
import { AmendmentModuleRepository } from "../amendment-module";
import {
  AmendmentModule,
  AmendmentModuleCreate,
} from "../data-model/amendment-module-data-model";

export class InMemoryAmendmentRepository implements AmendmentModuleRepository {
  public amendment_modules: AmendmentModule[] = [];

  async create(data: AmendmentModuleCreate): Promise<void> {
    const amendment: AmendmentModule = {
      id: randomUUID(),
      ...data,
    };
    this.amendment_modules.push(amendment);
  }

  async findById(id: string) {
    const amendment = this.amendment_modules.find(
      (amendment) => amendment.id === id
    );
    return amendment || null;
  }

  async remove(id: string): Promise<void> {
    const index = this.amendment_modules.findIndex(
      (amendment) => amendment.id === id
    );
    if (index !== -1) {
      this.amendment_modules.splice(index, 1);
    }
    return;
  }
}
