import { Op } from 'sequelize';
import { ErrorConstants } from '../centeralizedErrorHandler/constants';
import { NoResourceFoundError404 } from '../centeralizedErrorHandler/notFound404';
import {
  IBookCreationAttributes,
  IBookFilter,
  IBookUpdateAttributes,
} from '../interfaces';
import { Book, User } from '../models';

class BookService {
  public async createBook(reqBody: IBookCreationAttributes) {
    const { title, description, userId, year } = reqBody;
    const existingUser = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      throw new NoResourceFoundError404(ErrorConstants.USER_NOT_FOUND);
    }

    const book = await Book.create({
      description,
      title,
      userId,
      year,
    });

    return { book };
  }

  public async updateBook(
    data: IBookUpdateAttributes,
    bookId: number,
    userId: number
  ) {
    const { title, year, description } = data;
    const existingUser = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      throw new NoResourceFoundError404(ErrorConstants.USER_NOT_FOUND);
    }

    const book = await Book.findOne({
      where: {
        id: bookId,
        userId,
      },
    });

    if (!book) {
      throw new NoResourceFoundError404(ErrorConstants.BOOK_NOT_FOUND);
    }

    if (title) {
      book.title = title;
    }

    if (description) {
      book.description = description;
    }

    if (year) {
      book.year = year;
    }

    await book.save();

    return { book };
  }

  public async deleteBook(userId: number, bookId: number) {
    const existingUser = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      throw new NoResourceFoundError404(ErrorConstants.BOOK_NOT_FOUND);
    }

    const book = await Book.findOne({
      where: {
        id: bookId,
        userId,
      },
    });

    if (!book) {
      throw new NoResourceFoundError404(ErrorConstants.BOOK_NOT_FOUND);
    }

    await book.destroy();

    return;
  }

  public async getBooks(bookFilter: IBookFilter) {
    const {
      id,
      page = 0,
      limit = 10,
      title,
      year,
      description,
      userId,
    } = bookFilter;
    const offset = limit * page;
    const books = await Book.findAll({
      limit,
      offset,
      where: {
        userId,
        ...(id && { id }),
        ...(title && {
          title: {
            [Op.iLike]: `%${title}%`,
          },
        }),
        ...(description && {
          description: {
            [Op.iLike]: `%${description}%`,
          },
        }),
        ...(year && {
          year: {
            [Op.iLike]: `%${year}%`,
          },
        }),
      },
    });

    return { books };
  }

  public async getBook(userId: number, bookId: number) {
    const existingUser = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      throw new NoResourceFoundError404(ErrorConstants.USER_NOT_FOUND);
    }

    const book = await Book.findOne({
      where: {
        id: bookId,
        userId,
      },
    });

    if (!book) {
      throw new NoResourceFoundError404(ErrorConstants.BOOK_NOT_FOUND);
    }

    return { book };
  }
}

export default new BookService();
