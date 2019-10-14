import dmapi from '../services/apiClient'

export const loadInsights = id => () => dmapi({ url: id ? `/insight/${id}` : '/insight' })

export default loadInsights
