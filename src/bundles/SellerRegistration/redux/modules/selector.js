import { createSelector } from 'reselect';

const getYourInfoForm = (state) => state.form.forms.yourInfo
const getErrorMessages = (state) => state.errorMessage
const getModelPath = () => 'form.yourInfo'

// FIXME this spaghetti could do with a refactor.
export const getInvalidFields = createSelector(
  [ getYourInfoForm, getErrorMessages, getModelPath ],
  (form, messages, model) => {
    return Object.keys(form)
      .filter(key => {
        if (key.match(/^\$/)) {
          return false;
        }

        const field = form[key];

        if ('$form' in field) {
          return !field.$form.valid;
        }

        return !field.valid
      })
      .reverse()
      .map(key => {
        let modelKey = `${model}.${key}`;
        if (modelKey in messages) {

          let field = form[key];
          if ('$form' in field) {
            field = field.$form;
          }

          let result = { id: key, messages: [] };

          let fieldErrors = field.errors;
          for(let errorKey in fieldErrors) {
            if (fieldErrors.hasOwnProperty(errorKey) && fieldErrors[errorKey]) {
              result.messages = result.messages.concat(messages[modelKey][errorKey])  
            }
          }

          return result;
        }

        return {
          id: key,
          messages: []
        }
      })
  }
)