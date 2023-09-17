import { CurrencyTypeError } from "../../errors/CurrencyTypeError";

export class Currency {
  readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  static validate(value: number) {
    if (value < 0) {
      throw new CurrencyTypeError();
    }

    const numberOfDecimalPlaces = (value.toString().split(".")[1] || "").length;

    if (numberOfDecimalPlaces > 2) {
      throw new CurrencyTypeError();
    }

    return new Currency(value);
  }
}
