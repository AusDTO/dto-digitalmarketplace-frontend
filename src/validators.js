import isEmpty from 'lodash/isEmpty'
import parse_date from 'date-fns/parse'
import isValid from 'date-fns/is_valid';
import isFuture from 'date-fns/is_future';
import {isValidABN} from 'abnacn-validator';
import values from 'lodash/values';

export const required = (val) => {
  if (typeof val === 'boolean') {
    return val;
  }

  if (Array.isArray(val)) {
    return val.filter(v => v.trim()).length
  }

    if (val !== null && typeof val === 'object') {
        return values(val).filter(function (v) {
            return v
        }).length;
    }

  return val && val.trim().length;
};

export const validDate = (val) => {
    if (!val || !isValid(parse_date(val))) {
        return false;
    }
    if (isFuture(val)) {
        return true;
    } else {
        return false;
    }
}

export const dateInThePast = (val) => {
    if (isFuture(val)) {
      return true;
    } else {
      return false;
    }
}

export const validEmail = (val) => {
    if (!val) {
        return true;
    }
    if (val.includes('@') && val.includes('.') && !val.includes(' ')) {
        return true;
    } else {
        return false;
    }
}

export const governmentEmail = (val) => {
    if (!val) {
        return true;
    }
    if (val.includes('gov.au')) {
        return true;
    } else {
        return false;
    }
}


export const minArrayLength = (len) => (arr = []) => {
  return Array.isArray(arr) && arr.filter(v => v.trim()).length >= len;
};

export const min = (len) => (val = '') => {
  return val.length >= len;
};

export const validABN = (val) => {
    if (!val) {
        return false;
    }
    return isValidABN(val)
}

export const validLink = (val) => {
    if (!val) {
        return true;
    }
    return val.match(/^http/)
}

export const validLinks = (val) => {
    if (!val) {
        return true;
    }

  if (!Array.isArray(val)) {
    val = [val];
  }

  const isEmptyArray = !val.filter(v => !isEmpty(v)).length;
  if (isEmptyArray) {
    return true;
  }

  if (typeof val[0] == 'object') {
      val = val.map(v => v.url);
  }

  return val.filter(v => validLink(v)).length === val.length;
};

export const notPrivateLinkedIn = (val) => {
  if (!val) {
      return true;
  }

  return !val.includes('/company-beta')
}

/**
 * This will only begin to validate if the values passed in contain values
 * If one of the values contains content it turn this field into required
 * @param  {Object} values Form values
 * @param  {Array}  keys   Keys of form fields that require content for this to validate
 * @return {Boolean}       Whether the field is required or not.
 */
export const dependantRequired = (values = {}, keys = []) => (val) => {
  let dependantFields = keys.filter(key => {
    return !isEmpty(values[key])
  });

  if (dependantFields.length) {
    if (typeof val === 'boolean') {
      return val;
    }
    return !isEmpty(val)
  }

  return true;
}

export const minObjectLength = (object = {}, minLength = -1) => {
  let keys = Object.keys(object);

  if (!keys || keys.length !== minLength) {
      return false;
  }

  return !keys.filter((key) => isEmpty(object[key])).length;
}

export const limitWords = (limit) => (val = '') => {
    return (val.match(/\S+/g) || []).length <= limit;
}

export const limitNumbers = (limit) => (val = '') => {
    const length = (val.match(/[0-9]/g) || []).length
    return length === limit && length === val.length;
}

export const validPercentage = (val) => {
    if (!val) {
        return true;
    }

    const length = (val.match(/[0-9.% ]/g) || []).length
    return length === val.length;
}

export const validPhoneNumber = (val) => {
    if (!val) {
        return true;
    }

    const numberCount = (val.match(/[0-9]/g) || []).length
    const validCharCount = (val.match(/[ 0-9()+]/g) || []).length
    return val.length === validCharCount && numberCount >= 10
}

export const notNegativeNumber = (val) => {
  if (val < 0) {
    return false;
  }
  return true;
}

export const onlyNumbers = (val) => {
  const regex = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/;
  if (!val || regex.test(val)) {
    return true;
  }
  return false;
}

export const onlyWholeNumbers = (val) => {
  const regex = /^\d+$/;
  if (!val || regex.test(val)) {
    return true;
  }
  return false;
}

export const validCharacters = val => {
  if (!val || typeof val !== 'string') {
    return true
  }

  // eslint-disable-next-line no-control-regex
  const regex = /[\000\x00\u0000]+/g
  const match = val.match(regex)

  if (match === null) {
    return true
  }

  return match.length === 0
}

export default {
  required,
  minArrayLength,
  min,
  validABN,
  validCharacters,
  validLinks,
  validDate,
  validEmail,
  validPhoneNumber,
  validPercentage,
  dependantRequired,
  minObjectLength,
  limitWords,
  limitNumbers
}
