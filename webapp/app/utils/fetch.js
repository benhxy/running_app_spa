import 'whatwg-fetch'

import {flattenError} from './error'

let whatwg_fetch = fetch

/**
 * The 'Authorization' header is for authentication, which starts with
 * the literal 'Token', followed by a white space, then the authorization
 * token.
 */
export default fetch = (url, init, token='') => {
  url = url.replace(/\/$/, '')
  init = init || {}
  let method = init.method || 'GET'
  token = token || ''
  let tokenHeader = token ? 'Token ' + token : ''
  let headers = init.headers || {}
  return whatwg_fetch(url, {
    method: method,
    body: ('GET' === method || 'HEAD' === method) ? null : JSON.stringify(init.body || {})
  }).then(response => {
    if (response.status >= 500) {
      var error = new Error(response.statusText)
      error.response = response
      console.log(error)
      throw error
    }
    if (response.status >= 400) {
      return response.json().then(json => {
        throw new Error(flattenError(json)[0])
      })
    }
    return response.json()
  })
}
