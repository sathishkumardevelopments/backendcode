const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  contact: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum : ['admin','user'],
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.models.Users || mongoose.model("Users", Userschema);
