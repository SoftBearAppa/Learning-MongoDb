const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {

  // `done()` is avaiable to each `it()` block as well.
  it('saves a user', (done) => {
    const joe = new User({ 
      name: 'Joe',
      postCount: Number
     });

    joe.save()
      .then(() => {

        /* `.isNew` is a property avaiable from Mongoose on all Model instances that is created. the `.isNew` is asssigned to be `true` before it is saved to the database. Once is it saved, `.isNew` becomes evaluated to `false`. We assert that the value for `joe.isNew` is now false, to test that is has been saved to the database. */
        assert(!joe.isNew);
        done();
      });
  });
});