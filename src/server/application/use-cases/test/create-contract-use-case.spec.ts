import { expect, it, describe, beforeEach, beforeAll } from "bun:test";
import { InMemoryBiddingTypeRepository } from "../../repository/in-memory/bidding-type-in-memory-repository";
import { InMemorySupplierRepository } from "../../repository/in-memory/supplier-in-memory-repository";
import { InMemoryContractRepository } from "../../repository/in-memory/contract-in-memory-repository";
import { CreateContractUseCase } from "../create-contract-use-case";
import { Contract } from "@/server/enterprise/entities/contract";
import { ResourceNotFoundError } from "@/server/errors/ResourceNotFoundError";

let biddingTypeRepository: InMemoryBiddingTypeRepository;
let supplierRepository: InMemorySupplierRepository;
let contractRepository: InMemoryContractRepository;
let sut: CreateContractUseCase;

describe("Contract use case", () => {
  beforeAll(async () => {
    biddingTypeRepository = new InMemoryBiddingTypeRepository();
    supplierRepository = new InMemorySupplierRepository();

    await biddingTypeRepository.create({
      name: "Foo Bidding Type",
    });

    await supplierRepository.create({
      name: "John Doe",
      address: "Foo street",
      city: "Foo city",
      cnpj: "19.331.603/0001-02",
      corporateName: "Foo Corporate",
      neighborhood: "Foo neighborhood",
      number: 96,
      zipcode: "02.612-000",
    });
  });

  beforeEach(() => {
    contractRepository = new InMemoryContractRepository();
    sut = new CreateContractUseCase(
      contractRepository,
      biddingTypeRepository,
      supplierRepository
    );
  });
  it("should create a contract", async () => {
    const [biddingType] = await biddingTypeRepository.findMany();
    const [supplier] = await supplierRepository.findMany();

    const contract: Contract = {
      number: "0001/2023",
      processNumber: "0001/2023",
      biddingTypeId: biddingType.id,
      supplierId: supplier.id,
      billingDeadline: "30 dias",
      dueDate: new Date(),
      endContract: false,
      fixture: "Foo fixture",
      subscriptionDate: new Date(),
      value: 20,
    };

    await sut.execute({
      data: contract,
    });

    const data = await contractRepository.findBySupplierNumberAndProccess(
      supplier.id,
      "0001/2023",
      "0001/2023"
    );

    expect(data!.id).toEqual(expect.any(String));
  });

  it("should not create a contract with inexistent supplierID", async () => {
    const [biddingType] = await biddingTypeRepository.findMany();
    const [supplier] = await supplierRepository.findMany();

    const contract: Contract = {
      number: "0001/2023",
      processNumber: "0001/2023",
      biddingTypeId: biddingType.id,
      supplierId: "string",
      billingDeadline: "30 dias",
      dueDate: new Date(),
      endContract: false,
      fixture: "Foo fixture",
      subscriptionDate: new Date(),
      value: 20,
    };

    const dto = { data: contract };

    await expect(() => sut.execute(dto)).toThrow(
      new ResourceNotFoundError("Supplier")
    );
  });
});
