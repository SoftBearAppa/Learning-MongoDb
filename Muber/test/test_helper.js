const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/muber_test', {
    useMongoClient: true,
  });
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('Warning', err);
    });
});

beforeEach(done => {
  const { drivers } = mongoose.connection.collections;
  drivers.drop()
    .then(() => done())
    .catch(() => done());
});