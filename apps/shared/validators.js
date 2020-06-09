/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import isEmpty from 'lodash/isEmpty'
import parse_date from 'date-fns/parse'
import isValid from 'date-fns/is_valid'
import isFuture from 'date-fns/is_future'
import isBefore from 'date-fns/is_before'
import { isValidABN } from 'abnacn-validator'
import values from 'lodash/values'

export const required = val => {
  if (typeof val === 'boolean') {
    return val
  }

  if (Array.isArray(val)) {
    return val.filter(v => v.trim()).length
  }

  if (val !== null && typeof val === 'object') {
    return values(val).filter(v => v).length
  }

  return val && val.trim().length
}

export const validDate = val => {
  if (!val || !isValid(parse_date(val))) {
    return false
  }
  if (isFuture(val)) {
    return true
  }
  return false
}

export const validMonth = val => {
  const month = val ? val.split('-')[1] : ''
  if (month > 12) {
    return false
  }

  return true
}

export const validSequenceOfDates = (start_date, end_date) => {
  if (isBefore(start_date, end_date) === false) {
    return false
  }

  return true
}

export const validDateNotInFuture = val => {
  if (!val || !isValid(parse_date(val))) {
    return false
  }

  return true
}

export const validEmail = val => {
  if (!val) {
    return true
  }
  if (val.includes('@') && val.includes('.') && !val.includes(' ')) {
    return true
  }
  return false
}

export const governmentEmail = val => {
  if (!val) {
    return true
  }
  if (val.includes('gov.au')) {
    return true
  }
  return false
}

export const minArrayLength = len => (arr = []) => Array.isArray(arr) && arr.filter(v => v.trim()).length >= len

export const min = len => (val = '') => val.length >= len

export const validABN = val => {
  if (!val) {
    return false
  }
  return isValidABN(val)
}

export const validLink = val => {
  if (!val) {
    return true
  }
  return val.match(/^http/)
}

export const validLinks = val => {
  if (!val) {
    return true
  }

  if (!Array.isArray(val)) {
    val = [val]
  }

  const isEmptyArray = !val.filter(v => !isEmpty(v)).length
  if (isEmptyArray) {
    return true
  }

  if (typeof val[0] === 'object') {
    val = val.map(v => v.url)
  }

  return val.filter(v => validLink(v)).length === val.length
}

/**
 * This will only begin to validate if the values passed in contain values
 * If one of the values contains content it turn this field into required
 * @param  {Object} values Form values
 * @param  {Array}  keys   Keys of form fields that require content for this to validate
 * @return {Boolean}       Whether the field is required or not.
 */
export const dependantRequired = (vals = {}, keys = []) => val => {
  const dependantFields = keys.filter(key => !isEmpty(vals[key]))

  if (dependantFields.length) {
    if (typeof val === 'boolean') {
      return val
    }
    return !isEmpty(val)
  }

  return true
}

export const minObjectLength = (object = {}, minLength = -1) => {
  const keys = Object.keys(object)

  if (keys.length !== minLength) {
    return false
  }

  return !keys.filter(key => isEmpty(object[key])).length
}

export const limitWords = limit => (val = '') => val === undefined || ((val && val.match(/\S+/g)) || []).length <= limit

export const minimumWords = minimum => (val = '') =>
  val === undefined || ((val && val.match(/\S+/g)) || []).length >= minimum

export const limitNumbers = limit => (val = '') => {
  const length = (val.match(/[0-9]/g) || []).length
  return length === limit && length === val.length
}

export const validPercentage = val => {
  if (!val) {
    return true
  }

  const length = (val.match(/[0-9.% ]/g) || []).length
  return length === val.length
}

export const validPhoneNumber = val => {
  if (!val) {
    return true
  }

  const numberCount = (val.match(/[0-9]/g) || []).length
  const validCharCount = (val.match(/[ 0-9()+]/g) || []).length
  return val.length === validCharCount && numberCount >= 10
}

export const passwordsMatch = vals => vals.password === vals.confirmPassword

export const passwordLength = val => val && val.length >= 10

export const validPrice = val => val.match(/^\d+(?:[.]\d+)*$/g)

export const validPriceRange = max => val =>
  required(val) && validPrice(val) && (parseFloat(val) > 0 && parseFloat(max.replace(/,/g, '')) >= parseFloat(val))

export default {
  required,
  minArrayLength,
  min,
  validABN,
  validLinks,
  validDate,
  validEmail,
  validPhoneNumber,
  validPercentage,
  dependantRequired,
  minObjectLength,
  limitWords,
  minimumWords,
  limitNumbers,
  passwordsMatch,
  passwordLength,
  validPrice,
  validPriceRange
}
