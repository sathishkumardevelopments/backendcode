const Orders = require("../../models/Orders");
const products = require("../../models/Products");
const Orderitems = require("../../models/Orderitems");
const Users = require("../../models/Users");
const mongoose = require('mongoose')

const UserOrderController = async (req, res) => {
  const io = req.app.get("io");
  console.log("IO instance:", io);
  
  try {
    let userNew

    userNew = await Users.findOne({
      contact: req?.body?.orders?.customernumber,
    });

    if (!userNew) {
      userNew = await Users.create({
        contact: req?.body?.orders?.customernumber,
        name: req?.body?.orders?.customername,
        role: "user",
      });
    }
    
    let cID = new mongoose.Types.ObjectId(userNew?._id)
    const Usersdata = await Orders.find({
      customerid: cID,
      status: { $ne : "Delivered"},
    });

    if (Usersdata.length > 0) {
      return res.status(200).json({
        success: false,
        result: "",
        message: "Another order in process for this user",
      });
    } 
    let defaultCount = 0;
    

    for (const ord of req?.body?.data?.allItems) {
      let checker = await products.findOne({
        _id: ord?.productId,
        quantity: { $gt: 0 }
      });

      if (!checker) {
        defaultCount++;
      }
    }

    if(defaultCount > 0){
      return res.status(200).json({
        success: false,
        result: "",
        message: "Selected product not available",
      });
    }
    
    
      const microtime = Math.floor(performance.now() * 1000); 
      const randomFactor = Math.floor(Math.random() * 900) + 100;
      const uniqueNumber = Number(`${microtime}${randomFactor}`);
      let cIDD = new mongoose.Types.ObjectId(userNew?._id)

      const takeOrder = await Orders.create({
        orderid: uniqueNumber,
        customerid: cIDD,
        amount: req?.body?.data?.totalAmt,
        status: "Order Placed",
        orderlist : req?.body?.data?.allItems,
        paymentmode : req?.body?.orders?.paymentmode
      });

      if(takeOrder){

        io.to('admins').emit('newOrderPlaced',takeOrder)

        return res.status(200).json({
        success: true,
        result: takeOrder,
        message: "Order placed successfully",
        });
      }else{
        return res.status(200).json({
        success: false,
        result: "",
        message: "Unable to place order",
        });
      }
    
  } catch (error) {
    return res.status(200).json({
      success: false,
      result: error.message,
      message: "Unable to place order",
    });
  }
};

module.exports = { UserOrderController };
