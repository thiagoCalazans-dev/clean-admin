import { AmendmentRepository } from "../repository/amendment";
import { ResourceNotfoundError } from "@/server/errors/ResourceNotFoundError";

export class RemoveAmendmentsUseCase {
  constructor(private amendmentRepository: AmendmentRepository) {}
  async execute(id: string) {
    const amendment = await this.amendmentRepository.findById(id);

    if (!amendment) {
      throw new ResourceNotfoundError("Amendment");
    }

    await this.amendmentRepository.remove(id);
  }
}
