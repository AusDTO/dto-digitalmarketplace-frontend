/* eslint-disable camelcase */
import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form'
import appReducer from './appReducer'
import brief from './briefReducers'
import user from './memberInfoReducers'
import dashboard from './dashboardReducers'
import opportunities from './opportunitiesReducers'
import errorMessage from './errorMessage'
import form_options from './form_options'

export default combineReducers({
  app: appReducer,
  user,
  brief,
  dashboard,
  opportunities,
  form_options,
  errorMessage,
  ...createForms({
    signupForm: {
      name: '',
      email_address: ''
    },
    createUserForm: {
      name: '',
      password: ''
    },
    briefResponseForm: {
      availability: '',
      dayRate: '',
      respondToEmailAddress: '',
      respondToPhone: '',
      attachedDocumentURL: []
    },
    resetPasswordEmailForm: {
      email_address: ''
    },
    resetPasswordForm: {
      password: '',
      confirmPassword: ''
    },
    loginForm: {
      emailAddress: '',
      password: ''
    },
    briefInviteAssessorsForm: {
      email_address: ''
    },
    opportunitiesFilterForm: {
      status: {
        live: false,
        closed: false
      },
      openTo: {
        all: false
      },
      type: {
        outcomes: false,
        specialists: false,
        innovation: false,
        training: false
      },
      location: {
        ACT: false,
        NSW: false,
        NT: false,
        QLD: false,
        SA: false,
        TAS: false,
        VIC: false,
        WA: false,
        Remote: false
      }
    }
  })
})
