import { AmendmentRepository } from "../repository/amendment";
import { ResourceNotFoundError } from "@/server/errors/ResourceNotFoundError";

export class FetchAmendmentUseCase {
  constructor(private amendmentRepository: AmendmentRepository) {}

  async execute(id: string) {
    const amendment = await this.amendmentRepository.findById(id);

    if (!amendment) throw new ResourceNotFoundError("Amendment");

    const output = {
      data: amendment,
    };

    return output;
  }
}
