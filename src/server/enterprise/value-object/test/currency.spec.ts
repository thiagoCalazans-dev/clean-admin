import { describe, it, expect } from "bun:test";
import { Currency } from "../currency";
import { CurrencyTypeError } from "../../../errors/CurrencyTypeError";

describe("teste currency validade rules value object", () => {
  it("should validate", async () => {
    const value = 3.45;

    const currency = Currency.validate(value);
    expect(currency.value).toBe(value);
  });
  it("should throw an error if cost has more then two decimals", async () => {
    const cost = 3.4567;

    await expect(() => {
      Currency.validate(cost);
    }).toThrow(new CurrencyTypeError());
  });

  it("should throw an error if cost has negative type", async () => {
    const cost = -3.47;

    await expect(() => {
      Currency.validate(cost);
    }).toThrow(new CurrencyTypeError());
  });
});
