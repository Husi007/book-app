import axios from 'axios';
import authHeader from './auth-header';
import env from "react-dotenv";
import { API_PATHS } from './constants';

const getBooks = (): Promise<any> => {
  return axios.get(`${env.REACT_APP_API_URL}${API_PATHS.BOOKS}`, {
    headers: authHeader(),
  });
};

const createBook = (
  description: string,
  title: string,
  year: string
): Promise<any> => {
  return axios.post(
    `${env.REACT_APP_API_URL}${API_PATHS.BOOKS}`,
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
