import dmapi from '../services/apiClient'

const loadBuyerDashboard = status => () =>
  dmapi({ url: `/buyer/dashboard`, params: { status } }).then(response => response)

export default loadBuyerDashboard
