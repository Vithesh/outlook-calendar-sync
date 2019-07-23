export const OUTLOOK_ENDPOINT = 'https://outlook.office.com/api/v2.0'

export const OAUTH2_URLS = {
  tokenHost: 'https://login.microsoftonline.com',
  authorizePath: 'common/oauth2/v2.0/authorize',
  tokenPath: 'common/oauth2/v2.0/token'
}

export const SUBSCRIPTION_CONFIG = {
  '@odata.type': '#Microsoft.OutlookServices.PushSubscription',
  ChangeType: 'Created,Deleted,Updated',
  NotificationURL: process.env.NOTIFICATION_URL,
  Resource: `${OUTLOOK_ENDPOINT}/me/events`,
  ClientState: 'NotificationsForEvents'
}

export const APP_CONSTANTS = {
  APP_ID: process.env.APP_ID,
  APP_PASSWORD: process.env.APP_PASSWORD,
  APP_SCOPES: process.env.APP_SCOPES,
  REDIRECT_URI: process.env.REDIRECT_URI
}
