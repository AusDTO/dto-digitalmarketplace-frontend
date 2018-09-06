import dmapi from '../services/apiClient'

const findSuppliers = keyword => {
  const params = {
    keyword
  }
  return dmapi({ url: `/suppliers/search`, params }).then(response => {
    if (!response || response.error) {
      throw response.errorMessage
    } else {
      return response.data
    }
  })
}

export default findSuppliers
