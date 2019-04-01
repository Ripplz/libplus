import React from "react";
import NavListItem from "./NavListItem";
import { auth } from "../config/firebase-config";

const Logout = props => {
  return (
    <div onClick={() => auth.signOut()}>
      <NavListItem title={props.title} />
    </div>
  );
};

export default Logout;
