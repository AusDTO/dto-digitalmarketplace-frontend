/* eslint-disable camelcase */
import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form'
import appReducer from './appReducer'
import brief from './briefReducers'
import user from './memberInfoReducers'
import domain from './domainReducers'
import evidence from './evidenceReducers'
import dashboard from './dashboardReducers'
import sellerDashboard from './sellerDashboardReducers'
import sellerEdit from './sellerEditReducers'
import opportunities from './opportunitiesReducers'
import errorMessage from './errorMessage'
import form_options from './form_options'
import messages from './messagesReducers'
import team from './teamReducers'
import teamsDashboard from './teamsDashboardReducers'

export const SellerAssessmentFormReducer = {
  id: 0,
  domainId: 0,
  maxDailyRate: 0,
  criteria: [],
  evidence: {}
}

export const SellerAssessmentEvidenceReducer = {
  client: '',
  refereeName: '',
  refereeNumber: '',
  startDate: '',
  endDate: '',
  background: '',
  response: '',
  sameAsFirst: true
}

export const BuyerRFXFormReducer = {
  id: 0,
  title: '',
  organisation: '',
  location: [],
  summary: '',
  industryBriefing: '',
  internalReference: '',
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
  securityClearance: '',
  comprehensiveTerms: false
}

export const BuyerATMFormReducer = {
  id: 0,
  title: '',
  organisation: '',
  location: [],
  summary: '',
  industryBriefing: '',
  internalReference: '',
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

export const BuyerSpecialistFormReducer = {
  id: 0,
  title: '',
  organisation: '',
  summary: '',
  location: [],
  attachments: [],
  contactNumber: '',
  internalReference: '',
  includeWeightingsEssential: false,
  essentialRequirements: [{ criteria: '', weighting: '' }],
  includeWeightingsNiceToHave: false,
  niceToHaveRequirements: [{ criteria: '', weighting: '' }],
  numberOfSuppliers: '3',
  evaluationType: ['Responses to selection criteria', 'Résumés'],
  preferredFormatForRates: 'dailyRate',
  maxRate: '',
  budgetRange: '',
  securityClearance: '',
  securityClearanceObtain: '',
  securityClearanceCurrent: '',
  securityClearanceOther: '',
  sellerCategory: '',
  openTo: '',
  sellers: {},
  startDate: '',
  contractLength: '',
  contractExtensions: '',
  closedAt: '',
  comprehensiveTerms: false
}

export const SellerEditFormReducer = {
  supplier: {
    name: '',
    code: '',
    data: {
      representative: '',
      email: '',
      phone: ''
    }
  },
  agreementStatus: {
    show: false,
    canSign: false,
    canUserSign: false,
    signed: false
  }
}

export default combineReducers({
  app: appReducer,
  user,
  brief,
  dashboard,
  domain,
  evidence,
  sellerDashboard,
  sellerEdit,
  opportunities,
  messages,
  form_options,
  errorMessage,
  teamsDashboard,
  ...createForms({
    askAQuestionForm: {
      question: ''
    },
    publishAQuestionForm: {
      question: '',
      answer: ''
    },
    signupForm: {
      name: '',
      email_address: ''
    },
    createUserForm: {
      name: '',
      password: ''
    },
    briefAwardSeller: {
      awardedSupplierCode: ''
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
    BuyerATMForm: BuyerATMFormReducer,
    SellerAssessmentForm: SellerAssessmentFormReducer,
    BuyerSpecialistForm: BuyerSpecialistFormReducer,
    SellerEditFlowPage: SellerEditFormReducer,
    team
  })
})
