import express from 'express';
import BookController from '../controllers/book';
import { generateAuthorizationError } from '../middlewares/generateAuthorizationError';
import { validateAuthorization } from '../middlewares/validateAuthorization';
import { validateRequest } from '../middlewares/validateRequest';
import { ROUTE_VALIDATIONS } from './validations';

const router = express.Router();

router.post(
  '/',
  validateAuthorization,
  generateAuthorizationError,
  [
    ROUTE_VALIDATIONS.BODY.TITLE,
    ROUTE_VALIDATIONS.BODY.DESCRIPTION,
    ROUTE_VALIDATIONS.BODY.YEAR,
  ],
  validateRequest,
  BookController.createBook
);

router.put(
  '/:bookId',
  validateAuthorization,
  generateAuthorizationError,
  [
    ROUTE_VALIDATIONS.BODY.TITLE,
    ROUTE_VALIDATIONS.BODY.YEAR,
    ROUTE_VALIDATIONS.BODY.DESCRIPTION,
    ROUTE_VALIDATIONS.BODY.BOOK_ID,
  ],
  validateRequest,
  BookController.updateBook
);

router.delete(
  '/:bookId',
  validateAuthorization,
  generateAuthorizationError,
  [ROUTE_VALIDATIONS.BODY.BOOK_ID],
  validateRequest,
  BookController.deleteBook
);

router.get(
  '/',
  validateAuthorization,
  generateAuthorizationError,
  [
    ROUTE_VALIDATIONS.QUERY.PAGE,
    ROUTE_VALIDATIONS.QUERY.LIMIT,
    ROUTE_VALIDATIONS.QUERY.Id,
    ROUTE_VALIDATIONS.BODY.TITLE,
    ROUTE_VALIDATIONS.BODY.YEAR,
    ROUTE_VALIDATIONS.BODY.DESCRIPTION,
  ],
  BookController.getBooks
);

router.get(
  '/:bookId',
  validateAuthorization,
  generateAuthorizationError,
  [ROUTE_VALIDATIONS.BODY.BOOK_ID],
  BookController.getBook
);

export { router as bookRouter };
