import { ResourceAlreadyExistError } from "@/server/errors/ResourceAlreadyExistsError";

import { Amendment } from "@/server/enterprise/entities/amendment";
import { CreateAmendmentDTO } from "../dto/amendment-dto";
import { AmendmentRepository } from "../repository/amendment";
import { BiddingTypeRepository } from "../repository/bidding-type";
import { SupplierRepository } from "../repository/supplier";
import { ResourceNotFoundError } from "@/server/errors/ResourceNotFoundError";
import { ContractRepository } from "../repository/contract";

export class CreateAmendmentUseCase {
  constructor(
    private amendmentRepository: AmendmentRepository,
    private contractRepository: ContractRepository
  ) {}

  async execute({ data }: CreateAmendmentDTO) {
    const amendment = Amendment.create(data);

    const contractExists = await this.contractRepository.findById(
      data.contractId
    );

    if (!contractExists) {
      throw new ResourceNotFoundError("Contract");
    }

    const AmendmentWithSameNumberAndContract =
      await this.amendmentRepository.findByContractIdAndNumber(
        data.contractId,
        data.number
      );

    if (AmendmentWithSameNumberAndContract) {
      throw new ResourceAlreadyExistError("Amendment");
    }

    await this.amendmentRepository.create(amendment);
  }
}
