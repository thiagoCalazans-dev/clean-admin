import { PrismaContractRepository } from "../repository/prisma-repository/contract-prisma-repository";
import { RemoveContractUseCase } from "../use-cases/remove-contract-use-case";

export function makeRemoveContractsUseCase() {
  const contractRepository = new PrismaContractRepository();
  const usecase = new RemoveContractUseCase(contractRepository);

  return usecase;
}
