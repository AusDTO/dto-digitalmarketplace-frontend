import React from 'react'
import format from 'date-fns/format'
import isBefore from 'date-fns/is_before'
import parse from 'date-fns/parse'
import differenceInSeconds from 'date-fns/difference_in_seconds'

const ClosedDate = props => {
  let final = 'Closed'

  if (props.date) {
    const parsed = props.isNewClosingTime ? parse(props.date).setHours(23, 59) : parse(props.date)
    const today = new Date()

    if (isBefore(today, parsed)) {
      if (props.countdown) {
        let text = ''
        let duration = ''
        const seconds = differenceInSeconds(parsed, today)
        const hour = 3600
        const day = 86400
        const week = 604800
        // depending on how many seconds are left to reach the closed date, produce a string that represents the time
        // left to go, using units weeks, days, hours, and minutes
        if (seconds < hour) {
          const minutes = Math.ceil(seconds / 60)
          text = `0d : 0h : ${minutes}m`
          duration = `P0DT${minutes}M`
        } else if (seconds >= hour && seconds < day) {
          const hours = Math.floor(seconds / hour)
          const minutes = Math.floor((seconds - hours * hour) / 60)
          text = `0d : ${hours}h : ${minutes}m`
          duration = `P0DT${hours}H${minutes}M`
        } else if (seconds >= day && seconds < week) {
          const days = Math.floor(seconds / day)
          const hours = Math.floor((seconds - days * day) / 60 / 60)
          const minutes = Math.floor((seconds - days * day - hours * hour) / 60)
          text = `${days}d : ${hours}h : ${minutes}m`
          duration = `P${days}DT${hours}H${minutes}M`
        } else if (seconds >= week) {
          const weeks = Math.floor(seconds / week)
          const days = Math.floor((seconds - weeks * week) / day)
          const hours = Math.floor((seconds - weeks * week - days * day) / 60 / 60)
          text = `${weeks}w : ${days}d : ${hours}h`
          const durationDays = weeks * 7 + days
          duration = `P${durationDays}DT${hours}H`
        }
        final = <time dateTime={duration}>{text}</time>
      } else {
        final = (
          <time dateTime={format(parsed, 'YYYY-MM-DDTHH:mm:ss.SSSZ')}>{`6pm, ${format(parsed, 'D MMMM YYYY')}`}</time>
        )
      }
    }
  }

  return final
}

export default ClosedDate
