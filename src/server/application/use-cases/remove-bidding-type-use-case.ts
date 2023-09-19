import { BiddingTypeRepository } from "../repository/bidding-type";
import { ResourceNotFoundError } from "@/server/errors/ResourceNotFoundError";

export class RemoveBiddingTypesUseCase {
  constructor(private biddingTypeRepository: BiddingTypeRepository) {}
  async execute(id: string) {
    const biddingType = await this.biddingTypeRepository.findById(id);

    if (!biddingType) {
      throw new ResourceNotFoundError("Bidding type");
    }

    await this.biddingTypeRepository.remove(id);
  }
}
