import React, { useState } from "react";
import { FormField, SearchInput, Spinner, Heading, Table, Button } from "evergreen-ui";
import { db } from "../config/firebase-config";

const BookSearch = props => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [results, setResults] = useState([]);

  const search = event => {
    event.preventDefault();
    setLoading(true);
    db.collection("books")
      .where("title", "==", title)
      .get()
      .then(snapshot => {
        const newResults = [];
        snapshot.forEach(doc => newResults.push(doc.data()));
        setResults(newResults);
        setLoading(false);
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      <form onSubmit={search}>
        <FormField label="Book Search">
          <SearchInput
            placeholder="Book Title..."
            value={title}
            onChange={event => setTitle(event.target.value)}
            required
            disabled={loading}
          />
        </FormField>
        <div className="buttons">
          <Button
            type="submit"
            appearance="primary"
            disabled={loading ? true : false}
          >
            Search
          </Button>
          {loading ? <Spinner /> : <></>}
        </div>
        <br />
        <Heading is="h3">Results</Heading>
        <div style={{ color: "black" }}>
          <Table>
            <Table.Head>
              <Table.TextHeaderCell>Title</Table.TextHeaderCell>
              <Table.TextHeaderCell>Author</Table.TextHeaderCell>
            </Table.Head>

            <Table.Body>
              {results.map((res, index) => (
                <Table.Row key={index}>
                  <Table.TextCell>{res.title}</Table.TextCell>
                  <Table.TextCell>{res.author}</Table.TextCell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </form>
    </>
  );
};

export default BookSearch;
