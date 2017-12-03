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

  /* Test whether we can add a subdocument to an exsisting record in the database. */
  it('add subdocument to exsisting record', (done) => {
    const joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {

        // `Array.push()` is a method sraight from vanilla JS
        user.posts.push({ title: 'Added Subdocument' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
        assert(user.posts[0].title === 'Added Subdocument');
        done();
      });
  });
});