const mongoose = require('mongoose');
const memorySchema = new mongoose.Schema({
  nameOfEvent: String,
  date: Date,
  img: String,
  location: String,
  description: String
});

const Memories = mongoose.model('Memory', memorySchema);

module.exports = Memories;
