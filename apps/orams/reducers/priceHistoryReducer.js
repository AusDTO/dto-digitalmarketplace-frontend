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
  BUYER_SUPPLIERS,
  SET_STEP,
  SET_SERVICE_DATA,
  SET_SUPPLIER_CODE,
  SET_PRICE_HISTORY_DATA
} from 'orams/constants/constants'

// The initial application state
const initialState = {
  buyerSuppliers: '',
  step: 1,
  serviceData: '',
  supplierCode: '',
  priceHistoryData: ''
}

const priceHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUYER_SUPPLIERS:
      return {
        ...state,
        buyerSuppliers: action.buyerSuppliers
      }

    case SET_STEP:
      return {
        ...state,
        step: action.step
      }

    case SET_SERVICE_DATA:
      return {
        ...state,
        serviceData: action.serviceData
      }

    case SET_SUPPLIER_CODE:
      return {
        ...state,
        supplierCode: action.supplierCode
      }

    case SET_PRICE_HISTORY_DATA:
      return {
        ...state,
        priceHistoryData: action.priceHistoryData
      }

    default:
      return state
  }
}

export default priceHistoryReducer
