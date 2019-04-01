import React from "react";
import { Table } from "evergreen-ui";
import { auth } from "firebase";

const BookListItem = ({ book, authors, handleSelect }) => {
  //   const authorsList = book.authors.map(authorId => authors[authorId]);
  return (
    <Table.Row isSelectable onSelect={() => handleSelect(book.id)}>
      <Table.TextCell>{book.title}</Table.TextCell>
      <Table.TextCell>
        {authors &&
          authors.map((author, index) => {
            return typeof author === "undefined"
              ? ""
              : `${index > 0 ? "\n" : ""}${author.name}`;
          })}
      </Table.TextCell>
    </Table.Row>
  );
};

export default BookListItem;
