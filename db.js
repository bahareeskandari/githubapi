const sql = require('mssql')
const config = require('./config')

createHateoasLinks = (req, records, hateoas) => {
  return records.recordset.map((record) => {
    record.links = {}

    hateoas.forEach(
      (link) =>
        (record.links[
          link.property.toLowerCase() == 'id' ? 'self' : link.property.toLowerCase()
        ] = `http://${req.headers.host}/api/${link.endpoint}/${record[link.property]}`)
    )
    return record
  })
}

createSqlParameters = (req, res, ...bodyProperties) => {
  try {
    let hasAllBodyProperties = false
    let id = ''

    if (req.method == 'PUT' && req.params.hasOwnProperty('Id') && req.params.Id > 0)
      id = `${req.params.Id},`
    else if (req.method == 'DELETE' && req.params.hasOwnProperty('Id') && req.params.Id > 0)
      id = `${req.params.Id}`

    let sqlParameters = `${id} `

    //'firstName', { lastName: 'Doe' }
    bodyProperties.forEach((prop) => {
      let hasProperty = false
      let value = null
      if (typeof prop === 'string') {
        hasProperty = req.body.hasOwnProperty(prop)
        hasAllBodyProperties = hasAllBodyProperties || hasProperty
        value = req.body[prop]
      } else if (typeof prop === 'object') {
        let propertyName = Object.getOwnPropertyNames(prop)[0]
        hasProperty = req.body.hasOwnProperty(propertyName)
        if (hasProperty) {
          hasAllBodyProperties = hasAllBodyProperties || hasProperty
          value = req.body[propertyName]
        } else value = prop[propertyName]
      }

      if (typeof value === 'string') sqlParameters += `'${value}',`
      else if (typeof value === 'number') sqlParameters += `${value},`
      else if (typeof value === 'boolean') sqlParameters += value ? `1,` : `0,`
    })

    if (!hasAllBodyProperties && bodyProperties.length > 0) {
      res.sqlError = 'Missing or erroneous properties.'
      res.status(400)
      return
    }

    res.sqlParameters = sqlParameters.substring(0, sqlParameters.length - 1)
    res.status(201)
  } catch (err) {
    res.sqlError = 'Missing or erroneous properties.'
    res.status(500)
  }
}

jsonKeysToLowerCase = (record) =>
  Object.fromEntries(
    Object.entries(record).map(([k, v]) => [k[0].toLowerCase() + k.substring(1), v])
  )

get = async (req, res, endpoint, hateoas = [], ...params) => {
  try {
    let parameters = ''
    params.forEach((param) => (parameters += `, ${param}`))

    const newEndpoint = endpoint.substr(0, endpoint.length - 1)
    // const customerIdparam = req.query.customerid ? req.query.customerid : ''
    params
    let query =
      req.params.Id > 0
        ? `EXEC Get${endpoint} ${req.params.Id}${parameters}`
        : endpoint === 'address' || endpoint === 'orderStatus' || endpoint === 'tax'
        ? `EXEC Get${endpoint}es ${parameters.length < 2 ? '' : parameters.substring(2)}`
        : endpoint === 'category' || endpoint === 'country'
        ? `EXEC Get${newEndpoint}ies ${parameters.length < 2 ? '' : parameters.substring(2)}`
        : (endpoint === 'cartProduct' && params[0] > 0) ||
          (endpoint === 'favorite' && params[0] > 0 && params[1] > 0)
        ? `EXEC Get${endpoint} ${params[0]}, ${params[1]}`
        : `EXEC Get${endpoint}s ${params[0]}`
    console.log(query)
    /*
    let query =
      req.params.Id > 0
        ? `EXEC Get${endpoint} ${req.params.Id}${parameters}`
        : endpoint === 'brand' ||
          endpoint === 'customer' ||
          endpoint === 'favorite' ||
          endpoint === 'order' ||
          endpoint === 'paymentMethod' ||
          endpoint === 'promoType' ||
          endpoint === 'shippingMethod'
        ? `EXEC Get${endpoint}s `
        : endpoint === 'category' || endpoint === 'country'
        ? `EXEC Get${newEndpoint}ies ${parameters.length < 2 ? '' : parameters.substring(2)}`
        : `EXEC Get${endpoint}es ${parameters.length < 2 ? '' : parameters.substring(2)}`
*/
    console.log(query, parameters)
    /*
     ? `EXEC Get${endpoint} ${parameters.substring(2)}`
          :


          endpoint === 'cartProduct' ||
    */
    await sql.connect(config)
    result = await sql.query(query)

    if (result.recordset.length == 0) {
      res.status(404)
      return result
    }

    hateoas.push({property: 'Id', endpoint: `${endpoint}s`})

    const records = createHateoasLinks(req, result, hateoas)

    return req.params.Id > 0 ? records[0] : records
  } catch (err) {
    console.log(err)
    throw err
  }
}

modify = async (req, res, sp, ...bodyProperties) => {
  try {
    createSqlParameters(req, res, ...bodyProperties)
    if (res.sqlError) return res.send(res.sqlError)

    await sql.connect(config)
    var result = await sql.query(`EXEC ${sp} ${res.sqlParameters}`)

    if (req.method == 'PUT' || req.method == 'DELETE') {
      res.status(204)
      return res.send(req.method == 'PUT' ? 'Update successful.' : 'Deleted successfully.')
    }

    // Endast POST
    res.status(201)
    return res.json(jsonKeysToLowerCase(result.recordset[0]))
  } catch (err) {
    console.log(err)
    throw err
  }
}

module.exports = {get, modify, createHateoasLinks}

/*
const sql = require('mssql')
const config = require('./config')

get = async (req, res, endpoint, hateoas = [], ...params) => {}
module.exports = {get}
*/
