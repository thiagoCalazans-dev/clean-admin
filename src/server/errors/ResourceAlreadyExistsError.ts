export class ResourceAlreadyExistError extends Error {
  constructor(private resource: string) {
    super(`${resource} already exists`);
  }
}
