import { expect, it, describe, beforeEach } from "bun:test";
import { ContractRepository } from "../../repository/contract";
import { InMemoryContractRepository } from "../../repository/in-memory/contract-in-memory-repository";
import { GetContractsUseCase } from "../get-contracts-use-case";

let contractRepository: ContractRepository;
let sut: GetContractsUseCase;

describe("get bidding types use case suit", () => {
  beforeEach(() => {
    contractRepository = new InMemoryContractRepository();
    sut = new GetContractsUseCase(contractRepository);
  });
  it("should to get all contracts", async () => {
         const contract = {
           number: "0001/2023",
           processNumber: "0001/2023",
           biddingTypeId: "string",
           supplierId: "string",
           billingDeadline: "30 dias",
           dueDate: new Date(),
           endContract: false,
           fixture: "Foo fixture",
           subscriptionDate: new Date(),
           value: 20,
         };

         const contract2 = {
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
         contractRepository.create(contract2);

         const allCreatedContracts = await sut.execute();

    expect(allCreatedContracts.data).toHaveLength(2);
  });
});
