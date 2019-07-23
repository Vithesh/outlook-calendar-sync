import rp from 'request-promise'
import simpleOauth2 from 'simple-oauth2'
import { OUTLOOK_ENDPOINT, OAUTH2_URLS, APP_CONSTANTS, SUBSCRIPTION_CONFIG } from '../../constants'

const oauth2 = simpleOauth2.create({
  client: {
    id: APP_CONSTANTS.APP_ID,
    secret: APP_CONSTANTS.APP_PASSWORD
  },
  auth: OAUTH2_URLS
})

// get login url from outlook
export const getLoginURL = () => {
  return oauth2.authorizationCode.authorizeURL({
    scope: APP_CONSTANTS.APP_SCOPES,
    redirect_uri: APP_CONSTANTS.REDIRECT_URI
  })
}

// get user and access token from authorization code
export const authorize = async authCode => {
  try {
    const result = await oauth2.authorizationCode.getToken({
      code: authCode,
      scope: APP_CONSTANTS.APP_SCOPES,
      redirect_uri: APP_CONSTANTS.REDIRECT_URI
    })

    const token = oauth2.accessToken.create(result)
    return {
      data: {
        access_token: token.token.access_token,
        expires_at: token.token.expires_at.getTime()
      }
    }
  } catch (e) {
    return {
      error: {
        code: e.code,
        message: e.message
      }
    }
  }
}

export const subscribeNotifications = async token => {
  try {
    const response = await rp({
      method: 'POST',
      uri: `${OUTLOOK_ENDPOINT}/me/subscriptions`,
      headers: {
        Authorization: 'Bearer ' + token.access_token
      },
      body: {
        ...SUBSCRIPTION_CONFIG
      },
      json: true
    })
    return { data: response.Id }
  } catch (e) {
    return {
      error: {
        code: e.code,
        message: e.message
      }
    }
  }
}
