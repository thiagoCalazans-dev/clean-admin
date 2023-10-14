import { PrismaAmendmentRepository } from "../repository/prisma-repository/amendment-prisma-repository";
import { FetchAmendmentUseCase } from "../use-cases/fetch-amendment-use-case";

export function makeFetchAmendmentsUseCase() {
  const amendmentRepository = new PrismaAmendmentRepository();
  const usecase = new FetchAmendmentUseCase(amendmentRepository);

  return usecase;
}
