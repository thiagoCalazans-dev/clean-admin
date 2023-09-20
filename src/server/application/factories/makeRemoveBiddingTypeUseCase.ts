import { PrismaBiddindTypeRepository } from "../repository/prisma-repository/bidding-type-prisma-repository";
import { RemoveBiddingTypesUseCase } from "../use-cases/remove-bidding-type-use-case";

export function makeRemoveBiddingTypesUseCase() {
  const biddingTypeRepository = new PrismaBiddindTypeRepository();
  const usecase = new RemoveBiddingTypesUseCase(biddingTypeRepository);

  return usecase;
}
