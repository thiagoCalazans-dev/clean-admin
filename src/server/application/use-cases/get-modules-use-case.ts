import { GetModulesOutputDTO } from "../dto/module-dto";
import { ModuleRepository } from "../repository/module";

export class GetModulesUseCase {
  constructor(private moduleRepository: ModuleRepository) {}

  async execute(): Promise<GetModulesOutputDTO> {
    const modules = await this.moduleRepository.findMany();

    const output = {
      data: modules,
    };

    return output;
  }
}
