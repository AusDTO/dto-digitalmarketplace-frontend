import { createSelector } from 'reselect';

const getCaseStudyForm = (state) => state.form.forms.caseStudy
const getErrorMessages = (state) => state.errorMessage
const getModelPath = () => 'form.caseStudy'

export const getInvalidFields = createSelector(
  [ getCaseStudyForm, getErrorMessages, getModelPath ],
  (form, messages, model) => {
    return Object.keys(form)
      .filter(key => !key.match(/^\$/) && !form[key].valid)
      .reverse()
      .map(key => {
        let modelKey = `${model}.${key}`;
        if (modelKey in messages) {

          let result = { id: key, messages: [] };

          for(let errorKey in form[key].errors) {
            if (form[key].errors.hasOwnProperty(errorKey)) {
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