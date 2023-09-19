import { db } from "@/server/infra/prisma";
import { AmendmentRepository } from "../amendment";
import { Amendment, AmendmentCreate } from "../data-model/amendment-data-model";

export class PrismaAmendmentRepository implements AmendmentRepository {
  async create(data: AmendmentCreate) {
    const parsedValue = data.value.toString();

    await db.amendment.create({
      data: {
        dueDate: data.dueDate,
        subscriptionDate: data.subscriptionDate,
        number: data.number,
        contractId: data.contractId,
        value: parsedValue,
      },
    });
  }
  async findByContractIdAndNumber(contractId: string, number: number) {
    const response = await db.amendment.findFirst({
      where: {
        contractId,
        number,
      },
    });

    if (!response) return null;

    const parsedValue = Number(response.value);

    const amendment = {
      id: response.id,
      contractId: response.id,
      dueDate: response.dueDate,
      number: response.number,
      subscriptionDate: response.dueDate,
      value: parsedValue,
    };

    return amendment;
  }

  async findById(id: string): Promise<Amendment | null> {
    const response = await db.amendment.findUnique({
      where: {
        id,
      },
    });

    if (!response) return null;

    const parsedValue = Number(response.value);

    const amendment = {
      id: response.id,
      contractId: response.id,
      dueDate: response.dueDate,
      number: response.number,
      subscriptionDate: response.dueDate,
      value: parsedValue,
    };

    return amendment;
  }

  async remove(id: string) {
    await db.amendment.delete({
      where: {
        id,
      },
    });
    return;
  }
}
