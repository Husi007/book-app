import { BaseError } from './base';

export class NoResourceFoundError404 extends BaseError {
  public statusCode: number = 404;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, NoResourceFoundError404.prototype);
  }

  public serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
