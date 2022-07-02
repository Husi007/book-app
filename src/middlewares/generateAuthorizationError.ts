import { NextFunction, Request, Response } from 'express';
import { ErrorConstants } from '../centeralizedErrorHandler/constants';
import { UnAuthorizedError401 } from '../centeralizedErrorHandler/unAuthorize401';
import { IUserPayload } from '../interfaces';

declare global {
  namespace Express {
    interface IRequest {
      currentUser?: IUserPayload;
    }
  }
}

export const generateAuthorizationError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new UnAuthorizedError401(ErrorConstants.UN_AUTHORIZED_USER);
  }

  return next();
};
