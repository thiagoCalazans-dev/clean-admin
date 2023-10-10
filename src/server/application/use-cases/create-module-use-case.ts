import { ResourceAlreadyExistError } from "@/server/errors/ResourceAlreadyExistsError";

import { Module } from "@/server/enterprise/entities/module";
import { ModuleRepository } from "../repository/module";
import { CreateModuleDTO } from "../dto/module-dto";

export class CreateModule {
  constructor(private moduleRepository: ModuleRepository) {}

  async execute({ data }: CreateModuleDTO) {
    const _module = Module.create(data);

    const modulesWithSameName = await this.moduleRepository.findByName(
      _module.name
    );

    if (modulesWithSameName) {
      throw new ResourceAlreadyExistError("module");
    }

    await this.moduleRepository.create(data);
  }
}
