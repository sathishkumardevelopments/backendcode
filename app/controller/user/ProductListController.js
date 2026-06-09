const Products = require("../../models/Products");
const ProductListController = async (req, res) => {
  try {
    const search = req?.body?.search ?? "";

    const query = {
      quantity: { $gt: 0 },
    };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const Usersdata = await Products.find(query);

    if (Usersdata.length > 0) {
      return res.status(200).json({
        success: true,
        result: Usersdata,
        message: "Available products fetched",
      });
    } else {
      return res.status(200).json({
        success: false,
        result: "",
        message: "Products not available",
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
