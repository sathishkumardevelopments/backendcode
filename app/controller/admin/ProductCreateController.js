const Products = require("../../models/Products");
const ProductCreateController = async (req, res) => {


  try {

    const product = await Products.create({
      name: req?.body?.name,
      description: req?.body?.description,
      price: req?.body?.price,
      quantity: req?.body?.quantity,
      image: req.file ? req.file.filename : null,
    });

    if (product) {
      return res.status(200).json({
        success: true,
        result: product,
        message: "Product created successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        result: "",
        message: "Unable to fetch product",
      });
    }
  } catch (error) {
    return res.status(200).json({
      success: false,
      result: "",
      message: "Unable to fetch product",
    });
  }
};

module.exports = { ProductCreateController };
