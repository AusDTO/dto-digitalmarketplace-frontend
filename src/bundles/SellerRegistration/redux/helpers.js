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

      // Only dispatch if we have values, dont override defaults.
      if (!isEmpty(mappedFields)) {
        dispatch(actions.change(form, mappedFields));
      }

      // Return what the state shape should look like.
      return { [form]: mappedFields };
    })
}

export const pruneModel = (model) => {
  const {
    case_studies,
    services = {},
    pricing,
    products,
    recruiter_info,
    labourHire
  } = model;

  let newModel = model;

  const pruneObject = (obj) => {
    return Object.keys(obj)
      .filter((key) => {
        const service = 'service' in obj[key] ? obj[key].service : key
        return service in newModel.services;
      })
      .reduce((o, key) => {
        o[key] = obj[key];
        return o;
      }, {});
  }

  if (services) {
    newModel = { ...newModel, services: omitBy(services, (service) => !service) }
  }

  if (case_studies) {
    delete newModel['case_studies'];
    newModel = { ...newModel, case_studies: pruneObject(case_studies) }
  }

  if (pricing) {
    delete newModel['pricing'];
    newModel = { ...newModel, pricing: pruneObject(pricing) }
  }

  if (products) {
    newModel = { ...newModel, products: omitBy(products, product => isEmpty(product)) }
  }

  if (recruiter_info) {
    delete newModel['recruiter_info'];
    let recruiter_information = model['recruiter'] === 'no' ? {} : pruneObject(recruiter_info)
    newModel = { ...newModel, recruiter_info: recruiter_information }
  }

  return newModel;
}

export const flattenStateForms = (state = {}) => {
  const forms = getStateForms(state);
  let flatState = Object.keys(forms)
    .reduce((flat, key) => {
      return Object.assign({}, flat, forms[key])
    }, {});

  return pruneModel(flatState);
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

// Not the greatest thing, but since we're not mutating anything
// in the DOM and just managing focus, I think we're okay.
// findDOMNode doesn't break the lines of encapsulation.
export const focusHeading = () => {
  if (typeof document !== 'undefined') {
      const heading = document.querySelector('h1');
      return heading && heading.focus();
  }
}
