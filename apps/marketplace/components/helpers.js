// will add fns to this file over time
/* eslint-disable import/prefer-default-export */
import subDays from 'date-fns/sub_days'
import addDays from 'date-fns/add_days'
import isWeekend from 'date-fns/is_weekend'
import isAfter from 'date-fns/is_after'
import isBefore from 'date-fns/is_before'
import isSameDay from 'date-fns/is_same_day'
import isWithinRange from 'date-fns/is_within_range'
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

export const getBriefLastQuestionDate = (closingDate, today = new Date(), lockoutPeriod = null) => {
  let lastQuestionDate = getPreviousWeekDay(subDays(closingDate, 1))
  if (lockoutPeriod !== null) {
    if (isSameDay(closingDate, addDays(lockoutPeriod.endDate, 1))) {
      return getPreviousWeekDay(lockoutPeriod.startDate)
    }
    if (isWithinRange(closingDate, lockoutPeriod.endDate, addDays(lockoutPeriod.endDate, 3))) {
      return addDays(lockoutPeriod.endDate, 1)
    }
  }

  if (closingDate <= addDays(today, 3)) {
    if (today > lastQuestionDate) {
      lastQuestionDate = today
    }
  } else {
    lastQuestionDate = getPreviousWeekDay(subDays(lastQuestionDate, 1))
  }
  if (lastQuestionDate > closingDate) {
    lastQuestionDate = parse(closingDate)
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

export const getBriefType = lot => {
  if (lot === null) {
    return ''
  }
  const name = mapLot(lot)

  switch (lot) {
    case 'atm':
    case 'digital-outcome':
    case 'rfx':
      return `Professional Services and Consulting (${name})`
    default:
      return name
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

export const getLockoutStatus = (lockoutPeriod, closingDate, newClosingDate = null) => {
  const data = {
    lockoutDatesProvided: false,
    minValidDate: closingDate,
    closingTime: '6pm',
    showLockoutDates: false,
    isAfterLockoutStarts: false,
    isAfterLockoutEnds: false,
    lastQuestions: {
      date: null,
      afterLockout: false,
      closingTime: '6pm'
    },
    hardLockout: {
      startDate: null,
      endDate: null
    }
  }
  if (lockoutPeriod.startDate && lockoutPeriod.endDate) {
    data.lockoutDatesProvided = true
    data.hardLockout.startDate = addDays(lockoutPeriod.startDate, 1)
    data.hardLockout.endDate = addDays(lockoutPeriod.endDate, 0)
  } else {
    return data
  }
  if (isAfter(new Date(newClosingDate || closingDate), lockoutPeriod.startDate)) {
    data.closingTime = '11:55pm'
    data.isAfterLockoutStarts = true
  }
  if (isAfter(new Date(closingDate), lockoutPeriod.endDate)) {
    data.isAfterLockoutEnds = true
  }
  if (isSameDay(closingDate, lockoutPeriod.startDate) || isSameDay(addDays(closingDate, 1), lockoutPeriod.startDate)) {
    data.minValidDate = lockoutPeriod.endDate
    data.isAfterLockoutEnds = false
  } else if (isAfter(closingDate, lockoutPeriod.startDate) && isBefore(closingDate, lockoutPeriod.endDate)) {
    data.minValidDate = lockoutPeriod.endDate
    data.showLockoutDates = true
    data.isAfterLockoutEnds = false
  } else if (isBefore(closingDate, lockoutPeriod.startDate)) {
    data.showLockoutDates = true
    data.isAfterLockoutEnds = false
  }
  data.lastQuestions.date = getBriefLastQuestionDate(closingDate, new Date(), lockoutPeriod)
  data.lastQuestions.afterLockout =
    data.lastQuestions.date !== null
      ? isAfter(data.lastQuestions.date, lockoutPeriod.endDate) ||
        isSameDay(data.lastQuestions.date, lockoutPeriod.endDate)
      : false
  data.lastQuestions.closingTime = isBefore(data.lastQuestions.date, lockoutPeriod.startDate) ? '6pm' : '11:55pm'
  return data
}
