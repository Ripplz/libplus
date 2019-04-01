import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import { auth, db } from "../config/firebase-config";

const InitAdmin = props => {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCodeSet, setCodeStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    alert("Enter the 6-digit code for the admin account");
  }, []);

  const submit = event => {
    event.preventDefault();
    if (code.length !== 6) alert("Please enter a correct 6-digit code");
    else {
      if (!isCodeSet) {
        setLoading(true);
        db.collection("access")
          .doc(code)
          .get()
          .then(doc => {
            if (doc.exists) {
              const accessData = doc.data();
              setEmail(accessData.email);
              setCodeStatus(true);
            }
          })
          .catch(error => {
            console.log(error);
            alert("An error occured when logging in. Please try again");
          });
        setLoading(false);
      } else {
        setLoading(true);
        auth.signInWithEmailAndPassword(email, password)
        .catch(error => {
          switch (error.code) {
            case "auth/invalid-email":
              alert("The email address provided is invaid");
              break;
            case "auth/user-not-found":
              alert("The email address provided is not registered");
              break;
            case "auth/wrong-password":
              alert("The password provided is invalid");
              break;
            default:
              alert("An error occured when logging in. Please try again");
          }
          setLoading(false);
        });
      }
    }
  };

  return (
    <form onSubmit={submit}>
      <InputField
        label="6-digit code"
        name="code"
        value={code}
        type="number"
        handleChange={setCode}
        hint="6-digit code"
        isInvalid={code.length !== 6}
        isRequired={true}
      />
      <InputField
        hint="Enter Email"
        name="email"
        value={email}
        type="email"
        handleChange={setEmail}
        isRequired={isCodeSet}
        style={{ display: isCodeSet ? "initial" : "none" }}
      />
      <InputField
        hint="Enter Password"
        name="password"
        value={password}
        handleChange={setPassword}
        type="password"
        isRequired={isCodeSet}
        style={{ display: isCodeSet ? "initial" : "none" }}
      />
      <SubmitButton
        loading={loading}
        label={isCodeSet ? "Login" : "Continue"}
      />
    </form>
  );
};

export default InitAdmin;
