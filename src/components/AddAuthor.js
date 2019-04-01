import React, { useState } from "react";
import { Spinner, Button, Text } from "evergreen-ui";
import { db, storage } from "../config/firebase-config";
import InputField from "./InputField";
import FileUploadField from "./FileUploadField";
import { createInflateRaw } from "zlib";

const AddAuthor = props => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState("");
  const [picFile, setPicFile] = useState(null);

  const submitForm = event => {
    event.preventDefault();
    setLoading(true);
    var authorRef = db.collection("authors").doc();
    if (picFile === null) {
      createAuthor(authorRef, false);
    } else {
      var picRef = storage.ref("authors/" + authorRef.id);
      setUploading(true);
      picRef
        .put(picFile)
        .then(snapshot => {
          setUploading(false);
          createAuthor(authorRef, true);
        })
        .catch(error => {
          console.log(error);
          setUploading(false);
          setLoading(false);
          alert("An error occured when uploading image. Please try again");
        });
    }
  };

  const createAuthor = (authorRef, hasPhoto) => {
    const author = { name, hasPhoto, id: authorRef.id };
    authorRef.set(author).then(() => {
      alert(`Author ${name} successfully added`);
      setLoading(false);
      setName("");
      setPicFile(null);
    });
  };

  return (
    <>
      <h3>Add Author</h3>
      <form onSubmit={!loading ? submitForm : () => {}}>
        <InputField
          hint="Name"
          name="name"
          value={name}
          handleChange={setName}
          isRequired={true}
        />
        <FileUploadField
          name="photoUrl"
          title="Upload Photo"
          handleChange={files => setPicFile(files[0])}
          acceptableTypes="image/png, image/jpeg"
        />
        {uploading ? <Text>Uploading...</Text> : <></>}
        <br />
        <Button
          type="submit"
          appearance="primary"
          disabled={loading ? true : uploading ? true : false}
        >
          Submit
        </Button>
        {loading ? <Spinner /> : <></>}
      </form>
    </>
  );
};

export default AddAuthor;
