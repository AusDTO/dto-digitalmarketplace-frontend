import { actions } from 'react-redux-form';
import omitBy from 'lodash/omitBy';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

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

      // If form has values, it is assumed it's 'completed'.
      if (!isEmpty(mappedFields)) {
        dispatch(actions.setSubmitted(form));
        dispatch(actions.setPristine(form));
      }

      // Return what the state shape should look like.
      return { [form]: mappedFields };
    })
}

export const flattenStateForms = (state = {}) => {
  const forms = getStateForms(state);
  let flatState = Object.keys(forms)
    .reduce((flat, key) => {
      return Object.assign({}, flat, forms[key])
    }, {});

  if (flatState.services) {
    flatState = Object.assign({}, flatState, {
      services: omitBy(flatState.services, (service) => !service)
    });  
  }

  if (flatState.pricing) {
    const { services } = flatState;
    let pricing = Object.keys(flatState.pricing)
      // Ensure service is still selected, otherwise omit.
      .filter(key => services[key])
      .reduce((prices, key) => {
        prices[key] = flatState.pricing[key]
        return prices;
      }, {})

    flatState = Object.assign({}, flatState, { pricing });
  }

  return flatState;
}

export const findValidServices = (services) => {
  return Object.keys(services)
    .filter(service => services[service])
    .reduce((serviceObj, service) => {
      serviceObj[service] = true;
      return serviceObj;
    }, {});
}

export const findDirtyForms = (state = {}) => {
  const forms = state.forms || {}
  return Object.keys(forms)
    .filter(key => !key.match(/\$form/))
    .filter(key => !get(forms[key], '$form.pristine'))
    .reduce((valid, key) => {
      valid[key] = true;
      return valid;
    }, {});
}