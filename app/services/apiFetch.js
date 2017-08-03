import 'whatwg-fetch'
import merge from 'lodash/merge'

export default function apiFetch(route, options) {
  return fetch(
    route,
    merge(
      {
        credentials: 'same-origin'
      },
      options
    )
  )
}
