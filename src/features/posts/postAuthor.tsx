import { useAppSelector } from '../../app/hooks';

interface IPostAuthor {
  userId: string
}

export const PostAuthor: React.FC<IPostAuthor> = props => {
    const userId = props.userId;

    const author = useAppSelector(state =>
      state.users.find(user => user.id === userId)
    )

  return <span>by {author ? author.name : 'Unknown author'}</span>
}