import {
  SET_REGIONS,
  SET_SERVICES,
  SET_REGION,
  SET_CATEGORY,
  SET_TABLE_DATA,
  SET_REGION_ACCORDION_OPEN,
  SET_CATEGORY_ACCORDION_OPEN
} from 'orams/constants/constants'

const defaultSellersCatalogueState = {
  regionsData: [],
  servicesData: [],
  region: null,
  category: null,
  tableData: [],
  accordionOpen: ''
}

const sellersCatalogueReducer = (state = defaultSellersCatalogueState, action) => {
  switch (action.type) {
    case SET_REGIONS:
      return {
        ...state,
        regionsData: action.regionsData
      }

    case SET_SERVICES:
      return {
        ...state,
        servicesData: action.servicesData
      }

    case SET_REGION:
      return {
        ...state,
        region: action.region
      }

    case SET_CATEGORY:
      return {
        ...state,
        category: action.category
      }

    case SET_TABLE_DATA:
      return {
        ...state,
        tableData: action.tableData
      }

    case SET_REGION_ACCORDION_OPEN:
      return {
        ...state,
        regionAccordionOpen: action.id
      }

    case SET_CATEGORY_ACCORDION_OPEN:
      return {
        ...state,
        categoryAccordionOpen: action.id
      }

    default:
      return state
  }
}

export default sellersCatalogueReducer
