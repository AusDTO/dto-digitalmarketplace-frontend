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
    
      dispatch(actions.change(form, mappedFields))

      // Return what the state shape should look like.
      return { [form]: mappedFields };
    })
}

export const pruneModel = (model) => {
  const {
    case_studies,
    services = {}
  } = model;

  let newModel = model;

  if (services) {
    newModel = Object.assign({}, model, {
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

      newModel = Object.assign({}, model, { case_studies: casestudies });
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