import 'whatwg-fetch'
export default function api({ auth_token }, route, options) {
  return fetch(route, Object.assign({
     headers: {
       'Authorization': `Bearer ${auth_token}`,
       'Content-Type': 'application/json'
     }
   }, options))
}
