import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { Pane, Spinner } from "evergreen-ui";
import { auth } from "../config/firebase-config";
import Login from "./Login";
import BookSearch from "./BookSearch";

const ProtectedPage = ({ component: Component, ...rest }) => {
  const [authState, setAuthState] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log("user is " + user);
      setAuthState(user === null ? false : true);
    });
  });

  return (
    <Route
      {...rest}
      render={props => {
        if (authState === null)
          return (
            <Pane>
              <Spinner marginX="auto" marginY={120} />
            </Pane>
          );
        else if (authState) {
          const path = props.location.pathname;
          return path === "/login" || path === "/register" ? (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          ) : (
            <Component {...props} />
          );
        } else
          return props.location.pathname === "/login" ? (
            <Login />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
      }}
    />
  );
};

export default ProtectedPage;
