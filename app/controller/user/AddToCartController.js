const Order = require("../../models/Orders");
const Users = require("../../models/Users");

const AddToCartController = async (req, res) => {
  try {
    const checkUser = await Users.findOne({
      _id: req?.body?.customerid,
    });

    if (!checkUser) {
      return res.status(200).json({
        success: false,
        result: "",
        message: "Kindly register to create order",
      });
    }

    const Usersdata = await Orders.find({
      customerid: req?.body?.customerid,
      isongoing: "true",
    });

    if (Usersdata.length > 0) {
      return res.status(200).json({
        success: false,
        result: "",
        message: "Another order in process for this user",
      });
    } else {
      const microtime = Math.floor(performance.now() * 1000); 
      const randomFactor = Math.floor(Math.random() * 900) + 100;
      const uniqueNumber = Number(`${microtime}${randomFactor}`);

      const takeOrder = await Orders.create({
        orderid: uniqueNumber,
        customerid: req?.body?.customerid,
        orderlistid: req?.body?.orderlistid,
        amount: req?.body?.amount,
        status: "Placed",
      });

      if(takeOrder){
        return res.status(200).json({
        success: true,
        result: takeOrder,
        message: "Order placed successfully",
        });
      }
    }
  } catch (error) {
    return res.status(200).json({
      success: false,
      result: "",
      message: "Unable to fetch products",
    });
  }
};

module.exports = { AddToCartController };
