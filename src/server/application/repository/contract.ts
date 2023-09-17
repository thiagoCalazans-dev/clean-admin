import { Contract, ContractCreate } from "./data-model/contract-data-model";

export interface ContractRepository {
  create(data: ContractCreate): Promise<void>;
  findMany(): Promise<Contract[]>;
  findBySupplierNumberAndProccess(
    supplierId: string,
    number: string,
    processNumber: string
  ): Promise<Contract | null>;
  findById(id: string): Promise<Contract | null>;
  remove(id: string): Promise<void>;
}
