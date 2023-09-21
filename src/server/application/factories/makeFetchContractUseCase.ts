import { PrismaContractRepository } from "../repository/prisma-repository/contract-prisma-repository";
import { FetchContractUseCase } from "../use-cases/fetch-contract-use-case";

export function makeFetchContractsUseCase() {
  const contractRepository = new PrismaContractRepository();
  const usecase = new FetchContractUseCase(contractRepository);

  return usecase;
}
