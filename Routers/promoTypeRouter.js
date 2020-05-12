const express = require('express')
const promoTypeController = require('../Controllers/promoTypeController')

function routes() {
  const promoTypeRouter = express.Router()
  const controller = promoTypeController()

  promoTypeRouter.route('/promoType').get(controller.get).post(controller.post)

  promoTypeRouter
    .route('/promoType/:Id')
    .get(controller.get)
    .put(controller.put)
    .delete(controller.remove)

  return promoTypeRouter
}

module.exports = routes
