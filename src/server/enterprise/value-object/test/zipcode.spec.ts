import { describe, it, expect } from "bun:test";
import { Zipcode } from "../zipcode";
import { ValidZipcodeError } from "../../../errors/ValidZipcodeError";

describe("teste currency validade rules value object", () => {
  it("should validate", async () => {
    const value = "55.555-999";

    const zipcode = Zipcode.validate(value);
    expect(zipcode.value).toBeDefined();
  });

  it("should throw an error if Zipcode had more than 8 characteres", async () => {
    const zipcode = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

    await expect(() => {
      Zipcode.validate(zipcode);
    }).toThrow(new ValidZipcodeError("should had 8 characteres"));
  });

  it("should throw an error if zipcode had same numbers", async () => {
    const zipcode = "55.555-555";

    await expect(() => {
      Zipcode.validate(zipcode);
    }).toThrow(new ValidZipcodeError());
  });
});
