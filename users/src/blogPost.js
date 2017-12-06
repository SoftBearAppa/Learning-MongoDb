const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [{ 

    // Type of reffernce to point of in a different collection
    type: Schema.Types.ObjectId,

    // Refferencing the 'comment' Collection; Working with Mongoose. It tells Mongoose to look in the 'comment' Collection
    ref: 'comment'
  }]
});

const BlogPost = mongoose.model('blogPost', blogPostSchema);

module.exports = BlogPost;