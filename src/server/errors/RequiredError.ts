export class RequiredError extends Error {
  constructor(private value: string) {
    super(`${value} is required`);
  }

  readonly status = 409;
}
