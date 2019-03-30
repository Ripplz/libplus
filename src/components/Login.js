import React, { useState } from "react";
import InputField from "./InputField";
import { Button, Spinner } from "evergreen-ui";
import { auth } from "../config/firebase-config";
import { Redirect } from 'react-router-dom';

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [shouldSwitch, switchView] = useState(false);

  const login = event => {
    setLoading(true);
    auth.signInWithEmailAndPassword(email, password).catch(error => {
      switch(error.code) {
        case 'auth/invalid-email':
          alert('The email address provided is invaid');
          break;
        case 'auth/user-not-found':
          alert('The email address provided is not registered');
          break;
        case 'auth/wrong-password':
          alert('The password provided is invalid');
          break;
        default:
          alert('An error occured when logging in. Please try again');
      }
      setLoading(false);
    });
    event.preventDefault();
  };

  return (
      shouldSwitch ? <Redirect to="/register" /> : <form onSubmit={login}>
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
            Login
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
          Register
        </Button>
      </form>
  );
};

export default Login;
