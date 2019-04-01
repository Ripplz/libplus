import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { Pane, Spinner } from "evergreen-ui";
import { auth, db } from "../config/firebase-config";
import Login from "./Login";
import Register from "./Register";
import authStates from "../constants/auth_state";

const ProtectedPage = ({ component: Component, authState, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        const path = props.location.pathname;
        switch (authState) {
          case null:
            return (
              <Pane>
                <Spinner marginX="auto" marginY={120} />
              </Pane>
            );
          case authStates.AUTH_STATE_LOGGED_OUT:
            return path === "/login" ? (
              <Login />
            ) : path === "/register" ? (
              <Register />
            ) : (
              <Redirect push to="/login" />
            );
          case authStates.AUTH_STATE_USER:
            return path === "/login" || path === "/register" ? (
              <Redirect push to="/" />
            ) : (
              <Component {...props} />
            );
          case authStates.AUTH_STATE_ADMIN:
            return <Redirect push to="/admin" />;
        }
      }}
    />
  );
};

export default ProtectedPage;
