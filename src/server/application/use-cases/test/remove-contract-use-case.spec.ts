import { expect, it, describe, beforeEach } from "bun:test";
import { ContractRepository } from "../../repository/contract";
import { InMemoryContractRepository } from "../../repository/in-memory/contract-in-memory-repository";

import { ResourceNotFoundError } from "@/server/errors/ResourceNotFoundError";
import { RemoveContractUseCase } from "../remove-contract-use-case";

let contractRepository: ContractRepository;
let sut: RemoveContractUseCase;

describe("create contract use case suit", () => {
  beforeEach(() => {
    contractRepository = new InMemoryContractRepository();
    sut = new RemoveContractUseCase(contractRepository);
  });
  it("should remove contract ", async () => {
    const contract = {
      number: "0023/2023",
      processNumber: "0023/2023",
      biddingTypeId: "sintrg",
      supplierId: "string",
      billingDeadline: "30 dias",
      dueDate: new Date(),
      endContract: false,
      fixture: "Foo fixture",
      subscriptionDate: new Date(),
      value: 20,
    };

    contractRepository.create(contract);

    const createdData = await contractRepository.findBySupplierNumberAndProccess(
      "string",
      "0023/2023",
      "0023/2023"
    );

    const deletedData = await sut.execute(createdData!.id);

    expect(deletedData).toBeUndefined();
  });

  it("should throw an error if contract not found in remove method", async () => {
    const id = "inexistentId";

    await expect(() => sut.execute(id)).toThrow(
      new ResourceNotFoundError("Contract")
    );
  });
});
