import { NextFunction, Request, Response } from 'express';
import { httpStatusCodes } from '../constants/httpsStatusCode';
import userService from '../services/user';

class UserController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.signUp(req.body);

      return res.status(httpStatusCodes.CREATED).send({
        token: result.token,
        username: result.username,
      });
    } catch (error) {
      return next(error);
    }
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.signIn(req.body);

      return res.status(httpStatusCodes.OK).send({
        token: result.token,
        username: result.username,
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();
