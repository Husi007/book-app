import axios from 'axios';
import authHeader from './auth-header';
import { API_PATHS, REACT_APP_API_URL } from './constants';

const getBooks = (): Promise<any> => {
  return axios.get(`${REACT_APP_API_URL}${API_PATHS.BOOKS}`, {
    headers: authHeader(),
    // params: { limit: 4, page: 1 },
  });
};

const createBook = (
  description: string,
  title: string,
  year: string
): Promise<any> => {
  return axios.post(
    `${REACT_APP_API_URL}${API_PATHS.BOOKS}`,
    { description, title, year },
    {
      headers: authHeader(),
      // params: { limit: 4, page: 1 },
    }
  );
};

const BookService = {
  createBook,
  getBooks,
};

export default BookService;
