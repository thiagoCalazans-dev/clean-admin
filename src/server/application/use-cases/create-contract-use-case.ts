import { ResourceAlreadyExistError } from "@/server/errors/ResourceAlreadyExistsError";

import { Contract } from "@/server/enterprise/entities/contract";
import { CreateContractDTO } from "../dto/contract-dto";
import { ContractRepository } from "../repository/contract";
import { BiddingTypeRepository } from "../repository/bidding-type";
import { SupplierRepository } from "../repository/supplier";
import { ResourceNotfoundError } from "@/server/errors/ResourceNotFoundError";

export class CreateContractUseCase {
  constructor(
    private contractRepository: ContractRepository,
    private biddingTypeRepository: BiddingTypeRepository,
    private supplierRepository: SupplierRepository
  ) {}

  async execute({ data }: CreateContractDTO) {
    const contract = Contract.create(data);

    const biddingTypeExists = await this.biddingTypeRepository.findById(
      data.biddingTypeId
    );

    if (!biddingTypeExists) {
      throw new ResourceNotfoundError("Bidding type");
    }

    const supplierExists = await this.supplierRepository.findById(
      data.supplierId
    );

    if (!supplierExists) {
      throw new ResourceNotfoundError("Supplier");
    }

    const ContractWithSameSupplierNumberAndProcessExists =
      await this.contractRepository.findBySupplierNumberAndProccess(
        data.supplierId,
        data.number,
        data.processNumber
      );

    if (ContractWithSameSupplierNumberAndProcessExists) {
      throw new ResourceAlreadyExistError("Contract");
    }

    await this.contractRepository.create(contract);
  }
}
