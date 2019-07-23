import {} from 'dotenv/config'
import path from 'path'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import ioServer from './socket'
import apiRoutes from './routes/api.route'
import webHookRoutes from './routes/web-hook.route'

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use('/api', apiRoutes)
app.use('/web-hook', webHookRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use('/static', express.static(path.resolve(__dirname, '..', 'static')))

  app.get('*', function (req, res) {
    res.status(200).sendFile(path.resolve(__dirname, '..', 'index.html'))
  })
}

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

ioServer.init(server)
