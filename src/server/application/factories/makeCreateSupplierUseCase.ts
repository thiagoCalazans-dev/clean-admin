import { PrismaSupplierRepository } from "../repository/prisma-repository/supplier-prisma-repository";
import { CreateSupplier } from "../use-cases/create-supplier-use-case";

export function makeCreateSupplierUseCase() {
  const supplierRepository = new PrismaSupplierRepository();
  const usecase = new CreateSupplier(supplierRepository);

  return usecase;
}
