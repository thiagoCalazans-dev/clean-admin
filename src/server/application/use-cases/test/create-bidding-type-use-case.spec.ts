import { expect, it, describe, beforeEach } from "bun:test";
import { BiddingTypeRepository } from "../../repository/bidding-type";
import { CreateBiddingType } from "../create-bidding-type-use-case";
import { InMemoryBiddingTypeRepository } from "../../repository/in-memory/bidding-type-in-memory-repository";
import { CreateBiddingTypeDTO } from "../../dto/bidding-type-dto";
import { ResourceAlreadyExistError } from "@/server/errors/ResourceAlreadyExistsError";

let biddingTypeRepository: BiddingTypeRepository;
let sut: CreateBiddingType;

describe("create bidding type use case suit", () => {
  beforeEach(() => {
    biddingTypeRepository = new InMemoryBiddingTypeRepository();
    sut = new CreateBiddingType(biddingTypeRepository);
  });
  it("should create a bidding type", async () => {
    const dto: CreateBiddingTypeDTO = {
      data: {
        name: "nome",
      },
    };

    await sut.execute(dto);

    const data = await biddingTypeRepository.findByName("nome");

    expect(data!.id).toEqual(expect.any(String));
  });

  it("should throw ResourceAlreadyExistError when a bidding type with the same name exists", async () => {
    const dto: CreateBiddingTypeDTO = {
      data: {
        name: "nome",
      },
    };

    await biddingTypeRepository.create({ name: "nome" });

    await expect(() => sut.execute(dto)).toThrow(
      new ResourceAlreadyExistError("bidding type")
    );
  });
});
