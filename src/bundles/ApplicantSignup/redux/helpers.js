import { actions } from 'react-redux-form';

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