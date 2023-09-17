import { randomUUID } from "node:crypto";
import { Supplier, SupplierCreate } from "../data-model/supplier-data-model";
import { SupplierRepository } from "../supplier";

export class InMemorySupplierRepository implements SupplierRepository {
  public supplier: Supplier[] = [];

  async create(data: SupplierCreate): Promise<Supplier> {
    const biddingType: Supplier = {
      id: randomUUID(),
      ...data,
    };
    this.supplier.push(biddingType);
    return biddingType;
  }

  async findMany() {
    return this.supplier;
  }

  async findByCNPJ(cnpj: string): Promise<Supplier | null> {
    const data = this.supplier.find(
      (supplier) => supplier.cnpj === cnpj
    );
    return data || null;
  }

  async findById(id: string): Promise<Supplier | null> {
    const biddingType = this.supplier.find((supplier) => supplier.id === id);
    return biddingType || null;
  }

  async remove(id: string): Promise<void> {
    const index = this.supplier.findIndex((supplier) => supplier.id === id);
    if (index !== -1) {
      this.supplier.splice(index, 1);
    }
    return;
  }

  async update(data: Supplier): Promise<Supplier> {
    const index = this.supplier.findIndex(
      (supplier) => supplier.id === data.id
    );
    if (index !== -1) {
      this.supplier[index] = data;
      return data;
    }
    throw new Error();
  }
}
