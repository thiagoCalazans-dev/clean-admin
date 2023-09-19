import { ContractRepository } from "../repository/contract";
import { ResourceNotFoundError } from "@/server/errors/ResourceNotFoundError";

export class RemoveContractUseCase {
  constructor(private contractRepository: ContractRepository) {}
  async execute(id: string) {
    const contract = await this.contractRepository.findById(id);

    if (!contract) {
      throw new ResourceNotFoundError("Contract");
    }

    await this.contractRepository.remove(id);
  }
}
