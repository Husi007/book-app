import { BaseError } from './base';

export class NoConentFoundError202 extends BaseError {
  public statusCode: number = 202;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, NoConentFoundError202.prototype);
  }

  public serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
