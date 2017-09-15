/* eslint-disable camelcase */
import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form';

import appReducer from './appReducer'
import steps from './stepsReducer';
import application from './sellerRegistrationReducer';
import errorMessage from './errorMessageReducer';
import formOptions from './formOptionsReducer';

export default combineReducers({
  app: appReducer,
  formOptions,
  errorMessage,
  steps,
  application,
  options: (state = {}) => state,
  ...createForms({
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
    businessInfoForm: {
      seller_type: {},
      number_of_employees: '',
      other_panels: '',
      government_experience: {},
      travel: ''
    },
    yourInfoForm: {
      representative: '',
      phone: '',
      email: '',
      contact_name: '',
      contact_phone: '',
      contact_email: ''
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
    submitStepForm: {
      agreed_to_master_agreement: null
    }
  })
})