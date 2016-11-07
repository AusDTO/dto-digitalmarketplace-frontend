import { createSelector } from 'reselect';
import get from 'lodash/get';

export const getForms = (state, model) => state.forms;
export const getErrorMessages = (state = {}) => state.errorMessage;
export const getModelPath = (state, model) => model;

export const mapErrorMessages = (forms, messages, model) => {
  if (!forms) {
    return [];
  }

  return Object.keys(messages)
    .filter(key => {
      // If key has '$form' filter it out.
      // TODO this probably needs to be checked as valid.
      if (key.match(/(\$form)/)) {
        return false;
      }

      let field = get(forms, key, {})

      // Array fields have their validity nested
      if ('$form' in field) {
        return !field.$form.valid;
      }

      return !field.valid;
    })
    .map(key => {
      let parts = key.split('.').reverse();

      // If field has nested '$form' use that instead
      // $form contains the correct meta if found.
      let field = get(forms, key, {})
      if ('$form' in field) {
        field = field.$form;
      }

      // Some validation fields have nested 'errors' objects
      // Pick them out as they contain the correct keys.
      let fieldErrors = field.errors || {};
      if ('errors' in fieldErrors) {
        fieldErrors = fieldErrors.errors;
      }

      let result = { id: parts[0] };
      // Map fieldErrors keys (e.g. required) to errorMessages stored in the state
      // e.g.
      // caseStudyForm.title: { required: 'Title is required' }
      // Will result in the array ['Title is required']
      result.messages = Object.keys(fieldErrors).reduce((errors, errorKey) => {
        let messageObject = get(messages, key, {});
        let error = get(messageObject, errorKey)
        return errors.concat(error);
      }, []);

      return result;
    })
    .filter(e => e.messages.length);
}

export const getInvalidFields = createSelector([ getForms, getErrorMessages, getModelPath ], mapErrorMessages)