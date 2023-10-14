import { randomUUID } from "node:crypto";
import { Amendment, AmendmentCreate } from "../data-model/amendment-data-model";
import { AmendmentRepository } from "../amendment";

export class InMemoryAmendmentRepository implements AmendmentRepository {
  public amendments: Amendment[] = [];

  async findByContractIdAndNumber(contractId: string, number: number) {
    const amendment = this.amendments.find(
      (item) => item.contractId === contractId && item.number === number
    );

    return amendment || null;
  }

  async create(data: AmendmentCreate): Promise<void> {
    const amendment: Amendment = {
      id: randomUUID(),
      ...data,
    };
    this.amendments.push(amendment);
  }

  async findById(id: string) {
    const amendment = this.amendments.find((amendment) => amendment.id === id);
    return amendment || null;
  }

  async remove(id: string): Promise<void> {
    const index = this.amendments.findIndex((amendment) => amendment.id === id);
    if (index !== -1) {
      this.amendments.splice(index, 1);
    }
    return;
  }
}
