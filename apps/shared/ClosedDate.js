import format from 'date-fns/format'
import isBefore from 'date-fns/is_before'
import parse from 'date-fns/parse'
import differenceInSeconds from 'date-fns/difference_in_seconds'

const ClosedDate = props => {
  let text = 'Closed'

  if (props.date) {
    const parsed = parse(props.date)
    const today = new Date()

    if (isBefore(today, parsed)) {
      if (props.countdown) {
        const seconds = differenceInSeconds(parsed, today)
        // depending on how many seconds are left to reach the closed date, produce a string that represents the time
        // left to go from weeks to minutes
        if (seconds < 3600) {
          const minutes = Math.ceil(seconds / 60)
          text = `0d : 0h : ${minutes}m`
        } else if (seconds >= 3600 && seconds < 86400) {
          const hours = Math.floor(seconds / 3600)
          const minutes = Math.floor((seconds - hours * 3600) / 60)
          text = `0d : ${hours}h : ${minutes}m`
        } else if (seconds >= 86400 && seconds < 604800) {
          const days = Math.floor(seconds / 86400)
          const hours = Math.floor((seconds - days * 86400) / 60 / 60)
          const minutes = Math.floor((seconds - days * 86400 - hours * 3600) / 60)
          text = `${days}d : ${hours}h : ${minutes}m`
        } else if (seconds >= 604800) {
          const weeks = Math.floor(seconds / 604800)
          const days = Math.floor((seconds - weeks * 604800) / 86400)
          const hours = Math.floor((seconds - weeks * 604800 - days * 86400) / 60 / 60)
          text = `${weeks}w : ${days}d : ${hours}h`
        }
      } else {
        text = `6pm, ${format(parsed, 'D MMMM YYYY')}`
      }
    }
  }

  return text
}

export default ClosedDate
