const Order = require("../../models/Orders");
const OrderListController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const getOrder = await Order.find({})
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);

    if (getOrder.length > 0) {
      return res.status(200).json({
        success: true,
        result: getOrder,
        message: "Orders fetched successfully",
      });
    }else{
        return res.status(400).json({
        success: false,
        result: "",
        message: "Order not available",
    });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      result: "",
      message: "Unable to fetch orders",
    });
  }
};

module.exports = { OrderListController };
