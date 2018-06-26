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
    products
  } = model;
  let newModel = model;

  if (services) {
    newModel = Object.assign({}, newModel, {
      services: omitBy(services, (service) => !service)
    });  
  }

  if (case_studies) {
    const casestudies = Object.keys(case_studies)
      .filter((key) => {
        let study = case_studies[key];
        return study.service in newModel.services;
      })
      .reduce((studies, key) => {
        studies[key] = case_studies[key];
        return studies;
      }, {});
    delete newModel['case_studies'];
    newModel = Object.assign({}, newModel, { case_studies: casestudies });
  }

  if (pricing) {
    const domain_pricing = Object.keys(pricing)
      .filter((key) => {
        return key in newModel.services;
      })
      .reduce((prices, key) => {
        prices[key] = pricing[key];
        return prices;
      }, {});

    delete newModel['pricing'];
    newModel = Object.assign({}, newModel, { pricing: domain_pricing });
  }

  if (products) {
    newModel = Object.assign({}, newModel, {
      products: omitBy(products, product => !product)
    });      
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

export const isDailyRateMissing = (pricing, services) => {
  if (!pricing || !services) {
    return true
  }

  let isMissingRates = true
  const servicesDomains = Object.keys(services)
  const pricingDomains = Object.keys(pricing)

  if (servicesDomains.length > 0 && servicesDomains.length === pricingDomains.length) {
    const filtered = servicesDomains.filter(d => {
      return (pricingDomains.includes(d) && 'maxPrice' in pricing[d] && parseInt(pricing[d]['maxPrice']) > 0)
    })
    if (filtered.length === servicesDomains.length) {
      isMissingRates = false
    }
  }

  return isMissingRates
}
