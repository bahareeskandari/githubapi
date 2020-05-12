const db = require('../db')

addresssController = () => {
  get = async (req, res) => {
    try {
      const records = await db.get(req, res, 'address')

      if (records.length == 0) {
        res.status(404)
        return res.send('Could not find the resource.')
      }

      return res.json(records)
    } catch (err) {
      return res.status(404)
    }
  }

  post = async (req, res) => {
    try {
      return await db.modify(
        req,
        res,
        'Addaddress',
        'Address1',
        'Address2',
        'City',
        'Zip',
        'CountryId',
        'Company'
      )
    } catch (err) {
      res.status(500)
      console.log(err)
      return res.send('Unable to create.')
    }
  }

  put = async (req, res) => {
    try {
      return await db.modify(req, res, 'Updateaddress', 'Address1', 'City', 'Zip', 'CountryId')
    } catch (err) {
      res.status(500)
      return res.send('Unable to update.')
    }
  }

  remove = async (req, res) => {
    try {
      await db.modify(req, res, 'Deleteaddress')
    } catch (err) {
      console.log(err)
      res.status(500)
      return res.send('Unable to Delete.')
    }
  }

  return {get, post, put, remove}
}

module.exports = addresssController

/*
const sql = require('mssql')
const config = require('../config')



actorsController = () => {
  get = async (req, res) => {
    try {
      let query = req.params.Id > 0 ? `EXEC GetActor ${req.params.Id}` : 'EXEC GetActors'

      await sql.connect(config)
      const result = await sql.query(query)

      const records = result.recordset.map((record) => {
        record.links = {}
        record.links.self = `http://${req.headers.host}/api/actors/${record.Id}`
        return record
      })

      if (records.length == 0) {
        res.status(404)
        return res.send('Could not find the resource.')
      }

      return res.json(records)
    } catch (err) {
      return res.status(404)
    }
  }

  return {get}
}

module.exports = actorsController
*/
/*
const sql = require('mssql')
const config = require('../config')

// const db = require('../db')

actorsController = () => {
  get = async (req, res) => {
    try {
      let query = req.params.Id > 0 ? `EXEC GetActor ${req.params.Id}` : 'EXEC GetActors'

      await sql.connect(config)
      const result = await sql.query(query)

      const records = result.recordset.map((record) => {
        record.links = {}
        record.links.self = `http://${req.headers.host}/api/actors/${record.Id}`
        return record
      })

      if (records.length == 0) {
        res.status(404)
        return res.send('Could not find the resource')
      }

      return res.json(records)
    } catch (err) {
      return res.status(404).send(404)
    }
  }
  return {get}
}

module.exports = actorsController
*/
