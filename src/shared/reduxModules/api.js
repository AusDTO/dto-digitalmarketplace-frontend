import 'whatwg-fetch'
export default function api(opts, route, options) {
  return fetch(route, Object.assign({
     headers: {
       'Content-Type': 'application/json'
     }
   }, options))
}
