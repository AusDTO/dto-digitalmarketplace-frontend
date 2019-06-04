import { SELLER_EDIT_SUCCESS } from '../constants/constants'

const defaultUserState = {
  supplier: {
    supplier: null,
    signedCurrentAgreement: null,
    agreementStatus: null,
    loading: false,
    errors: false,
    loadedAt: null
  }
}

const sellerEditReducer = (state = defaultUserState, action) => {
  switch (action.type) {
    case SELLER_EDIT_SUCCESS:
      return {
        ...state,
        supplier: action.data.supplier
      }

    default:
      return state
  }
}

export default sellerEditReducer
