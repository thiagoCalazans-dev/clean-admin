import { db } from "@/server/infra/prisma";
import { AmendmentModuleRepository } from "../amendment-module";
import {
  AmendmentModule,
  AmendmentModuleCreate,
} from "../data-model/amendment-module-data-model";

export class PrismaAmendmentModuleRepository
  implements AmendmentModuleRepository
{
  async findByAmendmentIdAndModuleId(
    amendmentId: string,
    moduleId: string
  ): Promise<AmendmentModule | null> {
    const response = await db.amendmentModule.findFirst({
      where: {
        amendmentId,
        moduleId,
      },
    });

    if (!response) return null;

    const parsedValue = Number(response.value);

    const amendmentModule = {
      id: response.id,
      amendmentId: response.amendmentId,
      moduleId: response.moduleId,
      value: parsedValue,
    };

    return amendmentModule;
  }
  async create(data: AmendmentModuleCreate) {
    const parsedValue = data.value.toString();

    await db.amendmentModule.create({
      data: {
        amendmentId: data.amendmentId,
        moduleId: data.moduleId,
        value: parsedValue,
      },
    });
  }

  async findById(id: string): Promise<AmendmentModule | null> {
    const response = await db.amendmentModule.findUnique({
      where: {
        id,
      },
    });

    if (!response) return null;

    const parsedValue = Number(response.value);

    const amendmentModule = {
      id: response.id,
      amendmentId: response.amendmentId,
      moduleId: response.moduleId,
      value: parsedValue,
    };

    return amendmentModule;
  }

  async remove(id: string) {
    await db.amendmentModule.delete({
      where: {
        id,
      },
    });
    return;
  }
}
