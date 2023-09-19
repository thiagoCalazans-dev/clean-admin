import { PrismaBiddindTypeRepository } from "../repository/prisma-repository/bidding-type-prisma-repository";
import { GetBiddingTypesUseCase } from "../use-cases/get-bidding-types-use-case";

export function makeGetBiddingTypesUseCase() {
  const biddingTypeRepository = new PrismaBiddindTypeRepository();
  const usecase = new GetBiddingTypesUseCase(biddingTypeRepository);

  return usecase;
}
