import dmapi from '../services/apiClient'

export const loadInsights = () => () => dmapi({ url: `/insight` })

export default loadInsights
