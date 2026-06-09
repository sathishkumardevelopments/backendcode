const mongoose = require("mongoose");

const customerschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Boolean,
    default: "customer",
  },
}, { timestamps: true });


module.exports =
  mongoose.models.Customers || mongoose.model("Customers", customerschema);