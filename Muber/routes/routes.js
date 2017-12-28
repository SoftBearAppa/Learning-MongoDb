const DriversController = require('../controllers/drivers_controller');

module.exports = (app) => {

  app.get('/api', DriversController.greeting);

  app.post('/api/driver', DriversController.create);

  app.put('/api/driver/:id', DriversController.edit);

  app.delete('/api/driver/:id', DriversController.delete);
}