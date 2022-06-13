const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel")
const productModel = require("../models/productModel")

const createOrder = async function (req, res) {
    let data = req.body;

    if (!data.userId) res.send("User Id is mandatory");
    let user = await userModel.findById(data.userId);
    if (!user) res.send("Enter User Id is not valid");


    if (!data.productId) res.send("Product Id is mandatory");
    let product = await productModel.findById(data.productId);
    if (!product) res.send("Enter Product Id is not valid");


    let savedData = await orderModel.create(data);
     res.send({ msg: savedData });

  };

//   const getorderDetails = async function (req, res) {
//     let specificOrder = await orderModel
//       .find()
//       .populate("user")
//     res.send({ data: specificOrder });
//   };
   
  module.exports.createOrder = createOrder
//   module.exports.getorderDetails = getorderDetails