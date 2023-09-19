import { textChangeRangeIsUnchanged } from "typescript";
import { ContractRepository } from "../repository/contract";
import { ResourceNotFoundError } from "@/server/errors/ResourceNotFoundError";

export class FetchContractUseCase {
  constructor(private contractRepository: ContractRepository) {}

  async execute(id: string) {
    const contract = await this.contractRepository.findById(id);

    if (!contract) throw new ResourceNotFoundError("Contract");

    const output = {
      data: contract,
    };

    return output;
  }
}
