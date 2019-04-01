import React from "react";
import { Button, Spinner } from "evergreen-ui";

const SubmitButton = ({ loading, uploading=false, label }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <Button
      type="submit"
      appearance="primary"
      intent="success"
      marginRight={8}
      marginBottom={8}
      disabled={loading ? true : uploading ? true : false}
    >
      {label}
    </Button>
    {loading ? <Spinner size={16} /> : <></>}
  </div>
);

export default SubmitButton;
