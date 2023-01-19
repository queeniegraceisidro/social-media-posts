import { useAppDispatch } from "../../app/hooks"
import { reactionAdded } from "./postsSlice"

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
}

interface IReactionButtons {
  post: any
}

export const ReactionButtons: React.FC<IReactionButtons> = props => {
  const dispatch = useAppDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() =>
          dispatch(reactionAdded({ postId: props.post.id, reaction: name }))
        }
      >
        {emoji} {props.post.reactions[name]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}