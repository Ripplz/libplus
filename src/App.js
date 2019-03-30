import React from "react";
import "./App.css";
import BookSearch from "./components/BookSearch";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddBook from "./components/AddBook";
import AddAuthor from "./components/AddAuthor";
import Header from "./components/Header";
import ProtectedPage from "./components/ProtectedPage";
import Login from "./components/Login";
import Register from "./components/Register";

const App = props => {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <h2>Welcome to Lib+</h2>
          <ProtectedPage path="/login" component={Login} />
          <ProtectedPage path="/register" component={Register} />
          <ProtectedPage exact path="/" component={BookSearch} />
          <ProtectedPage path="/book-search" component={BookSearch} />
          <ProtectedPage path="/add-book" component={AddBook} />
          <ProtectedPage path="/add-author" component={AddAuthor} />
        </div>
      </div>
    </Router>
  );
};

export default App;
