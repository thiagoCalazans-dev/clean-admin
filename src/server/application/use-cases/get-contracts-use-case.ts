import { ContractRepository } from "../repository/contract";

export class GetContractsUseCase {
  constructor(private contractRepository: ContractRepository) {}

  async execute() {
    const suppliers = await this.contractRepository.findMany();
    return suppliers;
  }
}
