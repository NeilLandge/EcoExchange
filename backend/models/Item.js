const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add item name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  image: {
    type: String,
    required: [true, 'Please add item image'],
  },
  condition: {
    type: String,
    required: [true, 'Please add item condition'],
    enum: ['New', 'Like New', 'Good', 'Fair', 'Poor']
  },
  location: {
    type: String,
    required: [true, 'Please add location'],
    trim: true
  },
  status: {
    type: String,
    enum: ['available', 'exchanged'],
    default: 'available'
  },
  description: {
    type: String,
    required: [true, 'Please add description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Item', itemSchema);
