import axios from "axios";
import * as dotenv from "dotenv";
import authHeader from "./auth-header";
import { API_PATHS } from "./constants";

dotenv.config();

const getBooks = (): Promise<any> => {
  return axios.get(process.env.REACT_APP_API_URL + API_PATHS.BOOKS, {
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
    process.env.REACT_APP_API_URL + API_PATHS.BOOKS,
    { description, title, year },
    {
      headers: authHeader(),
      // params: { limit: 4, page: 1 },
    }
  );
};

const BookService = {
  getBooks,
  createBook,
};

export default BookService;
