import { BaseError } from './base';

export class UnAuthorizedError401 extends BaseError {
  public statusCode: number = 401;
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, UnAuthorizedError401.prototype);
  }

  public serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
