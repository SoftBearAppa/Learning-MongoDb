const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({

  /* Object added to 'name' proptery for validation */
  name: {

    /* Tells Mongoose that 'name' should be a String */
    type: String,

    /* Tells Mongoose that this property is required & it also has an error message to be passed with it */
    required: [true, 'Name is required.']
  },
  postCount: Number
});

const User = mongoose.model('user', UserSchema);

module.exports = User;