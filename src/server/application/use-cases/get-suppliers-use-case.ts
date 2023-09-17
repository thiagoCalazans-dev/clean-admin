import { SupplierRepository } from "../repository/supplier";

export class GetSuppliersUseCase {
  constructor(private supplierRepository: SupplierRepository) {}

  async execute() {
    const suppliers = await this.supplierRepository.findMany();
    return suppliers;
  }
}
