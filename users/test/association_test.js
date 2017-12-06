const mongoose = require('mongoose');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');
const assert = require('assert');

describe('Associations',() => {

  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is Great!', content: 'Yet it really is great' });
    comment = new Comment({ content: 'Congratz on a great post!' });

    // Associating user instance `joe()` with blogPost Instance: `blogPost()`. This appears that we push the object of `blogPost()` into the array, but Mongoose will automatically set it up as a refference with just the ObjectID.
    joe.blogPost.push(blogPost);

    // This is the same above.
    blogPost.comments.push(comment);

    //This is the same as above, Mongoose will automatically just refference the ObjectID.
    comment.user = joe;

    // `Promise.all()` is an ES6 feature. Also that we need to save the data to the Database. Before we save, all the data is only in Mongoose Memory.
    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => {
        done();
      });
  });

  /* `it.only()` Tells Mocha to ignore all the other validation test, & just run this paticular one */
  it('saves a relation between a user & a blogpost', (done) => {
    User.findOne({ name: 'Joe' })

      /* You can add 'modifiers' to the query like: `.populate()`. This tells Mongoose to recursivley load the 'blogPost' data, assocaited with the user `joe()` */
      .populate('blogPost')
      .then((user) => {
        assert(user.blogPost[0].title === 'JS is Great!');
        done();
      })
  });

  it('saves a full relation graph', (done) => {
    User.findOne({ name: 'Joe' })

    /* We can also pass `.populate()` an object to recursivley load more data. Note that long querys like below can cause longer delays or even crash the database due it taking a long time to recursivly load all the data being requested; This is a bigger issue when working with a MUCH larger database */
    .populate({

      // The field name under `User()` that we are trying to load
      path: 'blogPost',

      // Think of this like chaining `.populate()`
      populate: {

        //The field name unser `BlogPost()` that we are trying to load
        path: 'comments',

        //Mongoose Requires that we tell it what model to look under with the 'model' field.
        model: 'comment',
        populate: {
          path: 'user',
          model: 'user'
        }
      }
    })
    .then((user) => {
      assert(user.name === 'Joe');
      assert(user.blogPost[0].title === 'JS is Great!');
      assert(user.blogPost[0].comments[0].content === 'Congratz on a great post!');
      assert(user.blogPost[0].comments[0].user.name === 'Joe');
      done();
    })
  });
})