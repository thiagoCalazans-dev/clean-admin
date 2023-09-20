import { ContractRepository } from "../repository/contract";

export class GetContractsUseCase {
  constructor(private contractRepository: ContractRepository) {}

  async execute() {
    const contracts = await this.contractRepository.findMany();

    const output = {
      data: contracts,
    };

    return output;
  }
}
