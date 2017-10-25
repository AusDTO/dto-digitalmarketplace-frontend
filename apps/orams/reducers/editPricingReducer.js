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

import { SET_EDIT_SERVICE_DATA, SET_PRICES_DATA, SET_STEP } from 'orams/constants/constants'

// The initial application state
const initialState = {
  editServiceData: '',
  pricesData: ''
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

    default:
      return state
  }
}

export default editPricingReducer
