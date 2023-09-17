export class invalidCnpjError extends Error {
  constructor(message?: string) {
    super(message ?? "CNPJ invalid");
  }
}
