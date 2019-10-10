import dmapi from '../services/apiClient'

export const loadInsights = () => () => dmapi({ url: `/insights` })

export default loadInsights
