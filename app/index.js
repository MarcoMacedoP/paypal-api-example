const { server } = require('./config')
const express = require('express')
const app = express()
const paypalApi = require('./api/paypal')
const cors = require('cors')
const bodyParser = require('body-parser')
//middlewares
app.use(cors())
app.use(bodyParser.json())
app.use('/api/paypal', paypalApi)

app.listen(server.port, () => {
    console.log('Server on port', + server.port)
})