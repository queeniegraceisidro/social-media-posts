import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import './App.css';

import { Navbar } from "./app/Navbar";
import { AddPostForm } from "./features/posts/AddPostForm";
import { PostsList } from "./features/posts/PostsList";
import { SinglePostPage } from "./features/posts/SinglePostPage";
import { EditPostForm } from './features/posts/EditPostForm'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:postId" element={<ViewPost/>} />
        <Route path="/editPost/:postId" element={<EditPost/>} />
      </Routes>
    </BrowserRouter>
  );
}

const Home = () => {
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

const ViewPost = () => {
  return (
    <div>
      <Navbar />
      <React.Fragment>
      <SinglePostPage />
      </React.Fragment>
    </div>
  );
}

const EditPost = () => {
  return (
    <div>
      <Navbar />
      <React.Fragment>
      <EditPostForm />
      </React.Fragment>
    </div>
  );
}

export default App;