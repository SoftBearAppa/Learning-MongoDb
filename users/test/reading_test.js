const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {

  let joe;

  /* Before each `it()` statement, this `beforeEach()` gets executed to save an acutal user to the database, so that we have something to query, because in 'test_helper.js' the User collection gets dropped. */
  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => done());
  });

  it('finds all users with the name of "joe"', () => {

  });
});