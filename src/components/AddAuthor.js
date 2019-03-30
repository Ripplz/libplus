import React, { useState } from "react";
import { Spinner, Button } from "evergreen-ui";
import { db } from "../config/firebase-config";
import InputField from "./InputField";
import FileUploadField from "./FileUploadField";

const AddAuthor = props => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const submitForm = event => {
    setLoading(!loading);
    console.log(name);
    if (name !== null && name !== "") {
      db.collection("authors")
        .add({
          name: name,
          photoUrl: photoUrl
        })
        .then(ref => {
          setLoading(false);
          alert(`Author ${name} uploaded successfully`);
          setName("");
          setPhotoUrl("");
        })
        .catch(error => alert(error));
    }
    event.preventDefault();
  };

  const uploadPhoto = event => {
    setUploading(true);
  };

  return (
    <>
      <h3>Add Author</h3>
      <form onSubmit={!loading ? submitForm : () => {}}>
        <InputField
          label="Name"
          name="name"
          value={name}
          handleChange={setName}
          isRequired={true}
        />
        <FileUploadField
          name="photoUrl"
          title="Upload Photo"
          acceptableTypes="image/png, image/jpeg"
        />
        <Button
          onClick={uploadPhoto}
          appearance="primary"
          disabled={uploading ? true : loading ? true : false}
        >
          Upload
        </Button>
        {uploading ? <Spinner /> : <></>}
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
