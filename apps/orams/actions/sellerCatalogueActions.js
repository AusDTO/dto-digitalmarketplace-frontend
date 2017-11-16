/* eslint-disable */
import {
  SENDING_REQUEST,
  SET_ERROR_MESSAGE,
  SET_REGIONS,
  SET_SERVICES,
  SET_REGION,
  SET_CATEGORY,
  SET_TABLE_DATA,
  SET_REGION_ACCORDION_OPEN,
  SET_CATEGORY_ACCORDION_OPEN,
  SET_TABLE_FOCUS,
  SET_SUPPLIER_DATA,
  SET_SUPPLIER_CODE,
  SET_PROFILE_DATA
} from 'orams/constants/constants'
import { GENERAL_ERROR } from 'orams/constants/messageConstants'
import dmapi from 'orams/services/apiClient'

export const sendingRequest = sending => ({ type: SENDING_REQUEST, sending })

export const setErrorMessage = errorMessage => ({
  type: SET_ERROR_MESSAGE,
  errorMessage
})

export function setRegions(regionsData) {
  return { type: SET_REGIONS, regionsData }
}

export function setServices(servicesData) {
  return { type: SET_SERVICES, servicesData }
}

export function setRegionAccordionOpen(id) {
  return { type: SET_REGION_ACCORDION_OPEN, id }
}

export function setCategoryAccordionOpen(id) {
  return { type: SET_CATEGORY_ACCORDION_OPEN, id }
}

export function setRegionData(region) {
  return { type: SET_REGION, region }
}

export function setCategoryData(category) {
  return { type: SET_CATEGORY, category }
}

export function setTableData(tableData) {
  return { type: SET_TABLE_DATA, tableData }
}

export function setTableFocus(tableFocus) {
  return { type: SET_TABLE_FOCUS, tableFocus }
}

export function setSupplierProfileData(supplierData) {
  return { type: SET_SUPPLIER_DATA, supplierData }
}

export function setSupplierCodeData(supplierCode) {
  return { type: SET_SUPPLIER_CODE, supplierCode }
}

export function setProfileData(profileData) {
  return { type: SET_PROFILE_DATA, profileData }
}

export const loadRegions = () => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({ url: '/regions' }).then(response => {
    if (response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      dispatch(setRegions(response.data))
    }
    dispatch(sendingRequest(false))
  })
}

export const loadServices = () => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({ url: '/services' }).then(response => {
    if (response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      dispatch(setServices(response.data))
    }
    dispatch(sendingRequest(false))
  })
}

export function loadSuppliers() {
  return (dispatch, getState) => {
    const state = getState()
    if (state.sellersCatalogue.region && state.sellersCatalogue.category) {
      dispatch(sendingRequest(true))
      dmapi({
        method: 'get',
        url: `/services/${state.sellersCatalogue.category}/regions/${state.sellersCatalogue.region}/prices`
      }).then(response => {
        if (response.error) {
          dispatch(setErrorMessage(GENERAL_ERROR))
        } else {
          dispatch(setTableData(response.data))
          window.scrollTo(0, 0)
          dispatch(setTableFocus(true))
        }
        dispatch(sendingRequest(false))
      })
    }
  }
}

export function loadSupplierProfile() {
  return (dispatch, getState) => {
    const state = getState()
    dispatch(sendingRequest(true))
    dmapi({
      method: 'get',
      url: `/supplier/${state.sellersCatalogue.supplierCode}`
    }).then(response => {
      if (response.error) {
        dispatch(setErrorMessage(GENERAL_ERROR))
      } else {
        dispatch(setSupplierProfileData(response.data))
        window.scrollTo(0, 0)
      }
      dispatch(sendingRequest(false))
    })
  }
}

export function loadProfile() {
  return (dispatch, getState) => {
    const state = getState()
    dispatch(sendingRequest(true))
    dmapi({
      method: 'get',
      url: `/supplier`
    }).then(response => {
      if (response.error) {
        dispatch(setErrorMessage(GENERAL_ERROR))
      } else {
        dispatch(setProfileData(response.data))
        window.scrollTo(0, 0)
      }
      dispatch(sendingRequest(false))
    })
  }
}
