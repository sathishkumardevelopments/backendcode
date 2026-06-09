const { body } = require("express-validator");

const ProductcreateValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0"),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
];

module.exports = { ProductcreateValidator }