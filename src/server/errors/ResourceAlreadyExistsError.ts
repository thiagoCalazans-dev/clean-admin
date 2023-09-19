export class ResourceAlreadyExistError extends Error {
  readonly status = 409;

  constructor(private resource: string) {
    super(`${resource} already exists`);
  }
}
