import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Link } from 'react-router-dom'
import { PostAuthor } from './postAuthor';
import { TimeAgo } from './TimeAgo';

export const PostsList = () => {
  const posts = useAppSelector(state => state.posts)

  // Sort posts in reverse chronological order by datetime string
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map(post => {
    return (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <Link to={`/posts/${post.id}`} className="button muted-button">
          View Post
        </Link>
      </article>
    )
  })
  return <div>{renderedPosts}</div>
}