import { db } from "@/server/infra/prisma";
import { ContractRepository } from "../contract";
import { Contract, ContractCreate } from "../data-model/contract-data-model";

export class PrismaContractRepository implements ContractRepository {
  async create(data: ContractCreate) {
    await db.contract.create({
      data,
    });
  }

  async findMany() {
    const contracts = await db.contract.findMany({
      include: {
        biddingType: true,
        supplier: true,
      },
    });

    const mappedContracts = contracts.map((contract) => {
      return {
        id: contract.id,
        number: contract.number,
        biddingTypeId: contract.biddingTypeId,
        biddingType: {
          id: contract.biddingType.id,
          name: contract.biddingType.name,
        },
        supplierId: contract.supplierId,
        supplier: {
          id: contract.supplier.id,
          name: contract.supplier.name,
          corporateName: contract.supplier.corporateName,
          address: contract.supplier.address,
          city: contract.supplier.city,
          cnpj: contract.supplier.cnpj,
          neighborhood: contract.supplier.neighborhood,
          number: contract.supplier.number,
          zipcode: contract.supplier.zipcode,
        },
        billingDeadline: contract.billingDeadline,
        endContract: contract.endContract,
        fixture: contract.fixture,
        processNumber: contract.processNumber,
      };
    });

    return mappedContracts;
  }

  async findBySupplierNumberAndProccess(
    supplierId: string,
    number: string,
    processNumber: string
  ) {
    const contract = await db.contract.findFirst({
      where: {
        supplierId,
        number,
        processNumber,
      },
      include: {
        biddingType: true,
        supplier: true,
      },
    });

    if (contract)
      return {
        id: contract.id,
        number: contract.number,
        biddingTypeId: contract.biddingTypeId,
        biddingType: {
          id: contract.biddingType.id,
          name: contract.biddingType.name,
        },
        supplierId: contract.supplierId,
        supplier: {
          id: contract.supplier.id,
          name: contract.supplier.name,
          corporateName: contract.supplier.corporateName,
          address: contract.supplier.address,
          city: contract.supplier.city,
          cnpj: contract.supplier.cnpj,
          neighborhood: contract.supplier.neighborhood,
          number: contract.supplier.number,
          zipcode: contract.supplier.zipcode,
        },
        billingDeadline: contract.billingDeadline,
        endContract: contract.endContract,
        fixture: contract.fixture,
        processNumber: contract.processNumber,
      };

    return null;
  }

  async findById(id: string): Promise<Contract | null> {
    const contract = await db.contract.findUnique({
      where: {
        id,
      },
      include: {
        biddingType: true,
        supplier: true,
        amendment: true,
      },
    });

    if (contract) {
      const amendmentMapper = contract.amendment.map((item) => {
        return {
          contractId: contract.id,
          dueDate: item.dueDate,
          id: item.id,
          number: item.number,
          subscriptionDate: item.subscriptionDate,
          value: Number(item.value),
        };
      });

      return {
        id: contract.id,
        number: contract.number,
        biddingTypeId: contract.biddingTypeId,
        biddingType: {
          id: contract.biddingType.id,
          name: contract.biddingType.name,
        },
        supplierId: contract.supplierId,
        supplier: {
          id: contract.supplier.id,
          name: contract.supplier.name,
          corporateName: contract.supplier.corporateName,
          address: contract.supplier.address,
          city: contract.supplier.city,
          cnpj: contract.supplier.cnpj,
          neighborhood: contract.supplier.neighborhood,
          number: contract.supplier.number,
          zipcode: contract.supplier.zipcode,
        },
        billingDeadline: contract.billingDeadline,
        endContract: contract.endContract,
        fixture: contract.fixture,
        processNumber: contract.processNumber,
        amendment: amendmentMapper,
      };
    }

    return null;
  }

  async remove(id: string) {
    await db.contract.delete({
      where: {
        id,
      },
    });
  }
}
