const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {

  it('postCount returns number of posts', (done) => {
    const joe = new User({ 
      name: 'Joe',
      posts: [{ title: 'New Post' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {

        // postCount is setup as a Virtual Field
        assert(joe.postCount === 1);
        done();
      });
  });
});