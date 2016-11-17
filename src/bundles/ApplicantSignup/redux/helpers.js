import { actions } from 'react-redux-form';
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

export const findValidDomains = (domainList) => {
  return domainList.map(list => {
    return Object.keys(list)
      .reduce((domainObj, domain) => {

        let validServices = Object.keys(list[domain])
          .filter(service => list[domain][service])
          .reduce((serviceObj, service) => {
            serviceObj[service] = true;
            return serviceObj;
          }, {})

        if (!isEmpty(validServices)) {
          domainObj[domain] = validServices;
        }

        return domainObj;
      }, {});

  })
}