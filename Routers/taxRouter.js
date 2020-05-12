const express = require('express')
const taxController = require('../Controllers/taxController')

function routes() {
  const taxRouter = express.Router()
  const controller = taxController()

  taxRouter.route('/tax').get(controller.get).post(controller.post)

  taxRouter.route('/tax/:Id').get(controller.get).put(controller.put).delete(controller.remove)

  return taxRouter
}

module.exports = routes
