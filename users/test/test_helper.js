const mongoose = require('mongoose');

/* Note that the `connect` below, the database 'user_test' doesn't need to exsit right off the bat. Mongoose works with MongoDb, when you try to save data to database, it will create it at that time.*/
mongoose.connect('mongodb://localhost/users_test');
mongoose.connection

  /*  'open' & 'error' are specific strings that we need to use with Mongoose for their respecitive callsbacks */
  .once('open', () => console.log('Good to go!'))
  .on('error', (error) => {
    console.warn('Warning', error);
  });


  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      // Ready to run the next test since, drop() is done. done() is a signal to Mocha to start the next test.
      done();
    });
  });
