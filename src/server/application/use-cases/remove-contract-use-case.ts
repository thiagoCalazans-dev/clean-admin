import { ContractRepository } from "../repository/contract";
import { ResourceNotfoundError } from "@/server/errors/ResourceNotFoundError";

export class RemoveContractUseCase {
  constructor(private contractRepository: ContractRepository) {}
  async execute(id: string) {
    const contract = await this.contractRepository.findById(id);

    if (!contract) {
      throw new ResourceNotfoundError("Contract");
    }

    await this.contractRepository.remove(id);
  }
}
