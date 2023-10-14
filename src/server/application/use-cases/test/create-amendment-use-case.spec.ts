import { expect, it, describe, beforeEach, beforeAll } from "bun:test";
import { InMemoryBiddingTypeRepository } from "../../repository/in-memory/bidding-type-in-memory-repository";
import { InMemorySupplierRepository } from "../../repository/in-memory/supplier-in-memory-repository";

import { CreateAmendmentUseCase } from "../create-amendment-use-case";
import { Amendment } from "@/server/enterprise/entities/amendment";
import { ResourceAlreadyExistError } from "@/server/errors/ResourceAlreadyExistsError";
import { ResourceNotFoundError } from "@/server/errors/ResourceNotFoundError";
import { InMemoryContractRepository } from "../../repository/in-memory/contract-in-memory-repository";
import { InMemoryAmendmentRepository } from "../../repository/in-memory/amendment-in-memory-repository";

let contractRepository: InMemoryContractRepository;
let amendmentRepository: InMemoryAmendmentRepository;
let sut: CreateAmendmentUseCase;
let contradId: string;

describe("Amendment use case", () => {
  beforeAll(async () => {
    contractRepository = new InMemoryContractRepository();

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

    const createdData =
      await contractRepository.findBySupplierNumberAndProccess(
        "string",
        "0023/2023",
        "0023/2023"
      );

    contradId = createdData!.id;
  });

  beforeEach(() => {
    amendmentRepository = new InMemoryAmendmentRepository();
    sut = new CreateAmendmentUseCase(amendmentRepository, contractRepository);
  });
  it("should create a amendment", async () => {
    const amendment: Amendment = {
      number: 1,
      contractId: contradId,
      dueDate: new Date(),
      subscriptionDate: new Date(),
      value: 20,
    };

    await sut.execute({
      data: amendment,
    });

    const data = await amendmentRepository.findByContractIdAndNumber(
      contradId,
      1
    );

    expect(data!.id).toEqual(expect.any(String));
  });

  it("should not create a amendment with inexistent contractID", async () => {
    const amendment: Amendment = {
      number: 1,
      contractId: "inexistent",
      dueDate: new Date(),
      subscriptionDate: new Date(),
      value: 20,
    };

    const dto = { data: amendment };

    await expect(() => sut.execute(dto)).toThrow(
      new ResourceNotFoundError("Contract")
    );
  });

  it("should not create a amendment with inexistent contractID", async () => {
    const amendment: Amendment = {
      number: 1,
      contractId: contradId,
      dueDate: new Date(),
      subscriptionDate: new Date(),
      value: 20,
    };

    const dto = { data: amendment };

    await sut.execute(dto);

    await expect(() => sut.execute(dto)).toThrow(
      new ResourceAlreadyExistError("Amendment")
    );
  });
});
