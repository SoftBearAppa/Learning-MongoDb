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
  posts: [PostSchema],

  // Added 'likes' as a replacement for 'postCount'.
  likes: Number
});

// `.get()` is a ES6 'getter' method. It is not a Mocha feature.
UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
})

const User = mongoose.model('user', UserSchema);

module.exports = User;