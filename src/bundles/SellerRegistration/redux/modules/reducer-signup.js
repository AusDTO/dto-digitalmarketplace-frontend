import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form';

import steps from './steps';
import application from './application';
import errorMessage from '../../../../shared/reduxModules/errorMessage';
import form_options from '../../../../shared/reduxModules/form_options';

export default combineReducers({
  form_options,
  errorMessage,
  steps,
  application,
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
      services: {}
    },
    pricingForm: {
      pricing: {}
    },
    caseStudyForm: {
      casestudies: {}
    },
    casestudy: {
      title: '',
      client: '',
      timeframe: '',
      opportunity: '',
      approach: '',
      outcome: [],
      projectLinks: [],
      service: '',
      roles: ''
    },
    documentsForm: {
      documents: {}
    }
  })
})
