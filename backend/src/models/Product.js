// productSchema definition
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  price: { type: String, required: true }, 
  category: { type: String, required: true },
  subcategory: { type: String },
  short_description: { type: String },
  weight: { type: String },
  images: [{ type: String }],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

