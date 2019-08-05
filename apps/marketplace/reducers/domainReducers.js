import { DOMAIN_LOAD_SUCCESS } from '../constants/constants'

const defaultDomainState = {
  domain: {
    id: 0,
    name: '',
    priceMinimum: 0,
    priceMaximum: 0,
    criteria: [],
    criteriaNeeded: 0
  }
}

const domainReducer = (state = defaultDomainState, action) => {
  switch (action.type) {
    case DOMAIN_LOAD_SUCCESS:
      return {
        ...state,
        domain: action.data
      }

    default:
      return state
  }
}

export default domainReducer
