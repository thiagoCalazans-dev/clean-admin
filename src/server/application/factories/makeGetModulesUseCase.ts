import { PrismaModuleRepository } from "../repository/prisma-repository/module-prisma-repository";
import { GetModulesUseCase } from "../use-cases/get-modules-use-case";

export function makeGetModulesUseCase() {
  const moduleRepository = new PrismaModuleRepository();
  const usecase = new GetModulesUseCase(moduleRepository);

  return usecase;
}
