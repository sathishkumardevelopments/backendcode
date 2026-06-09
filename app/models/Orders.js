const mongoose = require("mongoose");

const ordersschema = new mongoose.Schema(
  {
    orderid: {
      type: String,
      required: true,
      unique: true,
    },
    customerid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    orderlist: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        productNos: {
          type: String,
          required: true,
          min: 1,
        },
        totalAmount: {
          type: String,
          required: true,
        },
        productAmount: {
          type: String,
          required: true,
        },
      },
    ],
    amount: {
      type: String,
    },
    paymentmode:{
      type: String,
    },
    status: {
      type: String,
      enum: ["Order Placed", "Accepted by Admin", "Packed", "Out for Delivery", "Delivered"],
    },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.Orders || mongoose.model("Orders", ordersschema);
