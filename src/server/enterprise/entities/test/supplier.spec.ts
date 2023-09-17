import { expect, it, describe } from "bun:test";
import { Supplier } from "../supplier";
import { RequiredError } from "../../../errors/RequiredError";
import { PositiveError } from "../../../errors/PositiveError";

describe("test supplier entity rules", () => {
  it("should instance supplier", () => {
    const data: Supplier = {
      name: "name",
      address: "address",
      city: "city",
      neighborhood: "neighborhood",
      cnpj: "59.660.668/0001-08",
      corporateName: "corporateName",
      number: 1,
      zipcode: "55.555-999",
    };

    const supplier = Supplier.create(data);

    expect(supplier.name).toBeDefined();
  });

  it("should throw an error if name does not exists", async () => {
    const data: Supplier = {
      name: "",
      address: "address",
      city: "city",
      neighborhood: "neighborhood",
      cnpj: "59.660.668/0001-08",
      corporateName: "corporateName",
      number: 1,
      zipcode: "55.555-999",
    };

    await expect(() => {
      Supplier.create(data);
    }).toThrow(new RequiredError("name"));
  });

  it("should throw an error if address does not exists", async () => {
    const data: Supplier = {
      name: "name",
      address: "",
      city: "city",
      neighborhood: "neighborhood",
      cnpj: "59.660.668/0001-08",
      corporateName: "corporateName",
      number: 1,
      zipcode: "55.555-999",
    };

    await expect(() => {
      Supplier.create(data);
    }).toThrow(new RequiredError("address"));
  });
  it("should throw an error if city does not exists", async () => {
    const data: Supplier = {
      name: "name",
      address: "address",
      city: "",
      neighborhood: "neighborhood",
      cnpj: "59.660.668/0001-08",
      corporateName: "corporateName",
      number: 1,
      zipcode: "55.555-999",
    };

    await expect(() => {
      Supplier.create(data);
    }).toThrow(new RequiredError("city"));
  });
  it("should throw an error if neighborhood does not exists", async () => {
    const data: Supplier = {
      name: "name",
      address: "address",
      city: "city",
      neighborhood: "",
      cnpj: "59.660.668/0001-08",
      corporateName: "corporateName",
      number: 1,
      zipcode: "55.555-999",
    };

    await expect(() => {
      Supplier.create(data);
    }).toThrow(new RequiredError("neighborhood"));
  });
  it("should throw an error if cnpj does not exists", async () => {
    const data: Supplier = {
      name: "name",
      address: "address",
      city: "city",
      neighborhood: "neighborhood",
      cnpj: "",
      corporateName: "corporateName",
      number: 1,
      zipcode: "55.555-999",
    };

    await expect(() => {
      Supplier.create(data);
    }).toThrow(new RequiredError("cnpj"));
  });
  it("should throw an error if zipcode does not exists", async () => {
    const data: Supplier = {
      name: "name",
      address: "address",
      city: "city",
      neighborhood: "neighborhood",
      cnpj: "59.660.668/0001-08",
      corporateName: "corporateName",
      number: 1,
      zipcode: "",
    };

    await expect(() => {
      Supplier.create(data);
    }).toThrow(new RequiredError("zipcode"));
  });
  it("should throw an error if corporateName does not exists", async () => {
    const data: Supplier = {
      name: "name",
      address: "address",
      city: "city",
      neighborhood: "neighborhood",
      cnpj: "59.660.668/0001-08",
      corporateName: "",
      number: 1,
      zipcode: "55.555-999",
    };

    await expect(() => {
      Supplier.create(data);
    }).toThrow(new RequiredError("corporateName"));
  });
  it("should throw an error if number is negative", async () => {
    const data = {
      name: "name",
      address: "address",
      city: "city",
      neighborhood: "neighborhood",
      cnpj: "59.660.668/0001-08",
      corporateName: "corporateName",
      zipcode: "55.555-999",
      number: -10,
    };

    await expect(() => {
      Supplier.create(data);
    }).toThrow(new PositiveError());
  });
});
