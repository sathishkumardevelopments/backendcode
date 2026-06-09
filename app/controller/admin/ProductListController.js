const Products = require("../../models/Products");
const ProductListController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const getOrder = await Products.find({})
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);
    
    
    if (getOrder.length > 0) {
      return res.status(200).json({
        success: true,
        result: getOrder,
        message: "Products fetched successfully",
      });
    }else{
        return res.status(200).json({
        success: false,
        result: "",
        message: "Product not available",
    });
    }
  } catch (error) {
    return res.status(200).json({
      success: false,
      result: "",
      message: "Unable to fetch products",
    });
  }
};

module.exports = { ProductListController };
