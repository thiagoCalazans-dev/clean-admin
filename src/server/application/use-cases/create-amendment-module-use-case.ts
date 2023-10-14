import { ResourceAlreadyExistError } from "@/server/errors/ResourceAlreadyExistsError";
import { AmendmentRepository } from "../repository/amendment";
import { ResourceNotFoundError } from "@/server/errors/ResourceNotFoundError";
import { AmendmentModule } from "@/server/enterprise/entities/amendment-module";
import { CreateAmendmentModuleDTO } from "../dto/amendment-module-dto";
import { ModuleRepository } from "../repository/module";
import { AmendmentModuleRepository } from "../repository/amendment-module";

export class CreateAmendmentModuleUseCase {
  constructor(
    private amendmentRepository: AmendmentRepository,
    private moduleRepository: ModuleRepository,
    private amendmentModuleRepository: AmendmentModuleRepository
  ) {}

  async execute({ data }: CreateAmendmentModuleDTO) {
    const amendmentModule = AmendmentModule.create(data);

    const amendmentExists = await this.amendmentRepository.findById(
      data.amendmentId
    );

    if (!amendmentExists) {
      throw new ResourceNotFoundError("AmendmentId");
    }

    const moduleExists = await this.moduleRepository.findById(data.moduleId);

    if (!moduleExists) {
      throw new ResourceNotFoundError("Module");
    }

    const AmendmentModuleWithSameAmendmentAndModule =
      await this.amendmentModuleRepository.findByAmendmentIdAndModuleId(
        data.amendmentId,
        data.moduleId
      );

    if (AmendmentModuleWithSameAmendmentAndModule) {
      throw new ResourceAlreadyExistError("Amendment Module");
    }

    await this.amendmentModuleRepository.create(amendmentModule);
  }
}
