import { db } from "@/server/infra/prisma";
import { ModuleRepository } from "../module";
import { Module } from "../data-model/module-data-model";

export class PrismaModuleRepository implements ModuleRepository {
  async findMany() {
    const _modules = db.module.findMany();
    return _modules;
  }

  async findByName(name: string) {
    const _modules = await db.module.findUnique({
      where: {
        name: name,
      },
    });

    return _modules;
  }

  async findById(id: string) {
    const _modules = await db.module.findUnique({
      where: {
        id,
      },
    });

    return _modules;
  }

  async create(data: Module) {
    await db.module.create({
      data,
    });
  }

  async remove(id: string): Promise<void> {
    await db.module.delete({
      where: {
        id,
      },
    });
    return;
  }
}
