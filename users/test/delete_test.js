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

        /* Finds the first instance of `User()`, with the property 'name' & has a value of 'Joe'. After removing the instance from the database, we need to query the database and still see of a User instance exists with the property 'name' & value of 'Joe'.*/
        User.findOne({ name: 'Joe' })
          .then((user) => {
            assert( user === null );
            done();
          });
      });
  });

  /* We look at the class(Model) User & tests whether we have removed ALL instances that has a property 'name' with a value of 'Joe' */
  it('class(Model) method remove', (done) => {
    User.remove({ name: 'Joe' })
      .then(() => {
        User.findOne({ name: 'Joe' })
          .then((user) => {
            assert(user === null);
            done();
          });
      });
  });

  /* Another method to removing data from the database using `.findOneAndRemove()`. Find the first instance using the `User()` model, with a property 'name' with a value of 'Joe' & removing it. */
  it('class(Model) method findOneAndRemove', (done) => {
    User.findOneAndRemove({ name: 'Joe' })
      .then(() => {
        User.findOne({ name: 'Joe' })
          .then((user) => {
            assert(user === null);
            done();
          });
      });
  });

  /* Yet another method to removing data from the database using the `.findByIdAndRemove()` method from Mongoose Model class. Note that we don't need to stringify the ID, because Mongoose already know what to do with the object that it is being passed. */
  it('class(Model) method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(joe._id)
      .then(() => {
        User.findOne({ name: 'Joe' })
          .then((user) => {
            assert(user === null);
            done();
          });
      });
  });
});