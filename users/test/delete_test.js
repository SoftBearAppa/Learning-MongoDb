const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {

  let joe;

  /* Before each `it()` statement, this `beforeEach()` gets executed to save an acutal user to the database, so that we have something to query, because in 'test_helper.js' the User collection gets dropped. */
  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => done());
  });

  /* This tests whether we removed a Model's instance, using the `.remove()` method on an instance. */
  it('model instance remove', (done) => {

    joe.remove()
      .then(() => {

        /* After removing the instance from the database, we need to query the database and still see of a User instance exists with the property 'name' & value of 'Joe'.*/
        User.findOne({ name: 'Joe' })
          .then((user) => {
            assert( user === null );
            done();
          });
      });
  });

  it('model method remove', (done) => {

  });

  it('model method findAndRemove', (done) => {

  });

  it('model method findByIdAndRemove', (done) => {

  });
});