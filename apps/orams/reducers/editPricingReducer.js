/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the homeReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 */

import {
  SET_EDIT_SERVICE_DATA,
  SET_PRICES_DATA,
  SET_STEP,
  SET_PRICE_TO_EDIT_DATA,
  SET_SERVICE_TO_EDIT_IN_STATE,
  SET_PRICE_TO_EDIT_ID,
  SET_ONE_PRICE,
  SET_BUTTON_CLICK,
  SET_SUPPLIER,
  SET_SUCCESS_MESSAGE,
  RESTART_EDIT_PRICING,
  HIDE_NAV
} from 'orams/constants/constants'

// The initial application state
const initialState = {
  editServiceData: '',
  pricesData: '',
  step: 1,
  priceData: '',
  serviceToEdit: '',
  priceId: '',
  pricesArray: [],
  saveAnother: false,
  successMessage: false,
  hideNav: false
}

const updateOrReplace = (array, obj) => {
  if (array.find(item => item.id === obj.id)) {
    return array.map(item => (item.id === obj.id ? { ...item, ...obj } : item))
  }

  return [...array, obj]
}

const editPricingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EDIT_SERVICE_DATA:
      return {
        ...state,
        editServiceData: action.editServiceData
      }

    case SET_PRICES_DATA:
      return {
        ...state,
        pricesData: action.pricesData
      }

    case SET_STEP:
      return {
        ...state,
        step: action.step
      }

    case SET_PRICE_TO_EDIT_DATA:
      return {
        ...state,
        priceData: action.priceData
      }

    case SET_SERVICE_TO_EDIT_IN_STATE:
      return {
        ...state,
        serviceToEdit: action.serviceToEdit
      }

    case SET_PRICE_TO_EDIT_ID:
      return {
        ...state,
        priceId: action.priceId
      }

    case SET_ONE_PRICE:
      return {
        ...state,
        pricesArray: updateOrReplace(state.pricesArray, action.priceObj)
      }

    case SET_BUTTON_CLICK:
      return {
        ...state,
        buttonClickValue: action.value
      }

    case SET_SUPPLIER:
      return {
        ...state,
        supplier: action.supplier
      }

    case SET_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: action.successMessage
      }

    case RESTART_EDIT_PRICING:
      return {
        ...state,
        pricesArray: []
      }

    case HIDE_NAV:
      return {
        ...state,
        hideNav: action.hideNav
      }

    default:
      return state
  }
}

export default editPricingReducer
