import { expect, it, describe, beforeEach } from "bun:test";
import { AmendmentRepository } from "../../repository/amendment";
import { InMemoryAmendmentRepository } from "../../repository/in-memory/amendment-in-memory-repository";
import { RemoveAmendmentsUseCase } from "../remove-amendment-use-case";
import { ResourceNotfoundError } from "@/server/errors/ResourceNotFoundError";

let amendmentRepository: AmendmentRepository;
let sut: RemoveAmendmentsUseCase;

describe("create bidding type use case suit", () => {
  beforeEach(() => {
    amendmentRepository = new InMemoryAmendmentRepository();
    sut = new RemoveAmendmentsUseCase(amendmentRepository);
  });
  it("should remove amendment ", async () => {
    const name = "John Doe";
    const createdData = await amendmentRepository.create({
      number: 1,
      contractId: "contradId",
      dueDate: new Date(),
      subscriptionDate: new Date(),
      value: 20,
    });

    const data = await amendmentRepository.findByContractIdAndNumber(
      "contradId",
      1
    );

    const deletedData = await sut.execute(data!.id);

    expect(deletedData).toBeUndefined();
  });

  it("should throw an error if amendment not found in remove method", async () => {
    const id = "inexistentId";

    await expect(() => sut.execute(id)).toThrow(
      new ResourceNotfoundError("Amendment")
    );
  });
});
