export class ValidZipcodeError extends Error {
  constructor(message?: string) {
    super(message ?? "Zipcode invalid");
  }
}
