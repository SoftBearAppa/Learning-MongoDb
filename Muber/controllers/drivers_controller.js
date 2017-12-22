const Driver = require('../models/drivers')
module.exports = {

  greeting(req, res) {
    res.send({hi: 'there'});
  },

  create(req, res) {
    console.log(req.body);
    res.send({hi: 'there'});
  },
}