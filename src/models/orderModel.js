const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;
const moment = require("moment")

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: objectId,
      ref: "user",
    },
    productId: {
      type: objectId,
      ref: "product",
    },
    amount: Number,
    date: {type:Date,default :Date.now},
    isFreeAppUser: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
