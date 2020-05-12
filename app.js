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

const categoryRouter = require('./Routers/categoryRouter')()
app.use('/api', categoryRouter)

const countryRouter = require('./Routers/countryRouter')()
app.use('/api', countryRouter)

const customerRouter = require('./Routers/customerRouter')()
app.use('/api', customerRouter)

const favoriteRouter = require('./Routers/favoriteRouter')()
app.use('/api', favoriteRouter)

const orderRowRouter = require('./Routers/orderRowRouter')()
app.use('/api', orderRowRouter)

const orderRouter = require('./Routers/orderRouter')()
app.use('/api', orderRouter)

const orderStatusRouter = require('./Routers/orderStatusRouter')()
app.use('/api', orderStatusRouter)

const paymentMethodRouter = require('./Routers/paymentMethodRouter')()
app.use('/api', paymentMethodRouter)

const productCategoryRouter = require('./Routers/productCategoryRouter')()
app.use('/api', productCategoryRouter)

const productRouter = require('./Routers/productRouter')()
app.use('/api', productRouter)

const productImageRouter = require('./Routers/productImageRouter')()
app.use('/api', productImageRouter)

const promoCodeRouter = require('./Routers/promoCodeRouter')()
app.use('/api', promoCodeRouter)

const promoTypeRouter = require('./Routers/promoTypeRouter')()
app.use('/api', promoTypeRouter)

const reviewRouter = require('./Routers/reviewRouter')()
app.use('/api', reviewRouter)

const shippingMethodRouter = require('./Routers/shippingMethodRouter')()
app.use('/api', shippingMethodRouter)

const taxRouter = require('./Routers/taxRouter')()
app.use('/api', taxRouter)

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
