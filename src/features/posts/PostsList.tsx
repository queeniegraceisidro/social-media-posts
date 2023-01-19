import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Link } from 'react-router-dom'
import { PostAuthor } from './postAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButton';
import { selectAllPosts, fetchPosts, IPostItem } from './postsSlice'
import { Spinner } from '../../components/Spinner'


interface IPostExcerpt {
  post: IPostItem
}

const PostExcerpt : React.FC<IPostExcerpt> = props =>  {
  return (
    <article className="post-excerpt">
      <h3>{props.post.title}</h3>
      <div>
        <PostAuthor userId={props.post.user} />
        <TimeAgo timestamp={props.post.date} />
      </div>
      <p className="post-content">{props.post.content.substring(0, 100)}</p>

      <ReactionButtons post={props} />
      <Link to={`/posts/${props.post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

export const PostsList = () => {
  const dispatch = useAppDispatch()
  const posts = useAppSelector(selectAllPosts)

  const postStatus = useAppSelector(state => state.posts.status)
  const error = useAppSelector(state => state.posts.error)


  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map(post => (
      <PostExcerpt key={post.id} post={post} />
    ))
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}