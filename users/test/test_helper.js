const mongoose = require('mongoose');

 /* Note that the `connect` below, the database 'user_test' doesn't need to exsit right off the bat. Mongoose works with MongoDb, when yuo try to save data to database, it will create it at that time.*/
mongoose.connect('mongodb://localhost/users_test');
mongoose.connection
  .once('open', () => console.log('Good to go!'))
  .on('error', (error) => {
    console.warn('Warning', error);
  })