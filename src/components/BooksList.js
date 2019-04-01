import React, { useState, useEffect } from "react";
import { Table } from "evergreen-ui";
import { db } from "../config/firebase-config";
import BookListItem from "./BookListItem";

const BooksList = props => {
  const [books, setBooks] = useState(null);
  const [authors, setAuthors] = useState(null);
  var isMounted = true;

  useEffect(() => {
    db.collection("books")
      .get()
      .then(books => {
        if (isMounted) {
          const newBooks = {};
          books.forEach(
            book => (newBooks[book.id] = { id: book.id, ...book.data() })
          );
          setBooks(newBooks);
          db.collection("authors")
            .get()
            .then(authors => {
              if (isMounted) {
                const newAuthors = {};
                authors.forEach(
                  author =>
                    (newAuthors[author.id] = {
                      id: author.id,
                      ...author.data()
                    })
                );
                setAuthors(newAuthors);
              }
            });
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const openBorrowBook = bookId => {
    alert(`${books[bookId].title}`);
  };

  return books === null ? (
    <p>No Books Available</p>
  ) : (
    <Table>
      <Table.Head>
        <Table.TextHeaderCell>Books</Table.TextHeaderCell>
        <Table.TextHeaderCell>Authors</Table.TextHeaderCell>
      </Table.Head>
      <Table.Body height={240}>
        {Object.keys(books).map(bookId => (
          <BookListItem
            key={bookId}
            book={books[bookId]}
            authors={authors}
            handleSelect={openBorrowBook}
          />
        ))}
      </Table.Body>
    </Table>
  );
};

export default BooksList;
