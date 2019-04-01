import React, { useEffect, useState } from "react";
import NavList from "./NavList";
import Title from "./Title";
import { db, auth } from "../config/firebase-config";
import LinkedAdminNavListItem from "./LinkedAdminNavListItem";
import Logout from "./Logout";

const Header = props => {
  const [isAdmin, setAdminStatus] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setLoggedIn(user ? true : false);
      if (user) {
        const uid = user.uid;
        db.collection("admins")
          .doc(uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              const dbUser = doc.data();
              const userType = dbUser.type;
              setAdminStatus(userType === "Admin");
            }
          });
      }
    });
  });
  return (
    <header>
      <Title />
      <NavList>
        {isLoggedIn && <Logout title="Logout" />}
        {isAdmin && (
          <>
            <LinkedAdminNavListItem title="Home" />
            {/* <LinkedAdminNavListItem title="Book Search" /> */}
            <LinkedAdminNavListItem title="Add Book" />
            <LinkedAdminNavListItem title="Add Author" />
          </>
        )}
      </NavList>
    </header>
  );
};

export default Header;
