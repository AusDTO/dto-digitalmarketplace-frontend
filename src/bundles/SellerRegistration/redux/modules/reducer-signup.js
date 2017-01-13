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
      phone: '',
      email: '',
      contact_name: '',
      contact_phone: '',
      contact_email: ''
    },
    businessInfoForm: {
      seller_type: {},
      number_of_employees: '',
      other_panels: '',
      government_experience: {}
    },
    businessDetailsForm: {
      name: '',
      abn: '',
      summary: '',
      website: '',
      linkedin: '',
      address: {
        address_line: '',
        suburb: '',
        state: '',
        postal_code: ''
      },
      travel: ''
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
    },
    toolsForm: {
      tools: '',
      methodologies: '',
      technologies: ''
    },
    awardsForm: {
        awards: [],
        certifications: [],
        boards: []
    },
    disclosuresForm: {
        disclosures: {
          structual_changes: null,
          structual_changes_details: '',
          investigations: null,
          investigations_details: '',
          legal_proceedings: null,
          legal_proceedings_details: '',
          insurance_claims: null,
          insurance_claims_details: '',
          conflicts_of_interest: null,
          conflicts_of_interest_details: '',
          other_circumstances: null,
          other_circumstances_details: ''
        }
    }
  })
})
