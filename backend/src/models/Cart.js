const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  items: [
    {
      _id: String,
      title: String,
      price: Number,
      qty: Number,
      image: String,
    },
  ],
});

module.exports = mongoose.model('Cart', cartSchema);