import { GetBiddingTypesOutputDTO } from "../dto/bidding-type-dto";
import { BiddingTypeRepository } from "../repository/bidding-type";

export class GetBiddingTypesUseCase {
  constructor(private biddingTypeRepository: BiddingTypeRepository) {}

  async execute(): Promise<GetBiddingTypesOutputDTO> {
    const biddingTypes = await this.biddingTypeRepository.findMany();

    const output = {
      data: biddingTypes,
    };

    return output;
  }
}
