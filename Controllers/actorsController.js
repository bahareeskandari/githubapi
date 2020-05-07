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
