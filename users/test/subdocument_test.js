const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {

  /* Tests whether we can create a new instance of `User()` with a new subdocument */
  it('can create a subdocument', (done) => {
    const joe = new User({ 
      name: 'Joe', 
      posts:[{ title: 'New Post'}]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'New Post');
        done();
      })
  });
});