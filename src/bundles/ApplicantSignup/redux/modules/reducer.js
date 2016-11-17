import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form';

import errorMessage from '../../../../shared/reduxModules/errorMessage';
import form_options from '../../../../shared/reduxModules/form_options';

export default combineReducers({
  form_options,
  errorMessage,
  application: (state = {}) => state,
  options: (state = {}) => state,
  ...createForms({
    // We need to define the schemas of each form
    // Applicant is a flat object, these keys are used
    // for mapping values.
    yourInfoForm: {
      representative: '',
      name: '',
      abn: '',
      phone: '',
      email: '',
    },
    businessDetailsForm: {
      summary: '',
      website: '',
      linkedin: '',
      address: {
        addressLine: '',
        suburb: '',
        state: '',
        postalCode: ''
      }
    },
    domainSelectorForm: {
      domains: []
    },
    pricingForm: {},
    caseStudyForm: {
      title: '',
      client: '',
      timeframe: '',
      opportunity: '',
      approach: '',
      outcome: [],
      projectLinks: []
    },
  })
})
