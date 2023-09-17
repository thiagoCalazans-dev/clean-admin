export class CurrencyTypeError extends Error {
  constructor() {
    super(
      "needs to attend a curency type value: must be positive and with a maximum of two decimal places"
    );
  }

  static status = 406;
}
