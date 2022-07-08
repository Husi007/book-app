import React, { useEffect, useState } from "react";
import BookService from "../services/book.service";
import { IBookResponse } from "../services/intefaces";
import "./css/index.css";
import {
  BUTTONS,
  HEADINGS,
  PLACE_HOLDERS,
  ROUTES,
  TABEL_HEADS,
} from "./constants";
import { useNavigate } from "react-router-dom";

const BookComponent: React.FC = (): JSX.Element => {
  const [books, setBooks] = useState<IBookResponse[]>([]);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const navigation = useNavigate();

  useEffect(() => {
    getBooks();
  }, []);

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

  const logout = (): void => {
    localStorage.clear();
    navigation(ROUTES.SIGN_IN);
  };

  return (
    <div className="row">
      <nav className="navbar bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 text-light">
            {HEADINGS.BOOKS_COMPONENT.LABEL}
          </span>
          <div className="logout" onClick={logout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20.99"
              height="22.5"
              viewBox="0 0 20.99 22.5"
            >
              <path
                id="logout"
                d="M25.49,7a2.427,2.427,0,0,0-2.332-2.5H13.831V7h9.327V24.5H13.831V27h9.327a2.427,2.427,0,0,0,2.332-2.5ZM8.963,14.5l2.957-3.17L10.271,9.562,4.5,15.75l5.771,6.187,1.648-1.767L8.963,17h7.678V14.5Z"
                transform="translate(-4.5 -4.5)"
                fill="#949494"
                fill-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </nav>
      <div className="container">
        <h3 className="col-md-12 text-center mt-5">
          {HEADINGS.CREATE_BOOK.LABEL}
        </h3>
        <form className="col-md-12 text-center mt-5" onSubmit={createBook}>
          <br />
          <input
            className="col-xs-3 text-center"
            type="text"
            placeholder={PLACE_HOLDERS.TITLE}
            maxLength={30}
            minLength={4}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            className="col-xs-3 text-center"
            type="text"
            placeholder={PLACE_HOLDERS.YEAR}
            maxLength={4}
            minLength={4}
            value={year}
            onChange={(event) => setYear(event.target.value)}
          />
          <input
            className="col-xs-3 text-center"
            type="textarea"
            placeholder={PLACE_HOLDERS.DESCRIPTION}
            value={description}
            maxLength={255}
            minLength={4}
            onChange={(event) => setDescription(event.target.value)}
          />
          <br />
          <br />
          <button className="btn btn-primary text-center" type="submit">
            {BUTTONS.CREATE_BOOK.LABEL}
          </button>
        </form>
        <table className=" col-md-12 table">
          <thead className="text-center">
            <tr>
              <th scope="col">#</th>
              <th scope="col">{TABEL_HEADS.TITLE}</th>
              <th scope="col">{TABEL_HEADS.YEAR}</th>
              <th scope="col">{TABEL_HEADS.DESCRIPTION}</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book: any, index: number) => (
              <tr className="text-center">
                <th scope="row">{index + 1}</th>
                <td> {book.title} </td>
                <td> {book.year} </td>
                <td> {book.description} </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!books.length ? (
          <div className="text-center col-md-12">
            <span className="text-secondary  text-center">
              No Books Found !!
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default BookComponent;
