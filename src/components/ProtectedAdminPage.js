import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { Pane, Spinner } from "evergreen-ui";
import { auth, db } from "../config/firebase-config";
import InitAdmin from "./InitAdmin";
import authStates from "../constants/auth_state";

const ProtectedAdminPage = ({ component: Component, authState, ...rest }) => {
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
          case authStates.AUTH_STATE_USER:
            return path === "/admin/login" ? (
              <InitAdmin />
            ) : (
              <Redirect push to="/admin/login" />
            );
          case authStates.AUTH_STATE_ADMIN:
            return path === "/admin/login" ? (
              <Redirect push to="/admin" />
            ) : (
              <Component {...props} />
            );
        }
      }}
    />
  );
};

export default ProtectedAdminPage;
