import { ValidZipcodeError } from "../../errors/ValidZipcodeError";

export class Zipcode {
  readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static validate(value: string) {
    // Remove caracteres não numéricos
    value = value.replace(/[^\d]/g, "");

    if (value.length !== 8)
      throw new ValidZipcodeError("should had 8 characteres");

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(value)) {
      throw new ValidZipcodeError();
    }

    return new Zipcode(value);
  }
}
