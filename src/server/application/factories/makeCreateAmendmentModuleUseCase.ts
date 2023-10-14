import { PrismaAmendmentModuleRepository } from "../repository/prisma-repository/amendment-module-prisma-repository";
import { PrismaAmendmentRepository } from "../repository/prisma-repository/amendment-prisma-repository";
import { PrismaModuleRepository } from "../repository/prisma-repository/module-prisma-repository";
import { CreateAmendmentModuleUseCase } from "../use-cases/create-amendment-module-use-case";

export function makeCreateAmendmentModuleUseCase() {
  const amendmentRepository = new PrismaAmendmentRepository();
  const moduleRepository = new PrismaModuleRepository();
  const amendmentModuleRepository = new PrismaAmendmentModuleRepository();
  const usecase = new CreateAmendmentModuleUseCase(
    amendmentRepository,
    moduleRepository,
    amendmentModuleRepository
  );

  return usecase;
}
