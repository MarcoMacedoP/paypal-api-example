const { server } = require('./config')
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const path = require('path')
//views
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))
app.get('/', (req, res) => {
    res.render('home')
})

app.listen(server.port, () => {
    console.log('Server on port', + server.port)
})