import { randomUUID } from "node:crypto";
import { ModuleRepository } from "../module";
import { Module, ModuleCreate } from "../data-model/module-data-model";

export class InMemoryModuleRepository implements ModuleRepository {
  public modules: Module[] = [];

  async create(data: ModuleCreate): Promise<void> {
    const _module: Module = {
      id: randomUUID(),
      ...data,
    };
    this.modules.push(_module);
  }

  async findMany() {
    return this.modules;
  }

  async findByName(name: string): Promise<Module | null> {
    const _module = this.modules.find((item) => item.name === name);
    return _module || null;
  }

  async findById(id: string): Promise<Module | null> {
    const _module = this.modules.find((item) => item.id === id);
    return _module || null;
  }

  async remove(id: string): Promise<void> {
    const index = this.modules.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.modules.splice(index, 1);
    }
    return;
  }
}
