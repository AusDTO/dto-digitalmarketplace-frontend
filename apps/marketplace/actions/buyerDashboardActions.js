import dmapi from '../services/apiClient'

const loadBuyerDashboard = status => () =>
  dmapi({ url: `/buyer/dashboard`, params: { status } })

export default loadBuyerDashboard
