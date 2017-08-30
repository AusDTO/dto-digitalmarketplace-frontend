import { DATA_IS_LOADING } from '../constants/constants'

export function handleDataLoading(bool) {
  return {
    type: DATA_IS_LOADING,
    isLoading: bool
  }
}
