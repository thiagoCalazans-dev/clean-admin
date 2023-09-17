import { randomUUID } from "node:crypto";
import { BiddingTypeRepository } from "../bidding-type";
import {
  BiddingType,
  BiddingTypeCreate,
} from "../data-model/bidding-type-data-model";

export class InMemoryBiddingTypeRepository implements BiddingTypeRepository {
  public biddingTypes: BiddingType[] = [];

  async create(data: BiddingTypeCreate): Promise<BiddingType> {
    const biddingType: BiddingType = {
      id: randomUUID(),
      ...data,
    };
    this.biddingTypes.push(biddingType);
    return biddingType;
  }

  async findMany() {
    return this.biddingTypes;
  }

  async findByName(name: string): Promise<BiddingType | null> {
    const biddingType = this.biddingTypes.find((item) => item.name === name);
    return biddingType || null;
  }

  async findById(id: string): Promise<BiddingType | null> {
    const biddingType = this.biddingTypes.find((item) => item.id === id);
    return biddingType || null;
  }

  async remove(id: string): Promise<void> {
    const index = this.biddingTypes.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.biddingTypes.splice(index, 1);
    }
    return;
  }
}
