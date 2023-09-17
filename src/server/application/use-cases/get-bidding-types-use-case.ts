import { BiddingTypeRepository } from "../repository/bidding-type";

export class GetBiddingTypesUseCase {
  constructor(private biddingTypeRepository: BiddingTypeRepository) {}

  async execute() {
    const biddingType = await this.biddingTypeRepository.findMany();
    return biddingType;
  }
}
