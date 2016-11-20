import { actions } from 'react-redux-form';
import get from 'lodash/get';

export const getStateForms = (state = {}, regex = /Form$/) => {
  return Object.keys(state)
    .filter(key => key.match(regex))
    .reduce((forms, val) => {
      forms[val] = state[val];
      return forms;
    }, {});
}

export const dispatchFormState = (dispatch, schemas = {}, data) => {
  return Object.keys(schemas)
    .map(form => {
      let fields = schemas[form];
      let mappedFields = Object.keys(fields)
        .filter(key => data[key])
        .reduce((result, key) => {
           result[key] = data[key];
          return result;
        }, {})
    
      dispatch(actions.merge(form, mappedFields))
      // Return what the state shape should look like.
      return { [form]: mappedFields };
    })
}

export const flattenStateForms = (state = {}) => {
  const forms = getStateForms(state);
  return Object.keys(forms)
    .reduce((flat, key) => {
      return Object.assign({}, flat, forms[key])
    }, {});
}

export const validForms = (state = {}) => {
  const forms = state.forms || {}
  return Object.keys(forms)
    .filter(key => get(forms[key], '$form.valid'))
    .reduce((valid, key) => {
      valid[key] = true;
      return valid;
    }, {});
}