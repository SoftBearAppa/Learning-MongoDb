const assert = require('assert');
const mongoose = require('mongoose');
const BlogPost = require('../src/blogPost');
const User = require('../src/user');

describe('Middleware', () => {

  let joe, blogPost

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is Great!', content: 'Yet it really is great' });
  
    joe.blogPost.push(blogPost);


    Promise.all([joe.save(), blogPost.save()])
      .then(() => {
        done();
      });
  });

  it('users clean up dangling blogposts on remove', (done) => {
    joe.remove()
      .then(() => {

        // The `.count()` is a MongoDb feature. It counts the number of documents in a collection or view & returns a document that contains this count.
        BlogPost.count()
          .then((count) => {
            assert(count === 0)
            done();
          })
      });
  });
});