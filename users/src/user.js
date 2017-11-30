const mongoose = require('mongoose');
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
  postCount: Number
});

const User = mongoose.model('user', UserSchema);

module.exports = User;