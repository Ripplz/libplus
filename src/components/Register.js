import React, { useState } from "react";
import InputField from "./InputField";
import { Button, Spinner } from "evergreen-ui";
import { auth } from "../config/firebase-config";
import { Redirect } from "react-router-dom";

const Register = props => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [shouldSwitch, switchView] = useState(false);

  const register = event => {
    setLoading(true);
    const user = { name, email, password };
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCred => switchView(true))
      .catch(error => {
        switch (error.code) {
          case "auth/email-already-in-use":
            alert(
              "The email address provided is already associated with an account"
            );
            break;
          case "auth/invalid-email":
            alert("The email address provided is invalid");
            break;
          case "auth/weak-password":
            alert("Invalid password. Please enter at least 6 characters");
            break;
          default:
            alert(
              "An error occured when registering your account. Please try again"
            );
        }
        setLoading(false);
      });
    event.preventDefault();
  };

  return shouldSwitch ? (
    <Redirect to="/" />
  ) : (
    <form onSubmit={register}>
      <InputField
        hint="Enter Name"
        name="name"
        value={name}
        handleChange={setName}
        isRequired={true}
      />
      <InputField
        hint="Enter Email"
        name="email"
        value={email}
        type="email"
        handleChange={setEmail}
        isRequired={true}
      />
      <InputField
        hint="Enter Password"
        name="password"
        value={password}
        handleChange={setPassword}
        type="password"
        isRequired={true}
      />
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
          Register
        </Button>
        {loading ? <Spinner size={16} /> : <></>}
      </div>
      <Button
        type="button"
        appearance="primary"
        marginTop={8}
        onClick={() => switchView(true)}
        style={{ width: "100%", display: "block" }}
        disabled={loading ? true : false}
      >
        Login
      </Button>
    </form>
  );
};

export default Register;
