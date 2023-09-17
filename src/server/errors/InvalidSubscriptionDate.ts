export class InvalidSubscriptionDate extends Error {
  constructor() {
    super(
      "Invalid subscription date: subscription date cannot be later than today"
    );
  }
}
