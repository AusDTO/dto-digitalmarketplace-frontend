import { createSelector } from 'reselect';

const getCaseStudyForm = (state, model) => state.forms[model]
const getErrorMessages = (state, model) => state.errorMessage
const getModelPath = (state, model) => model

// FIXME this spaghetti could do with a refactor.
export const getInvalidFields = createSelector(
  [ getCaseStudyForm, getErrorMessages, getModelPath ],
  (form, messages, model) => {
    if (!form) {
      return [];
    }

    return Object.keys(form)
      // Filter out valid fields
      .filter(key => {
        // If key starts with '$' aka '$form'
        if (key.match(/^\$/)) {
          return false;
        }

        const field = form[key];

        // Array fields have their validity nested
        if ('$form' in field) {
          return !field.$form.valid;
        }

        // Check to see if single value field is valid
        return !field.valid
      })
      .reverse()
      .map(key => {
        // Grab the keypath of the current field
        // e.g. caseStudyForm.title
        let modelKey = `${model}.${key}`;

        // If there is no message present in state, return default object.
        if (!messages[modelKey]) {
          return { id: key, messages: [] }
        }

        // If field has nested '$form' use that instead
        // $form contains the correct meta if found.
        let field = form[key];
        if ('$form' in field) {
          field = field.$form;
        }

        // Some validation fields have nested 'errors' objects
        // Pick them out as they contain the correct keys.
        let fieldErrors = field.errors;
        if ('errors' in fieldErrors) {
          fieldErrors = fieldErrors.errors;
        }

        let result = { id: key };
        // Map fieldErrors keys (e.g. required) to errorMessages stored in the state
        // e.g.
        // caseStudyForm.title: { required: 'Title is required' }
        // Will result in the array ['Title is required']
        result.messages = Object.keys(fieldErrors).reduce((errors, errorKey) => {
          return errors.concat(messages[modelKey][errorKey]);
        }, []);

        return result;
      }).filter(e => e.messages.length)
  }
)