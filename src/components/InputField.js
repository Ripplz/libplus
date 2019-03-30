import React from "react";
import { TextInput } from "evergreen-ui";

const InputField = ({
  label,
  type,
  name,
  value,
  handleChange,
  hint,
  isRequired
}) => (
  <div style={{display: 'flex', flexDirection: 'column'}}>
    <TextInput
      label={label && label}
      name={name}
      value={value}
      type={type || "text"}
      placeholder={hint && hint}
      onChange={event => handleChange(event.target.value)}
      height={40}
      marginBottom={20}
      required={isRequired || false}
    />
  </div>
);

export default InputField;
