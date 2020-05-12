const express = require('express')
const countryController = require('../Controllers/countryController')

function routes() {
  const countryRouter = express.Router()
  const controller = countryController()

  countryRouter.route('/country').get(controller.get).post(controller.post)

  countryRouter
    .route('/country/:Id')
    .get(controller.get)
    .put(controller.put)
    .delete(controller.remove)

  return countryRouter
}

module.exports = routes
