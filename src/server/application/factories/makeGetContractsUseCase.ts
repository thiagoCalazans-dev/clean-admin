import { PrismaContractRepository } from "../repository/prisma-repository/contract-prisma-repository";
import { GetContractsUseCase } from "../use-cases/get-contracts-use-case";

export function makeGetContractsUseCase() {
  const contractRepository = new PrismaContractRepository();
  const usecase = new GetContractsUseCase(contractRepository);

  return usecase;
}
