const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.options('*', cors())

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const addressRouter = require('./Routers/addressRouter')()
app.use('/api', addressRouter)

const brandRouter = require('./Routers/brandRouter')()
app.use('/api', brandRouter)

const cartProductRouter = require('./Routers/cartProductRouter')()
app.use('/api', cartProductRouter)

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`)
})

module.exports = app

/*
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.options('*', cors())

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const actorRouter = require('./Routers/actorRouter')()
app.use('/api', actorRouter)

app.server = app.listen(port, () => {
  console.log(`running on port ${port}`)
})
module.exports = app
*/
