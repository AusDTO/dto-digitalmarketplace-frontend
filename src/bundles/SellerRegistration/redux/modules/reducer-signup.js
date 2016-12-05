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
      contact_name: ''
    },
    businessDetailsForm: {
      summary: '',
      website: '',
      linkedin: '',
      address: {
        address_line: '',
        suburb: '',
        state: '',
        postal_code: ''
      },
      seller_type: {}
    },
    domainSelectorForm: {
      services: {}
    },
    caseStudyForm: {
      case_studies: {}
    },
    casestudy: {
      title: '',
      client: '',
      timeframe: '',
      opportunity: '',
      approach: '',
      outcome: [],
      project_links: [],
      service: '',
      roles: '',
      referee_name: '',
      referee_email: '',
      referee_contact: ''
    },
    documentsForm: {
      documents: {}
    }
  })
})
