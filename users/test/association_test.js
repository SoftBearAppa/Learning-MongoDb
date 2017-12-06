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
  });
})