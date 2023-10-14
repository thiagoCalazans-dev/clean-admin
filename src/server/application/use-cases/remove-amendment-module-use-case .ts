
import { ResourceNotFoundError } from "@/server/errors/ResourceNotFoundError";
import { AmendmentModuleRepository } from "../repository/amendment-module";

export class RemoveAmendmentModuleUseCase {
  constructor(private amendmentModuleRepository: AmendmentModuleRepository) {}
  async execute(id: string) {

    console.log(id)
    const amendment = await this.amendmentModuleRepository.findById(id);

    if (!amendment) {
      throw new ResourceNotFoundError("Amendment module");
    }

    await this.amendmentModuleRepository.remove(id);
  }
}
