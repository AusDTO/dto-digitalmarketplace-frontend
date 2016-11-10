import 'whatwg-fetch';
import merge from 'lodash/merge';

export default function api(route, options) {
  return fetch(route, merge({
    credentials: 'same-origin',
    headers: {
     'Content-Type': 'application/json'
    }
  }, options))
}
