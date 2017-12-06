const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [{ 

    // Type of reffernce to point of in a different collection
    type: Schema.Types.ObjectId,

    // Refferencing the 'Comment' Collection; Working with Mongoose. It tells Mongoose to look in the 'Comment' Collection
    ref: 'Comment'
  }]
});

const BlogPost = mongoose.model('blogPost', blogPostSchema);

module.exports = BlogPost;