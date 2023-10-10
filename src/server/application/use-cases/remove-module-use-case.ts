import { ModuleRepository } from "../repository/module";
import { ResourceNotFoundError } from "@/server/errors/ResourceNotFoundError";

export class RemoveModulesUseCase {
  constructor(private moduleRepository: ModuleRepository) {}
  async execute(id: string) {
    const _module = await this.moduleRepository.findById(id);

    if (!_module) {
      throw new ResourceNotFoundError("Module");
    }

    await this.moduleRepository.remove(id);
  }
}
