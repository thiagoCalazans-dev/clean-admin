import { SupplierRepository } from "../repository/supplier";
import { ResourceNotFoundError } from "@/server/errors/ResourceNotFoundError";

export class RemoveSuppliersUseCase {
  constructor(private supplierRepository: SupplierRepository) {}
  async execute(id: string) {
    const supplier = await this.supplierRepository.findById(id);

    if (!supplier) {
      throw new ResourceNotFoundError("Supplier");
    }

    await this.supplierRepository.remove(id);
  }
}
