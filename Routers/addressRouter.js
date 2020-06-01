const express = require('express')
const addressController = require('../Controllers/addressController')

function routes() {
  const addressRouter = express.Router()
  const controller = addressController()

  addressRouter.route('/address').get(controller.get).post(controller.post)

  addressRouter
    .route('/address/:Id')
    .get(controller.get)
    .put(controller.put)
    .delete(controller.remove)

  return addressRouter
}

module.exports = routes
