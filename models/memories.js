const mongoose = require('mongoose');
const memorySchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  nameOfEvent: String,
  date: Date,
  img: String,
  img2: String,
  location: String,
  description: String
});

const Memories = mongoose.model('Memory', memorySchema);

module.exports = Memories;
