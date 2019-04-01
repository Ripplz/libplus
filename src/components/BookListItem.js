import React from "react";
import { Table } from "evergreen-ui";

const BookListItem = ({ book, authors, handleSelect }) => {
  //   const authorsList = book.authors.map(authorId => authors[authorId]);
  return (
    <Table.Row
      isSelectable
      onSelect={() => handleSelect(book.id)}
    >
      <Table.TextCell>{book.title}</Table.TextCell>
      <Table.TextCell>Yooooo!</Table.TextCell>
    </Table.Row>
  );
};

export default BookListItem;
