require('dotenv').config();
const jwt = require("jsonwebtoken");
const Generate = async(user_id,email) => {
    return jwt.sign(
      {
        userId: user_id,
        email: email,
      },
      process.env.SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
}
module.exports = {Generate}