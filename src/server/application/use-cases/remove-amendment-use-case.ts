import { AmendmentRepository } from "../repository/amendment";
import { ResourceNotFoundError } from "@/server/errors/ResourceNotFoundError";

export class RemoveAmendmentsUseCase {
  constructor(private amendmentRepository: AmendmentRepository) {}
  async execute(id: string) {

    console.log(id)
    const amendment = await this.amendmentRepository.findById(id);

    if (!amendment) {
      throw new ResourceNotFoundError("Amendment");
    }

    await this.amendmentRepository.remove(id);
  }
}
