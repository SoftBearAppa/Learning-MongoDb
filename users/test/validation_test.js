const assert = require('assert');
const User = require('../src/user');

describe('Validation records', () => {

  /* Tests whether the validation is working */
  it("Requires a `User()` name", (done) => {

    /*  Create a new `User()` instance. Explicated putting in 'undefined' as value, so that it is clear that there should be a valid value. */
    const user = new User({ name: undefined });

    /* This gives an asynchronous result on whether the instance of `user` was valid. */
    const validationResult = user.validateSync();

    /* Drills down to where the error message is located, back in the `User()` Schema */
    const { message } = validationResult.errors.name;

    assert(message === 'Name is required.')
    done();
  });

  /* Test the validation for `User()`, validating that the 'name' property is longer than 2 characters. */
  it("Requires a `User()` name to be longer than 2 characters", (done) => {
    const user = new User({ name: 'Al' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name must be longer than 2 characters.');
    done();
  });
});