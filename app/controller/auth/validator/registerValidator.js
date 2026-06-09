const { body } = require("express-validator");

exports.registerValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Mail ID is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];