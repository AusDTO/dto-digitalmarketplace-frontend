import { actions } from 'react-redux-form';
import omitBy from 'lodash/omitBy';

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