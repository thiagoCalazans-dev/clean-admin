import { PrismaModuleRepository } from "../repository/prisma-repository/module-prisma-repository";
import { RemoveModulesUseCase } from "../use-cases/remove-module-use-case";

export function makeRemoveModulesUseCase() {
  const modulesRepository = new PrismaModuleRepository();
  const usecase = new RemoveModulesUseCase(modulesRepository);

  return usecase;
}
