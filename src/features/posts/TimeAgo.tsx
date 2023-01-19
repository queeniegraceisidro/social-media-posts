import { parseISO, formatDistanceToNow } from 'date-fns'

interface ITimeAgo {
    timestamp: string
}

export const TimeAgo: React.FC<ITimeAgo> = props => {
    const timestamp = props.timestamp;

    let timeAgo = ''
    if (timestamp) {
      const date = parseISO(timestamp)
      const timePeriod = formatDistanceToNow(date)
      timeAgo = `${timePeriod} ago`
    }
  
    return (
      <span title={timestamp}>
        &nbsp; <i>{timeAgo}</i>
      </span>
    )
}
