import { BUYER_AWARD_SELLER_SUPPLIERS_RESPONDED_LOAD_SUCCESS } from '../constants/constants'

const defaultUserState = {
  buyerAwardSellerReducers: []
}

const buyerAwardSellerReducers = (state = defaultUserState, action) => {
  switch (action.type) {
    case BUYER_AWARD_SELLER_SUPPLIERS_RESPONDED_LOAD_SUCCESS:
      return {
        ...state,
        suppliers: action.suppliers
      }

    default:
      return state
  }
}

export default buyerAwardSellerReducers
