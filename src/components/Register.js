import React, { useState } from "react";
import InputField from "./InputField";
import { Button } from "evergreen-ui";
import { auth, db } from "../config/firebase-config";
import { Redirect } from "react-router-dom";
import SubmitButton from "./SubmitButton";

const Register = props => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [shouldSwitch, switchView] = useState(false);

  const register = event => {
    setLoading(true);
    const user = { name, email, type: "user" };
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCred => {
        // Add user to database
        const uid = userCred.user.uid;
        db.collection("users")
          .doc(uid)
          .set({ uid: uid, ...user });
      })
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
    <Redirect push to="/login" />
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
      <SubmitButton loading={loading} label="Register" />
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
