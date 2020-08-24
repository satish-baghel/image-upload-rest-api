const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
});

module.exports = Product = mongoose.model('product', productSchema);
