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

/*
const express = require('express')
const actorsController = require('../Controllers/actorsController')

function routes() {
  const actorRouter = express.Router()
  const controller = actorsController()

  actorRouter.route('/actors').get(controller.get)

  actorRouter.route('/actors/:Id').get(controller.get)

  return actorRouter
}

module.exports = routes
*/

/*
const express = require('express')
const actorsController = require('../Controllers/actorsController')

function routes() {
  const actorRouter = express.Router()
  const controller = actorsController()

  actorRouter.route('./actors').get(controller.get)

  actorRouter.route('/actors/:Id').get(controller.get)

  return actorRouter
}

module.exports = routes
*/
