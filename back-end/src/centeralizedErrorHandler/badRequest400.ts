import { BaseError } from './base';

export class BadRequestError400 extends BaseError {
  public statusCode: number = 400;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError400.prototype);
  }

  public serializeErrors() {
    return [{ message: this.message }];
  }
}
