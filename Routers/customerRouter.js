const express = require('express')
const customerController = require('../Controllers/customerController')

function routes() {
  const customerRouter = express.Router()
  const controller = customerController()

  customerRouter.route('/customer').get(controller.get).post(controller.post)

  customerRouter
    .route('/customer/:Id')
    .get(controller.get)
    .put(controller.put)
    .delete(controller.remove)

  return customerRouter
}

module.exports = routes
