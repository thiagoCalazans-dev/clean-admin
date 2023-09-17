import { PositiveError } from "../../errors/PositiveError";

export class Positive {
  readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  static validate(value: number) {
    if (value < 0) throw new PositiveError();

    return new Positive(value);
  }
}
