import { BiddingType } from "@/server/enterprise/entities/bidding-type";

export interface CreateBiddingTypeDTO {
  data: BiddingType;
}


export interface GetBiddingTypesOutputDTO {
  data: BiddingType[];
}
