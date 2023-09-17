export class InvalidContractPeriodError extends Error {
  constructor() {
    super(
      "Invalid contract period: Subscription date need to be before due date"
    );
  }
}
