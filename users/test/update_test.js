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

  /* `assertName()` takes in a method that is being passed into it and then assets whether the method completed the change. It is also passed 'done' from the `it()` block so it can sign off that the test is complete.*/
  function assertName(operation, done) {
    operation
      .then(() => {

        /* Not passing any data into the `.find()` method, will pull all model instances with the User Class */
        User.find({})
          .then((users) => {
            assert(users.length === 1);
            assert(users[0].name === 'Alex');
            done();
          });
      });
  }

  /* Test updating data in the Database using `.set()` method. This method only updates an Instance. */
  it('Model Instance using set & save', (done) => {

    // Notice that we are looking for a property called 'name' with the value that we want to update it to.
    joe.set('name', 'Alex');

    /* Notice that after we call the `.set()` method, that we do have to `.save()` the new change to the database. */
    assertName(joe.save(), done);
  });

  /* Test updating data using the `.update()` method. This method can update bulk properties/values on a Model Instance. */
  it('A Model Instancecan update', (done) => {
    assertName(joe.update({ name: 'Alex' }), done);
  });
});