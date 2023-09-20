import { PrismaSupplierRepository } from "../repository/prisma-repository/supplier-prisma-repository";
import { RemoveSuppliersUseCase } from "../use-cases/remove-supplier-use-case";

export function makeRemoveSuppliersUseCase() {
  const supplierRepository = new PrismaSupplierRepository();
  const usecase = new RemoveSuppliersUseCase(supplierRepository);

  return usecase;
}
