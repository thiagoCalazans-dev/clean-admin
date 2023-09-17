import { invalidCnpjError } from "../../errors/InvalidCnpjError";

export class Cnpj {
  readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static validate(value: string) {
    // Remove caracteres não numéricos
    value = value.replace(/[^\d]/g, "");

    if (value.length !== 14)
      throw new invalidCnpjError("should had 14 characteres");

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(value)) {
      throw new invalidCnpjError();
    }

    return new Cnpj(value);
  }
}
