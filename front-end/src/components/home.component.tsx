import React, { useState, useEffect } from "react";
import bookService from "../services/book.service";

const Home: React.FC = (): JSX.Element => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    bookService.getBooks().then(
      (response: { data: { books: any } }) => {
        setBooks(response.data.books);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div>
      <h3>
        {books.map((book: any, index: any) => (
          <div key={index}>
            {book.title} - {book.year} - {book.description}
          </div>
        ))}
      </h3>
    </div>
  );
};

export default Home;
