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
  SET_CATEGORY_ACCORDION_OPEN
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

export function setTableData(tableData) {
  return { type: SET_TABLE_DATA, tableData }
}

export function setRegionAccordionOpen(id) {
  return { type: SET_REGION_ACCORDION_OPEN, id}
}

export function setCategoryAccordionOpen(id) {
  return { type: SET_CATEGORY_ACCORDION_OPEN, id}
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

export const loadSuppliers = (region, category) => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({
    method: 'post',
    url: '/seller-catalogue',
    data: { regionId: region, serviceTypeId: category }
  }).then(response => {
    if (response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      console.log('RESPONSE', response)
      dispatch(setTableData(response.data))
    }
    dispatch(sendingRequest(false))
  })
}

export function setRegionData(region) {
  return { type: SET_REGION, region }
}

export function setCategoryData(category) {
  return { type: SET_CATEGORY, category }
}
