import React from "react";
import { FilePicker, Text } from "evergreen-ui";

const FileUploadField = ({ handleChange, title, name, acceptableTypes }) => (
    <div>
        <Text>{title}</Text>
    <FilePicker
    onChange={handleChange && (files => handleChange(files))}
    accept={acceptableTypes}
    name={name}
    marginTop={8}
    marginBottom={8}
    />
    </div>
);

export default FileUploadField