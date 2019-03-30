import React from "react";
import LinkedNavListItem from "./LinkedNavListItem";
import NavList from "./NavList";
import Title from "./Title";

const Header = props => (
  <header>
    <Title />
    <NavList>
      <LinkedNavListItem title="Home" />
      <LinkedNavListItem title="Book Search" />
      <LinkedNavListItem title="Add Book" />
      <LinkedNavListItem title="Add Author" />
    </NavList>
  </header>
);

export default Header