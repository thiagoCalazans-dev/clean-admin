import { randomUUID } from "node:crypto";
import { RequiredError } from "../../errors/RequiredError";
import { Cnpj } from "../value-object/cnpj";
import { Zipcode } from "../value-object/zipcode";
import { Positive } from "../value-object/positive";

export class Supplier {
  readonly id?: string;
  readonly name: string;
  readonly corporateName: string;
  readonly cnpj: string;
  readonly zipcode: string;
  readonly city: string;
  readonly neighborhood: string;
  readonly address: string;
  readonly number: number;
  readonly observation?: string;

  private constructor({
    id,
    address,
    city,
    cnpj,
    corporateName,
    name,
    neighborhood,
    number,
    zipcode,
    observation,
  }: Supplier) {
    this.name = name;
    this.id = id;
    this.address = address;
    this.city = city;
    this.cnpj = cnpj;
    this.corporateName = corporateName;
    this.neighborhood = neighborhood;
    this.number = number;
    this.zipcode = zipcode;
    this.observation = observation;
  }

  static create(supplier: Supplier) {
    const id = supplier.id ?? randomUUID();
    const observation = supplier.observation ?? "";

    if (!supplier.name) throw new RequiredError("name");
    if (!supplier.address) throw new RequiredError("address");
    if (!supplier.city) throw new RequiredError("city");
    if (!supplier.neighborhood) throw new RequiredError("neighborhood");
    if (!supplier.corporateName) throw new RequiredError("corporateName");
    if (!supplier.zipcode) throw new RequiredError("zipcode");
    if (!supplier.cnpj) throw new RequiredError("cnpj");

    const cnpj = Cnpj.validate(supplier.cnpj);
    const zipcode = Zipcode.validate(supplier.zipcode);
    const number = Positive.validate(supplier.number);

    const newSupplier: Supplier = {
      ...supplier,
      id,
      observation,
      cnpj: cnpj.value,
      zipcode: zipcode.value,
      number: number.value,
    };

    return new Supplier(newSupplier);
  }
}
