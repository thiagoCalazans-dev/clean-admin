export class PositiveError extends Error {
  constructor() {
    super("needs to be positive");
  }
}
