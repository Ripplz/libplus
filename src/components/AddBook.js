import React, { useEffect, useState } from "react";
import { Text } from "evergreen-ui";
import { db, storage } from "../config/firebase-config";
import SubmitButton from "./SubmitButton";
import MultiSelectField from "./MutliSelectField";
import InputField from "./InputField";
import FileUploadField from "./FileUploadField";

const AddBook = props => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [allAuthors, setAllAuthors] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [title, setTitle] = useState("");
  const [copies, setCopies] = useState(1);
  const [bookFile, setBookFile] = useState(null);

  useEffect(() => {
    db.collection("authors")
      .get()
      .then(snapshot => {
        const authorDocs = snapshot.docs;
        const allAuthors = authorDocs.map(doc => doc.data());
        setAllAuthors(allAuthors);
      })
      .catch(err => console.log(`Error getting authors: ${err}`));
  }, []);

  const submitBook = event => {
    event.preventDefault();
    setLoading(true);
    if (authors.length) {
      var bookRef = db.collection("books").doc();
      if (bookFile === null) {
        createBook(bookRef, false);
      } else {
        var pdfRef = storage.ref("books/" + bookRef.id);
        setUploading(true);
        pdfRef
          .put(bookFile)
          .then(snapshot => {
            setUploading(false);
            createBook(bookRef, true);
          })
          .catch(error => {
            console.log(error);
            setUploading(false);
            setLoading(false);
            alert("An error occured when uploading book. Please try again");
          });
      }
    }
    setLoading(false);
  };

  const createBook = (bookRef, hasPdf) => {
    const book = { title, authors, copies, hasPdf, id: bookRef.id };
    bookRef
      .set(book)
      .then(() => {
        for (let i = 0; i < copies; i++) {
          var copyRef = db.collection("book_copies").doc();
          copyRef
            .set({ id: copyRef.id, bookId: bookRef.id, status: 1 })
            .then(() => {})
            .catch(error => {
              alert(
                "An error occured when trying to add book copy. Please try again"
              );
              console.log(error);
              setLoading(false);
            });
        }
        alert(`Book ${title} successfully added`);
        setLoading(false);
        setTitle("");
        setAuthors([]);
        setCopies(1);
        setBookFile(null);
      })
      .catch(error => {
        alert("An error occured when trying to add book. Please try again");
        console.log(error);
        setLoading(false);
      });
  };

  const selectAuthor = authorId => {
    const selected = [...authors, authorId];
    setAuthors(selected);
  };

  const deselectAuthor = authorId => {
    const deselectedItemIndex = authors.indexOf(authorId);
    const selectedItems = authors.filter(
      (_item, i) => i !== deselectedItemIndex
    );
    setAuthors(selectedItems);
  };

  return (
    <>
      <h3>Add Book</h3>
      <form onSubmit={!loading ? submitBook : () => {}}>
        <InputField
          hint="Title"
          name="title"
          value={title}
          handleChange={setTitle}
          isRequired={true}
        />
        <FileUploadField
          name="bookPdf"
          title="Upload PDF"
          handleChange={files => setBookFile(files[0])}
          acceptableTypes=".pdf"
        />
        {uploading ? <Text>Uploading...</Text> : <></>}
        <br />
        <Text marginRight={8}>Select Authors</Text>
        <div>
          <MultiSelectField
            label="Select Authors"
            options={allAuthors.map(author => ({
              label: author.name,
              value: author.id
            }))}
            value={authors}
            handleSelect={selectAuthor}
            handleDeselect={deselectAuthor}
            isRequired
          />
          {authors.length === 0 && (
            <Text color="red" marginLeft={8}>
              Select at least one author
            </Text>
          )}
        </div>
        <div>
          <Text>Copies</Text>
          <InputField
            hint="Copies"
            name="copies"
            type="number"
            value={copies}
            handleChange={copies => {
              if (copies > 0) setCopies(copies);
            }}
            isRequired={true}
          />
        </div>
        <SubmitButton loading={loading} uploading={uploading} label="Submit" />
      </form>
    </>
  );
};

export default AddBook;
