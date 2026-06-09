const mongoose = require("mongoose");

const orderitemschema = new mongoose.Schema({
  mainorderid: {
    type: String,
    required: true,
    unique: true,
  },
  productid: {
    type: String,
    required: true,
  },
  qty: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  isongoing:{
    type: String
  },
  status: {
    type: String,
    enum: ["Order Placed", "Accepted by Admin", "Packed", "Out for Delivery", "Delivered"]
  }
}, { timestamps: true });

module.exports = mongoose.models.Orderitems || mongoose.model("Orderitems", orderitemschema);