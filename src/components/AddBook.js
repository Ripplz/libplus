import React, { useEffect, useState } from "react";
import { Spinner } from "evergreen-ui";
import { db } from "../config/firebase-config";

const AddBook = props => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    db.collection("authors")
      .get()
      .then(snapshot => {
        const newAuthors = [...authors];
        snapshot.forEach(doc => {
          newAuthors.push(doc.data().name);
        });
        setAuthors(newAuthors);
        setAuthor(newAuthors[0]);
      })
      .catch(err => console.log(`Error getting authors: ${err}`));
  }, []);

  const submitBook = () => {
    setLoading(!loading);
    db.collection("books")
      .add({
        title: title,
        author: author
      })
      .then(ref => {
        setTitle("");
        setAuthor(authors[0]);
        alert(`Book ${title} added successfully`);
        setLoading(false);
      })
      .catch(error => console.log(error));
  };

  const uploadBook = () => {
    setUploading(true);
    setTimeout(() => setUploading(false), 2000);
  };

  return (
    <>
      <h3>Add Book</h3>
      <form onSubmit={submitBook}>
        <div className="form-group">
          <label>Title</label>
          <input
            name="title"
            value={title}
            onChange={event => setTitle(event.target.value)}
            className={`form-control col-12`}
            required
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <select
            name="author"
            value={author}
            onChange={event => setAuthor(event.target.value)}
            className="form-control col-12"
            required
          >
            {authors.map((opt, i) => (
              <option value={opt} key={i}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Upload Book</label>
          <input
            type="file"
            name="url"
            className={`form-control col-12`}
            accept="image/png, image/jpeg"
          />
          <div className="buttons">
            <button
              type="button"
              onClick={uploadBook}
              className="btn"
              disabled={uploading ? true : loading ? true : false}
            >
              Upload
            </button>
            {uploading ? <Spinner /> : <></>}
          </div>
        </div>
        <div className="buttons">
          <button
            type="submit"
            className="btn"
            disabled={loading ? true : uploading ? true : false}
          >
            Submit
          </button>
          {loading ? <Spinner /> : <></>}
        </div>
      </form>
    </>
  );
};

export default AddBook;
