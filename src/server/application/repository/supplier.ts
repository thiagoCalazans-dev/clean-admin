import { Supplier, SupplierCreate } from "./data-model/supplier-data-model";

export interface SupplierRepository {
  findMany(): Promise<Supplier[]>;
  findByCNPJ(cnpj: string): Promise<Supplier | null>;
  findById(id: string): Promise<Supplier | null>;
  create(data: SupplierCreate): Promise<Supplier>;
  update(data: Supplier): Promise<Supplier>;
  remove(id: string): Promise<void>;
}
