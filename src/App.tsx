import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import './App.css';

import { Navbar } from "./app/Navbar";
import { AddPostForm } from "./features/posts/AddPostForm";
import PostsList from "./features/posts/PostsList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="users/*" element={<Users />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div>
      <Navbar />
      <React.Fragment>
        <AddPostForm />
        <PostsList />
      </React.Fragment>
    </div>
  );
}

export default App;
