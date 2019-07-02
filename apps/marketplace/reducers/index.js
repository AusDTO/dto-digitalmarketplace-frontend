/* eslint-disable camelcase */
import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form'
import appReducer from './appReducer'
import brief from './briefReducers'
import user from './memberInfoReducers'
import dashboard from './dashboardReducers'
import sellerDashboard from './sellerDashboardReducers'
import opportunities from './opportunitiesReducers'
import errorMessage from './errorMessage'
import form_options from './form_options'
import messages from './messagesReducers'
import teamsDashboard from './teamsDashboardReducers'

export const BuyerRFXFormReducer = {
  id: 0,
  title: '',
  organisation: '',
  location: [],
  summary: '',
  industryBriefing: '',
  sellerCategory: '',
  sellers: {},
  attachments: [],
  requirementsDocument: [],
  responseTemplate: [],
  evaluationType: [],
  proposalType: [],
  evaluationCriteria: [{ criteria: '', weighting: '' }],
  includeWeightings: true,
  closedAt: '',
  contactNumber: '',
  startDate: '',
  contractLength: '',
  contractExtensions: '',
  budgetRange: '',
  workingArrangements: '',
  securityClearance: ''
}

export const BuyerATMFormReducer = {
  id: 0,
  title: '',
  organisation: '',
  location: [],
  summary: '',
  industryBriefing: '',
  sellerCategory: '',
  attachments: [],
  requestMoreInfo: '',
  evaluationType: [],
  evaluationCriteria: [{ criteria: '', weighting: '' }],
  includeWeightings: false,
  closedAt: '',
  startDate: '',
  openTo: '',
  workAlreadyDone: '',
  endUsers: '',
  backgroundInformation: '',
  outcome: '',
  timeframeConstraints: '',
  contactNumber: ''
}

export default combineReducers({
  app: appReducer,
  user,
  brief,
  dashboard,
  sellerDashboard,
  opportunities,
  messages,
  form_options,
  errorMessage,
  teamsDashboard,
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
      email_address: '',
      password: '',
      confirmPassword: ''
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
        atm: false,
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
    },
    BuyerRFXForm: BuyerRFXFormReducer,
    BuyerATMForm: BuyerATMFormReducer
  })
})
