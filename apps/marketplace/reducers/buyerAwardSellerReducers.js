import { SUPPLIERS_RESPONDED_LOAD_SUCCESS, BRIEF_AWARDED_SUCCESS } from '../constants/constants'

const defaultUserState = {
  buyerAwardSellerReducers: []
}

const buyerAwardSellerReducers = (state = defaultUserState, action) => {
  switch (action.type) {
    case SUPPLIERS_RESPONDED_LOAD_SUCCESS:
      return {
        ...state,
        suppliers: action.suppliers,
        workOrderCreated: action.workOrderCreated
      }
    case BRIEF_AWARDED_SUCCESS:
      return {
        ...state,
        suppliers: [],
        workOrderCreated: true
      }
    default:
      return state
  }
}

export default buyerAwardSellerReducers
