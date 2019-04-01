import React from "react";
import { Heading } from "evergreen-ui";
import BooksList from "./BooksList";

const BorrowBooks = props => {
  return (
    <>
      <Heading marginBottom={8}>Borrow Books</Heading>
      <BooksList />
    </>
  );
};

export default BorrowBooks;
