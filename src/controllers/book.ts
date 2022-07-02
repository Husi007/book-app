import { NextFunction, Request, Response } from 'express';
import { httpStatusCodes } from '../constants/httpsStatusCode';
import { IUserPayload } from '../interfaces';
import BookService from '../services/book';

declare global {
  namespace Express {
    interface Request {
      currentUser?: IUserPayload;
    }
  }
}

export class BookController {
  public async createBook(req: Request, res: Response, next: NextFunction) {
    try {
      const reqBody = {
        userId: req.currentUser!.id,
        ...req.body,
      };
      const result = await BookService.createBook(reqBody);

      return res.status(httpStatusCodes.CREATED).send(result.book);
    } catch (error) {
      return next(error);
    }
  }

  public async updateBook(req: Request, res: Response, next: NextFunction) {
    try {
      const bookId = +req.params.bookId;
      const userId = req.currentUser!.id;
      const result = await BookService.updateBook(req.body, bookId, userId);

      return res.status(httpStatusCodes.OK).send(result.book);
    } catch (error) {
      return next(error);
    }
  }

  public async deleteBook(req: Request, res: Response, next: NextFunction) {
    try {
      const bookId = +req.params.bookId;
      const userId = req.currentUser!.id;

      await BookService.deleteBook(userId, bookId);

      return res.status(httpStatusCodes.OK).send({});
    } catch (error) {
      return next(error);
    }
  }

  public async getBooks(req: Request, res: Response, next: NextFunction) {
    try {
      const filter = {
        ...req.query,
        userId: req.currentUser!.id,
      };
      const result = await BookService.getBooks(filter);

      return res.status(200).send(result);
    } catch (error) {
      return next(error);
    }
  }

  public async getBook(req: Request, res: Response, next: NextFunction) {
    try {
      const bookId = +req.params.bookId;
      const userId = req.currentUser!.id;
      const result = await BookService.getBook(userId, bookId);

      return res.status(httpStatusCodes.OK).send(result.book);
    } catch (error) {
      return next(error);
    }
  }
}
export default new BookController();
