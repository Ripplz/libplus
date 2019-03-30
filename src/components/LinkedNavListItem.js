import React from "react";
import { Link } from "react-router-dom";
import NavListItem from "./NavListItem";

const LinkedNavListItem = props => (
  <Link
    to={
      props.title === "Home"
        ? "/"
        : "/" + props.title.toLowerCase().replace(" ", "-")
    }
  >
    <NavListItem title={props.title} />
  </Link>
);

export default LinkedNavListItem;
