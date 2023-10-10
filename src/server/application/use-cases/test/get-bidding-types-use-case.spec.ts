import { expect, it, describe, beforeEach } from "bun:test";
import { BiddingTypeRepository } from "../../repository/bidding-type";
import { InMemoryBiddingTypeRepository } from "../../repository/in-memory/bidding-type-in-memory-repository";
import { GetBiddingTypesUseCase } from "../get-bidding-types-use-case";

let biddingTypeRepository: BiddingTypeRepository;
let sut: GetBiddingTypesUseCase;

describe("get bidding types use case suit", () => {
  beforeEach(() => {
    biddingTypeRepository = new InMemoryBiddingTypeRepository();
    sut = new GetBiddingTypesUseCase(biddingTypeRepository);
  });
  it("should to get all biddingTypes", async () => {
    const data = await biddingTypeRepository.create({
      name: "John Doe",
    });

    const data2 = await biddingTypeRepository.create({
      name: "John Doe2",
    });

    const allCreatedBiddingTypes = await sut.execute();



    expect(allCreatedBiddingTypes.data).toHaveLength(2);
  });
});
