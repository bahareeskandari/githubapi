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
