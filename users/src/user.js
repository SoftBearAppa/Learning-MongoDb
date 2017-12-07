const mongoose = require('mongoose');
const PostSchema = require('./post');
const { Schema } = mongoose;

const UserSchema = new Schema({

  /* Configuration Object added to 'name' proptery for validation */
  name: {

    /* Tells Mongoose that 'name' should be a String */
    type: String,

    /* Defined a custom validator to be ran for each `User()` instance */
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },

    /* Tells Mongoose that this property is required & it also has an error message to be passed with it */
    required: [true, 'Name is required.']
  },

  /* Removing 'postCount' field, to setup Virtual Field. So that the Server (Not MongoDB) can get the length of the 'post' field and relate it to 'postCount'
  postCount: Number,
  */

  // Left 'posts' in the schema, so that I have a refference of sub-docmuents
  posts: [PostSchema],

  // Added 'likes' as a replacement for 'postCount'.
  likes: Number,
  
  blogPost: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

// `.get()` is a ES6 'getter' method. It is not a Mocha feature.
UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

/* MIDDLEWARE demonstration. We have 2 menthods for middleware. `.pre()` & `.post()`. They can be calle on four different events: `.save()`, `.validate()`, `.init()`, & `.remove()`. */
UserSchema.pre('remove', function(next) {
  const BlogPost = mongoose.model('blogPost');

  /* `$in:` is a Monogo Operator. This patricular one is a Query Operator. */

  /* This query works as such:
   Go through all of our BlogPosts. Look at the BlogPost's`_id`s, if their `_id` is `$in` the list of `this.blogPost`. then `remove()` it. */
  BlogPost.remove({ _id: { $in: this.blogPost }})
  .then(() => {
    
    // Called `next(); to signal to move on to the next middleware. In this case, there isn't anymore middleawre. It will then process the `.remove()` event.
    next();
  });
});

const User = mongoose.model('user', UserSchema);

module.exports = User;