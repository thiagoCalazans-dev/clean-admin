
import { randomUUID } from "node:crypto";
import { ContractRepository } from "../contract";
import { Contract, ContractCreate } from "../data-model/contract-data-model";

export class InMemoryContractRepository implements ContractRepository {
  public contracts: Contract[] = [];

  async create(data: ContractCreate): Promise<void> {
    const contract: Contract = {
      id: randomUUID(),
      ...data,
    };
    this.contracts.push(contract);
  }

  async findMany() {
    return this.contracts;
  }

  async findById(id: string) {
    const contract = this.contracts.find((contract) => contract.id === id);
    return contract || null;
  }

  async findBySupplierNumberAndProccess(
    supplierId: string,
    number: string,
    processNumber: string
  ): Promise<Contract | null> {
    const contract = this.contracts.find(
      (item) =>
        item.supplierId === supplierId &&
        item.number === number &&
        item.processNumber === processNumber
    );
    return contract || null;
  }

  async remove(id: string): Promise<void> {
    const index = this.contracts.findIndex((contract) => contract.id === id);
    if (index !== -1) {
      this.contracts.splice(index, 1);
    }
    return;
  }
}
