import { PrismaBiddindTypeRepository } from "../repository/prisma-repository/bidding-type-prisma-repository";
import { CreateBiddingType } from "../use-cases/create-bidding-type-use-case";


export function makeCreateBiddingTypeUseCase() {
  const biddingTypeRepository = new PrismaBiddindTypeRepository();
  const usecase = new CreateBiddingType(biddingTypeRepository);

  return usecase;
}
