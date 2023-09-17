import { BiddingTypeRepository } from "../repository/bidding-type";
import { ResourceNotfoundError } from "@/server/errors/ResourceNotFoundError";

export class RemoveBiddingTypesUseCase {
  constructor(private biddingTypeRepository: BiddingTypeRepository) {}
  async execute(id: string) {
    const biddingType = await this.biddingTypeRepository.findById(id);

    if (!biddingType) {
      throw new ResourceNotfoundError("Bidding type");
    }

    await this.biddingTypeRepository.remove(id);
  }
}
