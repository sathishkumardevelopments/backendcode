const Order = require("../../models/Orders");


const OrderViewController = async (req, res) => {
  const io = req.app.get("io");
  try {
    const getOrder = await Order.findOne({
      orderid: req?.body?.orderid,
    });
    
    if (getOrder) {
      const update = await Order.findOneAndUpdate(
        {
          orderid: req?.body?.orderid,
        },
        {
          status: req?.body?.status,
        },
        {
          new: true,
          runValidators: true,
        },
      );
      if (update) {

        io.to(`order_${req?.body?.orderid}`).emit('orderStatusUpdated', update);

        return res.status(200).json({
          success: true,
          result: update,
          message: "Order updated successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          result: "",
          message: "Unable to update order",
        });
      }
    } else {
      return res.status(200).json({
        success: false,
        result: "",
        message: "Order not available",
      });
    }
  } catch (error) {
    return res.status(200).json({
      success: false,
      result: "",
      message: error.message,
    });
  }
};

module.exports = { OrderViewController };
