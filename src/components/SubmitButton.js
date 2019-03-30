import React from "react";
import { Button, Spinner } from "evergreen-ui";

const SubmitButton = ({ loading }) => (
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
      disabled={loading ? true : false}
    >
      Login
    </Button>
    {loading ? <Spinner size={16} /> : <></>}
  </div>
);

export default SubmitButton;
