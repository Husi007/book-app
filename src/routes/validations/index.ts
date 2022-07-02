import { body, param, query } from 'express-validator';

export const ROUTE_VALIDATIONS = {
  BODY: {
    BOOK_ID: param('bookId')
      .trim()
      .isNumeric()
      .withMessage('bookId must be a valid number.'),
    DESCRIPTION: body('description')
      .isString()
      .trim()
      .isLength({ max: 255, min: 4 })
      .notEmpty()
      .withMessage('Description must be of 4 and 255 characters length.'),
    NAME: body('name')
      .isString()
      .trim()
      .isLength({ max: 30, min: 4 })
      .notEmpty()
      .withMessage('Name must be of 4 and 30 characters length'),
    PASSWORD: body('password')
      .isString()
      .trim()
      .isLength({ max: 30, min: 4 })
      .notEmpty()
      .withMessage('Password must be of 4 and 30 characters length'),
    TITLE: body('title')
      .isString()
      .trim()
      .isLength({ max: 50, min: 4 })
      .notEmpty()
      .withMessage('Title must be of 4 and 500 characters length.'),
    USERNAME: body('username')
      .isString()
      .trim()
      .isLength({ max: 30, min: 4 })
      .notEmpty()
      .withMessage('Username must be of 4 and 30 characters length'),
    YEAR: body('year')
      .isString()
      .trim()
      .isLength({ max: 255, min: 4 })
      .notEmpty()
      .withMessage('Description must be of 4 and 255 characters length.'),
  },
  QUERY: {
    Id: query('id').isNumeric().optional().withMessage('id must be a number.'),
    LIMIT: query('limit').isNumeric().withMessage('limit must be a number.'),
    PAGE: query('page').isNumeric().withMessage('page must be a number.'),
  },
};
