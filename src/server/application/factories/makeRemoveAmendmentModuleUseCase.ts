import { PrismaAmendmentModuleRepository } from "../repository/prisma-repository/amendment-module-prisma-repository";
import { RemoveAmendmentModuleUseCase } from "../use-cases/remove-amendment-module-use-case ";

export function makeRemoveAmendmentModuleUseCase() {
  const amendmentModuleRepository = new PrismaAmendmentModuleRepository();
  const usecase = new RemoveAmendmentModuleUseCase(amendmentModuleRepository);

  return usecase;
}
