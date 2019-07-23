import io from 'socket.io'

let ioServer

export default {
  init (server) {
    if (!ioServer) {
      ioServer = io(server)

      ioServer.on('connection', socket => {
        socket.on('subscribe', subscriptionId => {
          socket.join(subscriptionId)
        })
      })
    }
  },

  notify (subscriptionId, data) {
    ioServer.to(subscriptionId).emit('web_hook_notification', {id: data, subscriptionId})
  }
}
