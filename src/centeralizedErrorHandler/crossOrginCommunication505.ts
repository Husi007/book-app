import { BaseError } from './base';

export class CrossOrginCommunication505 extends BaseError {
  public statusCode: number = 500;
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, CrossOrginCommunication505.prototype);
  }

  public serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
