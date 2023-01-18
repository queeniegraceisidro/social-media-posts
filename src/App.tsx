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
import { PostsList } from "./features/posts/PostsList";
import { SinglePostPage } from "./features/posts/SinglePostPage";
import { EditPostForm } from './features/posts/EditPostForm'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:postId" element={<SinglePostPage />} />
        <Route path="/editPost/:postId" element={<EditPostForm />} />
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
