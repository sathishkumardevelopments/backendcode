const Products = require("../../models/Products");
const ProductViewController = async (req, res) => {
  try {
    const getProduct = await Products.findOne({
      _id : req?.body?._id,
    });
    console.log(req?.body,"--------body-------")
    if (req?.body?.update == "true") {
      if (getProduct) {
        
        const update = await Products.findOneAndUpdate(
          {
            _id: req?.body?._id,
          },
          {
            name : req?.body?.name,
            description : req?.body?.description,
            price : req?.body?.price,
            quantity : req?.body?.quantity,
            image : req.file ? req.file.filename : getProduct?.image,
          },
          {
            new: true,
          },
        );
        if (update) {
          return res.status(200).json({
            success: true,
            result: update,
            message: "Product updated successfully",
          });
        }
        else {
          return res.status(200).json({
            success: false,
            result: "",
            message: "Unable to update product",
          });
        }
      } else {
        return res.status(200).json({
          success: false,
          result: "",
          message: "Product not available",
        });
      }
    } else {
      if (getProduct) {
        return res.status(200).json({
          success: true,
          result: getProduct,
          message: "Product fetched successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          result: "",
          message: "Product not available",
        });
      }
    }
  } catch (error) {
    return res.status(200).json({
      success: false,
      result: "",
      message: "Unable to fetch product",
    });
  }
};

module.exports = { ProductViewController };
