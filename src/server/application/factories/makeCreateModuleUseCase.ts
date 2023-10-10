import { PrismaModuleRepository } from "../repository/prisma-repository/module-prisma-repository";
import { CreateModule } from "../use-cases/create-module-use-case";

export function makeCreateModuleUseCase() {
  const moduleRepository = new PrismaModuleRepository();
  const usecase = new CreateModule(moduleRepository);

  return usecase;
}
