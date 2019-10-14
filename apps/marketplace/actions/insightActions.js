import dmapi from '../services/apiClient'

export const loadInsights = now => () => dmapi({ url: `/insight`, params: { now } })

export default loadInsights
