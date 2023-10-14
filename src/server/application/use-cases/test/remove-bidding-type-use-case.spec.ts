import { expect, it, describe, beforeEach } from "bun:test";
import { BiddingTypeRepository } from "../../repository/bidding-type";
import { InMemoryBiddingTypeRepository } from "../../repository/in-memory/bidding-type-in-memory-repository";
import { RemoveBiddingTypesUseCase } from "../remove-bidding-type-use-case";
import { ResourceNotFoundError } from "@/server/errors/ResourceNotFoundError";

let biddingTypeRepository: BiddingTypeRepository;
let sut: RemoveBiddingTypesUseCase;

describe("remove bidding type use case suit", () => {
  beforeEach(() => {
    biddingTypeRepository = new InMemoryBiddingTypeRepository();
    sut = new RemoveBiddingTypesUseCase(biddingTypeRepository);
  });
  it("should remove biddingType ", async () => {
    const name = "nome";
    const createdData = await biddingTypeRepository.create({
      name,
    });

    const data = await biddingTypeRepository.findByName("nome");



    const deletedData = await sut.execute(data!.id);

    expect(deletedData).toBeUndefined();
  });

  it("should throw an error if biddingType not found in remove method", async () => {
    const id = "inexistentId";

    await expect(() => sut.execute(id)).toThrow(
      new ResourceNotFoundError("Bidding type")
    );
  });
});
