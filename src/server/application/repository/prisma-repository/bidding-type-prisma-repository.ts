import { db } from "@/server/infra/prisma";
import { BiddingTypeRepository } from "../bidding-type";
import { BiddingType } from "../data-model/bidding-type-data-model";

export class PrismaBiddindTypeRepository implements BiddingTypeRepository {
  async findMany() {
    const biddingTypes = db.biddingType.findMany();
    return biddingTypes;
  }

  async findByName(name: string) {
    const biddingType = await db.biddingType.findUnique({
      where: {
        name: name,
      },
    });

    return biddingType;
  }

  async findById(id: string) {
    const biddingType = await db.biddingType.findUnique({
      where: {
        id,
      },
    });

    return biddingType;
  }

  async create(data: BiddingType) {
    await db.biddingType.create({
      data,
    });
  }

  async remove(id: string): Promise<void> {
    await db.biddingType.delete({
      where: {
        id,
      },
    });
    return;
  }
}
