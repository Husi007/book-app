export abstract class BaseError extends Error {
  public abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
  }

  public abstract serializeErrors(): Array<{ message: string; field?: string }>;
}
