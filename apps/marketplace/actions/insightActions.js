import dmapi from '../services/apiClient'

export const loadInsights = monthEnding => () => dmapi({ url: `/insight`, params: { monthEnding } })

export default loadInsights
