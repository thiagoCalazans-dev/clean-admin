import { ResourceAlreadyExistError } from "@/server/errors/ResourceAlreadyExistsError";
import { BiddingTypeRepository } from "../repository/bidding-type";
import { BiddingType } from "@/server/enterprise/entities/bidding-type";
import { CreateBiddingTypeDTO } from "../dto/bidding-type-dto";

export class CreateBiddingType {
  constructor(private biddingTypeRepository: BiddingTypeRepository) {}

  async execute({ data }: CreateBiddingTypeDTO) {
    const biddingType = BiddingType.create(data);

    const biddingTypesWithSameName =
      await this.biddingTypeRepository.findByName(biddingType.name);

    if (biddingTypesWithSameName) {
      throw new ResourceAlreadyExistError("bidding type");
    }

    await this.biddingTypeRepository.create(data);
  }
}
