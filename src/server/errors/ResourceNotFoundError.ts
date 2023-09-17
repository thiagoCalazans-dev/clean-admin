export class ResourceNotfoundError extends Error {
  constructor(private resource: string) {
    super(`${resource} not found`);
  }
}
