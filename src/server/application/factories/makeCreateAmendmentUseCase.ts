import { PrismaAmendmentRepository } from "../repository/prisma-repository/amendment-prisma-repository";
import { PrismaContractRepository } from "../repository/prisma-repository/contract-prisma-repository";
import { CreateAmendmentUseCase } from "../use-cases/create-amendment-use-case";

export function makeCreateAmendmentUseCase() {
  const amendmentRepository = new PrismaAmendmentRepository();
  const contractRepository = new PrismaContractRepository()
  const usecase = new CreateAmendmentUseCase(
    amendmentRepository,
    contractRepository
  );

  return usecase;
}
