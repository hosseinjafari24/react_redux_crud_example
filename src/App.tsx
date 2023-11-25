import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import PostsList from "./components/Post/PostsList";
import AddPost from "./components/Post/AddPost";
import Post from "./components/Post/Post";
import UsersList from "./components/User/UsersList";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import AddUser
    from "./components/User/AddUser";
import EditUser
    from "./components/User/EditUser";

function App() {
    return (
          <Router>
              <nav className="navbar navbar-expand navbar-dark bg-dark">
                  <Link to={"/posts"} className="navbar-brand">
                      bezKoder
                  </Link>
                  <div className="navbar-nav mr-auto">
                      <li className="nav-item">
                          <Link to={"/posts"} className="nav-link">
                              Posts
                          </Link>
                      </li>
                      <li className="nav-item">
                          <Link to={"/add"} className="nav-link">
                              Add Post
                          </Link>
                      </li>
                      <li className="nav-item">
                          <Link to={"/users"} className="nav-link" data-cy="users-index">
                              Users
                          </Link>
                      </li>
                  </div>
              </nav>
              <div className="container mt-3">
                  <Routes>
                      <Route path="/" element={<PostsList/>} />
                      <Route path="/posts" element={<PostsList/>} />
                      <Route path="/add" element={<AddPost/>} />
                      <Route path="/posts/:id" element={<Post/>} />
                      
                      <Route path="/users" element={<UsersList/>} />
                      <Route path="/users/new" element={<AddUser/>} />
                      <Route path="/users/:id/edit" element={<EditUser />} />
                  </Routes>
              </div>
          </Router>
    );
}

export default App;
