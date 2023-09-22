import { ResourceAlreadyExistError } from "@/server/errors/ResourceAlreadyExistsError";
import { SupplierRepository } from "../repository/supplier";
import { Supplier } from "@/server/enterprise/entities/supplier";
import { CreateSupplierDTO } from "../dto/supplier-dto";

export class CreateSupplier {
  constructor(private supplierRepository: SupplierRepository) {}

  async execute({ data }: CreateSupplierDTO) {
    const supplier = Supplier.create(data);

    const supplierWithSameCNPJ = await this.supplierRepository.findByCNPJ(
      supplier.cnpj
    );

    if (supplierWithSameCNPJ) {
      throw new ResourceAlreadyExistError("supplier");
    }

    await this.supplierRepository.create(supplier);
  }
}
