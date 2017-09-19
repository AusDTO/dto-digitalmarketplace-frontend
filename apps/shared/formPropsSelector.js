import { createSelector } from 'reselect'
import get from 'lodash/get'

export const getCurrentForm = (state = {}, model) => {
  const { forms = {} } = state
  return get(forms, `${model}.$form`, {})
}
export const getFormValues = (state = {}, model) => state[model]
export const getFormOptions = (state = {}) => state.form_options
export const getOptions = (state = {}) => state.options
export const getModel = (state, model) => model

/* eslint-disable camelcase */
const formProps = (form, formValues, form_options, options, model) => ({
  form,
  model,
  [model]: formValues,
  formErrors: form_options ? form_options.errors : {},
  ...form_options,
  ...options
})

const formPropsSelector = createSelector(
  [getCurrentForm, getFormValues, getFormOptions, getOptions, getModel],
  formProps
)

export default formPropsSelector
