import { PrismaSupplierRepository } from "../repository/prisma-repository/supplier-prisma-repository";
import { GetSuppliersUseCase } from "../use-cases/get-suppliers-use-case";

export function makeGetSuppliersUseCase() {
  const supplierRepository = new PrismaSupplierRepository();
  const usecase = new GetSuppliersUseCase(supplierRepository);

  return usecase;
}
