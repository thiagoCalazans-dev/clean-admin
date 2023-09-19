import {
  BiddingType,
  BiddingTypeCreate,
} from "./data-model/bidding-type-data-model";

export interface BiddingTypeRepository {
  findMany(): Promise<BiddingType[]>;
  findByName(name: string): Promise<BiddingType | null>;
  findById(id: string): Promise<BiddingType | null>;
  create(data: BiddingTypeCreate): Promise<void>;
  remove(id: string): Promise<void>;
}
