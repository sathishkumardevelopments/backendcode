const Orders = require("../../models/Orders");
const products = require("../../models/Products");
const Orderitems = require("../../models/Orderitems");
const Users = require("../../models/Users");
const mongoose = require('mongoose')

const Orderhistory = async (req, res) => {
  
  try {
    let userNew

    userNew = await Orders.find({});

    if (userNew.length > 0) {
      return res.status(200).json({
        success: false,
        result: "",
        message: "Order history fetched",
      });
    } 
    else{
      return res.status(200).json({
        success: false,
        result: "",
        message: "No orders available",
      });
    }
    
  } catch (error) {
    return res.status(200).json({
      success: false,
      result: error.message,
      message: "Unable to fetch order",
    });
  }
};

module.exports = { Orderhistory };
