import React, { useState, useEffect } from "react";
// import AuthService from "../services/auth.service";
import BookService from "../services/book.service";
import { IBookResponse } from "../services/intefaces";
import { BUTTONS, HEADINGS, PLACE_HOLDERS } from "./constants";

const BookComponent: React.FC = (): JSX.Element => {
  const [books, setBooks] = useState<Array<IBookResponse>>([]);
  // const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");

  const getBooks = (): void => {
    BookService.getBooks().then(
      (response: { data: { books: [] } }) => {
        setBooks(response.data.books);
      },
      (error: any) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    // const user = AuthService.getCurrentUser();
    // if (user?.userAccessToken !== "") {
    //   setCurrentUser(user);
    // }

    // getBooks();
  }, []);

  const createBook = (event: React.SyntheticEvent): void => {
    event.preventDefault();

    BookService.createBook(description, title, year).then(
      (response: { data: IBookResponse }) => {
        setBooks([...books, response.data]);
        getBooks();
      },
      (error: any) => {
        console.log(error);
      }
    );
  };

  return (
    <div>
      <h3>
        {books.map((book: any, index: any) => (
          <div key={index}>
            {book.title} - {book.year} - {book.description}
          </div>
        ))}
      </h3>
      <div>
        <form onSubmit={createBook}>
          <h3> {HEADINGS.CREATE_BOOK.LABEL} </h3>
          <input
            type="text"
            placeholder={PLACE_HOLDERS.TITLE}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            type="text"
            placeholder={PLACE_HOLDERS.YEAR}
            value={year}
            onChange={(event) => setYear(event.target.value)}
          />
          <input
            type="text"
            placeholder={PLACE_HOLDERS.DESCRIPTION}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <button type="submit"> {BUTTONS.CREATE_BOOK.LABEL}</button>
        </form>
      </div>
    </div>
  );
};

export default BookComponent;
