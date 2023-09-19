export class ResourceNotFoundError extends Error {
  readonly status = 404;

  constructor(private resource: string) {
    super(`${resource} not found`);
  }
}
