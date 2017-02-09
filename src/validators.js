import isEmpty from 'lodash/isEmpty'

export const required = (val) => {
  if (typeof val === 'boolean') {
    return val;
  }

  if (Array.isArray(val)) {
    return val.filter(v => v.trim()).length
  }

  return val && val.trim().length;
};

export const minArrayLength = (len) => (arr = []) => {
  return Array.isArray(arr) && arr.filter(v => v.trim()).length >= len;
};

export const min = (len) => (val = '') => {
  return val.length >= len;
};

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

  return val.filter(v => v.match(/^http/)).length === val.length;
};

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

  if (keys.length !== minLength) {
      return false;
  }

  return !keys.filter((key) => isEmpty(object[key])).length;
}

export const limitWords = (limit) => (val = '') => {
  return (val.match(/\S+/g) || []).length <= limit;
}

export default {
  required,
  minArrayLength,
  min,
  validLinks,
  dependantRequired,
  minObjectLength,
  limitWords
}