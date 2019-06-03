import {
  // SELLER_DASHBOARD_MESSAGES_LOAD,
  SELLER_EDIT_SUCCESS,
  SELLER_EDIT_LOAD
  // SELLER_DASHBOARD_TEAM_LOAD,
  // SELLER_DASHBOARD_SERVICES_LOAD,
  // SELLER_DASHBOARD_REMOVE_USER_SUCCESS
} from '../constants/constants'
import { GENERAL_ERROR } from '../constants/messageConstants'
import dmapi from '../services/apiClient'
import { sendingRequest, setErrorMessage } from './appActions'

export const loadSeller = data => ({
  type: SELLER_EDIT_SUCCESS,
  data: {
    supplier: data.supplier,
    signedCurrentAgreement: data.signedCurrentAgreement,
    errors: data.errors,
    loading: data.loading,
    loadedAt: new Date()
  }
})

// export const removeUserSuccess = response => ({
//   type: SELLER_DASHBOARD_REMOVE_USER_SUCCESS,
//   data: response.data
// })

const load = (type, data) => ({
  type,
  data: {
    supplier: data.supplier,
    signedCurrentAgreement: data.signedCurrentAgreement,
    errors: data.errors,
    loading: data.loading,
    loadedAt: new Date()
  }
})

export const loadSellerEdit = supplierCode => dispatch => {
  dispatch(sendingRequest(true))
  dispatch(
    loadSeller({
      loading: true
    })
  )
  return dmapi({ url: `/supplier/${supplierCode}/edit` }).then(response => {
    if (!response || response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
      dispatch(
        loadSeller({
          loading: false,
          errors: true
        })
      )
    } else {
      dispatch(
        loadSeller({
          supplier: response.data.supplier,
          signedCurrentAgreement: response.data.signed_current_agreement
        })
      )

      // dispatch(
      //   load(SELLER_DASHBOARD_MESSAGES_LOAD, {
      //     items: response.data.messages.items
      //   })
      // )
    }
    dispatch(sendingRequest(false))
    return response
  })
}

export const saveSeller = (supplierCode, data) => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  
  return dmapi({
    url: `/supplier/${supplierCode}/edit`,
    method: 'PATCH',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  }).then(response => {
    if (response.error) {
      //dispatch(handleErrorFailure(response))
    } else {
      //dispatch(handleBriefSaveSuccess(response))
    }
    dispatch(sendingRequest(false))
    return response
  })
}

// export const loadMessages = () => dispatch => {
//   dispatch(sendingRequest(true))
//   dispatch(
//     load(SELLER_DASHBOARD_MESSAGES_LOAD, {
//       loading: true
//     })
//   )
//   dmapi({ url: `/supplier/dashboard/messages` }).then(response => {
//     if (!response || response.error) {
//       dispatch(setErrorMessage(GENERAL_ERROR))
//       dispatch(
//         load(SELLER_DASHBOARD_MESSAGES_LOAD, {
//           errors: true
//         })
//       )
//     } else {
//       dispatch(
//         load(SELLER_DASHBOARD_MESSAGES_LOAD, {
//           items: response.data.messages.items
//         })
//       )
//     }
//     dispatch(sendingRequest(false))
//   })
// }

// export const loadTeam = () => dispatch => {
//   dispatch(sendingRequest(true))
//   dispatch(
//     load(SELLER_DASHBOARD_TEAM_LOAD, {
//       loading: true
//     })
//   )
//   dmapi({ url: `/supplier/dashboard/team` }).then(response => {
//     if (!response || response.error) {
//       dispatch(setErrorMessage(GENERAL_ERROR))
//       dispatch(
//         load(SELLER_DASHBOARD_TEAM_LOAD, {
//           errors: true
//         })
//       )
//     } else {
//       dispatch(
//         load(SELLER_DASHBOARD_TEAM_LOAD, {
//           items: response.data.teams.items
//         })
//       )
//     }
//     dispatch(sendingRequest(false))
//   })
// }

// export const loadServices = () => dispatch => {
//   dispatch(sendingRequest(true))
//   dispatch(
//     load(SELLER_DASHBOARD_SERVICES_LOAD, {
//       loading: true
//     })
//   )
//   dmapi({ url: `/supplier/dashboard/services` }).then(response => {
//     if (!response || response.error) {
//       dispatch(setErrorMessage(GENERAL_ERROR))
//       dispatch(
//         load(SELLER_DASHBOARD_SERVICES_LOAD, {
//           errors: true
//         })
//       )
//     } else {
//       dispatch(
//         load(SELLER_DASHBOARD_SERVICES_LOAD, {
//           items: response.data.services.items
//         })
//       )
//     }
//     dispatch(sendingRequest(false))
//   })
// }

// export const removeUser = userId => (dispatch, getState) => {
//   dispatch(sendingRequest(true))
//   dmapi({
//     method: 'put',
//     url: `/supplier/dashboard/user/${userId}/deactivate`,
//     headers: {
//       'X-CSRFToken': getState().app.csrfToken,
//       'Content-Type': 'application/json'
//     }
//   }).then(response => {
//     if (!response || response.error) {
//       dispatch(setErrorMessage(GENERAL_ERROR))
//     } else {
//       dispatch(removeUserSuccess(response))
//       dispatch(loadTeam())
//     }
//     dispatch(sendingRequest(false))
//   })
// }
