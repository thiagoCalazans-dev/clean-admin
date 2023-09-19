import { GetSupplierOutputDTO } from "../dto/supplier-dto";
import { SupplierRepository } from "../repository/supplier";

export class GetSuppliersUseCase {
  constructor(private supplierRepository: SupplierRepository) {}

  async execute(): Promise<GetSupplierOutputDTO> {
    const suppliers = await this.supplierRepository.findMany();

    const output: GetSupplierOutputDTO = {
      data: suppliers,
    };

    return output;
  }
}
