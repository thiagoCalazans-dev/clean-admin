export class RequiredError extends Error {
  constructor(private value: string) {
    super(`${value} is required`);
  }
}
