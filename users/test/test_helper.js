const mongoose = require('mongoose');


/* The default promise  provided with Mongoose is Deprecated, they advised you to use your own promise library. Set Mongoose's default promise library to ES6 Promise withing Nodejs  */
mongoose.Promise = global.Promise;


/* `before()` is executed ONCE before all of the test suite in Mocha. Implemented this, so that the connection is opened ONCE during the execution of the test suite */
before((done) => {

  /* Note that the `connect` below, the database 'user_test' doesn't need to exsit right off the bat. Mongoose works with MongoDb, when you try to save data to database, it will create it at that time.*/
  mongoose.connect('mongodb://localhost/users_test', {
    useMongoClient: true,
  });
  mongoose.connection

    /*  'open' & 'error' are specific strings that we need to use with Mongoose for their respecitive callsbacks */
    .once('open', () => done())
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});

  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      // Ready to run the next test since, drop() is done. done() is a signal to Mocha to start the next test.
      done();
    });
  });
