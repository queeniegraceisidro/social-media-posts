import React from "react";
import { useSelector } from "react-redux";

export interface IPostsListViewModel {
  posts?: []
}


const PostsList: React.FC<IPostsListViewModel> = (props) => {
  const posts = useSelector((state) => props.posts);

  const renderedPosts = posts?.map((post?) => (
    <article className="post-excerpt" key={post['id']}>
      <h3>{post['title']}</h3>
      <p className="post-content">{post['content']}</p>
    </article>
  ));

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
}

export default PostsList
