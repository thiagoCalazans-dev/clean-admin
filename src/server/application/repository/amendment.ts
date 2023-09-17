import { Amendment, AmendmentCreate } from "./data-model/amendment-data-model";

export interface AmendmentRepository {
  create(data: AmendmentCreate): Promise<void>;
  findById(id: string): Promise<Amendment | null>;
  findByContractIdAndNumber(
    contractId: string,
    number: number
  ): Promise<Amendment | null>;
  remove(id: string): Promise<void>;
}
