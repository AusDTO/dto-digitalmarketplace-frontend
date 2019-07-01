// will add fns to this file over time
/* eslint-disable import/prefer-default-export */
import subDays from 'date-fns/sub_days'
import addDays from 'date-fns/add_days'
import isWeekend from 'date-fns/is_weekend'
import { parse } from 'qs'

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
  if (lot === 'digital-professionals' || lot === 'training' || lot === 'specialist') {
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

const getPreviousWeekDay = date => {
  let newDate = date
  while (isWeekend(newDate)) {
    newDate = subDays(newDate, 1)
  }
  return newDate
}

export const getBriefLastQuestionDate = (closingDate, today = new Date()) => {
  let lastQuestionDate = getPreviousWeekDay(subDays(closingDate, 1))
  if (closingDate <= addDays(today, 3)) {
    if (today > lastQuestionDate) {
      lastQuestionDate = today
    }
  } else {
    lastQuestionDate = getPreviousWeekDay(subDays(lastQuestionDate, 1))
  }
  if (lastQuestionDate > closingDate) {
    lastQuestionDate = closingDate
  }
  return lastQuestionDate
}

export const getTokenFromURL = (url, location) => location.pathname.substring(url.length + 1, location.pathname.length)

export const getEmailFromQueryString = location => {
  const parsed = parse(location.search.substr(1))
  let emailAddress = ''
  if (parsed.e) {
    emailAddress = parsed.e
  }
  return emailAddress
}

export const sortObjectByName = objectToSort =>
  Object.keys(objectToSort).sort((a, b) => (objectToSort[a].name > objectToSort[b].name ? 1 : -1))

export const padStart = (value, length, character) => {
  if (!value || value.length === length) {
    return value
  }
  let pad = ''
  for (let i = 0; i < length - value.length; i += 1) {
    pad = `${character}${pad}`
  }
  return `${pad}${value}`
}

export const escapeQuote = value => value.replace(/'/g, "\\'")
