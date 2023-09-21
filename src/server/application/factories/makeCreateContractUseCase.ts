import { PrismaBiddindTypeRepository } from "../repository/prisma-repository/bidding-type-prisma-repository";
import { PrismaContractRepository } from "../repository/prisma-repository/contract-prisma-repository";
import { PrismaSupplierRepository } from "../repository/prisma-repository/supplier-prisma-repository";
import { CreateContractUseCase } from "../use-cases/create-contract-use-case";

export function makeCreateContractUseCase() {
  const contractRepository = new PrismaContractRepository();
  const biddingTypeResository = new PrismaBiddindTypeRepository();
  const supplierRepository = new PrismaSupplierRepository();
  const usecase = new CreateContractUseCase(
    contractRepository,
    biddingTypeResository,
    supplierRepository
  );

  return usecase;
}
