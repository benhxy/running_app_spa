import fetch from './fetch'

module.exports = {
  /**
   * For logging in, we will request the /api-token-auth/ API with proper
   * authentication information to get the authorization token. Then we store
   * it in the local storage for further authentication.
   */

  login (email, password) {
    return new Promise(
      (resolve, reject) => {
        if (this.loggedIn()) {
          reject(new Error('Already logged in.'))
        } else {
          const fetchUserResolve = response => {
            localStorage.token = response.token
            // Fetch the user ID and store it.
            return this.fetchUserInfo().then(
              response => {
                localStorage.userID = response.id
                resolve(response)
              }).catch(error => {
                reject(error)
              })
          }
          return fetch('/api-token-auth/',
                       {method: 'POST', body: {email: email, password: password}})
            .then(fetchUserResolve).then(response => {
              this.onChange(true)
              resolve(response)
            }).catch(error => {
              this.onChange(false)
              reject(error)
            })
        }
      }
    )
  },

  requestResetPassword (email) {
    return new Promise(
      (resolve, reject) => {
        if (this.loggedIn()) {
          reject(new Error('Already logged in.'))
        } else {
          return fetch('/api/users/request_reset_password/',
                       {method: 'POST', body: {email: email}})
            .then(response => {
              resolve(response)
            }).catch(error => {
              reject(error)
            })
        }
      }
    )
  },

  resetPassword (email, token, newPassword) {
    return new Promise(
      (resolve, reject) => {
        if (this.loggedIn()) {
          reject(new Error('Already logged in.'))
        } else {
          return fetch('/api/users/reset_password/',
                       {method: 'POST', body: {email: email,
                                               token: token,
                                               newPassword: newPassword}})
            .then(response => {
              resolve(response)
            }).catch(error => {
              reject(error)
            })
        }
      }
    )
  },

  signup (email, password, firstName, lastName) {
    return new Promise(
      (resolve, reject) => {
        if (this.loggedIn()) {
          reject(new Error('Already logged in.'))
        } else {
          return fetch('/api/users/', {
            method: 'POST',
            body: {
              email: email,
              password: password,
              firstName: firstName,
              lastName: lastName
            }})
            .then(_ => {
              return this.login(email, password)
            }).catch(error => {
              reject(error)
            })
        }
      }
    )
  },

  getToken () {
    return localStorage.token
  },

  getUserID () {
    return localStorage.userID
  },

  logout (cb) {
    delete localStorage.token
    delete localStorage.userID
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn () {
    return localStorage.token && localStorage.userID
  },

  onChange () {},

  fetchUserInfo () {
    return new Promise((resolve, reject) => {
      if (!this.getToken()) {
        reject(new Error('Cannot fetch user information when not logged in.'))
      }
      return fetch('/api/users/me/', null, this.getToken())
        .then(resolve).catch(e => {
          this.logout()
          reject(e)
        })
    })
  }
}
