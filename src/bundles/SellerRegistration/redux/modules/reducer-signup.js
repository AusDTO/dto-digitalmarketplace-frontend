import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form';

import steps from './steps';
import application from './application';
import errorMessage from '../../../../shared/reduxModules/errorMessage';
import form_options from '../../../../shared/reduxModules/form_options';
import application_errors from './application_errors';
import agreement from './agreement'

export default combineReducers({
  form_options,
  errorMessage,
  steps,
  agreement,
  application,
  application_errors,
  confirmDiscard: false,
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
      government_experience: {},
      travel: ''
    },
    businessDetailsForm: {
      name: '',
      abn: '',
      summary: '',
      website: '',
      linkedin: '',
      addresses: {
        '0': {
          address_line: '',
          suburb: '',
          state: '',
          postal_code: ''
        }
      }
    },
    domains: {
      pricing: {maximum: {}}
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
    pricingForm: {
      pricing: {}
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
    },
    productsForm: {
      products: {}
    },
    submitStepForm: {
      agreed_to_master_agreement: null
    },
    recruiterForm: {
      recruiter: '',
      labourHire: {qld: {expiry: '', licenceNumber: ''}, vic: {expiry: '', licenceNumber: ''}, act: {expiry: '', licenceNumber: ''}},
      understandsAssessmentProcess: false
    },
    candidatesForm: {
      recruiter_info: {},
    }
  })
})
