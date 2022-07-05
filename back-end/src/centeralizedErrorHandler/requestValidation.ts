import { ValidationError } from 'express-validator';
import { BaseError } from './base';
import { ErrorConstants } from './constants';

export class RequestValidationError422 extends BaseError {
  public statusCode: number = 422;

  constructor(public errors: ValidationError[]) {
    super(ErrorConstants.VALIDATION_ERROR);
    Object.setPrototypeOf(this, RequestValidationError422.prototype);
  }

  public serializeErrors() {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}
