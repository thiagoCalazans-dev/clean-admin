import { randomUUID } from "node:crypto";

import {
  AmendmentModule,
  AmendmentModuleCreate,
} from "../data-model/amendment-module-data-model";
import { AmendmentModuleRepository } from "../amendment-module";

export class InMemoryAmendmentModuleRepository implements AmendmentModuleRepository {
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

  async findByAmendmentIdAndModuleId(amendmentId: string, moduleId: string) {
    const amendment = this.amendment_modules.find(
      (amendmentModule) =>
        amendmentModule.amendmentId === amendmentId ||
        amendmentModule.moduleId === moduleId
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
