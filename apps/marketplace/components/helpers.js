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

export const categoryIdToHash = domainId => {
  let result = ''
  switch (domainId) {
    case 1:
      result = 'strategy'
      break
    case 3:
      result = 'userresearch'
      break
    case 4:
      result = 'deliverygov'
      break
    case 6:
      result = 'engineering'
      break
    case 7:
      result = 'contentpub'
      break
    case 8:
      result = 'cyber'
      break
    case 9:
      result = 'marketingcomms'
      break
    case 10:
      result = 'ops'
      break
    case 11:
      result = 'datasci'
      break
    case 13:
      result = 'emergtech'
      break
    case 14:
      result = 'changeTrans'
      break
    case 15:
      result = 'tld'
      break
    case 17:
      result = 'ictaudit'
      break
    case 18:
      result = 'ictintegration'
      break
    case 19:
      result = 'ictprocurement'
      break
    default:
      break
  }
  return `#${result}`
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
  objectToSort && Object.keys(objectToSort).sort((a, b) => objectToSort[a].name.localeCompare(objectToSort[b].name))

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

export const hasPermission = (isPartOfTeam = false, isTeamLead = true, teams = [], permission) => {
  if (!isPartOfTeam) {
    return true
  }
  if (isPartOfTeam && isTeamLead) {
    return true
  }
  if (isPartOfTeam && (!teams || teams.length === 0)) {
    return false
  }
  return teams.every(t => t.permissions.includes(permission))
}

export const mapLot = lot => {
  switch (lot) {
    case 'atm':
    case 'digital-outcome':
      return 'Ask the market'
    case 'rfx':
      return 'Seek proposals and quotes'
    case 'digital-professionals':
    case 'specialist':
      return 'ICT Labour Hire'
    case 'training':
    case 'training2':
      return 'Training'
    default:
      return lot
  }
}

export const getClosingTime = brief => {
  if (brief.dates.closing_time) {
    return brief.dates.closing_time
  } else if (brief.closedAt) {
    return brief.closedAt
  }
  return ''
}

export const getSingleInvitedSellerName = brief => {
  if (brief.sellers) {
    if (Object.keys(brief.sellers).length === 1) {
      return Object.values(brief.sellers).pop().name
    }
  }

  return null
}

export const getBriefCategory = (domains, briefCategory) => {
  const category = domains.find(domain => domain.id === briefCategory)
  return category ? category.name : null
}
