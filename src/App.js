import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AddBook from "./components/AddBook";
import AddAuthor from "./components/AddAuthor";
import Header from "./components/Header";
import ProtectedPage from "./components/ProtectedPage";
import Login from "./components/Login";
import Register from "./components/Register";
import BorrowBooks from "./components/BorrowBooks";
import ProtectedAdminPage from "./components/ProtectedAdminPage";
import InitAdmin from "./components/InitAdmin";
import { auth, db } from "./config/firebase-config";
import authStates from "./constants/auth_state";

const App = props => {
  const [authState, setAuthState] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid;
        db.collection("admins")
          .doc(uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              const dbUser = doc.data();
              const userType = dbUser.type;
              setAuthState(
                userType === "Admin" ? authStates.AUTH_STATE_ADMIN : authStates.AUTH_STATE_USER
              );
            } else setAuthState(authStates.AUTH_STATE_USER);
          })
          .catch(error => setAuthState(authStates.AUTH_STATE_USER));
      } else setAuthState(authStates.AUTH_STATE_LOGGED_OUT);
    });

    return () => {
      unsubscribe();
    };
  });

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <h2>Welcome to Lib+</h2>
          <ProtectedPage path="/login" authState={authState} component={Login} />
          <ProtectedPage path="/register" authState={authState} component={Register} />
          <ProtectedPage exact path="/" authState={authState} component={BorrowBooks} />
          <ProtectedAdminPage exact path="/admin" authState={authState} component={AddBook} />
          <ProtectedAdminPage exact path="/admin/login" authState={authState} component={InitAdmin} />
          {/* <ProtectedPage path="/admin/book-search" component={BookSearch} /> */}
          <ProtectedAdminPage path="/admin/add-book" authState={authState} component={AddBook} />
          <ProtectedAdminPage path="/admin/add-author" authState={authState} component={AddAuthor} />
        </div>
      </div>
    </Router>
  );
};

export default App;
