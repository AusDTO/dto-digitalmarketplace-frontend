import 'whatwg-fetch'
export default function api(route, options) {
  return fetch(route, Object.assign({
     headers: {
       'Content-Type': 'application/json'
     }
   }, options))
}
