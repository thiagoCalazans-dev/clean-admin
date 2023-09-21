import { PrismaAmendmentRepository } from "../repository/prisma-repository/amendment-prisma-repository";
import { RemoveAmendmentsUseCase } from "../use-cases/remove-amendment-use-case";

export function makeRemoveAmendmentsUseCase() {
  const amendmentRepository = new PrismaAmendmentRepository();
  const usecase = new RemoveAmendmentsUseCase(amendmentRepository);

  return usecase;
}
