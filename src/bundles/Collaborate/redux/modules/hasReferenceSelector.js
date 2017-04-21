import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

export const getValues = (values = {}, keys) => values;
export const getKeys = (values, keys = []) => keys;

export const hasReference = (values, keys) => {
  let fieldsWithValue = keys.filter(key => values[key] && !isEmpty(values[key]));
  return !!fieldsWithValue.length;
}

export default createSelector([ getValues, getKeys ], hasReference)