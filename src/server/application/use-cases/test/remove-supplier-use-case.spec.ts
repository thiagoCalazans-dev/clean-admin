import { expect, it, describe, beforeEach } from "bun:test";
import { SupplierRepository } from "../../repository/supplier";
import { InMemorySupplierRepository } from "../../repository/in-memory/supplier-in-memory-repository";
import { RemoveSuppliersUseCase } from "../remove-supplier-use-case";
import { ResourceNotfoundError } from "@/server/errors/ResourceNotFoundError";

let supplierRepository: SupplierRepository;
let sut: RemoveSuppliersUseCase;

describe("create bidding type use case suit", () => {
  beforeEach(() => {
    supplierRepository = new InMemorySupplierRepository();
    sut = new RemoveSuppliersUseCase(supplierRepository);
  });
  it("should remove supplier ", async () => {
    const name = "John Doe";
    const createdData = await supplierRepository.create({
      name: "John Doe",
      address: "Foo street",
      city: "Foo city",
      cnpj: "19.331.603/0001-03",
      corporateName: "Foo Corporate",
      neighborhood: "Foo neighborhood",
      number: 96,
      zipcode: "02.612-000",
    });

    const deletedData = await sut.execute(createdData.id);

    expect(deletedData).toBeUndefined();
  });

  it("should throw an error if supplier not found in remove method", async () => {
    const id = "inexistentId";

    await expect(() => sut.execute(id)).toThrow(
      new ResourceNotfoundError("Supplier")
    );
  });
});
