const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const productModel = require("../models/productModel");

const createOrder = async function (req, res) {
  let data = req.body;
  const isFreeAppUser = req.isFreeAppUser;

  let user = await userModel.findById(data.userId);
  if (!user) res.send("Entered User Id is not valid");
  let product = await productModel.findById(data.productId);
  if (!product) res.send("Entered Product Id is not valid");

  if (isFreeAppUser === "true") {
    await orderModel
      .findOne({ userId: data.userId, productId: data.productId })
      .updateOne({ $set: { amount: 0 } });
    await userModel
      .findById(data.userId)
      .updateOne({ $set: { isFreeAppUser: true } });
    data.amount = 0;
  } else {
    const user = await userModel.findById(data.userId);
    const product = await productModel.findOne({ _id: data.productId });
    const balance = user.balance - product.price;
    await userModel.updateOne(
      { _id: data.userId },
      { $set: { balance: balance, isFreeAppUser: false } }
    );
    data.amount = product.price;
  }
  data.isFreeAppUser = isFreeAppUser;
  await orderModel.create(data);
  res.send({ msg: "Order saved successfully" });
};

const getorderDetails = async function (req, res) {
  let specificOrder = await orderModel.find().populate(["userId", "productId"]);
  console.log(specificOrder);
  res.send({ data: specificOrder });
};

module.exports.createOrder = createOrder;
module.exports.getorderDetails = getorderDetails;
