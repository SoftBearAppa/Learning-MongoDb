// Todo: create Album Schema
const mongoose = require('mongoose');
const { Schema } = mongoose;

const AlbumSchema = new Schema({
  title: String,
  date: Date,
  copiesSold: Number,
  numberTracks: Number,
  image: String,
  revenue: Double,
});

const Album = mongoose.Schema('album', AlbumSchema);

module.exports = Album;