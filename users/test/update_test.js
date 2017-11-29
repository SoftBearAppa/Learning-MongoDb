const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {

  let joe;

  /* Before each `it()` statement, this `beforeEach()` gets executed to save an acutal user to the database, so that we have something to query, because in 'test_helper.js' the User collection gets dropped. */
  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => done());
  });

  /* Test updating data in the Database using `.set()` method. This method only updates an Instance. */
  it('Model Instance using set & save', (done) => {

    joe.set('name', 'Alex');

    /* Notice that after we call the `.set()` method, that we do have to `.save()` the new change to the database. */
    joe.save()
      .then(() => {
        User.find({})
          .then((users) => {
            assert(users.length === 1);
            assert(users[0].name === 'Alex');
            done();
          });
      });
  });
});