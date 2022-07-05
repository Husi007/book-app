import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError400 } from '../centeralizedErrorHandler/badRequest400';
import { ErrorConstants } from '../centeralizedErrorHandler/constants';
import { IUserPayload } from '../interfaces';

declare global {
  namespace Express {
    interface IRequest {
      currentUser?: IUserPayload;
    }
  }
}

export const validateAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return next();
    }

    const token = authorization.split(' ')[1];

    if (!token) {
      return next();
    }

    const payload = jwt.verify(token, process.env.JWT_KEY!) as IUserPayload;
    req.currentUser = payload;
  } catch (error) {
    throw new BadRequestError400(ErrorConstants.JWT_VERIFICATIION_ERROR);
  }

  return next();
};
