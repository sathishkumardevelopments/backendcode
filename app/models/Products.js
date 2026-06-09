const mongoose = require("mongoose");

const productsschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
}, { timestamps: true });

module.exports =
  mongoose.models.Products || mongoose.model("Products", productsschema);