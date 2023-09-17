import { describe, it, expect } from "bun:test";
import { Cnpj } from "../cnpj";
import { invalidCnpjError } from "../../../errors/InvalidCnpjError";

describe("teste currency validade rules value object", () => {
  it("should validate", async () => {
    const value = "59.660.668/0001-08";

    const cnpj = Cnpj.validate(value);
    expect(cnpj.value).toBeDefined();
  });
  it("should throw an error if CNPJ had more than 14 characteres", async () => {
    const cnpj = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

    await expect(() => {
      Cnpj.validate(cnpj);
    }).toThrow(new invalidCnpjError("should had 14 characteres"));
  });

  it("should throw an error if CNPJ had same numbers", async () => {
    const cnpj = "00.000.000/0000-00";

    await expect(() => {
      Cnpj.validate(cnpj);
    }).toThrow(new invalidCnpjError());
  });
});
