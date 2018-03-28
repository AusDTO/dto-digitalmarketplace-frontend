import format from 'date-fns/format'
import isBefore from 'date-fns/is_before'
import parse from 'date-fns/parse'

const ClosedDate = props => {
  let text = 'Closed'

  if (props.date) {
    const parsed = parse(props.date)
    const today = new Date()

    if (isBefore(today, parsed)) {
      text = `6pm, ${format(parsed, 'D MMMM YYYY')}`
    }
  }

  return text
}

export default ClosedDate
