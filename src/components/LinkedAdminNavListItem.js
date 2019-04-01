import React from "react";
import { Link } from "react-router-dom";
import NavListItem from "./NavListItem";

const LinkedAdminNavListItem = props => (
  <Link
    to={
      props.title === "Home"
        ? "/admin"
        : "/admin/" + props.title.toLowerCase().replace(" ", "-")
    }
  >
    <NavListItem title={props.title} />
  </Link>
);

export default LinkedAdminNavListItem;
