// will add fns to this file over time
/* eslint-disable import/prefer-default-export */
import subDays from 'date-fns/sub_days'
import addDays from 'date-fns/add_days'
import isWeekend from 'date-fns/is_weekend'

export const uniqueID = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)

export const statusConvert = (status = '') => {
  const newStatus = status === 'live' ? 'open' : status
  return `${newStatus.charAt(0).toUpperCase()}${newStatus.slice(1)}`
}

export const getResponsesFileSizeAndType = (bytes, lot) => {
  let result = ''
  if (lot === 'digital-professionals' || lot === 'training') {
    let size = ''
    if (bytes < 1048576) {
      size = `${parseFloat(bytes / 1024).toFixed(2)}KB`
    } else {
      size = `${parseFloat(bytes / 1024 / 1024).toFixed(2)}MB`
    }
    result = `${size} zip`
  } else if (lot === 'digital-outcome') {
    result = 'csv'
  }
  return result
}

export const nextWeekDay = date => {
  let newDate = date
  while (isWeekend(newDate)) {
    newDate = addDays(newDate, 1)
  }
  return newDate
}

export const getBriefLastQuestionDate = closingDate => {
  const today = new Date()
  let lastQuestionDate = new Date()
  if (closingDate < addDays(today, 3)) {
    lastQuestionDate = nextWeekDay(subDays(closingDate, 1))
    if (today > lastQuestionDate) {
      lastQuestionDate = today
    }
  } else if (closingDate < addDays(today, 8)) {
    lastQuestionDate = nextWeekDay(addDays(today, 2))
  } else {
    lastQuestionDate = nextWeekDay(addDays(today, 5))
  }
  if (lastQuestionDate > closingDate) {
    lastQuestionDate = closingDate
  }
  return lastQuestionDate
}
