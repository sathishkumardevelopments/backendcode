const { body } = require("express-validator");

const loginValidator = [
  body("userid")
    .notEmpty()
    .withMessage("User ID is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];

module.exports = { loginValidator }