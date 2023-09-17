import { expect, it, describe, beforeEach } from "bun:test";
import { SupplierRepository } from "../../repository/supplier";
import { InMemorySupplierRepository } from "../../repository/in-memory/supplier-in-memory-repository";
import { GetSuppliersUseCase } from "../get-suppliers-use-case";

let supplierRepository: SupplierRepository;
let sut: GetSuppliersUseCase;

describe("get bidding types use case suit", () => {
  beforeEach(() => {
    supplierRepository = new InMemorySupplierRepository();
    sut = new GetSuppliersUseCase(supplierRepository);
  });
  it("should to get all suppliers", async () => {
    const data = await supplierRepository.create({
      name: "John Doe",
      address: "Foo street",
      city: "Foo city",
      cnpj: "19.331.603/0001-02",
      corporateName: "Foo Corporate",
      neighborhood: "Foo neighborhood",
      number: 96,
      zipcode: "02.612-000",
    });

    const data2 = await supplierRepository.create({
      name: "John Doe",
      address: "Foo street",
      city: "Foo city",
      cnpj: "19.331.603/0001-03",
      corporateName: "Foo Corporate",
      neighborhood: "Foo neighborhood",
      number: 96,
      zipcode: "02.612-000",
    });

    const allCreatedSuppliers = await sut.execute();

    expect(allCreatedSuppliers).toHaveLength(2);
  });
});
