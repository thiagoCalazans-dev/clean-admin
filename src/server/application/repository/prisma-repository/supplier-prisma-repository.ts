import { db } from "@/server/infra/prisma";
import { SupplierRepository } from "../supplier";
import { Supplier, SupplierCreate } from "../data-model/supplier-data-model";

export class PrismaSupplierRepository implements SupplierRepository {
  async findMany() {
    const suppliers = await db.supplier.findMany();
    return suppliers;
  }

  async findByCNPJ(cnpj: string) {
    const supplier = await db.supplier.findUnique({
      where: {
        cnpj: cnpj,
      },
    });

    return supplier;
  }
  async findById(id: string) {
    const supplier = await db.supplier.findUnique({
      where: {
        id,
      },
    });

    return supplier;
  }

  async create(data: SupplierCreate) {
    const supplier = await db.supplier.create({
      data,
    });

    return supplier;
  }

  async update(data: Supplier) {
    const supplier = db.supplier.update({
      where: {
        id: data.id,
      },
      data: data,
    });

    return supplier;
  }

  async remove(id: string): Promise<void> {
    await db.supplier.delete({
      where: {
        id,
      },
    });
    return;
  }
}
