import ioServer from '../../socket'
import { SUBSCRIPTION_CONFIG } from '../../constants'

export const listen = (req, res, next) => {
  // for create subscription
  if (req.query && req.query.validationtoken) {
    return res.status(200).send(req.query.validationtoken)
  }

  // subscription notification
  // validate notification
  if (req.headers.clientstate === SUBSCRIPTION_CONFIG.ClientState) {
    req.body.value.forEach(notification => {
      const { SubscriptionId, ResourceData, ChangeType } = notification
      if (SubscriptionId && ResourceData) {
        ioServer.notify(SubscriptionId, {
          ChangeType,
          Id: ResourceData.Id
        })
      }
    })
  }

  return res.status(202).send(true)
}
